// Phase 8 — Sofia Core orchestration.
// Composes retrieval + memory + prompt + Claude API + action execution
// into a single `chat()` call consumed by the API Layer.

import { assemblePrompt } from './prompt-assembler.js'
import { processResponse } from './response-processor.js'
import { executeActions } from './action-executor.js'
import {
  loadSession,
  saveSession,
  createSession,
  appendTurn,
  buildTurn,
  updateQualification,
  inferStage,
  setStage,
  loadContactContext,
  logTurn,
} from '../memory/index.js'
import { shouldCreateOpportunity } from '../memory/qualification.js'
import { createRetrievalEngine } from '../retrieval/index.js'
import { sanitizeInput } from '../security/sanitizer.js'
import type { SofiaEnv, ChatRequest, ChatResponse, SessionInit } from '../types/index.js'
import type { GHLConnector, ResendConnector } from '../connectors/index.js'

export interface SofiaCore {
  chat(req: ChatRequest): Promise<ChatResponse>
}

export interface SofiaCoreConfig {
  env: SofiaEnv
  ghl?: GHLConnector
  resend?: ResendConnector
}

const ANTHROPIC_BASE = 'https://api.anthropic.com/v1'
const CLAUDE_MODEL = 'claude-sonnet-4-6'
const MAX_TOKENS = 1024

export function createSofiaCore(config: SofiaCoreConfig): SofiaCore {
  const { env, ghl, resend } = config
  const retrieval = createRetrievalEngine(env.SOFIA_KNOWLEDGE, env.SOFIA_VECTORS, env.OPENAI_API_KEY)
  const db = env.sofia_conversations

  return {
    async chat(req) {
      const t0 = Date.now()
      const sanitized = sanitizeInput(req.message)
      const clean = sanitized.text

      // ── 1. Load or create session ───────────────────────────────────────────
      let session = req.session_id
        ? await loadSession(env.SOFIA_SESSIONS, req.session_id)
        : null

      if (!session) {
        const init: SessionInit = {
          channel: req.channel,
          language: req.language ?? 'en',
          contact_id: req.contact_id,
        }
        session = await createSession(env.SOFIA_SESSIONS, init)
      }

      // ── 2. Log user turn immediately ────────────────────────────────────────
      const userTurn = buildTurn('user', clean, session.channel)
      appendTurn(session, userTurn)
      logTurn(db, userTurn, session.session_id, session.channel, session.language, session.contact_id).catch(() => {})

      // ── 3. Retrieve knowledge ───────────────────────────────────────────────
      const retrievalResult = await retrieval.retrieve({
        message: clean,
        session_id: session.session_id,
        contact_id: session.contact_id,
        language: session.language,
        channel: session.channel,
        conversation_stage: session.stage,
        top_k: 5,
        require_customer_safe: true,
      })

      // ── 4. Load contact context (best-effort) ───────────────────────────────
      let contact = session.contact_id
        ? await loadContactContext(env.SOFIA_SESSIONS, session.contact_id)
        : undefined

      // ── 5. Assemble prompt ──────────────────────────────────────────────────
      const prompt = assemblePrompt({
        session,
        retrieval: retrievalResult,
        contact: contact ?? undefined,
        currentMessage: clean,
      })

      // ── 6. Call Claude API ──────────────────────────────────────────────────
      const claudeResponse = await fetch(`${ANTHROPIC_BASE}/messages`, {
        method: 'POST',
        headers: {
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: CLAUDE_MODEL,
          max_tokens: MAX_TOKENS,
          system: prompt.system,
          messages: prompt.messages,
        }),
      })

      if (!claudeResponse.ok) {
        const errText = await claudeResponse.text().catch(() => '')
        throw new Error(`Claude API error ${claudeResponse.status}: ${errText.slice(0, 200)}`)
      }

      const claudeData = (await claudeResponse.json()) as {
        content: Array<{ type: string; text: string }>
      }
      const rawText = claudeData.content.find(b => b.type === 'text')?.text ?? ''

      // ── 7. Process response ─────────────────────────────────────────────────
      const processed = processResponse(rawText, clean, session.qualification)

      // ── 8. Update session state ─────────────────────────────────────────────
      if (Object.keys(processed.qualificationUpdates).length) {
        updateQualification(session, processed.qualificationUpdates)
      }
      if (processed.stageHint) {
        setStage(session, processed.stageHint)
      } else {
        setStage(session, inferStage(session))
      }

      // ── 9. Log assistant turn ───────────────────────────────────────────────
      const assistantTurn = buildTurn(
        'assistant',
        processed.text,
        session.channel,
        retrievalResult.chunks.map(c => c.id),
      )
      appendTurn(session, assistantTurn)
      logTurn(db, assistantTurn, session.session_id, session.channel, session.language, session.contact_id).catch(() => {})

      // ── 10. Auto-inject opportunity creation when threshold is met ──────────
      // Triggers automatically after email capture + enough discovery — no user action needed.
      if (ghl && shouldCreateOpportunity(session.qualification)) {
        processed.actions.push({
          type: 'create_opportunity',
          email: session.qualification.contact_email,
          name: session.qualification.contact_name,
          company: session.qualification.contact_company,
          problem: session.qualification.main_problem,
          recommendation: session.qualification.digital_employee_recommended,
        })
      }

      // ── 10. Execute side-effect actions ────────────────────────────────────
      const actionResults = await executeActions(processed.actions, session, { ghl, resend })

      // ── 11. Persist session ─────────────────────────────────────────────────
      await saveSession(env.SOFIA_SESSIONS, session)

      return {
        session_id: session.session_id,
        response: processed.text,
        language: session.language,
        stage: session.stage,
        lead_score: session.lead_score,
        actions: actionResults,
        latency_ms: Date.now() - t0,
      }
    },
  }
}

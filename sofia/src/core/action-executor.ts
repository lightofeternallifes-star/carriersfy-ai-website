import type { ActionSummary } from '../types/index.js'
import type { GHLConnector } from '../connectors/index.js'
import type { ResendConnector } from '../connectors/index.js'
import type { ActionSignal } from './response-processor.js'
import type { SessionMemory } from '../types/index.js'

export interface ActionDeps {
  ghl?: GHLConnector
  resend?: ResendConnector
}

export async function executeActions(
  actions: ActionSignal[],
  session: SessionMemory,
  deps: ActionDeps,
): Promise<ActionSummary[]> {
  const results: ActionSummary[] = []
  for (const action of actions) {
    results.push(await executeOne(action, session, deps))
  }
  return results
}

async function executeOne(
  action: ActionSignal,
  session: SessionMemory,
  deps: ActionDeps,
): Promise<ActionSummary> {
  const q = session.qualification

  try {
    switch (action.type) {

      // ── Contact upsert — runs on email capture ───────────────────────────
      case 'upsert_contact': {
        if (!deps.ghl) return { type: action.type, success: false }
        const email = action.email ?? q.contact_email ?? ''
        if (!email) return { type: action.type, success: false }

        const result = await deps.ghl.upsertContact(email, {
          email,
          firstName: action.name ?? q.contact_name,
          name: action.name ?? q.contact_name,
          phone: action.phone ?? q.contact_phone,
          companyName: action.company ?? q.contact_company,
          source: 'sofia-chat',
          tags: ['sofia-lead', 'source-sofia-chat'],
        })

        if (result.success && result.data) {
          session.contact_id = result.data.id
          // Advance to 'Sofia Engaged' stage tag
          await deps.ghl.setStage(result.data.id, 'Sofia Engaged').catch(() => null)
        }

        return { type: action.type, success: result.success }
      }

      // ── Full lead creation — contact + opportunity + pipeline stage ──────
      case 'create_opportunity': {
        if (!deps.ghl) return { type: action.type, success: false }
        const email = action.email ?? q.contact_email ?? ''
        if (!email) return { type: action.type, success: false }

        // 1. Upsert contact
        const contactResult = await deps.ghl.upsertContact(email, {
          email,
          firstName: action.name ?? q.contact_name,
          name: action.name ?? q.contact_name,
          phone: q.contact_phone,
          companyName: action.company ?? q.contact_company,
          source: 'sofia-qualified',
          tags: buildLeadTags(q.main_problem, q.industry, q.digital_employee_recommended, session.lead_score),
        })

        if (!contactResult.success) return { type: action.type, success: false }
        const contactId = contactResult.data!.id
        session.contact_id = contactId

        // 2. Determine pipeline stage by lead score
        const pipelineStage = session.lead_score >= 70
          ? 'Qualified — High Intent'
          : session.lead_score >= 40
            ? 'Qualified — Medium Intent'
            : 'Sofia Engaged'

        await deps.ghl.setStage(contactId, pipelineStage).catch(() => null)

        // 3. Create opportunity (GHL pipeline)
        const oppName = buildOpportunityName(
          action.company ?? q.contact_company,
          q.digital_employee_recommended ?? (q.solution_fit ?? undefined),
        )
        await deps.ghl.createOpportunity({
          name: oppName,
          contactId,
          status: 'open',
          source: 'Sophia AI Chat',
        }).catch(() => null)

        // 4. Add discovery note
        const note = buildDiscoveryNote(session)
        if (note) {
          await deps.ghl.addNote(contactId, note).catch(() => null)
        }

        // Mark opportunity as created so it doesn't run again
        session.qualification.opportunity_created = true

        // 5. Send lead acknowledgment email
        if (deps.resend && q.contact_email) {
          await deps.resend.sendLeadAcknowledgment(q.contact_email, {
            contactName: q.contact_name,
            language: session.language,
          }).catch(() => null)
        }

        return { type: action.type, success: true }
      }

      // ── Follow-up email ──────────────────────────────────────────────────
      case 'send_follow_up_email': {
        if (!deps.resend) return { type: action.type, success: false }
        const email = action.email ?? q.contact_email
        if (!email) return { type: action.type, success: false }
        const result = await deps.resend.sendLeadAcknowledgment(email, {
          contactName: q.contact_name,
          language: session.language,
        })
        return { type: action.type, success: result.success }
      }

      // ── Human handoff ────────────────────────────────────────────────────
      case 'transfer_to_human': {
        if (!deps.ghl) return { type: action.type, success: true }
        const email = q.contact_email
        if (email) {
          await deps.ghl.upsertContact(email, {
            email,
            tags: ['transfer-requested', 'sofia-lead'],
          }).catch(() => null)
          const contactId = session.contact_id
          if (contactId) {
            await deps.ghl.setStage(contactId, 'Human Handoff').catch(() => null)
          }
        }
        return { type: action.type, success: true }
      }

      // ── Booking — widget handles showing the URL ─────────────────────────
      case 'book_appointment': {
        if (!deps.ghl) return { type: action.type, success: true }
        const contactId = session.contact_id
        if (contactId) {
          await deps.ghl.setStage(contactId, 'Appointment Requested').catch(() => null)
        }
        return { type: action.type, success: true }
      }

      // ── Tag ──────────────────────────────────────────────────────────────
      case 'add_tag': {
        if (!deps.ghl || !session.contact_id) return { type: action.type, success: false }
        const result = await deps.ghl.addTags(session.contact_id, [action.tag])
        return { type: action.type, success: result.success }
      }

      default:
        return { type: (action as ActionSignal).type, success: false }
    }
  } catch {
    return { type: action.type, success: false }
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildLeadTags(
  _problem: string | undefined,
  industry?: string,
  recommended?: string,
  score?: number,
): string[] {
  const tags = ['sofia-lead', 'source-sofia-chat']
  if (industry) tags.push(`industry-${industry.toLowerCase().replace(/\s+/g, '-').slice(0, 30)}`)
  if (recommended) tags.push(`recommended-${recommended.toLowerCase().replace(/\s+/g, '-')}`)
  if (score && score >= 70) tags.push('high-intent')
  else if (score && score >= 40) tags.push('medium-intent')
  return tags
}

function buildOpportunityName(company?: string, solution?: string): string {
  const co = company ?? 'Unknown Company'
  const sol = solution ?? 'AI Employee'
  return `${co} — ${sol} Opportunity`
}

function buildDiscoveryNote(session: SessionMemory): string {
  const q = session.qualification
  const lines = [
    '=== Sofia Discovery Summary ===',
    `Lead Score: ${session.lead_score}/100`,
    q.business_type    ? `Business Type: ${q.business_type}` : '',
    q.industry         ? `Industry: ${q.industry}` : '',
    q.employee_count   ? `Team Size: ${q.employee_count}` : '',
    q.main_problem     ? `Main Problem: ${q.main_problem}` : '',
    q.objectives       ? `Objectives: ${q.objectives}` : '',
    q.contact_role     ? `Role: ${q.contact_role}` : '',
    q.digital_employee_recommended ? `Recommended: ${q.digital_employee_recommended}` : '',
    q.decision_stage   ? `Decision Stage: ${q.decision_stage}` : '',
    q.timeline         ? `Timeline: ${q.timeline}` : '',
    `Channel: ${session.channel}`,
    `Language: ${session.language}`,
  ].filter(Boolean)
  return lines.join('\n')
}

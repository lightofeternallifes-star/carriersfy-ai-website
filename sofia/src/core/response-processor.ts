import type { QualificationState, ConversationStage } from '../types/index.js'

// ── Action signals extracted from Sophia's response ───────────────────────────

export type ActionSignal =
  | { type: 'upsert_contact'; email?: string; name?: string; phone?: string; company?: string; role?: string }
  | { type: 'create_opportunity'; name?: string; email?: string; company?: string; problem?: string; recommendation?: string }
  | { type: 'book_appointment'; time_preference?: string }
  | { type: 'send_follow_up_email'; email?: string }
  | { type: 'transfer_to_human'; reason?: string }
  | { type: 'add_tag'; tag: string }

export interface ProcessedResponse {
  text: string
  actions: ActionSignal[]
  qualificationUpdates: Partial<QualificationState>
  stageHint?: ConversationStage
}

// ── Extraction patterns ───────────────────────────────────────────────────────

const EMAIL_RE = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}\b/i
const PHONE_RE = /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}|\+\d{7,15}/

const EMPLOYEE_COUNT_RE = /\b(\d+)\s*(?:employees?|staff|people|team members?|personas?|empleados?|funcionários?)\b/i

// Industry keyword map (EN/ES/PT)
const INDUSTRY_SIGNALS: Array<{ pattern: RegExp; industry: string }> = [
  { pattern: /freight\s*broker|corretora?\s*de\s*carga|bróker?\s*de\s*carga/i, industry: 'freight brokerage' },
  { pattern: /trucking|carrier|transportadora|caminhoneiro|camionero|transportista/i, industry: 'trucking / carriers' },
  { pattern: /logistics?|logística/i, industry: 'logistics' },
  { pattern: /warehouse|warehousing|armazém|almacén/i, industry: 'warehousing' },
  { pattern: /dental|dentist|odontolog/i, industry: 'dental' },
  { pattern: /real\s*estate|inmobili|imobili/i, industry: 'real estate' },
  { pattern: /restaurant|restaurante/i, industry: 'restaurant' },
  { pattern: /salon|salão|salón|beauty|spa/i, industry: 'beauty / salon' },
  { pattern: /construction|construção|construcción/i, industry: 'construction' },
  { pattern: /medical|clinic|clínica|médico/i, industry: 'healthcare / medical' },
]

// Stage signals from Sofia's own response text
const STAGE_SIGNALS: Array<{ pattern: RegExp; stage: ConversationStage }> = [
  { pattern: /(?:let me transfer|connecting you|I'll have someone|human agent)/i, stage: 'closing' },
  { pattern: /(?:schedule|book|what time|availability|calendar|agendar|reunión|reunião)/i, stage: 'scheduling' },
  { pattern: /(?:recommend|suggest|best solution|perfect fit|recomiendo|recomendo)/i, stage: 'recommending' },
]

// Appointment / meeting intent in user message
const APPOINTMENT_INTENT_RE = /\b(?:schedule|book|meeting|call|appointment|demo|strategy\s*call|yes.*call|sounds?\s*good|let'?s?\s*do\s*it|quiero\s*(?:una\s*)?(?:reunión|llamada)|agendar|marcar|reservar|quero\s*(?:uma\s*)?(?:reunião|ligação))\b/i

// Booking URL trigger — only when prospect explicitly requests a meeting
const BOOKING_REQUEST_RE = /\b(?:book\s*(?:a|the)?\s*(?:call|meeting|demo|appointment)|schedule\s*(?:a|the)?\s*(?:call|meeting|demo)|get\s*on\s*a\s*call|set\s*up\s*a\s*(?:call|meeting)|agendar\s*(?:una?\s*)?(?:llamada|reunión)|quiero\s*(?:una?\s*)?(?:llamada|reunión)|marcar\s*(?:una?\s*)?(?:llamada|reunión|cita)|reservar\s*(?:una?\s*)?(?:llamada|reunión)|quero\s*(?:uma?\s*)?(?:ligação|reunião)|agendar\s*(?:uma?\s*)?(?:ligação|reunião))\b/i

// Decision authority signals
const DECISION_MAKER_RE = /\b(?:i\s+(?:make|decide|own|run|am\s+the)|it'?s?\s+my\s+(?:decision|call|company)|yo\s+(?:decido|soy\s+el\s+dueño|manejo)|eu\s+(?:decido|sou\s+o\s+dono))\b/i
const COMPARING_RE = /\b(?:looking\s+at|comparing|evaluating|checking\s+out|revisando|comparando|avaliando)\b/i

export function processResponse(
  rawText: string,
  userMessage: string,
  existingQ: Partial<QualificationState> = {},
): ProcessedResponse {
  const actions: ActionSignal[] = []
  const qualUpdates: Partial<QualificationState> = {}
  let stageHint: ConversationStage | undefined

  const msg = userMessage.trim()

  // ── Contact data extraction ────────────────────────────────────────────────
  const emailMatch = msg.match(EMAIL_RE)
  if (emailMatch && !existingQ.contact_email) {
    qualUpdates.contact_email = emailMatch[0]
    actions.push({ type: 'upsert_contact', email: emailMatch[0] })
  }

  const phoneMatch = msg.match(PHONE_RE)
  if (phoneMatch && !existingQ.contact_phone) {
    qualUpdates.contact_phone = phoneMatch[0]
  }

  // ── Industry detection ─────────────────────────────────────────────────────
  if (!existingQ.industry) {
    for (const { pattern, industry } of INDUSTRY_SIGNALS) {
      if (pattern.test(msg)) {
        qualUpdates.industry = industry
        break
      }
    }
  }

  // ── Employee count extraction ──────────────────────────────────────────────
  if (!existingQ.employee_count) {
    const empMatch = msg.match(EMPLOYEE_COUNT_RE)
    if (empMatch) {
      qualUpdates.employee_count = empMatch[1]
    }
  }

  // ── Decision stage inference ───────────────────────────────────────────────
  if (!existingQ.decision_stage) {
    if (DECISION_MAKER_RE.test(msg)) qualUpdates.decision_stage = 'ready'
    else if (COMPARING_RE.test(msg))  qualUpdates.decision_stage = 'comparing'
  }

  // ── Booking URL trigger (ONLY on explicit meeting request) ─────────────────
  if (BOOKING_REQUEST_RE.test(msg) && !existingQ.booking_url_shown) {
    qualUpdates.appointment_requested = true
    qualUpdates.booking_url_shown = true
    actions.push({ type: 'book_appointment' })
    stageHint = 'scheduling'
  } else if (APPOINTMENT_INTENT_RE.test(msg) && !existingQ.appointment_requested) {
    // Softer intent — set flag but don't show booking URL yet
    qualUpdates.appointment_requested = true
    stageHint = 'scheduling'
  }

  // ── Human transfer request ─────────────────────────────────────────────────
  if (/\b(?:speak|talk|human|agent|representative|person|transfer|hablar\s*con\s*(?:alguien|una\s*persona)|falar\s*com\s*(?:alguém|uma\s*pessoa))\b/i.test(msg)) {
    qualUpdates.human_requested = true
    actions.push({ type: 'transfer_to_human' })
    stageHint = 'closing'
  }

  // ── Stage hint from Sofia's response ──────────────────────────────────────
  if (!stageHint) {
    for (const { pattern, stage } of STAGE_SIGNALS) {
      if (pattern.test(rawText)) {
        stageHint = stage
        break
      }
    }
  }

  return {
    text: rawText.trim(),
    actions,
    qualificationUpdates: qualUpdates,
    stageHint,
  }
}

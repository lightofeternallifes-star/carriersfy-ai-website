import type { SessionMemory, QualificationState, ConversationStage } from '../types/index.js'

export function updateQualification(session: SessionMemory, patch: Partial<QualificationState>): void {
  Object.assign(session.qualification, patch)
  session.lead_score = computeLeadScore(session.qualification)
}

export function computeLeadScore(q: QualificationState): number {
  let score = 0

  // Contact info — most valuable signals (max 45)
  if (q.contact_email)   score += 25  // email = committable lead
  if (q.contact_phone)   score += 10
  if (q.contact_name)    score += 5
  if (q.contact_company) score += 3
  if (q.contact_role)    score += 2

  // Discovery completeness — 7 dimensions (max 35)
  if (q.business_type)   score += 5
  if (q.industry)        score += 5
  if (q.employee_count)  score += 3
  if (q.main_problem)    score += 10  // problem clarity = urgency signal
  if (q.objectives)      score += 5
  if (q.solution_fit)    score += 5
  if (q.timeline)        score += 2

  // Intent signals (max 20)
  if (q.decision_stage === 'ready')     score += 20
  else if (q.decision_stage === 'comparing') score += 12
  else if (q.decision_stage === 'learning')  score += 5

  if (q.appointment_requested) score += 15  // highest intent signal

  return Math.min(score, 100)
}

export function inferStage(session: SessionMemory): ConversationStage {
  const q = session.qualification
  const score = session.lead_score

  if (q.human_requested)        return 'closing'
  if (q.appointment_requested)  return 'scheduling'
  if (score >= 50 && q.contact_email && q.digital_employee_recommended) return 'closing'
  if (score >= 30 && q.solution_fit) return 'recommending'
  if (q.business_type || q.industry || q.main_problem) return 'qualifying'
  return 'greeting'
}

// Returns true when we have enough to create a meaningful CRM opportunity
export function shouldCreateOpportunity(q: QualificationState): boolean {
  return Boolean(
    q.contact_email &&
    (q.main_problem || q.business_type) &&
    !q.opportunity_created,
  )
}

// Returns true when we have the minimum contact data to upsert in GHL
export function hasMinimumContactData(q: QualificationState): boolean {
  return Boolean(q.contact_email || q.contact_phone)
}

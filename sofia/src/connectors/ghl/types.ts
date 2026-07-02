// GoHighLevel API v2 types
// Base URL: https://services.leadconnectorhq.com
// API version header: 2021-07-28

export interface GHLConfig {
  apiKey: string
  locationId: string
  webhookUrl?: string
  calendarId?: string
  pipelineId?: string
}

// ── Contact ───────────────────────────────────────────────────────────────────

export interface GHLContactInput {
  firstName?: string
  lastName?: string
  name?: string
  email?: string
  phone?: string
  companyName?: string
  website?: string
  source?: string
  tags?: string[]
  locationId?: string  // connector always overrides with its config locationId
  customFields?: Array<{ id: string; field_value: string }>
}

export interface GHLContactPatch {
  firstName?: string
  lastName?: string
  name?: string
  email?: string
  phone?: string
  companyName?: string
  tags?: string[]
  customFields?: Array<{ id: string; field_value: string }>
}

export interface GHLContact {
  id: string
  locationId: string
  firstName?: string
  lastName?: string
  name?: string
  email?: string
  phone?: string
  companyName?: string
  tags: string[]
  source?: string
  createdAt?: string
  updatedAt?: string
}

export interface GHLContactSearchResult {
  contacts: GHLContact[]
  count: number
}

export interface GHLContactResult {
  contact: GHLContact
}

// ── Notes ─────────────────────────────────────────────────────────────────────

export interface GHLNoteInput {
  body: string
  userId?: string
}

export interface GHLNote {
  id: string
  contactId: string
  body: string
  createdAt?: string
}

// ── Calendar / Appointments ───────────────────────────────────────────────────

export interface GHLFreeSlot {
  startTime: string   // ISO 8601
  endTime: string
}

export interface GHLSlotsResponse {
  _dates_?: Record<string, GHLFreeSlot[]>
  slots?: GHLFreeSlot[]
}

export interface GHLAppointmentInput {
  calendarId: string
  locationId: string
  contactId: string
  startTime: string   // ISO 8601
  endTime?: string
  title?: string
  notes?: string
  timezone?: string
  selectedTimezone?: string
}

export interface GHLAppointment {
  id: string
  calendarId: string
  contactId: string
  startTime: string
  endTime: string
  title?: string
  status: string
  createdAt?: string
}

// ── Pipeline / Opportunities ──────────────────────────────────────────────────

export type GHLPipelineStage =
  | 'New Lead'
  | 'Sofia Engaged'
  | 'Qualified — High Intent'
  | 'Qualified — Medium Intent'
  | 'Appointment Requested'
  | 'Appointment Booked'
  | 'Human Handoff'
  | 'Closed — Won'
  | 'Closed — Lost'
  | 'Nurture'

// Maps stage name → GHL stage tag (used when pipeline stage IDs are not configured)
export const STAGE_TAGS: Record<GHLPipelineStage, string> = {
  'New Lead':                   'stage-new',
  'Sofia Engaged':              'stage-engaged',
  'Qualified — High Intent':    'stage-qualified-high',
  'Qualified — Medium Intent':  'stage-qualified-medium',
  'Appointment Requested':      'stage-appt-requested',
  'Appointment Booked':         'stage-appt-booked',
  'Human Handoff':              'stage-human-handoff',
  'Closed — Won':               'stage-closed-won',
  'Closed — Lost':              'stage-closed-lost',
  'Nurture':                    'stage-nurture',
}

// ── Opportunities ─────────────────────────────────────────────────────────────

export interface GHLOpportunityInput {
  name: string
  contactId: string
  status: 'open' | 'won' | 'lost' | 'abandoned'
  source?: string
  pipelineId?: string
  pipelineStageId?: string
  monetaryValue?: number
  customFields?: Array<{ id: string; field_value: string }>
  locationId?: string
}

export interface GHLOpportunity {
  id: string
  name: string
  contactId: string
  status: string
  source?: string
  pipelineId?: string
  pipelineStageId?: string
  createdAt?: string
}

export interface GHLOpportunityResult {
  opportunity: GHLOpportunity
}

// ── Webhooks ──────────────────────────────────────────────────────────────────

export interface GHLWebhookPayload {
  event: string
  contactId?: string
  locationId?: string
  data?: Record<string, unknown>
}

// Phase 5 — GoHighLevel connector.
// Covers: CRM (contacts, notes, tags, pipeline) + Calendar (slots, appointments).
// GHL is the single source of truth for contact state and scheduling.
// See docs/ADR_VOICE_CHANNEL.md for the architectural decision behind this design.

import { ghlGet, ghlPost, ghlPut } from './client.js'
import { measureHealth } from '../base.js'
import type { ConnectorHealth, ConnectorResult } from '../base.js'
import type {
  GHLConfig,
  GHLContact,
  GHLContactInput,
  GHLContactPatch,
  GHLContactResult,
  GHLContactSearchResult,
  GHLNote,
  GHLNoteInput,
  GHLAppointment,
  GHLAppointmentInput,
  GHLFreeSlot,
  GHLSlotsResponse,
  GHLPipelineStage,
  GHLWebhookPayload,
  GHLOpportunityInput,
  GHLOpportunity,
  GHLOpportunityResult,
} from './types.js'
import { STAGE_TAGS as STAGE_TAG_MAP } from './types.js'

export type { GHLConfig, GHLContact, GHLAppointment, GHLFreeSlot, GHLPipelineStage }

export interface GHLConnector {
  getContact(contactId: string): Promise<ConnectorResult<GHLContact>>
  searchByEmail(email: string): Promise<ConnectorResult<GHLContact | null>>
  createContact(input: GHLContactInput): Promise<ConnectorResult<GHLContact>>
  updateContact(contactId: string, patch: GHLContactPatch): Promise<ConnectorResult<GHLContact>>
  upsertContact(email: string, input: GHLContactInput): Promise<ConnectorResult<GHLContact>>
  addNote(contactId: string, body: string): Promise<ConnectorResult<GHLNote>>
  addTags(contactId: string, tags: string[]): Promise<ConnectorResult<GHLContact>>
  setStage(contactId: string, stage: GHLPipelineStage): Promise<ConnectorResult<GHLContact>>
  createOpportunity(input: GHLOpportunityInput): Promise<ConnectorResult<GHLOpportunity>>
  checkAvailability(startIso: string, endIso: string, timezone?: string): Promise<ConnectorResult<GHLFreeSlot[]>>
  bookAppointment(input: GHLAppointmentInput): Promise<ConnectorResult<GHLAppointment>>
  fireWebhook(payload: GHLWebhookPayload): Promise<ConnectorResult<void>>
  health(): Promise<ConnectorHealth>
}

export function createGHLConnector(config: GHLConfig): GHLConnector {
  const { apiKey, locationId } = config

  return {
    // ── Contact reads ─────────────────────────────────────────────────────────

    async getContact(contactId) {
      const result = await ghlGet<GHLContactResult>(`/contacts/${contactId}`, apiKey)
      if (!result.success) return { success: false, error: result.error! }
      return { success: true, data: result.data!.contact }
    },

    async searchByEmail(email) {
      const encoded = encodeURIComponent(email)
      // GHL API v2 uses `query` for full-text search — `email` param returns 422
      const result = await ghlGet<GHLContactSearchResult>(
        `/contacts/?locationId=${locationId}&query=${encoded}&limit=1`,
        apiKey,
      )
      if (!result.success) return { success: false, error: result.error! }
      const found = result.data!.contacts[0] ?? null
      return { success: true, data: found }
    },

    // ── Contact writes ────────────────────────────────────────────────────────

    async createContact(input) {
      const result = await ghlPost<GHLContactResult>('/contacts/', apiKey, {
        ...input,
        locationId,
      })
      if (!result.success) return { success: false, error: result.error! }
      return { success: true, data: result.data!.contact }
    },

    async updateContact(contactId, patch) {
      const result = await ghlPut<GHLContactResult>(`/contacts/${contactId}`, apiKey, patch)
      if (!result.success) return { success: false, error: result.error! }
      return { success: true, data: result.data!.contact }
    },

    async upsertContact(email, input) {
      const searchResult = await this.searchByEmail(email)
      if (!searchResult.success) return { success: false, error: searchResult.error! }

      if (searchResult.data) {
        // Existing contact — merge tags and update fields
        const existing = searchResult.data
        const mergedTags = [...new Set([...(existing.tags ?? []), ...(input.tags ?? [])])]
        const patch: GHLContactPatch = { tags: mergedTags }
        if (input.firstName) patch.firstName = input.firstName
        if (input.lastName) patch.lastName = input.lastName
        if (input.name) patch.name = input.name
        if (input.phone) patch.phone = input.phone
        if (input.companyName) patch.companyName = input.companyName
        if (input.customFields) patch.customFields = input.customFields
        return this.updateContact(existing.id, patch)
      }

      return this.createContact({ ...input, locationId })
    },

    // ── Notes ─────────────────────────────────────────────────────────────────

    async addNote(contactId, body) {
      const payload: GHLNoteInput = { body }
      const result = await ghlPost<{ note: GHLNote }>(`/contacts/${contactId}/notes`, apiKey, payload)
      if (!result.success) return { success: false, error: result.error! }
      return { success: true, data: result.data!.note }
    },

    // ── Tags ──────────────────────────────────────────────────────────────────

    async addTags(contactId, tags) {
      // Fetch existing tags then merge — GHL PUT replaces the full tag array
      const existing = await this.getContact(contactId)
      const currentTags = existing.success ? (existing.data?.tags ?? []) : []
      const merged = [...new Set([...currentTags, ...tags])]
      return this.updateContact(contactId, { tags: merged })
    },

    // ── Pipeline stage (tag-based + optional pipeline API) ────────────────────

    async setStage(contactId, stage) {
      // Stage is tracked as a tag so it works regardless of pipeline configuration.
      // All existing stage-* tags are removed and replaced with the new one.
      const existing = await this.getContact(contactId)
      const currentTags = existing.success ? (existing.data?.tags ?? []) : []
      const withoutOldStages = currentTags.filter(t => !t.startsWith('stage-'))
      const newTag = STAGE_TAG_MAP[stage]
      return this.updateContact(contactId, { tags: [...withoutOldStages, newTag] })
    },

    // ── Opportunities ─────────────────────────────────────────────────────────

    async createOpportunity(input) {
      const result = await ghlPost<GHLOpportunityResult>('/opportunities/', apiKey, {
        ...input,
        locationId,
        ...(config.pipelineId && !input.pipelineId ? { pipelineId: config.pipelineId } : {}),
      })
      if (!result.success) return { success: false, error: result.error! }
      return { success: true, data: result.data!.opportunity }
    },

    // ── Calendar ──────────────────────────────────────────────────────────────

    async checkAvailability(startIso, endIso, timezone = 'America/New_York') {
      const calendarId = config.calendarId
      if (!calendarId) {
        return { success: false, error: { code: 'NOT_CONFIGURED', message: 'GHL_CALENDAR_ID not set', retryable: false } }
      }

      const params = new URLSearchParams({
        startDate: startIso,
        endDate: endIso,
        timezone,
      })
      const result = await ghlGet<GHLSlotsResponse>(
        `/calendars/${calendarId}/free-slots?${params}`,
        apiKey,
      )
      if (!result.success) return { success: false, error: result.error! }

      // GHL returns slots in different shapes depending on the API version
      const raw = result.data!
      const slots: GHLFreeSlot[] = raw.slots
        ?? Object.values(raw._dates_ ?? {}).flat()
      return { success: true, data: slots }
    },

    async bookAppointment(input) {
      const calendarId = config.calendarId ?? input.calendarId
      const result = await ghlPost<{ appointment: GHLAppointment }>('/appointments/', apiKey, {
        ...input,
        calendarId,
        locationId,
      })
      if (!result.success) return { success: false, error: result.error! }
      return { success: true, data: result.data!.appointment }
    },

    // ── Webhook ───────────────────────────────────────────────────────────────

    async fireWebhook(payload) {
      if (!config.webhookUrl) {
        return { success: true } // No webhook configured — silent skip
      }
      const result = await ghlPost<void>(config.webhookUrl, apiKey, payload)
      if (!result.success) return result
      return { success: true }
    },

    // ── Health ────────────────────────────────────────────────────────────────

    health() {
      return measureHealth(async () => {
        const result = await ghlGet<unknown>(
          `/locations/${locationId}`,
          apiKey,
        )
        return result.success
      })
    },
  }
}

// Phase 1 — Shared TypeScript interfaces for the Sofia Runtime.
// All live-runtime modules import from here.
// The offline knowledge pipeline mirrors these in knowledge/importer/types.ts.

// ── Enumerations ──────────────────────────────────────────────────────────────

export type SofiaLanguage = 'en' | 'es' | 'pt'

export type Channel = 'website' | 'voice' | 'whatsapp' | 'email' | 'ghl'

export type ConversationStage =
  | 'greeting'
  | 'qualifying'
  | 'recommending'
  | 'scheduling'
  | 'closing'
  | 'recovery'

export type KnowledgeSection =
  | 'Company'
  | 'Mission'
  | 'Vision'
  | 'Services'
  | 'Industries'
  | 'Pricing'
  | 'FAQs'
  | 'Objection Handling'
  | 'Digital Employees'
  | 'Phone Calls'
  | 'WhatsApp'
  | 'CRM'
  | 'Scheduling'
  | 'Case Studies'
  | 'Light of Life'
  | 'Policies'
  | 'Transfer Rules'
  | 'Emergency Responses'
  | 'Community Resources'
  | 'Sales'
  | 'General'

export type SourceType = 'markdown' | 'pdf' | 'docx' | 'txt' | 'html' | 'json'

// ── Knowledge Layer ───────────────────────────────────────────────────────────

export interface KnowledgeChunk {
  id: string
  section: KnowledgeSection
  subsection: string
  heading: string
  content: string
  source_file: string
  source_type: SourceType
  hierarchy: string[]
  tags: string[]
  categories: string[]
  customer_safe: boolean
  metadata: Record<string, string>
  char_count: number
  word_count: number
  version: string
  created_at: string
}

export interface KnowledgeManifest {
  version: string
  generated_at: string
  total_chunks: number
  total_sections: number
  source_files: string[]
  sections: Partial<Record<KnowledgeSection, string[]>>
}

export interface KnowledgeVersion {
  version: string
  generated_at: string
  deployed_at?: string
  deployed_by?: string
  changelog: string
}

// ── Search Layer ──────────────────────────────────────────────────────────────

export interface SearchOptions {
  top_k?: number
  section?: KnowledgeSection
  customer_safe?: boolean
  min_score?: number
}

export interface SearchResult {
  chunk_id: string
  chunk: KnowledgeChunk
  score: number
  method: 'keyword' | 'semantic' | 'hybrid'
}

export interface SearchIndex {
  version: string
  generated_at: string
  total_terms: number
  total_chunks: number
  index: Record<string, string[]>
  idf: Record<string, number>
}

// ── Retrieval Engine ──────────────────────────────────────────────────────────

export interface RetrievalQuery {
  message: string
  session_id: string
  contact_id?: string
  language: SofiaLanguage
  channel: Channel
  conversation_stage: ConversationStage
  top_k?: number
  require_customer_safe?: boolean
}

export interface RetrievedChunk extends KnowledgeChunk {
  score: number
  method: 'keyword' | 'semantic' | 'hybrid'
}

export interface RetrievalResult {
  context: string
  chunks: RetrievedChunk[]
  sources: string[]
  confidence: number
  retrieval_ms: number
}

// ── Memory Layer ──────────────────────────────────────────────────────────────

export interface QualificationState {
  // Discovery — business profile
  business_type?: string
  industry?: string
  employee_count?: string
  main_problem?: string
  objectives?: string

  // Discovery — solution
  business_need?: string
  solution_fit?: 'ai-employee' | 'ai-app' | 'automation' | 'platform'
  digital_employee_recommended?: string  // e.g. "Atlas", "Titan", "Orion"
  timeline?: string
  decision_stage?: 'learning' | 'comparing' | 'ready'

  // Contact capture
  contact_name?: string
  contact_company?: string
  contact_role?: string      // job title / cargo
  contact_email?: string
  contact_phone?: string

  // Intent
  appointment_requested?: boolean
  appointment_time_preference?: string
  booking_url_shown?: boolean
  human_requested?: boolean
  opportunity_created?: boolean
  language_confirmed?: SofiaLanguage
}

export interface ActionRecord {
  type: string
  executed_at: string
  success: boolean
  error?: string
}

export interface ConversationTurn {
  turn_id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  channel: Channel
  retrieved_chunks?: string[]
  actions_taken?: ActionRecord[]
}

export interface SessionMemory {
  session_id: string
  contact_id?: string
  channel: Channel
  language: SofiaLanguage
  stage: ConversationStage
  lead_score: number
  turns: ConversationTurn[]
  qualification: QualificationState
  created_at: string
  updated_at: string
  expires_at: string
}

export interface SessionInit {
  channel: Channel
  language: SofiaLanguage
  contact_id?: string
}

export interface ContactContext {
  contact_id: string
  name?: string
  company?: string
  email?: string
  phone?: string
  tags: string[]
  pipeline_stage?: string
  lead_score?: number
  prior_sessions: number
  last_contact?: string
  notes_summary?: string
}

// ── API Layer ─────────────────────────────────────────────────────────────────

export interface ChatRequest {
  session_id: string
  message: string
  channel: 'website' | 'whatsapp'
  contact_id?: string
  language?: SofiaLanguage
}

export interface ChatResponse {
  session_id: string
  response: string
  language: SofiaLanguage
  stage: ConversationStage
  lead_score: number
  actions: ActionSummary[]
  latency_ms: number
}

export interface VoiceRequest {
  session_id: string
  transcript: string
  channel: 'voice'
  contact_id?: string
}

export interface VoiceResponse {
  session_id: string
  response: string
  audio_url?: string
  language: SofiaLanguage
  stage: ConversationStage
  actions: ActionSummary[]
  latency_ms: number
}

export interface ActionSummary {
  type: string
  success: boolean
}

export interface HealthResponse {
  status: 'ok' | 'degraded'
  knowledge_version: string
  knowledge_generated_at: string
  connectors: {
    ghl: 'ok' | 'degraded' | 'down'
    elevenlabs: 'ok' | 'degraded' | 'down'
    whatsapp: 'ok' | 'degraded' | 'down'
    resend: 'ok' | 'degraded' | 'down'
  }
}

// ── Connectors ────────────────────────────────────────────────────────────────

export interface ConnectorError {
  code: string
  message: string
  retryable: boolean
}

export interface ConnectorHealth {
  status: 'ok' | 'degraded' | 'down'
  latency_ms: number
}

export interface ConnectorResult<T = unknown> {
  success: boolean
  data?: T
  error?: ConnectorError
}

// ── Security Layer ────────────────────────────────────────────────────────────

export interface PIIClassification {
  contains_email: boolean
  contains_phone: boolean
  contains_name: boolean
  risk_level: 'none' | 'low' | 'medium' | 'high'
}

export interface ComplianceResult {
  permitted: boolean
  reason?: string
  regulation?: string
}

// ── Cloudflare Worker Env ─────────────────────────────────────────────────────
// Mirrors the bindings declared in wrangler.toml

export interface SofiaEnv {
  // KV namespaces
  SOFIA_KNOWLEDGE: KVNamespace
  SOFIA_SESSIONS: KVNamespace
  SOFIA_RATE_LIMITS: KVNamespace
  // Vectorize index
  SOFIA_VECTORS: VectorizeIndex
  // D1 database
  sofia_conversations: D1Database
  // Secrets
  RESEND_API_KEY: string
  GHL_API_KEY: string
  GHL_LOCATION_ID: string
  SOFIA_API_KEY: string
  SOFIA_WEBHOOK_SECRET: string
  ANTHROPIC_API_KEY: string
  OPENAI_API_KEY: string
  ELEVENLABS_API_KEY: string
  ELEVENLABS_VOICE_ID: string
  // Optional
  GHL_WEBHOOK_URL?: string
  GHL_CALENDAR_ID?: string
  GHL_PIPELINE_ID?: string
  WHATSAPP_ACCESS_TOKEN?: string
  WHATSAPP_PHONE_NUMBER_ID?: string
  WHATSAPP_VERIFY_TOKEN?: string
  // Non-secret vars
  SOFIA_ENV: 'production' | 'staging' | 'development'
  KNOWLEDGE_VERSION: string
}

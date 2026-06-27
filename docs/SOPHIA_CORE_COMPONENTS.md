---
version: 1.0.0
classification: internal_architecture
owner: Carriersfy AI
status: active
created: 2026-06-25
last_reviewed: 2026-06-25
canonical_source: docs/SOPHIA_CORE_COMPONENTS.md
related_docs:
  - docs/SOPHIA_CORE_ARCHITECTURE.md
  - docs/SOPHIA_CORE_DATA_FLOW.md
  - docs/SOPHIA_CORE_EVENT_SYSTEM.md
---

# Sophia Core™ — Component Specifications

> Detailed specification of all seven primary systems. Read `SOPHIA_CORE_ARCHITECTURE.md` before this document.

---

## 1. Sophia Runtime™

### Purpose
Sophia Runtime™ is the conductor of every conversation. It manages the session lifecycle from the moment a message arrives on any channel to the moment a response is delivered. Every other system is called by or reports to the Runtime.

### Conversation State Machine

The Runtime enforces a deterministic state machine. No state transition is possible without an explicit event.

```
                    ┌──────────┐
            ┌──────▶│  IDLE    │◀──────────────────┐
            │       └────┬─────┘                   │
            │            │ conversation.started     │
            │       ┌────▼─────┐                   │
            │       │ GREETING │                   │
            │       └────┬─────┘                   │
            │            │ first.message.received   │
            │       ┌────▼─────┐                   │
     timeout│       │  ACTIVE  │◀──────────────────┐│
    recovery│       └────┬─────┘                   ││
            │            │                         ││
            │    ┌────────▼────────┐               ││
            │    │   REASONING     │               ││
            │    └────────┬────────┘               ││
            │             │                        ││
            │    ┌────────▼────────┐               ││
            │    │    WAITING      │───────────────┘│
            │    │ (for user input)│  response.sent  │
            │    └────────┬────────┘               │
            │             │ escalation.triggered   │
            │    ┌────────▼────────┐               │
            │    │    HANDOFF      │               │
            │    └────────┬────────┘               │
            │             │                        │
            │    ┌────────▼────────┐               │
            │    │   COMPLETED     │───────────────┘
            │    └────────┬────────┘  conversation.completed
            │             │
            │    ┌────────▼────────┐
            └────│     FAILED      │
                 └─────────────────┘
```

Valid transitions:
- IDLE → GREETING: channel message received, no active session
- GREETING → ACTIVE: first substantive customer message received
- ACTIVE → REASONING: message requires intelligence processing
- REASONING → WAITING: response generated, waiting for next customer message
- WAITING → REASONING: customer sends next message
- ACTIVE/WAITING/REASONING → HANDOFF: escalation trigger detected
- HANDOFF → COMPLETED: human agent accepts handoff
- ANY → FAILED: unrecoverable error
- FAILED → IDLE: recovery successful (session reset)
- COMPLETED → IDLE: conversation closed, session expires

### Session Schema

```
ConversationSession {
  session_id: UUID
  tenant_id: string
  employee_id: string          // which Digital Employee is handling
  visitor_id: string           // pseudonymized customer identifier
  channel: ChannelType         // VOICE | WHATSAPP | CHAT | EMAIL | WEB
  language: ISO639             // detected language code
  state: ConversationState     // enum above
  current_goal: Goal | null
  turn_count: number
  created_at: ISO8601
  last_active_at: ISO8601
  expires_at: ISO8601
  context_window: Message[]    // last N messages, N configurable per tenant
  active_skill: SkillID | null
  metadata: Record<string, unknown>  // channel-specific and tenant-specific data
}
```

### Responsibilities

**Session Management:**
- Create a session on first message from a new visitor (or resume if visitor_id has an existing session within TTL)
- Update `last_active_at` on every turn
- Expire sessions after configurable inactivity timeout (default: 30 minutes for chat, 5 minutes for voice)
- Emit `conversation.timed_out` on expiry, retain session summary in Memory™

**Routing Engine:**
- On each turn: pass intent classification from Intelligence™ to the active Skill
- If no active skill: use Intelligence™ recommendation to select skill
- If skill returns `ESCALATE`: trigger handoff flow
- If skill returns `COMPLETE`: move toward conversation close

**Human Handoff:**
- Trigger conditions: explicit customer request, confidence below threshold, sensitive topic (medical/legal/financial advice), TIER 3 knowledge request, Iron Prime™ directive
- Handoff package: full session state, conversation summary, identified intent, recommended human next step
- Emit `human_handoff.started` with handoff package
- Wait for `human_handoff.completed` before session state moves to COMPLETED

**Timeout Management:**
- Inactivity timer resets on every customer message
- On timeout: emit `conversation.timed_out`, persist summary to Memory™, set state to IDLE
- Configurable grace period for reconnect: if same visitor reconnects within grace period, session resumes from WAITING

**Streaming:**
- Voice channel: stream tokens to voice synthesis adapter as generated
- Chat channel: stream tokens to client connection
- WhatsApp: buffer full response (channel does not support streaming)
- Email: always buffered

**Recovery:**
- On `action.failed` or transient error: retry up to 3 times, then degrade gracefully
- On `system.provider.degraded`: switch to knowledge-only response mode
- On persistent failure: emit `conversation.failed`, offer human handoff

### Configuration Surface
```
RuntimeConfig {
  session_timeout_minutes: number       // default: 30
  voice_session_timeout_seconds: number // default: 300
  max_context_window: number            // default: 10 turns
  handoff_confidence_threshold: number  // 0.0–1.0, default: 0.7
  recovery_retry_count: number          // default: 3
  grace_period_minutes: number          // default: 5
  streaming_enabled: boolean
  channel_specific_overrides: Record<ChannelType, Partial<RuntimeConfig>>
}
```

---

## 2. Sophia Intelligence™

### Purpose
The reasoning engine that transforms customer language into business decisions. Intelligence™ is the brain. It never speaks directly to customers — it produces decisions that Runtime™ executes and Personality™ expresses.

### Intent Taxonomy

All customer intents are classified into one of these canonical categories:

| Intent | Description | Default Handling |
|---|---|---|
| INQUIRY | General question about company, services, employees | Knowledge retrieval |
| QUALIFICATION | Customer describing their business need | Lead qualification skill |
| OBJECTION | Resistance to a recommendation | Objection handling skill |
| PRICING | Question about cost or investment | Redirect to pricing policy |
| TECHNICAL | Question about implementation or technology | Redirect (TIER 3 escalation if needed) |
| SCHEDULING | Request to book time | Scheduling skill |
| COMPLAINT | Negative experience report | Support skill + escalation evaluation |
| EMERGENCY | Urgent or safety-related request | Immediate human handoff |
| COMPLIMENT | Positive feedback | Warm acknowledgment + next step |
| OFF_TOPIC | Outside business scope | Polite redirect to in-scope topics |
| IDENTITY_CHECK | "Are you an AI?" or equivalent | Non-negotiable AI disclosure |

### Responsibilities

**Intent Detection:**
- Input: NormalizedMessage + ConversationContext + Memory snapshot
- Output: IntentClassification { intent: Intent, confidence: 0.0–1.0, sub_intent?: string, entities: Entity[] }
- Low confidence (< threshold) triggers clarifying question rather than assumption

**Decision Engine:**
- Given intent + context + memory + tenant config → produces IntelligenceDecision
- Decision types: RESPOND (answer directly), SKILL (route to specific skill), ACTION (execute action), HANDOFF (escalate), CLARIFY (ask follow-up question)

**Recommendation Engine:**
- Matches customer need to Digital Employee, service, or next step
- Uses Lead Memory and Business Memory to personalize recommendations
- Never recommends based on pricing information

**Goal Planning:**
- Maintains ConversationGoal: { id, type, target_outcome, sub_goals[], progress }
- Goal types: QUALIFICATION, INFORMATION, SUPPORT, SCHEDULING, CONVERSION
- Plans next 2–3 turns in advance to maintain conversation coherence

**Context Reasoning:**
- Maintains coherent understanding across all turns
- Tracks topic changes, reference resolution ("it", "that service", "the one you mentioned")
- Detects context shifts and adjusts goal accordingly

### Provider Independence Contract

Intelligence™ communicates with the AI model exclusively through:
```
AIModelProviderAdapter.complete(CompletionRequest) → CompletionResponse
```

The system prompt passed to this adapter is constructed from:
1. Active Digital Employee personality config
2. Active skill context
3. Relevant knowledge chunks (from Knowledge™)
4. Memory snapshot (from Memory™)
5. Conversation history (from Runtime™ context window)

The adapter is responsible for translating this into whatever format the underlying model requires. Intelligence™ never constructs model-specific prompts.

### Input/Output Contracts

```
IntelligenceRequest {
  session_id: string
  tenant_id: string
  employee_id: string
  message: NormalizedMessage
  conversation_context: Message[]
  memory_snapshot: MemorySnapshot
  knowledge_context: KnowledgeChunk[]
  active_skill?: SkillID
  current_goal?: Goal
}

IntelligenceResponse {
  decision: DecisionType
  intent: IntentClassification
  response_strategy: ResponseStrategy   // INFORM | ASK | RECOMMEND | ESCALATE | CLOSE
  skill_route?: SkillID
  action_requests?: ActionRequest[]
  raw_response?: string                 // draft response before Personality processing
  next_goal?: Goal
  confidence: number
  reasoning_trace: string               // internal audit trail, never customer-facing
}
```

---

## 3. Sophia Knowledge™

### Purpose
Retrieves accurate, contextual business knowledge on demand. Knowledge™ is the authoritative source of truth for everything Sophia can know about Carriersfy AI, its services, its clients, and the 25 industries it serves.

### Knowledge Sources

| Source | Contents | Owner | Update Frequency |
|---|---|---|---|
| Global KB | Carriersfy AI company, services, platform, all 7 employees | Carriersfy AI | On content update |
| Industry KB | 25 industry playbooks, challenges, recommended employees | Carriersfy AI | Quarterly |
| Tenant KB | Client-specific business info, custom FAQs, overrides | Tenant Admin | On demand |
| Case Study KB | Approved client results and narratives | Carriersfy AI (approval required) | Per approval |
| FAQ KB | Pre-indexed Q&A pairs for high-frequency questions | Carriersfy AI | On content update |
| Policy KB | Customer-safe policy, pricing philosophy, compliance rules | Carriersfy AI | On policy change |

### KnowledgeChunk Schema

Every indexed piece of knowledge is represented as a KnowledgeChunk:

```
KnowledgeChunk {
  chunk_id: UUID
  tenant_id: string | 'global'  // 'global' for Carriersfy AI shared knowledge
  source: KnowledgeSource
  source_file: string
  source_version: semver
  content: string               // the actual knowledge text
  embedding_vector_ref: string  // reference to vector store entry
  customer_safe_tier: 1 | 2 | 3 // from 00_customer_safe_policy.md
  tags: string[]
  language: ISO639              // EN | PT | ES | ...
  created_at: ISO8601
  updated_at: ISO8601
  indexed_at: ISO8601
}
```

### Retrieval Strategy

Three-tier retrieval, executed in order, stopping when sufficient results are found:

**Tier 1 — Semantic Search:**
- Embed the query using the AI Model Provider Adapter
- Query vector store with tenant_id namespace filter
- Return top-K chunks by cosine similarity
- Apply customer_safe_tier filter (customer conversations: only TIER 1 chunks)

**Tier 2 — Keyword Fallback:**
- For proper nouns, product names, employee names: exact-match lookup in FAQ KB
- Returns pre-indexed answers for common questions without vector search

**Tier 3 — Structured Lookup:**
- For policy queries (pricing, compliance, rules): direct lookup from Policy KB
- Never uses semantic similarity for policy content — always returns the exact policy text

### Versioning

Every knowledge source has:
```
KnowledgeVersion {
  source: KnowledgeSource
  version: semver
  indexed_at: ISO8601
  chunk_count: number
  status: 'current' | 'indexing' | 'stale' | 'error'
}
```

When a knowledge file is updated: emit `knowledge.updated` → triggers re-indexing job → on completion: emit `knowledge.indexed` → Knowledge™ switches to new index version atomically.

---

## 4. Sophia Memory™

### Purpose
Maintains persistent understanding of every visitor and lead across conversations, channels, and time. Memory™ is what transforms a sequence of conversations into a relationship.

### Memory Types

**Short-Term Memory** (TTL: session duration)
```
ShortTermMemory {
  session_id: string
  current_goal: Goal
  active_context: Message[]     // last 10 turns
  entities_mentioned: Entity[]  // business name, contact name, pain points mentioned this session
  recommendations_made: string[]
  objections_raised: string[]
}
```

**Visitor Memory** (TTL: 90 days from last contact)
```
VisitorMemory {
  visitor_id: string
  tenant_id: string
  first_contact_at: ISO8601
  last_contact_at: ISO8601
  channels_used: ChannelType[]
  language_preference: ISO639
  total_conversations: number
}
```

**Lead Memory** (TTL: 365 days from last update)
```
LeadMemory {
  lead_id: string
  visitor_id: string
  tenant_id: string
  business_name?: string
  contact_name?: string
  contact_channel?: string
  pain_points: string[]
  interest_signals: string[]
  qualification_stage: 'early_stage' | 'emerging' | 'high_intent' | 'converted' | 'not_a_fit_now'
  recommended_employees: EmployeeID[]
  strategy_call_requested: boolean
  created_at: ISO8601
  updated_at: ISO8601
}
```

**Business Memory** (TTL: 365 days)
```
BusinessMemory {
  lead_id: string
  tenant_id: string
  industry: Industry
  estimated_size: 'solo' | 'small' | 'medium' | 'enterprise'
  current_approach: string      // how they currently handle this problem
  expressed_needs: string[]
  decision_context: string      // who decides, timeline signals
  preferred_next_step: string
  updated_at: ISO8601
}
```

**Project Memory** (TTL: contract duration, then archived)
```
ProjectMemory {
  project_id: string
  tenant_id: string
  lead_id: string
  status: 'active' | 'paused' | 'completed' | 'archived'
  deployed_employees: EmployeeID[]
  milestones: Milestone[]
  team_contacts: Contact[]
  started_at: ISO8601
  expected_completion?: ISO8601
}
```

**Recommendation Memory** (TTL: 90 days)
```
RecommendationMemory {
  visitor_id: string
  tenant_id: string
  recommendations: RecommendationRecord[]
}

RecommendationRecord {
  recommended_at: ISO8601
  employee_id?: EmployeeID
  service?: ServiceID
  response: 'accepted' | 'rejected' | 'deferred' | 'no_response'
  rejection_reason?: string
}
```

**Conversation Memory** (TTL: 365 days)
```
ConversationMemory {
  conversation_id: string
  visitor_id: string
  tenant_id: string
  summary: string               // 3–5 sentence summary of the conversation
  key_facts_learned: string[]
  outcome: string               // what happened at the end
  next_step_agreed: string
  occurred_at: ISO8601
}
```

**Long-Term Memory** (TTL: permanent until explicit deletion)
```
LongTermMemory {
  visitor_id: string
  tenant_id: string
  opted_in_at: ISO8601
  persistent_preferences: Record<string, unknown>
  key_decisions: string[]       // major business decisions, commitments made
  relationship_notes: string[]  // non-PII context for relationship continuity
}
```

### Privacy Rules
- All memory types containing PII (contact names, business names, channels) are encrypted at rest
- Memory is never accessed cross-tenant
- Right to deletion: a deletion request flows through all memory types for a visitor_id, emits `memory.deleted` events for each type, confirmed by DeletionAuditRecord
- Retention minimization: TTLs are enforced by a background expiry job, not on-access lazy expiry

### Memory Snapshot
When a conversation session starts, Memory™ returns a MemorySnapshot — a read-only composite of all memory types relevant to the visitor:
```
MemorySnapshot {
  visitor_id: string
  short_term?: ShortTermMemory
  visitor?: VisitorMemory
  lead?: LeadMemory
  business?: BusinessMemory
  project?: ProjectMemory
  recommendation?: RecommendationMemory
  recent_conversations: ConversationMemory[]  // last 3
  long_term?: LongTermMemory
  snapshot_at: ISO8601
}
```

---

## 5. Sophia Personality™

### Purpose
Every response from every Digital Employee passes through Sophia Personality™ before reaching the customer. Personality™ is the enforcer of professional identity, communication principles, language compliance, and output safety.

### Core Identity Config
```
PersonalityConfig {
  employee_id: EmployeeID
  tenant_id: string
  display_name: string                  // e.g., "Sophia" or tenant-configured name
  title: string                         // e.g., "Chief AI Business Consultant"
  company: string                       // e.g., "Carriersfy AI" or tenant brand
  personality_profile: PersonalityProfile
  communication_principles: CommunicationPrinciple[]  // NON-OVERRIDABLE
  language_config: LanguageConfig
  channel_configs: Record<ChannelType, ChannelPersonalityConfig>
  prohibited_phrases: ProhibitedPhrase[]
  tenant_overrides: TenantPersonalityOverride
}
```

### Communication Principles (Non-Overridable)
These principles apply to every response regardless of tenant configuration:

1. **Respect Principle:** Every response treats the customer as a professional deserving clear, timely, respectful communication.
2. **One Question Principle:** Sophia asks one primary question per turn. Never stacks multiple questions.
3. **Guide Not Pressure:** Sophia advances the conversation only when the customer signals readiness. No closing language until intent is high.
4. **Educate First:** When a customer is early-stage, Sophia informs before recommending.
5. **Route When Uncertain:** When Sophia does not have a confident answer, she routes to a human rather than approximating.
6. **AI Disclosure:** When a customer sincerely asks if they are speaking with an AI, Sophia confirms truthfully. This rule cannot be disabled.
7. **No Pricing Quotes:** Sophia never provides pricing, ranges, or cost estimates. This rule cannot be disabled.
8. **No Technology Exposure:** Sophia never references platform providers, AI vendors, or infrastructure details.

### Writing Style Enforcer
Applied to every outbound response:
- Sentence length: max 25 words per sentence for voice; max 40 for text
- Vocabulary: professional, accessible, never technical jargon unless customer introduced it first
- Tone markers: warm acknowledgment before transitioning topics
- Prohibited phrases: enforced by substitution, not rejection (see ProhibitedPhrase schema)
- Question count per response: exactly 1 (never 0, never 2+)

### Language Processing
```
LanguageConfig {
  primary: ISO639               // EN | PT | ES
  supported: ISO639[]
  detection_strategy: 'auto' | 'fixed'
  cultural_calibration: Record<ISO639, CulturalProfile>
  code_switching: 'allowed' | 'match_customer' | 'fixed_primary'
}
```

Language detection runs on every inbound message. If the detected language differs from the session language, Personality™ switches gracefully: acknowledges the switch if appropriate, then continues in the new language.

### Tier Enforcement
Final output check before channel delivery:
- Scan response for any TIER 2 or TIER 3 content markers
- If found: remove the flagged segment, substitute with appropriate redirect language
- If the entire response would be empty after filtering: trigger the "route to human" fallback

### Greeting and Closing Protocols

**Greeting:**
- Voice: Short, warm, professional. State name and company. One open question.
- WhatsApp/Chat: Warm greeting, name, company, one open question.
- Email: Formal greeting, name, company, context acknowledgment, one offer.

**Closing:**
- High intent: offer Strategy Call as clear next step
- Mid intent: offer information resource or follow-up
- Low intent: warm close, leave door open ("Happy to continue whenever the time is right")
- Handoff: clear transition language, introduce human agent name if available

---

## 6. Sophia Skills™

### Purpose
Skills are the modular business capabilities that make each Digital Employee effective at their specific role. Every skill is a self-contained module that can be composed onto any employee without modifying the employee's base configuration.

### Skill Architecture

```
SkillDefinition {
  id: SkillID
  name: string
  version: semver
  description: string
  required_knowledge: KnowledgeSource[]   // must be indexed before skill can execute
  required_actions: ActionID[]            // must be available for skill to function
  trigger_intents: Intent[]               // which intents activate this skill
  input_schema: JSONSchema
  output_schema: JSONSchema
  config_schema: JSONSchema               // tenant-configurable parameters
  composable_with: SkillID[]              // can run alongside these skills
  incompatible_with: SkillID[]            // cannot run alongside these skills
}
```

### Core Skills

**SalesSkill**
- Purpose: Guide a prospect through discovery → recommendation → objection handling → next step
- Trigger intents: QUALIFICATION, OBJECTION
- Flow: Discovery questions → pain identification → service match → recommendation → objection handling → Strategy Call offer
- Key actions: CreateLead, RequestStrategyCall
- Configuration: discovery_question_count, objection_handling_depth, call_offer_threshold

**SchedulingSkill**
- Purpose: Book appointments, meetings, and callbacks
- Trigger intents: SCHEDULING
- Flow: Availability request → time proposal → confirmation → reminder scheduling
- Key actions: ScheduleMeeting, SendNotification
- Configuration: available_time_slots (from tenant calendar config), reminder_timing

**CustomerSupportSkill**
- Purpose: Handle post-sale questions, issues, and requests
- Trigger intents: INQUIRY, COMPLAINT
- Flow: Issue classification → knowledge retrieval → answer or escalation → resolution confirmation
- Key actions: CreateTicket, TransferToHuman, UpdateLeadStatus
- Configuration: escalation_threshold, ticket_categories

**LeadQualificationSkill**
- Purpose: Understand a prospect's readiness and route them appropriately
- Trigger intents: QUALIFICATION, INQUIRY
- Internal framework: Business need → Urgency → Decision context → Preferred next step (externalized as respectful discovery questions)
- Key actions: CreateLead, UpdateLeadStatus
- Output: qualification_stage classification for LeadMemory

### Industry Skills

Each industry skill extends the LeadQualificationSkill with industry-specific discovery questions, terminology, pain points, and recommended action patterns. Full definitions follow the same SkillDefinition schema.

| Skill | Industry | Key Capabilities |
|---|---|---|
| DentalSkill | Dental | New patient intake, appointment reminders, recall sequences |
| VeterinarySkill | Veterinary | Pet owner intake, appointment booking, follow-up care |
| LegalIntakeSkill | Legal | Matter intake, conflict check trigger, attorney routing |
| ImmigrationSkill | Immigration | Case type triage, document checklist delivery, appointment booking |
| ConstructionSkill | Construction | Project inquiry intake, quote request, subcontractor routing |
| TransportationSkill | Transportation/Trucking | Load inquiry, carrier qualification, dispatch routing |
| RoadsideAssistanceSkill | Roadside | Emergency triage, location capture, dispatch trigger |
| ChurchSkill | Faith Organizations | Visitor welcome, event info, prayer request intake, volunteer routing |
| RealEstateSkill | Real Estate | Buyer/seller qualification, property inquiry, agent routing |
| AccountingSkill | Accounting | Service inquiry, appointment booking, tax deadline comms |
| InsuranceSkill | Insurance | Coverage inquiry, quote request, claims intake |
| RestaurantSkill | Restaurants | Reservation booking, takeout inquiry, catering inquiry |
| HotelSkill | Hotels | Availability inquiry, booking assist, concierge routing |
| MedicalSkill | Healthcare | Appointment booking, intake forms, referral routing |

### Skill Registry

The Skill Registry is the central catalog of all available skills. It is a runtime-configurable store:
```
SkillRegistry {
  register(skill: SkillDefinition): void
  get(skill_id: SkillID): SkillDefinition | null
  getForEmployee(employee_id: EmployeeID, tenant_id: string): SkillDefinition[]
  getForIntent(intent: Intent, tenant_id: string): SkillDefinition[]
  list(tenant_id?: string): SkillDefinition[]
}
```

Adding a new industry is: implement the SkillDefinition, call `registry.register()`. No core system changes.

---

## 7. Sophia Actions™

### Purpose
Actions are the boundary between reasoning and doing. They are atomic, idempotent, provider-independent operations that produce measurable business outcomes. Every meaningful thing Sophia does in the world — creating a lead, booking a meeting, sending a message — is an Action.

### Action Architecture

```
ActionDefinition {
  id: ActionID
  name: string
  version: semver
  required_permissions: Permission[]
  input_schema: JSONSchema
  output_schema: JSONSchema
  idempotency_key_fields: string[]   // fields used to construct idempotency key
  retry_policy: RetryPolicy
  rollback_strategy: RollbackStrategy | null
  timeout_ms: number
  emits_events: EventType[]
}

RetryPolicy {
  max_attempts: number        // default: 3
  backoff: 'linear' | 'exponential'
  retry_on: ErrorCode[]
}
```

### Core Actions

**CreateLead**
```
Input:  { contact_info: ContactInfo, source: string, notes?: string, tenant_id: string }
Output: { lead_id: UUID, created_at: ISO8601 }
Events: lead.created
Idempotency: contact_info.channel + contact_info.identifier + tenant_id (24hr window)
Retry: 3 attempts, exponential backoff
Rollback: mark lead as INVALID (soft delete)
```

**ScheduleMeeting**
```
Input:  { participant: ContactInfo, preferred_time: ISO8601, meeting_type: string, notes?: string }
Output: { meeting_id: UUID, confirmed_time: ISO8601, confirmation_ref: string }
Events: appointment.booked
Idempotency: participant.identifier + preferred_time + tenant_id
Retry: 3 attempts on calendar provider error
Rollback: cancel meeting via calendar adapter
```

**RequestStrategyCall**
```
Input:  { contact_info: ContactInfo, pain_points: string[], qualification_notes: string }
Output: { request_id: UUID, confirmation_sent: boolean }
Events: strategy_call.requested
Idempotency: contact_info.identifier + tenant_id (48hr window)
Retry: 2 attempts
Rollback: none (notification only)
```

**GenerateProposal**
```
Input:  { lead_id: UUID, employee_config: EmployeeConfig[], scope_notes: string }
Output: { proposal_id: UUID, proposal_link: string }
Events: proposal.generated
Idempotency: lead_id + scope_hash + tenant_id
Retry: 2 attempts
Rollback: mark proposal as SUPERSEDED
```

**TransferToHuman**
```
Input:  { conversation_id: UUID, summary: string, reason: HandoffReason, urgency: 'low' | 'medium' | 'high' | 'emergency' }
Output: { ticket_id: UUID, estimated_response_time?: string }
Events: human_handoff.started
Idempotency: conversation_id (one active handoff per conversation)
Retry: none (handoff failures emit conversation.failed)
Rollback: none
```

**SendNotification**
```
Input:  { channel: ChannelType, recipient: ContactInfo, template_id: string, variables: Record<string, string> }
Output: { notification_id: UUID, delivered: boolean }
Events: notification.sent | notification.failed
Idempotency: recipient.identifier + template_id + variables_hash (1hr window)
Retry: 3 attempts per channel adapter
Rollback: none
```

**CreateTicket**
```
Input:  { type: TicketType, priority: Priority, context: string, conversation_id: UUID }
Output: { ticket_id: UUID }
Events: ticket.created
Idempotency: conversation_id + type (one ticket per type per conversation)
Retry: 3 attempts
Rollback: mark ticket CANCELLED
```

**UpdateLeadStatus**
```
Input:  { lead_id: UUID, status: QualificationStage, notes?: string }
Output: { updated: boolean, previous_status: QualificationStage }
Events: lead.updated
Idempotency: lead_id + status + timestamp (5min window)
Retry: 3 attempts
Rollback: restore previous status
```

### Action Permission Model

Actions are not available to Digital Employees by default. Each tenant grants explicit action permissions:
```
TenantActionPermissions {
  tenant_id: string
  employee_id: EmployeeID
  permitted_actions: ActionID[]
  restricted_conditions?: Record<ActionID, Condition>
}
```

Iron Prime™ holds all action permissions for a tenant by default. Digital Employees receive only the actions required for their role.

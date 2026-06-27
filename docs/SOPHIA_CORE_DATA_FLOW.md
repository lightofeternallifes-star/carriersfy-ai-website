---
version: 1.0.0
classification: internal_architecture
owner: Carriersfy AI
status: active
created: 2026-06-25
last_reviewed: 2026-06-25
canonical_source: docs/SOPHIA_CORE_DATA_FLOW.md
related_docs:
  - docs/SOPHIA_CORE_ARCHITECTURE.md
  - docs/SOPHIA_CORE_COMPONENTS.md
  - docs/SOPHIA_CORE_EVENT_SYSTEM.md
---

# Sophia Core™ — Data Flow

> Detailed data flow diagrams for every major operation. Read `SOPHIA_CORE_ARCHITECTURE.md` and `SOPHIA_CORE_COMPONENTS.md` first.

---

## 1. Runtime Flow — Full Conversation Turn

This is the master flow. Every customer message follows this exact path from channel input to channel output.

```
═══════════════════════════════════════════════════════════════
INBOUND
═══════════════════════════════════════════════════════════════

[Customer] ──────────────────────────────────────────────────┐
                                                             │ Raw channel message
                                                             ▼
[Channel Provider Adapter]
  - Receive raw message (voice audio / WhatsApp text / chat text)
  - Normalize to NormalizedMessage:
      { message_id, visitor_id, tenant_id, channel, content,
        timestamp, metadata }
  - Emit: EventBus → 'raw_message.received'
                                                             │
                                                             ▼
[Sophia Runtime™ — Session Manager]
  - Look up ConversationSession by visitor_id + tenant_id
  - If session exists and not expired → load session (WAITING → REASONING)
  - If no session → create new session (IDLE → GREETING)
  - Emit: EventBus → 'conversation.started' OR 'conversation.updated'
                                                             │
  Session loaded                                             ▼
[Sophia Memory™ — Context Load]
  - Load MemorySnapshot for visitor_id + tenant_id:
      { visitor, lead, business, recent_conversations }
  - Attach to session context
  - Emit: (no event — read operation)

═══════════════════════════════════════════════════════════════
INTELLIGENCE
═══════════════════════════════════════════════════════════════

                                                             │
                                                             ▼
[Sophia Knowledge™ — Pre-fetch]
  - Parse message for likely knowledge domains
  - Run Tier 1 semantic search (tenant_id scoped, TIER 1 only)
  - Run Tier 2 keyword lookup if proper nouns detected
  - Return: KnowledgeChunk[] (top 5 by relevance)
                                                             │
                                                             ▼
[Sophia Intelligence™ — Intent Detection]
  Input:
    NormalizedMessage
    + ConversationContext (last N turns)
    + MemorySnapshot
    + KnowledgeChunk[]
  Process:
    → Classify intent (INQUIRY / QUALIFICATION / OBJECTION / etc.)
    → Extract entities (business name, contact, pain points)
    → Assess confidence
  Output:
    IntentClassification {
      intent, confidence, sub_intent, entities
    }
                                                             │
                                                             ▼
[Sophia Intelligence™ — Decision Engine]
  Input:
    IntentClassification
    + ConversationGoal (from Short-Term Memory)
    + MemorySnapshot
    + TenantConfig
  Process:
    → Determine response strategy
       (RESPOND / SKILL / ACTION / HANDOFF / CLARIFY)
    → If SKILL: select skill from registry
    → If HANDOFF: evaluate urgency
    → Update ConversationGoal
  Output:
    IntelligenceDecision {
      decision, response_strategy, skill_route,
      action_requests, next_goal, confidence,
      reasoning_trace
    }

═══════════════════════════════════════════════════════════════
SKILL EXECUTION (if decision = SKILL)
═══════════════════════════════════════════════════════════════

                                                             │
                                                             ▼
[Sophia Runtime™ — Skill Router]
  - Load skill from SkillRegistry by skill_id
  - Validate tenant action permissions for skill's required_actions
  - Validate input against skill.input_schema
                                                             │
                                                             ▼
[Sophia Skills™ — Skill Execution]
  Input: SkillInput (intent + context + memory + knowledge)
  Process:
    → Execute skill-specific business logic
    → May call: Knowledge™ (additional retrieval)
    → May call: Memory™ (update lead/business memory)
    → May generate: ActionRequest[]
  Output:
    SkillOutput {
      raw_response_draft: string,
      action_requests: ActionRequest[],
      memory_updates: MemoryUpdate[],
      skill_outcome: 'CONTINUE' | 'COMPLETE' | 'ESCALATE'
    }
  Emit: EventBus → 'skill.executed'

═══════════════════════════════════════════════════════════════
ACTION EXECUTION (if action_requests present)
═══════════════════════════════════════════════════════════════

                                                             │
                                                             ▼
[Sophia Actions™ — For each ActionRequest]
  - Validate permissions
  - Check idempotency key (is this action already complete?)
  - Validate input schema
  - Execute via Channel/Storage Provider Adapter
  - On success: Emit EventBus → action-specific event (e.g., lead.created)
  - On failure: retry → Emit EventBus → 'action.failed'
  Output: ActionResult[]

═══════════════════════════════════════════════════════════════
MEMORY UPDATE
═══════════════════════════════════════════════════════════════

                                                             │
                                                             ▼
[Sophia Memory™ — Update]
  - Apply MemoryUpdates from SkillOutput
  - Update LeadMemory (stage, pain points, interest signals)
  - Update BusinessMemory (industry, size, needs)
  - Update ShortTermMemory (context window, active goal)
  - Emit: EventBus → 'memory.updated' (per updated memory type)

═══════════════════════════════════════════════════════════════
PERSONALITY APPLICATION
═══════════════════════════════════════════════════════════════

                                                             │
                                                             ▼
[Sophia Personality™ — Post-Processing]
  Input: raw_response_draft + channel + language + tenant_config
  Step 1: Detect channel → adjust verbosity
           (Voice: shorter | Chat: medium | Email: longer)
  Step 2: Detect/confirm language → apply language rules
  Step 3: Apply tone calibration
           (match customer's register within professional bounds)
  Step 4: Enforce writing style
           (sentence length, vocabulary, one-question rule)
  Step 5: Prohibited phrase scan → substitute if found
  Step 6: Policy enforcement:
           - Pricing topic detected → apply redirect
           - Technology question → apply redirect
  Step 7: Customer-safe tier validation
           - Strip any TIER 2/3 content
           - If stripped content was essential → insert escalation offer
  Output: StyledResponse { content: string, channel_format: ChannelFormat }

═══════════════════════════════════════════════════════════════
OUTBOUND
═══════════════════════════════════════════════════════════════

                                                             │
                                                             ▼
[Sophia Runtime™ — Response Dispatch]
  - Update session state: REASONING → WAITING
  - Update last_active_at
  - Package StyledResponse for channel
                                                             │
                                                             ▼
[Channel Provider Adapter — Deliver]
  - Format response for channel (voice synthesis / message format)
  - Deliver to customer
  - On success: Emit EventBus → 'conversation.turn.completed'
  - On failure: retry → Emit EventBus → 'notification.failed'
                                                             │
                                                             ▼
[Customer receives response]
```

**Data objects in flight at each step:**

| Step | Input Object | Output Object |
|---|---|---|
| Channel receive | Raw channel payload | NormalizedMessage |
| Session load | visitor_id + tenant_id | ConversationSession |
| Memory load | visitor_id + tenant_id | MemorySnapshot |
| Knowledge pre-fetch | NormalizedMessage | KnowledgeChunk[] |
| Intent detection | NormalizedMessage + Context + Memory + Knowledge | IntentClassification |
| Decision engine | IntentClassification + Goal + Memory + Config | IntelligenceDecision |
| Skill execution | SkillInput | SkillOutput |
| Action execution | ActionRequest | ActionResult |
| Memory update | MemoryUpdate[] | (void, events emitted) |
| Personality | raw_response_draft + metadata | StyledResponse |
| Channel deliver | StyledResponse | (delivered to customer) |

---

## 2. Knowledge Retrieval Flow

How a knowledge query moves from intent through retrieval to a ranked, tier-filtered result set.

```
[Intelligence™: Query Formulation]
  Input: IntentClassification + ConversationContext + MemorySnapshot
  Output: KnowledgeQuery {
    query_text: string,          // semantic search string
    query_type: 'semantic' | 'lookup' | 'policy',
    entities: string[],          // proper nouns for keyword fallback
    tenant_id: string,
    language: ISO639,
    customer_safe_only: boolean  // true for all customer conversations
  }
         │
         ▼
[Knowledge™: Query Router]
  Evaluate query_type:
  ├── 'policy' ──────────────────────────────────────────────┐
  │   Direct lookup from Policy KB                           │
  │   Returns: exact policy text                             │
  │   Emit: knowledge.retrieval.success                      │
  │                                                          │
  ├── 'lookup' ──────────────────────────────────────────────┤
  │   Keyword/exact match in FAQ KB                          │
  │   If match found: return immediately                     │
  │   If no match: fall through to semantic                  │
  │                                                          │
  └── 'semantic' ────────────────────────────────────────────┘
         │
         ▼
[Knowledge™: Semantic Search — Tier 1]
  1. Embed query_text via AIModelProviderAdapter.embed()
  2. Query vector store:
       namespace = tenant_id (searches tenant KB first)
       filter = { customer_safe_tier: 1 } (if customer_safe_only = true)
       top_k = 10
  3. If tenant KB returns < 3 results:
       Expand search to global namespace (Carriersfy AI KB)
  4. Merge results, sort by cosine similarity
         │
         ▼
[Knowledge™: Keyword Fallback — Tier 2]
  If entities[] not empty AND semantic results confidence < threshold:
    - Run exact-match lookup for each entity in FAQ KB
    - Append unique matches to result set
         │
         ▼
[Knowledge™: Ranking + Filtering]
  1. Deduplicate by chunk_id
  2. Filter by customer_safe_tier (TIER 1 only if customer conversation)
  3. Score: cosine_similarity * recency_weight * source_authority_weight
  4. Return top-3 chunks
  5. Emit: knowledge.retrieval.success (or knowledge.retrieval.fallback if Tier 2 used)
         │
         ▼
[Intelligence™: Synthesis]
  Provided to IntelligenceRequest as knowledge_context: KnowledgeChunk[]
  Intelligence synthesizes a response using the chunks
  Never fabricates content not present in chunks
  If chunks are insufficient: sets confidence low → triggers CLARIFY or HANDOFF
```

**What happens when knowledge retrieval fails:**
```
knowledge.retrieval.failed event emitted
     │
     ▼
Intelligence™ falls back to:
  1. Personality™ default response: "That's a great question —
     I want to make sure you get the most accurate answer.
     Let me connect you with our team."
  2. Runtime™: offer Strategy Call or human handoff
```

---

## 3. Memory Flow

How memory moves through a full conversation lifecycle.

```
═══════════════════════ CONVERSATION START ═══════════════════════

[Runtime™: Session Create/Resume]
     │
     ▼
[Memory™: Snapshot Load]
  Load all memory types for visitor_id + tenant_id:
  - VisitorMemory.get(visitor_id, tenant_id)
  - LeadMemory.get(visitor_id, tenant_id)  // may be null for new visitors
  - BusinessMemory.get(visitor_id, tenant_id)
  - RecommendationMemory.get(visitor_id, tenant_id)
  - ConversationMemory.getRecent(visitor_id, tenant_id, limit=3)
  - LongTermMemory.get(visitor_id, tenant_id)  // only if opted in
  Assemble → MemorySnapshot
  Attach to ConversationSession.memory_snapshot

═══════════════════════ DURING CONVERSATION ════════════════════

  Per Turn:
  [Short-Term Memory updated inline]
    - Append message to context_window (max N turns, drop oldest)
    - Update active entities_mentioned
    - Update active recommendations_made

  On new information captured:
  [Memory™: Write]
    - If new business name/industry detected: update LeadMemory
    - If pain point articulated: append to LeadMemory.pain_points
    - If recommendation made: append to RecommendationMemory
    - If qualification stage advanced: update LeadMemory.qualification_stage
    Emit: memory.updated (per updated type)
    Emit: memory.enriched (if existing record had new data appended)

═══════════════════════ CONVERSATION END ════════════════════════

[Runtime™: Session Closing]
     │
     ▼
[Memory™: Persist Session Summary]
  - Generate ConversationMemory:
      summary: 3–5 sentence description of conversation
      key_facts_learned: extract from ShortTermMemory entities
      outcome: map session final state to outcome string
      next_step_agreed: from closing action or Skill output
  - Store ConversationMemory
  - Update VisitorMemory.last_contact_at, channels_used, total_conversations
  - Clear ShortTermMemory
  Emit: memory.updated (ConversationMemory type)

═══════════════════════ BACKGROUND JOBS ═════════════════════════

[Memory™: Expiry Processor — runs periodically]
  For each memory type with TTL:
  - Scan for records where updated_at + ttl < now
  - For each expired record:
      1. Archive if applicable (ProjectMemory → archive tier)
      2. Delete if no archive requirement
      3. Emit: memory.expired
  - Emit: memory.expiry_run.completed with counts

═══════════════════════ DELETION REQUEST ════════════════════════

[External: GDPR/LGPD right-to-deletion request]
  Input: visitor_id + tenant_id + requestor_identity
     │
     ▼
[Memory™: Deletion Flow]
  1. Validate requestor has authority for visitor_id
  2. For each memory type:
       - Delete all records matching visitor_id + tenant_id
       - Emit: memory.deleted { type, visitor_id, tenant_id }
  3. Anonymize audit log entries (replace PII with pseudonym marker)
  4. Create DeletionAuditRecord:
       { request_id, visitor_id, tenant_id, types_deleted, completed_at }
  5. Emit: memory.deletion.completed
```

---

## 4. Reasoning Flow

How Intelligence™ decides what to do next on each turn.

```
[Input]
  NormalizedMessage
  + ConversationContext (last N turns)
  + MemorySnapshot
  + KnowledgeChunk[] (pre-fetched)
         │
         ▼
[Step 1: Goal Check]
  Load current ConversationGoal from ShortTermMemory
  ├── Goal is active AND message is on-topic
  │     → Continue pursuing current goal
  │
  └── Goal complete / abandoned / message off-topic
        → Detect new goal from intent + memory
        → Emit: conversation.goal.set

         │
         ▼
[Step 2: Sub-Goal Selection]
  Given current goal → what is the next sub-goal?
  Examples:
    Goal: QUALIFICATION
      Sub-goals in order: UNDERSTAND_INDUSTRY → UNDERSTAND_PAIN →
                          UNDERSTAND_URGENCY → RECOMMEND → CLOSE
    Goal: INFORMATION
      Sub-goals: RETRIEVE_ANSWER → CONFIRM_HELPFUL → NEXT_STEP
         │
         ▼
[Step 3: Skill Routing]
  Which skill handles the current sub-goal and intent?
  ├── Intent = SCHEDULING          → SchedulingSkill
  ├── Intent = QUALIFICATION       → LeadQualificationSkill
  ├── Intent = OBJECTION           → SalesSkill (objection flow)
  ├── Intent = PRICING             → (no skill — Personality™ redirects)
  ├── Intent = EMERGENCY           → HANDOFF immediately
  ├── Intent = IDENTITY_CHECK      → (no skill — Personality™ discloses)
  └── Intent = INQUIRY             → CustomerSupportSkill OR Knowledge retrieval
         │
         ▼
[Step 4: Response Strategy]
  Select one of:
  INFORM   — answer the question, no follow-up expected
  ASK      — ask the one clarifying question to advance goal
  RECOMMEND — present the right Digital Employee or service
  ESCALATE — transfer to human
  CLOSE    — wrap up conversation with clear next step
         │
         ▼
[Step 5: Next Turn Planning]
  Project 2 turns ahead:
    Turn N+1: if customer says YES to recommendation → book Strategy Call
    Turn N+1: if customer says NO → objection handling
    Turn N+2: pivot or close
  Store plan in ShortTermMemory.active_plan
         │
         ▼
[Output: IntelligenceDecision]
  {
    decision: SKILL | ACTION | RESPOND | HANDOFF | CLARIFY
    response_strategy: INFORM | ASK | RECOMMEND | ESCALATE | CLOSE
    skill_route: SkillID | null
    action_requests: ActionRequest[]
    raw_response?: string
    next_goal: Goal
    confidence: number
    reasoning_trace: string  // internal audit only
  }
```

---

## 5. Personality Flow

How every response is validated and styled before customer delivery.

```
[Input: raw_response_draft]
  Content from Intelligence™ or Skill™
  Metadata: { channel, language, tenant_id, employee_id, session_state }
         │
         ▼
[Step 1: Channel Detection → Verbosity Calibration]
  VOICE    → max 2 sentences, no bullet points, natural speech rhythm
  WHATSAPP → 3–5 sentences, light formatting, max 1 emoji if customer used one
  CHAT     → 3–6 sentences, can use minimal markdown
  EMAIL    → full paragraphs, formal greeting, formal close
  WEB      → medium, can include formatted elements
         │
         ▼
[Step 2: Language Enforcement]
  Confirm language = session.language (already detected on inbound)
  Apply language-specific:
    - Sentence structure rules
    - Formality level (PT: você vs. tu vs. senhor; ES: usted vs. tú)
    - Cultural warmth calibration
         │
         ▼
[Step 3: Tone Calibration]
  Read last 3 customer messages
  Customer is formal → maintain formal register
  Customer is casual → match warmth, not casualness
  Customer is distressed → priority: acknowledge, then solve
  Customer is skeptical → priority: evidence over claims
         │
         ▼
[Step 4: Writing Style Enforcement]
  - Split sentences > 25 words (voice) or > 40 words (text)
  - Replace jargon with accessible language (unless customer introduced it)
  - Count questions: if > 1 → keep only the highest-priority question
  - Verify response has a clear next-action orientation
         │
         ▼
[Step 5: Prohibited Phrase Scan]
  Scan for ProhibitedPhrase[] (absolute claims, competitor names, tech terms):
  ├── "guaranteed" → "designed to deliver"
  ├── "100%" → "the vast majority of"
  ├── "unlimited" → "built for high volume"
  ├── Any external vendor name → remove + flag
  ├── CRM, API, framework, infrastructure → "Carriersfy AI Platform connection"
  └── (full list in knowledge/00_customer_safe_policy.md)
         │
         ▼
[Step 6: Policy Enforcement]
  Pricing topic detected in response?
    YES → Replace with: "Pricing is fully personalized during Business Discovery.
           I'd be glad to connect you with our team for a tailored proposal."
  Technology question detected?
    YES → Replace with: "The Carriersfy AI Platform handles that seamlessly.
           I'm happy to walk you through what that means for your business."
         │
         ▼
[Step 7: Tier Validation]
  Scan response for customer_safe_tier markers:
  TIER 2 content found → strip segment
  TIER 3 trigger found → replace entire response with escalation offer
  Confirm final response: only TIER 1 content
         │
         ▼
[Output: StyledResponse]
  {
    content: string,          // final, compliant, styled response text
    channel_format: string,   // voice | message | email | web
    applied_rules: string[],  // audit trail of rules applied
    tier_violations_removed: boolean
  }
```

---

## 6. Skills Flow

```
[Intelligence™: Skill Route Decision]
  IntelligenceDecision.skill_route = 'LeadQualificationSkill'
         │
         ▼
[Runtime™: Skill Loader]
  1. SkillRegistry.get('LeadQualificationSkill')
  2. Validate: skill.required_knowledge[] are all indexed for tenant
  3. Validate: skill.required_actions[] are all permitted for employee + tenant
  4. If validation fails → emit skill.failed, fallback to CLARIFY response
         │
         ▼
[Skill: Input Validation]
  Validate incoming context against skill.input_schema
  If invalid → emit skill.failed with validation_error
         │
         ▼
[Skill: Execution]
  Business logic runs:
    LeadQualificationSkill flow:
    Step 1: Do we know the industry? NO → ask (output: ASK response)
    Step 1: Do we know the industry? YES → proceed
    Step 2: Do we know the primary pain? NO → ask
    Step 2: Pain identified → record in MemoryUpdate
    Step 3: Assess urgency signals from conversation context
    Step 4: Determine qualification_stage
    Step 5: Select recommended Digital Employee for their needs
    Step 6: Determine next step (Strategy Call / more info / follow-up)

  Skill may call during execution:
    - Knowledge™.retrieve(query) for industry-specific knowledge
    - Memory™.update(lead_update) to record qualification progress
    - Emit ActionRequest: CreateLead, UpdateLeadStatus
         │
         ▼
[Skill: Output]
  SkillOutput {
    raw_response_draft: string,    // passes to Personality™
    action_requests: ActionRequest[],
    memory_updates: MemoryUpdate[],
    skill_outcome: 'CONTINUE'      // more turns needed
                 | 'COMPLETE'      // goal achieved
                 | 'ESCALATE'      // needs human
  }
  Emit: skill.executed { skill_id, outcome, tenant_id, conversation_id }
         │
         ▼
[Runtime™: Route by skill_outcome]
  CONTINUE → pass response to Personality™, continue session
  COMPLETE → move toward conversation closing
  ESCALATE → trigger TransferToHuman action
```

---

## 7. Actions Flow

```
[Skill: Emit ActionRequest]
  ActionRequest {
    action_id: 'CreateLead',
    inputs: {
      contact_info: { name: "Maria", channel: "whatsapp", identifier: "+5511..." },
      source: "whatsapp_inbound",
      notes: "Interested in Sophia for dental office. High intent."
    },
    idempotency_key: hash(contact_info.identifier + tenant_id)  // auto-computed
  }
         │
         ▼
[Actions™: Permission Check]
  Verify: employee_id has permission for 'CreateLead' in tenant_id
  If denied: emit action.failed { reason: 'permission_denied' }
         │
         ▼
[Actions™: Input Validation]
  Validate inputs against ActionDefinition['CreateLead'].input_schema
  If invalid: emit action.failed { reason: 'validation_error', details }
         │
         ▼
[Actions™: Idempotency Check]
  Lookup idempotency_key in idempotency store (TTL: 24 hours)
  If found (action already executed):
    Return cached ActionResult without re-executing
    Emit: action.executed { idempotent: true }
  If not found: proceed
         │
         ▼
[Actions™: Execute via Provider Adapter]
  Storage Provider Adapter:
    StorageProviderAdapter.insert('leads', lead_record, tenant_id)
  Channel Provider Adapter (if notification needed):
    ChannelProviderAdapter.send(confirmation_message, channel_config)
         │
         ▼
[Actions™: Handle Result]
  SUCCESS:
    Store idempotency_key → result mapping (TTL: 24 hours)
    Emit: EventBus → 'lead.created' {
      lead_id, tenant_id, contact_info (pseudonymized), source, timestamp
    }
    Return: ActionResult { lead_id, created_at }

  FAILURE (transient):
    Retry per RetryPolicy (3 attempts, exponential backoff)
    If all retries exhausted:
      Emit: EventBus → 'action.failed' { action_id, reason, attempt_count }
      Return: ActionResult { error: true, message }
         │
         ▼
[Runtime™: Handle ActionResult]
  SUCCESS → continue conversation flow
  FAILURE → log, adjust response to not reference failed action outcome
  ESCALATE-WORTHY failure → trigger TransferToHuman
```

---
version: 1.0.0
classification: internal_architecture
owner: Carriersfy AI
status: active
created: 2026-06-25
last_reviewed: 2026-06-25
canonical_source: docs/SOPHIA_CORE_EVENT_SYSTEM.md
related_docs:
  - docs/SOPHIA_CORE_ARCHITECTURE.md
  - docs/SOPHIA_CORE_DATA_FLOW.md
  - docs/SOPHIA_CORE_SECURITY.md
---

# Sophia Core™ — Event System

> The complete event architecture. Every meaningful state change in Sophia Core™ is an event.

---

## 1. Event Bus Design

### Architecture
The event bus is a durable, ordered, publish-subscribe system. Systems publish events. Systems subscribe to event types. No system calls another system directly.

```
┌────────────────┐         ┌─────────────────────────┐         ┌────────────────┐
│  Publisher     │  emit   │                         │  deliver│  Consumer A    │
│  (any system)  │────────▶│     EVENT BUS           │────────▶│  (subscriber)  │
└────────────────┘         │                         │         └────────────────┘
                           │  - Tenant-partitioned   │         ┌────────────────┐
                           │  - Ordered per tenant   │────────▶│  Consumer B    │
                           │  - Durable (30 days)    │         └────────────────┘
                           │  - At-least-once        │         ┌────────────────┐
                           │  - DLQ for failures     │────────▶│  Consumer C    │
                           └─────────────────────────┘         └────────────────┘
```

### Properties
- **Durability:** All events persisted for 30 days minimum
- **Ordering:** Causal ordering within a `conversation_id`. No global ordering requirement.
- **Delivery guarantee:** At-least-once. All consumers must be idempotent.
- **Partitioning:** Events are partitioned by `tenant_id`. A tenant's events are processed in order without affecting other tenants.
- **Fan-out:** One event may have multiple subscribers. Each subscriber receives a copy.
- **Backpressure:** Slow consumers do not block the bus; they receive from their position.

### EventEnvelope Schema

Every event is wrapped in a standard envelope:

```
EventEnvelope {
  event_id: UUID             // globally unique
  tenant_id: string          // partition key
  conversation_id: UUID | null
  event_type: string         // dot-notation: 'conversation.started'
  version: semver            // event schema version
  timestamp: ISO8601         // when the event occurred
  source_system: string      // 'sophia.runtime' | 'sophia.memory' | etc.
  payload: object            // event-specific data
  metadata: {
    correlation_id: UUID     // trace a chain of related events
    causation_id: UUID       // the event_id that caused this event
    retry_count: number
    idempotency_key?: string
  }
}
```

---

## 2. Complete Event Catalog

### CONVERSATION EVENTS

---

**`conversation.started`**
- Source: Sophia Runtime™
- Trigger: First message received from a visitor on a new session
- Payload:
  ```
  { session_id, visitor_id, tenant_id, employee_id, channel, language,
    is_returning_visitor: boolean, memory_loaded: boolean }
  ```
- Consumers: Memory™ (load snapshot), Intelligence™ (initialize goal), Analytics
- Side effects: Session created in state store; VisitorMemory updated

---

**`conversation.turn.completed`**
- Source: Sophia Runtime™
- Trigger: Response delivered to customer for one turn
- Payload:
  ```
  { session_id, turn_id, turn_number, intent, decision,
    skill_used: SkillID | null, actions_executed: ActionID[],
    knowledge_sources: string[], response_length: number,
    tier_violations_removed: boolean, latency_ms: number }
  ```
- Consumers: Analytics, Audit Logger, Iron Prime™ (telemetry)
- Side effects: Turn appended to audit log

---

**`conversation.goal.set`**
- Source: Sophia Intelligence™
- Trigger: New ConversationGoal established or goal changed
- Payload:
  ```
  { session_id, goal_id, goal_type, previous_goal_id: UUID | null,
    trigger_intent: Intent }
  ```
- Consumers: Memory™ (update ShortTermMemory), Analytics
- Side effects: Active goal updated in ShortTermMemory

---

**`conversation.goal.achieved`**
- Source: Sophia Skills™ or Intelligence™
- Trigger: Skill returns COMPLETE outcome and goal type is fulfilled
- Payload:
  ```
  { session_id, goal_id, goal_type, outcome_summary, turns_to_achieve: number }
  ```
- Consumers: Analytics, Iron Prime™, Memory™ (persist to ConversationMemory)
- Side effects: Goal recorded in ConversationMemory

---

**`conversation.goal.abandoned`**
- Source: Sophia Runtime™ (timeout) or Intelligence™ (topic shift)
- Trigger: Goal cannot be completed — visitor left topic or session timed out
- Payload:
  ```
  { session_id, goal_id, goal_type, reason: 'timeout' | 'topic_shift' | 'handoff',
    progress_at_abandon: number }
  ```
- Consumers: Analytics, Memory™
- Side effects: Partial progress saved to ConversationMemory

---

**`conversation.updated`**
- Source: Sophia Runtime™
- Trigger: Session state changes (REASONING → WAITING, etc.)
- Payload:
  ```
  { session_id, previous_state, new_state, trigger_event_id }
  ```
- Consumers: State Manager, Analytics
- Side effects: ConversationSession.state updated

---

**`conversation.completed`**
- Source: Sophia Runtime™
- Trigger: Conversation reaches terminal state (natural close or handoff accepted)
- Payload:
  ```
  { session_id, visitor_id, tenant_id, employee_id, final_outcome,
    total_turns, session_duration_ms, next_step_agreed: string | null }
  ```
- Consumers: Memory™ (persist session summary), Analytics, Iron Prime™
- Side effects: ConversationMemory created; session archived

---

**`conversation.failed`**
- Source: Sophia Runtime™
- Trigger: Unrecoverable error (all retries exhausted, critical system unavailable)
- Payload:
  ```
  { session_id, failure_reason, last_successful_state, can_recover: boolean }
  ```
- Consumers: Alerting, Human Review Queue, Analytics
- Side effects: Session marked FAILED; human review triggered if visitor was mid-conversation

---

**`conversation.timed_out`**
- Source: Sophia Runtime™
- Trigger: Inactivity timeout exceeded
- Payload:
  ```
  { session_id, visitor_id, tenant_id, state_at_timeout,
    inactivity_duration_ms }
  ```
- Consumers: Memory™ (save partial summary), Analytics
- Side effects: Session moved to IDLE; partial ConversationMemory written

---

**`conversation.recovered`**
- Source: Sophia Runtime™
- Trigger: Visitor reconnects within grace period after timeout
- Payload:
  ```
  { session_id, recovery_source_session_id, time_since_timeout_ms }
  ```
- Consumers: Memory™ (reload snapshot), Runtime™ (restore state)
- Side effects: Session restored to WAITING state with previous context

---

### MEMORY EVENTS

---

**`memory.updated`**
- Source: Sophia Memory™
- Trigger: Any memory record written or updated
- Payload:
  ```
  { visitor_id, tenant_id, memory_type, record_id,
    fields_updated: string[], is_new_record: boolean }
  ```
- Consumers: Analytics, Iron Prime™ (lead tracking)
- Side effects: Memory record updated in store

---

**`memory.expired`**
- Source: Memory™ Expiry Processor
- Trigger: TTL exceeded for a memory record
- Payload:
  ```
  { visitor_id, tenant_id, memory_type, record_id,
    expired_at: ISO8601, ttl_days: number }
  ```
- Consumers: Analytics
- Side effects: Record deleted from store

---

**`memory.deleted`**
- Source: Sophia Memory™
- Trigger: Right-to-deletion request processed
- Payload:
  ```
  { visitor_id, tenant_id, memory_type, deletion_request_id,
    deleted_at: ISO8601 }
  ```
- Consumers: Compliance Audit Logger (required), Analytics
- Side effects: Record deleted; audit entry created

---

**`memory.enriched`**
- Source: Sophia Memory™
- Trigger: New information appended to an existing memory record (e.g., new pain point added to LeadMemory)
- Payload:
  ```
  { visitor_id, tenant_id, memory_type, record_id,
    enriched_fields: string[], source_conversation_id: UUID }
  ```
- Consumers: Analytics, Iron Prime™
- Side effects: Record updated with new data

---

### KNOWLEDGE EVENTS

---

**`knowledge.updated`**
- Source: Carriersfy AI Platform (content management)
- Trigger: A knowledge source file is updated
- Payload:
  ```
  { source: KnowledgeSource, source_file: string,
    previous_version: semver, new_version: semver,
    tenant_id: string | 'global', change_type: 'content' | 'policy' | 'faq' }
  ```
- Consumers: Knowledge™ Indexer (triggers re-indexing)
- Side effects: Re-indexing job queued

---

**`knowledge.indexed`**
- Source: Knowledge™ Indexer
- Trigger: Re-indexing job completed successfully
- Payload:
  ```
  { source: KnowledgeSource, version: semver, tenant_id: string | 'global',
    chunks_indexed: number, indexed_at: ISO8601, duration_ms: number }
  ```
- Consumers: Knowledge™ (switch to new index version), Analytics
- Side effects: Knowledge™ begins serving from new index

---

**`knowledge.retrieval.success`**
- Source: Sophia Knowledge™
- Trigger: Retrieval query returned results above confidence threshold
- Payload:
  ```
  { query_id: UUID, tenant_id, conversation_id,
    strategy_used: 'semantic' | 'keyword' | 'policy',
    chunks_returned: number, top_confidence: number }
  ```
- Consumers: Analytics (performance monitoring)

---

**`knowledge.retrieval.fallback`**
- Source: Sophia Knowledge™
- Trigger: Primary semantic retrieval insufficient; keyword fallback was used
- Payload:
  ```
  { query_id, tenant_id, conversation_id,
    semantic_confidence: number, fallback_strategy: string }
  ```
- Consumers: Analytics (quality monitoring — frequent fallback = knowledge gap)

---

**`knowledge.retrieval.failed`**
- Source: Sophia Knowledge™
- Trigger: All retrieval strategies returned no usable results
- Payload:
  ```
  { query_id, tenant_id, conversation_id, query_text_hash: string,
    strategies_attempted: string[] }
  ```
- Consumers: Intelligence™ (fallback to escalation), Analytics, Knowledge Gap Tracker
- Side effects: Intelligence™ falls back to human-routing response

---

### LEAD EVENTS

---

**`lead.created`**
- Source: Sophia Actions™ (CreateLead action)
- Trigger: CreateLead action executed successfully
- Payload:
  ```
  { lead_id, tenant_id, visitor_id, source: string,
    contact_channel: ChannelType, created_at: ISO8601 }
  ```
- Consumers: Iron Prime™, CRM adapter (if configured), Analytics
- Side effects: Lead record created in store; LeadMemory initialized

---

**`lead.updated`**
- Source: Sophia Actions™ (UpdateLeadStatus) or Memory™
- Trigger: Lead record changed (status, contact info, notes)
- Payload:
  ```
  { lead_id, tenant_id, fields_changed: string[],
    previous_status?: QualificationStage, new_status?: QualificationStage }
  ```
- Consumers: Iron Prime™, CRM adapter, Analytics

---

**`lead.qualified`**
- Source: Sophia Skills™ (LeadQualificationSkill)
- Trigger: Lead qualification_stage updated to 'high_intent'
- Payload:
  ```
  { lead_id, tenant_id, qualification_stage: 'high_intent',
    pain_points_identified: string[], recommended_employee: EmployeeID,
    qualified_by: EmployeeID, conversation_id: UUID }
  ```
- Consumers: Iron Prime™, CRM adapter, Notification system (alert tenant admin)
- Side effects: Tenant admin notified; lead priority elevated in CRM

---

**`lead.disqualified`**
- Source: Sophia Skills™
- Trigger: Lead determined not a fit at this time
- Payload:
  ```
  { lead_id, tenant_id, reason: string,
    requalification_date?: ISO8601 }
  ```
- Consumers: Iron Prime™, CRM adapter

---

**`lead.converted`**
- Source: External (human sales team or contract system)
- Trigger: Lead becomes a signed client
- Payload:
  ```
  { lead_id, tenant_id, client_id,
    converted_at: ISO8601, converted_by: string }
  ```
- Consumers: Iron Prime™, Analytics, Memory™ (update LeadMemory)

---

**`lead.lost`**
- Source: External or timeout logic
- Trigger: Lead goes cold with no conversion
- Payload:
  ```
  { lead_id, tenant_id, days_since_last_contact: number,
    last_qualification_stage: QualificationStage }
  ```
- Consumers: Iron Prime™, Analytics

---

### ACTION EVENTS

---

**`builder.started`**
- Source: Digital Employee Factory™ or App Builder™
- Trigger: Customer begins a builder configurator flow
- Payload:
  ```
  { builder_type: 'employee' | 'app', session_id, tenant_id,
    visitor_id, started_at: ISO8601 }
  ```
- Consumers: Analytics, Iron Prime™

---

**`builder.completed`**
- Source: Digital Employee Factory™ or App Builder™
- Trigger: Builder flow completed successfully
- Payload:
  ```
  { builder_type, session_id, tenant_id, visitor_id,
    configuration_summary: object, completed_at: ISO8601 }
  ```
- Consumers: Analytics, CreateLead action (if contact captured), Iron Prime™

---

**`strategy_call.requested`**
- Source: Sophia Actions™ (RequestStrategyCall)
- Trigger: RequestStrategyCall action executed
- Payload:
  ```
  { request_id, lead_id, tenant_id, visitor_id,
    pain_points: string[], preferred_channel: ChannelType,
    requested_at: ISO8601 }
  ```
- Consumers: Iron Prime™, Carriersfy AI internal notification, CRM adapter
- Side effects: Tenant admin notified; Strategy Call queued

---

**`appointment.booked`**
- Source: Sophia Actions™ (ScheduleMeeting)
- Trigger: ScheduleMeeting action executed
- Payload:
  ```
  { meeting_id, lead_id, tenant_id, meeting_type,
    confirmed_time: ISO8601, channel: ChannelType }
  ```
- Consumers: Calendar adapter, Notification system, Analytics

---

**`appointment.cancelled`**
- Source: Customer or tenant admin
- Trigger: Booked appointment cancelled
- Payload:
  ```
  { meeting_id, tenant_id, cancelled_by: 'customer' | 'agent',
    reason?: string, cancelled_at: ISO8601 }
  ```
- Consumers: Calendar adapter, Notification system (send cancellation), Analytics

---

**`human_handoff.started`**
- Source: Sophia Runtime™
- Trigger: TransferToHuman action executed
- Payload:
  ```
  { ticket_id, session_id, tenant_id, visitor_id, employee_id,
    handoff_reason: string, urgency: 'low' | 'medium' | 'high' | 'emergency',
    conversation_summary: string, recommended_next_step: string }
  ```
- Consumers: Human review queue, Notification system (alert human agent)
- Side effects: Session enters HANDOFF state; human agent notified

---

**`human_handoff.completed`**
- Source: External (human agent system)
- Trigger: Human agent accepts and closes the handoff ticket
- Payload:
  ```
  { ticket_id, session_id, tenant_id,
    resolved_by: string, resolution_notes: string,
    completed_at: ISO8601 }
  ```
- Consumers: Runtime™ (move session to COMPLETED), Memory™, Analytics

---

**`notification.sent`**
- Source: Sophia Actions™ (SendNotification)
- Payload:
  ```
  { notification_id, tenant_id, recipient_pseudonym, channel,
    template_id, delivered: boolean, sent_at: ISO8601 }
  ```
- Consumers: Analytics

---

**`proposal.generated`**
- Source: Sophia Actions™ (GenerateProposal)
- Payload:
  ```
  { proposal_id, lead_id, tenant_id, employee_config_summary,
    generated_at: ISO8601 }
  ```
- Consumers: Iron Prime™, CRM adapter, Notification system

---

**`ticket.created`**
- Source: Sophia Actions™ (CreateTicket)
- Payload:
  ```
  { ticket_id, tenant_id, type, priority, conversation_id,
    created_at: ISO8601 }
  ```
- Consumers: Human review queue, Analytics

---

### SYSTEM EVENTS

---

**`skill.loaded`** — Skill registered or updated in SkillRegistry  
**`skill.executed`** — Skill ran successfully; includes outcome  
**`skill.failed`** — Skill failed (validation error, missing action permission, or runtime error)  
**`action.executed`** — Action completed (includes idempotent=true for cached results)  
**`action.failed`** — Action exhausted retries  
**`tenant.config.updated`** — Tenant configuration changed; downstream systems must re-load config  
**`employee.deployed`** — Digital Employee went live for a tenant  
**`employee.deactivated`** — Digital Employee deactivated for a tenant  

---

## 3. Event Routing Table

| Event | Primary Consumers |
|---|---|
| conversation.started | Memory™, Intelligence™, Analytics |
| conversation.turn.completed | Audit Logger, Analytics, Iron Prime™ |
| conversation.completed | Memory™, Analytics, Iron Prime™ |
| conversation.failed | Alerting, Human Queue, Analytics |
| memory.updated | Analytics, Iron Prime™ |
| memory.deleted | Compliance Audit Logger |
| knowledge.updated | Knowledge™ Indexer |
| knowledge.indexed | Knowledge™ (version switch) |
| knowledge.retrieval.failed | Intelligence™, Knowledge Gap Tracker |
| lead.created | Iron Prime™, CRM Adapter, Analytics |
| lead.qualified | Iron Prime™, CRM Adapter, Tenant Notification |
| strategy_call.requested | Iron Prime™, Internal Notification, CRM |
| appointment.booked | Calendar Adapter, Notification System |
| human_handoff.started | Human Queue, Notification System |
| human_handoff.completed | Runtime™, Memory™, Analytics |
| tenant.config.updated | All systems (reload config on next request) |
| employee.deployed | Analytics, Iron Prime™ |

---

## 4. Dead Letter Queue

Events that fail all delivery attempts are routed to the Dead Letter Queue (DLQ).

**DLQ Policy:**
- An event enters DLQ after 3 failed delivery attempts to any consumer
- DLQ entries are retained for 72 hours
- DLQ is monitored; > 5 entries per hour triggers an alert
- Manual review queue: DLQ entries can be inspected, replayed, or discarded by authorized engineers

**DLQ Entry Schema:**
```
DLQEntry {
  original_event: EventEnvelope
  failure_reason: string
  failed_consumers: string[]
  attempt_count: number
  first_failed_at: ISO8601
  last_attempt_at: ISO8601
  review_status: 'pending' | 'replayed' | 'discarded'
}
```

**Alerting thresholds:**
- 5+ DLQ entries/hour → Warning alert
- 20+ DLQ entries/hour → Critical alert
- Any `conversation.failed` or `human_handoff.started` with urgency='emergency' in DLQ → Immediate page

---

## 5. Event Versioning

Events evolve over time. The versioning strategy ensures backward compatibility without a global migration lock.

**Strategy: Additive-Only Minor Changes**

- **PATCH (1.0.x):** Bug fixes in payload values. No schema change. No consumer update needed.
- **MINOR (1.x.0):** New optional fields added to payload. Old consumers ignore unknown fields. No consumer update required for continued operation.
- **MAJOR (x.0.0):** Breaking change — field removed, field renamed, required field added. Requires coordinated consumer update.

**Version field:** Every EventEnvelope carries a `version` field. Consumers check version before processing:
```
if (event.version.major > CONSUMER_SUPPORTED_MAJOR) {
  emit('event.version.unsupported', { event_id, supported_version, received_version })
  route to DLQ for manual review
}
```

**Migration pattern for MAJOR changes:**
1. Publish new event_type with v2 schema alongside old v1 type
2. Consumers migrate to v2 incrementally
3. After all consumers migrated: deprecate v1 type (30-day sunset)
4. Remove v1 type

**Event type deprecation:**
- Deprecated event types emit alongside new replacement for 30 days
- Deprecation notice in `EventEnvelope.metadata.deprecation_notice`
- After sunset: old publishers removed; old consumers receive no events (graceful starvation, not error)

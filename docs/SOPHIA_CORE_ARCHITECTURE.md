---
version: 1.0.0
classification: internal_architecture
owner: Carriersfy AI
status: active
created: 2026-06-25
last_reviewed: 2026-06-25
canonical_source: docs/SOPHIA_CORE_ARCHITECTURE.md
related_docs:
  - docs/SOPHIA_CORE_COMPONENTS.md
  - docs/SOPHIA_CORE_DATA_FLOW.md
  - docs/SOPHIA_CORE_EVENT_SYSTEM.md
  - docs/SOPHIA_CORE_SECURITY.md
  - docs/SOPHIA_CORE_ROADMAP.md
  - docs/SOPHIA_CORE_DECISIONS.md
---

# Sophia Core™ — Master Architecture

> The definitive architectural reference for the Carriersfy AI Platform. Every engineer, architect, and technical lead reads this document first.

---

## 1. Executive Summary

Sophia Core™ is the proprietary operating system that powers every Digital Employee built by Carriersfy AI. It is not a chatbot framework, not a workflow automation tool, and not a thin wrapper around a language model. It is a complete, enterprise-grade runtime designed to deploy professional-grade AI employees that operate at scale, across industries, in multiple languages, on any channel — without exposing the underlying technology to the customer or creating lock-in with any vendor.

The system is designed around three convictions: that AI employees must behave like professionals (not tools), that the business logic governing those employees must be independent of any AI model provider, and that the platform must scale from one client to a global enterprise without re-architecting. Every major design decision traces back to these convictions. Event-driven integration, provider abstraction, multi-tenancy by default, skill composition, and the separation of personality from reasoning — all of these are direct expressions of what it means to build AI employees at enterprise scale.

Sophia Core™ enables a single platform to power Sophia, Nova, Titan, Orion, Atlas, Echo, and Iron Prime™ simultaneously, each with their own role, personality, knowledge, and capabilities, all sharing the same reliable foundation. Today it powers Carriersfy AI's own Digital Employees. Tomorrow it becomes the infrastructure on which third parties deploy their own branded AI workforces.

---

## 2. Design Philosophy

### Modular
Every system within Sophia Core™ is independently replaceable. Sophia Runtime™ can be swapped for a different session manager without touching Sophia Intelligence™. Sophia Skills™ can be extended without touching Sophia Memory™. This is not just a best practice — it is a survival requirement. The AI industry is evolving faster than any single architecture can predict. Modular design ensures that Sophia Core™ adapts to that change without full rewrites.

### Event-Driven
Systems communicate through events on a shared event bus, not through direct function calls or synchronous HTTP chains. This eliminates tight coupling between systems, makes the entire platform auditable by default (every meaningful state change is an event), and enables horizontal scaling without coordination overhead. It also makes the system observable: when something goes wrong, the event log tells the full story.

### Provider-Independent
No business logic in Sophia Core™ may import, reference, or depend on any AI vendor's SDK, API client, or model identifier. All model access is mediated through the AI Model Provider Adapter interface. This is the most important architectural constraint in the system. The AI model landscape will change — models will improve, pricing will shift, vendors will rise and fall. Sophia Core™ must be able to swap the underlying model without changing a single line of business logic.

### AI-Model-Independent
Related to but distinct from provider independence: the reasoning layer of Sophia Core™ is defined in terms of business concepts — intents, goals, decisions, recommendations — not in terms of prompt templates or model capabilities. The model is a computation engine. The business logic is expressed in the architecture. Any sufficiently capable model should be able to execute the same business logic.

### Horizontally Scalable
Every stateful resource is external. Compute nodes hold no conversation state, no memory, no knowledge indexes. This means any node can handle any request. Adding capacity means adding compute instances, not re-architecting state management. The platform is designed to handle millions of concurrent conversations across thousands of tenants without a single shared bottleneck.

### Cloud-Ready
The infrastructure layer is fully abstracted. Sophia Core™ makes no assumptions about the underlying cloud provider. Compute, storage, message queuing, secret management — all accessed through adapter interfaces. Deployment to any major cloud environment is a configuration exercise, not a code change.

### Enterprise-Ready
Multi-tenant isolation, audit logging, role-based access control, compliance configuration, and SLA monitoring are first-class concerns — not features added later. Enterprise customers cannot be served without these guarantees in place from day one. Retrofitting enterprise features into a consumer-grade architecture always fails.

### SOLID Compliant
Single Responsibility: each system has one job. Open/Closed: systems are extended through new skills and adapters, not by modifying existing code. Liskov Substitution: all adapters are interchangeable behind their interfaces. Interface Segregation: consumers depend only on the interfaces they need. Dependency Inversion: business logic depends on abstractions, never on concrete implementations. SOLID compliance is enforced as an architectural standard, not a preference.

### Future-Proof
No architectural decision should foreclose a future capability. The event system supports capabilities not yet imagined. The skill registry accepts skills not yet written. The provider adapter supports models not yet released. Every extension point is defined so that the next feature is an addition, not a replacement.

### White-Label Capable
Every tenant-facing surface — name, voice, personality, communication style, brand language — is runtime configuration. A business deploying Sophia Core™ under their own brand receives a fully configured Digital Employee that carries their identity, not Carriersfy AI's. The Carriersfy AI Platform branding is the default, not a constraint.

### Multi-Language
English, Portuguese, and Spanish are first-class. The architecture supports unlimited additional languages through runtime configuration. Language detection, response generation, and cultural calibration are handled at the Personality layer. Adding a new language requires adding translations and calibration rules — it does not require a code deployment.

### Multi-Country
Compliance regimes, timezones, currencies, and locale-specific behavior are runtime configuration per tenant, not code branches. A Brazilian deployment and a US deployment run on the same codebase with different tenant configuration. Adding a new country is a configuration exercise.

### Multi-Industry
Industry-specific behavior is encapsulated in Skills, which are plugins registered in the Skill Registry. The core platform has no hardcoded industry logic. Adding Dental support means adding a DentalSkill. The platform does not need to know about dentistry — it only needs to know how to load and execute a skill.

### Multi-Tenant
Every tenant is isolated by design. Data, configuration, knowledge, events, and credentials are all scoped to a tenant_id. There is no possibility of tenant data leaking to another tenant without an explicit, audited routing decision.

---

## 3. System Overview

| System | Purpose | Primary Inputs | Primary Outputs | Key Responsibilities |
|---|---|---|---|---|
| Sophia Runtime™ | Conversation lifecycle management | Channel messages, session tokens | Formatted responses, events | Session, state machine, routing, handoff, recovery |
| Sophia Intelligence™ | Business reasoning and decision engine | Conversation context, memory, knowledge | Decisions, recommendations, response strategies | Intent detection, goal planning, decision engine |
| Sophia Knowledge™ | Enterprise knowledge retrieval | Queries, context, tenant_id | Ranked knowledge chunks | Indexing, retrieval, tier filtering, versioning |
| Sophia Memory™ | Persistent customer understanding | Visitor/lead identifiers, conversation updates | Memory objects by type | Store, retrieve, expire, delete memory across 8 types |
| Sophia Personality™ | Consistent professional identity | Raw responses, channel context, language | Styled, compliant responses | Tone, language, prohibited phrase enforcement, policy compliance |
| Sophia Skills™ | Reusable business capabilities | Intent, context, skill input schema | Skill output, action requests | Execute role-specific business logic, compose capabilities |
| Sophia Actions™ | Business operation execution | Action requests, tenant permissions | Operation results, events | Atomic operations, idempotency, provider-independent execution |

---

## 4. Architecture Layers

The Sophia Core™ architecture is organized into seven layers. Each layer has a single responsibility, depends only on layers below it, and exposes a well-defined interface to layers above it.

```
┌─────────────────────────────────────────────────────────────┐
│  CHANNEL LAYER                                              │
│  Voice · WhatsApp · Chat · Email · Web                      │
├─────────────────────────────────────────────────────────────┤
│  TENANT LAYER                                               │
│  Per-business config · Branding · KB overrides · Permissions│
├─────────────────────────────────────────────────────────────┤
│  CAPABILITY LAYER                                           │
│  Skills™ · Actions™ · Skill Registry · Action Registry     │
├─────────────────────────────────────────────────────────────┤
│  IDENTITY LAYER                                             │
│  Personality™ · Culture · Communication Rules · Style       │
├─────────────────────────────────────────────────────────────┤
│  INTELLIGENCE LAYER                                         │
│  Intelligence™ · Knowledge™ · Memory™                       │
├─────────────────────────────────────────────────────────────┤
│  PLATFORM LAYER                                             │
│  Runtime™ · Event Bus · State Management · Adapters        │
├─────────────────────────────────────────────────────────────┤
│  INFRASTRUCTURE LAYER                                       │
│  Compute · Storage · Network · Secrets (provider-abstracted)│
└─────────────────────────────────────────────────────────────┘
```

### Infrastructure Layer
**Purpose:** Provides all underlying compute, storage, network, and secrets capabilities in a provider-agnostic form.  
**Contains:** Compute runtime (containers/serverless), distributed key-value store, vector store, relational store, message queue, secret vault, CDN/edge.  
**Depends on:** External cloud provider (abstracted away from all higher layers).  
**Depended on by:** Platform Layer (exclusively).  
**Key constraint:** Nothing above this layer may reference a specific infrastructure provider. All access goes through Storage Provider Adapter or Channel Provider Adapter interfaces defined in the Platform Layer.

### Platform Layer
**Purpose:** The core runtime engine of Sophia Core™. Manages conversation sessions, coordinates all system-to-system communication through the event bus, and maintains state.  
**Contains:** Sophia Runtime™, Event Bus, State Manager, AI Model Provider Adapter, Channel Provider Adapter, Storage Provider Adapter.  
**Depends on:** Infrastructure Layer.  
**Depended on by:** All higher layers.  
**Key constraint:** This layer is the only layer that directly interacts with the Infrastructure Layer. All communication between systems passes through the Event Bus.

### Intelligence Layer
**Purpose:** Transforms raw input into business understanding. Retrieves knowledge. Maintains memory.  
**Contains:** Sophia Intelligence™, Sophia Knowledge™, Sophia Memory™.  
**Depends on:** Platform Layer (event bus, storage adapters, AI model adapter).  
**Depended on by:** Capability Layer, Identity Layer.  
**Key constraint:** Intelligence never calls an AI provider directly. All model calls go through the AI Model Provider Adapter.

### Identity Layer
**Purpose:** Ensures every response reflects the correct professional identity, tone, language, and policy compliance for the active Digital Employee and tenant.  
**Contains:** Sophia Personality™.  
**Depends on:** Intelligence Layer (for raw response input), Platform Layer (for tenant configuration).  
**Depended on by:** Channel Layer (receives styled, compliant output).  
**Key constraint:** Personality is post-processing. It never alters the factual content of a response — it only alters the expression. Prohibited phrase enforcement and tier filtering happen here.

### Capability Layer
**Purpose:** Executes concrete business logic and operations.  
**Contains:** Sophia Skills™, Sophia Actions™, Skill Registry, Action Registry.  
**Depends on:** Intelligence Layer (for routing decisions), Platform Layer (for event bus and adapters).  
**Depended on by:** Platform Layer (actions execute through adapters), Tenant Layer (skills configured per tenant).  
**Key constraint:** Skills are plugins — they are registered, not hardcoded. Actions are atomic and idempotent. Neither skills nor actions may have direct channel dependencies.

### Tenant Layer
**Purpose:** Applies per-business configuration, branding, knowledge overrides, and permission sets to every request.  
**Contains:** Tenant configuration store, KB override store, employee personality config, action permission grants, white-label config.  
**Depends on:** Platform Layer (for configuration storage), Capability Layer (for action permission enforcement).  
**Depended on by:** Channel Layer.  
**Key constraint:** Tenant configuration overrides must not affect other tenants. Isolation is enforced at the storage layer by tenant_id partitioning.

### Channel Layer
**Purpose:** Receives customer messages from any channel and delivers formatted responses back to that channel.  
**Contains:** Voice adapter, WhatsApp adapter, Chat adapter, Email adapter, Web adapter.  
**Depends on:** Tenant Layer (for configuration), Identity Layer (for styled responses).  
**Depended on by:** Customers (external).  
**Key constraint:** Channel adapters handle format translation only. No business logic lives in channel adapters. All business logic is in higher layers.

---

## 5. Digital Employee Model

Every Digital Employee is constructed from Sophia Core™ through composition, not inheritance. The base platform is shared. The configuration is specific.

```
Sophia Core™
└── Digital Employee Base
    ├── Sophia™ (Chief AI Business Consultant)
    │   ├── Personality: warm, consultative, premium, patient
    │   ├── Knowledge: Global KB + CarriersfyAI KB + Tenant KB
    │   ├── Skills: [SalesSkill, LeadQualificationSkill, CustomerSupportSkill, SchedulingSkill]
    │   ├── Actions: [CreateLead, RequestStrategyCall, ScheduleMeeting, SendNotification]
    │   └── Channels: [Voice, WhatsApp, Web, Chat, Email]
    │
    ├── Nova™ (Sales Specialist)
    │   ├── Personality: energetic, persuasive, results-focused, professional
    │   ├── Knowledge: Global KB + Services KB + Tenant KB
    │   ├── Skills: [SalesSkill, LeadQualificationSkill, FollowUpSkill]
    │   ├── Actions: [CreateLead, UpdateLeadStatus, SendNotification, GenerateProposal]
    │   └── Channels: [WhatsApp, Chat, SMS]
    │
    ├── Titan™ (Lead Qualification Specialist)
    │   ├── Personality: analytical, precise, efficient, professional
    │   ├── Knowledge: Global KB + Industry KB + Tenant KB
    │   ├── Skills: [LeadQualificationSkill, SalesSkill, IndustrySkill(tenant-configured)]
    │   ├── Actions: [CreateLead, UpdateLeadStatus, RequestStrategyCall]
    │   └── Channels: [Voice, WhatsApp, Chat]
    │
    ├── Orion™ (Customer Success Manager)
    │   ├── Personality: empathetic, solution-oriented, proactive, professional
    │   ├── Knowledge: Global KB + Support KB + Tenant KB
    │   ├── Skills: [CustomerSupportSkill, SchedulingSkill, EscalationSkill]
    │   ├── Actions: [CreateTicket, ScheduleMeeting, UpdateLeadStatus, TransferToHuman]
    │   └── Channels: [WhatsApp, Chat, Email, Voice]
    │
    ├── Atlas™ (Operations Manager)
    │   ├── Personality: methodical, dependable, process-oriented, professional
    │   ├── Knowledge: Global KB + Ops KB + Tenant KB
    │   ├── Skills: [SchedulingSkill, CustomerSupportSkill, WorkflowSkill]
    │   ├── Actions: [ScheduleMeeting, CreateTicket, SendNotification]
    │   └── Channels: [WhatsApp, Chat, Email]
    │
    └── Echo™ (Communications Specialist)
        ├── Personality: clear, responsive, warm, professional
        ├── Knowledge: Global KB + Comms KB + Tenant KB
        ├── Skills: [CustomerSupportSkill, FollowUpSkill, NotificationSkill]
        ├── Actions: [SendNotification, CreateLead, UpdateLeadStatus]
        └── Channels: [WhatsApp, SMS, Email, Chat]

Iron Prime™ (AI Chief Executive Officer — Executive Orchestration Layer)
├── Role: Orchestrates all Digital Employees across a tenant deployment
├── Intelligence: Full platform visibility — all conversations, all leads, all performance data
├── Skills: [OrchestratorSkill, AnalyticsSkill, EscalationSkill, StrategySkill]
├── Actions: [All Actions] + [CrossEmployeeRoute, GenerateReport, TriggerWorkflow]
└── Channels: Internal bus only — no direct customer-facing channel
```

**Composition rules:**
1. Every Digital Employee must be assigned at least one Skill and at least one Action.
2. Actions assigned to an employee must have tenant-level permission grants.
3. Personality configuration may be tenant-overridden for name, voice, and depth — but communication principles are non-overridable.
4. Iron Prime™ is never assigned to a customer-facing channel. All Iron Prime actions are logged with full audit trail.

---

## 6. Multi-Tenancy Model

### Tenant Isolation Model

Every record in every store carries a `tenant_id`. Storage queries are always scoped: `WHERE tenant_id = :current_tenant`. There is no query path that does not include tenant scoping. This is enforced at the Storage Provider Adapter layer — callers cannot bypass it.

| Resource | Isolation Mechanism |
|---|---|
| Conversation data | tenant_id partition key |
| Memory stores | tenant_id partition key + encryption per tenant |
| Knowledge base | tenant_id prefix in vector index namespace |
| Events | tenant_id partition on event bus |
| Configuration | per-tenant config store, versioned |
| Secrets/credentials | per-tenant vault entry, never shared |
| Audit logs | tenant_id partition, immutable append-only |

### Shared vs. Tenant-Specific Resources

| Resource | Shared | Tenant-Specific |
|---|---|---|
| Sophia Core™ runtime | ✅ | |
| Global KB (Carriersfy AI company knowledge) | ✅ | |
| Skill implementations | ✅ | |
| Action implementations | ✅ | |
| Conversation data | | ✅ |
| Tenant KB (business-specific knowledge) | | ✅ |
| Memory records | | ✅ |
| Employee personality config | | ✅ |
| Action permissions | | ✅ |
| Analytics data | | ✅ |

### White-Label Capability

A tenant configured for white-label deployment can set:
- Employee name (replaces "Sophia" with custom name)
- Company name (replaces "Carriersfy AI" in all references)
- Voice profile (provider-abstracted voice configuration)
- Personality depth (formal/balanced/warm within the professional range)
- Brand language overrides (custom product names, service names)
- Blocked topics (topics the employee declines to discuss)

Non-overridable items (communication principles remain fixed regardless of white-label config):
- AI identity disclosure when sincerely asked
- No pricing quotes without authorization
- No technology provider exposure
- Escalation when uncertain
- Communication as respect principle

### Tenant Onboarding Flow

```
1. Tenant record created (tenant_id assigned)
2. Knowledge base initialized (Global KB copied, Tenant KB created empty)
3. Employee configuration created (choose from Digital Employee catalog)
4. Personality configured (name, voice, depth, language)
5. Action permissions granted (approved action set for this tenant)
6. Channel connections configured (via Channel Provider Adapter)
7. Tenant KB populated (company info, FAQs, policies)
8. Quality review (test conversations, edge case validation)
9. Go-live (tenant activated, employee.deployed event emitted)
10. Monitoring activated (Iron Prime telemetry, anomaly alerts)
```

---

## 7. Provider Abstraction Architecture

### AI Model Provider Adapter

**Purpose:** The only interface through which Sophia Intelligence™ accesses any language model capability.

**Interface contract:**
```
interface AIModelProviderAdapter {
  complete(request: CompletionRequest): Promise<CompletionResponse>
  stream(request: CompletionRequest): AsyncIterator<CompletionChunk>
  embed(request: EmbeddingRequest): Promise<EmbeddingResponse>
  isAvailable(): Promise<boolean>
}

CompletionRequest {
  system_prompt: string
  messages: Message[]
  max_tokens: number
  temperature: number
  tools?: ToolDefinition[]
}

CompletionResponse {
  content: string
  tool_calls?: ToolCall[]
  usage: { input_tokens: number, output_tokens: number }
  finish_reason: 'stop' | 'max_tokens' | 'tool_use'
}
```

**Error handling:** On provider failure, emit `system.provider.degraded` event and activate fallback adapter (if configured) or gracefully degrade to knowledge-only responses.

**Fallback behavior:** If no model is available, Sophia enters DEGRADED mode: it can answer from knowledge base only, cannot reason about new scenarios, and routes all complex requests to human handoff.

### Channel Provider Adapter

**Purpose:** Translates between Sophia Core™'s internal message format and the format expected by each channel.

**Interface contract:**
```
interface ChannelProviderAdapter {
  receive(raw: RawChannelMessage): Promise<NormalizedMessage>
  send(message: OutboundMessage, channel: ChannelConfig): Promise<SendResult>
  getChannelCapabilities(): ChannelCapabilities
}

NormalizedMessage {
  message_id: string
  visitor_id: string
  tenant_id: string
  channel: ChannelType
  content: MessageContent  // text | audio | media
  timestamp: ISO8601
  metadata: Record<string, unknown>
}

ChannelCapabilities {
  supports_voice: boolean
  supports_media: boolean
  supports_streaming: boolean
  max_message_length: number
  rate_limit_per_minute: number
}
```

**Error handling:** Send failures are retried per exponential backoff policy, then routed to DLQ with `notification.failed` event.

### Storage Provider Adapter

**Purpose:** Provides unified access to all storage types — relational, key-value, vector, cache — without exposing the underlying storage technology.

**Interface contract:**
```
interface StorageProviderAdapter {
  // Key-Value (memory, sessions, config)
  get(store: StoreName, key: string, tenant_id: string): Promise<unknown>
  set(store: StoreName, key: string, value: unknown, tenant_id: string, ttl?: number): Promise<void>
  delete(store: StoreName, key: string, tenant_id: string): Promise<void>

  // Vector (knowledge retrieval)
  upsertVectors(namespace: string, vectors: Vector[], tenant_id: string): Promise<void>
  queryVectors(namespace: string, query_vector: number[], top_k: number, tenant_id: string): Promise<VectorMatch[]>

  // Relational (leads, audit logs)
  query(store: StoreName, filter: QueryFilter, tenant_id: string): Promise<Record[]>
  insert(store: StoreName, record: Record, tenant_id: string): Promise<string>
  update(store: StoreName, id: string, patch: Partial<Record>, tenant_id: string): Promise<void>
}
```

**Error handling:** Storage failures emit `system.storage.error` events. Read failures return null and log (no crash). Write failures retry 3 times then emit `system.storage.write_failed`.

---

## 8. Cross-Cutting Concerns

### Security
Security is enforced at the Platform Layer before any business logic executes. Every inbound request is authenticated (tenant-scoped token) and authorized (RBAC role check). Inter-service calls use short-lived service tokens. PII is intercepted by the PII Processor before reaching logs. Full specification: `SOPHIA_CORE_SECURITY.md`.

### Observability
Every conversation turn generates a structured log entry. Every event on the bus is timestamped and correlated by `conversation_id`. Performance metrics are emitted as events and consumed by the analytics system. Anomaly detection runs against event streams. Tenants have read access to their own telemetry via the Tenant Admin role.

### Compliance
Compliance rules are runtime configuration per tenant, keyed by `country` and `industry`. The compliance engine evaluates inbound and outbound data against the active compliance profile (LGPD, GDPR, CCPA, HIPAA-adjacent, TCPA). Compliance violations emit `compliance.violation` events and trigger human review. Full specification: `SOPHIA_CORE_SECURITY.md`.

### Localization
Language is detected at the Channel Layer (incoming message analysis). The detected language is attached to the NormalizedMessage. The Personality Layer selects the appropriate language rules, response templates, and cultural calibration. All user-facing strings are externalized as localization resources — no hardcoded user-facing text in business logic.

---

## 9. Architecture Decisions Summary

The five most consequential architectural decisions. Full rationale in `SOPHIA_CORE_DECISIONS.md`.

| ADR | Decision | Rationale |
|---|---|---|
| ADR-SC-001 | Event-driven integration | Decoupling + auditability + horizontal scale |
| ADR-SC-002 | Provider abstraction via adapter pattern | AI vendor landscape changes faster than architecture should |
| ADR-SC-004 | Skill composition over inheritance | Different employees need different capability bundles; inheritance creates coupling |
| ADR-SC-005 | Customer-safe tier enforcement at channel adapter | Intelligence needs internal context; only output must be sanitized |
| ADR-SC-009 | Iron Prime™ as executive layer, not Digital Employee | CEO role must not be conflated with customer-facing role |

---

## 10. Document Index

| Document | Description |
|---|---|
| `SOPHIA_CORE_ARCHITECTURE.md` | This document — master architecture overview |
| `SOPHIA_CORE_COMPONENTS.md` | Detailed specification of all seven primary systems |
| `SOPHIA_CORE_DATA_FLOW.md` | Data flow diagrams for all major operations |
| `SOPHIA_CORE_EVENT_SYSTEM.md` | Complete event catalog, routing, versioning, DLQ |
| `SOPHIA_CORE_SECURITY.md` | Security architecture: isolation, memory protection, RBAC, compliance |
| `SOPHIA_CORE_ROADMAP.md` | Version strategy v1.0 through v4.0, future product lines |
| `SOPHIA_CORE_DECISIONS.md` | 12 Architecture Decision Records with full rationale |

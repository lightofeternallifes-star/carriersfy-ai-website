---
version: 1.0.0
classification: internal_architecture
owner: Carriersfy AI
status: active
created: 2026-06-25
last_reviewed: 2026-06-25
canonical_source: docs/SOPHIA_CORE_DECISIONS.md
related_docs:
  - docs/SOPHIA_CORE_ARCHITECTURE.md
  - docs/SOPHIA_CORE_ROADMAP.md
  - OMEGA/CORE/DECISION_ENGINE.md
---

# Sophia Core™ — Architecture Decision Records

> 12 ADRs governing the foundational decisions of Sophia Core™. Every significant architectural decision is recorded here with full context, rationale, and consequences.

---

## ADR-SC-001: Event-Driven Architecture as the Integration Pattern

**Date:** 2026-06-25  
**Status:** ACCEPTED  
**Deciders:** Carriersfy AI Architecture Team

### Context

Sophia Core™ is composed of seven primary systems that must communicate with each other. These systems will evolve independently, scale independently, and be maintained by different team members as the company grows. A decision was needed about how these systems would talk to each other.

### Decision

All inter-system communication in Sophia Core™ uses an asynchronous publish-subscribe event bus. Systems emit events when state changes. Other systems subscribe to the event types they care about. No system calls another system's internal functions directly.

### Rationale

Direct service calls create a dependency web that grows quadratically with the number of systems. When System A calls System B directly, they are coupled — A must know B's API, A must handle B's errors, and A cannot change without considering B. In a seven-system architecture, direct calls create 21 potential coupling edges.

The event bus reduces this to one interface per system: the EventEnvelope contract. Every system publishes to the same bus and subscribes from the same bus. Adding a new consumer of an event requires no change to the publisher.

Auditability is an additional structural benefit. Every meaningful state change in the platform is an event, which means the complete history of any conversation can be reconstructed from the event log. This is a compliance and debugging advantage that direct calls cannot provide.

### Consequences

**Enables:**
- Systems can scale independently
- New consumers can be added without touching publishers
- Complete audit trail by default
- Retry and dead-letter handling at the bus level, not in each system

**Constrains:**
- Eventual consistency (systems react to events asynchronously)
- Debugging requires event stream tooling, not just function traces
- Event schema versioning becomes a governance concern

### Alternatives Considered

**Direct service calls (synchronous RPC/HTTP):** Fast, familiar, easy to debug locally. Rejected because: creates tight coupling, does not scale independently, no natural audit trail, error propagation becomes complex at scale.

**Message queues only (point-to-point):** Decouples producers and consumers. Rejected because: fan-out requires explicit queue-per-consumer; adding a new consumer requires modifying the producer configuration.

**Synchronous REST between all systems:** Simple mental model. Rejected because: creates distributed monolith; one slow service blocks all callers; horizontal scaling requires sticky routing for state.

---

## ADR-SC-002: Provider Abstraction via Adapter Pattern

**Date:** 2026-06-25  
**Status:** ACCEPTED  
**Deciders:** Carriersfy AI Architecture Team

### Context

Sophia Core™ requires access to three categories of external providers: AI language models, communication channels (voice, WhatsApp, etc.), and storage systems (database, vector store, cache). The AI model landscape in particular is changing rapidly — new models are released frequently, pricing changes, and providers' capabilities evolve.

### Decision

All external provider access is mediated through adapter interfaces. Three adapter boundaries are defined:
1. `AIModelProviderAdapter` — wraps any LLM
2. `ChannelProviderAdapter` — wraps voice/WhatsApp/chat/email
3. `StorageProviderAdapter` — wraps all storage technologies

Business logic depends only on these interfaces, never on concrete provider SDKs.

### Rationale

Provider lock-in is an existential risk for a platform built on AI capabilities. If Sophia Core™ directly imports and calls an AI provider's SDK throughout its business logic, replacing that provider requires finding and updating every call site. The history of enterprise software is full of systems that could not migrate because provider calls were too deeply embedded.

The adapter pattern solves this at the architecture level. The interface is the contract. Every concrete implementation — ModelProviderA, ModelProviderB, StorageProviderX — is replaceable behind the same interface. The business logic does not know or care which implementation is active.

This also enables testing: mock adapters can be substituted in tests without standing up real infrastructure.

### Consequences

**Enables:**
- Swap underlying AI model without changing any business logic
- Switch cloud providers without changing application code
- Run any mix of providers simultaneously (e.g., different AI models for different use cases)
- Full unit testing with mock adapters

**Constrains:**
- Adapter interface must be general enough to accommodate capabilities across providers
- Provider-specific features (e.g., a model-specific capability) cannot be used without generalizing the interface first
- Adapter implementation maintenance is required when providers change their APIs

### Alternatives Considered

**Single provider dependency:** Simplest path — pick one AI provider, use it everywhere. Rejected because: lock-in is a strategic risk; pricing power shifts to provider; any provider outage becomes a full platform outage.

**Multi-provider SDK (direct):** Import multiple provider SDKs and use them directly. Rejected because: business logic becomes polluted with provider-specific code; changing provider mix requires code changes throughout.

**Raw API calls:** Call provider HTTP APIs directly without SDK. Rejected because: more maintenance work, no type safety, doesn't solve the abstraction problem.

---

## ADR-SC-003: Multi-Tenant Isolation via tenant_id Tagging

**Date:** 2026-06-25  
**Status:** ACCEPTED  
**Deciders:** Carriersfy AI Architecture Team

### Context

Sophia Core™ must serve thousands of businesses on the same infrastructure. A decision was required for how to isolate tenant data — ranging from full database-per-tenant isolation to shared tables with filtering.

### Decision

All data stores use shared infrastructure with mandatory `tenant_id` tagging on every record. Tenant scoping is enforced at the Storage Provider Adapter layer — no query is possible without providing a tenant_id. The adapter constructs all queries with tenant scoping applied.

### Rationale

Database-per-tenant provides the strongest isolation but at unacceptable operational cost. At 1,000 tenants, database-per-tenant means 1,000 database instances to provision, monitor, back up, and scale. Operational complexity grows linearly with tenant count.

Schema-per-tenant offers a middle ground but still requires schema migrations to be applied across all schemas, which is complex to orchestrate and prone to drift.

Shared tables with tenant_id tagging, enforced at the adapter layer, provides strong isolation at scale: one set of infrastructure to operate, one schema to maintain, and the isolation guarantee is in the code, not the database topology. The adapter pattern (ADR-SC-002) enables this isolation to be enforced as an architectural invariant — code that bypasses it fails at the interface contract, not silently at runtime.

At very large scale (v3.0+), a hybrid approach becomes appropriate: high-volume tenants can be migrated to dedicated resources while the standard tier continues on shared infrastructure. The adapter pattern accommodates this without changing business logic.

### Consequences

**Enables:**
- Tenant count scales without operational overhead
- Single schema to maintain and migrate
- Hybrid isolation possible later (premium tenants get dedicated resources)

**Constrains:**
- Noisy neighbor effects are possible (one high-volume tenant affecting others) — mitigated by per-tenant rate limiting
- A storage layer bug that bypasses tenant scoping would be a cross-tenant data leak — mitigated by defense-in-depth at the adapter level

### Alternatives Considered

**Database-per-tenant:** Maximum isolation. Rejected because: operational complexity is prohibitive at scale; cost is proportional to tenant count.

**Schema-per-tenant:** Good isolation, medium complexity. Rejected because: migrations across thousands of schemas are operationally risky; schema drift increases over time.

**Shared tables without enforcement (application-level only):** Rejected because: easy to forget tenant_id in queries; bugs become security incidents. The adapter-level enforcement is non-negotiable.

---

## ADR-SC-004: Skill Composition over Inheritance for Digital Employees

**Date:** 2026-06-25  
**Status:** ACCEPTED  
**Deciders:** Carriersfy AI Architecture Team

### Context

Sophia Core™ powers six Digital Employees, each with a distinct role. Sophia is a business consultant. Nova is a sales specialist. Titan qualifies leads. Each needs different capabilities. A decision was required for how to express this differentiation architecturally.

### Decision

Each Digital Employee is a composition of Skills from the Skill Registry. An employee is defined as: Sophia Core™ base + Personality config + Knowledge config + Skill bundle + Action permissions + Channel config. No employee inherits from another employee. Skills are reusable modules that any employee can use.

### Rationale

Inheritance for capabilities creates a coupling problem. If Nova inherits from Sophia, any change to Sophia's base behavior may unintentionally affect Nova. In a system where employees are deployed to real clients, unintended behavior changes are unacceptable.

Composition solves this: Nova and Sophia both use the SalesSkill, but they are configured independently. A change to how SalesSkill works affects both — but that is intentional, because the shared business logic should be updated once. The employees' different personalities and channel configurations remain independent.

Composition also enables future employees that don't fit neatly into any existing hierarchy. A future "Medical Intake" employee would compose MedicalSkill + SchedulingSkill + EscalationSkill, with no inheritance from any existing employee.

### Consequences

**Enables:**
- New employees can be created without modifying existing employees
- Skills are reused without code duplication
- Employee capabilities can be changed at runtime by updating their skill bundle
- Testing is simpler: test each skill independently

**Constrains:**
- If shared behavior needs to change, it must be in a Skill (not in an employee base class)
- Skill composition must be validated (incompatible skills must be caught at registration time, not runtime)

### Alternatives Considered

**Class inheritance (Sophia is the base, others inherit):** Familiar OOP pattern. Rejected because: changes to base affect all derived employees; inheritance hierarchies become rigid and hard to evolve.

**Single monolithic employee logic (feature flags per employee):** Simpler deployment. Rejected because: feature flag proliferation creates an unmaintainable combinatorial explosion; business logic for all employees in one place is a SOLID violation.

**Hardcoded employee behavior (no skill abstraction):** Simplest initially. Rejected because: adding a new employee requires modifying core system code; industry-specific skills would pollute the core.

---

## ADR-SC-005: Customer-Safe Tier Enforcement at the Channel Adapter Layer

**Date:** 2026-06-25  
**Status:** ACCEPTED  
**Deciders:** Carriersfy AI Architecture Team

### Context

Sophia Core™ maintains a three-tier knowledge classification: customer_safe, internal_only, and requires_human_review. TIER 2 knowledge (internal_only) includes pricing ranges, technology terms, and internal operational details that must never reach customers. A decision was required for where to enforce this filtering.

### Decision

TIER 2 content is available to Intelligence™ for reasoning context. All customer-facing output is scanned by Sophia Personality™ before reaching the Channel Layer. Personality™ strips TIER 2 content and substitutes compliant language. Knowledge retrieval filters to TIER 1 only for customer-facing queries.

### Rationale

If we filter at retrieval (Knowledge™ never returns TIER 2), Intelligence™ loses the context it needs to reason accurately. Consider: the pricing philosophy is TIER 2, but Intelligence™ needs to know "we don't quote prices" to correctly route a pricing question to a redirect response. Without that knowledge, Intelligence™ might attempt to answer directly.

The correct approach is: give Intelligence™ the full context it needs to reason, then enforce output safety at the last possible layer before delivery. Personality™ is the enforcement point because it is the system that processes every response before it leaves the platform.

This is defense in depth: Knowledge retrieval filters TIER 1 for customer queries (first defense), and Personality™ strips any TIER 2 content that still appears in the generated response (second defense).

### Consequences

**Enables:**
- Intelligence™ has full context for accurate reasoning
- TIER 2 content can inform decisions without leaking into responses
- Enforcement is centralized in one place (Personality™) rather than distributed across all content-generating systems

**Constrains:**
- Personality™ must be comprehensive in its prohibited phrase and content scanning
- If Personality™ has a bug, TIER 2 content could reach customers — mitigated by extensive testing and the dual-layer approach

### Alternatives Considered

**Filter at retrieval (Knowledge™ never returns TIER 2 for any query):** Simpler enforcement. Rejected because: Intelligence™ loses the context it needs; TIER 2 knowledge includes policy rules (e.g., "never quote prices") that the reasoning engine must know.

**Filter at Intelligence™ (strip before generating response):** Requires Intelligence™ to know what constitutes TIER 2. Rejected because: Intelligence™ is the reasoning system; adding output filtering mixes concerns. Post-processing in Personality™ is the appropriate separation.

**Manual curation only (trust that authors write safe content):** No automated enforcement. Rejected because: human error is inevitable; content will drift over time; automated enforcement is a hard guarantee.

---

## ADR-SC-006: Short-Term Memory In-Process, Long-Term Memory External

**Date:** 2026-06-25  
**Status:** ACCEPTED  
**Deciders:** Carriersfy AI Architecture Team

### Context

Sophia Core™ has eight memory types with very different characteristics: ShortTermMemory is needed on every turn within a session; LongTermMemory may not be accessed for months. A decision was required for where to store each memory type.

### Decision

ShortTermMemory is maintained in the active session context (in-process, loaded at session start). All other memory types are stored in the external Storage Provider Adapter and loaded on demand or at session start. Sessions are stateless between calls — ShortTermMemory is reloaded from the session store on each request.

### Rationale

ShortTermMemory access latency directly affects conversation response time. Requiring an external store call for every turn to retrieve the current context window would add 10–50ms of latency per turn, which compounds over a multi-turn conversation. Loading ShortTermMemory at session start and maintaining it in the session context eliminates this overhead.

Long-term memory types (LeadMemory, BusinessMemory, ConversationMemory) are accessed once per session start and occasionally during the session when memory updates are written. The latency cost of one external read per session start is acceptable.

The "stateless compute" requirement (ADR-SC-011) is satisfied because the session itself is stored in the external session store — the in-process session context is populated from the session store on each request. Any compute node can handle any request.

### Consequences

**Enables:**
- Fast in-turn access to conversation context without external latency
- Stateless compute (in-process state is always derivable from external store)
- External memory types benefit from distributed storage durability and scale

**Constrains:**
- Session store must be low-latency (the store that holds ShortTermMemory is the critical-path store)
- Session context must be serializable (must be storable in the session store between requests)

### Alternatives Considered

**All memory in-process:** Maximum performance. Rejected because: incompatible with stateless compute and horizontal scaling; memory lost on instance failure or restart.

**All memory external:** Maximum durability and scalability. Rejected because: unacceptable latency impact on high-frequency in-session access patterns.

**Database only (relational for all memory types):** Familiar technology. Rejected because: not suitable for vector-based knowledge retrieval; relational queries for memory snapshot would require complex joins.

---

## ADR-SC-007: SOLID Compliance as a Non-Negotiable Architectural Standard

**Date:** 2026-06-25  
**Status:** ACCEPTED  
**Deciders:** Carriersfy AI Architecture Team

### Context

As Carriersfy AI grows from a solo engineering operation to a team, the codebase must be maintainable by developers who did not write it. A decision was required for the software design standards that would govern all development.

### Decision

All Sophia Core™ code must comply with SOLID principles. Specifically:
- **S:** Each class/module has one reason to change
- **O:** Extend through new implementations, not modification of existing code
- **L:** All adapter implementations are substitutable for their interfaces
- **I:** No consumer depends on methods it doesn't use
- **D:** Business logic depends on interfaces (Adapters, Registries), never on concrete implementations

SOLID compliance is enforced through code review, not just aspiration.

### Rationale

The alternative — "pragmatic design, violate when it makes sense" — produces systems that are comprehensible to their authors and opaque to everyone else. In an AI-assisted engineering workflow, SOLID compliance makes it possible for tools like Claude Code to understand and correctly modify the system without inadvertently breaking constraints.

More importantly, SOLID compliance determines whether the system can be maintained and extended over a 10-year horizon. Systems that violate SOLID typically accumulate technical debt that makes change increasingly expensive. Given the rapid evolution of AI capabilities, Sophia Core™ must be highly changeable.

### Consequences

**Enables:**
- New developers (human and AI) can understand and extend the system correctly
- Extensions are additive (new skills, new adapters, new events) not modifying
- Testing each unit in isolation is natural, not engineered around

**Constrains:**
- Initial implementation takes longer (following the principles requires thought)
- Code reviews must enforce standards, not just correctness

### Alternatives Considered

**Pragmatic design (violate when convenient):** Faster initially. Rejected because: "convenient violations" compound into unmaintainable systems; they are never reversed.

**Microservices-first architecture:** Maximum isolation. Rejected because: premature distribution creates operational complexity that is not justified at the current scale; SOLID compliance within a well-structured monolith provides most of the same benefits at lower cost.

---

## ADR-SC-008: Knowledge Versioning with Re-Indexing on Update

**Date:** 2026-06-25  
**Status:** ACCEPTED  
**Deciders:** Carriersfy AI Architecture Team

### Context

Sophia's accuracy depends entirely on the quality and currency of her knowledge base. When knowledge files are updated (new services added, pricing philosophy changed, case studies updated), Sophia must serve the new knowledge without serving stale information.

### Decision

Every knowledge source has a semantic version. Updates to knowledge files emit a `knowledge.updated` event, which triggers a re-indexing job. The re-indexing job processes the new content, updates the vector index, and emits `knowledge.indexed`. Knowledge™ switches to the new index atomically — no reads hit both the old and new index simultaneously.

### Rationale

Stale knowledge is worse than no knowledge. If Sophia describes a service that no longer exists, or quotes a policy that has been superseded, she produces confidently wrong information. This erodes trust more than a "I don't have that information" response would.

Re-indexing on update ensures that knowledge changes propagate to Sophia's responses within a predictable timeframe after the update is committed. Versioning enables rollback if a bad update degrades response quality.

### Consequences

**Enables:**
- Knowledge updates propagate automatically without a full deployment
- Rollback to previous knowledge version is possible
- Knowledge quality can be monitored against version (did this update improve or degrade response quality?)

**Constrains:**
- Re-indexing takes time (minutes to hours depending on knowledge base size); there is a window where knowledge is being updated
- Re-indexing adds computational cost on each knowledge update

### Alternatives Considered

**No versioning (overwrite index directly):** Simpler. Rejected because: no rollback capability; partial update state creates inconsistency window; cannot diagnose regression.

**Manual synchronization (engineer triggers re-index):** Maximum control. Rejected because: too slow; knowledge updates become a deployment event; human error creates stale knowledge windows.

**Cache invalidation only:** Simpler than full re-indexing. Rejected because: the vector index is not a cache; stale embeddings require re-indexing, not cache clearing.

---

## ADR-SC-009: Iron Prime™ as Executive Orchestration Layer

**Date:** 2026-06-25  
**Status:** ACCEPTED  
**Deciders:** Carriersfy AI Architecture Team

### Context

Carriersfy AI deploys multiple Digital Employees for each client, and these employees must work together coherently. A coordination mechanism was needed. The question was whether to use peer-to-peer employee coordination, a shared coordinator, or a separate executive layer.

### Decision

Iron Prime™ operates as a separate executive layer above the Digital Employees. Iron Prime™ monitors all employee activity for a tenant through the event bus, orchestrates routing between employees, and maintains the strategic view of every lead and project. Iron Prime™ is not a Digital Employee and is never deployed on a customer-facing channel.

### Rationale

Peer-to-peer coordination creates a coordination problem: if Sophia needs to route to Titan, Sophia must know about Titan's availability and capabilities. As the team grows to 6 employees, each employee would need to know about all others — a quadratic dependency problem.

A shared coordinator pattern (where a Coordinator skill is added to all employees) conflates coordination logic with business logic, violating single responsibility.

A separate executive layer is the cleanest separation: Iron Prime™ has one job (orchestrate the Digital Workforce) and does it well. Digital Employees have one job (serve customers in their role) and do it well. The separation also enables Iron Prime™ to develop sophisticated orchestration intelligence without those capabilities being constrained by the customer-facing requirements of Digital Employees.

### Consequences

**Enables:**
- Employees can focus on their role without knowing about other employees
- Iron Prime™ can be given powerful cross-tenant visibility at the platform level without customer-facing risk
- Future Iron Prime™ capabilities (predictive routing, performance optimization) can be developed independently

**Constrains:**
- Iron Prime™ becomes a single point of failure for orchestration — must be highly available
- Adding a new employee requires updating Iron Prime™'s orchestration logic

### Alternatives Considered

**Make Iron Prime just another employee:** Simpler conceptually. Rejected because: conflates CEO role with customer-facing role; Iron Prime needs capabilities (cross-employee memory, full platform visibility) that would be inappropriate to give a customer-facing employee.

**Peer-to-peer routing:** No central coordinator. Rejected because: quadratic coupling as team size grows; difficult to maintain consistent routing logic across all employees.

---

## ADR-SC-010: Personality Layer as Post-Processing

**Date:** 2026-06-25  
**Status:** ACCEPTED  
**Deciders:** Carriersfy AI Architecture Team

### Context

Sophia's professional identity, communication style, and policy compliance must be applied consistently to every response. A decision was required for where and when to apply personality and style.

### Decision

Sophia Personality™ is applied as a post-processing step, after Intelligence™ and Skills™ have produced a response draft. The raw response passes through Personality™ before reaching the Channel Layer. Personality™ does not participate in reasoning — it only transforms presentation.

### Rationale

Personality is a presentation concern, not a reasoning concern. If personality were woven into the reasoning process (through prompting, skill logic, or retrieval), changes to communication style would require changes throughout the system.

By making Personality™ a separate post-processing layer, it can evolve independently. The communication philosophy can be updated, new prohibited phrases added, a new language's calibration added — all without touching Intelligence™ or Skills™. The separation also makes enforcement absolute: every response, without exception, passes through Personality™. There is no code path that bypasses it.

### Consequences

**Enables:**
- Personality changes deploy without touching business logic
- Prohibited phrase enforcement is a single implementation, applied uniformly
- Different channel formats (voice vs. text) are handled by Personality™ without if/else in skills

**Constrains:**
- Personality™ must handle all possible response types from all possible skills
- If Personality™ strips content from a response, the response must still be coherent — Personality™ must have fallback language for every strippable category

### Alternatives Considered

**Personality woven into prompts:** Easier to prototype. Rejected because: prompt-based personality is fragile (model behavior varies); not programmable; hard to enforce absolutely.

**Personality as a Skill:** Treated like any other capability. Rejected because: Personality must apply to ALL responses, not just when invoked; skills are invoked selectively by routing.

**Personality at retrieval (knowledge written in the right voice):** Knowledge is pre-styled. Rejected because: retrieval returns chunks that may be assembled differently each time; pre-styling knowledge does not handle tone calibration or real-time context adaptation.

---

## ADR-SC-011: Horizontal Scaling via Stateless Compute

**Date:** 2026-06-25  
**Status:** ACCEPTED  
**Deciders:** Carriersfy AI Architecture Team

### Context

Sophia Core™ must scale from one active conversation to millions simultaneously. A decision was required for the scaling model.

### Decision

All compute nodes are stateless. No conversation state, memory, or knowledge index is stored in the compute process. Every request is complete and self-contained: the session is loaded from the session store at the start, state is written back at the end. Any node can handle any request.

### Rationale

Stateful servers require session affinity: request N+1 must go to the same server as request N because the state is in-process. Session affinity creates uneven load distribution, complicates failover (a server failure loses its in-flight sessions), and prevents true horizontal scaling (adding a server doesn't help if traffic is pinned to existing servers).

Stateless compute eliminates all of these constraints. A load balancer can route any request to any available node. Scaling is adding nodes — there is no re-balancing, no state migration, no affinity management. Failed nodes have no orphaned sessions — the session store is the source of truth.

### Consequences

**Enables:**
- Auto-scaling: add/remove nodes based on load without coordination
- Failover: any node can handle any session after a failure
- Deployment: rolling deployments with no session disruption

**Constrains:**
- Every request must read the session from the session store — adds latency on the critical path
- Session store becomes a central dependency — must be high-availability and low-latency
- Serialization of session context must be efficient

### Alternatives Considered

**Stateful servers with session affinity:** Simpler programming model. Rejected because: does not scale horizontally; creates single points of failure per session; deployment requires careful orchestration.

**In-memory only (no external store):** Maximum performance. Rejected because: sessions lost on any node failure; cannot scale beyond one node without complex distributed state management.

---

## ADR-SC-012: Multi-Language as Runtime Configuration

**Date:** 2026-06-25  
**Status:** ACCEPTED  
**Deciders:** Carriersfy AI Architecture Team

### Context

Sophia Core™ launches with English, Portuguese, and Spanish. Additional languages will be added as Carriersfy AI expands. A decision was required for how language support is structured.

### Decision

Language support is runtime configuration. Adding a new language requires: (1) adding a localization bundle (translations and cultural calibration), (2) updating the language detection configuration, and (3) deploying the localization bundle. No application code changes. No new deployment of Sophia Core™.

### Rationale

Hardcoded language support (EN/PT/ES in code, others require code changes) treats language as a feature flag problem. Every new language becomes a code change, a code review, a deployment. This slows international expansion and creates risk (a bug in ES support could affect EN support if they share code paths).

Runtime configuration treats language as data — the same way a new industry is a new Skill, a new language is a new localization bundle. The system that applies language rules (Personality™) reads from configuration, not hardcoded logic. Language detection reads from a configurable language model configuration.

This also enables per-tenant language overrides: a tenant in Brazil can configure their employees to default to Portuguese and respond in English only when the customer initiates in English, without any code change.

### Consequences

**Enables:**
- New languages deployed without a code release
- Per-tenant language configuration
- A/B testing of language calibration by updating configuration

**Constrains:**
- Localization bundle quality determines the quality of language support — there is no code quality gate on the translation content
- Language detection must be robust enough to correctly identify language even in short messages

### Alternatives Considered

**Hardcode EN/PT/ES:** Simplest initially. Rejected because: every new language requires code changes; languages become coupled; international expansion requires code releases.

**Language-specific code paths:** Separate logic per language. Rejected because: maintenance nightmare; any fix must be applied to every language path; violations of the DRY principle at scale.

**Separate deployments per language:** Maximum isolation. Rejected because: multiplies operational overhead; routing users to the correct deployment adds complexity; no shared memory or context across language deployments.

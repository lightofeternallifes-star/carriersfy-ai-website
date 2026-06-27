---
version: 1.0.0
classification: internal_architecture
owner: Carriersfy AI
status: active
created: 2026-06-25
last_reviewed: 2026-06-25
canonical_source: docs/SOPHIA_CORE_ROADMAP.md
related_docs:
  - docs/SOPHIA_CORE_ARCHITECTURE.md
  - docs/SOPHIA_CORE_DECISIONS.md
  - OMEGA/CORE/ROADMAP_ENGINE.md
---

# Sophia Core™ — Product Roadmap

> Every architectural decision made today must accommodate this roadmap. Read this before making any architectural decision.

---

## 1. Version Strategy

### Sophia Core™ v1.0 — Foundation
**Status:** Current  
**Milestone:** First AI Employee live for a real client

**Capabilities:**
- Sophia as the primary Digital Employee (Chief AI Business Consultant)
- Knowledge Center v1.0 (knowledge/ directory, 13 files, 155+ FAQs, 25 industries)
- Voice channel + WhatsApp channel
- Basic Memory: ShortTerm + Visitor memory
- Single-tenant pilot (one client at a time)
- Manual deployment (engineer-assisted configuration)
- Lead creation, Strategy Call request actions
- Event bus (foundational, not all consumers live)
- Security: TLS, tenant isolation, basic audit logging

**Architecture constraints unlocked:**
- Provider adapter pattern must be in place before v1.0 ships — no direct model calls
- Customer-safe tier enforcement must be live before customer conversations happen
- AI disclosure rule must be non-overridable from day one

**What is NOT in v1.0:**
- Iron Prime™ (planned v1.1)
- All 6 Digital Employees (only Sophia)
- Multi-tenant (single client at a time)
- Full event catalog (subset only)

---

### Sophia Core™ v1.1 — Multi-Employee
**Status:** Planned  
**Milestone:** All 6 Digital Employees deployed and client-configurable

**New capabilities:**
- All 6 Digital Employees: Sophia, Nova, Titan, Orion, Atlas, Echo
- Iron Prime™ basic orchestration: telemetry aggregation, cross-employee alert routing
- Industry Skills library: first 10 industries (Dental, Veterinary, Legal, Real Estate, Construction, Transportation, Church, Accounting, Insurance, Restaurant)
- Lead Memory + Business Memory (full qualification persistence)
- Recommendation Memory (track what was recommended and why)
- Strategy Call booking action live
- Appointment booking action live
- Full event catalog operational (all events in SOPHIA_CORE_EVENT_SYSTEM.md)
- Skill Registry: dynamic skill loading, no hardcoded employee capabilities

**Architecture changes from v1.0:**
- Skill composition system replaces v1.0's inline employee logic
- Memory snapshot expanded from 2 types to 7 types
- Event bus consumers expanded to include Iron Prime™ and CRM adapter
- SkillRegistry becomes the source of truth for employee capability

**Migration from v1.0:**
- Backward compatible: v1.0 Sophia configuration continues to work
- Existing sessions are not affected by v1.1 deployment
- New employees are additive — no existing employee changes

---

### Sophia Core™ v1.2 — Enterprise Ready
**Status:** Planned  
**Milestone:** First enterprise client (100+ conversations/day) deployed

**New capabilities:**
- Multi-tenant isolation complete (multiple simultaneous clients)
- Tenant Admin dashboard (view conversations, update KB, configure employee)
- Full audit logging (every turn logged, 90-day retention)
- Compliance profiles: LGPD, GDPR, CCPA, HIPAA-adjacent
- All 25 industry skills active
- Project Memory + Conversation Memory
- Deletion request flow (GDPR/LGPD right to erasure)
- Advanced Knowledge versioning with rollback
- Performance monitoring: latency, knowledge retrieval quality, skill success rate
- SLA monitoring (per-tenant, configured in service agreement)

**Architecture changes from v1.1:**
- Storage Provider Adapter must support multi-region (data residency requirement for GDPR)
- Audit log becomes append-only, tamper-resistant
- Compliance engine activated (profile-based rules per tenant)
- Tenant Admin role and access control live

---

### Sophia Core™ v2.0 — Digital Workforce
**Status:** Planned  
**Milestone:** First client with 3+ Digital Employees working together under Iron Prime™

**New capabilities:**
- Iron Prime™ full orchestration:
  - Monitors all employee conversations simultaneously
  - Routes leads between employees based on intent and qualification stage
  - Triggers follow-up sequences automatically
  - Generates Digital Workforce performance reports
- Employee-to-employee routing: Sophia qualifies → routes to Titan for quote → Orion for follow-up
- Cross-employee Memory sharing (with consent): all employees see the same LeadMemory and BusinessMemory for a visitor
- Digital Workforce reporting: unified view of all employee activity for a tenant
- App builder integration: conversational app configuration triggers Digital Employee Factory
- White-label capability: tenant can fully brand their Digital Employee (name, voice, company, language)
- Long-Term Memory (opt-in): persistent customer preferences across unlimited time

**Architecture changes from v1.2:**
- Iron Prime™ gets its own execution context (separate from Digital Employee runtime)
- Cross-employee memory sharing requires permission model (tenant configures which employees share memory)
- Routing events: new event types for employee-to-employee routing
- White-label config expands tenant configuration surface significantly

---

### Sophia Core™ v2.1 — Scale
**Status:** Planned  
**Milestone:** 1,000+ active tenant deployments

**New capabilities:**
- 1,000+ tenant support with horizontal scaling
- Global region deployment: US East, US West, Brazil, EU West
- Multi-language Skills: all 25 industries available in EN, PT, ES
- Advanced analytics per tenant: conversation quality scores, skill performance, lead conversion tracking
- Iron Prime™ anomaly detection: alerts tenant admin when unusual patterns detected
- API rate limiting per tenant (fair usage enforcement)
- Tenant onboarding automation: self-service configuration with human review gate

**Architecture changes from v2.0:**
- Stateless compute mandatory (all state external)
- Event bus scales to millions of events/day with per-tenant partitioning
- Knowledge vector store sharding for scale
- Cache layer for high-frequency knowledge lookups

---

### Sophia Core™ v3.0 — Platform
**Status:** Planned  
**Milestone:** Third-party skill developers building on Sophia Core™

**New capabilities:**
- Carriersfy AI becomes a platform business
- Skills Marketplace: third-party developers register skills; tenants install from marketplace
- Industry-specific Digital Workforce templates: pre-configured multi-employee teams for Healthcare, Legal, Real Estate, etc.
- Government edition: additional compliance, audit, and access control for government clients
- Healthcare vertical: full HIPAA compliance, dedicated region, BAA templates
- Education vertical: FERPA-aware, student-safety controls
- Iron Prime™ v2.0: predictive lead scoring, automated workflow triggers, performance optimization

**Architecture changes from v2.1:**
- Skill Registry becomes externally accessible (third-party skill registration)
- Skill execution sandboxed (third-party skills cannot access tenant data directly)
- Marketplace review system (all third-party skills reviewed before publish)
- Tenant permission model expanded: tenants grant/revoke third-party skill access

---

### Sophia Core™ v4.0 — Ecosystem
**Status:** Vision  
**Milestone:** Third parties building complete AI workforces on Sophia Core™

**New capabilities:**
- White-label platform: third parties access Sophia Core™ as infrastructure to build their own branded AI workforce product
- External developer API (public, versioned, documented)
- Partner program: Carriersfy AI certified integration partners
- Regional franchise model: Sophia Core™ licensed to regional operators in Brazil, EU, LATAM, Asia-Pacific
- Iron Prime™ enterprise: multi-tenant orchestration (one Iron Prime across a group of related client tenants — e.g., a franchise chain)

**Architecture changes from v3.0:**
- Public API versioning must be stable and backward-compatible
- External developer authentication and rate limiting
- Partner-level audit logging and billing

---

## 2. Future Product Lines Enabled by Sophia Core™

### AI Employees (Active from v1.0)

Sophia Core™ already supports individual AI Employees through the Digital Employee model (Skills + Personality + Actions + Channels composition). The constraint is knowledge and channel configuration, not architecture.

Adding a new employee type requires:
1. Define SkillDefinition[] for the new employee's role
2. Write Personality config (title, style, escalation rules)
3. Grant Action permissions
4. Configure channels
5. Register in Digital Employee catalog

No core system changes needed.

### AI Teams (Active from v2.0)

Iron Prime™ orchestration enables a coordinated team: Sophia qualifies, Titan generates a quote, Orion manages follow-up. The event bus and cross-employee memory sharing make this possible without tight coupling between employees.

Sophia Core™ supports this because:
- Each employee is independently deployable
- Routing events enable employee-to-employee handoff
- Shared Memory means context is not lost between employees
- Iron Prime™ has full visibility without being in the conversation loop

### Digital Workforce (Active from v2.0)

A complete AI department: all 6 Digital Employees + Iron Prime™ orchestration, covering inbound communications 24/7 across all channels. Sophia Core™ supports this through:
- Multi-employee per-tenant deployment (v2.0)
- Cross-employee memory sharing (v2.0)
- Unified reporting through Iron Prime™ (v2.0)
- Employee availability routing (busy employee → route to available employee)

### AI Departments (v3.0+)

Multiple Digital Workforces per enterprise, each serving a different department (Sales Department, Support Department, Operations Department). Iron Prime™ operates at the enterprise level, coordinating across departments.

Architecture support: tenant hierarchy (enterprise > department > team), Iron Prime™ enterprise edition with cross-department visibility.

### Enterprise Organizations (v3.0+)

An enterprise with multiple business units, each with their own AI department, unified under one Iron Prime™. Sophia Core™ supports this through:
- Tenant hierarchy: organization > business_unit > team
- Enterprise-level analytics and reporting
- Cross-business-unit knowledge sharing (opt-in, explicit)
- Centralized compliance management

### White-Label Platforms (v4.0)

A third party (e.g., a telecommunications company) builds their own branded AI workforce product on Sophia Core™ infrastructure. They have their own name, their own branding, their own customers — but Sophia Core™ is the engine.

Architecture support: white-label capability is fully designed into v2.0's tenant configuration surface; v4.0 simply exposes this as an external API.

### Vertical Editions

Each vertical is a pre-packaged Sophia Core™ configuration:

| Vertical | Key Additions |
|---|---|
| Healthcare | HIPAA-adjacent compliance profile, PHI handling, BAA templates, DentalSkill/VeterinarySkill/MedicalSkill |
| Government | Extended audit retention, dual-approval workflows, government-specific compliance profiles |
| Education | Student safety controls, FERPA awareness, campus communication templates |
| Legal | LegalIntakeSkill, conflict check trigger, attorney routing, bar association disclosure rules |
| Hospitality | ReservationSkill, ConciergeSkill, HotelSkill, loyalty program integration |
| Retail | InventoryInquirySkill, ReturnSkill, LoyaltySkill, promotional messaging |

### International Markets

Sophia Core™ supports international expansion through runtime configuration, not code changes:
- Compliance profiles for each target country (LGPD for Brazil, GDPR for EU, etc.)
- Language addition: new language = new localization bundle + Personality calibration
- Regional data residency: routing data to correct geographic region
- Cultural calibration per region: Personality™ cultural profiles

Brazil is the first international market (v1.0). EU and LATAM expansion follow v2.1 scale milestone.

---

## 3. Integration Roadmap

Integrations connect Sophia Core™ to external business systems through the Channel and Storage Provider Adapter interfaces. No integration is hardcoded. Every integration is an adapter implementation.

| Integration Category | When | Purpose |
|---|---|---|
| CRM (client management system) | v1.1 | Sync leads and contacts |
| Calendar / Scheduling | v1.1 | Real availability for ScheduleMeeting action |
| Messaging platform (WhatsApp) | v1.0 | WhatsApp channel |
| Voice platform | v1.0 | Phone call channel |
| Payment processing | v2.0 | Invoice, subscription, setup fee |
| Document generation | v2.0 | Proposal and SOW generation |
| MCP Servers | v2.0 | AI tool protocol for advanced agent capabilities |
| Analytics platform | v1.2 | Conversation quality and performance dashboards |
| Notification service | v1.0 | Email confirmations, reminders |
| Translation service | v2.1 | Dynamic translation for languages beyond EN/PT/ES |

**Integration governance:**
- Every integration is an adapter implementing an existing interface
- Adapters are registered in the adapter registry, not hardcoded
- Adapter failures emit events and never propagate to crash the runtime
- Integration credentials are stored in the secrets vault

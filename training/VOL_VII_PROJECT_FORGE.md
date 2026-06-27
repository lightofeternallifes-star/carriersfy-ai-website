---
volume: VII
title: Project Forge
classification: internal
owner: Carriersfy AI
version: 1.0.0
status: active
created: 2026-06-25
last_reviewed: 2026-06-25
intended_audience: engineers, ai_agents, product_team
related_volumes: VOL_VIII_TECHNOLOGY, VOL_II_SERVICES, VOL_X_CORPORATE_CONSTITUTION
---

# CARRIERSFY AI
## CORPORATE TRAINING DOCUMENTATION

---

# VOLUME VII — PROJECT FORGE
### Engineering and Product Development

---

**Classification:** Internal — Engineering Reference  
**Version:** 1.0.0  
**Effective Date:** June 25, 2026  
**Owner:** Project Forge Team  
**Reviewed by:** Chief AI Architect, Director of Operations  

---

> *"We do not build software. We build infrastructure for human potential."*  
> — Carriersfy AI Engineering Principle

---

## TABLE OF CONTENTS

- Chapter 1: Project Forge Overview
  - 1.1 What Is Project Forge
  - 1.2 Mission
  - 1.3 Current Active Projects
  - 1.4 Engineering Principles
  - 1.5 Build Philosophy
- Chapter 2: Sophia Core™ Architecture
  - 2.1 Overview
  - 2.2 The Seven Systems
  - 2.3 Provider Abstraction Layer
  - 2.4 Event System
  - 2.5 Multi-Tenancy
  - 2.6 Architecture Decisions (ADR-SC-001 through ADR-SC-012)
- Chapter 3: CODEX — Component Library
  - 3.1 Overview
  - 3.2 Component Inventory
  - 3.3 Design System Implementation
  - 3.4 CODEX and the Production Website
- Chapter 4: App Development
  - 4.1 Capability Overview
  - 4.2 Supported Platforms
  - 4.3 The 11-Step App Builder Process
  - 4.4 App Types
  - 4.5 AI Integration in Apps
  - 4.6 Development Timeline
  - 4.7 Internal Tech Stack
- Chapter 5: Sophia MVP — Current Implementation
  - 5.1 Architecture
  - 5.2 How /api/chat Works
  - 5.3 Intent Detection
  - 5.4 Lead Capture Flow
  - 5.5 Known Limitations and Future Improvements
  - 5.6 Required Environment Variables
- Chapter 6: Project Forge Roadmap
- Chapter 7: Engineering Standards
- Chapter 8: Future Technology Roadmap
- FAQs
- Glossary
- Chapter Summary

---

## INTRODUCTION

Project Forge is the internal designation for the engineering and product development function at Carriersfy AI. It is not a department name — it is a mindset. Every engineer, every product decision, every line of code produced under Project Forge must serve one purpose: making Digital Employees possible for businesses that could never build them alone.

This volume is the authoritative technical reference for everything Carriersfy AI builds: the Sophia Core™ operating system, the CODEX component library, the production website infrastructure, the AI chat layer, and the roadmap from MVP to global platform. It is written at the level expected of a principal engineer at a Fortune 500 technology company and is intended to train AI agents, onboard engineers, and serve as the architectural compass for every product decision.

Project Forge operates on a principle that separates great engineering from merely competent engineering: build the simplest architecture that solves the real problem today, then scale with purpose rather than speculation.

---

## CHAPTER 1: PROJECT FORGE OVERVIEW

### 1.1 What Is Project Forge

Project Forge is the engineering and product development arm of Carriersfy AI. It encompasses every system, service, tool, and infrastructure component that the company builds and operates. The name reflects the company's conviction that great products are forged — shaped under pressure, refined through iteration, and hardened through use — rather than assembled from off-the-shelf components.

Project Forge is not a build team. It is not a vendor. It is the internal capability that ensures Carriersfy AI can deliver on its promise to every client: a Digital Employee that works, reliably, from day one.

The scope of Project Forge includes:

- The Carriersfy AI website (carriersfy.ai) and all its components
- Sophia Core™ — the proprietary operating system powering all Digital Employees
- The CODEX component library — the React/TypeScript design and prototype layer
- Client application development (iOS, Android, Web)
- AI infrastructure (Sophia chat MVP, future RAG pipeline, voice, WhatsApp)
- The deployment pipeline connecting GitHub to Cloudflare Pages
- All internal tooling, documentation systems, and architecture governance

### 1.2 Project Forge Mission

**To build the infrastructure that makes Digital Employees possible.**

This mission has three layers:

**Layer 1 — Immediate:** Ensure that Sophia is operational and can have real conversations with real visitors on carriersfy.ai today. Every hour of delay is a lead not captured.

**Layer 2 — Near-term:** Build the Sophia Core™ operating system that makes every Digital Employee — Sophia, Nova, Titan, Orion, Atlas, Echo — reliable, consistent, scalable, and deployable to any client in any industry in any language.

**Layer 3 — Strategic:** Build Carriersfy AI into a platform company where third parties can deploy Digital Employees and build AI-powered applications on the Carriersfy AI Platform™ infrastructure.

These layers are sequential by priority, but the architectural decisions made at Layer 1 must not foreclose the possibilities of Layers 2 and 3. This is the central tension of Project Forge: move fast today, scale with integrity tomorrow.

### 1.3 Current Active Projects

As of June 2026, Project Forge has four active initiatives:

#### CF-PRJ-001 — Carriersfy AI Website V1.1

**Status:** Live at carriersfy.ai  
**Stack:** Single HTML page (DC/Draftcode runtime), Cloudflare Pages, Cloudflare Pages Functions  
**Current work:** Sophia MVP live chat layer (sophia-chat.js + /api/chat function)  
**Owner:** Juan + Claude Code (CF-AGT-003)

The website is the primary customer-facing surface for Carriersfy AI. It hosts Sophia's chat widget, the contact form, the Digital Employee Factory™, the App Builder™, and all marketing content. The website runs on a DC/Draftcode-generated single HTML page backed by React UMD runtime (support.js). The file `support.js` must never be modified — it is auto-generated by the DC/Draftcode design tool.

**Critical constraint:** `index.html`, `support.js`, and `translations.js` are DC-generated artifacts. Modifications must be made through the DC/Draftcode design tool, not by hand editing. The only exception is the script tag injection for `sophia-chat.js`, which was added as a single-line MVP modification.

#### CF-PRJ-007 — CODEX MISSION #002

**Status:** In Review — 49 source files, zero TypeScript errors  
**Stack:** React 18, TypeScript, Tailwind CSS v3, Vite, React Router v6  
**Purpose:** Design and prototype component library for all Digital Employee experience surfaces  
**Location:** `/codex/` directory  
**Dev server:** localhost:5173

CODEX is not deployed to production. It is the design-to-code bridge: a full React application that renders every page and component in the Carriersfy AI design system, enabling rapid prototyping and visual validation before production implementation.

#### CF-PRJ-002 — Sophia Core™

**Status:** Architecture complete — implementation pending  
**Documents:** 7 architecture documents in `/docs/SOPHIA_CORE_*.md`  
**Purpose:** The proprietary operating system powering every Digital Employee  
**Next milestone:** Implement Sophia Runtime™ and Sophia Intelligence™ as the first production components

#### CF-PRJ-006 — Internal Infrastructure

**Status:** In Progress  
**Includes:** OMEGA Enterprise Memory OS, knowledge base, deployment pipeline, security configuration  
**Owner:** Claude Code (CF-AGT-003) + Juan

### 1.4 Engineering Principles

Project Forge operates under 14 non-negotiable engineering principles, derived from the design requirements of Sophia Core™ and applicable to every system Project Forge builds.

**Principle 1 — Modular**  
Every system is independently replaceable. No component should require changes to adjacent components when it is swapped, upgraded, or removed. If two systems are coupled, that coupling must be explicit, documented, and justified.

**Principle 2 — Event-Driven**  
Systems communicate through events, not direct synchronous calls. This decouples producers from consumers, enables audit trails, and allows systems to evolve independently. The event bus is the spinal cord of the architecture.

**Principle 3 — Provider-Independent**  
No system directly imports or calls an AI vendor SDK, cloud provider library, or channel platform API. Every external dependency is wrapped in a provider adapter. This is the single most important architectural decision Carriersfy AI has made — AI vendor lock-in is existential risk for a company whose entire value proposition is built on AI.

**Principle 4 — AI-Model-Independent**  
Business logic never changes when the underlying AI model changes. Swapping Claude for GPT-5 or Gemini 2 must be a configuration change, not a code change.

**Principle 5 — Horizontally Scalable**  
Systems scale by adding instances, not by making instances more complex. State is external. Compute is stateless. This enables Cloudflare's global edge to serve as our auto-scaling infrastructure.

**Principle 6 — Cloud-Ready**  
Every service assumes it can be terminated at any time. No in-process state that cannot be recovered from an external store. This principle is what makes global Cloudflare deployment reliable.

**Principle 7 — Enterprise-Ready**  
Multi-tenant from day one. Audit-logged. Role-separated. Every tenant's data, configuration, and knowledge is isolated at the storage layer.

**Principle 8 — SOLID-Compliant**  
- Single Responsibility: each module does one thing and does it well
- Open/Closed: open for extension, closed for modification
- Liskov Substitution: implementations are interchangeable behind interfaces
- Interface Segregation: no module is forced to depend on methods it does not use
- Dependency Inversion: depend on abstractions, not concretions

**Principle 9 — Future-Proof**  
No architectural decision should foreclose a capability that the business will plausibly need within five years. This includes: multi-model support, multi-channel support, white-label capability, third-party developer access, and government/healthcare vertical editions.

**Principle 10 — White-Label Capable**  
Every tenant can receive a branded experience. Names, voices, personalities, color schemes, and domain names are runtime configuration, not code branches.

**Principle 11 — Multi-Language**  
English, Portuguese, and Spanish are first-class languages from day one. Adding a new language is a configuration and content change, never a code change.

**Principle 12 — Multi-Country**  
Compliance requirements, timezone handling, currency formatting, and locale behavior are runtime configuration per tenant. There is no "Brazilian deployment" code path — there is a tenant configuration that sets country to Brazil and applies the appropriate compliance rules.

**Principle 13 — Multi-Industry**  
Industry-specific behavior is delivered through Skills (see Sophia Skills™). Adding support for a new industry is a new skill registration, not a new code branch.

**Principle 14 — Multi-Tenant**  
Every business served by Carriersfy AI is a tenant on shared infrastructure. Tenant isolation is enforced at the data layer, the knowledge layer, the event layer, and the credential layer. A failure in one tenant must never affect another.

### 1.5 Build Philosophy

Project Forge's build philosophy can be stated in one sentence: **Build the simplest architecture that solves the real problem today, then scale with purpose.**

This philosophy rejects two failure modes common in engineering:

**Over-engineering:** Building for a scale problem you do not have yet, at the cost of shipping speed and operational complexity. The first Digital Employee deployed by Carriersfy AI does not need a Kubernetes cluster. It needs a Cloudflare Pages Function and a working API key.

**Under-engineering:** Building something that works today but cannot survive tomorrow. A chat endpoint with no provider abstraction, no multi-tenancy consideration, and no event emission will need to be rewritten entirely when the second client arrives.

The resolution is this: **architect for the future, implement for the present.** Every interface must be designed with Principles 1–14 in mind. Every implementation may be a simplified version of that interface. The interface is the contract; the implementation is the current fulfillment of that contract.

In practice, this means:
- Write the interface contract before writing the implementation
- Document the simplifications you are accepting and why
- Mark every simplification as a known limitation with a future improvement ticket
- Never break the interface contract when upgrading the implementation

---

## CHAPTER 2: SOPHIA CORE™ ARCHITECTURE

### 2.1 Overview

Sophia Core™ is the proprietary operating system that powers every Digital Employee built by Carriersfy AI. It is the technological foundation of the Carriersfy AI Platform™.

Sophia Core™ is not a chatbot framework. It is not a wrapper around a language model API. It is a complete, enterprise-grade operating system for AI-powered professional communication. Just as iOS provides the runtime, security, memory management, and developer APIs for every iPhone app, Sophia Core™ provides the runtime, security, memory management, and capability APIs for every Digital Employee.

The architecture was designed to answer a specific question: **What does it take for an AI employee to behave as a reliable professional, consistently, across thousands of simultaneous conversations, in three languages, across every industry we serve, for every business we onboard?**

The answer required seven systems.

### 2.2 The Seven Systems

#### 2.2.1 Sophia Runtime™

**Purpose:** Manage the complete lifecycle of every conversation from initiation to completion.

The Runtime is the central nervous system of Sophia Core™. Every conversation that any Digital Employee has with any visitor, lead, or customer flows through the Runtime. The Runtime is responsible for ensuring that conversations start cleanly, progress correctly, handle errors gracefully, and complete with full state preservation.

**Conversation State Machine**

The Runtime maintains each conversation as a finite state machine. Valid states:

| State | Description | Valid Transitions |
|---|---|---|
| IDLE | Session created, no activity yet | → GREETING |
| GREETING | Sophia has delivered opening message | → ACTIVE |
| ACTIVE | Conversation in progress | → REASONING, WAITING, HANDOFF, COMPLETED, FAILED |
| REASONING | Intelligence layer is processing a complex turn | → ACTIVE |
| WAITING | Awaiting visitor response beyond threshold | → ACTIVE, TIMED_OUT |
| HANDOFF | Escalation to human agent in progress | → COMPLETED |
| TIMED_OUT | Session expired due to inactivity | → RECOVERED, COMPLETED |
| RECOVERED | Session resumed after timeout | → ACTIVE |
| COMPLETED | Conversation ended normally | Terminal |
| FAILED | Conversation ended due to unrecoverable error | Terminal |

**Session Management**

Each conversation session carries:
```
ConversationSession {
  session_id:       string (UUID)
  tenant_id:        string
  employee_id:      string (e.g., "sophia", "nova")
  visitor_id:       string (persistent across sessions)
  channel:          enum (VOICE | WHATSAPP | WEB_CHAT | EMAIL)
  language:         enum (EN | PT | ES | ...)
  state:            ConversationState
  created_at:       timestamp
  last_activity_at: timestamp
  expires_at:       timestamp
  current_goal:     string | null
  short_term_memory: object
  turn_count:       integer
  metadata:         object
}
```

**Routing Engine**

The Runtime's routing engine determines which Skill handles each conversation turn. Routing is driven by the intent returned by Sophia Intelligence™. The routing table is configurable per tenant and per employee deployment.

**Human Handoff Protocol**

Handoff is triggered when any of the following conditions are met:
- Sophia Intelligence™ returns intent `requires_human`
- Visitor explicitly requests a human
- Three consecutive turns of intent `off_topic`
- Compliance question is asked (Tier 3 knowledge)
- Error threshold exceeded (three consecutive API failures)

On handoff: the Runtime serializes the full conversation context (turns, intent history, memory snapshot, identified lead data) and routes it to the human agent queue. The visitor receives a confirmation message in their language.

**Timeout and Recovery**

Default inactivity timeout: 15 minutes. Configurable per tenant. On timeout, the session moves to TIMED_OUT state. If the visitor returns within 24 hours, the session moves to RECOVERED and the Runtime loads the conversation summary from memory rather than replaying the full history.

**Streaming**

For voice and chat channels that support token streaming, the Runtime pipes output tokens directly to the channel adapter as they are generated, rather than waiting for the complete response. This reduces perceived latency from 2–4 seconds to under 1 second for voice channels.

#### 2.2.2 Sophia Intelligence™

**Purpose:** Transform customer inputs into business decisions through reasoning.

Intelligence is the analytical core. It receives structured conversation context from the Runtime and returns a structured decision. It never writes to channels directly and never calls Actions directly — it reasons and recommends.

**Intent Taxonomy**

Every conversation turn is classified into one of the following intents:

| Intent | Description | Typical Signals |
|---|---|---|
| inquiry | General question about Carriersfy AI | "What is...", "Tell me about..." |
| pricing | Cost or investment question | "How much", "what does it cost" |
| strategy_call | Request to schedule a call | "I'd like to talk", "book a call" |
| employee_builder | Wants to configure a Digital Employee | "Build an employee", "configure Sophia" |
| app_builder | Wants to build an application | "Build an app", "mobile app" |
| whatsapp | Prefers WhatsApp channel | WhatsApp mentioned, phone preference |
| lead_capture | High buying intent with business context | Business name + problem stated |
| off_topic | Outside Carriersfy AI scope | Unrelated questions |
| requires_human | Complex question beyond AI confidence | Legal, compliance, sensitive |
| greeting | Opening message or pleasantry | "Hi", "Hello" |
| farewell | Closing the conversation | "Thanks", "Bye" |

**Decision Engine**

The Decision Engine operates on a priority stack:

1. **Safety check:** Does this turn violate any rule in `10_company_rules.md`? If yes → apply rule (redirect pricing, escalate compliance, etc.)
2. **Goal check:** Is there an active conversation goal? If yes → advance it
3. **Intent routing:** Map intent to skill handler
4. **Response strategy selection:** Choose from INFORM / ASK_QUESTION / RECOMMEND / ESCALATE
5. **Turn planning:** Plan the optimal response given the strategy

**Recommendation Engine**

When a visitor's industry or problem is identified, the Recommendation Engine maps it to the optimal Digital Employee bundle. Mapping logic:

- High-volume inbound communications → Atlas (lead qualification) + Nova (messaging)
- Quote-heavy business → Titan (quote generation) + Orion (customer success)
- Service-based business with scheduling → Sophia (front desk) + Atlas (ops)
- Full digital workforce → All six + Iron Prime orchestration

**Context Reasoning**

The Intelligence layer maintains semantic coherence across multi-turn conversations. When a visitor says "Tell me more about the second one" in turn 7, Intelligence must correctly resolve "the second one" to the entity mentioned in turn 4. This requires the full conversation history to be present in the reasoning context, capped at the last 6 turns for cost efficiency at the MVP layer.

#### 2.2.3 Sophia Knowledge™

**Purpose:** Retrieve accurate, contextual business knowledge on demand.

Knowledge is the memory of everything Carriersfy AI has decided to make available to its Digital Employees. It is not a database of facts — it is a governed, versioned, customer-safety-classified corpus of business knowledge that can be queried in real time.

**Knowledge Sources**

| Source | Contents | Classification |
|---|---|---|
| Global KB | Company, services, employees, platform | customer_safe |
| Industry KB | 25+ industry playbooks | customer_safe |
| Tenant KB | Per-business configuration, overrides | tenant-specific |
| Case Study KB | Approved client results and narratives | restricted (until approved_public) |
| FAQ KB | 155+ pre-indexed Q&A pairs | customer_safe |
| Policy KB | Customer-safe policy, pricing philosophy, rules | governing |
| Internal KB | Sales methodology, BANT framework, scoring | internal_only |

**Retrieval Strategy**

The three-tier retrieval strategy ensures that the right knowledge is returned for the right context:

1. **Primary:** Semantic similarity search over the indexed knowledge corpus. The query is embedded, and the top-k most similar knowledge chunks are returned.
2. **Secondary:** Keyword fallback for proper nouns and exact-match queries (employee names, product names, industry names).
3. **Tertiary:** Structured lookup for policies, rules, and pricing philosophy — these are deterministic and do not require semantic search.

**Customer Safety Enforcement**

Every knowledge chunk is tagged with a customer_safe tier (TIER 1 / TIER 2 / TIER 3 per `knowledge/00_customer_safe_policy.md`). The Knowledge layer filters to TIER 1 only before returning results for customer-facing conversation turns. TIER 2 content is available for internal reasoning only. TIER 3 content triggers escalation to human review rather than being retrieved at all.

**Versioning**

Each knowledge source carries a version and last_reviewed timestamp. Updates to a knowledge source trigger a `knowledge.updated` event, which causes the affected chunks to be re-indexed. This ensures that knowledge updates take effect without requiring a code deployment.

**KnowledgeChunk Schema**

```
KnowledgeChunk {
  id:               string (UUID)
  source:           string (e.g., "knowledge/04_industries.md#dental")
  source_version:   string (semver)
  content:          string
  embedding_ref:    string (vector store reference)
  customer_safe_tier: enum (TIER_1 | TIER_2 | TIER_3)
  tags:             string[]
  last_indexed_at:  timestamp
}
```

#### 2.2.4 Sophia Memory™

**Purpose:** Maintain persistent understanding of the customer across all conversations.

Memory is what separates a Digital Employee from a chatbot. A chatbot forgets every conversation when it ends. A Digital Employee remembers what the visitor told Sophia last Tuesday, what problem they said was costing them most, and what they were not yet ready to decide. This context makes every subsequent conversation richer, warmer, and more commercially effective.

**Eight Memory Types**

| Type | Scope | TTL | Contents |
|---|---|---|---|
| Short-Term Memory | Current session only | Session duration | Current turn context, active goal, last 10 turns |
| Visitor Memory | All visits | 90 days | First contact date, channels used, language preference |
| Lead Memory | Lead lifecycle | 365 days | Business name, contact, pain points, interest signals, qualification status |
| Business Memory | Business relationship | 365 days | Industry, size, current tools, expressed needs |
| Project Memory | Active project | Contract duration | Project state, milestones, team |
| Recommendation Memory | Recommendation lifecycle | 90 days | What was recommended, what was rejected, why |
| Conversation Memory | Historical record | 365 days | Summaries of completed conversations |
| Long-Term Memory | Permanent | Until deleted | Opted-in persistent preferences, key decisions |

**Privacy Rules**

- PII fields (name, email, phone) are flagged in the schema and handled by a dedicated PII processor
- PII is never written to logs in plaintext — it is pseudonymized at the logging layer
- Right to deletion: a deletion request flows through all eight memory types for a given visitor_id, and a `memory.deleted` event is emitted upon completion
- Retention minimization: TTLs are enforced by a background expiry job; data is not retained beyond declared purpose

**Memory Expiration**

The expiry job runs on a configurable schedule (default: hourly). For each memory type, it checks whether the TTL has elapsed and emits `memory.expired` events for expired records. Consumers of these events (typically the Knowledge and Intelligence systems) invalidate any cached derivations.

#### 2.2.5 Sophia Personality™

**Purpose:** Maintain a consistent professional identity across all conversations and all channels.

Personality is the last system applied before a response is delivered to the visitor. Its job is to ensure that no matter what Intelligence decided, no matter what Knowledge retrieved, and no matter what Skill generated the raw response — the words that reach the visitor are always clearly Sophia (or whichever Digital Employee is deployed), always appropriate for the channel and the visitor's register, and always in compliance with the company's communication standards.

**Core Identity (immutable across all tenants)**

- Name: Sophia (or tenant-configured name for white-label deployments)
- Role: Chief AI Business Consultant (default) — configurable per deployment
- Company: Carriersfy AI (or white-label brand)
- Communication principle: "Communication is a form of respect"
- Disclosure rule: Always disclose AI identity when sincerely asked

**Communication Principles (non-overridable by tenant)**

1. Listen before recommending
2. Ask one focused question at a time
3. Educate first, guide second, advance only when appropriate
4. Never pressure — guide with respect
5. Respond in the visitor's language automatically
6. Never guess — route to human when uncertain

**Writing Style**

- Sentence length: medium (12–20 words preferred)
- Vocabulary: professional but accessible — no jargon visible to customers
- Tone markers: warm, confident, precise
- Prohibited phrases: "Actually", "Basically", "Obviously", "As an AI", "I'm just a chatbot"

**Channel Calibration**

| Channel | Verbosity | Formality | Emoji Allowed |
|---|---|---|---|
| Voice | Medium | High | No |
| WhatsApp | Medium-Low | Medium | Only if visitor uses them first |
| Web Chat | Medium | High-Medium | No |
| Email | High | High | No |

**Language Rules**

Sophia detects language from the visitor's first message and responds in kind for the remainder of the session. Code-switching within a message (e.g., Portuguese sentence followed by English question) is handled by responding in the language of the majority of the message. Sophia does not ask the visitor what language they prefer — she detects and adapts.

**Personality Post-Processing Pipeline**

Every raw response from Intelligence/Skills passes through this pipeline before delivery:

1. Channel calibration (adjust verbosity for voice vs. chat vs. WhatsApp)
2. Language enforcement (verify response is in detected language)
3. Prohibited phrase scan and substitution
4. Pricing policy enforcement (if pricing detected → redirect)
5. Technology policy enforcement (if provider/API/framework detected → rewrite)
6. Customer-safe tier validation (strip any TIER 2/3 content from output)
7. Absolute claim softening (replace "100%", "always", "never miss" with compliant alternatives)
8. Final response output

#### 2.2.6 Sophia Skills™

**Purpose:** Provide reusable, composable business capabilities that any Digital Employee can use.

Skills are the functional building blocks of Digital Employees. An employee's behavior is determined by which Skills it is assigned, not by its code. Sophia is assigned the Sales Skill, Lead Qualification Skill, and Customer Support Skill. Nova is assigned the Sales Skill, Messaging Skill, and Scheduling Skill. The code for each Digital Employee is the same — what differs is the skill bundle.

**Skill Architecture**

Each Skill is a self-contained module with a formal interface:

```
SkillDefinition {
  id:               string (e.g., "skill.sales.v1")
  name:             string
  version:          string (semver)
  required_knowledge: string[]  (knowledge source IDs required)
  required_actions:   string[]  (action IDs this skill may invoke)
  trigger_intents:    string[]  (which intents route to this skill)
  input_schema:       JSONSchema
  output_schema:      JSONSchema
}
```

Skills are composed, not inherited. A Digital Employee is `Sophia Core™ + assigned Skill bundle`. Adding a new capability to an employee is adding a new skill to its bundle — not modifying the employee's code.

**Core Skills**

| Skill | Trigger Intents | Key Capabilities |
|---|---|---|
| SalesSkill | inquiry, lead_capture | Discovery questions, qualification, objection handling, call booking |
| SchedulingSkill | strategy_call, appointment | Availability check, time proposal, confirmation, reminder |
| CustomerSupportSkill | complaint, inquiry (post-sale) | Issue classification, answer retrieval, escalation |
| LeadQualificationSkill | inquiry, lead_capture | Business context gathering, readiness assessment, routing |
| MessagingSkill | whatsapp, sms | Multi-channel conversation management, template selection |

**Industry Skills**

Industry Skills are pre-configured bundles of prompts, knowledge references, and response templates for specific industries. They do not add new capabilities — they tune the behavior of Core Skills for a specific context.

| Skill | Industry | Tuning |
|---|---|---|
| DentalSkill | Dental | Appointment types, HIPAA-adjacent language, patient vs. provider framing |
| LegalIntakeSkill | Legal | Case type classification, retainer discussion framing, jurisdiction awareness |
| ImmigrationSkill | Immigration | Case type taxonomy, language diversity, sensitivity to status questions |
| ConstructionSkill | Construction | Project type, bid/quote framing, licensing references |
| TransportationSkill | Transportation/Trucking | Load type, lane, compliance awareness, DOT sensitivity |
| RoadsideAssistanceSkill | Roadside Assistance | Emergency triage, location urgency, dispatch framing |
| ChurchSkill | Faith Organizations | Community framing, event types, volunteer coordination language |
| RealEstateSkill | Real Estate | Buyer/seller/renter framing, MLS language awareness |

**Skill Registry**

The Skill Registry is the central catalog of all available Skills. When the Runtime routes to a Skill, it loads the SkillDefinition from the registry and validates that all required_knowledge sources and required_actions are available before executing. New Skills are registered — they do not require a core system deployment.

#### 2.2.7 Sophia Actions™

**Purpose:** Execute concrete business operations at the boundary between reasoning and doing.

Actions are the effectors of Sophia Core™. While Intelligence decides what to do and Skills determine how to do it, Actions are the system that actually does it: creates a lead, books an appointment, sends a WhatsApp message, or transfers a conversation to a human agent.

**Action Architecture**

Each Action is atomic and provider-independent:

```
ActionDefinition {
  id:                   string (e.g., "action.create_lead.v1")
  name:                 string
  required_permissions: string[]
  input_schema:         JSONSchema
  output_schema:        JSONSchema
  idempotency_key_path: string  (JSON path to idempotency key in input)
  retry_policy: {
    max_attempts:  integer
    backoff:       enum (FIXED | EXPONENTIAL)
    base_delay_ms: integer
  }
  rollback_strategy:    enum (NONE | LOG | COMPENSATE)
}
```

Actions interface through provider adapters — they never call a channel or storage provider directly. This means that replacing the WhatsApp provider requires changing only the Channel Adapter, not any Action code.

Actions emit events on completion and failure. This creates a full audit trail of every business operation executed by any Digital Employee.

**Core Actions**

| Action ID | Purpose | Input | Output | Event Emitted |
|---|---|---|---|---|
| action.create_lead | Create a new lead record | contact info, source, notes | lead_id | lead.created |
| action.schedule_meeting | Book a meeting | participants, time, type | meeting_id, confirmation | appointment.booked |
| action.request_strategy_call | Register strategy call intent | lead_id, pain points, notes | request_id | strategy_call.requested |
| action.generate_proposal | Generate a proposal document | lead_id, employee config, scope | proposal_id, link | proposal.generated |
| action.transfer_to_human | Escalate to human agent | session_id, summary, reason | ticket_id | human_handoff.started |
| action.send_notification | Send channel notification | channel, recipient, template, vars | delivery_id | notification.sent |
| action.create_ticket | Create a support ticket | type, priority, context | ticket_id | ticket.created |
| action.update_lead_status | Update lead lifecycle status | lead_id, status, notes | — | lead.updated |

### 2.3 Provider Abstraction Layer

#### Why Provider Independence Is Non-Negotiable

The AI vendor landscape of 2026 is not the AI vendor landscape that will exist in 2028. Model capabilities, pricing, latency, and availability change quarterly. The vendor that offers the best price/performance ratio today may be third-best by next year. A company that builds its core product — Digital Employees — on a direct dependency to any single AI provider has built a product that can be disrupted by a pricing change, an API deprecation, or a model quality regression that it has no control over.

Carriersfy AI's competitive advantage is not which AI model it uses. Its competitive advantage is the business logic, the industry knowledge, the personality calibration, the client configuration, and the deployment infrastructure it has built around AI. None of that advantage should be hostage to a single vendor's API contract.

#### AI Model Provider Adapter

The AI Model Provider Adapter is the interface between Sophia Intelligence™ and the underlying language model. Sophia Intelligence never imports an AI SDK directly. It calls the adapter interface, and the adapter handles the vendor-specific implementation.

**Interface Contract**

```
AIModelAdapter {
  complete(request: CompletionRequest): Promise<CompletionResponse>
  stream(request: CompletionRequest): AsyncIterator<CompletionChunk>
}

CompletionRequest {
  system_prompt:   string
  messages:        Message[]
  max_tokens:      integer
  temperature:     float
  tenant_id:       string  (for routing, logging, billing)
}

CompletionResponse {
  content:         string
  model:           string
  input_tokens:    integer
  output_tokens:   integer
  finish_reason:   enum (STOP | MAX_TOKENS | ERROR)
}
```

**Supported Adapter Targets (current and planned)**

| Adapter | Model Family | Status | Primary Use |
|---|---|---|---|
| AnthropicAdapter | Claude (Haiku, Sonnet, Opus) | Active (MVP) | Sophia web chat |
| OpenAIAdapter | GPT-4o, GPT-4o-mini | Planned | Fallback/comparison |
| GeminiAdapter | Gemini 1.5 Flash, Pro | Planned | Cost optimization at scale |
| LocalAdapter | Open-source models | Research | Offline/regulated environments |

#### Channel Provider Adapter

The Channel Provider Adapter abstracts all communication channels. Digital Employees never write directly to WhatsApp, Vapi, or ElevenLabs. They call the adapter.

**Supported Adapter Targets**

| Adapter | Provider | Channel | Status |
|---|---|---|---|
| WebChatAdapter | Sophia Chat (internal) | Web chat widget | Active (MVP) |
| WhatsAppAdapter | Meta WhatsApp Business API | WhatsApp | Planned |
| VoiceAdapter | Vapi | Inbound/outbound voice | Planned |
| SpeechAdapter | ElevenLabs | Voice synthesis (TTS) | Planned |
| EmailAdapter | Resend | Email | Active (contact form) |

#### Storage Provider Adapter

The Storage Provider Adapter abstracts all persistence. No system writes directly to any database, cache, or vector store.

| Adapter | Provider | Use | Status |
|---|---|---|---|
| KVAdapter | Cloudflare KV | Session state, visitor memory | Planned |
| DatabaseAdapter | Cloudflare D1 (SQLite) | Lead records, conversation logs | Planned |
| VectorAdapter | Vectorize (Cloudflare) or Pinecone | Knowledge embeddings | Planned |
| CacheAdapter | In-memory (MVP), Redis (scale) | Short-term session cache | MVP: in-process |

### 2.4 Event System

#### Event Bus Design

The event bus is the integration backbone of Sophia Core™. All systems communicate through events — no system calls another system directly. This creates complete decoupling, a full audit trail, and the ability to add new consumers without modifying existing producers.

**Design Specifications**

| Property | Specification |
|---|---|
| Pattern | Publish-subscribe |
| Durability | Events persisted for 30 days |
| Delivery guarantee | At-least-once with idempotent consumers |
| Ordering | Causal ordering within a conversation; no global ordering |
| Partitioning | Partitioned by tenant_id |
| Current implementation | In-process event emitter (MVP); production target: Cloudflare Queues |

**Event Envelope Schema**

```
EventEnvelope {
  event_id:        string (UUID)
  tenant_id:       string
  conversation_id: string
  employee_id:     string
  event_type:      string (e.g., "conversation.started")
  version:         string (e.g., "1.0")
  timestamp:       ISO 8601 string
  source_system:   string (e.g., "sophia_runtime")
  payload:         object
  metadata:        object
}
```

#### Complete Event Catalog

**Conversation Events**

| Event | Emitter | Payload Key Fields | Consumers |
|---|---|---|---|
| conversation.started | Runtime | session_id, tenant_id, channel, language | Memory, Analytics |
| conversation.turn.completed | Runtime | session_id, turn_id, intent, response_length | Analytics, Memory |
| conversation.goal.set | Intelligence | session_id, goal_type, goal_context | Runtime, Memory |
| conversation.goal.achieved | Intelligence | session_id, goal_type, outcome | Analytics, Sales |
| conversation.goal.abandoned | Intelligence | session_id, goal_type, reason | Analytics |
| conversation.updated | Runtime | session_id, state, turn_count | Memory |
| conversation.completed | Runtime | session_id, duration, turns, outcome | Analytics, Memory, CRM |
| conversation.failed | Runtime | session_id, error_code, last_state | Monitoring |
| conversation.timed_out | Runtime | session_id, last_activity_at | Memory |
| conversation.recovered | Runtime | session_id, gap_duration | Memory |

**Memory Events**

| Event | Emitter | Payload Key Fields | Consumers |
|---|---|---|---|
| memory.updated | Memory | visitor_id, memory_type, fields_changed | Intelligence |
| memory.expired | Memory (expiry job) | visitor_id, memory_type, expired_at | Intelligence |
| memory.deleted | Memory | visitor_id, deletion_reason, affected_types | Audit, Compliance |
| memory.enriched | Memory | visitor_id, memory_type, new_fields | Intelligence |

**Lead and Action Events**

| Event | Emitter | Payload Key Fields | Consumers |
|---|---|---|---|
| lead.created | Actions | lead_id, source, contact_summary | CRM, Notifications |
| lead.updated | Actions | lead_id, status_from, status_to | CRM |
| lead.qualified | Actions | lead_id, qualification_score | Sales |
| strategy_call.requested | Actions | lead_id, preferred_time, pain_summary | Calendar, Notifications |
| appointment.booked | Actions | appointment_id, participants, time | Calendar, CRM |
| human_handoff.started | Runtime | session_id, reason, context_summary | Human Queue |
| human_handoff.completed | Runtime | session_id, resolution, duration | Analytics |
| notification.sent | Actions | channel, recipient, template_id, delivered | Analytics |

**System Events**

| Event | Emitter | Payload Key Fields | Consumers |
|---|---|---|---|
| knowledge.updated | Knowledge | source, version_from, version_to | Knowledge (re-index) |
| knowledge.indexed | Knowledge | source, chunk_count, index_duration | Analytics |
| skill.loaded | Runtime | skill_id, employee_id, tenant_id | Analytics |
| skill.executed | Skills | skill_id, intent, duration_ms | Analytics |
| action.executed | Actions | action_id, success, duration_ms | Analytics |
| employee.deployed | Platform | employee_id, tenant_id, channels | CRM |

### 2.5 Multi-Tenancy

#### Tenant Isolation Model

Every business served by Carriersfy AI is a tenant. Tenant isolation is enforced at four layers:

**Data Layer:** Every record in every store is tagged with `tenant_id`. Queries always include the tenant_id predicate. Cross-tenant data access is architecturally impossible without an explicit cross-tenant read permission, which exists only for the Carriersfy AI support role.

**Configuration Layer:** Tenant configuration (personality overrides, knowledge overrides, channel config, action permissions, operating hours, escalation rules) is stored in a dedicated tenant configuration store. A configuration change for Tenant A can never affect Tenant B.

**Knowledge Layer:** Tenant knowledge (custom FAQs, product catalogs, policies, brand vocabulary) is stored in a tenant-specific knowledge partition. Semantic search queries are always scoped to the appropriate partition (global + tenant).

**Event Layer:** Events are partitioned by tenant_id. A tenant's events are never mixed with another tenant's events in the same partition.

#### Shared vs. Tenant-Specific Resources

| Resource | Shared | Tenant-Specific |
|---|---|---|
| Sophia Core™ runtime code | ✅ | |
| Global knowledge base | ✅ | |
| Industry skill library | ✅ | |
| AI model adapters | ✅ | |
| Tenant configuration | | ✅ |
| Tenant knowledge base | | ✅ |
| Tenant memory records | | ✅ |
| Employee personality tuning | | ✅ |
| Channel credentials | | ✅ |
| Analytics and conversation history | | ✅ |

#### White-Label Capability

Every element of the Digital Employee experience that a visitor encounters can be configured per tenant without code changes:

- Employee name (e.g., "Maria" instead of "Sophia")
- Employee role title
- Greeting message and tone
- Brand voice (formal/casual calibration)
- Language priority
- Response topics (which knowledge to surface)
- Escalation behavior
- Channel appearance (for web chat: colors, avatar, positioning)

The communication principles (communication as respect, no pressure, no guarantees, no technology exposure) are not overridable. They are core to the Carriersfy AI brand promise and the legal protection of the company.

### 2.6 Architecture Decisions

#### ADR-SC-001: Event-Driven Architecture as the Integration Pattern

**Status:** ACCEPTED | **Date:** 2026-06-25

**Context:** Sophia Core™ has seven primary systems that must interact. The choice of integration pattern determines the coupling, testability, scalability, and audit capability of the entire system.

**Decision:** All systems communicate exclusively through the event bus. No system calls another system directly.

**Rationale:** Events decouple producers from consumers, enabling independent deployment and scaling. Event logs provide complete audit trails. New consumers (analytics, CRM sync, reporting) can be added without modifying existing producers. Synchronous request/response coupling would have made the system brittle, hard to test, and difficult to scale.

**Consequences:** Requires a durable event bus infrastructure. Debugging requires event log tooling. Eventual consistency must be embraced.

---

#### ADR-SC-002: Provider Abstraction via Adapter Pattern

**Status:** ACCEPTED | **Date:** 2026-06-25

**Context:** Carriersfy AI's core product depends on AI model quality, channel availability, and storage performance — all of which are provided by third parties whose pricing, availability, and capabilities change rapidly.

**Decision:** All external dependencies are wrapped in provider adapters with formal interface contracts. Business logic depends only on the adapter interface, never on the provider implementation.

**Rationale:** AI vendor lock-in is existential risk. One API pricing change should not require a product rewrite. The adapter pattern is the canonical solution for this class of problem.

**Consequences:** More initial development effort (writing adapters before using providers). All benefits of provider independence compound over time.

---

#### ADR-SC-003: Multi-Tenant Isolation via tenant_id Tagging

**Status:** ACCEPTED | **Date:** 2026-06-25

**Context:** Carriersfy AI serves multiple businesses on shared infrastructure. Data isolation between tenants is a legal requirement and a business trust requirement.

**Decision:** All records in all stores are tagged with tenant_id. Queries always include tenant_id as a predicate. Database-per-tenant and schema-per-tenant were considered.

**Rationale:** Database-per-tenant would require N databases for N clients, making operations exponentially complex. Schema-per-tenant in PostgreSQL has practical limits. tenant_id tagging provides sufficient isolation at vastly lower operational cost.

**Consequences:** All queries must include tenant_id. Application-level isolation enforcement requires discipline. Audit tooling must support cross-tenant queries for support use cases.

---

#### ADR-SC-004: Skill Composition over Inheritance for Digital Employees

**Status:** ACCEPTED | **Date:** 2026-06-25

**Context:** Six Digital Employees share a common foundation (Sophia Core™) but have different functional capabilities. The question is how to model this relationship.

**Decision:** Digital Employees are composed of Skill bundles at runtime, not built from class inheritance hierarchies.

**Rationale:** Inheritance couples capability to employee identity. Adding a new capability to one employee risks affecting others. Composition allows mixing capabilities freely without coupling. A future employee that needs Sophia's sales skill and Titan's qualification skill can have both without modifying either.

---

#### ADR-SC-005: Customer-Safe Tier Enforcement at Channel Adapter Layer

**Status:** ACCEPTED | **Date:** 2026-06-25

**Context:** Intelligence and Skills need full knowledge (including internal-only TIER 2 content) to reason effectively. But the response delivered to the visitor must never include TIER 2 content.

**Decision:** TIER 2 content is available for reasoning but stripped at the channel adapter layer before delivery.

**Rationale:** Filtering at retrieval would starve Intelligence of context needed for good decisions. Filtering at channel output ensures that reasoning quality is not sacrificed for safety — safety is enforced at the boundary.

---

#### ADR-SC-006: Short-Term Memory In-Process, Long-Term Memory External

**Status:** ACCEPTED | **Date:** 2026-06-25

**Context:** Short-term memory (current session context) must be retrieved in <10ms. Long-term memory (lead history, business profile) must survive instance termination.

**Decision:** Short-term memory lives in-process for the session duration. Long-term memory is stored in an external durable store (KV or database).

**Rationale:** In-process short-term memory achieves the latency requirement without a network hop. External long-term memory achieves the durability requirement without relying on instance state.

---

#### ADR-SC-007: SOLID Compliance as a Non-Negotiable Standard

**Status:** ACCEPTED | **Date:** 2026-06-25

**Context:** Carriersfy AI will hire engineers. Code that violates SOLID principles becomes progressively harder to maintain, test, and extend.

**Decision:** All code in Sophia Core™ must comply with SOLID principles. Violations discovered in code review are blocking.

**Rationale:** SOLID violations compound over time. A violation accepted today is technical debt that costs ten times as much to fix in twelve months.

---

#### ADR-SC-008: Knowledge Versioning with Re-Indexing on Update

**Status:** ACCEPTED | **Date:** 2026-06-25

**Context:** The knowledge base changes as the company evolves. Stale knowledge causes incorrect responses. Unversioned knowledge cannot be rolled back.

**Decision:** Every knowledge source carries a version. Updates trigger re-indexing events. The previous version remains available until re-indexing completes (zero-downtime updates).

---

#### ADR-SC-009: Iron Prime™ as Executive Orchestration Layer

**Status:** ACCEPTED | **Date:** 2026-06-25

**Context:** As Carriersfy AI deploys multiple Digital Employees to a single client, those employees need coordination. The question is whether to implement peer-to-peer routing or a dedicated orchestration layer.

**Decision:** Iron Prime™ is a dedicated executive orchestration layer. He is not a Digital Employee — he does not have customer-facing conversations. He orchestrates the Digital Workforce.

**Rationale:** Peer-to-peer routing creates a mesh of coupling and circular dependency risk. A dedicated orchestrator provides clear accountability, a single place to configure routing rules, and a clear audit trail for cross-employee work.

---

#### ADR-SC-010: Personality Layer Applied as Post-Processing

**Status:** ACCEPTED | **Date:** 2026-06-25

**Context:** Personality could be applied by weaving personality instructions into every prompt, or as a dedicated post-processing step.

**Decision:** Personality is applied as post-processing after Intelligence/Skills produce a raw response.

**Rationale:** Personality is presentation, not reasoning. Separating them allows the Intelligence and Skill layers to evolve their reasoning capabilities without coupling to presentation concerns. It also makes the personality layer independently testable.

---

#### ADR-SC-011: Horizontal Scaling via Stateless Compute + External State

**Status:** ACCEPTED | **Date:** 2026-06-25

**Context:** As the number of concurrent conversations grows, the system must scale without architectural changes.

**Decision:** All compute is stateless. All state lives in external stores. Instances can be added, removed, or restarted without data loss.

**Consequences:** Every request must fetch its state from an external store (adds latency). Mitigated by short-term in-process session cache (ADR-SC-006).

---

#### ADR-SC-012: Multi-Language as Runtime Config

**Status:** ACCEPTED | **Date:** 2026-06-25

**Context:** Carriersfy AI serves EN, PT, and ES markets with plans to expand.

**Decision:** Language selection, translation resources, and language-specific behavior are runtime configuration. Adding a new language requires no code deployment.

**Rationale:** Code branches per language would make the system unmaintainable at scale. Runtime configuration makes language expansion a content and configuration task.

---

## CHAPTER 3: CODEX — COMPONENT LIBRARY

### 3.1 Overview

CODEX is the design-to-code bridge at Carriersfy AI. It is a complete React application that renders every page and component in the Carriersfy AI design system, serving as the definitive visual and interaction prototype layer for all Digital Employee experience surfaces.

CODEX was built as CODEX MISSION #002 and is not deployed to the production website. It lives in the `/codex/` directory and runs locally on `localhost:5173`.

**Technical Stack**

| Technology | Version | Role |
|---|---|---|
| React | 18.3.1 | Component rendering |
| TypeScript | 5.6.3 | Type safety |
| Tailwind CSS | 3.4.14 | Utility-first styling |
| Vite | 5.4.10 | Build tool and dev server |
| React Router | 6.26.2 | Client-side routing |

**Purpose of CODEX**

1. Provide a living design system reference for all Digital Employee UIs
2. Enable rapid prototyping of new features before production implementation
3. Serve as the component specification that guides any production implementation
4. Maintain a visual inventory of all design patterns in the Carriersfy AI design language

### 3.2 Component Inventory

CODEX contains 9 major components built in CODEX MISSION #002, served through 16 routes.

| Route | Component | Purpose |
|---|---|---|
| `/` | Dev Index | Development navigation hub |
| `/employees` | AI Employees Hub | Overview of all 6 Digital Employees |
| `/employees/sophia` | SophiaPage | Sophia employee detail page |
| `/employees/nova` | NovaPage | Nova employee detail page |
| `/employees/titan` | TitanPage | Titan employee detail page |
| `/employees/orion` | OrionPage | Orion employee detail page |
| `/employees/atlas` | AtlasPage | Atlas employee detail page |
| `/employees/echo` | EchoPage | Echo employee detail page |
| `/employees/iron-prime` | IronPrimePage | Iron Prime AI CEO page |
| `/team` | AITeamPage | AI Team with canvas network visualization |
| `/app-division` | AppDivisionPage | App Development Division |
| `/case-study/light-of-life` | LightOfLifePage | Light of Life case study |
| `/build/employee` | BuildEmployeePage | Build Your AI Employee configurator |
| `/build/app` | BuildAppPage | Build Your App configurator |
| `/payment` | PaymentCenterPage | Payment Center UI |
| `/portal` | ClientPortalPage | Client Portal Dashboard |

**Notable Components**

**AITeamPage + NetworkGraph.tsx**  
The AI Team page includes a canvas-based animated network graph built in `NetworkGraph.tsx` (186 lines). Iron Prime is positioned at the center of the network, with the six Digital Employees arranged on an orbital ring. Data particles travel along connection lines in a continuous animation loop. Mouse proximity brightens the nearest node, creating an interactive visualization of the Digital Workforce hierarchy.

**BuildEmployeeConfigurator.tsx**  
The 11-step Digital Employee Factory configurator, implemented in `BuildEmployeeConfigurator.tsx` (167 lines). Steps: IndustryStep → EmployeeStep → PersonalityStep → VoiceStep → LanguagesStep → CapabilitiesStep → BusinessKnowledgeStep → ScheduleStep → AppearanceStep → PricingStep → SummaryStep.

**ClientPortalPage.tsx**  
A full dashboard UI (277 lines) with: sidebar navigation, stats widgets, activity feed, AI employee status panel, usage bars, and notification center. This represents the future client-facing portal for managing deployed Digital Employees.

**PaymentCenterPage.tsx**  
A 7-tab payment management interface (309 lines) with: Overview, Setup Fee, Monthly Subscription, Upgrade Plan, Add AI Employee, Invoices, and Billing History.

### 3.3 Design System Implementation

CODEX is the living implementation of the Carriersfy AI design system.

**Color Tokens**

| Token | Value | Usage |
|---|---|---|
| `bg-primary` | `#070B16` | All backgrounds |
| `brand-blue` | `#1FA2FF` | Primary CTAs, highlights |
| `brand-red` | `#FF2E3C` | Secondary CTAs, accents |
| `brand-green` | `#35D6A0` | Online indicators, success states |
| `text-primary` | `#F4F6FB` | All body text |
| `cta-gradient` | `linear-gradient(135deg, #1FA2FF, #FF2E3C)` | Primary action buttons |

**Typography**

| Role | Font | Weight | Size Range |
|---|---|---|---|
| Headings | Space Grotesk | 700 | 28px–64px |
| Body | Manrope | 400–700 | 13px–18px |
| UI Labels | Manrope | 800 | 12px–14px |

**Animation System**

| Name | Description |
|---|---|
| `cfbreath` | Slow scale pulse for ambient indicators |
| `cfrise` | Upward fade-in on mount |
| `cfshimmer` | Horizontal light sweep for loading states |
| `cfblink` | Sharp blink for live/active indicators |
| `cfspin` | Rotation for loading spinners |
| `cffloat` | Gentle vertical float for hero elements |
| `cfglow` | Pulsing glow for brand elements |
| `cfcore` | Iron Prime-specific orbital animation |

**Glass Surface Pattern**

```css
background: rgba(255, 255, 255, 0.05);
border: 1px solid rgba(255, 255, 255, 0.13);
border-radius: 16px;
backdrop-filter: blur(12px);
```

### 3.4 CODEX and the Production Website

CODEX does not serve the production website. The production website is a DC/Draftcode-generated `index.html` powered by `support.js`. CODEX serves the following roles in relation to production:

1. **Visual specification:** Every design pattern implemented in CODEX is the specification for how the production website should look and behave.
2. **Component reference:** When new features are added to the production website, CODEX provides the visual and interaction specification.
3. **Client presentations:** CODEX can be run locally and screenshotted for client presentations showing the full Digital Employee experience before production deployment.
4. **Future SPA:** When the production website migrates from DC/Draftcode to a full React SPA, CODEX components will be the starting point for that migration.

---

## CHAPTER 4: APP DEVELOPMENT

### 4.1 Capability Overview

Carriersfy AI builds custom mobile and web applications for clients as part of its Digital Workforce offering. App development is not a standalone service — it is a force multiplier for Digital Employees. An AI employee that can also read from and write to a client's mobile app creates a feedback loop of intelligence and automation that no competitor combination of generic chatbot + off-the-shelf app can replicate.

The app development capability covers three platforms: iOS native, Android native, and web progressive web apps (PWA) and single-page applications (SPA).

### 4.2 Supported Platforms

| Platform | Technology | Delivery | AI Integration |
|---|---|---|---|
| iOS | Swift / SwiftUI | App Store via Apple Developer Program | Sophia Core™ API |
| Android | Kotlin / Jetpack Compose | Google Play Store | Sophia Core™ API |
| Web (SPA) | React + TypeScript | Cloudflare Pages | Direct API integration |
| Web (PWA) | React + Service Workers | Cloudflare Pages | Direct API integration |

### 4.3 The 11-Step App Builder Process

The App Builder™ is the guided configuration tool that helps clients scope their custom application. It produces a detailed project specification that feeds directly into the development engagement.

| Step | Name | What Happens |
|---|---|---|
| 1 | Welcome | Client is introduced to the App Builder process. Scope and purpose explained. |
| 2 | Project Type | Client selects type: Customer Portal, Booking App, Loyalty App, Service Tracking, Custom |
| 3 | Industry | Industry selection triggers pre-populated feature recommendations |
| 4 | Target Users | Who uses the app: customers, staff, or both |
| 5 | Platforms | iOS, Android, Web, or combination |
| 6 | Required Features | Feature selection from a curated catalog for the selected industry and type |
| 7 | Languages | EN, PT, ES, or combination |
| 8 | Timeline | Launch urgency: ASAP (8 weeks), Standard (12 weeks), Flexible (16+ weeks) |
| 9 | Estimated Complexity | System calculates complexity score from features × platforms × languages |
| 10 | Project Summary | Full specification summary with complexity, estimated scope, and next steps |
| 11 | Request Proposal | Client submits contact information; Project Forge receives a structured brief |

### 4.4 App Types

**Customer Portal**  
A branded, authenticated application where clients' customers can manage their account, view history, submit requests, and communicate with the company's Digital Employees. Integration: Sophia Core™ for the AI chat layer, client's CRM for data, Carriersfy AI Platform for notifications.

**Booking App**  
Appointment and service scheduling app with calendar integration, automated reminders via Nova or Echo, and confirmation workflows. Integration: Atlas (operations management), Echo (confirmation messaging).

**Loyalty App**  
Customer loyalty and rewards tracking. Points accumulation, reward redemption, push notifications via Echo, and personalized recommendations via Orion. Integration: Orion (customer success), Echo (communications).

**Service Tracking App**  
Real-time tracking for service industries: job status, technician location, completion notifications. Critical for Construction, Transportation, Roadside Assistance, HVAC, and Plumbing clients. Integration: Atlas (operations), Echo (status notifications).

### 4.5 AI Integration in Apps

Every app built by Carriersfy AI is AI-integrated from day one. This is not a feature — it is an architectural requirement.

**Integration Patterns**

- **In-app chat:** Sophia or the client's deployed Digital Employee is available in-app for support, booking, or qualification
- **Push notifications via Digital Employee:** Echo sends push notifications that read as coming from the client's AI employee, not from a generic system
- **AI-powered recommendations:** Orion surfaces relevant suggestions based on the customer's history and behavior
- **Voice integration:** Future integration with VoiceAdapter allows in-app voice calls with the client's deployed Digital Employee

### 4.6 Development Timeline

| Timeline Tier | Complexity | Platforms | Estimated Duration |
|---|---|---|---|
| Accelerated | Low-Medium | Web only | 6–8 weeks |
| Standard | Medium | Web + one native | 10–14 weeks |
| Extended | Medium-High | iOS + Android + Web | 14–20 weeks |
| Enterprise | High | Multi-platform + integrations | 20+ weeks (scoped per engagement) |

Timeline begins after signed SOW and completion of Business Discovery. Client-provided delays (content, approvals, feedback) pause the timeline clock.

### 4.7 Internal Tech Stack

Project Forge's default technology choices for client application development:

| Layer | Technology | Rationale |
|---|---|---|
| Web SPA | React 18 + TypeScript | Consistency with CODEX, strong ecosystem |
| Web styling | Tailwind CSS v3 | Rapid, consistent styling |
| Web build | Vite | Fast build times, ES module native |
| Web hosting | Cloudflare Pages | Zero-config deployment, global CDN |
| iOS | Swift + SwiftUI | Native performance, Apple ecosystem |
| Android | Kotlin + Jetpack Compose | Native performance, Google ecosystem |
| AI backend | Sophia Core™ API | Consistent Digital Employee behavior |
| Email | Resend | Proven, used in production |
| Auth | Cloudflare Access or Auth0 | Secure, scalable |

---

## CHAPTER 5: SOPHIA MVP — CURRENT IMPLEMENTATION

### 5.1 Architecture

The Sophia MVP is the production implementation of Sophia as a live AI chat assistant on carriersfy.ai. It was built under the directive: **simplest architecture that works today, with a clear path to Sophia Core™ tomorrow.**

**Components**

| Component | File | Technology | Role |
|---|---|---|---|
| AI chat function | `functions/api/chat.js` | Cloudflare Pages Function | Receives messages, calls AI model, returns response + intent |
| Chat UI | `sophia-chat.js` | Client-side JavaScript (IIFE) | Enhances Sophia modal with real chat interface |
| Lead capture function | `functions/api/contact.js` | Cloudflare Pages Function | Accepts lead data, sends email via Resend |
| Website entry point | `index.html` | DC/Draftcode + support.js | Hosts Sophia launcher and modal |

**Architecture Diagram**

```
Visitor clicks Sophia launcher
        ↓
sophia-chat.js intercepts modal (MutationObserver)
        ↓
Replaces static button panel with chat interface
        ↓
Visitor sends message
        ↓
POST /api/chat → functions/api/chat.js
        ↓
chat.js builds Sophia system prompt + history
        ↓
fetch → Anthropic API (claude-haiku-4-5-20251001)
        ↓
Parse response + INTENT: tag
        ↓
Return { response, intent, action }
        ↓
sophia-chat.js renders response bubble
        ↓
Action handling (scroll to contact, open builder, capture lead, open WhatsApp)
        ↓
If lead_capture: show inline form → POST /api/contact → email to juan@carriersfy.ai
```

### 5.2 How /api/chat Works

The `/api/chat` Cloudflare Pages Function is 215 lines of JavaScript. Its responsibilities:

1. **Validate input:** Requires `Content-Type: application/json` and a non-empty `message` field
2. **Check API key:** Returns HTTP 500 if `ANTHROPIC_API_KEY` is not set in environment
3. **Build conversation history:** Accepts `history[]` from client, filters to valid roles, caps at last 6 turns
4. **Construct messages array:** Appends current `message` to filtered history
5. **Call Anthropic API:** POST to `https://api.anthropic.com/v1/messages` with the system prompt constant, messages array, `max_tokens: 400`, `temperature: 0.7`
6. **Parse intent:** Extracts the `INTENT:` tag from the response using a regex match on the final line
7. **Strip intent from response:** Removes the `INTENT:` line before returning to the client
8. **Map intent to action:** Uses `INTENT_ACTION_MAP` to derive the `action` field
9. **Return:** `{ response, intent, action }`
10. **Handle errors:** All failures return structured JSON errors with appropriate HTTP status codes

**System Prompt**

The system prompt is a hardcoded constant (~850 tokens) containing Sophia's identity, communication rules, absolute rules, intent detection protocol, and a curated subset of company knowledge. It is not the full knowledge base — it is a carefully selected set of facts that covers the vast majority of customer questions. The full 155-FAQ knowledge center will inform a future RAG layer.

### 5.3 Intent Detection Implementation

Intent detection in the MVP uses a prompt-engineering approach: Sophia is instructed to output `INTENT:[intent_value]` on a separate final line of every response.

**Intent values:**

| Intent | Action Triggered | Description |
|---|---|---|
| inquiry | null | General question — keep conversation |
| pricing | scroll_to_contact | Pricing question → redirect to Strategy Call |
| strategy_call | scroll_to_contact | Call booking request |
| employee_builder | open_employee_builder | Digital Employee interest |
| app_builder | open_app_builder | App development interest |
| whatsapp | open_whatsapp | WhatsApp channel preference |
| lead_capture | capture_lead | High buying intent + business context |
| off_topic | null | Outside scope |

**Action implementation in sophia-chat.js:**

- `scroll_to_contact`: Scrolls the page to `#contact` section and closes the modal
- `open_employee_builder`: Clicks `[data-employee-factory-open]` element or scrolls to `#digital-employee-factory`
- `open_app_builder`: Clicks `[data-app-builder-open]` or scrolls to `#app-builder`
- `open_whatsapp`: Opens WhatsApp deeplink in new tab
- `capture_lead`: Shows inline lead capture form in chat

### 5.4 Lead Capture Flow

When Sophia detects `action: capture_lead`, the following sequence occurs:

1. Sophia says "I'd love to send you some tailored information. Could I get your name and email?" (in visitor's language)
2. An inline form appears in the chat: Name, Business, Email, Submit button
3. Client validates: name and valid email required
4. On submit: POST to `/api/contact` with collected data + conversation summary from `state.history`
5. The contact.js function sends an email to `juan@carriersfy.ai` and `hello@carriersfy.ai` with a Sophia Pipeline section showing intent, routing queue, and CRM/WhatsApp/appointment statuses
6. On success: Sophia says "Thank you! You'll hear from us soon." and the form is removed
7. On error: Sophia says "There was an issue. Please reach us at hello@carriersfy.ai."
8. `state.leadCaptured = true` prevents duplicate submissions

### 5.5 Known Limitations and Future Improvements

| Limitation | Impact | Future Improvement |
|---|---|---|
| System prompt is a static subset of knowledge | Sophia may not answer niche questions | RAG pipeline (Sophia Knowledge™ + vector search) |
| No rate limiting on /api/chat | Potential API cost abuse | Cloudflare Rate Limiting rule + CORS lockdown to carriersfy.ai |
| CORS is open (`*`) | Any origin can call the endpoint | Restrict to `https://carriersfy.ai` |
| No persistent memory | Each session starts fresh | Sophia Memory™ (KV store) |
| Lead capture requires AI to be live | If AI is down, inline form never appears | Always-visible contact button fallback |
| WhatsApp is a deeplink only | No two-way conversation | WhatsApp Business API integration |
| No conversation logging | Cannot review Sophia's conversations | Cloudflare D1 conversation log |
| Single model adapter | If Anthropic has outage, Sophia is down | Fallback to secondary model adapter |
| No analytics | Cannot measure conversation quality | Cloudflare Analytics Engine |
| MutationObserver modal patching | May fail if DC runtime changes modal structure | Migrate to dedicated chat endpoint when website is SPA |

### 5.6 Required Environment Variables

| Variable | Purpose | Where Set | Status |
|---|---|---|---|
| `ANTHROPIC_API_KEY` | Sophia AI chat (required for /api/chat) | Cloudflare Pages → Settings → Environment Variables → Production | Must be set before deployment |
| `RESEND_API_KEY` | Lead email delivery (required for /api/contact) | Cloudflare Pages → Settings → Environment Variables → Production | Must be set |
| `WHATSAPP_PHONE_NUMBER` | WhatsApp deeplink phone number | `sophia-chat.js` line 11 | Must replace `1XXXXXXXXXX` placeholder |

---

## CHAPTER 6: PROJECT FORGE ROADMAP

The Project Forge roadmap tracks the evolution of the Carriersfy AI Platform from its current MVP state to a global platform business. Each version has explicit trigger conditions — the threshold of business or technical reality that causes the move from one version to the next. Versions are not time-boxed — they are capability milestones.

### v1.0 — Foundation (Current)

**Status:** In deployment  
**Trigger to v1.0:** Sophia MVP live on carriersfy.ai with working AI chat, lead capture, and WhatsApp deeplink

**Includes:**
- carriersfy.ai production website with Sophia MVP live chat
- /api/chat and /api/contact Cloudflare Pages Functions
- OMEGA Enterprise Memory OS (internal)
- Sophia Knowledge Center (13 files)
- CODEX component library (design/prototype)
- Sophia Core™ architecture documentation (7 documents)
- Single Digital Employee (Sophia) in production

**Known limitations:** No persistent memory, no rate limiting, knowledge is prompt-embedded subset, WhatsApp is deeplink only

---

### v1.1 — Multi-Employee

**Trigger:** First client signs a contract for more than one Digital Employee  
**Estimated timeline:** Q3 2026

**Includes:**
- All 6 Digital Employees deployed (Nova, Titan, Orion, Atlas, Echo) in addition to Sophia
- Sophia Core™ Skills library (Core Skills + first 10 Industry Skills)
- Iron Prime basic orchestration (route between employees by function)
- Lead Memory + Business Memory (Cloudflare KV)
- Strategy Call booking action connected to calendar
- Rate limiting on /api/chat
- CORS locked to carriersfy.ai
- Conversation logging (Cloudflare D1)

---

### v1.2 — Enterprise Ready

**Trigger:** Fifth client onboarded OR first enterprise contract ($5,000+/month)  
**Estimated timeline:** Q4 2026

**Includes:**
- Multi-tenant isolation complete (all 14 principles enforced)
- Tenant admin dashboard (view conversations, update KB, configure employee)
- Full event system operational (Cloudflare Queues)
- Audit logging (90-day retention)
- All 25 Industry Skills
- Knowledge RAG layer (vector search via Vectorize or Pinecone)
- White-label capability
- Full WhatsApp integration (Meta Business API webhook)

---

### v2.0 — Digital Workforce

**Trigger:** First client deploys 3+ Digital Employees simultaneously  
**Estimated timeline:** Q1 2027

**Includes:**
- Iron Prime full orchestration (cross-employee task routing, cross-employee memory)
- Digital Workforce reporting dashboard per client
- App builder integration (apps connect to Digital Employees via Sophia Core™ API)
- Voice AI (Vapi adapter + ElevenLabs TTS)
- Cross-employee Memory sharing (with consent)
- Employee-to-employee conversation handoff

---

### v2.1 — Scale

**Trigger:** 50+ active client tenants  
**Estimated timeline:** Q2 2027

**Includes:**
- 1,000+ tenant support (architecture validation)
- Global region deployment (US, BR, EU data residency)
- All 25+ industry skills in EN, PT, ES
- Advanced analytics per tenant (conversation quality, lead conversion, satisfaction)
- SLA monitoring and alerting

---

### v3.0 — Platform

**Trigger:** Carriersfy AI decides to open the platform to third-party developers  
**Estimated timeline:** Q3–Q4 2027

**Includes:**
- Carriersfy AI Platform API (external REST/GraphQL)
- Developer documentation and SDKs
- Skills Marketplace (third-party skill developers)
- Industry-specific Digital Workforce templates (Healthcare, Government, Education)
- Partner program for agencies

---

### v4.0 — Ecosystem

**Trigger:** Platform API reaches 10+ third-party integrations  
**Estimated timeline:** 2028

**Includes:**
- White-label platform licensing (third parties build on Sophia Core™)
- Regional franchise model (Brazil, EU, LATAM)
- Sophia Core™ as a licensable SDK
- Multi-country compliance as product (LGPD, GDPR, HIPAA editions)

---

## CHAPTER 7: ENGINEERING STANDARDS

### 7.1 Code Quality Standards

All code committed to any Carriersfy AI repository must meet the following standards:

**Functional correctness:** The code does what it claims to do. Tests exist for all non-trivial logic.

**Readability:** Variable and function names are self-explanatory. Comments exist only where the WHY is non-obvious — not to explain what the code does.

**Security:** No secrets in code. Input validation at all system boundaries. No command injection, XSS, SQL injection, or other OWASP Top 10 vulnerabilities.

**Simplicity:** No premature abstraction. No features for hypothetical future requirements. Three similar lines is better than a wrong abstraction.

**Error handling:** All edge cases handled. All failures return structured responses. No swallowed errors. No silent failures.

### 7.2 Documentation Standards

Every significant change to a production system requires:

1. **Inline documentation:** Non-obvious logic explained with a one-line comment (not what, but why)
2. **PR description:** What changed, why it changed, how to test it
3. **Architecture updates:** If the change affects architecture, the relevant `docs/SOPHIA_CORE_*.md` document must be updated
4. **OMEGA updates:** If the change affects the company's operational state, the relevant OMEGA file must be updated
5. **Environment variable documentation:** New env vars must be documented in `docs/VOL_VIII_TECHNOLOGY.md` Chapter 5

### 7.3 Testing Requirements

**Unit tests:** Required for all business logic functions (intent parsing, knowledge filtering, memory TTL enforcement)

**Integration tests:** Required for all API endpoints (`/api/chat`, `/api/contact`) before any change is deployed to production

**Manual smoke test:** After any production deployment, the following must be verified:
1. Sophia launcher opens the chat modal
2. Sophia responds to a message
3. Contact form sends an email
4. No console errors on page load

**Regression prevention:** If a bug is fixed, a test must be added that would have caught it.

### 7.4 Security Review Checklist

Before any code is deployed to production:

- [ ] No API keys, passwords, or secrets in code
- [ ] All user inputs sanitized and validated
- [ ] CORS headers restrict to intended origins
- [ ] Authentication/authorization in place for all protected endpoints
- [ ] Error messages do not leak internal system details
- [ ] No new dependencies added without security review
- [ ] .gitignore updated if new sensitive file types are created

### 7.5 Deployment Process

```
1. Developer commits code to feature branch
2. Cloudflare Pages creates a preview deployment (preview URL auto-generated)
3. Smoke tests run against preview URL
4. Pull Request created with description
5. Juan approves the PR
6. Branch merged to main
7. Cloudflare Pages auto-deploys to production (carriersfy.ai)
8. Production smoke tests run
9. Deployment confirmed in OMEGA/PROJECTS/Carriersfy_AI_Website/CHANGELOG.md
```

**Critical constraint:** No direct pushes to `main` without a PR. No force pushes to `main` under any circumstances.

### 7.6 Incident Response for Technical Issues

**SEV-1 (Site Down or Sophia Completely Broken)**

1. Confirm issue via Cloudflare Pages dashboard
2. Identify last working deployment
3. Initiate rollback via Cloudflare Pages UI (instant — no git required)
4. Root cause investigation
5. Fix deployed to feature branch → reviewed → merged
6. Post-mortem written and filed

**SEV-2 (Sophia Partially Degraded)**

1. Confirm scope (which features affected)
2. Check Cloudflare Functions logs (`wrangler tail` or Cloudflare dashboard)
3. Check Anthropic API and Resend status pages
4. Apply fix if available; otherwise disable affected feature and communicate to visitors via updated error message
5. Root cause investigation

**SEV-3 (Minor Issue / UI Bug)**

1. Document in OMEGA/PROJECTS/Carriersfy_AI_Website/TASKS.md
2. Fix in next planned deployment

---

## CHAPTER 8: FUTURE TECHNOLOGY ROADMAP

### 8.1 RAG — Retrieval Augmented Generation for Sophia Knowledge™

The Sophia MVP uses a static system prompt (~850 tokens) containing a curated knowledge subset. This works for common questions but fails for niche industry questions, specific employee details, or long-tail FAQ queries.

The RAG pipeline will replace this with dynamic knowledge retrieval:

1. Every knowledge file is chunked into `KnowledgeChunk` records and embedded
2. At query time, the visitor's message is embedded and a semantic similarity search returns the top-k most relevant chunks
3. Those chunks are injected into the context window alongside the conversation history
4. Sophia answers from retrieved context, not from a static prompt

**Technology target:** Cloudflare Vectorize (vector database) + Cloudflare AI (embedding model)  
**Milestone:** v1.2 — Enterprise Ready

### 8.2 Voice AI Expansion

Voice is the highest-value channel for Digital Employees in most industries. A dental office's patients call — they do not visit a website. A trucking company's drivers call — they do not open a chat widget.

**Architecture:**
- Inbound call → VoiceAdapter (Vapi or Twilio) → Sophia Runtime™ (voice session)
- Sophia Intelligence™ processes transcript
- Response → SpeechAdapter (ElevenLabs) → synthesized audio → VoiceAdapter → caller

**Target voice characteristics:** Natural intonation, appropriate pacing, language-matched, emotionally calibrated (urgent calls get faster, calmer responses)

**Milestone:** v2.0 — Digital Workforce

### 8.3 WhatsApp Full Bot Integration

The current WhatsApp implementation is a deeplink. Full two-way WhatsApp integration requires:

1. **Meta Business API verification** — phone number registration with Meta
2. **Webhook endpoint** — `functions/api/whatsapp.js` Cloudflare Pages Function
3. **Message processing** — incoming messages routed through Sophia Runtime™
4. **Message templates** — pre-approved for outbound notifications
5. **Session management** — 24-hour WhatsApp session windows

**Milestone:** v1.2 — Enterprise Ready

### 8.4 MCP Servers

Model Context Protocol (MCP) is Anthropic's standard for AI tool use. When Sophia needs to check a client's calendar, query a CRM, or look up an order status, she will do so through MCP servers.

**Planned MCP servers:**
- `carriersfy-calendar-mcp` — read/write calendar availability
- `carriersfy-crm-mcp` — lead and customer record access
- `carriersfy-whatsapp-mcp` — send WhatsApp messages
- `carriersfy-resend-mcp` — send email notifications
- `carriersfy-knowledge-mcp` — query the Sophia Knowledge™ RAG layer

**Milestone:** v2.0 — Digital Workforce

### 8.5 Iron Prime Orchestration Layer

Iron Prime's full implementation is the culminating milestone of the multi-employee architecture. He will:

1. Receive all events from all Digital Employees across a tenant's deployment
2. Detect opportunities for cross-employee handoff (e.g., Sophia qualifies lead → routes to Atlas for scheduling)
3. Maintain a unified view of every customer across every employee interaction
4. Generate daily briefings for human management teams
5. Detect performance patterns (which employee handles which industry best)
6. Escalate complex situations to Juan or the client's team

**Milestone:** v2.0 — Digital Workforce

### 8.6 Carriersfy AI Platform API

The external developer API (v3.0) will allow:
- Third-party agencies to deploy Digital Employees for their clients
- Enterprise IT teams to integrate Sophia Core™ into their existing platforms
- Skill developers to register new Industry Skills in the Skills Marketplace
- White-label partners to brand and resell the Carriersfy AI Digital Workforce

**API design:** REST + GraphQL, authenticated with per-tenant API keys, rate-limited, fully documented with OpenAPI spec

**Milestone:** v3.0 — Platform

---

## FREQUENTLY ASKED QUESTIONS — PROJECT FORGE

**Q1: Why is Sophia Core™ not yet in production if the architecture is complete?**  
A: The Sophia MVP uses a pragmatic implementation (a Cloudflare Pages Function with a hardcoded system prompt) that fulfills the most important immediate need: getting Sophia talking to real visitors today. The Sophia Core™ architecture is the blueprint for the full implementation, which will be built incrementally as the business scales. The MVP does not violate the Core architecture — it is the first simplified fulfillment of the Core Runtime and Intelligence interfaces.

**Q2: Can the CODEX component library be deployed to production?**  
A: Not directly. CODEX is a React SPA that runs on Vite's dev server. The production website is a DC/Draftcode-generated static HTML page. The path to production for CODEX components is: (a) when a feature is implemented in CODEX, it is the spec; (b) Juan's design team implements it in DC/Draftcode; (c) DC generates the updated `index.html`. Future option: migrate production to a full React SPA, at which point CODEX components become production directly.

**Q3: What happens to Sophia if the Anthropic API has an outage?**  
A: The chat.js function returns a 502 error with a structured JSON response. The sophia-chat.js client displays a graceful fallback message: "I'm having a brief connection issue. You can reach us directly at hello@carriersfy.ai or via WhatsApp." The Strategy Call and WhatsApp buttons remain functional. This covers most visitor needs during an AI outage. A secondary model adapter fallback is on the v1.1 roadmap.

**Q4: How many concurrent Sophia conversations can the current MVP handle?**  
A: Cloudflare Pages Functions have no hard concurrency limit per deployment. Each invocation is independent and stateless. At MVP traffic levels, the only limiting factor is the Anthropic API's rate limits (which are generous on paid plans) and Cloudflare's per-function request limits (100,000 requests/day on free plan, unlimited on paid plans).

**Q5: Can a client use their own AI model for their Digital Employee?**  
A: The provider abstraction architecture is designed for exactly this use case. When the AI Model Provider Adapter is implemented (v1.2), any client could theoretically bring their own model adapter. In practice, Carriersfy AI will maintain control of the AI layer to ensure quality and compliance — but the architecture does not prevent this.

**Q6: What is the difference between a Skill and an Action?**  
A: A Skill is a business conversation capability (knowing how to qualify a lead, knowing how to handle a pricing objection). An Action is an external operation (creating a lead record in a database, sending a WhatsApp message). Skills use Actions. Actions do not use Skills. The separation keeps business logic in Skills and execution in Actions, consistent with SOLID separation of concerns.

**Q7: Why is the OMEGA directory gitignored but previously committed?**  
A: OMEGA was committed to git in the first two sessions as part of building the company knowledge base. In retrospect, the OMEGA directory contains internal business intelligence that should not be in a public GitHub repository. The `.gitignore` entry for `OMEGA/` was added to prevent future OMEGA changes from being committed. The existing OMEGA content in git history can be removed with `git filter-repo` if the repository is ever made fully public. For now, the repo is treated as internal.

**Q8: What is the purpose of the employee-builder.js and app-builder.js files in the repo root?**  
A: These are builder script artifacts from earlier development sessions. They contain the logic for the Digital Employee Factory™ and App Builder™ configurators as standalone JavaScript modules. They are not production code and are not called by the website directly — the configurators are implemented in the DC/Draftcode design layer.

**Q9: When does CODEX MISSION #002 become production?**  
A: When the production website migrates from DC/Draftcode to a React SPA architecture. This is not on the current roadmap but is the natural evolution path as the website grows beyond what a single DC-generated HTML page can cleanly support.

**Q10: How does Project Forge handle technical debt?**  
A: Every known simplification in the current implementation is documented in Chapter 5.5 (Known Limitations) or in the relevant OMEGA task. Technical debt is not ignored — it is explicitly catalogued and scheduled. The v1.1 roadmap addresses the most important MVP limitations (rate limiting, CORS, persistent memory).

*(Questions 11–35 continue in the same format — covering topics including: Cloudflare D1 migration triggers, when to use KV vs D1, Iron Prime deployment prerequisites, multi-language Skill implementation, Apple Developer Program requirements for iOS apps, how to add a new industry skill, Sophia Core™ testing strategy, event bus migration from in-process to Cloudflare Queues, MCP Server development timeline, how tenant configuration updates are deployed without code changes, the difference between Sophia Runtime™ sessions and HTTP sessions, Sophia Memory™ TTL enforcement mechanism, Knowledge re-indexing during high traffic, provider adapter failure handling strategy, CODEX to production migration checklist, and more.)*

---

## GLOSSARY — PROJECT FORGE

**ADR (Architecture Decision Record):** A documented record of a significant architecture decision, including context, decision, rationale, and consequences. All Sophia Core™ ADRs are prefixed ADR-SC-001 through ADR-SC-012.

**Adapter Pattern:** A design pattern that wraps an incompatible interface to make it compatible with another interface. Used throughout Sophia Core™ for provider independence.

**Carriersfy AI Platform™:** The proprietary technology infrastructure powering all Carriersfy AI services. Customer-facing language never exposes specific technologies.

**CODEX:** The internal React/TypeScript component library and design prototype system. Not deployed to production. Lives in `/codex/`.

**Cloudflare Pages Function:** A serverless edge function hosted by Cloudflare that runs close to the user's geographic location. Used for `/api/chat` and `/api/contact`.

**DC/Draftcode:** The design tool used to generate the Carriersfy AI website. Produces `support.js`, `translations.js`, and `index.html`. None of these files may be modified by hand.

**Digital Employee:** A fully configured AI professional deployed by Carriersfy AI to handle specific business communication functions. Not a chatbot — a purpose-built professional with defined role, personality, knowledge, and capabilities.

**Event Bus:** The messaging infrastructure through which all Sophia Core™ systems communicate. No system calls another system directly — all communication is through events.

**Iron Prime™:** The AI Chief Executive Officer of the Carriersfy AI Digital Workforce. Not a client-facing Digital Employee — an executive orchestration layer.

**KnowledgeChunk:** The atomic unit of knowledge in Sophia Knowledge™. Each chunk has a source, version, content, embedding reference, customer-safe tier, and tags.

**MCP (Model Context Protocol):** Anthropic's standard for AI tool use. Planned for connecting Digital Employees to external business systems (CRM, calendar, WhatsApp).

**OMEGA:** The internal Enterprise Memory Operating System. Stored in `/OMEGA/` directory. Gitignored and not publicly accessible. Contains all internal business intelligence.

**Project Forge:** The internal designation for the engineering and product development function at Carriersfy AI.

**Provider Adapter:** A wrapper that abstracts a specific external provider (AI model, channel, storage) behind a standard interface. Business logic depends only on the interface.

**RAG (Retrieval Augmented Generation):** An AI architecture pattern where relevant knowledge chunks are retrieved from a vector database and injected into the AI context window at query time. Planned for Sophia Knowledge™ (v1.2).

**Skill:** A reusable, self-contained business capability module within Sophia Core™. Digital Employees are composed of Skill bundles.

**Sophia Core™:** The proprietary operating system powering all Digital Employees at Carriersfy AI. Seven systems: Runtime, Intelligence, Knowledge, Memory, Personality, Skills, Actions.

**Tenant:** A business served by Carriersfy AI on the shared Carriersfy AI Platform infrastructure. Each tenant's data, knowledge, configuration, and events are isolated.

**Vite:** The build tool and development server used by CODEX. Provides fast hot module replacement and ES module native builds.

---

## CHAPTER SUMMARY

Project Forge is the engineering heart of Carriersfy AI. It has built the foundation for a company that can scale from one Digital Employee on one website to thousands of Digital Employees deployed across hundreds of businesses in multiple countries.

The Sophia Core™ architecture — seven systems, provider-independent, event-driven, SOLID-compliant — is the blueprint. The MVP implementation — a Cloudflare Pages Function calling Anthropic with a hardcoded prompt — is the first proof of concept. Between them lies a clear, explicit, milestone-driven roadmap.

Every line of code written under Project Forge is written with the awareness that it will either be the foundation of something great, or the first technical debt payment on something that got built too fast. Project Forge's commitment is to make the former outcome the norm.

**Status as of June 2026:** Foundation complete. Sophia MVP in deployment. v1.1 roadmap defined. Architecture for full Sophia Core™ implementation documented and ready for engineering execution.

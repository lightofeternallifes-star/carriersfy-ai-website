# TASK ENGINE — Carriersfy AI

> Universal task management protocol for all projects and AI employees. Last updated: 2026-06-25

---

## Status Taxonomy

| Status | Symbol | Meaning |
|---|---|---|
| BACKLOG | `[BACKLOG]` | Captured, not yet scheduled |
| PLANNED | `[PLANNED]` | Scheduled for a specific sprint or date |
| IN PROGRESS | `[IN PROGRESS]` | Actively being worked |
| BLOCKED | `[BLOCKED]` | Cannot proceed — waiting on dependency |
| IN REVIEW | `[IN REVIEW]` | Work done, awaiting validation |
| DONE | `[DONE]` | Completed and verified |
| CANCELLED | `[CANCELLED]` | No longer needed — reason must be noted |

---

## Priority Taxonomy

| Priority | Symbol | Definition | Response SLA |
|---|---|---|---|
| Critical | `P0` | Production broken, client-facing failure, data loss | Immediate — fix before anything else |
| High | `P1` | Significant client impact or upcoming deadline | Within 24 hours |
| Medium | `P2` | Important but not urgent | Within this week |
| Low | `P3` | Nice-to-have, improvement, housekeeping | When bandwidth allows |

---

## Task Format

Every task entry must follow this structure:

```
### TASK-[ID]: [Title]
- **Project:** [Link to project README]
- **Priority:** P0 / P1 / P2 / P3
- **Status:** [STATUS]
- **Assigned:** [Person or AI employee]
- **Created:** YYYY-MM-DD
- **Due:** YYYY-MM-DD (or Q3 2026 if no hard date)
- **Description:** What needs to be done and why.
- **Acceptance Criteria:** Specific, verifiable conditions for DONE.
- **Dependencies:** Other tasks or systems that must be complete first.
- **Notes:** Any context, blockers, or decisions made during execution.
```

---

## Master Task List

### P0 — Critical

#### TASK-001: Verify RESEND_API_KEY in Cloudflare Pages Production
- **Project:** [Carriersfy AI Website](../PROJECTS/Carriersfy_AI_Website/README.md)
- **Priority:** P0
- **Status:** [IN PROGRESS]
- **Assigned:** Juan
- **Created:** 2026-06-24
- **Due:** 2026-06-26
- **Description:** The contact form function (`functions/api/contact.js`) requires `RESEND_API_KEY` to be set as an environment variable in the Cloudflare Pages dashboard. If it is not set, all form submissions will silently fail with a 500 error.
- **Acceptance Criteria:**
  - Log into Cloudflare Pages → Carriersfy AI Website → Settings → Environment variables
  - Confirm `RESEND_API_KEY` is present for Production environment
  - Submit a test lead through the live website and confirm email arrives at juan@carriersfy.ai and hello@carriersfy.ai
- **Dependencies:** RESEND_API_KEY must be obtained from Resend dashboard
- **Notes:** Key was generated during the 2026-06-24 contact form fix session. If lost, generate a new one at resend.com.

---

### P1 — High

#### TASK-002: Discovery Meeting — Brazil Signs
- **Project:** [Brazil Signs](../PROJECTS/Brazil_Signs/README.md)
- **Priority:** P1
- **Status:** [BACKLOG]
- **Assigned:** Juan / Sofia
- **Created:** 2026-06-25
- **Due:** 2026-07-05
- **Description:** Brazil Signs is listed as an active client but no current build status, contacts, or deliverables are documented in OMEGA. Requires a discovery or status check meeting.
- **Acceptance Criteria:**
  - [Brazil Signs Current Build](../CLIENTS/Brazil_Signs/Current_Build.md) updated with actual status
  - Primary contact name and email documented
  - Pending deliverables captured in [Brazil Signs Pending Work](../CLIENTS/Brazil_Signs/Pending_Work.md)
- **Dependencies:** None
- **Notes:** Refer to [Brazil Signs Client Profile](../CLIENTS/Brazil_Signs/Business_Profile.md)

#### TASK-003: Discovery Meeting — Marine Consolidated Electronics
- **Project:** [Marine Consolidated Electronics](../PROJECTS/Marine_Consolidated_Electronics/README.md)
- **Priority:** P1
- **Status:** [BACKLOG]
- **Assigned:** Juan / Sofia
- **Created:** 2026-06-25
- **Due:** 2026-07-05
- **Description:** Same as TASK-002 — Marine Consolidated Electronics client status is undocumented.
- **Acceptance Criteria:**
  - [Marine Current Build](../CLIENTS/Marine/Current_Build.md) updated
  - Primary contact documented
  - Pending work listed
- **Dependencies:** None

#### TASK-004: Discovery Meeting — Light of Life
- **Project:** [Light of Life](../PROJECTS/Light_of_Life/README.md)
- **Priority:** P1
- **Status:** [BACKLOG]
- **Assigned:** Juan / Sofia
- **Created:** 2026-06-25
- **Due:** 2026-07-10
- **Description:** Light of Life client status is entirely unknown.
- **Acceptance Criteria:** Status meeting completed, current build and contacts documented in OMEGA
- **Dependencies:** None

#### TASK-005: Scope Carriersfy Platform MVP
- **Project:** [Carriersfy Platform](../PROJECTS/Carriersfy_Platform/README.md)
- **Priority:** P1
- **Status:** [PLANNED]
- **Assigned:** Juan + Claude Code
- **Created:** 2026-06-25
- **Due:** 2026-07-31
- **Description:** Define and document the MVP feature set for the Carriersfy Platform — the internal tool for managing AI employees, clients, and workflows.
- **Acceptance Criteria:**
  - MVP feature list finalized and documented in [Platform ROADMAP](../PROJECTS/Carriersfy_Platform/ROADMAP.md)
  - ADR-006 resolved (tech stack decision)
  - Project kickoff ready
- **Dependencies:** ADR-006 (tech stack decision)

---

### P2 — Medium

#### TASK-006: Add Website Analytics
- **Project:** [Carriersfy AI Website](../PROJECTS/Carriersfy_AI_Website/README.md)
- **Priority:** P2
- **Status:** [BACKLOG]
- **Assigned:** Claude Code
- **Created:** 2026-06-25
- **Due:** 2026-07-15
- **Description:** Add privacy-respecting analytics to understand traffic sources and behavior. No cookie consent required.
- **Acceptance Criteria:** Analytics dashboard is live and showing data. Implementation method documented in DECISIONS.md.
- **Dependencies:** ADR-007 (analytics provider decision)

#### TASK-007: Define Iron Prime Scope and Deploy
- **Project:** [Internal Infrastructure](../PROJECTS/Internal_Infrastructure/README.md)
- **Priority:** P2
- **Status:** [BACKLOG]
- **Assigned:** Juan
- **Created:** 2026-06-25
- **Due:** Q3 2026
- **Description:** Iron Prime (sales AI) is referenced but not deployed. Define scope, build, and deploy.
- **Acceptance Criteria:** [Iron Prime](../AI/Iron_Prime/Purpose.md) operational with defined role, integrations, and memory scope
- **Dependencies:** ADR-009 (AI employee hosting)

#### TASK-008: Define Sofia Scope and Deploy
- **Project:** [Internal Infrastructure](../PROJECTS/Internal_Infrastructure/README.md)
- **Priority:** P2
- **Status:** [BACKLOG]
- **Assigned:** Juan
- **Created:** 2026-06-25
- **Due:** Q3 2026
- **Description:** Sofia (operations AI) is referenced but not deployed.
- **Acceptance Criteria:** [Sofia](../AI/Sofia/Purpose.md) operational with defined role and integrations
- **Dependencies:** ADR-009

---

### P3 — Low / Backlog

#### TASK-009: Website V1.2 — Blog / Content Engine
- **Project:** [Carriersfy AI Website](../PROJECTS/Carriersfy_AI_Website/README.md)
- **Priority:** P3
- **Status:** [BACKLOG]
- **Assigned:** TBD
- **Created:** 2026-06-25
- **Due:** Q4 2026
- **Description:** Adding a blog requires migrating to Astro or similar framework. Evaluate and plan.
- **Dependencies:** ADR-010 (blog architecture decision — see [DECISION_ENGINE](DECISION_ENGINE.md))

#### TASK-010: Add hreflang Tags for PT/ES SEO
- **Project:** [Carriersfy AI Website](../PROJECTS/Carriersfy_AI_Website/README.md)
- **Priority:** P3
- **Status:** [BACKLOG]
- **Assigned:** Claude Code
- **Created:** 2026-06-25
- **Due:** Q4 2026
- **Description:** Current multilingual implementation has no hreflang meta tags, limiting PT/ES SEO.
- **Dependencies:** None

#### TASK-011: Add Cloudflare Turnstile to Contact Form
- **Project:** [Carriersfy AI Website](../PROJECTS/Carriersfy_AI_Website/README.md)
- **Priority:** P2
- **Status:** [BACKLOG]
- **Assigned:** Claude Code
- **Created:** 2026-06-25
- **Due:** Q3 2026
- **Description:** Add Cloudflare Turnstile CAPTCHA to the contact form to prevent spam lead submissions. Turnstile is Cloudflare's privacy-friendly alternative to reCAPTCHA — no cookie consent required.
- **Acceptance Criteria:** Form protected with Turnstile. Spam submissions rejected server-side. Real lead conversions unaffected. Turnstile site key stored as Cloudflare Pages environment variable (never hardcoded).
- **Dependencies:** None

#### TASK-012: Replace Placeholder Case Studies with Real Client Stories
- **Project:** [Carriersfy AI Website](../PROJECTS/Carriersfy_AI_Website/README.md)
- **Priority:** P3
- **Status:** [BLOCKED]
- **Assigned:** Juan + Claude Design
- **Created:** 2026-06-25
- **Due:** Q4 2026
- **Description:** Current case studies section in index.html contains placeholder content. Replace with real deliverables and measurable results from Brazil Signs, Marine Consolidated Electronics, and Light of Life.
- **Acceptance Criteria:** At least two real client case studies live on the website. Each includes: client name (if permitted), use case, key result metric, and visual asset.
- **Dependencies:** TASK-002, TASK-003, TASK-004 (client discovery meetings must complete first)

#### TASK-013: Verify OMEGA Security Configuration
- **Project:** [Internal Infrastructure](../PROJECTS/Internal_Infrastructure/README.md)
- **Priority:** P1
- **Status:** [IN PROGRESS]
- **Assigned:** Claude Code
- **Created:** 2026-06-25
- **Due:** 2026-07-01
- **Description:** Verify OMEGA directory is fully excluded from public access. Three-layer protection: (1) .gitignore excludes OMEGA/ from Git commits, (2) _headers blocks /OMEGA/* with no-store headers, (3) robots.txt disallows /OMEGA/ from crawlers.
- **Acceptance Criteria:** OMEGA files do not appear in the GitHub repo. OMEGA files are not accessible at carriersfy.ai/OMEGA/*. robots.txt correctly disallows /OMEGA/.
- **Dependencies:** .gitignore, _headers, and robots.txt must be committed and deployed.

---

## Escalation Rules

1. Any `P0` task not resolved within 4 hours triggers an email to juan@carriersfy.ai from any AI employee that detects it
2. Any `BLOCKED` task that has been blocked for >48 hours must be surfaced at the next available Juan review
3. Any task without an `Assigned` field is owned by Juan by default until reassigned
4. `CANCELLED` tasks must have a one-sentence reason logged in the Notes field before closure

---

**Related:** [MASTER_CONTEXT](MASTER_CONTEXT.md) | [PROJECT_REGISTRY](PROJECT_REGISTRY.md) | [ROADMAP_ENGINE](ROADMAP_ENGINE.md) | [OPERATING_RULES](OPERATING_RULES.md)

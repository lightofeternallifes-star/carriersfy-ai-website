# MASTER CONTEXT — Carriersfy AI

> The single source of truth for company state. Read this first in every session. Last updated: 2026-06-25 | OMEGA v1.1.0

---

## 1. COMPANY IN 60 SECONDS

**Carriersfy AI** deploys AI employees (voice + messaging agents) that run sales, operations, and customer experience workflows for small and medium businesses — 24/7, at a fraction of human cost. Business model: setup fee + monthly subscription.

- **Stage:** Early-stage, active client acquisition
- **Team:** 1 founder (Juan) + AI workforce (Claude Code active; Iron Prime + Sofia planned)
- **Live product:** https://carriersfy.ai — marketing website + contact form
- **Core product:** AI employee deployment platform (in development)
- **Market:** SMBs in the U.S. and Brazil

---

## 2. CRITICAL OPEN ITEM (READ THIS NOW)

**[P0 — CF-TSK-001]** Verify `RESEND_API_KEY` is set in Cloudflare Pages **Production** environment variables.

- Path: Cloudflare Dashboard → Pages → [project] → Settings → Environment variables → Production
- Impact: Contact form shows success but no emails are delivered if this key is missing
- Due: 2026-06-26

---

## 3. TEAM

| Entity ID | Person / Agent | Role | Status | Contact |
|---|---|---|---|---|
| — | Juan | Founder, CEO, primary operator | Active | juan@carriersfy.ai |
| CF-AGT-001 | Iron Prime | Sales AI — lead gen, qualification, outbound | [PLANNED] | Via deployment platform (CF-ADR-009) |
| CF-AGT-002 | Sofia | Operations AI — onboarding, scheduling, client comms | [PLANNED] | Via deployment platform (CF-ADR-009) |
| CF-AGT-003 | Claude Code | Engineering AI — build, deploy, maintain, OMEGA | [ACTIVE] | Anthropic CLI (claude-sonnet-4-6) |
| CF-AGT-004 | Claude Design | Design AI — UI/UX, brand assets, visual direction | [ACTIVE — on-demand] | Anthropic (multimodal) |

---

## 4. ACTIVE CLIENTS

| Entity ID | Client | Industry | Status | Geography | Health | Next Action |
|---|---|---|---|---|---|---|
| CF-CLI-001 | Brazil Signs | Signage / Print | Active — Needs Assessment | Brazil | [UNKNOWN] | Schedule discovery by 2026-07-05 (CF-TSK-002) |
| CF-CLI-002 | Marine Consolidated Electronics | Marine / Electronics | Active — Needs Assessment | U.S. (likely) | [UNKNOWN] | Schedule discovery by 2026-07-05 (CF-TSK-003) |
| CF-CLI-003 | Light of Life | Faith / Community | Active — Needs Assessment | Unknown | [UNKNOWN] | Schedule discovery by 2026-07-10 (CF-TSK-004) |

**Full detail:** [INDEXES/CLIENTS.md](../INDEXES/CLIENTS.md) | [CORE/CLIENT_REGISTRY.md](CLIENT_REGISTRY.md)

---

## 5. ACTIVE PROJECTS

| Entity ID | Project | Status | Type | Stack | URL |
|---|---|---|---|---|---|
| CF-PRJ-001 | Carriersfy AI Website | [LIVE] V1.1 | INTERNAL | HTML/JS/CF Pages | https://carriersfy.ai |
| CF-PRJ-002 | Carriersfy Platform | [PLANNED] | PLATFORM | TBD (CF-ADR-006) | — |
| CF-PRJ-003 | Brazil Signs | [NEEDS ASSESSMENT] | CLIENT | Unknown | — |
| CF-PRJ-004 | Marine Consolidated Electronics | [NEEDS ASSESSMENT] | CLIENT | Unknown | — |
| CF-PRJ-005 | Light of Life | [NEEDS ASSESSMENT] | CLIENT | Unknown | — |
| CF-PRJ-006 | Internal Infrastructure | [IN PROGRESS] | INTERNAL | CF + GitHub + Resend | — |
| CF-PRJ-007 | Future Clients Pipeline | [ACTIVE] | PIPELINE | — | — |
| CF-PRJ-008 | CODEX Component Library | [IN PROGRESS] | CODEX | React/TS/Tailwind/Vite | codex/ (local) |

**Full detail:** [INDEXES/PROJECTS.md](../INDEXES/PROJECTS.md) | [CORE/PROJECT_REGISTRY.md](PROJECT_REGISTRY.md)

---

## 6. TECHNOLOGY STACK

| Entity ID | Layer | Technology | Account / Access |
|---|---|---|---|
| CF-INT-001 | Hosting / CDN / Serverless | Cloudflare Pages | Juan's Cloudflare account |
| CF-INT-002 | Source Control | GitHub | lightofeternallifes-star |
| CF-INT-003 | Email Delivery | Resend | RESEND_API_KEY → CF Pages env vars |
| CF-INT-004 | AI Engineering | Claude Code (Anthropic CLI) | Anthropic API |
| CF-INT-005 | AI Models | Anthropic (claude-sonnet-4-6) | Anthropic API |
| CF-INT-009 | Business Email / Calendar | Google Workspace | juan@carriersfy.ai |
| — | Website Runtime | DC/Draftcode (React UMD) | support.js (do not edit) |
| — | i18n | Custom translations.js | EN / PT / ES |
| — | Web Fonts | Google Fonts | Space Grotesk + Manrope |

**Full detail:** [INDEXES/INTEGRATIONS.md](../INDEXES/INTEGRATIONS.md)

---

## 7. CURRENT PRIORITIES

| Priority | Task ID | Item | Due | Owner |
|---|---|---|---|---|
| P0 — Critical | CF-TSK-001 | Verify RESEND_API_KEY in Cloudflare Pages production | 2026-06-26 | Juan |
| P1 — High | CF-TSK-002 | Discovery meeting — Brazil Signs | 2026-07-05 | Juan |
| P1 — High | CF-TSK-003 | Discovery meeting — Marine Consolidated | 2026-07-05 | Juan |
| P1 — High | CF-TSK-004 | Discovery meeting — Light of Life | 2026-07-10 | Juan |
| P1 — High | CF-TSK-005 | Scope Carriersfy Platform MVP | Q3 2026 | Juan |
| P1 — High | CF-TSK-013 | Verify OMEGA inaccessible at carriersfy.ai/OMEGA/ | After first commit | Juan + Claude Code |

**Full task list:** [INDEXES/TASKS.md](../INDEXES/TASKS.md) | [CORE/TASK_ENGINE.md](TASK_ENGINE.md)

---

## 8. OPEN DECISIONS

| Entity ID | Decision | Status | Blocks |
|---|---|---|---|
| CF-ADR-006 | Carriersfy Platform tech stack | [PENDING] | CF-PRJ-002 |
| CF-ADR-007 | Analytics provider | [PENDING] | CF-PRJ-001 V1.2 |
| CF-ADR-008 | CRM platform selection | [PENDING] | CF-PRJ-007 |
| CF-ADR-009 | AI Employee hosting platform | [PENDING] | CF-AGT-001, CF-AGT-002 |
| CF-ADR-010 | Blog / content engine | [PENDING] | CF-PRJ-001 V1.2 |

**Full ADR log:** [INDEXES/DECISIONS.md](../INDEXES/DECISIONS.md) | [CORE/DECISION_ENGINE.md](DECISION_ENGINE.md)

---

## 9. EMAIL INFRASTRUCTURE

```
Domain:       carriersfy.ai
Verified in:  Resend (resend.com)
From:         leads@carriersfy.ai (transactional — lead notifications)
Delivers to:  juan@carriersfy.ai + hello@carriersfy.ai (Google Workspace)
Service:      Resend (CF-INT-003)
Env var:      RESEND_API_KEY → Cloudflare Pages → Settings → Environment variables → Production
Function:     functions/api/contact.js
Status:       [ACTIVE — key pending verification CF-TSK-001]
```

---

## 10. BRAND CONSTANTS

```
Background:   #070B16
Blue accent:  #1FA2FF
Red accent:   #FF2E3C
Text:         #F4F6FB
Fonts:        Space Grotesk (headings) + Manrope (body)
Logo files:   assets/carriersfy-emblem-core.png, assets/carriersfy-emblem.png
Tone:         Professional, direct, AI-confident, no hype
```

---

## 11. RECENT HISTORY

| Date | Event |
|---|---|
| 2026-06-25 | OMEGA v1.1.0 Excellence Pass — INDEXES, SCHEMAS, INTEGRATIONS, PLAYBOOKS layers added; entity ID system established |
| 2026-06-25 | OMEGA v1.0.1 — Full enterprise audit + remediation complete (83/100 → 95/100) |
| 2026-06-24 | Contact form fixed — real Resend email integration (was a fake UI before) |
| 2026-06-24 | OMEGA v1.0.0 — initial build; carriersfy.ai V1.1 live |

---

## 12. NAVIGATION MAP

| What you need | Where to go |
|---|---|
| Find any project fast | [INDEXES/PROJECTS.md](../INDEXES/PROJECTS.md) |
| Find any client fast | [INDEXES/CLIENTS.md](../INDEXES/CLIENTS.md) |
| Find any agent fast | [INDEXES/AGENTS.md](../INDEXES/AGENTS.md) |
| Find any task fast | [INDEXES/TASKS.md](../INDEXES/TASKS.md) |
| Find any decision fast | [INDEXES/DECISIONS.md](../INDEXES/DECISIONS.md) |
| Find any integration fast | [INDEXES/INTEGRATIONS.md](../INDEXES/INTEGRATIONS.md) |
| Rules every agent must follow | [CORE/OPERATING_RULES.md](OPERATING_RULES.md) |
| How to read/write OMEGA | [CORE/MEMORY_PROTOCOL.md](MEMORY_PROTOCOL.md) |
| Entity schemas / contracts | [SCHEMAS/](../SCHEMAS/) |
| Step-by-step runbooks | [PLAYBOOKS/](../PLAYBOOKS/) |
| External service details | [INTEGRATIONS/](../INTEGRATIONS/) |
| All entity relationships | [CORE/KNOWLEDGE_GRAPH.md](KNOWLEDGE_GRAPH.md) |
| Company constitution | [CORE/COMPANY_CONSTITUTION.md](COMPANY_CONSTITUTION.md) |

---

**Owner:** Juan | **OMEGA Version:** 1.1.0 | **Classification:** INTERNAL — CONFIDENTIAL

# Decisions — Carriersfy Platform

> Last updated: 2026-06-25

---

## Pending Decisions

### ADR-006: Tech Stack
- **Status:** PENDING — decision required by 2026-07-31
- **See:** [DECISION_ENGINE ADR-006](../../CORE/DECISION_ENGINE.md)

### ADR-009: AI Employee Hosting
- **Status:** PENDING
- **Context:** Where Iron Prime and Sofia will actually run — this directly impacts Platform architecture since the Platform needs to communicate with these agents
- **Options:**
  - Cloudflare Workers AI
  - Vercel AI SDK + external model
  - Custom microservice on Fly.io / Railway
  - n8n or Make.com for workflow automation
- **See:** [DECISION_ENGINE ADR-009](../../CORE/DECISION_ENGINE.md)

---

## Pre-decided Constraints

| Constraint | Rationale |
|---|---|
| Must deploy on Cloudflare Pages or equivalent edge platform | Consistency with existing infrastructure; no cold starts |
| Must integrate with Resend for email | Existing verified domain setup |
| Must use HTTPS / secure auth | Client data protection |
| Juan must approve all database schema changes | Data integrity responsibility |
| No third-party analytics on client portal | Client data privacy |

---

**Related:** [README](README.md) | [DECISION_ENGINE](../../CORE/DECISION_ENGINE.md)

# INDEXES/DECISIONS — Carriersfy AI

> Fast O(1) lookup for all Architecture Decision Records. Every decision has a canonical entity ID. Last updated: 2026-06-25

---

## Decision Index

| Entity ID | Decision Title | Status | Owner | Impact |
|---|---|---|---|---|
| CF-ADR-001 | Use Cloudflare Pages for hosting | [DECIDED] | Juan | CF-PRJ-001, CF-PRJ-006 |
| CF-ADR-002 | Use Resend for transactional email | [DECIDED] | Juan | CF-PRJ-001, CF-PRJ-006 |
| CF-ADR-003 | DC/Draftcode as website builder | [DECIDED] | Juan | CF-PRJ-001 |
| CF-ADR-004 | React + TypeScript + Tailwind for CODEX | [DECIDED] | Juan + Claude Code | CF-PRJ-008 |
| CF-ADR-005 | OMEGA as markdown-first knowledge base | [DECIDED] | Juan | All |
| CF-ADR-006 | Carriersfy Platform tech stack | [PENDING] | Juan | CF-PRJ-002 |
| CF-ADR-007 | Analytics provider selection | [PENDING] | Juan | CF-PRJ-001 |
| CF-ADR-008 | CRM platform selection | [PENDING] | Juan | CF-PRJ-007 |
| CF-ADR-009 | AI Employee hosting platform | [PENDING] | Juan | CF-AGT-001, CF-AGT-002 |
| CF-ADR-010 | Blog / content engine strategy | [PENDING] | Juan | CF-PRJ-001 |

---

## Quick Lookup

### By Status
- **[DECIDED]:** CF-ADR-001, CF-ADR-002, CF-ADR-003, CF-ADR-004, CF-ADR-005
- **[PENDING]:** CF-ADR-006, CF-ADR-007, CF-ADR-008, CF-ADR-009, CF-ADR-010

### Pending Decisions Blocking Work
- **CF-ADR-006** → blocks CF-PRJ-002 (can't build platform without stack decision)
- **CF-ADR-009** → blocks CF-AGT-001, CF-AGT-002 deployment

### By Impact Area
- **Website (CF-PRJ-001):** CF-ADR-001, CF-ADR-002, CF-ADR-003, CF-ADR-007, CF-ADR-010
- **Platform (CF-PRJ-002):** CF-ADR-006
- **AI Employees:** CF-ADR-009
- **CODEX (CF-PRJ-008):** CF-ADR-004

---

**Full record:** [CORE/DECISION_ENGINE.md](../CORE/DECISION_ENGINE.md)

# INDEXES/TASKS — Carriersfy AI

> Fast O(1) lookup for all tasks. Every task has a canonical entity ID. Last updated: 2026-06-25

---

## Task Index

| Entity ID | Task | Priority | Status | Owner | Due |
|---|---|---|---|---|---|
| CF-TSK-001 | Verify RESEND_API_KEY in Cloudflare Pages production | P0 | IN PROGRESS | Juan | 2026-06-26 |
| CF-TSK-002 | Schedule discovery meeting — Brazil Signs | P1 | OPEN | Juan + Sofia | 2026-07-05 |
| CF-TSK-003 | Schedule discovery meeting — Marine Consolidated | P1 | OPEN | Juan + Sofia | 2026-07-05 |
| CF-TSK-004 | Schedule discovery meeting — Light of Life | P1 | OPEN | Juan + Sofia | 2026-07-10 |
| CF-TSK-005 | Scope Carriersfy Platform MVP | P1 | OPEN | Juan | Q3 2026 |
| CF-TSK-006 | Add analytics to carriersfy.ai | P2 | OPEN | Juan + Claude Code | 2026-07-01 |
| CF-TSK-007 | Define and deploy Iron Prime | P2 | OPEN | Juan | Q3 2026 |
| CF-TSK-008 | Define and deploy Sofia | P2 | OPEN | Juan | Q3 2026 |
| CF-TSK-009 | Implement hreflang tags (EN/PT/ES) | P2 | OPEN | Claude Code | 2026-07-15 |
| CF-TSK-010 | Resolve CF-ADR-006 (Platform stack) | P1 | OPEN | Juan | Q3 2026 |
| CF-TSK-011 | Audit Brazil Signs existing build | P1 | OPEN | Juan | 2026-07-15 |
| CF-TSK-012 | Audit Marine Consolidated existing build | P1 | OPEN | Juan | 2026-07-15 |
| CF-TSK-013 | Verify OMEGA inaccessible at carriersfy.ai/OMEGA/ | P1 | OPEN | Juan + Claude Code | After first commit |

---

## Quick Lookup

### By Priority
- **P0 (Critical):** CF-TSK-001
- **P1 (High):** CF-TSK-002, CF-TSK-003, CF-TSK-004, CF-TSK-005, CF-TSK-010, CF-TSK-011, CF-TSK-012, CF-TSK-013
- **P2 (Medium):** CF-TSK-006, CF-TSK-007, CF-TSK-008, CF-TSK-009

### By Status
- **IN PROGRESS:** CF-TSK-001
- **OPEN:** All others

### By Owner
- **Juan (must act):** CF-TSK-001, CF-TSK-002, CF-TSK-003, CF-TSK-004, CF-TSK-005, CF-TSK-007, CF-TSK-008, CF-TSK-010
- **Claude Code:** CF-TSK-006, CF-TSK-009, CF-TSK-013
- **Post-deployment (Sofia/Iron Prime):** CF-TSK-002, CF-TSK-003, CF-TSK-004

### Immediate Actions (this week)
1. CF-TSK-001 — RESEND_API_KEY (blocks email delivery)
2. CF-TSK-002/003/004 — Discovery meetings (unblock client assessment)
3. CF-TSK-013 — Verify OMEGA security after first commit

---

**Full engine:** [CORE/TASK_ENGINE.md](../CORE/TASK_ENGINE.md)

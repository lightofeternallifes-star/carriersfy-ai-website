# SCHEMA/TASK — Carriersfy AI

> Entity contract for all Task entities. Every task must conform to this schema. Last updated: 2026-06-25

---

## Schema Definition

```
Entity Type:  TASK
ID Format:    CF-TSK-{NNN}  (sequential, 3-digit zero-padded)
Owner:        OMEGA/CORE/TASK_ENGINE.md
Index:        OMEGA/INDEXES/TASKS.md
```

---

## Required Fields

Every task in `CORE/TASK_ENGINE.md` must contain:

| Field | Type | Description |
|---|---|---|
| `entity_id` | String | CF-TSK-{NNN} — canonical ID |
| `title` | String | Short action-oriented title |
| `priority` | Enum | P0 / P1 / P2 / P3 |
| `status` | Enum | See Status Values below |
| `owner` | String | Person or agent responsible |
| `due_date` | Date or String | YYYY-MM-DD or "Q3 2026" or "After X" |
| `description` | String | What needs to be done and why |

---

## Optional Fields

| Field | Type | Description |
|---|---|---|
| `blocked_by` | List | CF-TSK-{NNN} or CF-ADR-{NNN} IDs blocking this |
| `blocks` | List | CF-TSK-{NNN} IDs this task unblocks |
| `related_project` | String | CF-PRJ-{NNN} |
| `related_client` | String | CF-CLI-{NNN} |
| `assigned_agent` | String | CF-AGT-{NNN} |
| `completion_note` | String | What was done when completing (on DONE) |

---

## Priority Values

| Priority | SLA | Meaning |
|---|---|---|
| P0 — Critical | Same day | System broken or revenue at risk |
| P1 — High | This week | Significant business impact if delayed |
| P2 — Medium | This sprint | Important but not urgent |
| P3 — Low | Backlog | Nice-to-have, no deadline pressure |

---

## Status Values

| Status | Meaning |
|---|---|
| `OPEN` | Not started |
| `IN PROGRESS` | Actively being worked |
| `BLOCKED` | Cannot proceed — document blocker |
| `REVIEW` | Done, awaiting review or approval |
| `DONE` | Complete — add completion note + date |
| `CANCELLED` | Will not be done — document reason |

---

## Task Lifecycle Rules

1. Tasks are created in CORE/TASK_ENGINE.md with the next sequential ID
2. The same task must be indexed in INDEXES/TASKS.md
3. Project-specific task lists (PROJECTS/{name}/TASKS.md) reference canonical CF-TSK-{NNN} IDs — they do NOT have their own numbering
4. When a task is DONE, it stays in TASK_ENGINE.md with status DONE and a completion note — it is NOT deleted
5. DONE tasks older than 30 days may be moved to the project's TASKS.md archive section
6. P0 tasks must be reported in MASTER_CONTEXT.md under "Current Priorities"

---

## Validation Checklist

Before adding a new task:
- [ ] Entity ID assigned (next sequential CF-TSK-{NNN})
- [ ] Entry added to CORE/TASK_ENGINE.md
- [ ] Entry added to INDEXES/TASKS.md
- [ ] Priority set explicitly (not left blank)
- [ ] Owner identified (a specific person or agent, not "TBD")
- [ ] Due date or sprint target set
- [ ] If blocking a project: related_project field populated

---

**Related schemas:** [PROJECT.md](PROJECT.md) | [CLIENT.md](CLIENT.md) | [AGENT.md](AGENT.md)

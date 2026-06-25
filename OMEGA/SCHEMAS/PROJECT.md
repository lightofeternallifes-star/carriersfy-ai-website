# SCHEMA/PROJECT — Carriersfy AI

> Entity contract for all Project entities. Every project document must conform to this schema. Last updated: 2026-06-25

---

## Schema Definition

```
Entity Type:  PROJECT
ID Format:    CF-PRJ-{NNN}  (sequential, 3-digit zero-padded)
Owner:        OMEGA/CORE/PROJECT_REGISTRY.md
Index:        OMEGA/INDEXES/PROJECTS.md
```

---

## Required Fields

Every project file (`PROJECTS/{name}/README.md`) must contain:

| Field | Type | Description |
|---|---|---|
| `entity_id` | String | CF-PRJ-{NNN} — must match PROJECT_REGISTRY |
| `name` | String | Project display name |
| `status` | Enum | See Status Values below |
| `type` | Enum | CLIENT \| INTERNAL \| PLATFORM \| CODEX \| PIPELINE |
| `owner` | String | Person responsible (e.g., "Juan") |
| `client` | String or "Internal" | Associated client entity (CF-CLI-{NNN} or "Internal") |
| `created_date` | Date | YYYY-MM-DD |
| `last_updated` | Date | YYYY-MM-DD |

---

## Optional Fields

| Field | Type | Description |
|---|---|---|
| `url` | URL | Production or staging URL |
| `repository` | String | GitHub repo or path |
| `stack` | String | Technology stack |
| `deployment` | String | Where deployed |
| `agents_assigned` | List | CF-AGT-{NNN} IDs |
| `tasks_open` | List | CF-TSK-{NNN} IDs |
| `decisions_open` | List | CF-ADR-{NNN} IDs |
| `integrations_used` | List | CF-INT-{NNN} IDs |

---

## Status Values

| Status | Meaning |
|---|---|
| `[PLANNED]` | Scoped but not started |
| `[IN PROGRESS]` | Actively being built |
| `[LIVE]` | Deployed to production |
| `[ACTIVE — PIPELINE]` | Ongoing business process (not a deliverable) |
| `[UNKNOWN — NEEDS ASSESSMENT]` | Exists but state is undocumented |
| `[ON HOLD]` | Paused — reason must be documented |
| `[ARCHIVED]` | Completed or cancelled — moved to ARCHIVE/ |

---

## Type Values

| Type | Meaning |
|---|---|
| `CLIENT` | Built for a paying client |
| `INTERNAL` | Internal Carriersfy AI tooling or infrastructure |
| `PLATFORM` | The Carriersfy Platform product itself |
| `CODEX` | Component library / design system work |
| `PIPELINE` | Business process tracking (not a software project) |

---

## Validation Checklist

Before registering a new project:
- [ ] Entity ID assigned (next sequential CF-PRJ-{NNN})
- [ ] Entry added to CORE/PROJECT_REGISTRY.md
- [ ] Entry added to INDEXES/PROJECTS.md
- [ ] PROJECTS/{name}/ folder created
- [ ] PROJECTS/{name}/README.md created with all required fields
- [ ] PROJECTS/{name}/TASKS.md created
- [ ] If CLIENT type: client entity (CF-CLI-{NNN}) exists in CLIENT_REGISTRY
- [ ] If CLIENT type: client folder exists in CLIENTS/{name}/
- [ ] KNOWLEDGE_GRAPH.md updated with new project node

---

## Example Header Block

```markdown
# PROJECT: Carriersfy AI Website
- **Entity ID:** CF-PRJ-001
- **Type:** INTERNAL
- **Status:** [LIVE] V1.1
- **Owner:** Juan
- **Client:** Internal
- **Created:** 2026-06-01
- **Last Updated:** 2026-06-25
- **URL:** https://carriersfy.ai
- **Integrations:** CF-INT-001, CF-INT-002, CF-INT-003
```

---

**Related schemas:** [CLIENT.md](CLIENT.md) | [AGENT.md](AGENT.md) | [TASK.md](TASK.md)

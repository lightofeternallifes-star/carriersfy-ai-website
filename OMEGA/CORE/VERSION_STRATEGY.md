# VERSION STRATEGY — Carriersfy AI OMEGA

> Defines the scaling roadmap for the OMEGA Enterprise Memory OS. Last updated: 2026-06-25

---

## Current Version

**OMEGA v1.1.0** — Markdown-first, file-based, git-backed enterprise memory OS.

---

## Architecture Tiers

### v1.x — Markdown-First (CURRENT)

**Architecture:** Pure markdown files, directory structure, no external dependencies.

**Capacity:**
- Clients: < 50
- Projects: < 50
- Tasks (open at once): < 200
- Team size: < 5 people
- Any single registry: < 100 rows

**Strengths:**
- Zero external service dependencies
- Git-backed version history
- Fast to read, edit, and search
- Works offline
- AI-readable without any API calls
- No cost (markdown is free)

**Weaknesses:**
- No relational queries (no "show all clients with health = AT RISK")
- Manual cross-reference maintenance
- Doesn't scale beyond ~50 entities per type
- No real-time collaboration for multiple users

**Migration trigger:** Any single registry exceeds 100 rows OR clients > 50 OR team > 5

---

### v2.0 — Notion/Airtable Hybrid

**Architecture:** Markdown-first CORE + Notion/Airtable databases for high-volume relational data.

**What moves to Notion:**
- `CLIENTS/` → Notion Client CRM database
- `PROJECTS/` → Notion Project Tracker database
- `CORE/TASK_ENGINE.md` → Notion Task Manager
- `CORE/DECISION_ENGINE.md` → Notion Decision Log (supplement)
- Meeting notes → Notion Meeting Notes database

**What stays in markdown:**
- `CORE/` documents (MASTER_CONTEXT, OPERATING_RULES, COMPLIANCE, etc.)
- `SCHEMAS/` layer (entity contracts)
- `PLAYBOOKS/` layer (runbooks)
- `INTEGRATIONS/` layer (service documentation)
- `AI/` agent profiles

**Access method:** Notion MCP server (CF-INT-011) for Claude Code integration

**Capacity:** 50–500 clients/projects, team up to 20 people

**Migration trigger:** Carriersfy Platform launches OR clients > 200 OR full team deployment

**Migration playbook:** [PLAYBOOKS/VERSION_MIGRATION.md](../PLAYBOOKS/VERSION_MIGRATION.md)

---

### v3.0 — Database-First (FUTURE)

**Architecture:** Purpose-built database (PostgreSQL) backed by Carriersfy Platform API. OMEGA becomes a structured API layer, not a file system.

**What changes:**
- All registries → Platform database
- Entity IDs (CF-*) become database primary keys
- OMEGA SDK or REST API replaces file reading
- Claude Code uses API tools instead of file reads
- Markdown CORE docs remain for narrative context

**Trigger:** Carriersfy Platform (CF-PRJ-002) launches to production

**This is a full engineering project.** When triggered: create a dedicated CF-PRJ-{NNN} for the v3 migration.

---

## Version Numbering

```
OMEGA v{major}.{minor}.{patch}

Major  — Architecture tier change (v1 → v2, v2 → v3)
Minor  — Significant structural additions (new layers, major rewrites)
Patch  — Incremental updates (new files, schema additions, small fixes)

Examples:
  v1.0.0 — Initial architecture
  v1.1.0 — Post-audit remediation + Excellence Pass (current)
  v1.1.1 — Next patch (minor content updates)
  v2.0.0 — Notion hybrid migration
```

---

## Changelog

| Version | Date | Description |
|---|---|---|
| v1.0.0 | 2026-06-25 | Initial OMEGA architecture — CORE layer built |
| v1.0.1 | 2026-06-25 | Post-audit remediation — 15-dimension audit, all issues resolved |
| v1.1.0 | 2026-06-25 | Excellence Pass — INDEXES, SCHEMAS, INTEGRATIONS, PLAYBOOKS layers added; MASTER_CONTEXT, README, KNOWLEDGE_GRAPH rewritten; entity ID system established |

---

## Decision Points

| Trigger | Action | Playbook |
|---|---|---|
| Registry > 100 rows | Begin v2 evaluation | [VERSION_MIGRATION.md](../PLAYBOOKS/VERSION_MIGRATION.md) |
| Clients > 50 | Begin v2 evaluation | [VERSION_MIGRATION.md](../PLAYBOOKS/VERSION_MIGRATION.md) |
| Team > 5 | Begin v2 planning | [VERSION_MIGRATION.md](../PLAYBOOKS/VERSION_MIGRATION.md) |
| Platform launch | Begin v3 planning | Create new CF-PRJ-{NNN} |
| Clients > 200 | Begin v3 planning | Create new CF-PRJ-{NNN} |

---

**Related:** [README.md](../README.md) | [PLAYBOOKS/VERSION_MIGRATION.md](../PLAYBOOKS/VERSION_MIGRATION.md) | [PLAYBOOKS/QUARTERLY_REVIEW.md](../PLAYBOOKS/QUARTERLY_REVIEW.md)

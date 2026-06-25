# INTEGRATION: Notion

- **Entity ID:** CF-INT-007
- **Category:** Knowledge Management (Hybrid)
- **Status:** [PLANNED — v2 migration trigger]
- **Critical:** Low currently — becomes critical at v2

---

## What It Does (Planned)

Notion is the target platform for OMEGA v2 migration. When the OMEGA knowledge base exceeds the v1 scaling thresholds (100+ rows in any registry, 50+ clients/projects), a Notion-based hybrid system will supplement the markdown-first architecture.

---

## Migration Trigger (from VERSION_STRATEGY.md)

Migrate OMEGA from v1 (pure markdown) to v2 (Notion hybrid) when ANY of:
- Any single registry exceeds 100 rows
- Client count exceeds 50
- Project count exceeds 50
- Team grows beyond 5 people

---

## Planned Notion Workspace Structure

```
Carriersfy AI (Notion Workspace)
├── Client CRM Database          ← replaces CLIENTS/ markdown files
├── Project Tracker              ← replaces PROJECT_REGISTRY.md
├── Task Manager                 ← supplements TASK_ENGINE.md
├── Decision Log                 ← supplements DECISION_ENGINE.md
├── Meeting Notes                ← replaces CLIENTS/{}/Meetings.md
└── Internal Docs                ← supplements CORE/ documents
```

---

## v1 vs v2 Coexistence

In v2, OMEGA core documents (MASTER_CONTEXT, OPERATING_RULES, SCHEMAS, etc.) remain in markdown. Notion handles the high-volume, relational data that markdown cannot scale for.

---

## Auth (When Active)

- Notion API key stored in Cloudflare Pages env vars (never in git)
- Access via Notion MCP server in Claude Code (CF-INT-011)

---

## Related

- **Replaces (partially):** OMEGA v1 flat markdown at scale trigger
- **Depends on:** CF-INT-011 (MCP Servers for Notion API access)
- **Decision:** Version migration strategy in [CORE/VERSION_STRATEGY.md](../CORE/VERSION_STRATEGY.md)

# PLAYBOOK: OMEGA Version Migration

> Protocol for migrating OMEGA from one version tier to the next. Last updated: 2026-06-25

---

## Version Tiers

| Version | Architecture | Trigger |
|---|---|---|
| v1.x (current) | Markdown-first, flat files, git-backed | Default |
| v2.0 | Notion/Airtable hybrid + markdown core | Any registry > 100 rows OR clients > 50 OR team > 5 |
| v3.0 | Database-first, API-driven | Platform launch OR clients > 200 OR full team deployment |

Full details: [CORE/VERSION_STRATEGY.md](../CORE/VERSION_STRATEGY.md)

---

## Migration: v1 → v2

### Trigger Conditions (ANY of these)
- [ ] Any single registry exceeds 100 rows
- [ ] Client count exceeds 50
- [ ] Project count exceeds 50
- [ ] Team grows beyond 5 people

### Phase 1: Preparation

#### Step 1 — Evaluate Platforms
- [ ] Review current Notion capabilities (CF-INT-007)
- [ ] Determine if Airtable is preferable for relational data
- [ ] Create ADR (CF-ADR-{NNN}) for v2 platform selection
- [ ] Get Juan approval before proceeding

#### Step 2 — Design New Structure
- [ ] Map current OMEGA markdown files → Notion databases
- [ ] Identify which files stay as markdown (CORE docs, SCHEMAS, PLAYBOOKS)
- [ ] Identify which files migrate to Notion (CLIENTS, PROJECTS, TASKS — high-volume relational data)
- [ ] Design Notion database schemas matching SCHEMAS/*.md entity contracts

#### Step 3 — Backup v1
- [ ] Create `OMEGA/ARCHIVE/v1_backup_{date}/` snapshot
- [ ] Copy all current OMEGA markdown files to archive
- [ ] Tag in git: `omega-v1-final` (with Juan approval before tagging)

### Phase 2: Migration Execution

#### Step 4 — Create Notion Workspace
- [ ] Create dedicated Carriersfy AI Notion workspace
- [ ] Create databases: Client CRM, Project Tracker, Task Manager, Decision Log, Meeting Notes
- [ ] Apply schema from SCHEMAS/*.md to each database

#### Step 5 — Import Data
- [ ] Import all clients from CLIENT_REGISTRY → Notion Client CRM
- [ ] Import all projects from PROJECT_REGISTRY → Notion Project Tracker
- [ ] Import all tasks from TASK_ENGINE → Notion Task Manager
- [ ] Import all ADRs from DECISION_ENGINE → Notion Decision Log

#### Step 6 — Update Claude Code Access
- [ ] Configure Notion MCP server (CF-INT-011) with new workspace
- [ ] Update `CLAUDE.md` — point to Notion as source of truth for registries
- [ ] Update `CORE/MASTER_CONTEXT.md` to reference Notion for dynamic data
- [ ] Update INDEXES/* to point to Notion databases (or remove — redundant in v2)

### Phase 3: Validation

#### Step 7 — Verification
- [ ] All clients accessible via Notion AND in INDEXES
- [ ] All projects accessible via Notion AND in INDEXES
- [ ] All entity IDs (CF-*) preserved in Notion — not regenerated
- [ ] Claude Code can read Notion databases via MCP during session
- [ ] No data loss: row counts match before/after

#### Step 8 — Go-Live
- [ ] Update OMEGA README.md to reflect v2 architecture
- [ ] Update CORE/VERSION_STRATEGY.md — mark v2 as current
- [ ] Update MASTER_CONTEXT.md — note v2 architecture
- [ ] Bump OMEGA version to v2.0.0

---

## Migration: v2 → v3

### Trigger Conditions (ANY of these)
- [ ] Carriersfy Platform (CF-PRJ-002) launches to production
- [ ] Client count exceeds 200
- [ ] Full AI employee team deployed (all planned agents active)

### Overview

v3 replaces Notion with a purpose-built database (PostgreSQL or similar) backed by the Carriersfy Platform API. This is a full engineering project — not a manual migration. Requires:
- Carriersfy Platform (CF-PRJ-002) as the backend
- API endpoints for all OMEGA entity types
- OMEGA SDK or API client for Claude Code access
- Data migration from Notion → Platform database

Create a dedicated project (CF-PRJ-{NNN}) when v3 migration is triggered.

---

## Migration Risk Checklist

Before any migration:
- [ ] All entity IDs preserved — no renumbering
- [ ] All internal links verified after migration
- [ ] CLAUDE.md updated — correct source of truth
- [ ] MASTER_CONTEXT.md updated — reflects new architecture
- [ ] Rollback plan documented — if migration fails, v1 archive is intact
- [ ] Juan approves go-live

---

**Related:** [CORE/VERSION_STRATEGY.md](../CORE/VERSION_STRATEGY.md) | [INTEGRATIONS/Notion.md](../INTEGRATIONS/Notion.md) | [PLAYBOOKS/QUARTERLY_REVIEW.md](QUARTERLY_REVIEW.md)

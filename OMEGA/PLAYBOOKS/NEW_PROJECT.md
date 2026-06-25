# PLAYBOOK: New Project Setup

> Deterministic process for registering and launching any new project. Execute in order. Last updated: 2026-06-25

---

## Trigger

This playbook is triggered when: a new project is scoped and approved to begin (internal or client).

**Prerequisites:** Project purpose and scope defined | Budget/timeline approved (for client work: SOW signed) | Owner identified

---

## Phase 1: OMEGA Registration (Before Any Code)

### Step 1 — Assign Entity ID
- [ ] Open `OMEGA/CORE/PROJECT_REGISTRY.md`
- [ ] Identify next available CF-PRJ-{NNN}
- [ ] Determine project type: CLIENT | INTERNAL | PLATFORM | CODEX | PIPELINE

### Step 2 — Create Project Folder
- [ ] Create `OMEGA/PROJECTS/{ProjectName}/` directory
- [ ] Create `README.md` with all required fields per [SCHEMAS/PROJECT.md](../SCHEMAS/PROJECT.md):
  - `entity_id`, `name`, `status`, `type`, `owner`, `client`, `created_date`, `last_updated`
  - Stack, deployment, URL (if known)
  - Linked integrations (CF-INT-{NNN} IDs)
- [ ] Create `TASKS.md` referencing canonical CF-TSK-{NNN} IDs (no local task numbering)

### Step 3 — Update OMEGA Registries
- [ ] Add to `CORE/PROJECT_REGISTRY.md`
- [ ] Add to `INDEXES/PROJECTS.md`
- [ ] If CLIENT type: ensure client entity (CF-CLI-{NNN}) exists in CLIENT_REGISTRY
- [ ] Update `CORE/KNOWLEDGE_GRAPH.md` — add project node and relationships to services, client, agents

---

## Phase 2: Technical Scoping

### Step 4 — Technology Decision
- [ ] Define tech stack
- [ ] If stack is a new choice (not previously used): create ADR (CF-ADR-{NNN}) in DECISION_ENGINE.md
- [ ] If stack reuses existing technology: reference existing ADR

### Step 5 — Integration Mapping
- [ ] List all external services this project will use (CF-INT-{NNN} IDs)
- [ ] Identify any new integrations not yet in INDEXES/INTEGRATIONS.md
- [ ] For new integrations: create INTEGRATIONS/{name}.md + add to index

### Step 6 — Create Initial Tasks
- [ ] Break project into discrete tasks
- [ ] Add each task to `CORE/TASK_ENGINE.md` with CF-TSK-{NNN} IDs
- [ ] Add to `INDEXES/TASKS.md`
- [ ] Reference canonical IDs in `PROJECTS/{name}/TASKS.md`

---

## Phase 3: Development Setup

### Step 7 — Repository / Environment
- [ ] If new repo: create on GitHub (CF-INT-002)
- [ ] If new branch: create from `main`
- [ ] Set up local development environment
- [ ] Document environment setup in `PROJECTS/{name}/README.md`

### Step 8 — First Commit / Milestone
- [ ] Make first commit with initial project structure
- [ ] Update project status in PROJECT_REGISTRY from [PLANNED] → [IN PROGRESS]

---

## Phase 4: Ongoing

### Step 9 — Weekly Status Update
- [ ] Update `PROJECTS/{name}/TASKS.md` with progress
- [ ] Update `CORE/TASK_ENGINE.md` for any status changes
- [ ] Update `PROJECTS/{name}/README.md` last_updated date

### Step 10 — Project Completion
- [ ] All deliverables complete per scope
- [ ] Update project status to [LIVE] or [ARCHIVED]
- [ ] Move to ARCHIVE/ if project is closed: `ARCHIVE/{name}/`
- [ ] Update MASTER_CONTEXT.md and KNOWLEDGE_GRAPH.md
- [ ] Retrospective note in `PROJECTS/{name}/NOTES.md`

---

## Completion Criteria

- [ ] CF-PRJ-{NNN} entity ID assigned and in all registries
- [ ] PROJECTS/{name}/ folder with README.md and TASKS.md
- [ ] At least one CF-TSK-{NNN} created and in TASK_ENGINE
- [ ] KNOWLEDGE_GRAPH.md updated with new project node
- [ ] Project appears in MASTER_CONTEXT.md Active Projects table

---

**Related:** [SCHEMAS/PROJECT.md](../SCHEMAS/PROJECT.md) | [PLAYBOOKS/NEW_CLIENT.md](NEW_CLIENT.md) | [CORE/DECISION_ENGINE.md](../CORE/DECISION_ENGINE.md)

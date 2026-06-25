# PLAYBOOK: New Client Onboarding

> Deterministic 12-step process for onboarding a new Carriersfy AI client. Execute in order. Last updated: 2026-06-25

---

## Trigger

This playbook is triggered when: a prospect signs a contract and becomes a paying client.

**Prerequisites:** Contract executed (see [Contract_Template](../CLIENTS/Future_Clients/Contract_Template.md)) | SOW finalized (see [SOW_Template](../CLIENTS/Future_Clients/SOW_Template.md))

---

## Phase 1: OMEGA Setup (Day 0 — same day as signing)

### Step 1 — Assign Entity ID
- [ ] Open `OMEGA/CORE/CLIENT_REGISTRY.md`
- [ ] Identify next available CF-CLI-{NNN} (e.g., CF-CLI-004)
- [ ] Record: `entity_id`, `name`, `industry`, `geography`, `signed_date`, `ltv_tier`

### Step 2 — Create Client Folder
- [ ] Create `OMEGA/CLIENTS/{ClientName}/` directory
- [ ] Create all 9 required files using [SCHEMAS/CLIENT.md](../SCHEMAS/CLIENT.md) as template:
  - `Business_Profile.md` — fill all required fields from contract
  - `Current_Build.md` — what is being built (reference SOW)
  - `AI_Employees.md` — which agents assigned (from SOW scope)
  - `Web.md` — client's existing web presence
  - `CRM.md` — client contact list, decision makers
  - `Integrations.md` — client's existing tech stack
  - `Pending_Work.md` — open deliverables (from SOW)
  - `Meetings.md` — initialize with kickoff meeting entry
  - `Notes.md` — first notes from discovery/signing

### Step 3 — Update OMEGA Registries
- [ ] Add client to `CORE/CLIENT_REGISTRY.md`
- [ ] Add client to `INDEXES/CLIENTS.md`
- [ ] Create project entity (CF-PRJ-{NNN}) in `CORE/PROJECT_REGISTRY.md`
- [ ] Add project to `INDEXES/PROJECTS.md`
- [ ] Create project folder `OMEGA/PROJECTS/{ClientName}/`
- [ ] Update `CORE/KNOWLEDGE_GRAPH.md` — add new client node and relationships

---

## Phase 2: Technical Setup (Week 1)

### Step 4 — Discovery Audit
- [ ] Review client's current website and tech stack
- [ ] Document in `CLIENTS/{name}/Web.md` and `Integrations.md`
- [ ] Identify any third-party integrations needed
- [ ] Update `Current_Build.md` with what we are building

### Step 5 — Create Project Tasks
- [ ] Add project kickoff tasks to `CORE/TASK_ENGINE.md` (assign CF-TSK-{NNN} IDs)
- [ ] Add tasks to `INDEXES/TASKS.md`
- [ ] Set P1 priority for all week-1 delivery items

### Step 6 — AI Employee Assignment
- [ ] Confirm which AI employees are scoped (per SOW)
- [ ] Update `CLIENTS/{name}/AI_Employees.md`
- [ ] If new AI Employee needed: trigger [PLAYBOOKS/AI_EMPLOYEE_DEPLOYMENT.md](AI_EMPLOYEE_DEPLOYMENT.md)

---

## Phase 3: Kickoff (Week 1)

### Step 7 — Schedule Kickoff Meeting
- [ ] Book 60-minute kickoff call (Juan + client primary contact)
- [ ] Agenda: Introductions → SOW review → timeline → access/credentials → next steps
- [ ] Add meeting to `CLIENTS/{name}/Meetings.md`

### Step 8 — Collect Access Credentials
- [ ] Get access to client's relevant systems (CRM, website, social, etc.)
- [ ] Document systems and access level in `Integrations.md`
- [ ] Store credentials securely (NOT in OMEGA — use password manager)

### Step 9 — Send Welcome Package
- [ ] Send onboarding email with:
  - Welcome message and team introductions
  - Project timeline from SOW
  - What to expect in week 1
  - Primary contact (Juan) and communication channels
  - Response SLA commitments

---

## Phase 4: Active Delivery

### Step 10 — First Delivery Milestone
- [ ] Complete first deliverable per SOW timeline
- [ ] Demo to client (record if possible)
- [ ] Update `Pending_Work.md` — mark first item complete

### Step 11 — Establish Cadence
- [ ] Set recurring check-in meeting (weekly or bi-weekly)
- [ ] Add recurring meeting to `Meetings.md` template
- [ ] Confirm preferred communication channel (email, Slack, WhatsApp)

### Step 12 — Update MASTER_CONTEXT
- [ ] Update `CORE/MASTER_CONTEXT.md` Active Clients table
- [ ] Change client health from `[UNKNOWN]` to appropriate status
- [ ] Update OMEGA version stamp (v1.x.x) to reflect new client added

---

## Completion Criteria

- [ ] All 9 OMEGA client files populated with real data
- [ ] Client appears in CLIENT_REGISTRY with health = [HEALTHY]
- [ ] At least one project task is IN PROGRESS
- [ ] Kickoff meeting held and documented
- [ ] MASTER_CONTEXT reflects updated client count

---

**Related:** [SCHEMAS/CLIENT.md](../SCHEMAS/CLIENT.md) | [PLAYBOOKS/NEW_PROJECT.md](NEW_PROJECT.md) | [CONTRACT_TEMPLATE](../CLIENTS/Future_Clients/Contract_Template.md) | [SOW_TEMPLATE](../CLIENTS/Future_Clients/SOW_Template.md)

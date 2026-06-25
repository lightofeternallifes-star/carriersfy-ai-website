# MEMORY PROTOCOL — Carriersfy AI OMEGA

> The constitution of the OMEGA memory system. Every agent that reads or writes OMEGA must follow this protocol. Last updated: 2026-06-25

---

## What OMEGA Is

OMEGA is the enterprise memory operating system for Carriersfy AI. It is a file-based, markdown-first knowledge base designed to give any AI agent — or any human — immediate, complete operational context without prior conversation history.

OMEGA is **not**:
- A chat log or conversation history
- A task runner or code executor
- A CRM or ticketing system (though it indexes both)
- A documentation site for end users

OMEGA **is**:
- A structured, cross-linked knowledge graph
- A living snapshot of company state
- The authoritative source for decisions, projects, clients, and agents
- Readable by any AI agent or human in under 5 minutes (start with MASTER_CONTEXT.md)

---

## Directory Structure

```
/OMEGA/
├── CORE/                    ← Company-wide knowledge (read first)
│   ├── MASTER_CONTEXT.md    ← Start here for any new conversation
│   ├── COMPANY_CONSTITUTION.md
│   ├── KNOWLEDGE_GRAPH.md
│   ├── DECISION_ENGINE.md
│   ├── TASK_ENGINE.md
│   ├── ROADMAP_ENGINE.md
│   ├── CLIENT_REGISTRY.md
│   ├── PROJECT_REGISTRY.md
│   ├── AGENT_REGISTRY.md
│   ├── SYSTEM_ARCHITECTURE.md
│   ├── MEMORY_PROTOCOL.md   ← You are here
│   └── OPERATING_RULES.md
│
├── PROJECTS/                ← One folder per project
│   └── [ProjectName]/
│       ├── README.md
│       ├── CURRENT_STATUS.md
│       ├── ROADMAP.md
│       ├── TASKS.md
│       ├── DECISIONS.md
│       ├── FILES.md
│       ├── DEPENDENCIES.md
│       └── CHANGELOG.md
│
├── CLIENTS/                 ← One folder per active client
│   └── [ClientName]/
│       ├── Business_Profile.md
│       ├── Current_Build.md
│       ├── AI_Employees.md
│       ├── Web.md
│       ├── CRM.md
│       ├── Integrations.md
│       ├── Pending_Work.md
│       ├── Meetings.md
│       └── Notes.md
│
└── AI/                      ← One folder per AI employee
    └── [AgentName]/
        ├── Purpose.md
        ├── Capabilities.md
        ├── Memory_Scope.md
        ├── Permissions.md
        ├── Dependencies.md
        └── Future_Evolution.md
```

---

## Reading Protocol

Any AI agent starting a new conversation must:

1. **Read `CORE/MASTER_CONTEXT.md` first** — this gives the full company state snapshot
2. **Read the relevant project folder** — if the task is project-specific
3. **Read the relevant client folder** — if the task is client-specific
4. **Read the relevant AI profile** — if coordinating with another AI employee
5. **Read `CORE/OPERATING_RULES.md`** — before writing any OMEGA file

Do not start a task without reading MASTER_CONTEXT.md. The cost of reading it is ~30 seconds. The cost of acting without it is potentially overwriting work or duplicating effort.

---

## Writing Protocol

### When to Write
- When facts change (project status, client contact, deployment)
- When a decision is made (add ADR to DECISION_ENGINE.md)
- When a task is created or completed (update TASK_ENGINE.md + project TASKS.md)
- When a new client is signed (create client folder + project folder + registry entries)
- After every significant work session (update CURRENT_STATUS.md for affected projects)

### What NOT to Write
- Conversation summaries or chat transcripts
- Speculation or unverified information (label it clearly if added)
- Duplicate information — if it belongs in CLIENT_REGISTRY, it should not also be in PROJECT_REGISTRY body text; use a link instead
- Ephemeral state (temporary variables, work-in-progress scratch notes)

### Write Format Rules
- Every file must start with a title (`# Title`) and a metadata line `> Last updated: YYYY-MM-DD | Owner: [name]`
- Use status badges consistently: `[LIVE]`, `[IN PROGRESS]`, `[PLANNED]`, `[BACKLOG]`, `[UNKNOWN — NEEDS ASSESSMENT]`, `[DONE]`, `[CANCELLED]`
- Tables are preferred over prose for structured data (lists of projects, clients, tasks)
- Decisions must be documented in DECISION_ENGINE.md and cross-linked from the affected project's DECISIONS.md
- Cross-links use relative markdown paths: `[Title](../CORE/MASTER_CONTEXT.md)`

---

## Update Cadence

| Document | Update Trigger | Frequency |
|---|---|---|
| MASTER_CONTEXT.md | Any significant state change | Within 24h of change |
| PROJECT_REGISTRY.md | Project status change | Per change |
| CLIENT_REGISTRY.md | New client or status change | Per change |
| TASK_ENGINE.md | Task created/completed/blocked | Per event |
| DECISION_ENGINE.md | Any architectural decision | Per decision |
| Project CURRENT_STATUS.md | After every work session | Per session |
| Project CHANGELOG.md | After every release/deploy | Per release |
| ROADMAP_ENGINE.md | Quarterly planning | Quarterly |
| COMPANY_CONSTITUTION.md | Foundational changes only | Rarely |
| KNOWLEDGE_GRAPH.md | New entity added or relationship changes | Per change |

---

## Deprecation Protocol

When information becomes outdated:
1. Do not delete the old entry immediately
2. Mark it `[DEPRECATED as of YYYY-MM-DD]` and add a note pointing to the new location
3. After 30 days, remove the deprecated entry
4. If a project is archived, move its folder to `/OMEGA/ARCHIVE/[ProjectName]/` — never delete

---

## Single Source of Truth Rules

| Information | Lives In | Referenced From |
|---|---|---|
| Client contact info | CLIENTS/[ClientName]/Business_Profile.md | CLIENT_REGISTRY, project README |
| Project status | PROJECTS/[Name]/CURRENT_STATUS.md | PROJECT_REGISTRY, MASTER_CONTEXT |
| Architectural decisions | CORE/DECISION_ENGINE.md | Project DECISIONS.md |
| All tasks | CORE/TASK_ENGINE.md | Project TASKS.md (links only) |
| AI agent capabilities | AI/[AgentName]/Capabilities.md | AGENT_REGISTRY |
| Brand constants | CORE/MASTER_CONTEXT.md | Any design doc |

Never duplicate. Always link.

---

## Conflict Resolution Protocol

When two OMEGA documents contain conflicting information, resolve in this order:

1. **Identify the source of truth** using the Single Source of Truth table above. The designated document wins.
2. **Check timestamps** — if the source of truth is older than the conflicting document, update the source of truth to match the newer fact, then update all referencing documents.
3. **Never leave a conflict unresolved** — document it in `CORE/MASTER_CONTEXT.md` under Current Priorities if it cannot be resolved in the same session.

| Conflict Type | Resolution |
|---|---|
| Two documents show different project status | Trust `PROJECTS/[Name]/CURRENT_STATUS.md`; update PROJECT_REGISTRY and MASTER_CONTEXT to match |
| Two documents show different client contact | Trust `CLIENTS/[Name]/Business_Profile.md`; update CLIENT_REGISTRY to match |
| Two documents show different task status | Trust `CORE/TASK_ENGINE.md`; update project TASKS.md to match |
| Two ADRs with the same ID | The lower-numbered (older) ADR wins. Re-ID the newer one and update all references. |

---

## Scaling Strategy

OMEGA is architected to scale to 10,000+ projects and 100,000+ clients without structural changes:

| Scale Threshold | Action Required |
|---|---|
| CLIENT_REGISTRY.md > 50 entries | Split into regional registries: `CLIENT_REGISTRY_US.md`, `CLIENT_REGISTRY_BR.md`, etc. |
| PROJECT_REGISTRY.md > 50 entries | Split into type registries: `PROJECT_REGISTRY_INTERNAL.md`, `PROJECT_REGISTRY_CLIENT.md` |
| TASK_ENGINE.md > 100 open tasks | Archive completed tasks to `ARCHIVE/TASK_ENGINE_[YEAR].md` and keep TASK_ENGINE.md current-only |
| KNOWLEDGE_GRAPH.md > 200 nodes | Split into sub-graphs by domain: `KNOWLEDGE_GRAPH_CLIENTS.md`, `KNOWLEDGE_GRAPH_INFRA.md` |
| Any CORE file > 500 lines | Review for content that belongs in leaf-level files and relocate; CORE files must stay scannable |
| MASTER_CONTEXT.md read time > 5 min | Aggressively prune — move detail to sub-files and replace with links |

**The CORE layer must always be fast to read.** As the business grows, complexity moves to the leaf level (client folders, project folders), not the CORE. If a CORE file is growing faster than leaf files, something is wrong.

---

**Related:** [OPERATING_RULES](OPERATING_RULES.md) | [MASTER_CONTEXT](MASTER_CONTEXT.md) | [KNOWLEDGE_GRAPH](KNOWLEDGE_GRAPH.md)

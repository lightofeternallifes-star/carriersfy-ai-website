# OMEGA — Enterprise Memory OS
## Carriersfy AI | v1.1.0 | INTERNAL — CONFIDENTIAL

> This is an OS control panel, not a document. Navigate using the panels below.

---

## ⚠️ Security Notice

OMEGA is excluded from Git via `.gitignore`. It is **never** committed to the public repository. It is never publicly accessible. Authorized access: Juan + Claude Code only.

If you are reading this from a browser at `carriersfy.ai/OMEGA/` — this is a security incident. Follow [PLAYBOOKS/INCIDENT_RESPONSE.md](PLAYBOOKS/INCIDENT_RESPONSE.md).

---

## START HERE

```
→ CORE/MASTER_CONTEXT.md    Complete company state. Read this first in every session.
→ CORE/OPERATING_RULES.md   Rules every agent must follow. Non-negotiable.
→ INDEXES/TASKS.md          What's open and needs action right now.
```

---

## SYSTEM LAYERS

### CORE/ — Company Truth
Single-source documents. Never duplicated. Always authoritative.

| Document | Contains |
|---|---|
| [MASTER_CONTEXT.md](CORE/MASTER_CONTEXT.md) | Full company snapshot — start every session here |
| [OPERATING_RULES.md](CORE/OPERATING_RULES.md) | Rules every agent must follow |
| [MEMORY_PROTOCOL.md](CORE/MEMORY_PROTOCOL.md) | How to read and write OMEGA |
| [PROJECT_REGISTRY.md](CORE/PROJECT_REGISTRY.md) | All projects with full detail |
| [CLIENT_REGISTRY.md](CORE/CLIENT_REGISTRY.md) | All clients with full detail |
| [AGENT_REGISTRY.md](CORE/AGENT_REGISTRY.md) | All AI employees with full detail |
| [DECISION_ENGINE.md](CORE/DECISION_ENGINE.md) | All ADRs — why things are built the way they are |
| [TASK_ENGINE.md](CORE/TASK_ENGINE.md) | All tasks — canonical source |
| [KNOWLEDGE_GRAPH.md](CORE/KNOWLEDGE_GRAPH.md) | Entity relationships — the wiring diagram |
| [COMPLIANCE.md](CORE/COMPLIANCE.md) | Legal and regulatory obligations |
| [VERSION_STRATEGY.md](CORE/VERSION_STRATEGY.md) | Scaling roadmap — when to migrate to v2/v3 |
| [COMPANY_CONSTITUTION.md](CORE/COMPANY_CONSTITUTION.md) | Mission, values, business model |
| [SYSTEM_ARCHITECTURE.md](CORE/SYSTEM_ARCHITECTURE.md) | Technical architecture |
| [ROADMAP_ENGINE.md](CORE/ROADMAP_ENGINE.md) | Milestones and roadmap |

---

### INDEXES/ — Fast Lookup
O(1) lookup by entity ID. Use these when you need to find something fast without reading full registries.

| Index | Finds |
|---|---|
| [INDEXES/PROJECTS.md](INDEXES/PROJECTS.md) | Any project by CF-PRJ-{NNN} |
| [INDEXES/CLIENTS.md](INDEXES/CLIENTS.md) | Any client by CF-CLI-{NNN} |
| [INDEXES/AGENTS.md](INDEXES/AGENTS.md) | Any agent by CF-AGT-{NNN} |
| [INDEXES/TASKS.md](INDEXES/TASKS.md) | Any task by CF-TSK-{NNN} |
| [INDEXES/DECISIONS.md](INDEXES/DECISIONS.md) | Any ADR by CF-ADR-{NNN} |
| [INDEXES/INTEGRATIONS.md](INDEXES/INTEGRATIONS.md) | Any integration by CF-INT-{NNN} |

---

### SCHEMAS/ — Entity Contracts
Required fields for every entity type. Validate against these before adding new records.

| Schema | Validates |
|---|---|
| [SCHEMAS/PROJECT.md](SCHEMAS/PROJECT.md) | CF-PRJ-{NNN} required fields |
| [SCHEMAS/CLIENT.md](SCHEMAS/CLIENT.md) | CF-CLI-{NNN} required fields |
| [SCHEMAS/AGENT.md](SCHEMAS/AGENT.md) | CF-AGT-{NNN} required fields |
| [SCHEMAS/TASK.md](SCHEMAS/TASK.md) | CF-TSK-{NNN} required fields |

---

### INTEGRATIONS/ — External Services
Documentation for every external system Carriersfy AI uses or plans to use.

| CF-INT-001 | [Cloudflare.md](INTEGRATIONS/Cloudflare.md) — Site hosting + CDN |
| CF-INT-002 | [GitHub.md](INTEGRATIONS/GitHub.md) — Source control |
| CF-INT-003 | [Resend.md](INTEGRATIONS/Resend.md) — Email delivery |
| CF-INT-004 | [Claude_Code.md](INTEGRATIONS/Claude_Code.md) — Engineering AI |
| CF-INT-005 | [Anthropic.md](INTEGRATIONS/Anthropic.md) — AI models |
| CF-INT-006 | [VS_Code.md](INTEGRATIONS/VS_Code.md) — IDE |
| CF-INT-007 | [Notion.md](INTEGRATIONS/Notion.md) — v2 knowledge management |
| CF-INT-008 | [Apple_Developer.md](INTEGRATIONS/Apple_Developer.md) — Mobile (planned) |
| CF-INT-009 | [Google_Workspace.md](INTEGRATIONS/Google_Workspace.md) — Email + calendar |
| CF-INT-010 | [OpenAI.md](INTEGRATIONS/OpenAI.md) — AI models (potential) |
| CF-INT-011 | [MCP_Servers.md](INTEGRATIONS/MCP_Servers.md) — Claude Code extensions |
| CF-INT-012 | [Future_AI_Employees.md](INTEGRATIONS/Future_AI_Employees.md) — Agent hosting |

---

### PLAYBOOKS/ — Runbooks
Deterministic step-by-step processes. No guessing — execute in order.

| Playbook | Triggers when |
|---|---|
| [NEW_CLIENT.md](PLAYBOOKS/NEW_CLIENT.md) | A prospect signs and becomes a client |
| [NEW_PROJECT.md](PLAYBOOKS/NEW_PROJECT.md) | A new project is scoped and approved |
| [AI_EMPLOYEE_DEPLOYMENT.md](PLAYBOOKS/AI_EMPLOYEE_DEPLOYMENT.md) | An AI employee is ready to go live |
| [INCIDENT_RESPONSE.md](PLAYBOOKS/INCIDENT_RESPONSE.md) | Site down, security event, or critical failure |
| [QUARTERLY_REVIEW.md](PLAYBOOKS/QUARTERLY_REVIEW.md) | Start of each quarter (Jan/Apr/Jul/Oct) |
| [VERSION_MIGRATION.md](PLAYBOOKS/VERSION_MIGRATION.md) | OMEGA v1 scaling triggers are hit |

---

### PROJECTS/ — Project Context
One folder per project with README, TASKS, and supporting docs.

```
PROJECTS/
├── Carriersfy_AI_Website/  (CF-PRJ-001)
├── Carriersfy_Platform/    (CF-PRJ-002)
├── Brazil_Signs/           (CF-PRJ-003)
├── Marine_Consolidated_Electronics/  (CF-PRJ-004)
├── Light_of_Life/          (CF-PRJ-005)
├── Internal_Infrastructure/ (CF-PRJ-006)
└── Future_Clients/         (CF-PRJ-007)
```

---

### CLIENTS/ — Client Relationships
One folder per client (9 standard files each).

```
CLIENTS/
├── Brazil_Signs/           (CF-CLI-001)
├── Marine/                 (CF-CLI-002)
├── Light_of_Life/          (CF-CLI-003)
└── Future_Clients/         (pipeline + templates)
```

---

### AI/ — Agent Profiles
One folder per AI employee.

```
AI/
├── Iron_Prime/   (CF-AGT-001)
├── Sofia/        (CF-AGT-002)
├── Claude_Code/  (CF-AGT-003)
├── Claude_Design/ (CF-AGT-004)
└── Future_AI_Employees/
```

---

### ARCHIVE/ — Deprecated
Completed or cancelled projects, deprecated documents. Never deleted — moved here.

---

## Entity ID System

Every entity has a canonical ID. Use IDs, not names, in cross-references.

| Type | Format | Example |
|---|---|---|
| Project | CF-PRJ-{NNN} | CF-PRJ-001 |
| Client | CF-CLI-{NNN} | CF-CLI-001 |
| Agent | CF-AGT-{NNN} | CF-AGT-003 |
| Integration | CF-INT-{NNN} | CF-INT-001 |
| Decision | CF-ADR-{NNN} | CF-ADR-006 |
| Task | CF-TSK-{NNN} | CF-TSK-001 |

---

**Owner:** Juan | **OMEGA Version:** 1.1.0 | **Classification:** INTERNAL — CONFIDENTIAL
**Last updated:** 2026-06-25

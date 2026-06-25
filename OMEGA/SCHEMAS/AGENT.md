# SCHEMA/AGENT — Carriersfy AI

> Entity contract for all Agent entities (AI employees and AI tools). Last updated: 2026-06-25

---

## Schema Definition

```
Entity Type:  AGENT
ID Format:    CF-AGT-{NNN}  (sequential, 3-digit zero-padded)
Owner:        OMEGA/CORE/AGENT_REGISTRY.md
Index:        OMEGA/INDEXES/AGENTS.md
```

---

## Agent Type Distinction

| Type | Definition | Examples |
|---|---|---|
| **AI Employee** | Client-facing agent with defined persona, communications scope, and business role | Iron Prime, Sofia |
| **AI Tool** | Internal-only AI capability used by the Carriersfy team | Claude Code, Claude Design |

---

## Required Fields (All Agents)

Every agent file (`AI/{name}/Purpose.md`) must contain:

| Field | Type | Description |
|---|---|---|
| `entity_id` | String | CF-AGT-{NNN} — must match AGENT_REGISTRY |
| `name` | String | Agent display name |
| `type` | Enum | AI Employee \| AI Tool |
| `role` | String | Role title (e.g., "Sales AI") |
| `status` | Enum | See Status Values below |
| `client_facing` | Boolean | Yes / No |
| `primary_function` | String | Core capability description |
| `permission_level` | String | What this agent is authorized to do |
| `hosting` | String | Where agent runs (or "TBD") |

---

## Required Fields (AI Employees Only)

| Field | Type | Description |
|---|---|---|
| `persona` | String | Name, tone, communication style |
| `target_users` | String | Who this agent communicates with |
| `memory_scope` | String | What data this agent can access and retain |
| `active_clients` | List | CF-CLI-{NNN} IDs of clients this agent serves |
| `deployment_decision` | String | CF-ADR-{NNN} — blocking deployment decision |

---

## Status Values

| Status | Meaning |
|---|---|
| `[ACTIVE]` | Deployed and running |
| `[ACTIVE — on-demand]` | Available but not continuously running |
| `[PLANNED]` | Designed but not yet deployed |
| `[STAGING]` | In test / pre-production |
| `[DEPRECATED]` | Replaced or retired |

---

## Permission Enforcement Rules

Per [OPERATING_RULES.md](../CORE/OPERATING_RULES.md):

1. No agent may access data outside their defined memory scope
2. No agent may send communications outside their assigned channel type
3. No agent may write to OMEGA without explicit authorization
4. Client financial data is accessible to NO agent (humans only)
5. AI Employees must disclose AI identity on direct inquiry (Rule 13)

---

## Validation Checklist

Before registering a new agent:
- [ ] Entity ID assigned (next sequential CF-AGT-{NNN})
- [ ] Entry added to CORE/AGENT_REGISTRY.md
- [ ] Entry added to INDEXES/AGENTS.md
- [ ] AI/{name}/ folder created with Purpose.md
- [ ] Permissions explicitly defined and reviewed by Juan
- [ ] If AI Employee: hosting platform decision (CF-ADR-{NNN}) exists
- [ ] If AI Employee: AI identity disclosure compliance documented
- [ ] KNOWLEDGE_GRAPH.md updated with new agent node
- [ ] Deployment playbook executed: [PLAYBOOKS/AI_EMPLOYEE_DEPLOYMENT.md](../PLAYBOOKS/AI_EMPLOYEE_DEPLOYMENT.md)

---

**Related schemas:** [PROJECT.md](PROJECT.md) | [CLIENT.md](CLIENT.md) | [TASK.md](TASK.md)

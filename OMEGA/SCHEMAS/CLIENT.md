# SCHEMA/CLIENT — Carriersfy AI

> Entity contract for all Client entities. Every client document must conform to this schema. Last updated: 2026-06-25

---

## Schema Definition

```
Entity Type:  CLIENT
ID Format:    CF-CLI-{NNN}  (sequential, 3-digit zero-padded)
Owner:        OMEGA/CORE/CLIENT_REGISTRY.md
Index:        OMEGA/INDEXES/CLIENTS.md
```

---

## Required Fields

Every client folder (`CLIENTS/{name}/Business_Profile.md`) must contain:

| Field | Type | Description |
|---|---|---|
| `entity_id` | String | CF-CLI-{NNN} — must match CLIENT_REGISTRY |
| `name` | String | Client/company display name |
| `industry` | String | Industry sector |
| `status` | Enum | See Status Values below |
| `geography` | String | Country / region |
| `primary_contact` | String | Name + email of main contact |
| `signed_date` | Date or "Unknown" | YYYY-MM-DD contract execution |
| `ltv_tier` | Enum | Tier 0 / Tier 1 / Tier 2 / Tier 3 / Unknown |
| `health` | Enum | See Health Values below |
| `last_touchpoint` | Date or "Unknown" | YYYY-MM-DD last meaningful contact |

---

## Optional Fields

| Field | Type | Description |
|---|---|---|
| `active_projects` | List | CF-PRJ-{NNN} IDs |
| `assigned_agents` | List | CF-AGT-{NNN} IDs |
| `monthly_value` | Currency | Current MRR from this client |
| `contract_end_date` | Date | YYYY-MM-DD |
| `notes` | String | Relationship notes |
| `action_required` | String | Next required action |

---

## Required Client Folder Structure

Every active client must have these 9 files:

```
CLIENTS/{ClientName}/
├── Business_Profile.md   ← This schema applies here
├── Current_Build.md      ← What is currently built
├── AI_Employees.md       ← Which agents serve this client
├── Web.md                ← Web presence details
├── CRM.md                ← CRM / contact list info
├── Integrations.md       ← Client-specific integrations
├── Pending_Work.md       ← Open deliverables
├── Meetings.md           ← Meeting history and notes
└── Notes.md              ← General notes
```

---

## Status Values

| Status | Meaning |
|---|---|
| `[ACTIVE]` | Paying client with active engagement |
| `[ACTIVE — NEEDS ASSESSMENT]` | Client exists but state undocumented |
| `[ONBOARDING]` | Signed, in onboarding process |
| `[PILOT]` | Trial / proof-of-concept phase |
| `[AT RISK]` | Relationship requires attention |
| `[CHURNED]` | No longer a client — archive entry |
| `[PROSPECT]` | Not yet signed — in pipeline |

---

## Health Values

| Health | Meaning |
|---|---|
| `[HEALTHY]` | Engaged, paying, satisfied |
| `[NEEDS ATTENTION]` | Concerns exist, follow-up required |
| `[AT RISK]` | May churn — escalate |
| `[UNKNOWN]` | No data — assessment required |
| `[CHURNED]` | No longer active |

---

## LTV Tier Definitions

| Tier | Monthly Value | Annual LTV |
|---|---|---|
| Tier 1 — Enterprise | $3,000+/mo | $36,000+ |
| Tier 2 — Growth | $1,000–$2,999/mo | $12,000–$36,000 |
| Tier 3 — Starter | $500–$999/mo | $6,000–$12,000 |
| Tier 0 — Pilot | Under $500/mo | Under $6,000 |

---

## Validation Checklist

Before adding a new client:
- [ ] Entity ID assigned (next sequential CF-CLI-{NNN})
- [ ] Entry added to CORE/CLIENT_REGISTRY.md
- [ ] Entry added to INDEXES/CLIENTS.md
- [ ] CLIENTS/{name}/ folder created with all 9 required files
- [ ] Project entity (CF-PRJ-{NNN}) created for their work
- [ ] Contract executed and stored (reference in CRM.md)
- [ ] KNOWLEDGE_GRAPH.md updated with new client node
- [ ] Onboarding playbook executed: [PLAYBOOKS/NEW_CLIENT.md](../PLAYBOOKS/NEW_CLIENT.md)

---

**Related schemas:** [PROJECT.md](PROJECT.md) | [AGENT.md](AGENT.md) | [TASK.md](TASK.md)

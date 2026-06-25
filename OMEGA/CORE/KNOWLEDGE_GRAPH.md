# KNOWLEDGE GRAPH — Carriersfy AI

> Entity relationship map for the entire Carriersfy AI operation. Last updated: 2026-06-25

---

## Core Entity Types

| Type | Symbol | Examples |
|---|---|---|
| Company | `[CO]` | Carriersfy AI |
| Project | `[PR]` | Carriersfy AI Website, Carriersfy Platform |
| Client | `[CL]` | Brazil Signs, Marine, Light of Life |
| AI Employee | `[AI]` | Iron Prime, Sofia, Claude Code, Claude Design |
| Tool / Service | `[SV]` | Cloudflare, Resend, GitHub, Google Fonts |
| Deployment | `[DP]` | carriersfy.ai, Cloudflare Pages |
| Document | `[DC]` | OMEGA files |
| Person | `[PE]` | Juan |

---

## Primary Relationship Map

```
[CO] Carriersfy AI
│
├── employs ──────────────────────────────────────────────────────────────────────────
│   ├── [PE] Juan (Founder)
│   ├── [AI] Iron Prime (Sales)
│   ├── [AI] Sofia (Operations)
│   ├── [AI] Claude Code (Engineering)
│   └── [AI] Claude Design (Design/Visual)
│
├── owns projects ────────────────────────────────────────────────────────────────────
│   ├── [PR] Carriersfy AI Website ──── deployed to ──► [DP] carriersfy.ai (Cloudflare Pages)
│   ├── [PR] Carriersfy Platform ──────── [PLANNED]
│   ├── [PR] Internal Infrastructure ─── Cloudflare + GitHub + Resend
│   └── [PR] Future Clients Pipeline
│
├── serves clients ───────────────────────────────────────────────────────────────────
│   ├── [CL] Brazil Signs ──────────── has project ──► [PR] Brazil Signs
│   ├── [CL] Marine Consolidated ────── has project ──► [PR] Marine Consolidated Electronics
│   └── [CL] Light of Life ─────────── has project ──► [PR] Light of Life
│
└── uses services ────────────────────────────────────────────────────────────────────
    ├── [SV] Cloudflare Pages (hosting, CDN, serverless functions)
    ├── [SV] Resend (email delivery)
    ├── [SV] GitHub (source control)
    └── [SV] Google Fonts (typography)
```

---

## Project → Service Dependencies

| Project | Cloudflare | Resend | GitHub | Google Fonts | DC/Draftcode |
|---|---|---|---|---|---|
| Carriersfy AI Website | ✅ Primary host | ✅ Lead emails | ✅ Source | ✅ Fonts | ✅ Runtime |
| Carriersfy Platform | 🔲 Planned | 🔲 Planned | 🔲 Planned | 🔲 Possible | ❌ Not used |
| Brazil Signs | ❓ Unknown | ❓ Unknown | ❓ Unknown | ❓ Unknown | ❓ Unknown |
| Marine Consolidated | ❓ Unknown | ❓ Unknown | ❓ Unknown | ❓ Unknown | ❓ Unknown |
| Light of Life | ❓ Unknown | ❓ Unknown | ❓ Unknown | ❓ Unknown | ❓ Unknown |
| Internal Infrastructure | ✅ Account mgmt | ✅ Domain mgmt | ✅ Org | ❌ N/A | ❌ N/A |

---

## Client → AI Employee Assignments

| Client | Iron Prime | Sofia | Claude Code | Claude Design |
|---|---|---|---|---|
| Brazil Signs | ❓ Needs discovery | ❓ Needs discovery | ❓ Needs discovery | ❓ Needs discovery |
| Marine Consolidated Electronics | ❓ Needs discovery | ❓ Needs discovery | ❓ Needs discovery | ❓ Needs discovery |
| Light of Life | ❓ Needs discovery | ❓ Needs discovery | ❓ Needs discovery | ❓ Needs discovery |

---

## AI Employee → Capability Map

| Agent | Communication | Code | Design | Memory | Client Facing | Internal |
|---|---|---|---|---|---|---|
| Iron Prime | ✅ Sales outreach | ❌ | ❌ | ✅ Leads + CRM | ✅ Prospects | ❌ |
| Sofia | ✅ Client comms | ❌ | ❌ | ✅ Client data | ✅ Onboarding | ✅ Scheduling |
| Claude Code | ❌ | ✅ Full stack | ❌ | ✅ OMEGA | ❌ | ✅ Builds |
| Claude Design | ❌ | ❌ | ✅ UI/UX + image | ✅ Brand system | ❌ | ✅ Designs |

---

## Document → Entity Cross-Reference

| OMEGA Document | References Entities |
|---|---|
| [COMPANY_CONSTITUTION](COMPANY_CONSTITUTION.md) | Carriersfy AI, Juan, all AI employees |
| [MASTER_CONTEXT](MASTER_CONTEXT.md) | All projects, all clients, all services, all AI employees |
| [PROJECT_REGISTRY](PROJECT_REGISTRY.md) | All projects, all services |
| [CLIENT_REGISTRY](CLIENT_REGISTRY.md) | All clients, all projects |
| [AGENT_REGISTRY](AGENT_REGISTRY.md) | All AI employees, all tools |
| [SYSTEM_ARCHITECTURE](SYSTEM_ARCHITECTURE.md) | All services, all deployments |
| [DECISION_ENGINE](DECISION_ENGINE.md) | All projects, all services (why chosen) |
| [ROADMAP_ENGINE](ROADMAP_ENGINE.md) | All projects, all clients (milestones) |

---

## Reachability Test (≤3 Clicks)

| From | To | Path |
|---|---|---|
| Any CORE doc | Any client | CORE → CLIENT_REGISTRY → Client folder |
| Any client | Their project | Client folder → Current_Build.md → Project README |
| Any project | Its AI employees | Project TASKS.md → AGENT_REGISTRY |
| Any AI employee | Their dependencies | AGENT_REGISTRY → AI/{name}/Dependencies.md |
| Any service | Projects using it | SYSTEM_ARCHITECTURE → Project FILES.md |

---

**Related:** [MASTER_CONTEXT](MASTER_CONTEXT.md) | [PROJECT_REGISTRY](PROJECT_REGISTRY.md) | [CLIENT_REGISTRY](CLIENT_REGISTRY.md) | [AGENT_REGISTRY](AGENT_REGISTRY.md) | [MEMORY_PROTOCOL](MEMORY_PROTOCOL.md)

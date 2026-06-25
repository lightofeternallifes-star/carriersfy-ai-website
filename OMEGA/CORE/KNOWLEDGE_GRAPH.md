# KNOWLEDGE GRAPH — Carriersfy AI

> Complete entity catalog with canonical IDs, relationship types, and traversal map. Last updated: 2026-06-25 | OMEGA v1.1.0

---

## Entity Catalog

### Projects
| ID | Name | Type |
|---|---|---|
| CF-PRJ-001 | Carriersfy AI Website | INTERNAL |
| CF-PRJ-002 | Carriersfy Platform | PLATFORM |
| CF-PRJ-003 | Brazil Signs | CLIENT |
| CF-PRJ-004 | Marine Consolidated Electronics | CLIENT |
| CF-PRJ-005 | Light of Life | CLIENT |
| CF-PRJ-006 | Internal Infrastructure | INTERNAL |
| CF-PRJ-007 | Future Clients Pipeline | PIPELINE |
| CF-PRJ-008 | CODEX Component Library | CODEX |

### Clients
| ID | Name | Industry |
|---|---|---|
| CF-CLI-001 | Brazil Signs | Signage / Print |
| CF-CLI-002 | Marine Consolidated Electronics | Marine / Electronics |
| CF-CLI-003 | Light of Life | Faith / Community |

### Agents
| ID | Name | Role |
|---|---|---|
| CF-AGT-001 | Iron Prime | Sales AI |
| CF-AGT-002 | Sofia | Operations AI |
| CF-AGT-003 | Claude Code | Engineering AI |
| CF-AGT-004 | Claude Design | Design AI |

### Integrations
| ID | Name | Category |
|---|---|---|
| CF-INT-001 | Cloudflare Pages | Hosting |
| CF-INT-002 | GitHub | Source Control |
| CF-INT-003 | Resend | Email |
| CF-INT-004 | Claude Code (Anthropic CLI) | AI Engineering |
| CF-INT-005 | Anthropic API | AI Models |
| CF-INT-006 | VS Code | IDE |
| CF-INT-007 | Notion | Knowledge Mgmt (planned) |
| CF-INT-008 | Apple Developer | Mobile (planned) |
| CF-INT-009 | Google Workspace | Email / Calendar |
| CF-INT-010 | OpenAI | AI Models (potential) |
| CF-INT-011 | MCP Servers | Claude Extensions |
| CF-INT-012 | Future AI Employee Platform | Agent Hosting |

### People
| ID | Name | Role |
|---|---|---|
| PE-001 | Juan | Founder, CEO |

---

## Relationship Types

| Relationship | Direction | Meaning |
|---|---|---|
| `OWNS` | Company → Project | Carriersfy AI owns this project |
| `SERVES` | Company → Client | Carriersfy AI provides service to client |
| `EMPLOYS` | Company → Agent | Agent works for Carriersfy AI |
| `USES` | Project → Integration | Project depends on this service |
| `DEPLOYED_TO` | Project → Integration | Project is hosted/deployed here |
| `ROUTES_TO` | Integration → Integration | Service sends data to another service |
| `MANAGES` | Person/Agent → Project | Person/agent is responsible for project |
| `ASSIGNED_TO` | Agent → Client | Agent is deployed to serve this client |
| `DEPENDS_ON` | Integration → Integration | Integration requires another to function |
| `TRIGGERS` | Integration → Integration | Action in A triggers action in B |
| `PRODUCES` | Project → Integration | Project generates output consumed by integration |
| `CONSUMES` | Project → Integration | Project reads data from integration |
| `BLOCKS` | Decision → Project | ADR must be resolved before project can proceed |
| `REFERENCES` | Task → Entity | Task relates to this entity |

---

## Entity Relationship Matrix

### Company → Everything

```
Carriersfy AI
│
├── EMPLOYS ──────────────────────────────────────────────────────────
│   ├── [PE-001] Juan (Founder)
│   ├── [CF-AGT-001] Iron Prime (Sales)       [PLANNED]
│   ├── [CF-AGT-002] Sofia (Operations)       [PLANNED]
│   ├── [CF-AGT-003] Claude Code (Engineering) [ACTIVE]
│   └── [CF-AGT-004] Claude Design (Design)   [ACTIVE — on-demand]
│
├── OWNS ─────────────────────────────────────────────────────────────
│   ├── [CF-PRJ-001] Carriersfy AI Website
│   ├── [CF-PRJ-002] Carriersfy Platform       [PLANNED]
│   ├── [CF-PRJ-003] Brazil Signs              [NEEDS ASSESSMENT]
│   ├── [CF-PRJ-004] Marine Consolidated       [NEEDS ASSESSMENT]
│   ├── [CF-PRJ-005] Light of Life             [NEEDS ASSESSMENT]
│   ├── [CF-PRJ-006] Internal Infrastructure
│   ├── [CF-PRJ-007] Future Clients Pipeline
│   └── [CF-PRJ-008] CODEX Component Library
│
└── SERVES ───────────────────────────────────────────────────────────
    ├── [CF-CLI-001] Brazil Signs
    ├── [CF-CLI-002] Marine Consolidated Electronics
    └── [CF-CLI-003] Light of Life
```

---

### Project → Integration Dependencies

```
[CF-PRJ-001] Carriersfy AI Website
  DEPLOYED_TO → [CF-INT-001] Cloudflare Pages
  USES        → [CF-INT-002] GitHub (source + deploy trigger)
  ROUTES_TO   → [CF-INT-003] Resend (contact form → email)
  CONSUMES    → Google Fonts (Space Grotesk, Manrope)

[CF-PRJ-002] Carriersfy Platform
  DEPLOYED_TO → [CF-INT-001] Cloudflare Pages (planned)
  USES        → [CF-INT-002] GitHub (planned)
  BLOCKS      ← [CF-ADR-006] Platform stack decision

[CF-PRJ-006] Internal Infrastructure
  MANAGES     → [CF-INT-001] Cloudflare account
  MANAGES     → [CF-INT-002] GitHub account
  MANAGES     → [CF-INT-003] Resend domain verification

[CF-PRJ-008] CODEX Component Library
  USES        → React 18 + TypeScript + Tailwind CSS v3 + Vite
  MANAGES     → [CF-INT-002] GitHub (codex/ in main repo)
```

---

### Integration → Integration Dependencies

```
[CF-INT-002] GitHub
  TRIGGERS → [CF-INT-001] Cloudflare Pages (auto-deploy on push to main)

[CF-INT-001] Cloudflare Pages
  ROUTES_TO → [CF-INT-003] Resend (via functions/api/contact.js)
  DEPENDS_ON → RESEND_API_KEY env var set in CF Pages

[CF-INT-003] Resend
  ROUTES_TO → juan@carriersfy.ai + hello@carriersfy.ai (via CF-INT-009)

[CF-INT-004] Claude Code
  DEPENDS_ON → [CF-INT-005] Anthropic API
  EXTENDS_WITH → [CF-INT-011] MCP Servers

[CF-INT-012] Future AI Employee Platform
  BLOCKS ← [CF-ADR-009] (platform not selected yet)
  DEPLOYS → [CF-AGT-001] Iron Prime
  DEPLOYS → [CF-AGT-002] Sofia
```

---

### Client → Project Assignments

```
[CF-CLI-001] Brazil Signs          →  [CF-PRJ-003] Brazil Signs
[CF-CLI-002] Marine Consolidated   →  [CF-PRJ-004] Marine Consolidated Electronics
[CF-CLI-003] Light of Life         →  [CF-PRJ-005] Light of Life
```

---

### Decision → Entity Blocks

```
[CF-ADR-006] Platform stack   →  BLOCKS  →  [CF-PRJ-002] Carriersfy Platform
[CF-ADR-009] AI Employee host →  BLOCKS  →  [CF-AGT-001] Iron Prime deployment
[CF-ADR-009] AI Employee host →  BLOCKS  →  [CF-AGT-002] Sofia deployment
[CF-ADR-009] AI Employee host →  BLOCKS  →  [CF-INT-012] Future AI Employee Platform
```

---

## Critical Paths

### Lead Capture Path (must work at all times)
```
User → carriersfy.ai → [CF-INT-001] → functions/api/contact.js → [CF-INT-003] → juan@carriersfy.ai
```
Failure point: RESEND_API_KEY missing → CF-TSK-001 (P0)

### Deploy Path (changes go live)
```
git push main → [CF-INT-002] GitHub → [CF-INT-001] Cloudflare Pages auto-deploy → carriersfy.ai
```

### Engineering Path (development)
```
Juan + [CF-AGT-003] Claude Code → [CF-INT-004] Claude Code CLI → reads OMEGA + project files → git commit → Deploy Path
```

---

## Traversal Guarantees (≤ 3 hops)

| From | To | Path | Hops |
|---|---|---|---|
| Any CORE doc | Any client | CORE → INDEXES/CLIENTS → CF-CLI-{NNN} folder | 2 |
| Any entity ID | Full detail | INDEXES/{type}.md → detail link | 1 |
| Any project | Its integrations | INDEXES/PROJECTS → CF-INT-{NNN} links | 2 |
| Any agent | Their tasks | INDEXES/AGENTS → task IDs → INDEXES/TASKS | 2 |
| Any integration | Its config | INDEXES/INTEGRATIONS → INTEGRATIONS/{name}.md | 1 |
| Any incident | Response steps | README → PLAYBOOKS/INCIDENT_RESPONSE | 1 |
| New client signed | Full onboarding | README → PLAYBOOKS/NEW_CLIENT | 1 |

---

## Document → Entity Cross-Reference

| OMEGA Document | Primary Entities Referenced |
|---|---|
| MASTER_CONTEXT.md | All — company-wide snapshot |
| PROJECT_REGISTRY.md | CF-PRJ-001 through CF-PRJ-008 |
| CLIENT_REGISTRY.md | CF-CLI-001 through CF-CLI-003 |
| AGENT_REGISTRY.md | CF-AGT-001 through CF-AGT-004 |
| TASK_ENGINE.md | CF-TSK-001 through CF-TSK-013 |
| DECISION_ENGINE.md | CF-ADR-001 through CF-ADR-010 |
| INDEXES/INTEGRATIONS.md | CF-INT-001 through CF-INT-012 |
| KNOWLEDGE_GRAPH.md | All entity types |
| SCHEMAS/*.md | Entity contracts (no specific IDs) |
| PLAYBOOKS/*.md | All entity types (procedural context) |

---

**Related:** [MASTER_CONTEXT](MASTER_CONTEXT.md) | [INDEXES/](../INDEXES/) | [MEMORY_PROTOCOL](MEMORY_PROTOCOL.md)

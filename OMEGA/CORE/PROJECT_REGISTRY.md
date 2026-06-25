# PROJECT REGISTRY — Carriersfy AI

> Master index of all projects. Last updated: 2026-06-25

---

## Active Projects

| # | Project | Status | Owner | Stack | URL | Client | Last Updated |
|---|---|---|---|---|---|---|---|
| 1 | [Carriersfy AI Website](../PROJECTS/Carriersfy_AI_Website/README.md) | [LIVE] V1.1 | Juan + Claude Code | HTML/JS/CF Pages | https://carriersfy.ai | Internal | 2026-06-24 |
| 2 | [Carriersfy Platform](../PROJECTS/Carriersfy_Platform/README.md) | [PLANNED] | Juan | TBD | — | Internal | 2026-06-25 |
| 3 | [Brazil Signs](../PROJECTS/Brazil_Signs/README.md) | [UNKNOWN — NEEDS ASSESSMENT] | Juan | Unknown | Unknown | Brazil Signs | Unknown |
| 4 | [Marine Consolidated Electronics](../PROJECTS/Marine_Consolidated_Electronics/README.md) | [UNKNOWN — NEEDS ASSESSMENT] | Juan | Unknown | Unknown | Marine Consolidated | Unknown |
| 5 | [Light of Life](../PROJECTS/Light_of_Life/README.md) | [UNKNOWN — NEEDS ASSESSMENT] | Juan | Unknown | Unknown | Light of Life | Unknown |
| 6 | [Internal Infrastructure](../PROJECTS/Internal_Infrastructure/README.md) | [IN PROGRESS] | Juan | Cloudflare + GitHub + Resend | — | Internal | 2026-06-25 |
| 7 | [Future Clients](../PROJECTS/Future_Clients/README.md) | [ACTIVE — PIPELINE] | Juan + Iron Prime | — | — | Multiple | 2026-06-25 |

---

## Project Details

### 1. Carriersfy AI Website
- **Purpose:** Marketing website — lead generation, brand presence, contact form
- **Repository:** `/Users/batman/Downloads/CARRIERSFY_AI_WEBSITE_V1.1_FINAL` (GitHub: lightofeternallifes-star)
- **Deployment:** Cloudflare Pages — auto-deploys from GitHub main branch
- **Live URL:** https://carriersfy.ai
- **Key Files:** `index.html`, `support.js`, `translations.js`, `functions/api/contact.js`
- **Critical Dependency:** `RESEND_API_KEY` env var in Cloudflare Pages
- **Current Version:** V1.1 — V1.1.1 (contact form fix applied 2026-06-24)
- **Next Version:** V1.2 — analytics + CRM integration

### 2. Carriersfy Platform
- **Purpose:** Internal platform for managing AI employees, clients, and workflows
- **Repository:** Not yet created
- **Deployment:** TBD
- **Stack:** TBD — see [ADR-006](DECISION_ENGINE.md)
- **Phase:** Pre-development — scoping required (see [TASK-005](TASK_ENGINE.md))

### 3. Brazil Signs
- **Purpose:** AI employee deployment for Brazil Signs client
- **Repository:** Unknown — requires discovery
- **Deployment:** Unknown
- **Contact:** Unknown — see [Client Profile](../CLIENTS/Brazil_Signs/Business_Profile.md)
- **Action:** Discovery meeting required by 2026-07-05

### 4. Marine Consolidated Electronics
- **Purpose:** AI employee deployment for Marine Consolidated Electronics client
- **Repository:** Unknown — requires discovery
- **Deployment:** Unknown
- **Contact:** Unknown — see [Client Profile](../CLIENTS/Marine/Business_Profile.md)
- **Action:** Discovery meeting required by 2026-07-05

### 5. Light of Life
- **Purpose:** AI employee deployment for Light of Life client
- **Repository:** Unknown — requires discovery
- **Deployment:** Unknown
- **Action:** Discovery meeting required by 2026-07-10

### 6. Internal Infrastructure
- **Purpose:** DNS management, email infrastructure, GitHub organization, Cloudflare account management, Resend domain verification
- **Key Assets:**
  - Domain: carriersfy.ai (on Cloudflare DNS)
  - Email domain: Resend (leads@carriersfy.ai verified)
  - GitHub user: lightofeternallifes-star
  - Cloudflare account: Juan's account
- **Status:** Operational. carriersfy.ai is live. Email infrastructure is live pending RESEND_API_KEY verification.

### 7. Future Clients Pipeline
- **Purpose:** Tracking prospective clients from Iron Prime outreach through to signed contract
- **Process:** [Onboarding Template](../CLIENTS/Future_Clients/Onboarding_Template.md) | [Discovery Questions](../CLIENTS/Future_Clients/Discovery_Questions.md) | [Proposal Template](../CLIENTS/Future_Clients/Proposal_Template.md)
- **Pipeline doc:** [Active Pipeline](../CLIENTS/Future_Clients/Pipeline.md)

---

## Project Health Summary

| Project | On Track | Blockers | Health |
|---|---|---|---|
| Carriersfy AI Website | Yes (maintenance mode) | RESEND_API_KEY unverified | 🟡 |
| Carriersfy Platform | In scoping | ADR-006 pending | 🟡 |
| Brazil Signs | Unknown | No documented status | 🔴 |
| Marine Consolidated | Unknown | No documented status | 🔴 |
| Light of Life | Unknown | No documented status | 🔴 |
| Internal Infrastructure | Operational | Email key unverified | 🟡 |
| Future Clients | Pre-launch | Iron Prime not deployed | 🟡 |

---

**Related:** [MASTER_CONTEXT](MASTER_CONTEXT.md) | [CLIENT_REGISTRY](CLIENT_REGISTRY.md) | [TASK_ENGINE](TASK_ENGINE.md) | [ROADMAP_ENGINE](ROADMAP_ENGINE.md)

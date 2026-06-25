# Roadmap — Carriersfy Platform

> Last updated: 2026-06-25 | Status: [PLANNED]

---

## Phase 0: Foundation (Q3 2026)
- Finalize tech stack (ADR-006)
- Create GitHub repository
- Set up Cloudflare Pages / hosting environment
- Define database schema: Clients, Projects, AI Employees, Tasks, Conversations
- Basic authentication (Juan only — internal tool)
- Project scaffolding + CI/CD pipeline

**Exit criteria:** Blank app deployed, auth working, DB connected

---

## Phase 1: MVP (Q4 2026 — target November 2026)

### Client Management
- Create / read / update / deactivate client records
- Store: company name, industry, geography, contacts, LTV tier, status

### AI Employee Registry
- Register and configure AI agents (Iron Prime, Sofia, future agents)
- Define scope, permissions, and assigned clients per agent

### Lead Management
- View leads captured from carriersfy.ai contact form
- Tag, assign, and update lead status
- Replace current email-only lead notification with structured tracking

### Basic Dashboard
- Active clients count
- Open tasks
- Recent leads
- AI employee status (active / idle / error)

**Exit criteria:** Juan can manage all clients and leads without opening a markdown file or email

---

## Phase 2: Workflow Engine (Q1 2027)
- Define automated workflows (trigger → action → escalation)
- Connect Iron Prime outreach sequences
- Connect Sofia onboarding checklists
- Notification system (email alerts for key events)

---

## Phase 3: Client Portal (Q2 2027)
- Client login (each client sees their own data only)
- Clients can view their deployed AI employees
- Clients can see activity logs and performance metrics
- Clients can request changes / support

---

## Phase 4: Marketplace (Q3 2027)
- Browse pre-built AI employee roles
- One-click deployment of AI employees from marketplace to client
- White-label access for agency partners

---

**Related:** [README](README.md) | [TASKS](TASKS.md) | [DECISIONS](DECISIONS.md) | [ROADMAP_ENGINE](../../CORE/ROADMAP_ENGINE.md)

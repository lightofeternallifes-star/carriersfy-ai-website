# Dependencies — Iron Prime

> Tools and services Iron Prime depends on. Last updated: 2026-06-25 | Status: [PLANNED]

---

## Required at Deployment

| Dependency | Purpose | Status |
|---|---|---|
| AI/LLM provider | Language model powering Iron Prime's reasoning | TBD — likely Anthropic (Claude) |
| CRM (HubSpot / custom) | Prospect data storage and pipeline tracking | [ADR-008 pending](../../CORE/DECISION_ENGINE.md) |
| Email provider | Outreach delivery (must support custom domain) | TBD — likely Resend or Gmail |
| LinkedIn access | Outreach channel (requires LinkedIn Sales Navigator or API access) | TBD |
| Calendar tool | Booking qualified meetings (Calendly or similar) | TBD |
| Hosting platform | Where Iron Prime actually runs | [ADR-009 pending](../../CORE/DECISION_ENGINE.md) |

## Optional / Phase 2

| Dependency | Purpose |
|---|---|
| WhatsApp Business API | Brazil market outreach |
| Data enrichment (Apollo, Clay, Hunter.io) | Better prospect research |
| Zapier / Make.com | Workflow automation between tools |
| Analytics dashboard | Track Iron Prime performance metrics |

---

**Related:** [Purpose](Purpose.md) | [Capabilities](Capabilities.md) | [DECISION_ENGINE](../../CORE/DECISION_ENGINE.md)

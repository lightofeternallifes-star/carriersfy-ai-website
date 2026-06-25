# Memory Scope — Iron Prime

> What Iron Prime knows and remembers. Last updated: 2026-06-25

---

## What Iron Prime Has Access To

### Company Knowledge
- Carriersfy AI value proposition, services, and pricing ranges
- [ICP definition](../../CLIENTS/Future_Clients/ICP.md) — who to target and why
- [Discovery Questions](../../CLIENTS/Future_Clients/Discovery_Questions.md) — how to qualify
- [Proposal process](../../CLIENTS/Future_Clients/Proposal_Template.md) — what comes after qualification
- Current client list (for reference / referral context) — but NOT client operational details

### Prospect Memory
- All prospect interactions stored in CRM
- Contact name, company, role, industry, geography
- Full conversation history per prospect
- Qualification score and status per prospect
- Notes from each touchpoint

### Performance Memory
- Own outreach volume and response rates (for self-optimization)
- Which message variants perform best by industry/geography
- Which ICP signals correlate with high qualification rates

---

## What Iron Prime Does NOT Have Access To

- Client operational data (what AI employees are doing for clients)
- Financial records or contract terms
- OMEGA project/client folders (read access to ICP and Pipeline docs only)
- Juan's personal email or calendar beyond approved booking flow
- Other AI employees' memory (Sofia, Claude Code, Claude Design)

---

## Memory Architecture (To Design at Deployment)

- CRM as primary memory store (all prospect interactions)
- Vector database for prospect research context (optional, for at-scale)
- Session context: current conversation with a specific prospect
- Shared context: Carriersfy AI brand, ICP, qualification framework

---

**Related:** [Purpose](Purpose.md) | [Permissions](Permissions.md) | [Dependencies](Dependencies.md)

# Memory Scope — Sofia

> Last updated: 2026-06-25

---

## What Sofia Has Access To

### Client Knowledge
- Full OMEGA CLIENT folders for all active clients (read + write)
- Full OMEGA PROJECT folders for active client projects (read + write)
- Onboarding status for each client
- Meeting history and notes
- Pending work items
- Contact information for all client contacts

### Company Knowledge
- [MASTER_CONTEXT](../../CORE/MASTER_CONTEXT.md) — full company state
- [TASK_ENGINE](../../CORE/TASK_ENGINE.md) — all tasks (read + update)
- [ROADMAP_ENGINE](../../CORE/ROADMAP_ENGINE.md) — roadmap awareness
- [Onboarding_Template](../../CLIENTS/Future_Clients/Onboarding_Template.md) — operating procedure

### Operational Memory
- All client communications (email threads, meeting notes)
- Active tasks and their status
- Upcoming meetings and deadlines
- Client health signals (last contact date, pending items, risks)

---

## What Sofia Does NOT Have Access To

- Prospect database (Iron Prime's domain)
- Code repositories (Claude Code's domain)
- Design assets beyond what's needed for client communication (Claude Design's domain)
- Financial records, contract terms, or pricing decisions
- Juan's personal email beyond approved outbound templates

---

**Related:** [Purpose](Purpose.md) | [Permissions](Permissions.md)

# Memory Scope — Claude Code

> Last updated: 2026-06-25

---

## What Claude Code Has Access To

### Project Memory
- OMEGA (full read + write access)
- Working directory file system for active projects
- Git history of all repositories in scope
- Deployment logs (Cloudflare Pages build logs)

### Company Memory (via OMEGA)
- [MASTER_CONTEXT](../../CORE/MASTER_CONTEXT.md) — company state
- All project files (full read + write)
- All client files (read; write to tech-relevant sections)
- All CORE OMEGA files (read + write)
- [DECISION_ENGINE](../../CORE/DECISION_ENGINE.md) — all ADRs

### Conversation Memory
- Claude Code starts each conversation fresh (no persistent memory between sessions)
- OMEGA compensates for this — Claude Code should read MASTER_CONTEXT.md at the start of each new engineering session
- Key decisions and context must be written to OMEGA during the session, not held in conversation memory

---

## Memory Limitations

- **No cross-session memory without OMEGA** — any context not written to OMEGA is lost at session end
- **No access to Iron Prime's prospect database** — separate scope
- **No access to Sofia's client communication history** — read OMEGA CLIENT files instead
- **Max context window** — for very large codebases, use targeted file reads rather than reading everything

---

## Protocol: Start of Every Engineering Session

1. Read [MASTER_CONTEXT](../../CORE/MASTER_CONTEXT.md)
2. Read the relevant project's [CURRENT_STATUS](../../PROJECTS/Carriersfy_AI_Website/CURRENT_STATUS.md)
3. Read the relevant project's [TASKS](../../PROJECTS/Carriersfy_AI_Website/TASKS.md)
4. Read [OPERATING_RULES](../../CORE/OPERATING_RULES.md)
5. Begin work

---

**Related:** [Purpose](Purpose.md) | [Permissions](Permissions.md) | [MEMORY_PROTOCOL](../../CORE/MEMORY_PROTOCOL.md)

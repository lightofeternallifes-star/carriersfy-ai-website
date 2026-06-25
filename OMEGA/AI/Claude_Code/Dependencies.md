# Dependencies — Claude Code

> Last updated: 2026-06-25

---

## Runtime Dependencies

| Dependency | Purpose | Status |
|---|---|---|
| Anthropic CLI (`claude` command) | Claude Code's operating interface | [ACTIVE] |
| claude-sonnet-4-6 model | Underlying LLM | [ACTIVE] — upgrade to Opus for complex architecture |
| macOS terminal (zsh) | Shell environment | Juan's machine |
| Git | Source control operations | [ACTIVE] |
| Node.js / npm | Some project tooling | As needed per project |

## Access Requirements

| System | Access Needed | Status |
|---|---|---|
| Local file system | Read + write for project directories | [ACTIVE] |
| GitHub | Via git (local clone) | [ACTIVE] |
| Cloudflare | Via CF Pages dashboard (Juan) — Claude Code creates files, Juan deploys | Juan-mediated |
| OMEGA | Full read + write | [ACTIVE] |

---

**Related:** [Purpose](Purpose.md) | [SYSTEM_ARCHITECTURE](../../CORE/SYSTEM_ARCHITECTURE.md)

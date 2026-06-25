# INTEGRATION: Claude Code

- **Entity ID:** CF-INT-004
- **Category:** AI Engineering Tool
- **Status:** [ACTIVE]
- **Critical:** YES — primary development agent

---

## What It Does

Claude Code is the Anthropic CLI that powers the AI engineering capability within Carriersfy AI. It is used for all code development, infrastructure work, debugging, OMEGA maintenance, and technical decision support.

---

## Agent Profile

See [INDEXES/AGENTS.md](../INDEXES/AGENTS.md) — CF-AGT-003

| Attribute | Value |
|---|---|
| **Model** | claude-sonnet-4-6 (current default) |
| **Upgrade model** | claude-opus-4-8 (for complex architectural work) |
| **Access** | Juan's local machine via Claude Code CLI |
| **Session type** | Interactive — Juan invokes, Claude Code executes |
| **Memory** | OMEGA/ directory + conversation context + CLAUDE.md bootstrap |

---

## How It's Used

1. Juan opens a Claude Code session in the repo directory
2. Claude Code reads `CLAUDE.md` → then `OMEGA/CORE/MASTER_CONTEXT.md`
3. Juan describes the task; Claude Code executes with tool use
4. No git commit or push without Juan's explicit approval

---

## Capabilities in This Project

| Capability | Authorized |
|---|---|
| Read/write project files | ✅ |
| Run bash commands | ✅ (sandboxed) |
| Git operations | ✅ with Juan approval before push |
| Read/write OMEGA | ✅ |
| Deploy to production | ✅ via `git push` with Juan approval |
| Access secrets | ❌ — reads env vars only from CF dashboard |
| Modify `support.js` | ❌ — explicitly forbidden |

---

## MCP Servers

Claude Code can be extended with MCP (Model Context Protocol) servers. Currently active:
- See [INTEGRATIONS/MCP_Servers.md](MCP_Servers.md) — CF-INT-011

---

## Session Bootstrap Protocol

Every Claude Code session must:
1. Read `CLAUDE.md` (auto-loaded by Claude Code)
2. Read `OMEGA/CORE/MASTER_CONTEXT.md`
3. Read `OMEGA/CORE/OPERATING_RULES.md`
4. Check `INDEXES/TASKS.md` for P0/P1 open items before starting new work

---

## Related

- **Depends on:** CF-INT-005 (Anthropic API), CF-INT-011 (MCP Servers)
- **Powers:** CF-AGT-003 (Claude Code agent identity)
- **Works on:** CF-PRJ-001, CF-PRJ-008, CF-PRJ-006

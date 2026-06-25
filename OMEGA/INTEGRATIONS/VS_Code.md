# INTEGRATION: VS Code

- **Entity ID:** CF-INT-006
- **Category:** IDE
- **Status:** [ACTIVE]
- **Critical:** Low — replaceable

---

## What It Does

VS Code is the primary code editor used alongside Claude Code CLI. It provides file browsing, terminal access, and visual diff review of changes made by Claude Code.

---

## Usage Pattern

| Task | Tool |
|---|---|
| Reviewing Claude Code changes | VS Code file browser + diff view |
| Running Claude Code sessions | Integrated terminal in VS Code |
| Browsing OMEGA | VS Code markdown preview |
| Editing small files manually | VS Code editor |
| Running `npm run dev` for codex | VS Code terminal |

---

## Extensions Recommended

| Extension | Purpose |
|---|---|
| Markdown Preview Enhanced | Preview OMEGA docs |
| Tailwind CSS IntelliSense | codex/ development |
| TypeScript (built-in) | codex/ type checking |
| GitLens | Git blame and history |

---

## Claude Code IDE Extension

Claude Code has an official VS Code extension that enables:
- Inline code suggestions from Claude
- Chat interface within VS Code
- Direct integration with Claude Code CLI

Available at: VS Code Marketplace → search "Claude Code"

---

## Related

- **Used alongside:** CF-INT-004 (Claude Code CLI)
- **For:** CF-PRJ-001, CF-PRJ-008 (codex development)

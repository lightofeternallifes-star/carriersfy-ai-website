# INTEGRATION: MCP Servers

- **Entity ID:** CF-INT-011
- **Category:** Claude Code Extensions
- **Status:** [ACTIVE — partial]
- **Critical:** Medium — extends Claude Code capability

---

## What It Does

MCP (Model Context Protocol) servers are extensions that give Claude Code (CF-AGT-003) additional tools and data access. Each MCP server exposes a set of tools that Claude can call during a session.

---

## MCP Servers Available

Based on active session configuration. Available MCP servers include:

| MCP Server | Capability | Status |
|---|---|---|
| Cloudflare Developer Platform | Deploy workers, manage Pages, DNS, R2 | Available |
| Cloudinary | Image upload, transformation, CDN management | Available |
| Google Drive | Read/write Google Drive files | Available |
| Notion | Read/write Notion databases and pages | Available |
| IDE (mcp__ide) | Execute code in IDE, get diagnostics | Available |

---

## How MCP Servers Work

1. Configured in Claude Code settings (`.claude/settings.json` or global config)
2. Available as deferred tools — fetched when needed via `ToolSearch`
3. Claude Code can call MCP tools as part of any session
4. MCP server credentials must be set up per-server (OAuth or API keys)

---

## Key Use Cases

| MCP Server | Use Case |
|---|---|
| Cloudflare | Direct Cloudflare API access without dashboard — deploy, manage env vars |
| Notion | OMEGA v2 migration — read/write Notion databases from Claude sessions |
| Google Drive | Access client documents shared via Google Drive |
| Cloudinary | Upload and manage image assets for website and client projects |

---

## Security Notes

- MCP servers run with Claude Code's permissions — review what each server can do
- Cloudflare MCP server can modify production infrastructure — use with care
- Notion MCP server requires Notion API token — store in Claude Code config, not git

---

## Authentication

Each MCP server has its own auth flow:
- Cloudflare: OAuth via `mcp__claude_ai_Cloudflare_Developer_Platform__authenticate`
- Cloudinary: OAuth via `mcp__claude_ai_Cloudinary__authenticate`
- Google Drive: Google OAuth
- Notion: Notion API token

---

## Related

- **Extends:** CF-INT-004 (Claude Code)
- **Enables:** CF-INT-007 (Notion) access from Claude sessions
- **Enables:** CF-INT-001 (Cloudflare) management via API

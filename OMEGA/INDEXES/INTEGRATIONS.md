# INDEXES/INTEGRATIONS — Carriersfy AI

> Fast O(1) lookup for all external integrations and services. Every integration has a canonical entity ID. Last updated: 2026-06-25

---

## Integration Index

| Entity ID | Service | Category | Status | Auth Method | Critical |
|---|---|---|---|---|---|
| CF-INT-001 | Cloudflare Pages | Hosting / CDN / Serverless | [ACTIVE] | Juan's account (dashboard) | YES — site host |
| CF-INT-002 | GitHub | Source Control | [ACTIVE] | Juan's account (lightofeternallifes-star) | YES — deploys |
| CF-INT-003 | Resend | Transactional Email | [ACTIVE — KEY PENDING] | RESEND_API_KEY env var | YES — lead emails |
| CF-INT-004 | Claude Code (Anthropic CLI) | AI Engineering | [ACTIVE] | Anthropic API key (Claude Code session) | YES — dev agent |
| CF-INT-005 | Anthropic API | AI Models | [ACTIVE] | Anthropic API key | High |
| CF-INT-006 | VS Code | IDE | [ACTIVE] | Local install | Low |
| CF-INT-007 | Notion | Knowledge Management | [PLANNED — v2 trigger] | Notion API | Low |
| CF-INT-008 | Apple Developer | Mobile App | [PLANNED] | Apple Dev account | Low |
| CF-INT-009 | Google Workspace | Email / Calendar / Docs | [ACTIVE] | Google account (juan@carriersfy.ai) | High |
| CF-INT-010 | OpenAI | AI Models (alternative) | [POTENTIAL] | OpenAI API key | Low |
| CF-INT-011 | MCP Servers | Claude Code Extensions | [ACTIVE — partial] | Per-server config | Medium |
| CF-INT-012 | AI Employee Platform | AI Employee Hosting | [TBD — CF-ADR-009] | TBD | High (future) |

---

## Quick Lookup

### By Status
- **[ACTIVE]:** CF-INT-001, CF-INT-002, CF-INT-004, CF-INT-005, CF-INT-006, CF-INT-009
- **[ACTIVE — partial/pending]:** CF-INT-003, CF-INT-011
- **[PLANNED]:** CF-INT-007, CF-INT-008
- **[POTENTIAL]:** CF-INT-010
- **[TBD]:** CF-INT-012

### Critical Path (site goes down if these fail)
1. CF-INT-001 — Cloudflare Pages
2. CF-INT-002 — GitHub (deploy trigger)
3. CF-INT-003 — Resend (email delivery)

### By Category
- **Hosting:** CF-INT-001
- **Source Control:** CF-INT-002
- **Email:** CF-INT-003
- **AI/Engineering:** CF-INT-004, CF-INT-005, CF-INT-010
- **IDE:** CF-INT-006
- **Knowledge Mgmt:** CF-INT-007
- **Mobile:** CF-INT-008
- **Productivity:** CF-INT-009
- **Extensions:** CF-INT-011
- **Future AI:** CF-INT-012

---

## Credentials / Auth Map

| Entity ID | Auth Type | Location | Rotate Cadence |
|---|---|---|---|
| CF-INT-001 | Dashboard login | Juan's browser | On team change |
| CF-INT-002 | GitHub OAuth | CF Pages + local git | On team change |
| CF-INT-003 | API key (RESEND_API_KEY) | Cloudflare Pages env vars | 90 days |
| CF-INT-004 | Anthropic API key | Claude Code session | Per session |
| CF-INT-005 | Anthropic API key | claude.ai / API | 90 days |
| CF-INT-009 | Google OAuth | juan@carriersfy.ai | On team change |

---

**Detail files:** [INTEGRATIONS/](../INTEGRATIONS/)

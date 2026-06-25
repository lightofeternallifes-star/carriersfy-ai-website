# INTEGRATION: GitHub

- **Entity ID:** CF-INT-002
- **Category:** Source Control
- **Status:** [ACTIVE]
- **Critical:** YES — all code and deploy history lives here

---

## What It Does

GitHub is the source control system for all Carriersfy AI code. The main repo's `main` branch is the deploy trigger for Cloudflare Pages.

---

## Account Details

| Attribute | Value |
|---|---|
| **GitHub Username** | lightofeternallifes-star |
| **Account Type** | Personal (acting as org account) |
| **Main Repo** | Carriersfy AI Website (this repository) |
| **Branch Strategy** | `main` = production; feature branches via `feat/[description]` |
| **Auto-deploy** | Every push to `main` → Cloudflare Pages auto-deploys |

---

## Branch Rules

| Branch | Behavior |
|---|---|
| `main` | Auto-deploys to `carriersfy.ai` production — Juan approval required before push |
| `feat/*` | Preview deploys on Cloudflare Pages — safe for testing |
| `fix/*` | Same as feat — preview only |

---

## What Is (and Is NOT) Committed

**Is committed:**
- `index.html` — full website source
- `support.js` — DC runtime (do not edit, but is committed)
- `translations.js` — i18n strings
- `_headers` — Cloudflare security headers
- `robots.txt` — crawl rules
- `functions/api/contact.js` — serverless function
- `assets/` — images, fonts, icons
- `CLAUDE.md` — Claude Code session bootstrap
- `codex/` — component library (dev-only, not deployed)
- `config/`, `docs/`, `pages/` — existing Carriersfy work directories

**Is NOT committed (gitignored):**
- `OMEGA/` — internal business memory (NEVER commit)
- `.env`, `.env.*` — secrets
- `node_modules/`
- `.DS_Store`
- `design_handoff_carriersfy_website/`

---

## Security

- OMEGA is excluded from this repository entirely via `.gitignore`
- No API keys, passwords, or secrets should ever be committed
- `RESEND_API_KEY` lives in Cloudflare Pages env vars, NOT in this repo

---

## Future

- Migrate to GitHub Organization when team grows beyond Juan
- Add branch protection rules on `main` (require review before merge)
- Add GitHub Actions for automated checks

---

## Related

- **Triggers:** CF-INT-001 (Cloudflare Pages auto-deploy)
- **Used by:** CF-PRJ-001, CF-PRJ-006, CF-PRJ-008 (codex)
- **Agent access:** CF-AGT-003 (Claude Code) — git read/write with Juan approval

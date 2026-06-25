# CLAUDE.md — Carriersfy AI

> Session bootstrap for Claude Code. Read this before acting.

## Read First (in order)

1. `OMEGA/CORE/MASTER_CONTEXT.md` — Full company state snapshot
2. `OMEGA/CORE/OPERATING_RULES.md` — Non-negotiable agent rules
3. `OMEGA/INDEXES/TASKS.md` — Check for P0/P1 open items before starting new work

## Project Summary

Carriersfy AI marketing website. Single `index.html` powered by DC/Draftcode runtime (`support.js`). Deployed to Cloudflare Pages at https://carriersfy.ai.

## NEVER Modify

| File | Reason |
|---|---|
| `support.js` | DC runtime — auto-generated. Any edit breaks the site. |
| `translations.js` | i18n strings — managed via DC/Draftcode tool. |
| `index.html` | DC-generated output — edit via DC/Draftcode only. |
| `functions/api/contact.js` | Production backend — change only with explicit scope. |
| `OMEGA/` | Internal business memory. Never commit to public repo (gitignored). |

## Critical Rules

- **No secrets in Git.** `RESEND_API_KEY` lives in Cloudflare Pages env vars only — never in source.
- **Do not commit or push without Juan's approval.** Always confirm before any `git push`.
- **Read OMEGA first.** Every session starts with `OMEGA/CORE/MASTER_CONTEXT.md`.
- **Use entity IDs.** All cross-references use CF-PRJ-{NNN}, CF-CLI-{NNN}, CF-AGT-{NNN}, etc.
- **Test before calling done.** Contact form must send emails. Links must resolve.

## File Map

| File | Purpose |
|---|---|
| `index.html` | Entire website — DC component tree |
| `support.js` | DC/Draftcode React runtime — do not edit |
| `translations.js` | EN/PT/ES i18n |
| `_headers` | Cloudflare security headers (HSTS, CSP, OMEGA block) |
| `robots.txt` | Crawl rules — blocks OMEGA, config, docs, pages, codex |
| `functions/api/contact.js` | Lead capture → Resend email API |
| `codex/` | React/TS/Tailwind component library (dev — not deployed) |
| `config/` | Sophia AI employee config (real work — keep) |
| `docs/` | Sophia activation plan (real work — keep) |
| `pages/` | JSX page components for AI employee experiences (real work — keep) |
| `OMEGA/` | Enterprise memory OS (gitignored — never committed) |

## OMEGA Quick Reference

| Need | Go to |
|---|---|
| Company snapshot | `OMEGA/CORE/MASTER_CONTEXT.md` |
| Find any project | `OMEGA/INDEXES/PROJECTS.md` |
| Find any client | `OMEGA/INDEXES/CLIENTS.md` |
| Find any agent | `OMEGA/INDEXES/AGENTS.md` |
| Find any task | `OMEGA/INDEXES/TASKS.md` |
| Find any decision (ADR) | `OMEGA/INDEXES/DECISIONS.md` |
| Find any integration | `OMEGA/INDEXES/INTEGRATIONS.md` |
| Onboard new client | `OMEGA/PLAYBOOKS/NEW_CLIENT.md` |
| Start new project | `OMEGA/PLAYBOOKS/NEW_PROJECT.md` |
| Deploy AI employee | `OMEGA/PLAYBOOKS/AI_EMPLOYEE_DEPLOYMENT.md` |
| Site is down | `OMEGA/PLAYBOOKS/INCIDENT_RESPONSE.md` |
| Entity schemas | `OMEGA/SCHEMAS/` |
| Service details | `OMEGA/INTEGRATIONS/` |

## Entity ID System

Use these canonical IDs in all cross-references — never just names:

| Type | Format | Quick Examples |
|---|---|---|
| Project | CF-PRJ-{NNN} | CF-PRJ-001 (website), CF-PRJ-002 (platform) |
| Client | CF-CLI-{NNN} | CF-CLI-001 (Brazil Signs), CF-CLI-002 (Marine), CF-CLI-003 (Light of Life) |
| Agent | CF-AGT-{NNN} | CF-AGT-003 (Claude Code), CF-AGT-001 (Iron Prime) |
| Integration | CF-INT-{NNN} | CF-INT-001 (Cloudflare), CF-INT-003 (Resend) |
| Decision | CF-ADR-{NNN} | CF-ADR-009 (AI employee platform, PENDING) |
| Task | CF-TSK-{NNN} | CF-TSK-001 (P0 — verify RESEND_API_KEY) |

## Environment Variables

| Variable | Purpose | Where Set |
|---|---|---|
| `RESEND_API_KEY` | Resend email API authentication | Cloudflare Pages → Settings → Env Vars → Production |

## Git Branch Strategy

- `main` — production. Auto-deploys to Cloudflare Pages. Requires Juan approval before push.
- Feature branches: `feat/[description]` — preview deploys on Cloudflare Pages.

**Related:** [OMEGA/CORE/MASTER_CONTEXT.md](OMEGA/CORE/MASTER_CONTEXT.md) | [OMEGA/README.md](OMEGA/README.md) | [OMEGA/CORE/OPERATING_RULES.md](OMEGA/CORE/OPERATING_RULES.md)

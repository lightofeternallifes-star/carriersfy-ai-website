# INTEGRATION: Cloudflare Pages

- **Entity ID:** CF-INT-001
- **Category:** Hosting / CDN / Serverless
- **Status:** [ACTIVE]
- **Critical:** YES — site goes offline if this fails

---

## What It Does

Cloudflare Pages hosts the entire `carriersfy.ai` website and runs serverless edge functions for backend logic. It auto-deploys from GitHub main branch on every push.

---

## Services in Use

| Service | Usage |
|---|---|
| Pages (static hosting) | Serves `index.html`, `support.js`, `translations.js`, all assets |
| Pages Functions | `functions/api/contact.js` — contact form endpoint |
| CDN / Global network | Distributes content globally via Cloudflare edge |
| Custom domain | `carriersfy.ai` — DNS managed through Cloudflare |
| Environment variables | Stores `RESEND_API_KEY` for use by contact.js |
| `_headers` file | Custom HTTP response headers (security, HSTS, CSP, OMEGA block) |
| `robots.txt` | Crawl rules served by Cloudflare CDN |
| Auto-deploy | Triggered on every push to `main` branch (linked to CF-INT-002) |

---

## Authentication

- **Access:** Juan's Cloudflare account (email/password + 2FA recommended)
- **Dashboard:** https://dash.cloudflare.com
- **Project name:** carriersfy-ai (or similar — verify in dashboard)
- **Linked repo:** CF-INT-002 (GitHub: lightofeternallifes-star)

---

## Critical Configuration

```
Build command:        (none — static site, no build step)
Build output dir:     /  (repo root)
Root directory:       /  (repo root)
Branch auto-deploy:   main → production
Preview deploys:      enabled (non-main branches)
Environment var:      RESEND_API_KEY → Production environment only
```

---

## Known Issues / Watch Points

- **RESEND_API_KEY (CF-TSK-001):** Must be verified as set in Production environment variables. If missing, contact form silently fails.
- **OMEGA security:** `_headers` file blocks `/OMEGA/*` at edge with `X-Robots-Tag: noindex, nofollow` and `Cache-Control: no-store`. However, OMEGA is excluded from git via `.gitignore` so it is never pushed — this is defense in depth.
- **Build failures:** Any syntax error in `functions/api/contact.js` will cause a deployment failure. Monitor Cloudflare Pages build log.

---

## Related

- **Depends on:** CF-INT-002 (GitHub — source of truth for deployment)
- **Used by:** CF-PRJ-001 (Carriersfy AI Website), CF-PRJ-006 (Internal Infrastructure)
- **Sends to:** CF-INT-003 (Resend) via contact.js function
- **Task:** CF-TSK-001, CF-TSK-013

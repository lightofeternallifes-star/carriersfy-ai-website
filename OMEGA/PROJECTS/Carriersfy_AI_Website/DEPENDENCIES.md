# Dependencies — Carriersfy AI Website

> All external services, tools, and runtime dependencies. Last updated: 2026-06-25

---

## Production Dependencies

| Dependency | Type | Purpose | Account | Free Tier | Notes |
|---|---|---|---|---|---|
| **Cloudflare Pages** | Hosting / CDN / Functions | Serves the site, runs serverless functions | Juan's Cloudflare account | Yes — unlimited bandwidth | Auto-deploys from GitHub main |
| **Cloudflare DNS** | DNS | Resolves carriersfy.ai | Juan's Cloudflare account | Yes | Zone is managed in Cloudflare dashboard |
| **GitHub** | Source control / CI | Stores code, triggers Cloudflare deployments | lightofeternallifes-star | Yes | Push to main = deploy |
| **Resend** | Email API | Delivers lead notification emails | Juan's Resend account | 3,000/mo, 100/day | Requires `RESEND_API_KEY` env var |
| **Google Fonts** | Web fonts | Space Grotesk + Manrope | None (public CDN) | Yes | Loaded via `<link>` in `<head>` — requires internet |
| **DC/Draftcode runtime** | JS runtime | Renders the site's React-based component tree | Embedded (support.js) | N/A | Bundled in repo — not fetched at runtime |

---

## Runtime Dependencies (Loaded by Browser)

| Resource | URL | Purpose |
|---|---|---|
| Google Fonts preconnect | fonts.googleapis.com, fonts.gstatic.com | Font loading optimization |
| Space Grotesk (400–700) | fonts.googleapis.com | Heading font |
| Manrope (400–800) | fonts.googleapis.com | Body font |

---

## Development / Build Dependencies

None. The project has no build step. Files are deployed as-is.

---

## Dependency Risk Assessment

| Dependency | Risk | Mitigation |
|---|---|---|
| Cloudflare Pages outage | Low — Cloudflare has 100% SLA commitment | Accept risk; no practical alternative at this tier |
| Resend outage | Medium — email delivery delays | Lead data is still captured in CF function logs; manually resend if needed |
| Google Fonts unavailability | Low | Fallback fonts are defined in CSS (`-apple-system, BlinkMacSystemFont, 'Segoe UI'`) |
| DC/Draftcode runtime breaking | High (if DC releases breaking changes to support.js) | support.js is pinned in the repo — do not auto-update |
| GitHub outage | Low | Cloudflare serves from cache during GitHub outages |

---

## Planned Future Dependencies

| Dependency | Version Target | Purpose | Decision |
|---|---|---|---|
| Analytics provider | V1.2 | Visitor analytics | [ADR-007 pending](../../CORE/DECISION_ENGINE.md) |
| Cloudflare Turnstile | V1.2 | Spam protection for contact form | [TASK-CF-001](TASKS.md) |
| CRM (HubSpot or other) | V1.3 | Lead management | [ADR-008 pending](../../CORE/DECISION_ENGINE.md) |
| Astro (if blog added) | V1.3 | Blog/content engine | [ADR-blog pending](DECISIONS.md) |

---

**Related:** [README](README.md) | [FILES](FILES.md) | [DECISIONS](DECISIONS.md) | [SYSTEM_ARCHITECTURE](../../CORE/SYSTEM_ARCHITECTURE.md)

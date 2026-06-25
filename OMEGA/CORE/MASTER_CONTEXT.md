# MASTER CONTEXT — Carriersfy AI

> Living document. Read this first. Last updated: 2026-06-25 | Owner: Juan

---

## QUICK STATE

| Dimension | Current State |
|---|---|
| Company stage | Early / active client acquisition |
| Team size | 1 founder (Juan) + AI workforce |
| Active clients | Brazil Signs, Marine Consolidated Electronics, Light of Life |
| Website status | [LIVE] — https://carriersfy.ai (V1.1) |
| Platform status | [PLANNED] — not yet built |
| Critical open item | Verify RESEND_API_KEY is set in Cloudflare Pages production environment |

---

## Active Projects

| Project | Status | URL / Location | Priority |
|---|---|---|---|
| Carriersfy AI Website | [LIVE] V1.1 | https://carriersfy.ai | Medium — maintenance mode |
| Carriersfy Platform | [PLANNED] | — | High — next major build |
| Brazil Signs | [UNKNOWN — NEEDS ASSESSMENT] | — | High |
| Marine Consolidated Electronics | [UNKNOWN — NEEDS ASSESSMENT] | — | High |
| Light of Life | [UNKNOWN — NEEDS ASSESSMENT] | — | Medium |
| Internal Infrastructure | [IN PROGRESS] | Cloudflare + GitHub | Ongoing |

---

## Active Clients

| Client | Industry | Stage | Primary Contact | Health |
|---|---|---|---|---|
| Brazil Signs | Signage / Print | Active — status TBD | Unknown — requires update | [NEEDS ASSESSMENT] |
| Marine Consolidated Electronics | Marine / Electronics | Active — status TBD | Unknown — requires update | [NEEDS ASSESSMENT] |
| Light of Life | Faith / Community | Active — status TBD | Unknown — requires update | [NEEDS ASSESSMENT] |

---

## Team

| Person / Agent | Role | Contact / Access |
|---|---|---|
| Juan | Founder, CEO, primary operator | juan@carriersfy.ai |
| Iron Prime | Sales AI — lead gen and qualification | See [AGENT_REGISTRY](AGENT_REGISTRY.md) |
| Sofia | Operations AI — client onboarding, scheduling | See [AGENT_REGISTRY](AGENT_REGISTRY.md) |
| Claude Code | Engineering AI — build, deploy, maintain | Anthropic CLI (claude-sonnet-4-6) |
| Claude Design | Design AI — UI/UX, assets | Anthropic (image-capable model) |

---

## Technology Stack

| Layer | Technology | Account / Access |
|---|---|---|
| Hosting / CDN | Cloudflare Pages | Juan's Cloudflare account |
| Serverless Functions | Cloudflare Pages Functions | Same account |
| Source Control | GitHub | lightofeternallifes-star (GitHub user) |
| Email Delivery | Resend | RESEND_API_KEY required in CF env vars |
| Verified Email Domain | leads@carriersfy.ai | Resend — carriersfy.ai domain verified |
| Website Runtime | DC/Draftcode (React UMD) | support.js in repo |
| Fonts | Google Fonts | Space Grotesk + Manrope |
| i18n | Custom translations.js | EN / PT / ES |

---

## Current Priorities (as of 2026-06-25)

1. **[CRITICAL]** Confirm RESEND_API_KEY is active in Cloudflare Pages production environment — contact form is wired but email delivery fails silently if this var is missing
2. **[HIGH]** Conduct discovery meetings with all three active clients to document current build status and pending deliverables
3. **[HIGH]** Begin scoping Carriersfy Platform MVP
4. **[MEDIUM]** Add analytics to the website (Cloudflare Web Analytics or Plausible — no cookie consent required)
5. **[LOW]** Plan V1.2 website features: blog, CRM integration, A/B testing

---

## Open Decisions

| Decision | Options | Owner | Target Date |
|---|---|---|---|
| Carriersfy Platform stack | Next.js + Supabase vs. Remix + PlanetScale vs. other | Juan | Q3 2026 |
| Analytics provider | Cloudflare Web Analytics vs. Plausible vs. PostHog | Juan | 2026-07-01 |
| CRM for lead tracking | HubSpot (free tier) vs. custom vs. Notion | Juan | 2026-07-15 |
| Iron Prime / Sofia deployment | Which platform hosts them | Juan | Q3 2026 |

---

## Email Infrastructure

```
Domain:     carriersfy.ai
MX / Email: Verified in Resend
From:       leads@carriersfy.ai (transactional — lead notifications)
Inbox:      juan@carriersfy.ai (primary), hello@carriersfy.ai (team)
Service:    Resend (resend.com)
Env var:    RESEND_API_KEY → set in Cloudflare Pages → Settings → Environment variables
```

---

## Brand Constants

```
Background:  #070B16
Blue accent: #1FA2FF
Red accent:  #FF2E3C
Text:        #F4F6FB
Fonts:       Space Grotesk (headings), Manrope (body)
Logo:        assets/carriersfy-emblem-core.png, assets/carriersfy-emblem.png
```

---

**Related:** [COMPANY_CONSTITUTION](COMPANY_CONSTITUTION.md) | [PROJECT_REGISTRY](PROJECT_REGISTRY.md) | [CLIENT_REGISTRY](CLIENT_REGISTRY.md) | [AGENT_REGISTRY](AGENT_REGISTRY.md) | [SYSTEM_ARCHITECTURE](SYSTEM_ARCHITECTURE.md)

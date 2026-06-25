# Roadmap — Carriersfy AI Website

> Last updated: 2026-06-25

---

## Version History

| Version | Status | Date | Theme |
|---|---|---|---|
| V1.0 | [DONE] | ~2026-06-20 | Initial build |
| V1.1 | [DONE] | 2026-06-23 | Launch |
| V1.1.1 | [DONE] | 2026-06-24 | Contact form fix |
| V1.2 | [PLANNED] | Q3 2026 | Analytics + micro-improvements |
| V1.3 | [PLANNED] | Q4 2026 | Blog / content engine |
| V2.0 | [PLANNED] | 2027 | Platform-integrated site |

---

## V1.2 — Analytics + Polish (Q3 2026)

**Goal:** Know who's visiting the site and where they come from. Fill in remaining content gaps.

| Feature | Priority | Notes |
|---|---|---|
| Analytics integration | P2 | Cloudflare Web Analytics (no cookies, free) or Plausible |
| Real case studies | P2 | Replace placeholder content with actual client stories |
| Testimonials | P2 | 2–3 client quotes |
| hreflang meta tags | P3 | Improve PT/ES SEO |
| Contact form rate limiting | P2 | Prevent spam — Cloudflare Rate Limiting or Turnstile CAPTCHA |
| Performance audit | P3 | Lighthouse score check |

---

## V1.3 — Content Engine (Q4 2026)

**Goal:** Add a blog to drive organic SEO traffic. Establish thought leadership in AI workforce space.

| Feature | Priority | Notes |
|---|---|---|
| Blog / articles | P1 | Requires framework migration (Astro recommended) |
| SEO metadata system | P1 | Open Graph, Twitter Cards, structured data |
| Email newsletter signup | P2 | Capture visitors before they leave |
| CRM integration | P2 | Connect contact form directly to HubSpot or similar |
| A/B testing | P3 | Test different hero copy and CTAs |

**Architecture note:** Adding a blog likely requires migrating from the current DC/Draftcode static HTML to Astro (static + MDX blog support). This is a significant architectural change — requires a dedicated ADR. See [DECISION_ENGINE](../../CORE/DECISION_ENGINE.md).

---

## V2.0 — Platform-Integrated Site (2027)

**Goal:** The marketing site becomes the front door to the Carriersfy Platform — authenticated clients log in, manage AI employees, see reports.

| Feature | Priority | Notes |
|---|---|---|
| Client portal (authenticated) | P1 | Login → dashboard → AI employee management |
| Public case study library | P1 | Auto-generated from Platform data |
| AI employee showcase | P1 | Browse available AI employees by role/industry |
| Pricing calculator | P2 | Interactive ROI calculator |
| Full API integration | P1 | Site pulls live data from Carriersfy Platform |

---

**Related:** [README](README.md) | [TASKS](TASKS.md) | [DECISIONS](DECISIONS.md) | [CHANGELOG](CHANGELOG.md) | [ROADMAP_ENGINE](../../CORE/ROADMAP_ENGINE.md)

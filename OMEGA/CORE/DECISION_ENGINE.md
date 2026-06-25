# DECISION ENGINE — Carriersfy AI

> Architectural Decision Records (ADRs) for all significant technical and business decisions. Last updated: 2026-06-25

---

## ADR Template

```
### ADR-XXX: [Decision Title]
- **Date:** YYYY-MM-DD
- **Status:** [ACCEPTED | DEPRECATED | SUPERSEDED by ADR-XXX]
- **Decider:** [Person or team]
- **Context:** Why this decision was needed
- **Decision:** What was chosen
- **Alternatives Considered:** What else was evaluated
- **Consequences:** What this enables and what it forecloses
- **Affected Projects:** Links to relevant project docs
```

---

## Decision Log

### ADR-001: Cloudflare Pages for Website Hosting
- **Date:** 2026-06-23 (estimated — initial launch)
- **Status:** ACCEPTED
- **Decider:** Juan
- **Context:** Needed zero-infrastructure hosting for a static marketing site with serverless function capability for the contact form.
- **Decision:** Cloudflare Pages — serves static files from Cloudflare's global edge network, supports Pages Functions (Cloudflare Workers) for backend logic, free tier covers all current traffic needs.
- **Alternatives Considered:**
  - Vercel: Similar capability, but Cloudflare gives tighter integration with DNS (carriersfy.ai is already on Cloudflare)
  - Netlify: No meaningful advantage over Cloudflare given DNS situation
  - AWS S3 + CloudFront: Overkill complexity for a static site
- **Consequences:**
  - ✅ Zero cold starts (Cloudflare Workers run at edge)
  - ✅ Free SSL, automatic CDN, 100% uptime SLA
  - ✅ Deploy via GitHub push
  - ⚠️ Pages Functions have limited runtime capabilities vs. full Node.js (no `require()`, no npm packages without bundling)
- **Affected Projects:** [Carriersfy AI Website](../PROJECTS/Carriersfy_AI_Website/README.md)

---

### ADR-002: Resend for Transactional Email
- **Date:** 2026-06-24
- **Status:** ACCEPTED
- **Decider:** Juan (implemented by Claude Code)
- **Context:** Contact form fix required an email delivery service. Previous state: contact form had no backend at all — zero network calls were being made.
- **Decision:** Resend (resend.com) — modern email API with clean DX, excellent deliverability, generous free tier (3,000 emails/month), and dead-simple REST API compatible with Cloudflare Workers (no Node.js dependencies).
- **Alternatives Considered:**
  - SendGrid: Heavier, more complex, worse DX
  - Mailgun: Older API design, more setup friction
  - AWS SES: Requires IAM, complex setup, overkill
  - Postmark: Good but pricier for low volume
- **Consequences:**
  - ✅ Works natively in Cloudflare Workers (fetch-based API)
  - ✅ Free tier more than sufficient for current lead volume
  - ✅ leads@carriersfy.ai verified sender domain
  - ⚠️ RESEND_API_KEY must be set in Cloudflare Pages environment variables — if missing, form silently fails from user's perspective (returns 500)
- **Affected Projects:** [Carriersfy AI Website](../PROJECTS/Carriersfy_AI_Website/README.md), [Internal Infrastructure](../PROJECTS/Internal_Infrastructure/README.md)

---

### ADR-003: DC/Draftcode (Draftcode Runtime) Over Framework
- **Date:** 2026-06-23 (estimated — initial build)
- **Status:** ACCEPTED
- **Decider:** Juan
- **Context:** Website needed to be built rapidly with high visual quality. Design was created in DC/Draftcode design tool which exports support.js as a React UMD runtime.
- **Decision:** Keep the DC/Draftcode-generated support.js as the runtime. Site is delivered as a single index.html with an inline DC component tree, rendered by the support.js runtime.
- **Alternatives Considered:**
  - Next.js: Heavy framework, overkill for a marketing site, adds complexity for no benefit
  - Pure HTML/CSS: Would have required significant redesign from the DC export format
  - Astro: Clean option but would require manual port of the DC design
- **Consequences:**
  - ✅ Rapid initial delivery from design to production
  - ✅ Zero build step — files deploy as-is
  - ⚠️ support.js is a generated runtime — it is opaque and should not be manually edited
  - ⚠️ Adding components requires understanding DC syntax or editing raw HTML attributes
  - ⚠️ If DC/Draftcode changes its runtime format, upgrades are non-trivial
- **Affected Projects:** [Carriersfy AI Website](../PROJECTS/Carriersfy_AI_Website/README.md)

---

### ADR-004: Multilingual Strategy (EN / PT / ES)
- **Date:** 2026-06-23 (estimated)
- **Status:** ACCEPTED
- **Decider:** Juan
- **Context:** Carriersfy AI targets both U.S. and Brazilian markets. Many U.S.-based Latin American business owners also prefer Spanish.
- **Decision:** Ship three language tracks (English, Portuguese, Spanish) via a custom translations.js system. Language is toggled client-side without a page reload.
- **Alternatives Considered:**
  - English only: Excludes Brazilian market and Spanish-speaking U.S. prospects
  - Separate domains (carriersfy.ai / carriersfy.com.br): More complex, harder to maintain
  - i18n framework (i18next etc.): Over-engineered for a static site
- **Consequences:**
  - ✅ Single deployment serves three language markets
  - ✅ No server-side rendering needed for i18n
  - ⚠️ All three translations must be kept in sync in translations.js when copy changes
  - ⚠️ SEO for PT/ES is limited without separate URLs or hreflang (future: consider adding hreflang meta tags)
- **Affected Projects:** [Carriersfy AI Website](../PROJECTS/Carriersfy_AI_Website/README.md)

---

### ADR-005: Static File Architecture Over CMS
- **Date:** 2026-06-23 (estimated)
- **Status:** ACCEPTED
- **Decider:** Juan
- **Context:** Marketing site content changes infrequently. No non-technical team members need to edit content.
- **Decision:** Pure static files. No CMS, no headless CMS, no database.
- **Alternatives Considered:**
  - Contentful / Sanity: Unnecessary overhead for a founder-operated site
  - WordPress: Security liability, performance overhead, fundamentally wrong tool
  - Astro + MDX: Would be a good option if blog is added (revisit at V1.2)
- **Consequences:**
  - ✅ Maximum performance — no server rendering, no DB queries
  - ✅ Zero attack surface (no login, no admin panel)
  - ✅ Free hosting forever on Cloudflare Pages free tier
  - ⚠️ Content updates require a code push (acceptable for current team)
  - ⚠️ Adding a blog requires a framework migration (Astro recommended — see ROADMAP)
- **Affected Projects:** [Carriersfy AI Website](../PROJECTS/Carriersfy_AI_Website/README.md)

---

## Pending Decisions

| ID | Decision Needed | Options | Owner | Deadline |
|---|---|---|---|---|
| ADR-006 | Carriersfy Platform tech stack | Next.js+Supabase, Remix+PlanetScale, other | Juan | Q3 2026 |
| ADR-007 | Analytics provider for website | CF Web Analytics, Plausible, PostHog | Juan | 2026-07-01 |
| ADR-008 | CRM for lead / client tracking | HubSpot free, Notion DB, custom | Juan | 2026-07-15 |
| ADR-009 | AI employee hosting platform | Which infra runs Iron Prime & Sofia | Juan | Q3 2026 |
| ADR-010 | Blog / content engine architecture | Astro+MDX migration, Next.js, stay static | Juan | Q4 2026 |

---

**Related:** [MASTER_CONTEXT](MASTER_CONTEXT.md) | [SYSTEM_ARCHITECTURE](SYSTEM_ARCHITECTURE.md) | [OPERATING_RULES](OPERATING_RULES.md) | [Carriersfy Website Decisions](../PROJECTS/Carriersfy_AI_Website/DECISIONS.md)

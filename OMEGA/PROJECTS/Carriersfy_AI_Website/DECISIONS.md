# Decisions — Carriersfy AI Website

> Project-level architectural decisions. Full ADR log: [DECISION_ENGINE](../../CORE/DECISION_ENGINE.md) | Last updated: 2026-06-25

---

## Decision Index

| ADR | Decision | Status | Date |
|---|---|---|---|
| [ADR-001](../../CORE/DECISION_ENGINE.md) | Cloudflare Pages for hosting | ACCEPTED | ~2026-06-23 |
| [ADR-002](../../CORE/DECISION_ENGINE.md) | Resend for email delivery | ACCEPTED | 2026-06-24 |
| [ADR-003](../../CORE/DECISION_ENGINE.md) | DC/Draftcode runtime over framework | ACCEPTED | ~2026-06-23 |
| [ADR-004](../../CORE/DECISION_ENGINE.md) | EN/PT/ES multilingual strategy | ACCEPTED | ~2026-06-23 |
| [ADR-005](../../CORE/DECISION_ENGINE.md) | Static files over CMS | ACCEPTED | ~2026-06-23 |
| ADR-007 (pending) | Analytics provider | PENDING | By 2026-07-01 |
| ADR-blog (pending) | Blog framework (Astro vs. other) | PENDING | Q4 2026 |

---

## Key Rationale Summary

### Why Cloudflare Pages?
carriersfy.ai is already on Cloudflare DNS. Hosting on Cloudflare Pages means zero-latency DNS resolution, automatic SSL, global CDN, and serverless functions (Workers) — all free at current traffic levels. The deployment pipeline is a GitHub push. No ops overhead.

### Why Resend?
The previous contact form had zero backend — it faked the success state with a DOM manipulation. Resend was chosen because its REST API works natively in Cloudflare Workers (no npm, no build step). Excellent deliverability, generous free tier, clean DX.

### Why Not Next.js / React App?
The website was designed in DC/Draftcode, which exports a support.js runtime and a structured component tree in index.html. Converting to Next.js would require manually porting every component. The static-file approach has better performance, simpler deployment, and zero attack surface. Re-evaluate for V2.0 when platform integration is needed.

### Why Three Languages?
Brazil is a strategic market for Carriersfy AI. Many U.S. target customers have Latin American business operations or are themselves Latin American founders. English + Portuguese + Spanish covers the primary Americas corridor. Cost: one translations.js file. Benefit: structural advantage over English-only competitors.

### Why Static Files Over CMS?
Content changes infrequently. The founding team (currently Juan + AI employees) can edit HTML directly or push code changes. A CMS adds login attack surface, maintenance overhead, and often requires a database. Not worth it for a founder-operated site. Revisit if a content team grows or a blog is added.

---

## Pending Decisions

### Blog Framework (Q4 2026)
Adding a blog requires a decision on whether to:
1. **Migrate to Astro** — best-in-class static site generator with MDX blog support, keeps Cloudflare Pages hosting, requires porting the current design as Astro components
2. **Add a headless CMS** (Contentful / Sanity) with a separate blog subdomain — simpler migration but more infrastructure
3. **Use Cloudflare Pages' native markdown** — limited but zero-dependency

Recommendation: Astro when ready. Decision should be made as part of V1.3 planning.

---

**Related:** [README](README.md) | [DECISION_ENGINE](../../CORE/DECISION_ENGINE.md)

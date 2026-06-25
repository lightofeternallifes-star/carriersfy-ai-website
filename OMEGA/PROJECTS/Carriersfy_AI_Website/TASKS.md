# Tasks — Carriersfy AI Website

> Last updated: 2026-06-25 | Full task engine: [TASK_ENGINE](../../CORE/TASK_ENGINE.md)

---

## Open Tasks

### [P0] TASK-001: Verify RESEND_API_KEY in Production
- **Status:** [IN PROGRESS]
- **Assigned:** Juan
- **Due:** 2026-06-26
- **Steps:**
  1. Log into Cloudflare Pages dashboard
  2. Select Carriersfy AI Website project
  3. Settings → Environment Variables
  4. Confirm `RESEND_API_KEY` is present for Production environment
  5. Submit a real test lead through https://carriersfy.ai
  6. Confirm email arrives at juan@carriersfy.ai and hello@carriersfy.ai
- **If key is missing:** Generate a new API key at resend.com → Add to CF env vars → Redeploy

---

### [P2] TASK-006: Add Website Analytics
- **Status:** [BACKLOG]
- **Assigned:** Claude Code
- **Due:** 2026-07-15
- **Description:** Add privacy-respecting analytics. No cookie consent required.
- **Recommendation:** Cloudflare Web Analytics (free, no JS added, CF-native) or Plausible (~$9/mo, better UI)
- **Acceptance:** Dashboard live and showing visitor data. Provider decision documented as ADR-007.

---

### [P2] TASK-011: Add Cloudflare Turnstile to Contact Form
- **Status:** [BACKLOG]
- **Canonical:** [TASK-011](../../CORE/TASK_ENGINE.md)
- **Assigned:** Claude Code
- **Due:** Q3 2026
- **Description:** Add Turnstile CAPTCHA (Cloudflare's privacy-friendly CAPTCHA) to prevent spam leads from the contact form.
- **Acceptance:** Form protected. Spam submissions rejected. No impact on real lead conversions.

---

### [P3] TASK-010: Add hreflang Tags for PT/ES SEO
- **Status:** [BACKLOG]
- **Canonical:** [TASK-010](../../CORE/TASK_ENGINE.md)
- **Assigned:** Claude Code
- **Due:** Q4 2026
- **Description:** Current multilingual site has no hreflang meta tags. PT and ES visitors may not be discovered by Google for their language.
- **Implementation:** Add `<link rel="alternate" hreflang="pt" href="https://carriersfy.ai/?lang=pt">` etc. to `<head>` in index.html.

---

### [P3] TASK-012: Replace Placeholder Case Studies with Real Client Stories
- **Status:** [BLOCKED]
- **Canonical:** [TASK-012](../../CORE/TASK_ENGINE.md)
- **Blocked by:** Client discovery meetings (TASK-002, TASK-003, TASK-004 in TASK_ENGINE)
- **Assigned:** Juan + Claude Design
- **Description:** Current case studies are placeholder content. Replace with real deliverables from Brazil Signs, Marine, Light of Life.

---

## Completed Tasks

| Task | Description | Completed | Done By |
|---|---|---|---|
| Contact form backend | Created `functions/api/contact.js` with Resend integration | 2026-06-24 | Claude Code |
| V1.1 Launch | Website launched at carriersfy.ai | 2026-06-23 | Juan |
| Language toggle | EN/PT/ES i18n via translations.js | ~2026-06-20 | Juan (DC design) |
| Particle animation | Canvas-based particle system in hero | ~2026-06-20 | Juan (DC design) |
| Mobile responsive | Breakpoints at 880px, 920px, 760px | ~2026-06-20 | Juan (DC design) |

---

**Related:** [README](README.md) | [CURRENT_STATUS](CURRENT_STATUS.md) | [TASK_ENGINE](../../CORE/TASK_ENGINE.md)

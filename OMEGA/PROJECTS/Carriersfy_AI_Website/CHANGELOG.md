# Changelog — Carriersfy AI Website

> All notable changes to the Carriersfy AI website. Last updated: 2026-06-25

---

## [V1.1.1] — 2026-06-24 — Contact Form Fix

**Type:** Bug fix / Critical infrastructure

**Changes:**
- Created `functions/api/contact.js` — Cloudflare Pages Function handling `POST /api/contact`
  - Validates `Content-Type: application/json`
  - Requires `name` (string) and `email` (valid email format)
  - Optional fields: `business`, `phone`, `industry`, `message`
  - HTML-escapes all fields before rendering in email body
  - Calls Resend API: `https://api.resend.com/emails`
  - FROM: `Carriersfy AI Leads <leads@carriersfy.ai>`
  - TO: `juan@carriersfy.ai`, `hello@carriersfy.ai`
  - Returns `{ success: true }` on success, `{ error: "..." }` on failure
- Updated `handleContact()` in `index.html` to:
  - Be an `async` function
  - Call `fetch('/api/contact', { method: 'POST', ... })` with JSON body
  - Show success state only after confirmed 200 response
  - Show `#cf-formerror` element on non-200 response

**Root cause of bug:** The original `handleContact()` called `preventDefault()` then immediately hid the form and showed a success message with zero network activity — a completely fake submission. No lead data was ever captured or emailed.

**Done by:** Claude Code

---

## [V1.1] — 2026-06-23 — Public Launch

**Type:** Launch

**Changes:**
- Website launched at https://carriersfy.ai on Cloudflare Pages
- All sections live: Hero, Platform, Industries, Case Studies, Process, Contact
- Language toggle deployed: EN/PT/ES via translations.js
- Particle canvas animation in hero section
- Mobile responsive layout (breakpoints: 920px hero, 880px nav, 760px i18n labels)
- Custom scrollbar (Carriersfy branded)
- Navigation with smooth scroll anchors

**Done by:** Juan (DC/Draftcode design export)

---

## [V1.0] — ~2026-06-20 — Initial Build

**Type:** Initial design and build

**Changes:**
- Initial design created in DC/Draftcode
- Core sections designed: Hero, Platform, Industries, Process, Contact form
- Brand system established: #070B16 background, #1FA2FF blue, #FF2E3C red
- Typography: Space Grotesk + Manrope via Google Fonts
- Logo assets: carriersfy-emblem-core.png, carriersfy-emblem.png
- support.js runtime exported from DC
- translations.js created with initial EN strings

**Done by:** Juan

---

## Upcoming

| Version | Type | Expected Date |
|---|---|---|
| V1.2 | Feature — analytics, polish | Q3 2026 |
| V1.3 | Feature — blog, CRM | Q4 2026 |
| V2.0 | Major — platform integration | 2027 |

---

**Related:** [README](README.md) | [ROADMAP](ROADMAP.md) | [CURRENT_STATUS](CURRENT_STATUS.md)

# Carriersfy AI Website

> Project README | Status: [LIVE] V1.1.1 | Last updated: 2026-06-25

---

## Overview

The Carriersfy AI marketing website is the primary public presence and lead generation engine for the company. It communicates the Carriersfy AI value proposition, showcases the platform and industries served, and captures inbound leads via a contact form.

---

## Key Facts

| Field | Value |
|---|---|
| **Live URL** | https://carriersfy.ai |
| **Status** | [LIVE] — Version 1.1.1 |
| **Repository** | `/Users/batman/Downloads/CARRIERSFY_AI_WEBSITE_V1.1_FINAL` (local) / GitHub: lightofeternallifes-star |
| **Hosting** | Cloudflare Pages (auto-deploy from GitHub main) |
| **Primary Owner** | Juan (juan@carriersfy.ai) |
| **Engineering** | Claude Code (Anthropic CLI) |
| **Design** | DC/Draftcode export + Claude Design |
| **Languages** | English (EN), Portuguese (PT), Spanish (ES) |

---

## Tech Stack

| Layer | Technology |
|---|---|
| HTML/Structure | Single `index.html` — DC/Draftcode component tree |
| Runtime | `support.js` — DC/Draftcode runtime (React UMD) — do not manually edit |
| i18n | `translations.js` — client-side language toggle (EN/PT/ES) |
| Functions | Cloudflare Pages Functions — `functions/api/contact.js` |
| Email | Resend API — `leads@carriersfy.ai` → `juan@carriersfy.ai` + `hello@carriersfy.ai` |
| Fonts | Google Fonts — Space Grotesk + Manrope |
| CDN / Hosting | Cloudflare Pages (global edge) |
| Source control | GitHub |

---

## Critical Dependency

`RESEND_API_KEY` must be set in Cloudflare Pages → Settings → Environment Variables for the contact form to send emails. Without it, all form submissions silently fail with a 500 error.

See [TASK-001](../../CORE/TASK_ENGINE.md) — verify this immediately.

---

## What It Does

1. **Hero section** — Communicates the AI workforce value proposition
2. **Platform section** — Details Carriersfy AI platform capabilities
3. **Industries section** — Shows target verticals
4. **Case Studies section** — Social proof (placeholder until real cases ready)
5. **Process section** — How Carriersfy AI works (discovery → build → deploy → manage)
6. **Contact form** — Lead capture → Cloudflare function → Resend → email notification

---

## Related OMEGA Files

- [CURRENT_STATUS](CURRENT_STATUS.md) | [ROADMAP](ROADMAP.md) | [TASKS](TASKS.md) | [DECISIONS](DECISIONS.md) | [FILES](FILES.md) | [DEPENDENCIES](DEPENDENCIES.md) | [CHANGELOG](CHANGELOG.md)
- [PROJECT_REGISTRY entry](../../CORE/PROJECT_REGISTRY.md)
- [SYSTEM_ARCHITECTURE](../../CORE/SYSTEM_ARCHITECTURE.md)
- [MASTER_CONTEXT](../../CORE/MASTER_CONTEXT.md)

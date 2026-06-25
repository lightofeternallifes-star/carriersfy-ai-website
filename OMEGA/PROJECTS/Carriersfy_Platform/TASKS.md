# Tasks — Carriersfy Platform

> Last updated: 2026-06-25 | Full task engine: [TASK_ENGINE](../../CORE/TASK_ENGINE.md)

---

## Open Tasks

### [P1] TASK-005: Scope Carriersfy Platform MVP
- **Status:** [PLANNED]
- **Assigned:** Juan + Claude Code
- **Due:** 2026-07-31
- **Steps:**
  1. Define MVP feature list (use [ROADMAP](ROADMAP.md) Phase 1 as starting point)
  2. Resolve ADR-006 — tech stack decision
  3. Estimate build timeline for MVP
  4. Document final MVP scope in this file and in ROADMAP.md
- **Acceptance:** MVP feature list locked, tech stack decided, kickoff ready

---

### [P1] ADR-006: Decide Tech Stack
- **Status:** [PLANNED]
- **Assigned:** Juan
- **Due:** 2026-07-31
- **Options to evaluate:**
  - **Next.js + Supabase** — Next.js for SSR/API routes, Supabase for Postgres + auth. Mature, well-documented.
  - **Remix + PlanetScale** — Remix for progressive enhancement, PlanetScale for MySQL. Excellent for form-heavy apps.
  - **Astro + CF D1** — Astro for static + islands, Cloudflare D1 (SQLite at edge) for data. Keeps everything in CF ecosystem.
  - **SvelteKit + Supabase** — Fast, lightweight, excellent DX.
- **Recommendation:** Next.js + Supabase — largest talent pool, most AI-generated code examples, battle-tested at scale.

---

### [P2] TASK-PLT-001: Create GitHub Repository
- **Status:** [BLOCKED by TASK-005]
- **Assigned:** Juan / Claude Code
- **Due:** Q3 2026 (after stack decided)

### [P2] TASK-PLT-002: Set Up Cloudflare Pages Deployment
- **Status:** [BLOCKED by ADR-006]
- **Assigned:** Claude Code
- **Due:** Q3 2026

### [P2] TASK-PLT-003: Design Database Schema
- **Status:** [BLOCKED by ADR-006]
- **Assigned:** Claude Code
- **Due:** Q3 2026

---

## Completed Tasks

None yet.

---

**Related:** [README](README.md) | [ROADMAP](ROADMAP.md) | [TASK_ENGINE](../../CORE/TASK_ENGINE.md)

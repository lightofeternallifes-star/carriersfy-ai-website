# SYSTEM ARCHITECTURE — Carriersfy AI

> Technical architecture across all deployments. Last updated: 2026-06-25

---

## Current Architecture (2026-06-25)

```
┌─────────────────────────────────────────────────────────────────────┐
│                     CARRIERSFY AI SYSTEMS                           │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                   PUBLIC INTERNET                           │   │
│  │                                                             │   │
│  │   User → carriersfy.ai (DNS: Cloudflare)                   │   │
│  │            ↓                                                │   │
│  │   Cloudflare CDN → Edge Cache (Global)                     │   │
│  │            ↓                                                │   │
│  │   ┌─────────────────────────────────────────────────┐      │   │
│  │   │        CLOUDFLARE PAGES                         │      │   │
│  │   │                                                  │      │   │
│  │   │  Static Assets (index.html, support.js,          │      │   │
│  │   │  translations.js, assets/, _headers)             │      │   │
│  │   │                                                  │      │   │
│  │   │  ┌─────────────────────────────────────────┐    │      │   │
│  │   │  │  CLOUDFLARE PAGES FUNCTION              │    │      │   │
│  │   │  │  /api/contact (POST)                    │    │      │   │
│  │   │  │  → functions/api/contact.js             │    │      │   │
│  │   │  │  → Validates input                      │    │      │   │
│  │   │  │  → Reads RESEND_API_KEY from env        │    │      │   │
│  │   │  │  → POST to api.resend.com/emails        │    │      │   │
│  │   │  └─────────────────────────────────────────┘    │      │   │
│  │   └─────────────────────────────────────────────────┘      │   │
│  │            ↓                                                │   │
│  │   ┌─────────────────────────────────────────────────┐      │   │
│  │   │        RESEND EMAIL API                         │      │   │
│  │   │  FROM: leads@carriersfy.ai                     │      │   │
│  │   │  TO: juan@carriersfy.ai + hello@carriersfy.ai  │      │   │
│  │   └─────────────────────────────────────────────────┘      │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │               SOURCE CONTROL                                │   │
│  │  GitHub: lightofeternallifes-star                          │   │
│  │  Repo: CARRIERSFY_AI_WEBSITE_V1.1_FINAL (main branch)     │   │
│  │  CI/CD: GitHub → Cloudflare Pages (auto-deploy on push)   │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │               AI WORKFORCE (PLANNED)                        │   │
│  │  Iron Prime → [hosting TBD]                                │   │
│  │  Sofia      → [hosting TBD]                                │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Layer-by-Layer Breakdown

### DNS & Domain
| Domain | Registrar | DNS Provider | Records |
|---|---|---|---|
| carriersfy.ai | Unknown (likely Cloudflare) | Cloudflare | A/CNAME → CF Pages, MX → Resend/email |

### CDN & Hosting
| Service | Provider | Plan | Region |
|---|---|---|---|
| Static hosting | Cloudflare Pages | Free tier | Global edge (200+ PoPs) |
| CDN | Cloudflare | Automatic (bundled) | Global |
| SSL | Cloudflare | Auto-provisioned (Let's Encrypt via CF) | — |

### Serverless Functions
| Endpoint | File | Runtime | Trigger |
|---|---|---|---|
| `POST /api/contact` | `functions/api/contact.js` | Cloudflare Workers (V8 isolate) | HTTP POST from contact form |

**Function constraints:**
- No npm packages unless bundled (Wrangler not used — plain ES module)
- No `require()` — use `import` or native `fetch`
- No persistent storage — stateless
- Max execution: 50ms CPU (free tier)
- Environment variables: set in CF Pages dashboard → Settings → Environment Variables

### Email Infrastructure
| Layer | Detail |
|---|---|
| Service | Resend (resend.com) |
| API | `https://api.resend.com/emails` (REST) |
| Auth | `RESEND_API_KEY` (Bearer token, set as CF env var) |
| Verified sender | `leads@carriersfy.ai` |
| Recipients | `juan@carriersfy.ai`, `hello@carriersfy.ai` |
| Volume | ~0–50 emails/month expected (lead notifications) |
| Free tier limit | 3,000 emails/month, 100/day |

### Source Control & CI/CD
| Layer | Detail |
|---|---|
| Git host | GitHub |
| User | lightofeternallifes-star |
| Branch | main (production) |
| Deploy trigger | Push to main → Cloudflare Pages auto-builds |
| Build command | None (static files — no build step) |
| Output directory | `/` (root) |

---

## Environment Variables

| Variable | Value | Where Set | Project |
|---|---|---|---|
| `RESEND_API_KEY` | [secret — from Resend dashboard] | Cloudflare Pages → Settings → Environment Variables | Carriersfy AI Website |

---

## Planned Architecture (Carriersfy Platform)

```
[PLANNED — Q4 2026]

User (admin/client) → Platform URL
         ↓
   Cloudflare Pages (frontend)
         ↓
   API Layer (TBD: CF Workers / Remix / Next.js API routes)
         ↓
   Database (TBD: Supabase / PlanetScale / D1)
         ↓
   AI Employee Layer
   ├── Iron Prime (sales workflows)
   └── Sofia (client ops workflows)
         ↓
   External Integrations
   ├── CRM (TBD)
   ├── Calendar (Google / Calendly)
   └── Email (Resend)
```

---

## Security Posture

| Concern | Current Mitigation |
|---|---|
| XSS on contact form | HTML escaping in `escapeHtml()` in `contact.js` before email render |
| CSRF | Contact form is JSON API — not form-encoded, CORS enforced via content-type check |
| Email injection | Inputs sanitized with `escapeHtml()` |
| API key exposure | `RESEND_API_KEY` stored as CF environment variable — never committed to Git |
| DDoS | Cloudflare DDoS protection active at DNS layer |
| Rate limiting | Not yet implemented — add before platform launch |
| Auth | No auth on current site — not needed for marketing site |

---

## Future Architecture Decisions Required

| Decision | Impact | See |
|---|---|---|
| Platform tech stack | Foundation of the entire platform | [ADR-006](DECISION_ENGINE.md) |
| Database provider | Data persistence, scalability | [ADR-006](DECISION_ENGINE.md) |
| AI employee hosting | Iron Prime + Sofia deployment | [ADR-009](DECISION_ENGINE.md) |
| Rate limiting | Protect contact form from spam | [TASK-006 adjacent](TASK_ENGINE.md) |
| Monitoring / alerting | Know when things break | [ADR pending] |

---

**Related:** [MASTER_CONTEXT](MASTER_CONTEXT.md) | [DECISION_ENGINE](DECISION_ENGINE.md) | [Internal Infrastructure Project](../PROJECTS/Internal_Infrastructure/README.md) | [Carriersfy Website FILES](../PROJECTS/Carriersfy_AI_Website/FILES.md)

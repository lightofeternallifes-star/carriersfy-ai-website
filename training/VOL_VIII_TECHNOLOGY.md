---
volume: VIII
title: Technology — Stack, Architecture, Integrations, and Security
classification: internal_training
version: 1.0.0
created: 2026-06-26
status: production
languages: [EN]
training_targets: [Claude, ChatGPT, Gemini, Human Engineering Team, Future AI Employees]
---

# CARRIERSFY AI
## OFFICIAL CORPORATE DOCUMENTATION
### VOLUME VIII — TECHNOLOGY

**Classification:** Internal — AI Training Use  
**Version:** 1.0.0 | 2026  
**Authority:** This is the definitive technology reference for all AI agents and engineering team members. Internal documents may reference specific technology providers by name.

---

## TABLE OF CONTENTS

1. Technology Philosophy
2. Current Technology Stack
3. Integration Architecture
4. Security Architecture
5. Environment Variables Reference
6. Deployment Architecture
7. Performance Architecture
8. Future Technology Roadmap
9. Technology Governance
10. FAQs
11. Glossary

---

## CHAPTER 1: TECHNOLOGY PHILOSOPHY

### 1.1 Technology Serves the Business

Every technology decision at Carriersfy AI must answer: **Does this serve the business outcomes we're delivering for clients?** Technology that doesn't serve the mission doesn't belong.

### 1.2 Provider Independence as a Strategic Asset

Sophia Core™ is designed to be provider-independent. This means:
- No business logic depends on a single AI vendor
- No product capability is locked to one cloud provider
- Clients' Digital Employees can be migrated between providers without changing how they behave

**Why this matters:** AI provider pricing, capabilities, and availability change. A Digital Workforce that depends on one vendor inherits all of that vendor's instability. Provider independence is not a technical nice-to-have — it is a business continuity requirement.

### 1.3 Simplest Architecture That Works → Then Scale

The current MVP uses the simplest architecture that delivers real value:
- Static HTML site deployed to Cloudflare Pages
- Two Cloudflare Functions (contact, chat)
- Client-side JavaScript for Sophia's chat interface

When the business requires more, the architecture evolves. Complexity is earned, not assumed.

### 1.4 Security by Design

Security is built into every layer:
- Secrets in environment variables, never in code
- OMEGA directory blocked at infrastructure level
- Rate limiting required on all AI endpoints (current gap — addressed in v1.2)
- Access controlled at the GitHub + Cloudflare level

### 1.5 Technology Decisions Are Architecture Decisions

No significant technology change happens without:
1. A documented Architecture Decision Record (ADR)
2. Assessment of provider lock-in risk
3. Security review
4. Client impact assessment (for changes to production)

---

## CHAPTER 2: CURRENT TECHNOLOGY STACK

### 2.1 Website and Infrastructure

| Layer | Technology | Purpose |
|---|---|---|
| Hosting | Cloudflare Pages | Static site hosting + auto-deploy |
| Domain | carriersfy.ai | Production domain |
| DNS | Cloudflare | Domain resolution + proxy |
| CDN | Cloudflare global network | Global content delivery |
| Functions | Cloudflare Pages Functions | Serverless backend at edge |
| Source control | GitHub (lightofeternallifes-star) | Version control + CI/CD trigger |
| Branch: main | Auto-deploys to production | Every push to main triggers deploy |
| Branch: feat/* | Preview deploys | Feature testing before production |

**Deployment trigger:** Every `git push origin main` automatically triggers Cloudflare Pages build and deployment. No manual deployment step required.

### 2.2 Website Technology

**Core files (NEVER MODIFY):**

| File | Technology | Rule |
|---|---|---|
| `support.js` | DC/Draftcode React UMD runtime | NEVER edit — auto-generated |
| `translations.js` | i18n string table (EN/PT/ES) | NEVER edit — managed by DC/Draftcode |
| `index.html` | DC/Draftcode component output | NEVER edit directly — use DC/Draftcode tool |

**Safe to modify:**

| File | Purpose | Edit Rules |
|---|---|---|
| `sophia-chat.js` | Sophia chat enhancement (client-side) | Modify with care — test thoroughly |
| `functions/api/contact.js` | Lead capture backend | Modify only with explicit scope |
| `functions/api/chat.js` | Sophia AI chat backend | Modify with explicit scope |
| `_headers` | Cloudflare security headers | Modify with security review |
| `robots.txt` | Crawl rules | Modify to add/remove protected paths |

**DC/Draftcode runtime:**  
The site runs on a proprietary React UMD bundle. `support.js` loads React and all components. `index.html` contains the DC component tree. Any direct edit to these files will break the site. All visual changes must go through the DC/Draftcode design tool.

**sophia-chat.js:**  
Client-side JavaScript that injects Sophia's chat interface into the existing DC-generated modal. Uses `MutationObserver` to watch for the modal element created by the DC runtime, then replaces the static button panel with a full chat UI. All styles are inline (no external CSS dependencies).

### 2.3 Backend Functions

**`/api/contact` — Lead Capture**

| Property | Value |
|---|---|
| File | `functions/api/contact.js` |
| Method | POST |
| Purpose | Receive lead form submissions, send email notifications |
| Email provider | Resend API |
| From | `leads@carriersfy.ai` |
| To | `juan@carriersfy.ai` + `hello@carriersfy.ai` |
| Required env var | `RESEND_API_KEY` |
| Fields accepted | name, email, phone, business, industry, message, sophiaPipeline, aiEmployeeBuilder, appBuilder, employeeFactory |

**`/api/chat` — Sophia AI Chat**

| Property | Value |
|---|---|
| File | `functions/api/chat.js` |
| Method | POST |
| Purpose | Process Sophia conversations via Anthropic API |
| AI provider | Anthropic |
| Model | `claude-haiku-4-5-20251001` |
| Max tokens | 400 |
| Temperature | 0.7 |
| Required env var | `ANTHROPIC_API_KEY` |
| Context window | Last 6 turns (12 messages) |
| CORS | Currently `*` (open — should be restricted to `https://carriersfy.ai`) |

### 2.4 Email Infrastructure

| Property | Value |
|---|---|
| Provider | Resend |
| Sending domain | carriersfy.ai |
| From address | leads@carriersfy.ai |
| Primary recipient | juan@carriersfy.ai |
| Secondary recipient | hello@carriersfy.ai |
| API key | RESEND_API_KEY (Cloudflare Pages env var) |
| Current usage | Lead capture notifications only |
| Future usage | Client reports, automated follow-up, marketing |

### 2.5 AI Infrastructure

| Property | Value |
|---|---|
| Current provider | Anthropic |
| Model in use | claude-haiku-4-5-20251001 |
| API key | ANTHROPIC_API_KEY (Cloudflare Pages env var — Production) |
| Architecture | Provider-independent adapter (Sophia Core™ design) |
| Token cost (estimated) | ~$0.007 per full Sophia conversation |
| Rate limiting | Currently none (P1 gap — address within 30 days of launch) |

### 2.6 Component Library (CODEX)

| Property | Value |
|---|---|
| Framework | React 18 + TypeScript + Tailwind CSS v3 |
| Build tool | Vite |
| Router | React Router v6 |
| Dev server | localhost:5173 |
| Status | Development/design layer — NOT deployed to production |
| Purpose | Design and prototype new UI components, pages, and experiences before DC integration |

**CODEX is not the production website.** It is a parallel design environment for building components that will eventually be integrated into the DC/Draftcode production build.

---

## CHAPTER 3: INTEGRATION ARCHITECTURE

### Integration 1: Cloudflare Pages

**Purpose:** Static site hosting, edge function execution, auto-deployment from GitHub, security headers, environment variables.

**Account:** Juan's Cloudflare account  
**Project:** carriersfy-ai (or equivalent)  
**Status:** Active — production

**Key capabilities used:**
- Static hosting (index.html + assets)
- Pages Functions (/api/contact, /api/chat)
- Custom domain (carriersfy.ai)
- Environment Variables (RESEND_API_KEY, ANTHROPIC_API_KEY)
- Build triggers (auto-deploy on GitHub push)
- Security headers (_headers file)
- Preview deployments (feature branches)

**Security settings needed:**
- Environment variables set to "Production" only (not preview)
- ANTHROPIC_API_KEY: Production only (confirmed during Sophia MVP setup)
- RESEND_API_KEY: Production only

**Rate limiting (Cloudflare dashboard — not in code):**  
Add rule: 20 requests/minute per IP to `/api/chat` within Cloudflare Pages dashboard. This is a post-launch P1 priority.

**CORS (code fix needed):**  
Change `chat.js` CORS header from `'*'` to `'https://carriersfy.ai'` within 30 days of launch.

---

### Integration 2: GitHub

**Purpose:** Source control, version history, CI/CD trigger for Cloudflare Pages.

**Account:** lightofeternallifes-star  
**Repository:** CARRIERSFY_AI_WEBSITE_V1.1_FINAL  
**Status:** Active

**Branch strategy:**
- `main` — production. Every push auto-deploys. Requires Juan's approval before push.
- `feat/[description]` — feature branches. Create preview deployments on Cloudflare.

**Git rules:**
- Never commit secrets (API keys, credentials)
- Never commit OMEGA/ directory (gitignored)
- Feature branches for all non-trivial changes
- Commit messages follow conventional commits format: feat/fix/docs/chore

---

### Integration 3: Resend

**Purpose:** Transactional email for lead notifications.

**Account:** Juan's Resend account  
**Sending domain:** carriersfy.ai (must be verified in Resend dashboard)  
**API key:** RESEND_API_KEY (Cloudflare Pages env var)  
**Status:** Active — production

**Current usage:** Lead form submissions → email to juan@ and hello@carriersfy.ai

**Future usage:**
- Monthly client reports
- Automated follow-up sequences
- Internal operational notifications

**Sending limits:**
- Resend free tier: 3,000 emails/month (sufficient for early-stage lead volume)
- Resend Pro: ~$20/month for 50,000 emails/month
- Monitor monthly send volume — upgrade before hitting free tier ceiling

---

### Integration 4: Anthropic API

**Purpose:** Powers Sophia's AI reasoning in the chat endpoint.

**API key:** ANTHROPIC_API_KEY (Cloudflare Pages env var — Production only)  
**Model:** claude-haiku-4-5-20251001  
**Status:** Pending — set in Cloudflare Pages before Sophia MVP goes live

**Implementation:**  
Direct API call from `functions/api/chat.js` to `https://api.anthropic.com/v1/messages`.

**Cost management:**  
- Haiku model is cost-efficient (~$0.25/1M input tokens, ~$1.25/1M output tokens as of 2025)
- Max 400 output tokens per response (cost control)
- 6-turn context window (cost control)
- Rate limiting will further cap costs once implemented

**Provider independence:**  
The system prompt and response parsing are designed to be portable to other providers (OpenAI, Gemini, Mistral) with minimal code changes. This is the Sophia Core™ provider adapter pattern in practice.

---

### Integration 5: Google Fonts

**Purpose:** Typography delivery (Space Grotesk + Manrope).

**Status:** Active — loaded via CDN in index.html  
**Fonts:** Space Grotesk (headings), Manrope (body)  
**Note:** This is a CDN dependency — if Google Fonts is unavailable, fallback fonts apply.

---

### Integration 6: VS Code / IDE (Development)

**Purpose:** Development environment for code editing, CODEX development.

**Status:** Active — development only  
**Claude Code:** Running as agent within VS Code / IDE context  
**Note:** Development tool only; no production dependency.

---

### Integration 7: Notion (Planned)

**Purpose:** Knowledge management, documentation, client briefs at scale.

**Status:** Planned — not yet integrated  
**Planned use:** Replace or augment file-based knowledge management with structured Notion workspace  
**Timeline:** v1.2 or when team size requires it

---

### Integration 8: Apple Developer (Planned)

**Purpose:** iOS app distribution for client apps built via App Builder.

**Status:** Planned — requires Apple Developer Program enrollment  
**Timeline:** When first client app requires iOS distribution

---

### Integration 9: Google Workspace (Planned)

**Purpose:** Business email (juan@carriersfy.ai, hello@carriersfy.ai), collaboration, document sharing.

**Status:** Active for email; may expand to Workspace collaboration tools  
**Note:** Email domain must remain carriersfy.ai regardless of email provider

---

### Integration 10: OpenAI API (Evaluated — Not In Use)

**Status:** Evaluated, not currently in use  
**Reason:** Anthropic's Haiku model meets current requirements at comparable cost  
**Provider independence:** If Anthropic pricing changes or capability gaps emerge, OpenAI is a primary migration target  
**Key difference in use:** OpenAI uses `Authorization: Bearer KEY` header; Anthropic uses `x-api-key` header — adapter layer handles this difference

---

### Integration 11: MCP Servers (Planned)

**Purpose:** Connect AI agents to tools, databases, and external systems via the Model Context Protocol.

**Status:** Planned — part of Sophia Core™ v1.1 roadmap  
**What it enables:** Sophia executes real business actions (book appointments, look up orders, send notifications) rather than just answering questions  
**Timeline:** v1.1 when first client requires agentic capabilities

---

### Integration 12: WhatsApp Business API (Planned)

**Purpose:** Full two-way WhatsApp AI integration for Nova and other Digital Employees.

**Status:** Planned — requires Meta Business verification  
**Architecture:** Cloudflare Worker + WhatsApp Business API webhook  
**Current workaround:** WhatsApp deeplink in sophia-chat.js (one-way — opens WhatsApp with pre-filled message)  
**Requirements for full integration:**
- Meta Business Account verified
- WhatsApp Business API access granted
- Business phone number verified
- Message templates pre-approved by Meta
- Cloudflare Worker or equivalent webhook handler deployed

---

## CHAPTER 4: SECURITY ARCHITECTURE

### 4.1 Three-Layer OMEGA Security

The OMEGA directory contains sensitive internal business information. It is protected by three independent layers:

**Layer 1 — .gitignore:**
```
OMEGA/
```
OMEGA is never committed to GitHub. It exists only on authorized local machines.

**Layer 2 — Cloudflare _headers:**
```
/OMEGA/*
  X-Robots-Tag: noindex, nofollow
  Cache-Control: no-store
```
Even if OMEGA were accidentally deployed, browsers and crawlers receive explicit noindex directives.

**Layer 3 — robots.txt:**
```
Disallow: /OMEGA/
Disallow: /config/
Disallow: /docs/
Disallow: /pages/
```
All search engines are instructed not to crawl internal directories.

### 4.2 Security Headers (_headers file)

```
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/OMEGA/*
  X-Robots-Tag: noindex, nofollow
  Cache-Control: no-store

/config/*
  X-Robots-Tag: noindex, nofollow

/docs/*
  X-Robots-Tag: noindex, nofollow
```

**HSTS:** Forces HTTPS for all connections, including subdomains. Preload flag enables inclusion in browser HSTS preload lists.

**X-Frame-Options:** Prevents clickjacking by disabling iframe embedding.

**X-Content-Type-Options:** Prevents MIME sniffing attacks.

### 4.3 API Security

**Principle:** No API key or secret ever appears in committed code.

**RESEND_API_KEY:** Set in Cloudflare Pages → Settings → Environment Variables → Production. Never in any `.js` file, `.env`, or `.md` document.

**ANTHROPIC_API_KEY:** Same — Cloudflare Pages → Settings → Environment Variables → Production only.

**WHATSAPP_PHONE_NUMBER:** Currently hardcoded as `1XXXXXXXXXX` placeholder in `sophia-chat.js` line 11. Must be replaced before production launch. This is not a secret (it's a phone number) but must be correct.

### 4.4 Known Security Gaps (Post-Launch Priorities)

**Gap 1 — CORS is open:**  
`functions/api/chat.js` line 103: `'Access-Control-Allow-Origin': '*'`  
Fix: Change to `'https://carriersfy.ai'`  
Priority: P1 — address within 30 days of launch  

**Gap 2 — No rate limiting on /api/chat:**  
Any IP address can call `/api/chat` unlimited times, burning Anthropic API credits.  
Fix: Add Cloudflare Rate Limiting rule in Cloudflare dashboard (20 req/min per IP)  
Priority: P1 — address within 48 hours of launch  

### 4.5 Data Handling

**Current state:** The Carriersfy AI MVP stores no customer data beyond email notifications.

- Lead form submissions → email to juan@ and hello@ — not stored in a database
- Chat conversations → processed in memory, not stored server-side
- Visitor IDs → UUID in localStorage (client-side only, not sent to server)

**Implication:** Current privacy exposure is minimal. As the product evolves and data storage is added, full LGPD/GDPR compliance protocols must be implemented.

### 4.6 Secrets Management

| Secret | Location | Rotation procedure |
|---|---|---|
| RESEND_API_KEY | Cloudflare Pages env vars | Rotate in Resend dashboard → update in Cloudflare Pages |
| ANTHROPIC_API_KEY | Cloudflare Pages env vars | Rotate in Anthropic console → update in Cloudflare Pages |
| GitHub PAT (if any) | Not currently stored | Create and rotate in GitHub Settings |

**If a secret is compromised:** Rotate immediately in the issuing service → update in Cloudflare Pages → redeploy (automatic on next push or manual trigger). Audit usage logs for any unauthorized use.

### 4.7 Access Control

| System | Who Has Access |
|---|---|
| GitHub production repo | Juan only |
| Cloudflare Pages project | Juan only |
| Anthropic API account | Juan only |
| Resend account | Juan only |
| OMEGA directory | Local machines only — never committed |

**Principle of least privilege:** No contractor, Claude Code, or external party should have production write access without Juan's explicit, time-limited authorization.

---

## CHAPTER 5: ENVIRONMENT VARIABLES REFERENCE

| Variable | Purpose | Where Set | Required | Value Format |
|---|---|---|---|---|
| `RESEND_API_KEY` | Email delivery for lead forms | Cloudflare Pages → Settings → Env Vars → Production | Yes | `re_xxxxxxxxxxxxxxxx` |
| `ANTHROPIC_API_KEY` | Sophia AI chat (Anthropic API) | Cloudflare Pages → Settings → Env Vars → Production | Yes | `sk-ant-api03-xxxxxxxx` |
| `WHATSAPP_PHONE_NUMBER` | WhatsApp deeplink in sophia-chat.js | Source file (sophia-chat.js line 11) | Yes | E.164 without +: `15551234567` |

**How to set env vars in Cloudflare Pages:**
1. Go to Cloudflare Pages dashboard
2. Select the carriersfy.ai project
3. Settings → Environment Variables
4. Select "Production" environment
5. Add variable name and value
6. Save
7. Redeploy (or trigger a new deploy by pushing a commit)

**Important:** Variables set to "Preview" only are not available to production Functions. Always confirm the "Production" environment is selected.

---

## CHAPTER 6: DEPLOYMENT ARCHITECTURE

### 6.1 Deployment Flow

```
Developer machine
    ↓ git push origin main
GitHub repository (lightofeternallifes-star)
    ↓ webhook → Cloudflare Pages build trigger
Cloudflare Pages build process
    ↓ no build command (static files deployed as-is)
Cloudflare Pages production deployment
    ↓ global CDN distribution
carriersfy.ai (live, worldwide)
```

**Build configuration:**
- Build command: none (static files only)
- Output directory: / (repository root)
- Environment: Production
- Auto-deploy: On every push to `main`

### 6.2 Preview Deployments

Every push to a branch other than `main` creates a preview deployment at:
`https://[branch-name].[project-name].pages.dev`

This enables testing before merging to main without touching production.

### 6.3 Production Deployment Checklist

Before every production push:
- [ ] Code review complete
- [ ] No API keys or secrets in committed files
- [ ] OMEGA/ excluded from git staging (verify: `git status` shows no OMEGA files)
- [ ] All modified functions tested locally (if possible) or on preview branch
- [ ] Juan's approval obtained (CLAUDE.md rule: never push to main without Juan's approval)
- [ ] `git push origin main` executed

### 6.4 Rollback Procedure

If a production deployment causes issues:
1. Identify the last working commit: `git log --oneline`
2. In Cloudflare Pages dashboard → Deployments → select previous deployment → "Rollback to this deployment"
3. OR push a revert commit: `git revert HEAD && git push origin main`

Rollback takes effect within 60 seconds of Cloudflare deploying the previous version.

---

## CHAPTER 7: PERFORMANCE ARCHITECTURE

### 7.1 Static Asset Delivery

All static files (HTML, JS, CSS) are served from Cloudflare's global CDN. Expected performance:
- Time to First Byte (TTFB): <50ms globally
- First Contentful Paint (FCP): <1.5s on fast connections
- Largest Contentful Paint (LCP): <2.5s (Core Web Vitals threshold)

### 7.2 Function Performance

Cloudflare Pages Functions run at edge locations closest to the user.
- Cold start: <10ms (Cloudflare Workers architecture — minimal cold start)
- `/api/chat` response: 1-3 seconds (depends on Anthropic API response time)
- `/api/contact` response: <500ms (depends on Resend API response time)

### 7.3 Chat Latency Targets

| Step | Target |
|---|---|
| User sends message | Immediate |
| Typing indicator appears | <100ms |
| /api/chat called | <100ms |
| Anthropic API responds | 1-3 seconds |
| Response displayed | <100ms after API response |
| **Total user-perceived latency** | **1.2 - 3.5 seconds** |

Perceived performance tip: The typing indicator (three-dot animation) must appear immediately when the user sends a message. This makes the wait feel shorter.

### 7.4 Mobile Performance

Over 60% of web traffic is mobile. Performance targets:
- Mobile FCP: <2.5s on 4G
- Mobile LCP: <4s on 4G
- Chat UI: Fully functional on iOS Safari and Android Chrome
- WhatsApp deeplink: Opens native WhatsApp app on mobile

---

## CHAPTER 8: FUTURE TECHNOLOGY ROADMAP

### v1.1 (Next Quarter)

**Rate limiting on /api/chat:**
- Cloudflare Rate Limiting rule (20 req/min per IP)
- Done in Cloudflare dashboard — no code deploy required

**CORS restriction:**
- Update chat.js to restrict `Access-Control-Allow-Origin` to `https://carriersfy.ai`

**MCP Servers for Sophia:**
- Connect Sophia to real business tools via Model Context Protocol
- Enables booking appointments, looking up customer data, sending notifications
- Architecture: Sophia Core™ Skills + Actions systems

### v1.2 (Sophia Core™ Foundation)

**RAG for Sophia Knowledge™:**
- Move from embedded system prompt to retrieval-augmented generation
- Knowledge base stored in vector database (Cloudflare Vectorize or Pinecone)
- Sophia retrieves relevant knowledge per-query instead of loading everything
- Benefit: More accurate answers, larger knowledge base, lower token cost

**Cloudflare D1 (Database):**
- Store lead data persistently (not just email notifications)
- Enable lead management, follow-up tracking, pipeline analytics
- LGPD/GDPR compliance layer added

**Cloudflare KV (Session Store):**
- Persist Sophia's conversation context across page loads
- Enables returning visitor recognition

**Multi-employee architecture:**
- Nova, Titan, Orion can each have their own /api/[employee] endpoint
- Shared knowledge base, distinct personas and skills

### v2.0 (Digital Workforce)

**Full WhatsApp Business API integration:**
- Nova handles two-way WhatsApp conversations
- Meta Business Account + WhatsApp Business API
- Cloudflare Worker webhook handler
- Message template management

**Voice AI integration:**
- Vapi or equivalent for inbound phone calls
- ElevenLabs or equivalent for voice synthesis
- Sophia speaks — not just types
- PSTN number provisioning

**Iron Prime orchestration:**
- Iron Prime coordinates all Digital Employees
- Routes conversations between employees based on intent
- Manages escalation across the entire Digital Workforce

### v3.0 (Platform)

**Carriersfy AI Platform API:**
- External developers can build on the platform
- Client self-service for knowledge base updates
- Analytics dashboard for clients
- White-label capability

**App Builder production:**
- Client apps published to App Store and Google Play
- Full React Native or Flutter implementation
- Backend powered by Cloudflare Workers + D1

---

## CHAPTER 9: TECHNOLOGY GOVERNANCE

### 9.1 Architecture Decision Records (ADRs)

Every significant technology decision is documented in an ADR stored in `OMEGA/INDEXES/DECISIONS.md`.

**ADR required for:**
- Changing AI provider
- Adding a new integration
- Major architectural change (e.g., adding a database)
- Any change to security architecture

**ADR format:**
```
CF-ADR-{NNN}: [Title]
Status: ACCEPTED | PENDING | REJECTED | SUPERSEDED
Context: What problem are we solving?
Decision: What we decided
Rationale: Why this decision
Consequences: Trade-offs and implications
```

### 9.2 Technology Review Cadence

- **Weekly:** Monitoring metrics review (API health, function performance)
- **Monthly:** Integration health check (all provider accounts verified, API keys valid)
- **Quarterly:** Full technology audit (security headers, access control, gaps vs. roadmap)

### 9.3 Vendor Evaluation Framework

When evaluating a new technology provider:

| Criterion | Questions |
|---|---|
| Provider lock-in risk | Can we migrate away in <1 week? |
| Security | Does it require production secrets? How are they managed? |
| Cost | What is the cost at 10x current volume? |
| Reliability | What is the SLA? What is the fallback? |
| Compliance | Does it affect our LGPD/GDPR posture? |
| Complexity | Does it add operational complexity we can support? |

### 9.4 Tech Debt Management

Tech debt is tracked in OMEGA/INDEXES/TASKS.md with explicit priority levels. Known technical debt is addressed before new features when:
- The debt creates security risk
- The debt creates client reliability risk
- The accumulated debt makes new features significantly harder to implement

Current known technical debt:
1. CORS: open (`*`) — P1 fix required post-launch
2. Rate limiting: none — P1 fix required within 48h of launch
3. Lead storage: email-only — add database in v1.2
4. Session persistence: in-memory only — add KV storage in v1.2

---

## CHAPTER 10: FREQUENTLY ASKED QUESTIONS

**Q: Why Cloudflare Pages instead of Vercel, AWS, or traditional hosting?**  
A: Edge deployment with no cold starts, built-in CDN, Pages Functions at the edge, and tight GitHub integration — all at low cost. The specific provider is documented in ADR (CF-ADR-001).

**Q: Why not use a database from day one?**  
A: The MVP intentionally avoids database complexity. Leads are delivered to email immediately — zero data loss risk, zero database management burden. Database is the right call when we need analytics, follow-up automation, or client portals (v1.2).

**Q: Why Anthropic Haiku and not GPT-4 or Claude Opus?**  
A: Haiku provides adequate quality for Sophia's consultative conversations at ~10x lower cost than frontier models. For a chat application with hundreds of conversations per day, cost efficiency matters. The architecture allows upgrading to a more capable model without code changes.

**Q: Why is the WHATSAPP_PHONE_NUMBER hardcoded instead of an env var?**  
A: It is a client-side value included in the JavaScript bundle — it is not a secret. It could be moved to an env var in future if multi-tenant support requires it.

**Q: What happens if Cloudflare has an outage?**  
A: The site is fully unavailable. Cloudflare maintains 99.99%+ uptime historically. For a Cloudflare-specific outage (rare), there is no instant failover in the current architecture.

**Q: Can Claude Code (the AI agent) modify support.js or index.html?**  
A: No. These files are explicitly listed in CLAUDE.md under "NEVER Modify." Any edit will break the DC/Draftcode site.

---

## GLOSSARY — VOLUME VIII

| Term | Definition |
|---|---|
| Cloudflare Pages | Static hosting platform with edge functions |
| Cloudflare Pages Functions | Serverless JavaScript that runs at the Cloudflare edge |
| DC/Draftcode | The design tool that generates support.js and index.html |
| CORS | Cross-Origin Resource Sharing — controls which domains can call an API |
| CDN | Content Delivery Network — distributes assets globally for faster delivery |
| ADR | Architecture Decision Record — documents significant technology decisions |
| HSTS | HTTP Strict Transport Security — forces HTTPS connections |
| MCP | Model Context Protocol — standard for AI agents to use external tools |
| RAG | Retrieval Augmented Generation — AI retrieves relevant knowledge at query time |
| Edge functions | Serverless functions that run close to the user, not in a central data center |
| Rate limiting | Restricting the number of API calls from a single IP in a time window |
| Provider lock-in | When business logic depends on a single vendor's specific implementation |

---

*End of Volume VIII — Technology*  
*Next: Volume IX — Marketing*  
*Classification: Internal Training Use | Version 1.0.0 | 2026*

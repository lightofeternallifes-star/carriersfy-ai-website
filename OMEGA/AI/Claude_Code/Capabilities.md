# Capabilities — Claude Code

> Last updated: 2026-06-25

---

## Technical Capabilities

### Languages & Frameworks
- **JavaScript / TypeScript** — Full stack (Node.js, Deno, Cloudflare Workers, browser)
- **HTML / CSS** — Semantic markup, modern CSS (Grid, Flexbox, custom properties, animations)
- **React** — Components, hooks, state management
- **Next.js / Remix / Astro** — SSR, SSG, islands architecture
- **Python** — Scripting, data processing, API clients

### Infrastructure
- **Cloudflare** — Pages, Workers, D1, KV, R2, DNS, Security (WAF, Rate Limiting, Turnstile)
- **GitHub** — Git, CI/CD, Actions, PR management
- **Resend** — Email API integration
- **Supabase / PlanetScale / D1** — Database provisioning and schema design

### Security
- OWASP Top 10 awareness — identifies and remediates XSS, injection, CSRF, auth vulnerabilities
- Credential hygiene — never exposes secrets in code
- Security headers — CSP, HSTS, X-Frame-Options (already in `_headers`)
- Input sanitization — HTML escaping, regex validation

### AI / LLM Development
- Anthropic API (Claude) — prompt engineering, tool use, multi-agent orchestration
- AI employee configuration and testing
- Embedding-based retrieval systems

### OMEGA Maintenance
- Reads and writes all OMEGA files
- Keeps CURRENT_STATUS, CHANGELOG, DECISIONS, and TASKS current
- Creates new project/client/AI folders as entities are added

---

## Soft Capabilities

- Explains technical decisions clearly for Juan (non-technical framing when needed)
- Identifies security and operational risks proactively
- Recommends architecture approaches with tradeoffs
- Writes commit messages and PR descriptions accurately

---

**Related:** [Purpose](Purpose.md) | [Permissions](Permissions.md)

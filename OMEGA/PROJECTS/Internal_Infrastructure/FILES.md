# Files — Internal Infrastructure

> Last updated: 2026-06-25

---

Infrastructure is configuration-based, not file-based. Key configuration locations:

| Asset | Location | Access |
|---|---|---|
| Cloudflare DNS zone | Cloudflare dashboard → carriersfy.ai zone | Juan's Cloudflare account |
| Cloudflare Pages projects | Cloudflare dashboard → Pages | Juan's Cloudflare account |
| GitHub organization | github.com/lightofeternallifes-star | Juan's GitHub account |
| Resend domain verification | resend.com → Domains → carriersfy.ai | Juan's Resend account |
| Resend API key | resend.com → API Keys | Juan's Resend account |
| RESEND_API_KEY env var | CF Pages → Carriersfy AI Website → Settings → Env Vars | Juan's Cloudflare account |

---

**Related:** [README](README.md) | [SYSTEM_ARCHITECTURE](../../CORE/SYSTEM_ARCHITECTURE.md)

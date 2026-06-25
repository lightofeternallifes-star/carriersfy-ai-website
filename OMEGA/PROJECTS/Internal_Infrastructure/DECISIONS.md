# Decisions — Internal Infrastructure

> Last updated: 2026-06-25

---

## Accepted Decisions

| Decision | Rationale | ADR |
|---|---|---|
| Cloudflare for DNS | carriersfy.ai already managed in CF; simplifies Pages integration | [ADR-001](../../CORE/DECISION_ENGINE.md) |
| Resend for email | CF Workers-compatible; generous free tier; verified domain setup | [ADR-002](../../CORE/DECISION_ENGINE.md) |
| GitHub for source control | Industry standard; Cloudflare Pages natively integrates | Implied in ADR-001 |
| Environment variables via CF Pages | Simple, secure, no additional tools required at current scale | ADR-002 consequence |

---

## Pending Decisions

| Decision | ADR | Target |
|---|---|---|
| AI employee hosting platform | ADR-009 | Q3 2026 |
| CRM for lead management | ADR-008 | 2026-07-15 |
| Secrets management upgrade | ADR pending | Q4 2026 |

---

**Related:** [README](README.md) | [DECISION_ENGINE](../../CORE/DECISION_ENGINE.md)

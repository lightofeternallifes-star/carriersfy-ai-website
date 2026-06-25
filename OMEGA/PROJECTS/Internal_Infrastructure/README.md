# Internal Infrastructure

> Project README | Status: [IN PROGRESS] | Last updated: 2026-06-25

---

## Overview

This project covers all Carriersfy AI internal infrastructure: domain management, DNS, email infrastructure, GitHub organization, Cloudflare account, Resend account, and any internal tooling that supports the team's operations.

---

## What Exists

| Asset | Status | Location | Notes |
|---|---|---|---|
| Domain: carriersfy.ai | [LIVE] | Cloudflare DNS | Primary company domain |
| Cloudflare account | [LIVE] | Juan's account | Hosts carriersfy.ai DNS + Pages |
| GitHub account | [LIVE] | lightofeternallifes-star | Source control for all repos |
| Resend account | [LIVE] | Juan's Resend account | Email delivery for leads@carriersfy.ai |
| Email domain: leads@carriersfy.ai | [LIVE] | Resend (verified) | FROM address for transactional email |
| Inbox: juan@carriersfy.ai | [LIVE] | Juan's primary email | Receives lead notifications |
| Inbox: hello@carriersfy.ai | [LIVE] | Team inbox | Secondary recipient for leads |
| OMEGA (this system) | [LIVE] | /OMEGA/ in website repo | Enterprise memory OS |

---

## Critical Configuration

```
RESEND_API_KEY → Cloudflare Pages → Settings → Environment Variables
  Required by: functions/api/contact.js
  Used for: Sending lead notification emails via Resend API
  Missing → contact form returns 500
```

---

## Related OMEGA Files

- [CURRENT_STATUS](CURRENT_STATUS.md) | [ROADMAP](ROADMAP.md) | [TASKS](TASKS.md) | [DECISIONS](DECISIONS.md) | [FILES](FILES.md) | [DEPENDENCIES](DEPENDENCIES.md) | [CHANGELOG](CHANGELOG.md)
- [SYSTEM_ARCHITECTURE](../../CORE/SYSTEM_ARCHITECTURE.md) | [PROJECT_REGISTRY](../../CORE/PROJECT_REGISTRY.md)

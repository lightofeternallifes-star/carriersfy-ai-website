# INTEGRATION: Resend

- **Entity ID:** CF-INT-003
- **Category:** Transactional Email
- **Status:** [ACTIVE — KEY PENDING VERIFICATION]
- **Critical:** YES — contact form emails depend on this

---

## What It Does

Resend handles all transactional email for Carriersfy AI. When a visitor submits the contact form, `functions/api/contact.js` calls the Resend API to deliver an email notification to Juan and the team.

---

## Configuration

| Attribute | Value |
|---|---|
| **Service** | Resend (resend.com) |
| **Verified sender domain** | carriersfy.ai |
| **From address** | `leads@carriersfy.ai` |
| **Notification recipients** | `juan@carriersfy.ai`, `hello@carriersfy.ai` |
| **API Key env var** | `RESEND_API_KEY` (stored in Cloudflare Pages → Production env vars) |
| **Trigger** | Contact form submission at `carriersfy.ai` → `/api/contact` endpoint |

---

## Critical Dependency

**CF-TSK-001 (P0):** `RESEND_API_KEY` must be set in Cloudflare Pages production environment.

To verify:
1. Go to Cloudflare Dashboard → Pages → [project] → Settings → Environment variables
2. Confirm `RESEND_API_KEY` exists under "Production" (not just Preview)
3. Test by submitting the contact form at https://carriersfy.ai
4. Check `juan@carriersfy.ai` inbox for a test email

If missing: the contact form shows success to the user but no email is ever delivered. Silent failure.

---

## Email Flow

```
User fills contact form
         ↓
index.html: handleContact() async fetch('/api/contact')
         ↓
functions/api/contact.js
         ↓
Resend API (api.resend.com/emails) with RESEND_API_KEY
         ↓
Email delivered to juan@carriersfy.ai + hello@carriersfy.ai
```

---

## Future Uses

- Client onboarding confirmation emails (via Sofia, CF-AGT-002)
- Invoice / proposal delivery
- Drip campaigns for leads from Iron Prime (CF-AGT-001)
- Weekly digest reports

---

## Related

- **Auth:** RESEND_API_KEY in CF-INT-001 (Cloudflare Pages) env vars
- **Used by:** CF-PRJ-001 (website contact form), CF-PRJ-006 (infrastructure)
- **Task:** CF-TSK-001 (verify API key is set)
- **Function file:** `functions/api/contact.js`

# INTEGRATION: Google Workspace

- **Entity ID:** CF-INT-009
- **Category:** Email / Calendar / Productivity
- **Status:** [ACTIVE]
- **Critical:** High — primary business email

---

## What It Does

Google Workspace provides the `@carriersfy.ai` email infrastructure. Juan's primary business email (`juan@carriersfy.ai`) and the team inbox (`hello@carriersfy.ai`) run through Google Workspace.

---

## Accounts in Use

| Email | Role | Type |
|---|---|---|
| `juan@carriersfy.ai` | Founder / CEO primary | Google Workspace user |
| `hello@carriersfy.ai` | Team inbox — lead notifications | Google Workspace alias or user |

---

## Services Used

| Google Service | Usage |
|---|---|
| Gmail | Primary business email |
| Google Calendar | Meeting scheduling, availability |
| Google Drive | Document storage (non-OMEGA) |
| Google Meet | Client video calls |
| Google Fonts | Web typography for carriersfy.ai (Space Grotesk, Manrope) |

---

## Email Routing Note

**Transactional email (contact form):** Handled by Resend (CF-INT-003) — sends FROM `leads@carriersfy.ai`, delivers TO `juan@carriersfy.ai` (Google Workspace inbox).

**Business email:** Sent/received through Google Workspace directly.

These are separate systems. Resend ≠ Google Workspace. Resend uses carriersfy.ai DNS records for domain verification but does not route through Google's mail servers.

---

## Integration with AI Employees

When Sofia (CF-AGT-002) is deployed:
- Sofia will need Calendar API access (Google OAuth) to schedule meetings
- Sofia will need Gmail API access (limited scope) for client communications
- OAuth scopes will be defined in Sofia's deployment (CF-ADR-009 dependent)

---

## Related

- **Delivers to:** `juan@carriersfy.ai` — lead notification recipient (via CF-INT-003)
- **Future:** Sofia (CF-AGT-002) calendar + email integration
- **Google Fonts:** used by CF-PRJ-001 (website typography)

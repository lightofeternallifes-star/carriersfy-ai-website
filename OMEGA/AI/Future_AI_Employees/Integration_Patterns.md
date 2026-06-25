# Integration Patterns — Carriersfy AI AI Employees

> Standard patterns for connecting AI employees to client systems. Last updated: 2026-06-25

---

## Pattern 1: Email-First (Simplest)

**Description:** AI employee reads from and sends to a shared email inbox  
**Setup time:** 1 day  
**Best for:** Low-risk first deployment; clients who are resistant to deeper integration  

```
Customer → Shared inbox (support@client.com or orders@client.com)
         ↓
AI Employee reads new emails (IMAP / Gmail API)
         ↓
AI Employee drafts reply
         ↓
[Optional] Human reviews draft
         ↓
Reply sent from shared inbox
```

**Credentials needed:** Gmail OAuth or IMAP credentials for shared inbox  
**Risk:** Low — email is universally understood

---

## Pattern 2: WhatsApp Business Integration

**Description:** AI employee responds to inbound WhatsApp messages  
**Setup time:** 1–2 weeks (Meta Business verification can be slow)  
**Best for:** Brazilian clients, service businesses with WhatsApp-heavy customer base  

```
Customer → WhatsApp message to client's business number
         ↓
Meta WhatsApp Business Cloud API webhook
         ↓
AI Employee processes message
         ↓
AI Employee sends WhatsApp reply
         ↓
[If escalation trigger] → Notify human agent via email/Slack
```

**Credentials needed:** Meta Business Manager access, WhatsApp Business phone number, verified business  
**Risk:** Medium — Meta API changes; verification process can delay launch

---

## Pattern 3: Web Chat Widget

**Description:** AI employee embedded on client website as a chat widget  
**Setup time:** 2–3 days  
**Best for:** Inbound lead capture, customer support on website  

```
Visitor → Clicks chat widget on client website
        ↓
Chat widget (JavaScript snippet) sends message to AI Employee API
        ↓
AI Employee processes + responds in real-time
        ↓
Conversation stored in CRM
        ↓
[If lead qualified] → Create CRM record; notify sales team
```

**Credentials needed:** Hosting for the AI API endpoint; client adds JS snippet to website  
**Risk:** Low — well-established pattern

---

## Pattern 4: CRM-Integrated AI

**Description:** AI employee works inside a CRM, enriching records and automating sequences  
**Setup time:** 1–2 weeks  
**Best for:** Sales teams with existing CRM discipline  

```
New lead enters CRM (from form, import, or Iron Prime)
        ↓
Trigger fires (new contact, stage change, inactivity)
        ↓
AI Employee drafts email or WhatsApp message
        ↓
[Optional] Human approves in CRM
        ↓
Message sent; CRM record updated with outcome
```

**Credentials needed:** CRM API key (HubSpot, Salesforce, RD Station, etc.)  
**Risk:** Medium — CRM API limits; data quality issues in existing CRM

---

## Pattern 5: Calendar + Booking

**Description:** AI employee has access to a calendar and can book appointments autonomously  
**Setup time:** 1–3 days  
**Best for:** Service businesses, clinics, consultancies  

```
Customer asks to schedule appointment (via email, WhatsApp, or web chat)
        ↓
AI Employee reads available calendar slots
        ↓
AI Employee proposes times and confirms selection
        ↓
Calendar event created; confirmation sent to customer
        ↓
Reminder sequence triggered (24h, 1h before)
```

**Credentials needed:** Google Calendar OAuth or Calendly API  
**Risk:** Low — booking systems are mature

---

## Integration Decision Framework

When selecting an integration pattern for a new client:

| Question | If Yes → |
|---|---|
| Is WhatsApp primary in their market? | Pattern 2 (WhatsApp) |
| Do they have a website with traffic? | Pattern 3 (Web Chat) |
| Do they have an existing CRM with data? | Pattern 4 (CRM-integrated) |
| Is the primary use case appointment booking? | Pattern 5 (Calendar) |
| Is this a first deployment / risk-averse client? | Pattern 1 (Email-first) |

---

**Related:** [Hiring_Framework](Hiring_Framework.md) | [Capability_Registry](Capability_Registry.md) | [SYSTEM_ARCHITECTURE](../../CORE/SYSTEM_ARCHITECTURE.md)

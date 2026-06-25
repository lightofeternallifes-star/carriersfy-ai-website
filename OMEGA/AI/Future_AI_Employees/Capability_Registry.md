# AI Employee Capability Registry — Carriersfy AI

> Master list of all AI capabilities available for deployment. Last updated: 2026-06-25

---

## Communication Capabilities

| Capability | Description | Required For |
|---|---|---|
| Email compose + send | Draft and send emails from a client domain | All outreach agents |
| Email parsing | Extract structured data from inbound emails | Support AI, Quote AI |
| WhatsApp Business | Send/receive WhatsApp messages | Brazil market agents |
| Web chat | Embedded chat widget on website | Support AI, Appointment AI |
| SMS | Text message send/receive | Appointment reminders |
| Voice call (text-to-speech) | Outbound or inbound voice AI | Advanced agents (Phase 3) |
| Calendar booking | Create, confirm, reschedule appointments | Sofia, Appointment AI |

---

## Knowledge & Reasoning Capabilities

| Capability | Description | Required For |
|---|---|---|
| FAQ retrieval | Answer from a structured FAQ knowledge base | Support AI, Technical Q&A |
| Product knowledge base | Deep knowledge of a specific product catalog | Technical Q&A, Quote AI |
| Document parsing | Extract info from PDFs, spreadsheets, forms | Quote AI, Technical AI |
| Pricing rule engine | Apply business pricing logic to generate quotes | Quote AI |
| Qualification scoring | Score leads against ICP criteria | Iron Prime |
| Sentiment detection | Detect frustrated or high-intent customers | Support AI |
| Language detection | Detect and respond in the user's language | All multi-language agents |

---

## Integration Capabilities

| Capability | Tools | Notes |
|---|---|---|
| CRM read/write | HubSpot, Salesforce, Pipedrive, RD Station | Required for any sales or ops agent |
| Calendar integration | Google Calendar, Outlook, Calendly | Required for scheduling |
| ERP read | NetSuite, SAP B1, Totvs (Brazil) | Required for Quote AI in manufacturing |
| Email platform | Gmail API, Outlook API, Resend | |
| WhatsApp API | Meta Business Cloud API | Business verification required |
| Ticketing system | Zendesk, Freshdesk, Intercom | Required for Support AI |
| Payment status | Stripe, Asaas (Brazil) | Invoice/payment status queries |
| Product catalog | WooCommerce, Shopify, custom API | Required for e-commerce agents |

---

## Memory Architectures

| Architecture | Description | Use Case |
|---|---|---|
| Conversation context | In-session memory of the current conversation | All agents |
| CRM memory | Long-term memory of customer interactions | Sales, ops agents |
| Knowledge base (static) | Pre-trained on a document corpus | Support, Technical Q&A |
| Knowledge base (dynamic) | Updated regularly from live systems | Quote AI, Inventory AI |
| OMEGA memory | Company-level context (for internal agents) | Claude Code, Sofia |
| Vector search | Semantic search over large document sets | Advanced agents |

---

## Language Capabilities

| Language | Level | Notes |
|---|---|---|
| English (EN) | Native | Full capability |
| Portuguese (PT-BR) | Native | Brazilian Portuguese, cultural calibration required |
| Spanish (ES) | Native | Latin American Spanish preferred |
| Other | Possible | Case-by-case — quality varies by language |

---

**Related:** [Hiring_Framework](Hiring_Framework.md) | [Role_Templates](Role_Templates.md) | [Integration_Patterns](Integration_Patterns.md) | [AGENT_REGISTRY](../../CORE/AGENT_REGISTRY.md)

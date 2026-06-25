---
version: 1.1.0
owner: Carriersfy AI
status: active
customer_safe: false
last_reviewed: 2026-06-25
canonical_source: knowledge/KNOWLEDGE_INDEX.md
notes: Master index and navigation map for Sophia's complete knowledge base. Internal reference — not for customer-facing use.
---

# KNOWLEDGE INDEX — Sophia Knowledge Center

> Version: 1.1.0 | Updated: 2026-06-25 | Owner: Carriersfy AI Platform
> Purpose: Master index and relationship map for Sophia's complete knowledge base

---

## File Map

| File | Purpose | Primary Use |
|---|---|---|
| `00_customer_safe_policy.md` | Three-tier language classification, prohibited terms, approved phrases | Language compliance — what Sophia can and cannot say |
| `GLOSSARY.md` | Official definitions for all Carriersfy AI branded terms | Terminology — correct brand language |
| `01_company.md` | Company story, mission, vision, values, history, Communication Philosophy | Who we are — context for all conversations |
| `02_services.md` | Complete service catalog with detail per service | What we offer — service recommendations |
| `03_employees.md` | All 6 Digital Employee profiles + Iron Prime | Who does what — Digital Employee matching |
| `04_industries.md` | 25 industries with challenges and solutions | Who we serve — industry recommendations |
| `05_platform.md` | Platform sections explained in depth | How it works — platform and process questions |
| `06_pricing.md` | Pricing philosophy, structure, ROI framing | How much — pricing conversations |
| `07_faq.md` | 155 FAQs across 10 categories | Common questions — fast lookup |
| `08_case_studies.md` | Light of Life, Brazil Signs, Future (internal draft) | Proof of value — social proof reference |
| `09_sales.md` | Sophia's complete sales playbook | How to convert — sales conversations |
| `10_company_rules.md` | Absolute operating rules for Sophia | Non-negotiables — behavioral guardrails |
| `KNOWLEDGE_INDEX.md` | This file — relationships, expansion guide | Navigation — orientation |

**Total knowledge base:** 13 files | 155 FAQs | 25 industries | 6 Digital Employees + Iron Prime (AI CEO)

> **Sophia Bible:** The combination of `09_sales.md` (playbook), `10_company_rules.md` (rules), and `00_customer_safe_policy.md` (language policy) forms Sophia's core behavioral foundation. These three files govern how Sophia speaks, what she can say, and how she guides conversations. When in doubt about behavior, consult them in that order.

---

## When Sophia Does Not Know

When a question falls outside Sophia's knowledge base, the answer is never a guess. Sophia escalates professionally:

**Sophia's default escalation script:**
> "That is a great question — I want to make sure you get the most accurate answer. Let me connect you with our team. Would a Strategy Call work, or would you prefer I send you a follow-up?"

**Routing logic:**
- Question is about pricing, exact configuration, or client-specific scope → Strategy Call
- Question is about compliance, legal requirements, or data handling → Strategy Call (human must answer)
- Question is about a service capability Sophia is unsure of → Strategy Call
- Question is completely outside Carriersfy AI's domain (e.g., unrelated business advice) → acknowledge the limit, offer to help with what Sophia does know

**What Sophia never does:**
- Guess or speculate on answers she does not have
- Make up capabilities or services
- Reference information from outside her knowledge base as if it were authoritative
- Promise outcomes she cannot confirm

---

## Relationship Map

### How Files Connect to Each Other

The knowledge base is a network, not a list. Every file links to others in specific, predictable ways. Understanding these relationships helps Sophia navigate to the right information faster.

**Language policy governs all files:**
`00_customer_safe_policy.md` → applies before any response is formed. The three-tier classification (customer_safe / internal_only / requires_human_review) determines what Sophia can say. Check this file when uncertain about language.

**Glossary defines all terms:**
`GLOSSARY.md` → defines the canonical brand terms used across all files. When Sophia uses a term from the glossary, she uses the definition found there — not any external or colloquial definition.

**Company context flows through all files:**
`01_company.md` → Every file draws on company context. When Sophia references Carriersfy AI's mission, values, or history in any conversation, she draws from `01_company.md`.

**Service inquiries cascade to specifics:**
`02_services.md` → leads to → `03_employees.md` (which Digital Employee delivers the service) and `04_industries.md` (which industry benefits most from this service).

**Industry questions cascade to employees and services:**
`04_industries.md` → leads to → `03_employees.md` (recommended Digital Employees for this industry) and `02_services.md` (specific services applicable).

**FAQ routing to depth files:**
`07_faq.md` → answers with compressed context, then directs to depth files for more:
- Pricing FAQ answers → `06_pricing.md` for full framing
- Digital Employee FAQ answers → `03_employees.md` for full profiles
- Industry FAQ answers → `04_industries.md` for full industry sections
- Platform FAQ answers → `05_platform.md` for full platform detail

**Sales conversation chain:**
`09_sales.md` (qualification and scripts) → draws on → `03_employees.md` (solution framing) + `04_industries.md` (industry context) + `08_case_studies.md` (social proof) + `06_pricing.md` (ROI conversation)

**Rules govern all other files:**
`10_company_rules.md` → applies to every response from every other file. Rules are the layer on top of all knowledge.

**Case studies support sales:**
`08_case_studies.md` → supports → `09_sales.md` (Step 5: social proof). When Sophia references a client situation in a sales conversation, she draws from `08_case_studies.md` — observing the approval status of any specific claims before using them.

---

## Query Routing Guide

When Sophia receives a question, she identifies which file or files to draw from:

| Question Type | Primary File | Supporting Files |
|---|---|---|
| "What is Carriersfy AI?" | `01_company.md` | `02_services.md` |
| "What services do you offer?" | `02_services.md` | `03_employees.md` |
| "Tell me about [Digital Employee name]" | `03_employees.md` | `02_services.md` |
| "Do you serve [industry]?" | `04_industries.md` | `03_employees.md` |
| "How does the platform work?" | `05_platform.md` | `02_services.md` |
| "How much does it cost?" | `06_pricing.md` → redirect to Strategy Call | `09_sales.md` (pricing objection script) |
| "What is a Digital Employee?" | `07_faq.md` (cat. 2) | `03_employees.md` |
| "Do you have clients like me?" | `08_case_studies.md` | `04_industries.md` |
| "How do I get started?" | `09_sales.md` | `06_pricing.md` |
| "Are you an AI?" | `10_company_rules.md` (Rule 1) | — |
| "What technology do you use?" | `10_company_rules.md` (Rule 2) | — |
| "I don't know the answer" | Escalate per "When Sophia Does Not Know" above | `10_company_rules.md` |

---

## How to Expand This Knowledge Base

### Adding a New FAQ
1. Identify the category it belongs to in `07_faq.md` (10 categories)
2. Add the question following the format: `**Q: [Question]**` + `A: [Answer]`
3. Verify the answer complies with `00_customer_safe_policy.md` before committing
4. Update the FAQ count in `KNOWLEDGE_INDEX.md`

### Adding a New Digital Employee
1. Add a full profile section to `03_employees.md` (following the established structure)
2. Add the new Digital Employee to the relevant industry sections in `04_industries.md`
3. Add 5 FAQs for the new employee to `07_faq.md` (Category 4)
4. Update the sales playbook in `09_sales.md` (matching framework table)
5. Update `07_faq.md` (Category 2, Q: "How many Digital Employees does Carriersfy AI offer?")
6. Update `KNOWLEDGE_INDEX.md` (confirm employee count in file map)

### Adding a New Industry
1. Add a full industry section to `04_industries.md` (following the 4-section structure: Business Challenges, Recommended Digital Employees, What the AI Workforce Does, Business Benefits)
2. Add the industry to the relevant Digital Employee profiles in `03_employees.md`
3. Add 1-2 industry-specific FAQs to `07_faq.md` (Category 7)
4. Update `07_faq.md` (Category 7, Q: "What industries does Carriersfy AI serve?")
5. Update `05_platform.md` (Industry Marketplace section — list of available templates)
6. Update `KNOWLEDGE_INDEX.md` (confirm industry count in file map)

### Adding a New Case Study
1. Add the case study to `08_case_studies.md` following the established structure
2. Confirm proof status for all claims before adding to the file
3. Add a reference to the case study in `09_sales.md` (Step 5: Social Proof section)
4. Add 1-2 relevant FAQs to `07_faq.md` if the case study surfaces new questions

### Adding a New Service
1. Add a full service section to `02_services.md` (following the established structure)
2. Update relevant Digital Employee profiles in `03_employees.md` if they deliver this service
3. Update relevant industry sections in `04_industries.md` if this service applies
4. Add 2-3 FAQs to `07_faq.md` (Category 1 or 2)
5. Update `07_faq.md` (Category 1, Q: "What services do you offer?")

### Updating Pricing Philosophy
1. Edit `06_pricing.md`
2. Check `07_faq.md` Category 8 for any FAQs that need updating
3. Update `09_sales.md` (pricing objection script if ROI framing changes)
4. Verify all changes comply with `00_customer_safe_policy.md` (no dollar figures in customer-facing content)

---

## Module Dependencies

Files that MUST stay in sync with each other:

| When you change... | Also update... |
|---|---|
| Digital Employee roster | `03_employees.md` + `04_industries.md` + `07_faq.md` (cat. 3/4) + `09_sales.md` |
| Industry list | `04_industries.md` + `05_platform.md` + `07_faq.md` (cat. 7) |
| Service catalog | `02_services.md` + `03_employees.md` + `07_faq.md` |
| Pricing philosophy | `06_pricing.md` + `07_faq.md` (cat. 8) + `09_sales.md` |
| Company story or values | `01_company.md` only (referenced indirectly by other files) |
| Operating rules | `10_company_rules.md` + review of all other files for consistency |
| Case studies | `08_case_studies.md` + `09_sales.md` (social proof section) |
| Language policy | `00_customer_safe_policy.md` + review all files for compliance |
| Brand terminology | `GLOSSARY.md` + all files using that term |

---

## Quality Standards for Knowledge Base Content

All content in this knowledge base must meet these standards before use:

1. **No external provider mentions** — See Rule 2 in `10_company_rules.md`. Zero tolerance.
2. **No absolute guarantees** — Use "designed to," "built to," "configured to," "clients typically see" — never "always," "100%," "never missed," "unlimited," or "guaranteed"
3. **No specific prices** — Redirect all pricing to Strategy Call. No figures, ranges, or indicative tiers in customer-facing content.
4. **No unapproved case study claims** — Check `08_case_studies.md` proof status before citing any specific client outcome
5. **Three-tier classification enforced** — Every piece of content must be classifiable as customer_safe, internal_only, or requires_human_review per `00_customer_safe_policy.md`
6. **Active, confident voice** — Present tense, authoritative, no hedging or passive voice
7. **Accurate as of knowledge base version** — If information changes, update the file immediately and bump the version

---

## Version History

| Version | Date | Changes | Files Affected |
|---|---|---|---|
| 1.0.0 | 2026-06-25 | Initial build — 10 content files + index, 155 FAQs, 25 industries, 6 Digital Employees + Iron Prime, 2 case studies | All |
| 1.1.0 | 2026-06-25 | Remediation pass — pricing policy, absolute claims, Iron Prime separation, technology language, case study approval protocol, customer safe policy, glossary, builder flows, front matter | All |

---

## Next Planned Expansions

- `11_competitor_landscape.md` — How to respond to competitive situations (internal reference only)
- `12_objection_library.md` — Expanded objection handling beyond the scripts in `09_sales.md`
- Additional case studies as deployments reach approved outcome status
- FAQ expansion to 200+ questions as real conversation data surfaces new patterns
- Industry-specific sales scripts in `09_sales.md` for top 5 industries

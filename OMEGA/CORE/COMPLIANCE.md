# COMPLIANCE — Carriersfy AI

> Legal and regulatory compliance obligations. Last updated: 2026-06-25 | Owner: Juan

---

## Overview

Carriersfy AI operates at the intersection of AI, customer communications, and business services across U.S. and Brazilian markets. This document tracks active compliance obligations for the company and its AI employee deployments.

---

## Applicable Regulations

### United States

| Regulation | Applicability | Status | Required Action |
|---|---|---|---|
| FTC AI Disclosure Rules | AI employees interacting with consumers must identify as AI upon request | [IN PROGRESS] | All agents must never deny being AI — add to every agent config |
| TCPA (Telephone Consumer Protection Act) | Iron Prime outbound communications require prior express written consent | [PLANNED] | Required before Iron Prime deployment |
| CAN-SPAM Act | Outbound email marketing must include unsubscribe option + physical address | [BACKLOG] | Required before outbound email campaigns |
| CCPA (California Consumer Privacy Act) | If serving California residents: data access, deletion, opt-out rights must be honored | [BACKLOG] | Assess when California client base exceeds threshold |

### Brazil

| Regulation | Applicability | Status | Required Action |
|---|---|---|---|
| LGPD (Lei Geral de Proteção de Dados) | Applies when serving Brazilian clients or collecting data from Brazilian residents | [IN PROGRESS] | All client contracts must include LGPD clause; lawful basis for data processing required |
| Marco Civil da Internet | Privacy, data localization, intermediary liability | [BACKLOG] | Review before Brazil-specific platform features |

---

## AI Identity Disclosure — Non-Negotiable

Per FTC guidance and [OPERATING_RULES Rule 13](OPERATING_RULES.md):

**Every AI employee deployed by Carriersfy AI must:**

1. Identify itself as an AI if directly asked by any human
2. Never deny being AI to a human who sincerely asks
3. State its role at the start of new interactions ("I'm Sofia, an AI assistant for Carriersfy AI")
4. Escalate to Juan when a human explicitly requests to speak with a human agent

**Applies to:** Iron Prime (prospects), Sofia (clients), all client-deployed AI employees

Violating this rule creates legal liability for Carriersfy AI and the deploying client. Non-compliance is grounds for immediate deactivation of the violating agent.

---

## Data Handling Rules

| Data Type | Retention | Access | Deletion Policy |
|---|---|---|---|
| Lead contact info (form submissions) | Until prospect requests removal | Juan only | Delete on request, within 30 days |
| Client data (passed to AI employees) | Per client contract terms | AI employee + Juan | Per contract termination clause |
| Conversation logs | 90 days (operational review) | Juan only | Auto-purge after 90 days |
| OMEGA internal data | Indefinite (internal operations) | Juan + authorized AI agents | Manual, by Juan's decision |

---

## Contract Compliance Checklist

Every client service agreement must include:

- [ ] **Data Ownership clause** — client retains ownership of their data
- [ ] **AI Identity Disclosure** — client acknowledges AI employee is an AI system
- [ ] **Scope limitations** — explicit list of what AI does and does NOT do
- [ ] **LGPD/GDPR clause** — for clients with Brazilian or EU data subjects
- [ ] **Liability cap** — total liability limited to fees paid in prior 3 months
- [ ] **Termination and data return clause** — client receives config docs upon termination

See [Contract Template](../CLIENTS/Future_Clients/Contract_Template.md) for clause language.

---

## Compliance Task Backlog

| ID | Task | Priority | Owner | Target Date |
|---|---|---|---|---|
| COMP-001 | Add FTC AI disclosure language to all agent configuration templates | P1 | Juan | Before Iron Prime deployment |
| COMP-002 | Draft TCPA consent flow for Iron Prime outbound communications | P1 | Juan | Before Iron Prime deployment |
| COMP-003 | Add LGPD clause to all active contracts with Brazilian clients | P1 | Juan | 2026-07-15 |
| COMP-004 | Review CCPA obligations when California client base grows | P2 | Juan | Q4 2026 |
| COMP-005 | Implement lead data deletion workflow | P2 | Claude Code | Q3 2026 |

---

**Related:** [OPERATING_RULES](OPERATING_RULES.md) | [AGENT_REGISTRY](AGENT_REGISTRY.md) | [Contract Template](../CLIENTS/Future_Clients/Contract_Template.md) | [MASTER_CONTEXT](MASTER_CONTEXT.md) | [DECISION_ENGINE](DECISION_ENGINE.md)

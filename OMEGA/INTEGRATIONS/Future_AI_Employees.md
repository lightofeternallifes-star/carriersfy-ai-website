# INTEGRATION: Future AI Employee Platform

- **Entity ID:** CF-INT-012
- **Category:** AI Employee Hosting
- **Status:** [TBD — pending CF-ADR-009]
- **Critical:** High (future) — hosts Iron Prime and Sofia

---

## What It Does (Planned)

The AI Employee Platform is the hosting infrastructure that will run Iron Prime (CF-AGT-001) and Sofia (CF-AGT-002) as persistent, client-facing agents. It handles:
- 24/7 AI agent availability
- Communication channel integrations (email, SMS, voice)
- Memory persistence between conversations
- CRM and calendar tool connections
- AI identity + compliance management

---

## Decision Pending: CF-ADR-009

The platform selection is the most critical pending architectural decision for Carriersfy AI's core product. Options under consideration:

| Platform | Approach | Pros | Cons |
|---|---|---|---|
| Custom (Anthropic API direct) | Build on Claude API + custom infra | Full control, white-label | High dev effort, ongoing maintenance |
| Voiceflow | No-code/low-code agent builder | Fast deployment | Less customization |
| Relevance AI | Agent platform with tool use | Rich tooling | Vendor lock-in risk |
| Botpress | Open-source agent framework | Self-hosted option | More complex setup |
| Retell AI | Voice-first AI agents | Native voice capability | Limited to voice |
| Synthflow | AI voice agents for SMBs | Purpose-built for use case | Newer platform |

---

## Requirements for Selected Platform

The chosen platform must support:

| Requirement | Priority |
|---|---|
| Voice + messaging (SMS/email) | P0 — core product |
| Custom persona per client | P0 — white-label capability |
| CRM integration (HubSpot or custom) | P1 |
| Calendar integration (Google) | P1 |
| Call recording + transcription | P1 |
| Compliance: TCPA, FTC AI disclosure | P0 — legal requirement |
| Multi-client deployment | P0 — scales with business |
| Analytics + reporting | P2 |
| LGPD compliance (Brazil clients) | P1 — Brazil Signs is a client |

---

## Deployment Timeline

1. **CF-ADR-009 resolved:** Juan makes platform decision → Q3 2026
2. **Iron Prime deployment:** First — outbound sales focus
3. **Sofia deployment:** Second — client onboarding + scheduling
4. **Client-specific agents:** Deployed per engagement

---

## Related

- **Deploys:** CF-AGT-001 (Iron Prime), CF-AGT-002 (Sofia)
- **Blocks:** CF-TSK-007, CF-TSK-008
- **Decision:** CF-ADR-009
- **Compliance:** [CORE/COMPLIANCE.md](../CORE/COMPLIANCE.md)
- **Playbook:** [PLAYBOOKS/AI_EMPLOYEE_DEPLOYMENT.md](../PLAYBOOKS/AI_EMPLOYEE_DEPLOYMENT.md)

# PLAYBOOK: AI Employee Deployment

> Deterministic process for deploying a new AI Employee (Iron Prime, Sofia, or client-specific agent). Last updated: 2026-06-25

---

## Trigger

This playbook is triggered when: a new AI employee is ready for deployment — either a Carriersfy AI employee (Iron Prime, Sofia) or a client-specific agent.

**Prerequisites:** Agent purpose and persona defined | Hosting platform decision made (CF-ADR-009) | Compliance review complete | Juan has approved deployment

---

## Phase 1: Pre-Deployment Checklist

### Step 1 — Verify OMEGA Agent Registration
- [ ] Agent has CF-AGT-{NNN} entity ID in AGENT_REGISTRY
- [ ] `AI/{agent_name}/Purpose.md` exists with all required fields per [SCHEMAS/AGENT.md](../SCHEMAS/AGENT.md)
- [ ] Permission level documented and approved by Juan

### Step 2 — Compliance Review
- [ ] AI identity disclosure mechanism confirmed (Rule 13: must disclose AI identity on direct inquiry)
- [ ] Communication scope defined (no scope creep beyond authorized channels)
- [ ] TCPA compliance: opt-in mechanism in place for any SMS/voice outbound
- [ ] LGPD/GDPR: data handling documented for any client data accessed
- [ ] No client financial data in agent memory scope

### Step 3 — Hosting Platform Ready
- [ ] CF-ADR-009 resolved — platform selected
- [ ] Platform account created and configured
- [ ] API credentials obtained and stored securely (NOT in git, NOT in OMEGA)
- [ ] INTEGRATIONS/{platform}.md created and added to INDEXES/INTEGRATIONS.md

---

## Phase 2: Agent Configuration

### Step 4 — Persona and System Prompt
- [ ] Write system prompt defining: name, role, tone, scope, limitations
- [ ] Define what agent CAN do vs. CANNOT do (explicitly)
- [ ] Include AI identity disclosure instruction in system prompt
- [ ] Store prompt in `AI/{agent_name}/System_Prompt.md`

### Step 5 — Tool Integrations
- [ ] Configure which tools agent has access to (email, calendar, CRM, etc.)
- [ ] For each tool: verify OAuth scopes are minimal (principle of least privilege)
- [ ] Test each tool connection in staging before production

### Step 6 — Memory Setup
- [ ] Define memory scope: what data the agent retains between conversations
- [ ] Configure conversation memory (session vs. persistent)
- [ ] If accessing OMEGA: read-only scope only (no OMEGA write for client-facing agents)
- [ ] Test memory: verify agent cannot access data outside its defined scope

---

## Phase 3: Staging Validation

### Step 7 — Staging Test — Core Flows
- [ ] Test primary workflow end-to-end (e.g., Iron Prime: prospect inquiry → qualification → handoff)
- [ ] Test edge cases: confused user, off-topic question, complaint
- [ ] Test AI identity disclosure: ask agent "are you an AI?" — must answer honestly
- [ ] Test error handling: what happens when a tool fails?

### Step 8 — Tone and Persona Review
- [ ] Juan reviews 3+ sample conversations
- [ ] Tone matches Carriersfy AI brand (professional, helpful, clear)
- [ ] No hallucinations about Carriersfy AI capabilities or pricing
- [ ] Escalation path clear: when to hand off to Juan

### Step 9 — Compliance Spot-Check
- [ ] Legal review if agent will handle contracts or payments
- [ ] Run 5+ edge-case prompts to check for policy violations
- [ ] Document any identified risks and mitigations

---

## Phase 4: Production Deployment

### Step 10 — Go-Live
- [ ] Switch agent from staging to production endpoint
- [ ] Update AGENT_REGISTRY status from [PLANNED] → [ACTIVE]
- [ ] Update INDEXES/AGENTS.md
- [ ] Update MASTER_CONTEXT.md team table

### Step 11 — Monitoring Setup
- [ ] Configure alerts: error rate, conversation drop-off, escalation rate
- [ ] Define health metrics: conversations/day, resolution rate, escalation %
- [ ] Schedule first review: 7 days post-launch

### Step 12 — Client Notification (if client-facing)
- [ ] Notify client that agent is live
- [ ] Provide client with: agent contact channel, what agent can/cannot do, how to escalate
- [ ] Update `CLIENTS/{name}/AI_Employees.md` with deployment date and status

---

## Completion Criteria

- [ ] Agent status in AGENT_REGISTRY = [ACTIVE]
- [ ] All compliance checkboxes cleared
- [ ] Staging tests passed and documented
- [ ] Monitoring in place
- [ ] MASTER_CONTEXT.md updated

---

**Related:** [SCHEMAS/AGENT.md](../SCHEMAS/AGENT.md) | [INTEGRATIONS/Future_AI_Employees.md](../INTEGRATIONS/Future_AI_Employees.md) | [CORE/COMPLIANCE.md](../CORE/COMPLIANCE.md) | [CORE/DECISION_ENGINE.md](../CORE/DECISION_ENGINE.md) — CF-ADR-009

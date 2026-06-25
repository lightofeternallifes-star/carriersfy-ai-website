# AI Employee Evaluation Criteria — Carriersfy AI

> How to measure AI employee performance. Last updated: 2026-06-25

---

## Core Performance Dimensions

### 1. Task Completion Rate
**Definition:** % of inbound requests handled successfully without human intervention  
**Target:** >85% for mature agents (3+ months live)  
**Measurement:** Count of autonomous completions / total requests received  
**Red flag:** <70% — agent is not covering its core use case

---

### 2. Response Quality Score
**Definition:** % of responses rated as accurate, appropriate, and on-brand  
**Target:** >90%  
**Measurement:** Weekly sample review (10–20 conversations) scored by Juan or client  
**Red flag:** Responses that are factually wrong, off-brand, or create client risk

---

### 3. Response Time
**Definition:** Time from inbound message to agent response  
**Target:** <2 minutes for async channels (email, WhatsApp); <10 seconds for web chat  
**Measurement:** Timestamp comparison in logs  
**Red flag:** >15 minutes average

---

### 4. Escalation Rate
**Definition:** % of conversations escalated to a human  
**Target:** <15% after first month; <10% after 3 months  
**Measurement:** Count of escalations / total conversations  
**Note:** Too-low escalation rate can also be a problem — agent may be handling things it should escalate

---

### 5. Business Impact
**Definition:** Measurable change in the KPI the agent was hired to improve  
**Examples:**
- Iron Prime: qualified meetings booked per week
- Quote AI: average quote response time (before vs. after)
- Support AI: % of tickets resolved without human (deflection rate)
- Appointment AI: no-show rate, scheduling capacity utilization

**Target:** Demonstrable improvement vs. pre-deployment baseline  
**Measurement:** Compare 30-day pre-deployment vs. 30-day post-deployment metrics

---

### 6. Client Satisfaction
**Definition:** Client's subjective assessment of the AI employee's performance  
**Target:** >8/10 on monthly satisfaction check  
**Measurement:** Monthly check-in call with client; informal NPS-style question  
**Red flag:** Client asking to pause or end the engagement

---

## Evaluation Schedule

| Check | Frequency | Owner |
|---|---|---|
| Conversation sample review | Weekly (first month), monthly thereafter | Juan |
| Business impact measurement | Monthly | Juan + Client |
| Client satisfaction check | Monthly | Sofia (when deployed) |
| Technical health review | Monthly | Claude Code |
| Annual capability assessment | Annually | Juan |

---

## Improvement Protocol

When an evaluation finds underperformance:

1. **Identify root cause:** Wrong knowledge base? Missing conversation flow? Integration error? Unclear scope?
2. **Classify severity:** P0 (client-facing failure), P1 (quality issue), P2 (optimization opportunity)
3. **Create task in TASK_ENGINE:** Assigned to Claude Code for technical fixes, Juan for scope issues
4. **Implement and test fix:** Claude Code makes change; 20+ test conversations before redeployment
5. **Re-evaluate in 2 weeks:** Confirm issue resolved
6. **Document in agent's OMEGA files:** Update Capabilities.md or Memory_Scope.md as needed

---

**Related:** [Hiring_Framework](Hiring_Framework.md) | [TASK_ENGINE](../../CORE/TASK_ENGINE.md) | [OPERATING_RULES](../../CORE/OPERATING_RULES.md)

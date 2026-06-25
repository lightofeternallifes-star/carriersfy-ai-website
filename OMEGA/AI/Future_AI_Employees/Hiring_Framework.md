# AI Employee Hiring Framework — Carriersfy AI

> How to define, build, and onboard a new AI employee. Last updated: 2026-06-25

---

## When to Hire a New AI Employee

Hire a new AI employee when:
1. A **recurring workflow** exists that no current AI employee is covering
2. The workflow is **high-volume and repeatable** — at least 10+ instances per week
3. The workflow can be **clearly scoped** — defined inputs, outputs, and escalation paths
4. A human is currently doing the work and their time would be better spent elsewhere
5. The workflow does **not** require judgment calls that require human relationship context

Do NOT create an AI employee for:
- One-off tasks (use Claude Code or Claude Design directly)
- Tasks requiring financial commitments
- Tasks requiring legal judgment
- Tasks where the client relationship is at a sensitive juncture

---

## Step 1: Define the Role

Fill out this template before building anything:

```
AI Employee Name: [Name — should be a real-sounding name with a distinctive identity]
Role Category: [Sales / Operations / Support / Technical / Creative]
Primary Client: [Internal / Specific client / All clients]
Mission: [One sentence — what this agent exists to do]
Core Responsibilities: [3–7 specific tasks]
What It Does NOT Do: [3–5 explicit exclusions]
Languages: [EN / PT-BR / ES]
Channels: [Email / WhatsApp / Web chat / Phone]
Success Metric: [How we measure if this agent is doing its job]
```

---

## Step 2: Define Memory Scope

- What does this agent need to know to do its job?
- Where does that knowledge live? (OMEGA, CRM, product database, client files)
- What client data will it access?
- What will it write / update?

---

## Step 3: Define Permissions

Use the Permission Matrix format from [AGENT_REGISTRY](../../CORE/AGENT_REGISTRY.md).

Every permission must be:
- Explicitly granted (not assumed)
- Scoped to specific systems
- Reviewed by Juan before deployment

---

## Step 4: Create OMEGA Files

Create a folder: `/OMEGA/AI/[AgentName]/`

With the 6 standard files:
- `Purpose.md`
- `Capabilities.md`
- `Memory_Scope.md`
- `Permissions.md`
- `Dependencies.md`
- `Future_Evolution.md`

Add the agent to [AGENT_REGISTRY](../../CORE/AGENT_REGISTRY.md).

---

## Step 5: Build and Test

1. Configure the AI with system prompt + knowledge base
2. Run 50+ test scenarios — include edge cases and adversarial inputs
3. Ensure escalation paths work (what happens when agent can't handle a request?)
4. Ensure identity disclosure works (agent must acknowledge being AI if directly asked)
5. Have Juan review 10 sample conversations before live deployment

---

## Step 6: Deploy

1. Deploy to the defined hosting platform
2. Connect to all required integrations
3. Run in "shadow mode" (agent drafts responses, human sends them) for first week
4. After 1 week of clean performance, move to autonomous mode
5. Update agent status to [LIVE] in AGENT_REGISTRY and OMEGA

---

## Step 7: Monitor and Optimize

- Review agent conversations weekly for first month
- Monthly review thereafter
- Log any failures or edge cases as tasks for resolution
- Update training data when new scenarios are discovered
- Document evolution in `Future_Evolution.md`

---

**Related:** [Role_Templates](Role_Templates.md) | [Capability_Registry](Capability_Registry.md) | [AGENT_REGISTRY](../../CORE/AGENT_REGISTRY.md) | [OPERATING_RULES](../../CORE/OPERATING_RULES.md)

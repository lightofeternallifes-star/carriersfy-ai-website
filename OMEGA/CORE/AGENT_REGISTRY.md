# AGENT REGISTRY — Carriersfy AI

> Master index of all AI agents/employees deployed or planned. Last updated: 2026-06-25 | Fast lookup: [INDEXES/AGENTS.md](../INDEXES/AGENTS.md)

---

## Registry Overview

| Entity ID | Agent | Type | Role | Status | Client Facing | Detail |
|---|---|---|---|---|---|---|
| CF-AGT-001 | [Iron Prime](#iron-prime) | Sales AI | Lead generation, outbound prospecting, qualification | [PLANNED] | Yes — prospects | [→](../AI/Iron_Prime/Purpose.md) |
| CF-AGT-002 | [Sofia](#sofia) | Operations AI | Client onboarding, scheduling, internal ops | [PLANNED] | Yes — active clients | [→](../AI/Sofia/Purpose.md) |
| CF-AGT-003 | [Claude Code](#claude-code) | Engineering AI | Development, deployment, infrastructure, debugging | [ACTIVE] | No — internal only | [→](../AI/Claude_Code/Purpose.md) |
| CF-AGT-004 | [Claude Design](#claude-design) | Design AI | UI/UX design, brand assets, visual direction | [ACTIVE — on-demand] | No — internal only | [→](../AI/Claude_Design/Purpose.md) |

---

## Iron Prime {#iron-prime}

| Attribute | Value |
|---|---|
| **Full Name** | Iron Prime |
| **Role** | Sales AI Employee |
| **Status** | [PLANNED] — not yet deployed |
| **Primary Function** | Outbound lead generation, prospect research, qualification, initial outreach |
| **Target Users** | Business owners, operations managers, COOs at SMBs |
| **Memory Scope** | Prospect profiles, outreach history, qualification criteria, industry context |
| **Client Facing** | Yes — communicates with prospects on behalf of Carriersfy AI |
| **Permission Level** | Email outreach, CRM write, calendar read (no financial, no client data access) |
| **Hosting** | TBD — see [ADR-009](DECISION_ENGINE.md) |
| **Active Clients** | None yet |
| **Assigned Tasks** | [TASK-007](TASK_ENGINE.md) — Define and deploy |
| **Detail** | [Iron Prime Full Profile](../AI/Iron_Prime/Purpose.md) |

---

## Sofia {#sofia}

| Attribute | Value |
|---|---|
| **Full Name** | Sofia |
| **Role** | Operations AI Employee |
| **Status** | [PLANNED] — not yet deployed |
| **Primary Function** | Client onboarding coordination, meeting scheduling, internal workflow management, follow-up communications |
| **Target Users** | Carriersfy AI team (internal), active clients during onboarding |
| **Memory Scope** | Client contacts, project timelines, meeting notes, onboarding checklists |
| **Client Facing** | Yes — handles onboarding communications and scheduling for active clients |
| **Permission Level** | Calendar read/write, email send (client comms), task creation, CRM update |
| **Hosting** | TBD — see [ADR-009](DECISION_ENGINE.md) |
| **Active Clients** | None yet |
| **Planned Tasks (activates upon deployment)** | [TASK-002](TASK_ENGINE.md), [TASK-003](TASK_ENGINE.md), [TASK-004](TASK_ENGINE.md), [TASK-008](TASK_ENGINE.md) |
| **Detail** | [Sofia Full Profile](../AI/Sofia/Purpose.md) |

---

## Claude Code {#claude-code}

| Attribute | Value |
|---|---|
| **Full Name** | Claude Code (Anthropic CLI) |
| **Model** | claude-sonnet-4-6 (current) |
| **Role** | Engineering AI — lead developer |
| **Status** | [ACTIVE] — primary engineering agent |
| **Primary Function** | Write, review, and deploy code. Debug production issues. Build new features. Maintain infrastructure. |
| **Memory Scope** | OMEGA system (this directory), project files in working directory, git history |
| **Client Facing** | No — internal only. Outputs are reviewed by Juan before client delivery. |
| **Permission Level** | Read/write to project files, git operations, bash commands (sandboxed), web fetch |
| **Hosting** | Local — runs on Juan's machine via Claude Code CLI / claude.ai |
| **Active Projects** | Carriersfy AI Website (maintenance), Carriersfy Platform (upcoming) |
| **Capabilities** | Full-stack development, DevOps, API integration, code review, security review |
| **Upgrade Path** | claude-opus-4-8 for complex architectural tasks |
| **Detail** | [Claude Code Full Profile](../AI/Claude_Code/Purpose.md) |

---

## Claude Design {#claude-design}

| Attribute | Value |
|---|---|
| **Full Name** | Claude Design (Anthropic multimodal) |
| **Role** | Design AI — visual assets and UI/UX feedback |
| **Status** | [ACTIVE — on-demand] |
| **Primary Function** | Generate and iterate on visual assets, review UI/UX, provide brand direction, create mockups |
| **Memory Scope** | Brand constants (colors, fonts, tone), existing asset library, design decisions |
| **Client Facing** | No — outputs reviewed internally before use |
| **Permission Level** | Image generation, file creation, brand guidelines read |
| **Hosting** | Anthropic API / claude.ai (on-demand) |
| **Brand Constants** | Background: #070B16, Blue: #1FA2FF, Red: #FF2E3C, Fonts: Space Grotesk + Manrope |
| **Detail** | [Claude Design Full Profile](../AI/Claude_Design/Purpose.md) |

---

## Future AI Employees

| Planned Role | Purpose | Timeline |
|---|---|---|
| AI Employee #5 | TBD — support or content | Q4 2026 |
| AI Employee #6 | TBD — analytics or finance | Q4 2026 |
| Client-Specific Agents | Deployed per-client for operations | Per engagement |

Full framework: [Future AI Employees Hiring Framework](../AI/Future_AI_Employees/Hiring_Framework.md)

---

## Agent Permission Matrix

| Capability | Iron Prime | Sofia | Claude Code | Claude Design |
|---|---|---|---|---|
| Email send — prospects | ✅ | ❌ | ❌ | ❌ |
| Email send — clients | ❌ | ✅ | ❌ | ❌ |
| Calendar read | ✅ | ✅ | ❌ | ❌ |
| Calendar write | ❌ | ✅ | ❌ | ❌ |
| CRM read | ✅ | ✅ | ❌ | ❌ |
| CRM write | ✅ | ✅ | ❌ | ❌ |
| Code write | ❌ | ❌ | ✅ | ❌ |
| Code deploy | ❌ | ❌ | ✅ (w/ approval) | ❌ |
| File system | ❌ | ❌ | ✅ | ✅ (images) |
| Client financial data | ❌ | ❌ | ❌ | ❌ |
| OMEGA read | ✅ | ✅ | ✅ | ✅ |
| OMEGA write | ❌ | ✅ | ✅ | ❌ |

---

**Related:** [MASTER_CONTEXT](MASTER_CONTEXT.md) | [KNOWLEDGE_GRAPH](KNOWLEDGE_GRAPH.md) | [OPERATING_RULES](OPERATING_RULES.md) | [Iron Prime](../AI/Iron_Prime/Purpose.md) | [Sofia](../AI/Sofia/Purpose.md) | [Claude Code](../AI/Claude_Code/Purpose.md)

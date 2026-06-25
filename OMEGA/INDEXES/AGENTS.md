# INDEXES/AGENTS — Carriersfy AI

> Fast O(1) lookup for all AI agents and employees. Every agent has a canonical entity ID. Last updated: 2026-06-25

---

## Agent Index

| Entity ID | Agent Name | Role | Type | Status | Client Facing |
|---|---|---|---|---|---|
| CF-AGT-001 | Iron Prime | Sales AI — Lead Generation | AI Employee | [PLANNED] | Yes — prospects |
| CF-AGT-002 | Sofia | Operations AI — Client Onboarding | AI Employee | [PLANNED] | Yes — active clients |
| CF-AGT-003 | Claude Code | Engineering AI — Lead Developer | AI Tool | [ACTIVE] | No — internal only |
| CF-AGT-004 | Claude Design | Design AI — UI/UX + Assets | AI Tool | [ACTIVE — on-demand] | No — internal only |

---

## Quick Lookup

### By Status
- **[ACTIVE]:** CF-AGT-003
- **[ACTIVE — on-demand]:** CF-AGT-004
- **[PLANNED]:** CF-AGT-001, CF-AGT-002

### By Type
- **AI Employee (client-facing):** CF-AGT-001, CF-AGT-002
- **AI Tool (internal):** CF-AGT-003, CF-AGT-004

### By Capability
- **Outbound sales / lead gen:** CF-AGT-001
- **Client communications + scheduling:** CF-AGT-002
- **Code + deployment + infrastructure:** CF-AGT-003
- **Design + visual assets:** CF-AGT-004

---

## Agent → Task Assignments

| Agent | Active Tasks |
|---|---|
| CF-AGT-001 (Iron Prime) | CF-TSK-007 |
| CF-AGT-002 (Sofia) | CF-TSK-002, CF-TSK-003, CF-TSK-004, CF-TSK-008 (activates upon deployment) |
| CF-AGT-003 (Claude Code) | CF-TSK-001, CF-TSK-005, CF-TSK-006, CF-TSK-009, CF-TSK-010, CF-TSK-011, CF-TSK-012, CF-TSK-013 |
| CF-AGT-004 (Claude Design) | None currently assigned |

---

## Detail Links

| Entity ID | Detail Document |
|---|---|
| CF-AGT-001 | [AI/Iron_Prime/Purpose.md](../AI/Iron_Prime/Purpose.md) |
| CF-AGT-002 | [AI/Sofia/Purpose.md](../AI/Sofia/Purpose.md) |
| CF-AGT-003 | [AI/Claude_Code/Purpose.md](../AI/Claude_Code/Purpose.md) |
| CF-AGT-004 | [AI/Claude_Design/Purpose.md](../AI/Claude_Design/Purpose.md) |

---

## Permission Summary

| Capability | CF-AGT-001 | CF-AGT-002 | CF-AGT-003 | CF-AGT-004 |
|---|---|---|---|---|
| Email — prospects | ✅ | ❌ | ❌ | ❌ |
| Email — clients | ❌ | ✅ | ❌ | ❌ |
| Code write + deploy | ❌ | ❌ | ✅ | ❌ |
| Design / image gen | ❌ | ❌ | ❌ | ✅ |
| OMEGA write | ❌ | ✅ | ✅ | ❌ |
| OMEGA read | ✅ | ✅ | ✅ | ✅ |
| Client financial data | ❌ | ❌ | ❌ | ❌ |

---

**Full registry:** [CORE/AGENT_REGISTRY.md](../CORE/AGENT_REGISTRY.md) | **Deployment playbook:** [PLAYBOOKS/AI_EMPLOYEE_DEPLOYMENT.md](../PLAYBOOKS/AI_EMPLOYEE_DEPLOYMENT.md)

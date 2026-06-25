# INTEGRATION: Anthropic API

- **Entity ID:** CF-INT-005
- **Category:** AI Model Provider
- **Status:** [ACTIVE]
- **Critical:** High — powers all Claude agents

---

## What It Does

Anthropic provides the AI models that power all Claude-based agents at Carriersfy AI: Claude Code (engineering), Claude Design (visual), and future custom AI employee capabilities.

---

## Models in Use

| Model ID | Use Case | Tier |
|---|---|---|
| claude-sonnet-4-6 | Claude Code default — all development work | Standard |
| claude-opus-4-8 | Complex architectural decisions, deep analysis | Premium |
| claude-haiku-4-5 | High-volume, low-latency tasks (future) | Fast |

---

## Access Methods

| Method | Used For |
|---|---|
| Claude Code CLI | Primary development agent (CF-INT-004) |
| claude.ai web | Claude Design, ad-hoc analysis |
| Anthropic API (REST) | Future: AI employee platform integrations |

---

## Future Integrations

When Iron Prime (CF-AGT-001) and Sofia (CF-AGT-002) are deployed, they may use:
- Claude API for natural language understanding
- Custom system prompts stored in OMEGA/AI/{agent}/
- Tool use capabilities for CRM, calendar, email actions

The hosting decision (CF-ADR-009) will determine whether Anthropic API is called directly or via a third-party AI employee platform.

---

## Cost Management

- Monitor usage in Anthropic console
- claude-sonnet-4-6 for day-to-day work (cost-effective)
- Escalate to claude-opus-4-8 only for complex multi-step architectural work
- Log major model upgrade decisions as ADRs

---

## Related

- **Powers:** CF-INT-004 (Claude Code), CF-AGT-003, CF-AGT-004
- **Future:** CF-AGT-001, CF-AGT-002 deployment (CF-ADR-009)

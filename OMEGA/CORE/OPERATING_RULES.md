# OPERATING RULES — Carriersfy AI OMEGA

> Non-negotiable rules for every agent operating within Carriersfy AI systems. Last updated: 2026-06-25

---

## Rule 1: Read Before You Act

**Before any task:** Read `CORE/MASTER_CONTEXT.md`. This is non-optional. It takes 60 seconds and prevents duplicated effort, broken assumptions, and conflicting decisions.

**Before any code change:** Read the affected file(s). Never edit blind.

**Before any client communication:** Read the client's full OMEGA folder. Never contact a client without knowing their history.

---

## Rule 2: Never Ship Broken Customer-Facing Experiences

Every form, link, email, and interaction that a prospect or client can trigger must work exactly as designed before it is called complete.

- Contact forms must send emails (verified with a real submission)
- Links must resolve
- Email confirmations must arrive
- Loading states must be handled
- Error states must show a human message, never a raw stack trace

The Carriersfy AI Website contact form was broken for an unknown period (no backend at all). This is the canonical example of what not to ship. See [ADR-002](DECISION_ENGINE.md).

---

## Rule 3: All Credentials Live in Environment Variables

No API key, secret, password, or token is ever committed to Git. Ever.

| Correct | Wrong |
|---|---|
| `env.RESEND_API_KEY` in Cloudflare Pages env vars | `const key = "re_abc123..."` in contact.js |
| `.env` file locally (gitignored) | `.env` committed to repo |
| Secret manager (future) | Hardcoded in source |

If you find a hardcoded credential, remove it and rotate the key immediately.

---

## Rule 4: Every Decision Gets Documented

When a significant technical or business decision is made:
1. Add an ADR to `CORE/DECISION_ENGINE.md`
2. Link to it from the relevant project's `DECISIONS.md`
3. Note what alternatives were rejected and why

"We just did it this way" is not acceptable documentation. Future agents (and humans) must be able to reconstruct your reasoning.

---

## Rule 5: Update OMEGA After Every Significant Session

Within 24 hours of any significant work:
- Update `PROJECTS/[Name]/CURRENT_STATUS.md`
- Update `CORE/MASTER_CONTEXT.md` if company-level state changed
- Close completed tasks in `CORE/TASK_ENGINE.md`
- Add completed work to `PROJECTS/[Name]/CHANGELOG.md`

Stale OMEGA is worse than no OMEGA — it actively misleads future agents.

---

## Rule 6: Cross-Link Aggressively

Every document must reference related documents. There are no orphan documents in OMEGA.

```
Good: "See [CLIENT_REGISTRY](../CORE/CLIENT_REGISTRY.md) for full client list."
Bad:  A document with no outgoing links to related OMEGA files.
```

Minimum cross-links per document:
- Every CORE file: links to at least 4 other CORE files
- Every project README: links to CLIENT_REGISTRY, MASTER_CONTEXT, and all 7 sibling files
- Every client profile: links to their project folder and the CLIENT_REGISTRY
- Every AI agent profile: links to AGENT_REGISTRY and their assigned projects

---

## Rule 7: Status Badges Are Mandatory

Every entity in OMEGA must have a current status. Use exactly these badges:

| Badge | Meaning |
|---|---|
| `[LIVE]` | Deployed and operational in production |
| `[IN PROGRESS]` | Actively being built or executed |
| `[PLANNED]` | Scheduled but not yet started |
| `[BACKLOG]` | Captured but not yet scheduled |
| `[BLOCKED]` | Cannot proceed — dependency named |
| `[DONE]` | Complete and verified |
| `[CANCELLED]` | Explicitly abandoned — reason noted |
| `[UNKNOWN — NEEDS ASSESSMENT]` | State is genuinely unknown — discovery required |
| `[DEPRECATED]` | Replaced by something else — link to replacement |

Do not invent new status badges without updating this document.

---

## Rule 8: No Placeholder Content

Every OMEGA document must contain real, actionable information. If information is not known, the correct response is:

```
Status: Requires discovery meeting.
Action: [TASK-XXX] — Schedule by YYYY-MM-DD, assigned to [name].
```

"To be filled in later" with no action item is not acceptable.

---

## Rule 9: Agents Do Not Exceed Their Permission Scope

Every AI employee has a defined permission level in `CORE/AGENT_REGISTRY.md` and in their individual `AI/[AgentName]/Permissions.md`.

No agent:
- Accesses systems outside their defined scope
- Communicates with clients unless explicitly permitted
- Makes financial commitments
- Deploys to production without Juan's approval (except Claude Code on approved tasks)
- Writes to client data systems without client consent

When in doubt, stop and ask Juan.

---

## Rule 10: Version Everything That Ships

Every client deliverable is versioned:
- Use semantic versioning: `V1.0`, `V1.1`, `V1.1.1`
- Every version has an entry in the project's `CHANGELOG.md`
- Major versions (V1 → V2) require a new entry in `DECISION_ENGINE.md`
- Hotfixes are patch versions (V1.1 → V1.1.1)

---

## Rule 11: Naming Conventions

| Element | Convention | Example |
|---|---|---|
| CORE files | SCREAMING_SNAKE_CASE | `MASTER_CONTEXT.md` |
| Project folders | Title_Case_With_Underscores | `Carriersfy_AI_Website/` |
| Client folders | Title_Case_With_Underscores | `Brazil_Signs/` |
| AI agent folders | Title_Case | `Iron_Prime/` |
| Client files | Title_Case | `Business_Profile.md` |
| Git branches | kebab-case | `feat/contact-form-fix` |
| Environment variables | SCREAMING_SNAKE_CASE | `RESEND_API_KEY` |
| API endpoints | kebab-case | `/api/contact` |

---

## Rule 12: The Contact Email is juan@carriersfy.ai

All critical alerts, escalations, and client communications copy or direct to `juan@carriersfy.ai`. This is the single owner address. `hello@carriersfy.ai` is a secondary team inbox.

No AI employee sends a final email to a client or prospect without Juan having an opportunity to review, unless Juan has explicitly pre-approved the message template.

---

**Related:** [MEMORY_PROTOCOL](MEMORY_PROTOCOL.md) | [MASTER_CONTEXT](MASTER_CONTEXT.md) | [AGENT_REGISTRY](AGENT_REGISTRY.md) | [COMPANY_CONSTITUTION](COMPANY_CONSTITUTION.md)

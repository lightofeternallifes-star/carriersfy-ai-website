# Permissions — Claude Code

> Last updated: 2026-06-25

---

## Permitted

| Action | Scope | Notes |
|---|---|---|
| Read all files in working directory | All projects in scope | Primary tool for understanding code |
| Write/edit code files | Active project files only | Never edit production secrets |
| Run bash commands | Local environment only | Sandboxed — no destructive operations without confirmation |
| Git read operations | All repositories in scope | status, log, diff, blame |
| Git write operations | Commits, branches | Juan must approve push to main for major changes |
| Deploy to staging / preview | Cloudflare Pages preview deployments | Auto-deploy from non-main branches |
| Deploy to production | Via merge to main | Only with Juan's approval for significant changes |
| Read all OMEGA files | Full access | |
| Write to OMEGA | All sections | Keep OMEGA current after each session |
| Install packages | Development dependencies | Must document new dependencies in DEPENDENCIES.md |
| Read environment variable names | Yes (from code) | Never log or output values |

---

## Prohibited

| Prohibited | Reason |
|---|---|
| Hard-code credentials anywhere | Security — absolute rule |
| Force-push to main without Juan approval | Destructive — could lose work |
| Delete production data | Irreversible |
| Run database migrations in production without Juan review | Data integrity |
| Contact clients or prospects | Not Claude Code's scope |
| Modify billing or subscription settings | Out of scope |
| Skip security review for customer-facing changes | Safety |

---

**Related:** [Purpose](Purpose.md) | [OPERATING_RULES](../../CORE/OPERATING_RULES.md)

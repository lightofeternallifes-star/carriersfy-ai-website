# PLAYBOOK: Quarterly Review

> OMEGA health check and business review protocol. Execute every quarter. Last updated: 2026-06-25

---

## Trigger

This playbook runs at the start of each quarter (Jan 1, Apr 1, Jul 1, Oct 1).

**Time required:** 2–4 hours | **Owner:** Juan (with Claude Code assistance)

---

## Phase 1: OMEGA Audit (1 hour)

### Step 1 — File Integrity Check
- [ ] Run: `find OMEGA/ -name "*.md" | wc -l` — track total file count over time
- [ ] Verify no local machine paths exist: `grep -r "/Users/" OMEGA/`
- [ ] Verify no secrets exist: `grep -ri "api_key\|password\|secret\|token" OMEGA/ --include="*.md"`
- [ ] Check for broken internal links (manually spot-check 10 random links)

### Step 2 — Registry Reconciliation
- [ ] CLIENT_REGISTRY ↔ INDEXES/CLIENTS: same clients, same count
- [ ] PROJECT_REGISTRY ↔ INDEXES/PROJECTS: same projects, same count
- [ ] AGENT_REGISTRY ↔ INDEXES/AGENTS: same agents, same statuses
- [ ] TASK_ENGINE ↔ INDEXES/TASKS: all open tasks present, no orphaned tasks
- [ ] DECISION_ENGINE ↔ INDEXES/DECISIONS: all ADRs indexed

### Step 3 — Stale Content Review
- [ ] Review all tasks with status OPEN and due dates in the past — update or cancel
- [ ] Review all ADRs with status PENDING — have any been implicitly decided? Update.
- [ ] Review MASTER_CONTEXT.md priorities — still accurate?
- [ ] Check client health statuses — any that need updating based on actual relationship?

---

## Phase 2: Business Review (1 hour)

### Step 4 — Revenue Review
- [ ] List all active clients and their monthly value
- [ ] Calculate MRR total
- [ ] Calculate quarter-over-quarter MRR change
- [ ] Update LTV tiers if monthly values have changed
- [ ] Identify any at-risk clients

### Step 5 — Client Health Review
Per active client:
- [ ] Last touchpoint date — is it within expected cadence?
- [ ] Any open deliverables past due?
- [ ] Client satisfaction — any issues flagged?
- [ ] Renewal risk — contract end date approaching?
- [ ] Upsell opportunity — are there unscoped needs?

### Step 6 — Pipeline Review
- [ ] Review [Future Clients Pipeline](../CLIENTS/Future_Clients/Pipeline.md)
- [ ] Remove prospects who have gone cold (> 90 days no response)
- [ ] Update stages for active prospects
- [ ] Iron Prime activity (if deployed): review outreach metrics

---

## Phase 3: Technical Review (30 min)

### Step 7 — Infrastructure Health
- [ ] Check carriersfy.ai uptime (Cloudflare Analytics)
- [ ] Check contact form: submit a test — email received?
- [ ] Check domain expiration date for carriersfy.ai
- [ ] Check Resend domain verification status
- [ ] Review Cloudflare security settings — any warnings?

### Step 8 — Dependency Updates
- [ ] Check `codex/` for outdated npm packages: `npm outdated`
- [ ] Review any deprecation warnings in Cloudflare Pages build logs
- [ ] Check if Anthropic has released a new recommended model

---

## Phase 4: Planning (1 hour)

### Step 9 — OKR / Goal Review
- [ ] Review previous quarter's goals — hit, miss, or partial?
- [ ] Set 3–5 goals for the upcoming quarter
- [ ] Create CF-TSK-{NNN} entries for each major initiative

### Step 10 — OMEGA Version Update
- [ ] Bump OMEGA version: `v1.{minor}.{patch}` for regular updates
- [ ] Update version stamp in `README.md` and `MASTER_CONTEXT.md`
- [ ] Add version entry to `CORE/VERSION_STRATEGY.md` changelog

### Step 11 — Scaling Check
- [ ] Evaluate OMEGA v1 vs v2 migration triggers (see [VERSION_STRATEGY.md](../CORE/VERSION_STRATEGY.md)):
  - Any registry over 100 rows? → Plan v2 migration
  - Client count > 50? → Plan v2 migration
  - Team > 5 people? → Plan v2 migration
- [ ] If migration needed: create migration task CF-TSK-{NNN} and trigger [PLAYBOOKS/VERSION_MIGRATION.md](VERSION_MIGRATION.md)

---

## Quarter Review Output Document

Create `OMEGA/CORE/NOTES.md` entry:

```
## Quarterly Review: Q{N} {YYYY}
- **Date:** YYYY-MM-DD
- **MRR:** $X,XXX
- **Clients:** N active
- **Projects:** N active
- **Open tasks:** N (P0: X, P1: X, P2: X)
- **OMEGA version:** v1.X.X → v1.X.X+1
- **Key decisions made this quarter:** [ADR list]
- **Goals for Q{N+1}:** [list]
- **Infrastructure health:** [OK / issues found]
```

---

**Related:** [CORE/VERSION_STRATEGY.md](../CORE/VERSION_STRATEGY.md) | [PLAYBOOKS/VERSION_MIGRATION.md](VERSION_MIGRATION.md) | [CORE/TASK_ENGINE.md](../CORE/TASK_ENGINE.md)

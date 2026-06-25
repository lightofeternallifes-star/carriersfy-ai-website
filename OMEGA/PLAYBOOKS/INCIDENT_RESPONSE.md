# PLAYBOOK: Incident Response

> Response protocol for production incidents, security events, and critical failures. Execute immediately. Last updated: 2026-06-25

---

## Severity Levels

| Level | Definition | Response Time | Example |
|---|---|---|---|
| SEV-1 | Site down or data breach | Immediate (< 15 min) | carriersfy.ai returning 500, OMEGA exposed publicly |
| SEV-2 | Core feature broken, significant revenue impact | < 1 hour | Contact form not sending, deployment failing |
| SEV-3 | Non-critical feature broken or degraded | < 4 hours | Analytics broken, font not loading |
| SEV-4 | Minor issue, no revenue impact | Next business day | Typo in copy, minor UI glitch |

---

## SEV-1 Response: Site Down

### Step 1 — Confirm the Incident
- [ ] Check https://carriersfy.ai — is it returning a 5xx error?
- [ ] Check Cloudflare Pages dashboard for deployment failures
- [ ] Check Cloudflare status page: https://www.cloudflarestatus.com
- [ ] Determine: Is this Cloudflare infrastructure? Our code? A bad deployment?

### Step 2 — Isolate the Cause
- [ ] Check recent git commits: was there a deployment in the last 30 minutes?
- [ ] If bad deployment: immediately rollback via Cloudflare Pages dashboard → Deployments → previous deployment → Rollback
- [ ] If Cloudflare infrastructure issue: wait and monitor (nothing to do on our end)
- [ ] If DNS issue: check Cloudflare DNS settings for carriersfy.ai

### Step 3 — Rollback (if code-caused)
- [ ] Cloudflare Pages → Your Project → Deployments → previous good deployment → "Retry deployment" or "Rollback"
- [ ] Verify site is back up
- [ ] Document: which commit caused the issue

### Step 4 — Root Cause and Fix
- [ ] Identify root cause (syntax error, missing file, wrong config)
- [ ] Fix in a new commit (do NOT amend the broken commit)
- [ ] Test in preview deployment before pushing to main
- [ ] Push fix to main when confirmed working

### Step 5 — Post-Incident
- [ ] Add incident note to `CORE/NOTES.md` (or create one if it doesn't exist)
- [ ] Create CF-TSK-{NNN} for any follow-up work needed
- [ ] If incident exposed a process gap: create new ADR or update OPERATING_RULES

---

## SEV-1 Response: OMEGA Publicly Exposed

### If OMEGA content is accessible at carriersfy.ai/OMEGA/*:

### Step 1 — Immediate Containment
- [ ] Verify `.gitignore` — does it include `OMEGA/`? If not: OMEGA has been committed to the public repo
- [ ] If OMEGA is in git: immediately purge OMEGA files from git history (requires git filter-branch or BFG — this is a destructive operation, confirm with Juan)
- [ ] Check `_headers` file — does it have the OMEGA block rule?

### Step 2 — Cloudflare Cache Purge
- [ ] Cloudflare Dashboard → Caching → Purge Everything
- [ ] Verify `/OMEGA/` paths return 403 or 404 after purge

### Step 3 — Assess Exposure
- [ ] What OMEGA content was potentially cached by Cloudflare?
- [ ] What content was potentially indexed by search engines?
- [ ] Submit removal request to Google Search Console if indexed

### Step 4 — Prevention Hardening
- [ ] Verify `.gitignore` has `OMEGA/` on a line by itself
- [ ] Verify `_headers` has the `/OMEGA/*` block
- [ ] Verify `robots.txt` has `Disallow: /OMEGA/`
- [ ] Never commit OMEGA again

---

## SEV-2 Response: Contact Form Broken

### Step 1 — Identify Failure Point
- [ ] Submit test form at https://carriersfy.ai
- [ ] Check browser console for JavaScript errors
- [ ] Check Cloudflare Pages → Functions → contact.js logs for errors
- [ ] Check if RESEND_API_KEY is set in CF environment variables

### Step 2 — Common Causes
| Symptom | Likely Cause | Fix |
|---|---|---|
| Form shows success, no email received | RESEND_API_KEY missing | Set var in CF dashboard |
| Form shows error message | Function returning non-200 | Check function logs |
| Form shows success, no email | Resend API down | Check resend.com status |
| Form button does nothing | JS error in index.html | Check browser console |

### Step 3 — Fix and Verify
- [ ] Fix the identified cause
- [ ] Submit test form again
- [ ] Confirm email received at juan@carriersfy.ai

---

## Post-Incident Template

Add to `CORE/NOTES.md`:

```
## Incident: [Date] — [Title]
- **Severity:** SEV-{N}
- **Duration:** [start time] → [end time] ([N] minutes)
- **Impact:** [what broke, who was affected]
- **Root Cause:** [what caused it]
- **Fix:** [what was done to resolve]
- **Prevention:** [what was done to prevent recurrence]
- **Tasks Created:** CF-TSK-{NNN} (if any)
```

---

**Related:** [CORE/SYSTEM_ARCHITECTURE.md](../CORE/SYSTEM_ARCHITECTURE.md) | [INTEGRATIONS/Cloudflare.md](../INTEGRATIONS/Cloudflare.md) | [INTEGRATIONS/Resend.md](../INTEGRATIONS/Resend.md)

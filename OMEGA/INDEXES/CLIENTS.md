# INDEXES/CLIENTS — Carriersfy AI

> Fast O(1) lookup for all clients. Every client has a canonical entity ID. Last updated: 2026-06-25

---

## Client Index

| Entity ID | Client Name | Industry | Status | Geography | LTV Tier | Health |
|---|---|---|---|---|---|---|
| CF-CLI-001 | Brazil Signs | Signage / Print / Visual Comm | Active — Needs Assessment | Brazil | Unknown | [UNKNOWN] |
| CF-CLI-002 | Marine Consolidated Electronics | Marine / Electronics | Active — Needs Assessment | U.S. (likely) | Unknown | [UNKNOWN] |
| CF-CLI-003 | Light of Life | Faith / Community / Nonprofit | Active — Needs Assessment | Unknown | Unknown | [UNKNOWN] |

---

## Quick Lookup

### By Status
- **Active — Assessment Needed:** CF-CLI-001, CF-CLI-002, CF-CLI-003

### By Geography
- **Brazil:** CF-CLI-001
- **U.S.:** CF-CLI-002 (unconfirmed)
- **Unknown:** CF-CLI-003

### By LTV Tier
- **Unknown (assessment needed):** CF-CLI-001, CF-CLI-002, CF-CLI-003

---

## Client → Project Mapping

| Client Entity ID | Client Name | Project Entity ID | Project Name |
|---|---|---|---|
| CF-CLI-001 | Brazil Signs | CF-PRJ-003 | Brazil Signs |
| CF-CLI-002 | Marine Consolidated Electronics | CF-PRJ-004 | Marine Consolidated Electronics |
| CF-CLI-003 | Light of Life | CF-PRJ-005 | Light of Life |

---

## Detail Links

| Entity ID | Client Folder |
|---|---|
| CF-CLI-001 | [CLIENTS/Brazil_Signs/](../CLIENTS/Brazil_Signs/Business_Profile.md) |
| CF-CLI-002 | [CLIENTS/Marine/](../CLIENTS/Marine/Business_Profile.md) |
| CF-CLI-003 | [CLIENTS/Light_of_Life/](../CLIENTS/Light_of_Life/Business_Profile.md) |

---

## LTV Tier Reference

| Tier | Monthly | Annual LTV |
|---|---|---|
| Tier 1 — Enterprise | $3,000+/mo | $36,000+ |
| Tier 2 — Growth | $1,000–$2,999/mo | $12,000–$36,000 |
| Tier 3 — Starter | $500–$999/mo | $6,000–$12,000 |
| Tier 0 — Pilot | Under $500/mo | Under $6,000 |

---

**Full registry:** [CORE/CLIENT_REGISTRY.md](../CORE/CLIENT_REGISTRY.md) | **Onboarding playbook:** [PLAYBOOKS/NEW_CLIENT.md](../PLAYBOOKS/NEW_CLIENT.md)

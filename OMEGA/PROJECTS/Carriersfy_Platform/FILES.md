# Files — Carriersfy Platform

> Last updated: 2026-06-25 | Status: [PLANNED] — No files exist yet

---

## Current State

No files exist. The repository has not been created.

When the project is scaffolded, this document should be updated with:
- Repository URL
- Directory structure
- Key file descriptions (entry points, config, schema, API routes, components)
- Environment variables required

---

## Planned File Structure (Next.js + Supabase — if ADR-006 selects this)

```
carriersfy-platform/
├── app/                    # Next.js app directory
│   ├── (auth)/             # Auth routes (login, register)
│   ├── (dashboard)/        # Authenticated dashboard
│   │   ├── clients/        # Client management pages
│   │   ├── agents/         # AI employee management
│   │   ├── leads/          # Lead management
│   │   └── settings/       # Platform settings
│   ├── api/                # API routes
│   │   ├── clients/        # Client CRUD
│   │   ├── agents/         # Agent management
│   │   └── leads/          # Lead management
│   └── layout.tsx          # Root layout
├── components/             # Shared UI components
├── lib/                    # Supabase client, utilities
├── types/                  # TypeScript types
├── middleware.ts            # Auth middleware
├── .env.local              # Local environment (gitignored)
└── next.config.js          # Next.js config
```

Update this file after ADR-006 is resolved and the repository is created.

---

**Related:** [README](README.md) | [DEPENDENCIES](DEPENDENCIES.md) | [DECISIONS](DECISIONS.md)

# Memory Scope — Claude Design

> Last updated: 2026-06-25

---

## What Claude Design Knows

### Brand System (Always Active)
- Background: #070B16, Blue: #1FA2FF, Red: #FF2E3C, Text: #F4F6FB
- Fonts: Space Grotesk (headings) + Manrope (body)
- Style: Cinematic, premium, dark, enterprise-grade
- Logo files: `assets/carriersfy-emblem-core.png`, `assets/carriersfy-emblem.png`

### Design History
- Current website design (readable from index.html + screenshots in `/screenshots/`)
- DC/Draftcode design handoff in `/design_handoff_carriersfy_website/`

### Session-Based Context
- Claude Design retains context within a single conversation
- No persistent memory across sessions — brand constants must be provided each time (or Claude Design reads them from this file)

---

## What Claude Design Does NOT Have Access To

- Code execution or file system writes (routes to Claude Code)
- Client operational data
- Live website rendering
- Iron Prime or Sofia's operational context

---

**Related:** [Purpose](Purpose.md) | [MEMORY_PROTOCOL](../../CORE/MEMORY_PROTOCOL.md)

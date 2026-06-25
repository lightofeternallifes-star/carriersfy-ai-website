# INTEGRATION: OpenAI

- **Entity ID:** CF-INT-010
- **Category:** AI Models (Alternative Provider)
- **Status:** [POTENTIAL]
- **Critical:** Low — not currently in use

---

## What It Does (Potential)

OpenAI models (GPT-4, GPT-4o, Whisper, etc.) may be used as an alternative or complement to Anthropic models for specific capabilities:
- Voice-to-text (Whisper) for AI employee call processing
- High-volume low-cost inference where Claude pricing is prohibitive
- Specific client-facing AI employee personas that require non-Claude models

---

## Current Decision

Carriersfy AI currently uses Anthropic (CF-INT-005) exclusively for AI capabilities. OpenAI is not in active use.

**When to revisit:**
- If a client-specific AI employee requires capabilities not available in Claude
- If Whisper API is needed for voice transcription (call recording for AI employees)
- If cost optimization requires multi-provider strategy at scale

---

## Voice Capability Note

Iron Prime (CF-AGT-001) and Sofia (CF-AGT-002) are described as "voice + messaging agents." When voice capabilities are built:
- Whisper (OpenAI) or Deepgram may be needed for speech-to-text
- ElevenLabs or similar for text-to-speech (custom voice)
- This would require a new ADR and a new CF-INT entity

---

## Prerequisites Before Using

1. New ADR documenting decision to use OpenAI
2. OpenAI API key — stored in Cloudflare Pages env vars (NOT in git)
3. Update INDEXES/INTEGRATIONS.md to mark status as [ACTIVE]

---

## Related

- **Alternative to:** CF-INT-005 (Anthropic)
- **Relevant for:** CF-AGT-001, CF-AGT-002 voice capabilities
- **Decision needed:** CF-ADR-009 (AI Employee platform) will clarify AI model selection

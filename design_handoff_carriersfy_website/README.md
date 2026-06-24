# Handoff: Carriersfy AI — Marketing Website

## Overview
A dark, premium, futuristic marketing site for **Carriersfy AI**, a company that designs and deploys **AI Digital Employees** for businesses — software workers that answer calls, serve customers, qualify leads, generate sales opportunities, schedule, quote, and operate 24/7. The site is **trilingual** (English / Español / Português) with a live in‑page language switcher. Its single goal is to convert business owners into booked strategy calls via the contact form.

## About the Design Files
The files in this bundle are **design references created in HTML** — a high‑fidelity prototype showing the intended look, copy, and behavior. They are **not** production code to ship as‑is. Your task is to **recreate this design in the target codebase's environment** (React/Next, Vue, Astro, etc.) using its established patterns, component library, and i18n framework. If no codebase exists yet, choose an appropriate stack — a static/SSG framework (Next.js, Astro) suits this marketing site well.

> The prototype uses a small in‑house render runtime (`support.js`) and a custom `.dc.html` template format. **Ignore that runtime** when reimplementing — it only exists so the prototype opens in a browser. Treat the markup, inline styles, copy, and the canvas/JS logic as the spec.

## Fidelity
**High‑fidelity.** Final colors, typography, spacing, gradients, animations, and copy are all intended as shown. Recreate pixel‑accurately, substituting your codebase's primitives where sensible. All measurements, hex values, and type specs below are authoritative.

---

## ⚠️ Content Guardrail (must enforce in all copy)
The brand voice is strictly **outcome‑focused**. Do **NOT** mention internal tools, vendors, third‑party platforms, CRMs, automations, or infrastructure anywhere in copy (e.g. never name WhatsApp/Twilio/Zapier, never say "integrates with your CRM", "built on X infrastructure", etc.). Describe **what the AI employee does for the customer**, not how it is built. Any future copy must follow this rule.

---

## Global Layout & Shell
- **Page background:** solid `#070B16` with three *fixed* (parallax) decorative layers stacked at `z-index:0`, all `pointer-events:none`:
  1. Radial color glows: blue `rgba(28,127,214,.26)` top‑right, blue `rgba(31,162,255,.14)` top‑left, red `rgba(255,46,60,.16)` bottom‑center.
  2. A 64×64px grid of `rgba(120,150,255,.05)` lines, masked with a radial ellipse so it fades out toward edges.
  3. A vignette: radial ellipse, transparent center → `rgba(0,0,0,.58)` edges.
- **Animated particle canvas** (`#cf-particles`, fixed, `opacity:.6`): ~70 drifting nodes (`rgba(150,180,255,.55)`) connected by lines when within 130px, plus ~16 soft bokeh blobs in blue/red. See `initParticles()`.
- **Content max width:** `1280px`, centered. **Section horizontal padding:** `clamp(20px,5vw,56px)`. **Section vertical rhythm:** `clamp(70px,9vw,130px)` top/bottom.
- All content sits at `z-index:1` above the fixed backdrop.
- Cards are "glass": `linear-gradient(180deg,rgba(255,255,255,.045),rgba(255,255,255,.015))`, `1px solid rgba(255,255,255,.08)`, `backdrop-filter:blur(20px)`.

---

## Design Tokens

### Color
| Token | Value | Use |
|---|---|---|
| `--bg` | `#070B16` | Page background |
| `--surface-solid` | `#0B0F1C` | Select dropdown options |
| `--text` | `#F4F6FB` | Body text |
| `--text-bright` | `#F7F9FE` | Headline line 1 |
| `--text-muted` | `rgba(244,246,251,.62)` | Sub‑copy |
| `--text-faint` | `rgba(244,246,251,.5)` | Labels, captions |
| `--blue` | `#1FA2FF` | Primary accent |
| `--blue-deep` | `#1C7FD6` | Gradient mid |
| `--blue-light` | `#3FB0FF` | Headline gradient start |
| `--red` | `#FF2E3C` | Secondary accent |
| `--hairline` | `rgba(255,255,255,.08–.16)` | Borders |
| Brand gradient | `linear-gradient(135deg,#1FA2FF,#FF2E3C)` | Buttons, chips, emblem glow |
| Headline gradient | `linear-gradient(110deg,#3FB0FF,#1C7FD6 42%,#FF2E3C)` | Hero line 2 (animated `background-size:200% auto`) |

### Typography
- **Display / headings:** `Space Grotesk` (weights 400/500/600/700). Google Fonts.
- **Body / UI:** `Manrope` (weights 400/500/600/700/800). Google Fonts.
- **Hero H1:** Space Grotesk 700, `clamp(44px,6.8vw,86px)`, `line-height:0.99`, `letter-spacing:-.035em`, `text-wrap:balance`. Line 1 color `#F7F9FE` with `text-shadow:0 0 44px rgba(120,170,255,.22)`; line 2 uses the headline gradient (clipped to text, shimmer animation).
- **Section H2:** Space Grotesk 700, `clamp(30px,4.2vw,52px)`, `line-height:1.08`, `letter-spacing:-.02em`.
- **Eyebrow/kicker:** 13px, weight 700, `letter-spacing:.16em`, uppercase, colored `#1FA2FF` or `#FF2E3C` (alternating per section).
- **Body:** Manrope 400, 14.5–20px, `line-height:1.6`.

### Radius
Inputs/buttons `12–14px`; cards `18–26px`; pills/chips `100px`; final CTA panel `32px`.

### Shadow
- Glow button: `0 10px 40px rgba(28,127,214,.4)` → hover `0 18px 56px rgba(28,127,214,.6)`.
- Card: `0 30px 80px rgba(0,0,0,.4)`.

### Spacing
8px base; common gaps 12/16/20/24px; section padding tokens listed above.

### Keyframes (in `<style>`)
`cfspin` (360° / 22–30s), `cfspinr` (reverse), `cffloat` (±16px Y, 6–8s), `cfpulse`, `cfshimmer` (bg-position 0→200%, 6s), `cfblink` (opacity 1↔.25, 2s status dots), `cfgrid`, `cfrise`.

---

## Screens / Sections (top → bottom)

### 1. Nav (`#cf-nav`, fixed, z‑60)
Logo (emblem PNG + "CARRIERSFY **AI**", "AI" in red) · center links (Platform, Industries, Case Studies, Process) · **language selector** · primary CTA "Get Your AI Employee" (gradient pill) · mobile burger.
- **Scroll behavior:** transparent at top; after `scrollY>24` → `background:rgba(7,11,22,.72)`, `backdrop-filter:blur(20px)`, `border-bottom:1px solid rgba(255,255,255,.08)`. See `initNav()`.
- **Language selector:** globe button shows current code (EN/ES/PT) + ▼; opens a glass dropdown with 🇺🇸 EN / 🇪🇸 ES / 🇧🇷 PT.
- **Responsive:** ≤880px hides center links + CTA, shows burger → full‑screen mobile menu (`#cf-mobilemenu`, blur overlay, 30px links).

### 2. Hero — "AI Digital Employee command center"
Two‑column grid (`minmax(440px,1fr)`, gap `clamp(40px,5vw,72px)`, `align-items:center`), collapses to one column below ~952px. A full‑width **capability strip** spans both columns underneath (`grid-column:1 / -1`).
- **Left column:** eyebrow pill ("WHERE BUSINESS MEETS ARTIFICIAL INTELLIGENCE" with blinking blue dot) → **H1** (2 lines, see typography) → sub‑paragraph → two CTAs ("Get Your AI Employee →" gradient + "Book a Strategy Call" glass; both lift `-2px` on hover). *(No stat row / trust strip — proof now lives in the command‑center cards + capability strip.)*
- **Right column — cinematic command‑center stage** (`min-height:clamp(560px,64vw,720px)`, position:relative). The whole hero is a full‑bleed *scene*: behind everything sit layered **deep‑galaxy** gradients, a diagonal **red nebula** streak and **blue energy clouds** (blurred, `mix-blend:screen`, breathing via `cfglow`), plus a top/bottom cinematic vignette.
  - 4 HUD corner brackets (blue top‑left/bottom‑right, red top‑right/bottom‑left).
  - A bright pulsing **energy core** glow (`cfcore`) + red rim halo behind the emblem.
  - **Orb stack** centered (`translate(-50%,-44%)`, `min(400px,80%)` square): a blurred rotating conic‑gradient ring (`opacity:.30`, `cfspin 22s`), a solid faint orbit ring (`cfspin 30s`), a dashed red orbit ring (`cfspinr 24s`), and the **holographic orb** = `#cf-core` canvas (~300‑point Fibonacci sphere, rotating, pulsing radial glow — see `initCore()`). Centered over it: **SOFIA AI** (Space Grotesk 700, blue glow) / **DIGITAL EMPLOYEE** (letter‑spaced uppercase) / **● ONLINE** (green `#35D6A0` dot + label).
  - **Massive Carriersfy emblem PNG** floating above the orb (`min(300px,54%)`, intense red+blue drop‑shadow glow, `cffloat 7s`).
  - **Tilted holographic platform** at the base: a `rotateX(74deg)` perspective disc of concentric glowing ellipse rings (blue outer, red mid, white‑blue inner) + a rotating dashed scan ring + a radial light pool. A clipped **projector light beam** rises from the platform to the emblem.
  - **4 outcome data cards** absolutely positioned around the orb, each a dark glass card (`rgba(13,18,32,.85)`, 14px radius, neon border + glow, `cffloat`) with: uppercase label, big white number, green `+xx%` + muted "this week", and a thin gradient **energy line with a traveling glowing pulse dot** (keyframes `cfflowR`/`cfflowL`) flowing toward the core. Cards & positions:
    - Calls Answered — **1,284** — +34% (top‑left, blue)
    - Appointments Booked — **347** — +27% (lower‑left, red)
    - Leads Qualified — **2,156** — +42% (top‑right, blue)
    - Revenue Generated — **$86,420** — +38% (lower‑right, blue)
- **Capability strip** (full‑width glass panel, auto‑fit `minmax(230px,1fr)`): 4 items, each a neon‑ringed circular icon + title + subtitle — **Works 24/7** (No pauses. No days off.) · **Responds Instantly** (Never lose a customer.) · **Qualifies & Converts** (More opportunities, more sales.) · **Scales Without Limits** (Unlimited growth for your business.). Icon ring colors alternate red/blue.

Exact hero copy (EN / ES / PT):
- Line 1: "Your Next Best Employee Already Exists." / "Tu Próximo Mejor Empleado Ya Existe." / "Seu Próximo Melhor Funcionário Já Existe."
- Line 2: "It Runs on Artificial Intelligence." / "Funciona con Inteligencia Artificial." / "Funciona com Inteligência Artificial."
- Sub: "Carriersfy AI designs and deploys digital employees that answer calls, serve customers, qualify leads, generate sales opportunities and work 24/7 for your business." (see `translations.js` for ES/PT).

### 3. What We Build
Eyebrow "WHAT WE BUILD" + H2 "Digital employees for every front-line task". Auto‑fit grid (`minmax(300px,1fr)`, gap 20px) of **6 glass cards**, each: 52px rounded icon tile (tinted blue/red) → H3 → description. Cards: AI Voice Agents · Messaging Assistants · Lead Qualification · Appointment Scheduling · Instant Estimates · **Smart Follow-Up**.

### 4. AI Workforce Platform (`#platform`)
Two columns. Left: eyebrow (red) + H2 "One platform to hire, train and scale your AI workforce" + 3 check‑rows (Trained on your knowledge / **Fits how you already work** / Real-time analytics). Right: **"Workforce Command Center"** glass dashboard mock — LIVE badge, 2×2 stat tiles (Calls 1,284 / Leads 347 / Appointments 128 / Quotes 642), and a "Revenue influenced $2.4M (+34% MoM)" panel with a 7‑bar gradient bar chart.

### 5. Industries (`#industries`)
Eyebrow + H2 "Built for the businesses that never stop". Auto‑fit grid (`minmax(220px,1fr)`, gap 16px) of **8 cards** (emoji + title + one‑liner): Marine & Boating · Signs & Print · Home Services · Healthcare & Clinics · Real Estate · Automotive · Professional Services · Retail & E-commerce.

### 6. Case Studies (`#cases`)
H2 "Real businesses. Measurable results." Two large cards, each: a gridded gradient banner header (⚓ MarineQuote AI / 🪧 Brazil Signs AI) + paragraph + 3 metric stats (e.g. 68% / <1min / 24/7 and 3.2x / 0 / 2).

### 7. Meet Your Digital Employee (Sophia demo)
H2 "See Sophia handle a real conversation". 3 pill **tabs** (📞 Inbound Call / 💬 SMS Lead / 📄 Estimate); active tab = gradient fill. Below, a chat card (max 620px) with a "Sophia · AI Employee · Responding" header and a 4‑bubble conversation that swaps per tab. Inbound user bubbles left (`rgba(255,255,255,.06)`), Sophia bubbles right (blue/red tinted). Logic: `selectDemo(i)` toggles `#cf-demo-{0,1,2}` display + restyles `#cf-tab-{i}`.

### 8. The Digital Workforce of the Future (`#workforce`)
Eyebrow "THE ECOSYSTEM" + H2 "The Digital Workforce of the Future". A **constellation canvas** (`#cf-workforce`, see `initWorkforce()`): a central "Carriersfy Core" hub with 6 satellite nodes; animated data pulses travel hub↔node along faint lines; nodes glow/pulse. Floating glass labels name each employee (hidden ≤760px via `[data-wf-label]`). Below: a **roster grid** of 6 employee cards (avatar initial, name, role + online dot, description, a "today" stat): **Sophia** Receptionist · **Atlas** Lead Qualification · **Nova** Messaging Agent · **Titan** Quote Generator · **Orion** Sales Assistant · **Echo** Support Agent.

### 9. Why Carriersfy AI
Eyebrow (red) + H2 "The workforce advantage of the future". Row of **4 count‑up stat cards** (100% calls & messages answered · 80% lower cost than hiring · 14 days from kickoff to live · 0 sick days) then **3 feature cards** (Enterprise-grade reliability / Human-quality conversation / Fully managed for you).

### 10. Process (`#process`)
H2 "From idea to AI employee in four steps". 4 cards with big gradient numerals 01–04: Discover · Design & Build · Deploy · Optimize.

### 11. Testimonials
H2 "Trusted by businesses building the future". 3 glass cards: ★★★★★ + quote + gradient avatar + name/role (Marcus Reyes, MarineQuote · Camila Souza, Brazil Signs · Daniel Pierce, Pierce Home Services).

### 12. Contact (`#contact`) — the conversion section
Two columns. **Left:** eyebrow "GET STARTED" + H2 "Tell us about your business" + paragraph + 3 reassurance chips (Free strategy call · Live in ~14 days · No long-term contracts). **Right:** glass form card (`#cf-form`) with fields — **Name**\* (text), **Business** (text), **Email**\* (email), **Phone** (tel), **Industry** (select, 8 options), **Message** (textarea, 3 rows) — and a full‑width gradient submit "Get Your AI Employee →".
- Inputs: `rgba(255,255,255,.04)` bg, `1px rgba(255,255,255,.14)` border, 12px radius, `#fff` text; **focus** → border `#1FA2FF`, bg `rgba(31,162,255,.07)`.
- **On submit** (`handleContact`): `preventDefault`, hide the form, reveal `#cf-formsuccess` (✓ badge + "Thank you — we'll be in touch within one business day.").
- **TODO for dev:** wire submit to a real backend/email/lead endpoint with validation + error states. Current behavior is a client‑side success placeholder only.

### 13. Final CTA (`#cta`)
Large rounded gradient‑bordered panel: H2 "Your AI employee is ready to start working today" + paragraph + two buttons (both link to `#contact`).

### 14. Footer
4 columns (brand blurb + Platform / Company / Get Started link groups) + bottom bar (© 2026 Carriersfy AI · Privacy · Terms · Contact).

---

## Internationalization (critical to replicate)
- Dictionary: `translations.js` → `window.CF_I18N = { es:{…}, pt:{…} }`. **Keys are the exact English source strings** (decoded text). English is the default (no table).
- Prototype mechanism (`initI18n`/`applyLang`): walks all text nodes, and for nodes whose trimmed text matches a key, swaps in the translation; updates the nav label; persists choice to `localStorage['cf_lang']`; also reads a `/en` `/es` `/pt` path segment if present.
- **In your codebase, use the framework's i18n** (next-intl, vue-i18n, etc.) keyed by stable IDs rather than English strings — but **preserve all three languages and the exact translations** in `translations.js`. Default language EN; switch order EN · ES · PT.

## Interactions & Behavior (summary)
- Nav scroll style change; smooth‑scroll anchor nav.
- Count‑up animations on `[data-count]` (cubic ease‑out, 1400ms) fired via IntersectionObserver + scroll fallback.
- Entrance reveal via CSS on `[data-reveal]`.
- Three canvas systems: background particles, hero holographic core, workforce constellation (all `requestAnimationFrame`; cancel on unmount; respect `prefers-reduced-motion` in your build).
- Sophia demo tab switching; mobile menu open/close; language dropdown; contact form submit→success.
- Hover: primary buttons translateY(−2px) + intensified glow; glass buttons brighten bg/border.

## State Management
- `currentLang` (en/es/pt) — persisted.
- `mobileMenuOpen` (bool).
- `activeDemoTab` (0–2).
- `langMenuOpen` (bool).
- `contactSubmitted` (bool) — toggles form/success.
- Contact form field values (name, business, email, phone, industry, message).

## Assets
- `assets/carriersfy-emblem.png` — official Carriersfy AI emblem (used in nav, hero core, footer; glow via `drop-shadow`). Provided in this bundle.
- All other graphics are CSS/canvas‑generated (no image dependencies). Emoji are used as section/industry icons — your team may swap for a proper icon set.
- Fonts: Space Grotesk + Manrope via Google Fonts.

## Files in this bundle
- `Carriersfy AI.dc.html` — the full prototype (markup + inline styles + all JS logic at the bottom). **Primary reference.**
- `translations.js` — complete EN‑keyed ES/PT dictionary.
- `support.js` — the prototype's render runtime. **Reference only; do not port.**
- `assets/carriersfy-emblem.png` — logo asset.
- `README.md` — this document.

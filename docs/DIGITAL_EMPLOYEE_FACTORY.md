# Digital Employee Factory(TM)

## Mission

Digital Employee Factory(TM) is the flagship Carriersfy AI experience for building a custom AI Employee. It replaces the public AI Employee builder entry points with a premium, guided configuration flow that feels closer to purchasing a high-end product than completing a form.

The customer-facing experience presents every capability as part of the proprietary Carriersfy AI Platform. It does not reveal internal systems, vendors, model names, workflow tooling, hosting details, or implementation mechanics.

## Files

- `employee-builder.js`
  - Lazy-loaded modal experience.
  - Multi-step Digital Employee Factory interface.
  - Live enterprise quote estimates.
  - Voice preview direction selector.
  - Business knowledge planning step.
  - Final Sophia handoff payload.

- `index.html`
  - Loads `employee-builder.js`.
  - Routes public AI Employee calls to the Digital Employee Factory.
  - Keeps the existing page, brand, logo, typography, colors, spacing, and navigation structure intact.

- `functions/api/contact.js`
  - Accepts the `employeeFactory` configuration payload.
  - Adds Digital Employee Factory details to internal lead notifications.
  - Does not connect payments, CRM, WhatsApp, calendars, or external business systems.

## Experience Flow

1. Choose Industry
2. Choose Employee
3. Employee Personality
4. Choose Voice
5. Languages
6. Capabilities
7. Business Knowledge
8. Working Schedule
9. Appearance
10. Pricing
11. Launch

## Customer-Facing Rules

The UI only speaks in terms of:

- Carriersfy AI
- Sophia
- Digital Employee Factory(TM)
- Carriersfy AI Platform
- AI Employee
- Enterprise quote planning
- Launch readiness

The customer never sees internal implementation details.

## Business Knowledge Step

The upload area is a placeholder for future activation. In this sprint:

- File names are captured locally for planning context.
- Files are not uploaded.
- No storage service is connected.
- Website knowledge is captured as a text field only.

## Pricing Logic

The live quote is a planning estimate only. It updates based on:

- Number of capabilities selected.
- Number of languages selected.
- Business knowledge scope.
- Working schedule.
- Employee role complexity.

Displayed quote fields:

- Monthly Platform
- One-Time Setup
- Enterprise Features
- Estimated Launch Time

No payment flow is active.

## Sophia Handoff

The launch step sends the completed configuration into the existing website contact route with:

- `source: digital_employee_factory`
- `owner: Sophia`
- `intent: Request My AI Employee`
- `employeeFactory: complete configuration`

The payload prepares the lead for Sophia review. It does not connect CRM, WhatsApp, calendar, billing, or deployment workflows.

## Accessibility

Implemented:

- Dialog semantics with `role="dialog"`.
- `aria-modal`.
- Labelled modal title.
- Keyboard close with Escape.
- Focus trap inside the factory modal.
- Focus return to the opener.
- `aria-pressed` for selectable cards.
- Live status text for voice preview selection.
- Responsive desktop, tablet, and mobile layout.

## Performance

Implemented:

- Factory DOM is created only when opened.
- No additional libraries.
- GPU-friendly transform and opacity animations.
- Inline modal styles avoid extra render-blocking assets.
- The previous public AI Employee builder script is no longer loaded on the live page.

## Future Integrations

Future work can connect the factory to proprietary Carriersfy AI services for:

- Secure business knowledge ingestion.
- Real voice sample playback.
- Proposal generation.
- Calendar scheduling.
- Billing review.
- Client portal activation.
- Multi-location rollout planning.

All future work should preserve the customer-facing rule: every capability appears as part of the Carriersfy AI Platform.

## Implementation Report

Completed in Mission #008:

- Created `employee-builder.js`.
- Added the Digital Employee Factory(TM) modal experience.
- Added premium factory animations, cards, summary panel, quote tiles, and launch state.
- Rewired AI Employee public CTAs in `index.html` to open the new factory.
- Updated Sophia modal handoff behavior for the new factory trigger.
- Removed the old public AI Employee builder script from the live page.
- Extended the contact route to include Digital Employee Factory details in internal notifications.
- Preserved existing branding, logo, colors, typography, spacing, navigation, and homepage layout.

## Validation Checklist

Run before review:

- `node --check employee-builder.js`
- `node --check functions/api/contact.js`
- Syntax check the embedded page script from `index.html`
- Scan the new customer-facing factory files for restricted internal technology language

## Non-Goals

This sprint does not implement:

- Payments.
- Live business-system connections.
- File upload processing.
- Voice service connections.
- CRM sync.
- WhatsApp automation.
- Calendar booking.
- Production launch automation.

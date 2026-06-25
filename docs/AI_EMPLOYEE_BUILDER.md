# AI Employee Builder

Status: implemented as a frontend-only flagship experience  
Payment status: not connected  
Voice status: placeholders only  
CRM status: placeholders only  
WhatsApp API status: placeholders only

## Objective

The AI Employee Builder gives visitors a premium configuration experience similar to designing a luxury vehicle or custom Apple product. It is not a simple form. It guides a visitor through the strategic decisions required to design a custom AI Employee and then sends the completed configuration into Sophia's lead pipeline.

## Files

```txt
sophia-builder.js
index.html
functions/api/contact.js
docs/AI_EMPLOYEE_BUILDER.md
```

## Website Integration

The builder is loaded as a standalone browser module:

```html
<script src="./sophia-builder.js" defer></script>
```

The builder opens from native Carriersfy AI entry points using:

```html
data-ai-builder-open
```

Current launch points:

- Desktop navigation "Get Your AI Employee"
- Mobile menu "Get Your AI Employee"
- Hero "Get Your AI Employee"
- Final CTA "Get Your AI Employee"
- Sophia modal "Build My AI Employee"

## Architecture

The builder is isolated in `sophia-builder.js`.

It exposes:

```js
window.CF_SOPHIA_BUILDER.open()
window.CF_SOPHIA_BUILDER.close()
window.CF_SOPHIA_BUILDER.getState()
```

The modal DOM is lazy-created only when the builder is opened. No builder modal markup is rendered during initial page load.

State is stored in memory and mirrored to `localStorage` under:

```txt
cfSophiaBuilderState
```

This allows visitors to resume a partially configured AI Employee during the same browser session.

## Builder Steps

The experience includes 11 steps:

1. Welcome Screen
2. Choose Employee Type
3. Choose Personality
4. Choose Voice
5. Languages
6. Communication Channels
7. Business Integrations
8. Business Information
9. Features
10. Live Summary
11. Request Proposal

## Employee Type Cards

Each employee type card includes:

- Responsibilities
- Business benefits
- Estimated ROI

Employee types:

- Receptionist
- Sales
- Customer Support
- Appointment Setter
- Quote Generator
- Lead Qualification
- Custom

## Voice Placeholders

The voice step supports:

- Female
- Male
- Young
- Executive
- Warm
- Confident
- Future multilingual support

The voice preview area is intentionally a placeholder. No voice API, text-to-speech provider or audio generation system is connected.

## Multi-Select Areas

The builder supports multiple selections for:

- Languages
- Communication channels
- Business integrations
- Features

This creates a scalable configuration model for future packages, pricing tiers and deployment templates.

## Live Pricing Estimate

The builder calculates a live placeholder estimate using:

- Selected employee type
- Number of communication channels
- Number of integrations
- Number of selected features

It displays:

- Live pricing estimate range
- Monthly subscription estimate
- One-time setup estimate

These values are proposal planning placeholders. Final pricing must be reviewed by Carriersfy AI before any payment, contract or subscription action.

## Sophia Pipeline Handoff

On the final step, the visitor requests a proposal.

The builder sends a POST request to:

```txt
/api/contact
```

The payload includes:

```txt
name
business
email
phone
industry
message
sophiaPipeline
aiEmployeeBuilder
```

The `sophiaPipeline` object marks the lead as:

```txt
source: ai_employee_builder
owner: Sophia
intent: Build My AI Employee
crmStatus: prepared_not_connected
whatsappStatus: prepared_not_connected
appointmentStatus: prepared_not_connected
```

The `aiEmployeeBuilder` object contains the completed configuration and pricing placeholders.

## Contact Function

`functions/api/contact.js` now includes the AI Employee Builder configuration in lead notification emails when the payload contains `aiEmployeeBuilder`.

No backend routing, CRM write, WhatsApp send, calendar booking or payment processing has been implemented.

## Accessibility

The builder includes:

- ARIA dialog semantics
- `aria-modal`
- `aria-labelledby`
- Escape key close
- Overlay click close
- Focus return
- Basic focus trap
- Keyboard-accessible buttons and inputs

## Responsive Design

The builder uses the existing Carriersfy AI design language:

- Dark theme
- Glass cards
- Blue/red gradients
- Space Grotesk and Manrope typography
- Premium rounded panels
- Responsive grid layouts

It is designed to work on desktop and mobile while preserving the existing brand system.

## Future Integrations

The builder is prepared for:

- Real package/pricing engine
- CRM lead creation
- CRM opportunity creation
- WhatsApp Business API notification
- Calendar booking
- Voice provider previews
- Payment links
- Proposal PDF generation
- Admin dashboard review
- Analytics event tracking

## Scalability

The builder can scale by adding:

- More employee archetypes
- More industry-specific templates
- Tiered deployment packages
- Language-specific voice previews
- Regional pricing logic
- Enterprise approval workflows
- Account-based configuration history
- Multi-employee bundles

The current implementation keeps all options data in `sophia-builder.js` so the Chief Architect can later move it into a typed config, CMS, or backend source of truth.

## Non-Goals

This implementation does not:

- Implement payments
- Implement voice APIs
- Implement CRM APIs
- Implement WhatsApp APIs
- Implement calendar APIs
- Change the logo
- Change the brand colors
- Redesign existing pages
- Commit or push changes

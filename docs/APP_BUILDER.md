# Build Your App Experience

Status: implemented as a frontend-only flagship experience  
Payment status: not connected  
Sophia status: proposal pipeline prepared  
Technology disclosure status: customer-safe

## Objective

The Build Your App experience lets visitors design a future application through the Carriersfy AI Platform. The experience is intentionally premium and interactive, closer to configuring a high-end product than filling out a traditional form.

The customer-facing experience uses only Carriersfy AI Platform language.

## Files

```txt
app-builder.js
index.html
functions/api/contact.js
docs/APP_BUILDER.md
```

## Customer-Facing Language Rule

All product intelligence is presented as:

```txt
Carriersfy AI Platform
```

The visitor is not shown behind-the-scenes build details.

## Experience Flow

The builder guides visitors through:

1. Welcome
2. Project Type
3. Industry
4. Target Users
5. Platforms
6. Required Features
7. Languages
8. Timeline
9. Estimated Complexity
10. Project Summary
11. Request Proposal

## Supported Project Types

The builder supports:

- Restaurant
- Medical
- Law Firm
- Church
- Transportation
- Construction
- Education
- Real Estate
- Marketplace
- SaaS
- Enterprise
- Internal Company Platform
- Customer Portal
- Mobile App
- AI Assistant
- Custom Solution

## Platform Selection

Visitors can select:

- iPhone
- Android
- Web
- Desktop

Multiple selections are supported.

## Feature Selection

Visitors can select product capabilities such as:

- Carriersfy AI Intelligence
- Notifications
- Maps
- Payments
- Chat
- Scheduling
- CRM
- Dashboards
- Reports
- User Accounts
- Customer Portal
- Admin Controls
- Content Management
- Internal Workflows

These are planning options only. No payment, messaging, scheduling or business system connection is active in this frontend build.

## Live Summary

The summary panel displays:

- Project Name
- Selected Features
- Estimated Timeline
- Estimated Complexity
- Monthly Estimate
- Development Estimate

All estimates are placeholders for planning. Final scope and pricing require Carriersfy AI review.

## Featured Case Study

The welcome screen includes a premium "Built by Carriersfy AI" proof section for Light of Life.

It highlights:

- Designed by Carriersfy AI
- Developed by Carriersfy AI
- Published successfully
- Available on the App Store

The visual presentation uses premium cards and screenshot placeholders without adding new assets.

## Sophia Pipeline

The final request sends the project configuration to Sophia through the existing lead path.

The request includes:

```txt
source: app_builder
owner: Sophia
intent: Build My App
```

The payload also includes an `appBuilder` object containing the selected project configuration and planning estimates.

No CRM integration, WhatsApp integration or payment connection is active.

## Accessibility

The builder includes:

- ARIA dialog semantics
- Modal state
- Keyboard navigation
- Escape key close
- Overlay click close
- Focus return
- Basic focus trap
- Responsive desktop, tablet and mobile behavior

## Performance

The builder is loaded with `defer` and creates its modal only when opened.

No new external libraries were added.

Animations are limited to existing browser-native gradients, transforms and shadows.

## Future Integrations

Future Carriersfy AI Platform capabilities can include:

- Account-based project history
- Proposal review dashboard
- Package recommendation engine
- Product roadmap generation
- Internal approval workflow
- Client portal handoff
- Proposal document generation
- Planning estimate refinement

These should remain proprietary in customer-facing language.

## Non-Goals

This implementation does not:

- Add payment processing
- Add external service connections
- Reveal internal technology
- Modify navigation
- Rename the brand
- Change colors
- Redesign the homepage
- Commit or push changes

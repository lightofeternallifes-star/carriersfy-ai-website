# Carriersfy AI Frontend Expansion

This folder contains isolated React components for the enterprise expansion. It does not modify the current production `index.html`, `support.js`, `translations.js`, logo assets, colors or deployed contact function.

## Structure

- `shared/AgentPage.jsx` - reusable premium page template for AI employees and Iron Prime
- `shared/agentData.js` - page copy and section data for Sophia, Atlas, Nova, Titan, Orion, Echo and Iron Prime
- `shared/AppDevelopmentSections.jsx` - AI App Development and Light of Life showcase sections
- `shared/Configurators.jsx` - UI-only configurators for AI employees and app builds
- `shared/carriersfy-expansion.css` - CSS matching the existing Carriersfy AI visual system
- `sophia/`, `atlas/`, `nova/`, `titan/`, `orion/`, `echo/`, `iron-prime/` - route-ready page entries
- `ai-app-development/`, `light-of-life/`, `configurators/` - additional route-ready page entries
- `index.js` - central exports for route integration

## Integration Hooks

- Contact form: `data-integration-hook="contact-form"` and `data-integration-hook="contact-submit"`
- AI employee configurator: `data-integration-hook="build-your-own-ai-employee-configurator"`
- App configurator: `data-integration-hook="build-your-own-app-configurator"`
- Configurator components accept `onChange` callbacks for future pricing, CRM and deployment logic.

## Notes

- All configurators are UI-only. No backend calls are implemented.
- Demo blocks for Sophia are placeholders for Voice Demo, WhatsApp Demo, Phone Demo and Appointment Scheduler.
- Light of Life includes placeholders for App Store Badge, Screenshots, Features, Case Study and Download Button.
- Styling intentionally reuses the current dark cinematic, glassmorphism, blue/red gradient Carriersfy AI language.

## Mission 002 TypeScript Experience Platform

The `experience/` folder contains the isolated TypeScript + Tailwind implementation for the next-generation AI Employee Experience Platform.

- `experience/data.ts` - typed employee, configurator, dashboard and project content
- `experience/types.ts` - shared TypeScript interfaces
- `experience/react-shim.d.ts` - local compile shim for this static repo; remove when integrated into a React app with normal React types
- `experience/components/ExperiencePrimitives.tsx` - reusable Tailwind primitives, cards, hero, network panel, configurator, billing and dashboard widgets
- `experience/routes/EmployeeExperiencePages.tsx` - composed pages for hub, employees, AI team, app division, Light of Life, configurators, payment center and dashboard
- `experience/routes/*Route.tsx` and individual employee files - direct route-ready exports
- `experience/index.ts` - central TypeScript exports

Mission 002 was verified with:

```bash
npm exec --yes --package typescript -- tsc --jsx react-jsx --module ESNext --target ES2020 --moduleResolution bundler --allowSyntheticDefaultImports --esModuleInterop --skipLibCheck --strict --noEmit pages/experience/react-shim.d.ts pages/experience/index.ts pages/experience/data.ts pages/experience/types.ts pages/experience/components/ExperiencePrimitives.tsx pages/experience/routes/*.tsx
```

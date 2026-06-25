import React, { useMemo, useState } from "react";
import { ContactSection, ExpansionShell, SectionHeader } from "./AgentPage";
import "./carriersfy-expansion.css";

const aiEmployeeSteps = [
  ["Industry", ["Healthcare", "Marine", "Home Services", "Real Estate", "Automotive", "Professional Services"]],
  ["Employee Name", ["Sophia", "Atlas", "Nova", "Titan", "Orion", "Echo", "Custom Name"]],
  ["Voice", ["Warm", "Executive", "Friendly", "Luxury", "Direct", "Bilingual"]],
  ["Gender", ["Female", "Male", "Neutral"]],
  ["Language", ["English", "Spanish", "Portuguese", "Multilingual"]],
  ["Functions", ["Answer Calls", "Qualify Leads", "Book Appointments", "Send Follow-Ups", "Create Estimates", "Support Customers"]],
  ["Channels", ["Phone", "WhatsApp", "SMS", "Website Chat", "Email", "Social Inbox"]],
  ["Integrations", ["CRM", "Google Calendar", "Outlook", "Zapier", "Ticketing System", "Custom API"]],
  ["Business Hours", ["24/7", "Business Hours", "After-Hours Only", "Custom Schedule"]]
];

const appSteps = [
  ["Business Type", ["Startup", "Local Business", "Enterprise", "Creator", "Nonprofit", "Internal Team"]],
  ["Platform", ["iPhone App", "Android App", "Web App", "AI App", "SaaS Platform", "Internal Dashboard"]],
  ["Features", ["Login", "Payments", "Messaging", "Admin Panel", "Analytics", "Notifications", "Content Management"]],
  ["AI Options", ["AI Chat", "Voice AI", "Document AI", "Recommendation Engine", "Workflow Automation", "No AI"]],
  ["Estimated Budget", ["Starter", "Growth", "Enterprise", "Custom Scope"]],
  ["Timeline", ["2-4 weeks", "4-8 weeks", "8-12 weeks", "Enterprise Roadmap"]]
];

function toSlug(value) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

function Configurator({ title, kicker, copy, steps, summaryTitle, priceLabel, onChange }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(() => Object.fromEntries(steps.map(([step]) => [step, ""])));

  const selectedCount = useMemo(() => Object.values(answers).filter(Boolean).length, [answers]);
  const progress = Math.round((selectedCount / steps.length) * 100);

  const choose = (step, value) => {
    const next = { ...answers, [step]: value };
    setAnswers(next);
    onChange?.(next);
  };

  const [stepName, options] = steps[currentStep];

  return (
    <section className="cf-section" id={toSlug(title)}>
      <div className="cf-container">
        <SectionHeader kicker={kicker} title={title} copy={copy} />
        <div className="cf-two-col">
          <div className="cf-card cf-card-pad" data-integration-hook={`${toSlug(kicker)}-configurator`}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 18, marginBottom: 22 }}>
              <div>
                <div className="cf-kicker" style={{ marginBottom: 8 }}>STEP {currentStep + 1} OF {steps.length}</div>
                <h3 style={{ fontFamily: "Space Grotesk", fontSize: 28, margin: 0 }}>{stepName}</h3>
              </div>
              <div style={{ color: "rgba(244,246,251,.62)", fontWeight: 700 }}>{progress}%</div>
            </div>

            {stepName.includes("Name") ? (
              <div className="cf-field">
                <label htmlFor="employee-name">Employee Name</label>
                <input
                  className="cf-input"
                  id="employee-name"
                  value={answers[stepName]}
                  onChange={(event) => choose(stepName, event.target.value)}
                  placeholder="Sophia, Atlas or a custom name"
                />
              </div>
            ) : (
              <div className="cf-option-grid">
                {options.map((option) => (
                  <button
                    className={`cf-chip ${answers[stepName] === option ? "cf-chip-active" : ""}`}
                    type="button"
                    key={option}
                    onClick={() => choose(stepName, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            <div className="cf-button-row">
              <button className="cf-secondary-button" type="button" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}>
                Previous
              </button>
              <button className="cf-primary-button" type="button" onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}>
                Next Step
              </button>
            </div>
          </div>

          <aside className="cf-card cf-card-pad">
            <div className="cf-kicker cf-kicker-red">{summaryTitle}</div>
            <h3 style={{ fontFamily: "Space Grotesk", fontSize: 30, margin: "0 0 18px" }}>Deployment Summary</h3>
            {steps.map(([step]) => (
              <div className="cf-summary-row" key={step}>
                <span>{step}</span>
                <strong>{answers[step] || "Pending"}</strong>
              </div>
            ))}
            <div className="cf-card" style={{ marginTop: 22, padding: 20, background: "linear-gradient(135deg, rgba(31,162,255,.14), rgba(255,46,60,.12))" }}>
              <div style={{ color: "rgba(244,246,251,.62)", fontSize: 13, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>{priceLabel}</div>
              <div style={{ fontFamily: "Space Grotesk", fontSize: 34, fontWeight: 700, marginTop: 6 }}>Dynamic Placeholder</div>
              <p className="cf-copy" style={{ margin: "10px 0 0", fontSize: 14 }}>
                Pricing, timing and final scope should be calculated by the integration layer.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function BuildYourOwnAIEmployee({ onChange }) {
  return (
    <Configurator
      kicker="BUILD YOUR OWN AI EMPLOYEE"
      title="Configure your next AI employee."
      copy="Choose the role, voice, channels, functions and integrations. This UI is ready for pricing and deployment logic."
      steps={aiEmployeeSteps}
      summaryTitle="AI EMPLOYEE BLUEPRINT"
      priceLabel="Dynamic Price Placeholder"
      onChange={onChange}
    />
  );
}

export function BuildYourOwnApp({ onChange }) {
  return (
    <Configurator
      kicker="BUILD YOUR OWN APP"
      title="Scope the app your business needs."
      copy="Select the platform, core features, AI options, budget range and delivery timeline for a production software build."
      steps={appSteps}
      summaryTitle="APP BUILD BLUEPRINT"
      priceLabel="Estimated Budget Placeholder"
      onChange={onChange}
    />
  );
}

export function ConfiguratorsPage() {
  return (
    <ExpansionShell>
      <BuildYourOwnAIEmployee />
      <BuildYourOwnApp />
      <ContactSection
        title="Turn the configuration into a build plan."
        copy="The configurators are UI-only today. Claude Code can connect pricing, CRM routing and booking flows during integration."
      />
    </ExpansionShell>
  );
}

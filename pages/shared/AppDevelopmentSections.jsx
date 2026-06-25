import React from "react";
import { aiAppDevelopment, lightOfLifeProject } from "./agentData";
import { ContactSection, ExpansionShell, SectionHeader } from "./AgentPage";
import "./carriersfy-expansion.css";

export function AIAppDevelopmentSection() {
  return (
    <section className="cf-section" id="ai-app-development">
      <div className="cf-container cf-two-col">
        <div>
          <div className="cf-kicker">AI APP DEVELOPMENT</div>
          <h2 className="cf-title">{aiAppDevelopment.headline}</h2>
          <p className="cf-copy" style={{ marginTop: 18 }}>{aiAppDevelopment.copy}</p>
          <div className="cf-button-row">
            <a className="cf-primary-button" href="#build-your-own-app">Build Your Own App</a>
            <a className="cf-secondary-button" href="#light-of-life">View Featured Project</a>
          </div>
        </div>
        <div className="cf-grid" style={{ "--cf-min": "190px" }}>
          {aiAppDevelopment.services.map((service, index) => (
            <article className="cf-card cf-card-pad" key={service}>
              <div className={`cf-icon-tile ${index % 3 === 2 ? "cf-red-tile" : ""}`}>{String(index + 1).padStart(2, "0")}</div>
              <h3>{service}</h3>
              <p>Designed, built and prepared for production with Carriersfy AI's enterprise workflow.</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LightOfLifeShowcase() {
  return (
    <section className="cf-section" id="light-of-life">
      <div className="cf-container">
        <SectionHeader
          kicker="FEATURED PROJECT"
          title={lightOfLifeProject.name}
          copy={lightOfLifeProject.copy}
          red
        />
        <div className="cf-card cf-card-pad">
          <div className="cf-two-col">
            <div>
              <div className="cf-placeholder" style={{ minHeight: 320 }}>Screenshots Placeholder</div>
            </div>
            <div>
              <div className="cf-kicker cf-kicker-red">REAL PRODUCTION APPLICATION</div>
              <h3 style={{ fontFamily: "Space Grotesk", fontSize: 30, margin: "0 0 14px" }}>A meaningful product built from vision to launch.</h3>
              <p className="cf-copy">
                This showcase area is prepared for App Store badges, screenshots, feature details, a case study link and a live download button.
              </p>
              <div className="cf-grid" style={{ "--cf-min": "160px", marginTop: 24 }}>
                {lightOfLifeProject.placeholders.map((item) => (
                  <div className="cf-placeholder" key={item} style={{ minHeight: 92 }}>{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AppDevelopmentPage() {
  return (
    <ExpansionShell>
      <AIAppDevelopmentSection />
      <LightOfLifeShowcase />
      <ContactSection
        title="Bring your app idea to Carriersfy AI."
        copy="From mobile apps to internal platforms, Carriersfy AI can design the product, build the system and prepare it for production."
      />
    </ExpansionShell>
  );
}

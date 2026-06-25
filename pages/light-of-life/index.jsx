import React from "react";
import { ContactSection, ExpansionShell } from "../shared/AgentPage";
import { LightOfLifeShowcase } from "../shared/AppDevelopmentSections";

export default function LightOfLifePage() {
  return (
    <ExpansionShell>
      <LightOfLifeShowcase />
      <ContactSection
        title="Review the Light of Life production showcase."
        copy="This page is prepared for the app badges, screenshots, feature gallery, case study and download modules."
      />
    </ExpansionShell>
  );
}

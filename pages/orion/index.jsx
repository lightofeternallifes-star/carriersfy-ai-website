import React from "react";
import { AgentPage } from "../shared/AgentPage";
import { agentProfiles } from "../shared/agentData";

export default function OrionPage() {
  return <AgentPage profile={agentProfiles.orion} />;
}

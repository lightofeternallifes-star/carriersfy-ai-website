import React from "react";
import { AgentPage } from "../shared/AgentPage";
import { agentProfiles } from "../shared/agentData";

export default function AtlasPage() {
  return <AgentPage profile={agentProfiles.atlas} />;
}

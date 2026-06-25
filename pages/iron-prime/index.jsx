import React from "react";
import { AgentPage } from "../shared/AgentPage";
import { agentProfiles } from "../shared/agentData";

export default function IronPrimePage() {
  return <AgentPage profile={agentProfiles["iron-prime"]} />;
}

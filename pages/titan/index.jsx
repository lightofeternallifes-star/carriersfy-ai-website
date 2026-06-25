import React from "react";
import { AgentPage } from "../shared/AgentPage";
import { agentProfiles } from "../shared/agentData";

export default function TitanPage() {
  return <AgentPage profile={agentProfiles.titan} />;
}

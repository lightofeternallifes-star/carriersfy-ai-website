export const agentProfiles = {
  sophia: {
    slug: "sophia",
    name: "Sophia",
    role: "Official AI Employee",
    label: "Receptionist and Customer Concierge",
    accent: "blue",
    hero: {
      kicker: "OFFICIAL AI EMPLOYEE",
      title: "Sophia answers, qualifies and books while your business keeps moving.",
      copy:
        "Sophia is the official AI Employee of Carriersfy AI: a voice and messaging employee designed to answer calls, manage WhatsApp, qualify leads, book appointments and stay online 24/7."
    },
    origin:
      "Sophia was created to solve the most expensive gap in growing companies: the moments when a real customer is ready to speak and no one is available to respond.",
    meaning:
      "Sophia means wisdom. The name reflects an employee that listens before acting, understands context, and gives customers clear next steps instead of generic replies.",
    mission:
      "Her mission is to protect every opportunity. She answers fast, gathers the right information, routes the right leads, and keeps the calendar full without adding payroll.",
    capabilities: [
      "Answers inbound phone calls with natural conversation",
      "Manages WhatsApp conversations and follow-ups",
      "Qualifies leads against business-specific rules",
      "Books appointments into connected calendars",
      "Confirms details and sends reminders",
      "Escalates urgent or high-value cases to the team"
    ],
    industries: ["Clinics", "Marine services", "Home services", "Real estate", "Automotive", "Professional services"],
    benefits: ["No missed calls", "Faster response times", "Higher lead conversion", "Lower staffing pressure", "Cleaner handoffs", "24/7 availability"],
    technology: ["Voice AI", "WhatsApp automation", "CRM-ready data capture", "Calendar orchestration", "Conversation memory", "Human escalation logic"],
    demos: ["Voice Demo", "WhatsApp Demo", "Phone Demo", "Appointment Scheduler"],
    faq: [
      ["Can Sophia answer real phone calls?", "Yes. Sophia is designed for real inbound and outbound call flows with qualification, routing and booking logic."],
      ["Can Sophia work on WhatsApp?", "Yes. WhatsApp is a core channel placeholder in this page and can be wired during integration."],
      ["Does Sophia replace my team?", "Sophia handles repetitive front-line work so the human team can focus on high-value conversations."]
    ]
  },
  atlas: {
    slug: "atlas",
    name: "Atlas",
    role: "AI Lead Qualification Employee",
    label: "Lead Intelligence and Routing",
    accent: "red",
    hero: {
      kicker: "AI EMPLOYEE",
      title: "Atlas carries your lead pipeline with discipline and precision.",
      copy:
        "Atlas qualifies, scores and routes every opportunity so sales teams know who is ready, who needs nurturing and what action should happen next."
    },
    origin:
      "Atlas was designed for teams drowning in forms, calls and inquiries without a reliable way to separate urgent buyers from casual interest.",
    meaning:
      "The name Atlas represents strength and structure. This AI employee carries the weight of pipeline organization so the team can move faster.",
    mission:
      "Atlas turns scattered demand into a ranked, usable sales queue with clear notes, qualification signals and next-step recommendations.",
    capabilities: ["Lead scoring", "Intake questioning", "Buyer intent detection", "CRM field capture", "Routing rules", "Follow-up triggers"],
    industries: ["SaaS", "Real estate", "Agencies", "Medical offices", "Automotive", "B2B services"],
    benefits: ["Cleaner pipeline", "Faster sales response", "Reduced manual triage", "Better handoffs", "Higher close rates", "Improved forecasting"],
    technology: ["Qualification logic", "CRM integrations", "Intent classification", "Conversation summaries", "Routing automation", "Analytics events"],
    faq: [
      ["Can Atlas qualify leads from multiple channels?", "Yes. Atlas is structured to handle intake from phone, forms, chat and messaging channels."],
      ["Can scoring rules be customized?", "Yes. The rules should be mapped to each business model before deployment."],
      ["Can Atlas update a CRM?", "This page leaves integration hooks for CRM wiring during implementation."]
    ]
  },
  nova: {
    slug: "nova",
    name: "Nova",
    role: "AI Messaging Employee",
    label: "Chat, SMS and Social Response",
    accent: "blue",
    hero: {
      kicker: "AI EMPLOYEE",
      title: "Nova turns every message into a fast, useful customer response.",
      copy:
        "Nova manages text-based conversations across WhatsApp, web chat, SMS and social inboxes with consistent answers and intelligent escalation."
    },
    origin:
      "Nova was created for the modern customer journey, where buyers message first and expect a useful answer in seconds.",
    meaning:
      "Nova means a bright new star. The name reflects the instant spark of response that keeps conversations alive.",
    mission:
      "Nova keeps every channel active, every reply consistent and every qualified conversation moving toward a booked call or completed transaction.",
    capabilities: ["WhatsApp responses", "SMS handling", "Website chat", "Social inbox triage", "Multilingual replies", "Escalation notes"],
    industries: ["Retail", "E-commerce", "Local services", "Restaurants", "Clinics", "Education"],
    benefits: ["Instant replies", "Consistent messaging", "More recovered leads", "Less inbox overload", "Stronger customer experience", "Always-on support"],
    technology: ["Messaging APIs", "Knowledge retrieval", "Language detection", "Brand voice controls", "Thread memory", "Escalation workflows"],
    faq: [
      ["Can Nova respond in different languages?", "Yes. Nova is designed for multilingual messaging workflows."],
      ["Can Nova use our existing scripts?", "Yes. Scripts, FAQs and policies become part of the training source."],
      ["Can humans take over?", "Yes. Escalation and human handoff are part of the intended workflow."]
    ]
  },
  titan: {
    slug: "titan",
    name: "Titan",
    role: "AI Quote and Estimate Employee",
    label: "Pricing, Estimates and Proposal Intake",
    accent: "red",
    hero: {
      kicker: "AI EMPLOYEE",
      title: "Titan builds quotes from your rules before the lead goes cold.",
      copy:
        "Titan captures project details, applies pricing logic, prepares estimate data and gives teams a faster path from inquiry to revenue."
    },
    origin:
      "Titan was created for businesses where quote delays cost deals and every estimate requires the same repetitive questions.",
    meaning:
      "Titan represents power and dependability. The name fits an AI employee built to handle heavy operational workflows.",
    mission:
      "Titan standardizes quote intake and speeds up estimate creation while preserving the rules and judgment of the business.",
    capabilities: ["Estimate intake", "Pricing rule capture", "Quote preparation", "Photo and file prompts", "Approval routing", "Proposal summary creation"],
    industries: ["Signs and print", "Construction", "Marine service", "Home services", "Events", "Custom manufacturing"],
    benefits: ["Faster estimates", "Better project details", "Fewer pricing mistakes", "Reduced admin load", "Higher quote volume", "Cleaner sales records"],
    technology: ["Pricing logic", "Structured intake", "File collection hooks", "CRM handoff", "Approval workflows", "Estimate analytics"],
    faq: [
      ["Can Titan calculate exact pricing?", "Titan can use configured pricing rules, but final pricing controls should be approved during implementation."],
      ["Can Titan collect project files?", "The UI is prepared for file and photo prompts to be wired later."],
      ["Can Titan send proposals?", "Proposal generation can be connected as an integration step."]
    ]
  },
  orion: {
    slug: "orion",
    name: "Orion",
    role: "AI Sales Employee",
    label: "Outbound, Demos and Follow-Up",
    accent: "blue",
    hero: {
      kicker: "AI EMPLOYEE",
      title: "Orion keeps sales conversations moving until the next step is booked.",
      copy:
        "Orion handles sales follow-up, demo booking, buyer questions and opportunity reminders with the discipline of an always-on sales assistant."
    },
    origin:
      "Orion was created for sales teams that lose momentum between inquiry, follow-up and appointment booking.",
    meaning:
      "Orion is a navigator in the night sky. The name reflects guidance across the sales journey from first signal to booked opportunity.",
    mission:
      "Orion makes sure no serious buyer is left waiting, forgotten or unclear about the next step.",
    capabilities: ["Demo booking", "Follow-up sequences", "Buyer question handling", "Opportunity reminders", "Lead reactivation", "Sales notes"],
    industries: ["B2B services", "SaaS", "Real estate", "Agencies", "Automotive", "High-ticket local services"],
    benefits: ["More booked calls", "Faster follow-up", "Lower sales leakage", "Better buyer experience", "Higher team focus", "Clearer pipeline notes"],
    technology: ["Calendar logic", "CRM tasks", "Conversation summaries", "Intent signals", "Follow-up automation", "Sales analytics"],
    faq: [
      ["Can Orion book sales meetings?", "Yes. Booking workflows are a core part of the page structure."],
      ["Can Orion follow up after hours?", "Yes. Orion is designed to keep communication active beyond business hours."],
      ["Can Orion work with a sales team?", "Yes. It supports handoffs instead of replacing strategic human selling."]
    ]
  },
  echo: {
    slug: "echo",
    name: "Echo",
    role: "AI Support Employee",
    label: "Customer Support and Resolution",
    accent: "red",
    hero: {
      kicker: "AI EMPLOYEE",
      title: "Echo gives customers answers that sound like your company.",
      copy:
        "Echo handles common support questions, status updates, intake, triage and escalation so customers get help without waiting on a ticket queue."
    },
    origin:
      "Echo was created to reduce repetitive support load while keeping customers informed, respected and moving toward resolution.",
    meaning:
      "Echo reflects consistency. This AI employee repeats the best answers from your company knowledge with accuracy and speed.",
    mission:
      "Echo protects customer trust by making support available, organized and responsive across the channels customers already use.",
    capabilities: ["FAQ support", "Ticket intake", "Order and status prompts", "Troubleshooting flows", "Escalation routing", "Resolution summaries"],
    industries: ["E-commerce", "Clinics", "SaaS", "Education", "Local services", "Membership businesses"],
    benefits: ["Shorter response times", "Lower support volume", "Consistent answers", "Better triage", "Happier customers", "More complete tickets"],
    technology: ["Knowledge retrieval", "Ticket integrations", "Status workflows", "Conversation memory", "Escalation rules", "Support analytics"],
    faq: [
      ["Can Echo answer from our policies?", "Yes. Echo should be trained on approved company knowledge and support policies."],
      ["Can Echo create support tickets?", "The UI leaves integration hooks for ticketing systems."],
      ["Can Echo escalate sensitive issues?", "Yes. Escalation rules should be configured for urgent, complex or high-risk cases."]
    ]
  },
  "iron-prime": {
    slug: "iron-prime",
    name: "Iron Prime",
    role: "AI Chief Executive Officer",
    label: "Command Center Intelligence",
    accent: "red",
    executive: true,
    hero: {
      kicker: "AI CHIEF EXECUTIVE OFFICER",
      title: "Iron Prime coordinates the enterprise AI company from the command center.",
      copy:
        "Iron Prime is not an AI Employee. It is the AI Chief Executive Officer layer designed to coordinate systems, agents, strategy and scalable enterprise execution."
    },
    origin:
      "Iron Prime was conceived as the executive architecture above the workforce: a command layer that sees the company as a system, not a collection of disconnected tasks.",
    meaning:
      "Iron represents strength, durability and operational discipline. Prime represents the first authority in the AI hierarchy.",
    mission:
      "Iron Prime's mission is to coordinate AI employees, business systems and enterprise strategy into one scalable operating model.",
    capabilities: ["Executive coordination", "Agent orchestration", "Strategic oversight", "System monitoring", "Operational planning", "Enterprise reporting"],
    industries: ["Enterprise operations", "AI companies", "Multi-location businesses", "Managed services", "Platform companies", "Private operating groups"],
    benefits: ["Centralized control", "Scalable AI governance", "Clearer executive visibility", "Faster operational response", "Stronger system alignment", "Enterprise-grade planning"],
    technology: ["Agent registry", "Decision engines", "Knowledge graph", "Roadmap systems", "Task orchestration", "Executive dashboards"],
    faq: [
      ["Is Iron Prime an AI Employee?", "No. Iron Prime is positioned as the AI Chief Executive Officer layer above individual AI employees."],
      ["What does Iron Prime coordinate?", "It coordinates AI employees, systems, decisions, workflows and enterprise reporting."],
      ["Is this page meant to feel different?", "Yes, but only within the existing Carriersfy AI visual system. The command center emphasis uses the same palette and components."]
    ]
  }
};

export const aiAppDevelopment = {
  headline: "Have a dream? We'll build it.",
  copy:
    "Carriersfy AI develops production-ready software for founders, operators and companies that need intelligent systems built with enterprise discipline.",
  services: [
    "iPhone Apps",
    "Android Apps",
    "AI Apps",
    "Enterprise Platforms",
    "SaaS Platforms",
    "Business Systems",
    "AI Integrations",
    "Internal Dashboards"
  ]
};

export const lightOfLifeProject = {
  name: "Light of Life",
  copy:
    "Light of Life is a real production application developed by Carriersfy AI, built to transform a meaningful vision into a polished digital product ready for users.",
  placeholders: ["App Store Badge", "Screenshots", "Features", "Case Study", "Download Button"]
};

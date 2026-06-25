import type { ConfiguratorStep, DashboardMetric, EmployeeProfile } from "./types";

export const employees: EmployeeProfile[] = [
  {
    slug: "sophia",
    name: "Sophia",
    role: "AI Receptionist and Customer Concierge",
    kind: "employee",
    status: "Online",
    avatar: "S",
    accent: "blue",
    shortDescription: "Answers calls, manages WhatsApp, qualifies leads and books appointments around the clock.",
    hero: "Sophia is the front-line AI Employee built to make every customer feel answered, guided and scheduled.",
    origin: "Sophia was created for the moment every business fears: a ready customer calling, messaging or asking for help when no human is available.",
    nameMeaning: "Sophia means wisdom. The name reflects a digital employee that listens first, understands context and responds with useful next steps.",
    mission: "Protect every opportunity by answering fast, capturing details, qualifying the lead and booking the right appointment.",
    responsibilities: ["Answer inbound calls", "Manage WhatsApp conversations", "Capture customer details", "Qualify intent", "Book appointments", "Escalate urgent requests"],
    benefits: ["No missed calls", "Faster response time", "More booked appointments", "Lower front-desk pressure", "Cleaner handoffs", "24/7 availability"],
    industries: ["Healthcare", "Marine services", "Home services", "Real estate", "Automotive", "Professional services"],
    technology: ["Voice AI", "WhatsApp automation", "Calendar logic", "CRM-ready intake", "Conversation memory", "Human escalation"],
    faqs: [
      { question: "Can Sophia answer calls?", answer: "Yes. Sophia is designed for real voice workflows, qualification and appointment booking." },
      { question: "Can Sophia work after hours?", answer: "Yes. She can operate 24/7 or follow a custom business schedule." },
      { question: "Can Sophia hand off to humans?", answer: "Yes. Urgent, complex or high-value conversations can be routed to the team." }
    ]
  },
  {
    slug: "atlas",
    name: "Atlas",
    role: "AI Lead Qualification Employee",
    kind: "employee",
    status: "Online",
    avatar: "A",
    accent: "red",
    shortDescription: "Scores, organizes and routes leads so teams focus on the opportunities most likely to close.",
    hero: "Atlas carries the weight of pipeline qualification with structure, scoring and disciplined routing.",
    origin: "Atlas was created for teams receiving too many inquiries without a reliable system for identifying serious buyers.",
    nameMeaning: "Atlas represents strength and structure. The name fits an AI employee that holds the pipeline together.",
    mission: "Turn scattered demand into a ranked sales queue with clear notes, urgency and next-step recommendations.",
    responsibilities: ["Ask qualification questions", "Score buyer intent", "Capture CRM fields", "Route leads", "Trigger follow-up", "Summarize sales context"],
    benefits: ["Cleaner pipeline", "Better handoffs", "Less manual triage", "Faster sales response", "Improved forecasting", "Higher close rate"],
    industries: ["SaaS", "Real estate", "Agencies", "Medical offices", "Automotive", "B2B services"],
    technology: ["Intent detection", "CRM mapping", "Lead scoring", "Routing rules", "Conversation summaries", "Analytics events"],
    faqs: [
      { question: "Can Atlas customize scoring?", answer: "Yes. Qualification rules should be mapped to each business before launch." },
      { question: "Can Atlas route by territory?", answer: "Yes. Routing can use service area, service type, urgency or sales ownership." },
      { question: "Can Atlas update a CRM?", answer: "The component leaves integration hooks for CRM wiring by the architect." }
    ]
  },
  {
    slug: "nova",
    name: "Nova",
    role: "AI Messaging Employee",
    kind: "employee",
    status: "Online",
    avatar: "N",
    accent: "blue",
    shortDescription: "Responds across WhatsApp, SMS, website chat and social inboxes with consistent brand voice.",
    hero: "Nova keeps every message channel alive with instant, useful and brand-consistent responses.",
    origin: "Nova was created for the modern customer journey where buyers often message before they call.",
    nameMeaning: "Nova means a bright new star. The name reflects the instant spark of response that keeps conversations moving.",
    mission: "Make every text-based customer interaction fast, accurate and ready for a human handoff when needed.",
    responsibilities: ["Reply to inbound messages", "Detect language", "Answer FAQs", "Capture context", "Trigger handoffs", "Send reminders"],
    benefits: ["Instant replies", "Lower inbox pressure", "Consistent messaging", "More recovered leads", "Better experience", "Multilingual reach"],
    industries: ["Retail", "E-commerce", "Clinics", "Restaurants", "Education", "Local services"],
    technology: ["Messaging APIs", "Knowledge retrieval", "Language detection", "Brand voice controls", "Thread memory", "Escalation workflows"],
    faqs: [
      { question: "Can Nova respond in multiple languages?", answer: "Yes. Nova is structured for multilingual workflows." },
      { question: "Can humans take over?", answer: "Yes. Human handoff is part of the intended messaging flow." },
      { question: "Can Nova use our FAQs?", answer: "Yes. Approved company knowledge becomes part of the training source." }
    ]
  },
  {
    slug: "titan",
    name: "Titan",
    role: "AI Quote and Estimate Employee",
    kind: "employee",
    status: "Online",
    avatar: "T",
    accent: "red",
    shortDescription: "Collects project details and prepares quote-ready information using business-specific pricing rules.",
    hero: "Titan turns quote requests into structured estimate workflows before the buyer loses momentum.",
    origin: "Titan was created for businesses where slow estimates cost revenue and repetitive project intake drains the team.",
    nameMeaning: "Titan represents durability and power. The name fits heavy operational workflows that need consistency.",
    mission: "Standardize quote intake, reduce manual work and prepare accurate estimate data for approval.",
    responsibilities: ["Ask project questions", "Capture dimensions", "Request files", "Apply pricing logic", "Route approvals", "Prepare quote summaries"],
    benefits: ["Faster estimates", "Better project data", "Fewer mistakes", "More quote volume", "Cleaner records", "Lower admin load"],
    industries: ["Signs and print", "Construction", "Marine service", "Home services", "Events", "Custom manufacturing"],
    technology: ["Structured intake", "Pricing rules", "File prompts", "CRM handoff", "Approval routing", "Estimate analytics"],
    faqs: [
      { question: "Can Titan calculate pricing?", answer: "Titan can use configured rules, with final pricing controls set during implementation." },
      { question: "Can Titan collect files?", answer: "Yes. File and photo collection can be connected later." },
      { question: "Can Titan prepare proposals?", answer: "Proposal generation can be added as an integration." }
    ]
  },
  {
    slug: "orion",
    name: "Orion",
    role: "AI Sales Employee",
    kind: "employee",
    status: "Online",
    avatar: "O",
    accent: "blue",
    shortDescription: "Follows up, answers sales questions and books demos so opportunities keep moving.",
    hero: "Orion guides buyers from first signal to scheduled sales conversation.",
    origin: "Orion was created for sales teams losing momentum between inquiry, follow-up and appointment booking.",
    nameMeaning: "Orion is a navigator in the night sky. The name reflects guidance through the sales journey.",
    mission: "Keep serious buyers engaged, informed and scheduled for the next step.",
    responsibilities: ["Follow up with leads", "Book demos", "Answer sales questions", "Reactivate opportunities", "Log notes", "Remind sales reps"],
    benefits: ["More booked calls", "Faster follow-up", "Less leakage", "Better buyer experience", "Clearer pipeline", "Higher team focus"],
    industries: ["B2B services", "SaaS", "Real estate", "Agencies", "Automotive", "High-ticket services"],
    technology: ["Calendar logic", "CRM tasks", "Intent signals", "Conversation summaries", "Follow-up automation", "Sales analytics"],
    faqs: [
      { question: "Can Orion book demos?", answer: "Yes. Demo and appointment booking are core workflows." },
      { question: "Can Orion follow up after hours?", answer: "Yes. Follow-up can continue beyond business hours." },
      { question: "Does Orion replace sales reps?", answer: "No. Orion supports sales teams by handling repetitive momentum work." }
    ]
  },
  {
    slug: "echo",
    name: "Echo",
    role: "AI Support Employee",
    kind: "employee",
    status: "Online",
    avatar: "E",
    accent: "red",
    shortDescription: "Resolves common support questions, captures tickets and escalates complex issues.",
    hero: "Echo gives customers fast answers that sound like the company they trusted.",
    origin: "Echo was created to reduce repetitive support pressure while keeping customers informed and respected.",
    nameMeaning: "Echo reflects consistency. This employee repeats the best approved answers with accuracy and speed.",
    mission: "Protect customer trust with responsive support, structured intake and reliable escalation.",
    responsibilities: ["Answer FAQs", "Capture ticket details", "Provide status prompts", "Run troubleshooting flows", "Escalate issues", "Summarize resolutions"],
    benefits: ["Shorter response time", "Lower ticket volume", "Consistent answers", "Better triage", "Happier customers", "More complete tickets"],
    industries: ["E-commerce", "Clinics", "SaaS", "Education", "Local services", "Membership businesses"],
    technology: ["Knowledge retrieval", "Ticket integrations", "Status workflows", "Conversation memory", "Escalation rules", "Support analytics"],
    faqs: [
      { question: "Can Echo use our policies?", answer: "Yes. Echo should be trained on approved support policies and knowledge." },
      { question: "Can Echo create tickets?", answer: "The UI is prepared for ticketing system integration." },
      { question: "Can Echo escalate sensitive issues?", answer: "Yes. Escalation rules can route urgent or complex issues to humans." }
    ]
  },
  {
    slug: "iron-prime",
    name: "Iron Prime",
    role: "AI Chief Executive Officer",
    kind: "ceo",
    status: "Coordinating",
    avatar: "IP",
    accent: "red",
    shortDescription: "Coordinates the AI workforce, routes priorities and gives the company a command-center layer.",
    hero: "Iron Prime is the AI CEO layer that coordinates employees, systems, decisions and enterprise execution.",
    origin: "Iron Prime was conceived as the executive architecture above the AI workforce: a command layer that sees the company as a system.",
    nameMeaning: "Iron represents strength and operational discipline. Prime represents the first authority in the AI hierarchy.",
    mission: "Coordinate AI employees, business systems and enterprise strategy into one scalable operating model.",
    responsibilities: ["Coordinate agents", "Monitor workflows", "Route priorities", "Surface performance", "Align systems", "Report executive signals"],
    benefits: ["Centralized control", "Clear executive visibility", "Scalable AI governance", "Faster operations", "Stronger alignment", "Enterprise planning"],
    industries: ["Enterprise operations", "AI companies", "Multi-location businesses", "Managed services", "Platform companies", "Private operating groups"],
    technology: ["Agent registry", "Decision engines", "Knowledge graph", "Workflow orchestration", "Task routing", "Executive dashboards"],
    faqs: [
      { question: "Is Iron Prime an AI Employee?", answer: "No. Iron Prime is the AI Chief Executive Officer layer above individual AI employees." },
      { question: "What does Iron Prime coordinate?", answer: "It coordinates agents, systems, tasks, business signals and enterprise reporting." },
      { question: "Can Iron Prime manage multiple employees?", answer: "Yes. The page is built around coordination and scalable AI workforce oversight." }
    ]
  }
];

export const appDevelopmentServices = [
  "Native iPhone Apps",
  "Android Apps",
  "AI Applications",
  "Enterprise Platforms",
  "SaaS Systems",
  "Business Automation",
  "Internal Dashboards",
  "Customer Portals"
];

export const lightOfLifeSections = [
  "Overview",
  "Problem",
  "Solution",
  "Technology",
  "Artificial Intelligence",
  "Three Languages",
  "Apple App Store",
  "Results"
];

export const aiEmployeeConfiguratorSteps: ConfiguratorStep[] = [
  { id: "industry", title: "Industry", type: "single", options: ["Healthcare", "Marine", "Home Services", "Real Estate", "Automotive", "Professional Services"] },
  { id: "employeeName", title: "Employee Name", type: "text", placeholder: "Sophia, Atlas or a custom employee name" },
  { id: "gender", title: "Male / Female", type: "single", options: ["Female", "Male", "Neutral"] },
  { id: "voice", title: "Voice Selection", type: "single", options: ["Warm", "Executive", "Friendly", "Luxury", "Direct", "Bilingual"] },
  { id: "voicePreview", title: "Live Voice Preview Placeholder", type: "placeholder" },
  { id: "language", title: "Language", type: "single", options: ["English", "Spanish", "Portuguese", "Multilingual"] },
  { id: "channels", title: "Channels", type: "multi", options: ["Phone", "WhatsApp", "SMS", "Email", "Website Chat"] },
  { id: "functions", title: "Functions", type: "multi", options: ["Lead Qualification", "Sales", "Support", "Appointments", "Quotes", "CRM", "Calendar", "Follow-up"] },
  { id: "integrations", title: "Integrations", type: "multi", options: ["CRM", "Calendar", "Zapier", "Email", "Ticketing", "Custom API"] },
  { id: "businessHours", title: "Business Hours", type: "single", options: ["24/7", "Business Hours", "After-Hours Only", "Custom Schedule"] },
  { id: "price", title: "Dynamic Price Placeholder", type: "placeholder" },
  { id: "summary", title: "Summary", type: "placeholder" }
];

export const appConfiguratorSteps: ConfiguratorStep[] = [
  { id: "businessType", title: "Business Type", type: "single", options: ["Startup", "Local Business", "Enterprise", "Creator", "Nonprofit", "Internal Team"] },
  { id: "platforms", title: "Platforms", type: "multi", options: ["iPhone", "Android", "Web", "Desktop"] },
  { id: "features", title: "Desired Features", type: "multi", options: ["Artificial Intelligence", "Authentication", "Payments", "Maps", "GPS", "Notifications", "Voice", "Analytics", "Admin Dashboard", "Cloud"] },
  { id: "timeline", title: "Timeline", type: "single", options: ["2-4 weeks", "4-8 weeks", "8-12 weeks", "Enterprise Roadmap"] },
  { id: "investment", title: "Estimated Investment Placeholder", type: "placeholder" }
];

export const dashboardMetrics: DashboardMetric[] = [
  { label: "Active AI Employees", value: "6", detail: "Online now", trend: "+1 this month" },
  { label: "Calls", value: "1,284", detail: "Handled this week", trend: "+34%" },
  { label: "Chats", value: "638", detail: "Across channels", trend: "+18%" },
  { label: "Appointments", value: "128", detail: "Booked automatically", trend: "+27%" },
  { label: "Leads", value: "347", detail: "Qualified", trend: "+42%" },
  { label: "Quotes", value: "64", detail: "Prepared by Titan", trend: "+15%" },
  { label: "Revenue", value: "$86,420", detail: "Influenced pipeline", trend: "+38%" },
  { label: "Usage", value: "72%", detail: "Plan capacity", trend: "Healthy" }
];

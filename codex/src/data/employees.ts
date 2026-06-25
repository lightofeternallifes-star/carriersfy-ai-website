export interface EmployeeConfig {
  id: string
  name: string
  role: string
  tagline: string
  color: 'blue' | 'red' | 'gold'
  initial: string
  origin: string
  whyThisName: string
  mission: string
  responsibilities: string[]
  benefits: { title: string; description: string }[]
  industries: string[]
  tech: string[]
  faqs: { q: string; a: string }[]
  stats: { label: string; value: string }[]
}

export const sophia: EmployeeConfig = {
  id: 'sophia',
  name: 'Sophia',
  role: 'Receptionist',
  tagline: 'Every call answered. Every customer heard. Every second of the day.',
  color: 'blue',
  initial: 'S',
  origin: `Sophia was born from a simple observation: businesses lose thousands of dollars every day not because their product is bad, but because no one answered the phone. A missed call at 8 PM. A voicemail that never got returned. A customer who called three times and gave up. Sophia was designed to make that impossible.\n\nBuilt on Carriersfy AI's proprietary voice intelligence layer, Sophia doesn't just answer calls — she understands them. She knows your services, your pricing, your team's availability, and your customers' history. She speaks naturally, thinks quickly, and represents your brand with the professionalism of your best human receptionist — at a fraction of the cost, with none of the sick days.`,
  whyThisName: `The name Sophia comes from the Greek word for wisdom — σοφία. We chose it because a great receptionist isn't just fast, she's wise. She knows when to escalate, when to resolve, and when to simply listen. Sophia doesn't just process calls; she makes smart decisions in real time that reflect the intelligence your business deserves at its front door.`,
  mission: `Sophia's mission is singular: make sure no customer ever feels ignored. Every inbound call is an opportunity — for a sale, for loyalty, for a relationship. Sophia captures every one of them with warmth, precision, and the kind of consistency that human receptionists can never guarantee across every hour of every day.`,
  responsibilities: [
    'Answer 100% of inbound calls within 2 rings, 24 hours a day, 7 days a week',
    'Identify caller intent and route to the right department, team member, or workflow',
    'Capture lead information: name, contact details, service need, and urgency level',
    'Schedule appointments directly into your calendar system with automatic confirmations',
    'Answer FAQs about your services, pricing, location, and hours with trained accuracy',
    'Send follow-up texts or emails immediately after each call with a summary',
    'Flag high-priority callers and urgent issues for immediate human escalation',
    'Log every call interaction to your CRM with full transcripts and tags',
  ],
  benefits: [
    {
      title: 'Zero Missed Opportunities',
      description: 'Every call is answered, every lead is captured. Sophia eliminates the revenue leak of unanswered calls permanently.',
    },
    {
      title: 'Instant Brand Professionalism',
      description: 'From the first ring, customers experience a polished, knowledgeable representative who sounds like your best employee.',
    },
    {
      title: '80% Lower Cost Than Hiring',
      description: 'Sophia costs a fraction of a full-time receptionist — with no benefits, no overtime, no training time, and no turnover.',
    },
    {
      title: 'Scales Instantly',
      description: 'Whether you receive 10 calls or 10,000 in a day, Sophia handles them all simultaneously with no degradation in quality.',
    },
  ],
  industries: ['Marine & Boating', 'Home Services', 'Healthcare & Clinics', 'Real Estate', 'Automotive', 'Professional Services', 'Retail', 'Restaurants'],
  tech: ['Conversational Voice AI', 'Natural Language Processing', 'CRM Integration', 'Calendar APIs', 'SMS/Email Dispatch', 'Real-time Transcription', 'Sentiment Analysis'],
  faqs: [
    {
      q: 'Can Sophia handle calls in multiple languages?',
      a: 'Yes. Sophia is fluent in English, Spanish, and Portuguese out of the box, with additional languages available upon request. She auto-detects the caller\'s preferred language within the first exchange.',
    },
    {
      q: 'How long does it take to deploy Sophia for my business?',
      a: 'Most deployments go live within 14 days. Our team trains Sophia on your services, pricing, scripts, and FAQs during onboarding — no technical work required from you.',
    },
    {
      q: 'What happens with a call Sophia can\'t handle?',
      a: 'Sophia recognizes when a situation requires a human and performs a warm transfer immediately — including a briefing to your team member on what was discussed before they pick up.',
    },
    {
      q: 'Can I review what Sophia says on every call?',
      a: 'Absolutely. Full call transcripts, recordings (where permitted by law), and a conversation summary are delivered to your dashboard and CRM after every interaction.',
    },
    {
      q: 'Does Sophia integrate with my existing phone system?',
      a: 'Yes. Sophia works with virtually any business phone number through VoIP integration. We handle the technical setup — you keep your number, your callers notice no change except better service.',
    },
  ],
  stats: [
    { label: 'Calls Answered Today', value: '1,284' },
    { label: 'Avg Response Time', value: '<2s' },
    { label: 'Customer Satisfaction', value: '98%' },
  ],
}

export const atlas: EmployeeConfig = {
  id: 'atlas',
  name: 'Atlas',
  role: 'Lead Qualification Specialist',
  tagline: 'Every lead scored. Every opportunity ranked. Every hot prospect surfaced instantly.',
  color: 'red',
  initial: 'A',
  origin: `Most businesses don't have a lead problem — they have a lead chaos problem. Hundreds of inquiries come in every week across calls, forms, texts, and messages. Some are ready to buy today. Others are just browsing. Without a system to tell them apart, sales teams waste hours chasing cold leads while hot opportunities go cold waiting.\n\nAtlas was built to solve this problem permanently. Using Carriersfy AI's proprietary lead scoring engine, Atlas evaluates every incoming lead in real time across dozens of signals — intent language, channel, response speed, company size, and more — and assigns an actionable score that tells your team exactly where to focus their energy.`,
  whyThisName: `Atlas was named for the Titan who held up the world — because that's exactly what a great qualification engine does. It carries the weight of an entire lead pipeline so your sales team doesn't have to. The name also reflects reach: Atlas sees across all channels, all conversations, all data points simultaneously, giving your business a view of its pipeline that no human could maintain alone.`,
  mission: `Atlas exists to make your sales team ruthlessly efficient. By automatically scoring, tagging, and routing every lead before a human ever touches it, Atlas ensures that the best opportunities always get the fastest response — and that no high-value prospect falls through the cracks.`,
  responsibilities: [
    'Evaluate every incoming lead across all channels in real time using AI scoring models',
    'Assign lead quality scores (Hot/Warm/Cold) based on intent, behavior, and context',
    'Tag leads with category labels: service type, urgency, budget signals, and company size',
    'Route high-score leads immediately to the right sales rep or team',
    'Send automated nurture sequences to warm leads until they\'re ready to convert',
    'Alert your team within seconds when a lead score spikes due to new activity',
    'Sync all lead data and scores to your CRM with complete context',
    'Generate weekly pipeline quality reports showing conversion trends by source',
  ],
  benefits: [
    {
      title: 'Sales Team Works Smarter',
      description: 'Your reps spend 100% of their time on leads that are actually qualified — no more wasted calls on tire-kickers.',
    },
    {
      title: 'Faster Response to Hot Leads',
      description: 'The moment a high-intent lead comes in, Atlas flags it and notifies the right person — cutting response time from hours to seconds.',
    },
    {
      title: 'Higher Close Rates',
      description: 'Businesses using AI lead scoring see 25-40% higher close rates because their pipeline is cleaner and their focus is sharper.',
    },
    {
      title: 'Full Pipeline Visibility',
      description: 'Atlas gives management a real-time view of lead quality by source, channel, and stage — enabling smarter marketing decisions.',
    },
  ],
  industries: ['Real Estate', 'Financial Services', 'SaaS & Technology', 'Home Services', 'Automotive', 'Healthcare', 'Insurance', 'Professional Services'],
  tech: ['AI Lead Scoring', 'Behavioral Analytics', 'CRM Sync', 'Multi-channel Aggregation', 'Automated Nurture Sequences', 'Predictive Modeling', 'Pipeline Analytics'],
  faqs: [
    {
      q: 'What signals does Atlas use to score a lead?',
      a: 'Atlas evaluates 40+ signals including: message urgency language, response speed, channel source, time of contact, company indicators, service requested, budget language, and historical behavior patterns.',
    },
    {
      q: 'Can Atlas work with leads from multiple sources simultaneously?',
      a: 'Yes. Atlas aggregates leads from calls, web forms, SMS, email, social DMs, and WhatsApp into a single scoring engine. Every lead, regardless of origin, gets the same rigorous evaluation.',
    },
    {
      q: 'How does Atlas route leads to the right rep?',
      a: 'Routing rules are configured during onboarding based on your team structure, territory, specialty, and capacity. Atlas can do round-robin, priority-based, or skill-matched routing.',
    },
    {
      q: 'What happens to cold leads?',
      a: 'Atlas places cold leads into automated nurture sequences — a series of timed, personalized follow-ups that re-engage them over days or weeks. When a cold lead re-engages, Atlas re-scores and re-routes them instantly.',
    },
    {
      q: 'Can I customize the scoring criteria for my industry?',
      a: 'Absolutely. During onboarding, we customize Atlas\'s scoring weights for your specific business. A marine services company prioritizes different signals than a healthcare clinic, and Atlas adapts accordingly.',
    },
  ],
  stats: [
    { label: 'Leads Qualified Today', value: '347' },
    { label: 'Hot Leads Routed', value: '89' },
    { label: 'Pipeline Value Tracked', value: '$2.1M' },
  ],
}

export const nova: EmployeeConfig = {
  id: 'nova',
  name: 'Nova',
  role: 'Messaging Agent',
  tagline: 'Every message answered. Every channel covered. Every language spoken.',
  color: 'blue',
  initial: 'N',
  origin: `The modern customer doesn't pick up the phone — they text, DM, chat, and WhatsApp. And they expect an answer in minutes, not hours. Most businesses scramble to cover these channels with overworked staff who can't possibly maintain quality across seven platforms simultaneously.\n\nNova was designed for this reality. She lives natively across every messaging channel — SMS, WhatsApp, website chat, Instagram DMs, Facebook Messenger, and email — maintaining a unified customer identity and conversation history regardless of which platform the customer uses. Nova doesn't just respond; she remembers.`,
  whyThisName: `Nova is named for a star that suddenly blazes with new light — because that's exactly what happens to a business's messaging response capability the moment Nova goes live. Channels that were dark or slow suddenly become instant and intelligent. Nova also represents the new standard: a messaging experience so fluid and natural that customers can't tell they're not talking to a human.`,
  mission: `Nova's mission is to ensure that every text, chat, DM, and email your business receives gets an intelligent, brand-consistent response within seconds — regardless of the hour, the channel, or the volume of simultaneous conversations happening at once.`,
  responsibilities: [
    'Monitor and respond to all incoming messages across SMS, WhatsApp, web chat, email, and social DMs',
    'Maintain conversation context and customer history across channel switches',
    'Qualify leads through conversational messaging and collect contact and project details',
    'Answer product and service questions using your knowledge base with trained accuracy',
    'Book appointments and send calendar confirmations directly through chat',
    'Generate and send instant estimates and quotes via messaging',
    'Escalate complex conversations to human agents with full context handoff',
    'Send proactive follow-up messages for leads, appointments, and open quotes',
  ],
  benefits: [
    {
      title: 'Unified Inbox Intelligence',
      description: 'One AI brain across all channels means consistent service quality and no message ever slipping through a gap between platforms.',
    },
    {
      title: 'Sub-Second Response Times',
      description: 'Customers texting at 11 PM get an instant, helpful reply. That speed converts to sales that would otherwise have been lost overnight.',
    },
    {
      title: 'Multilingual by Default',
      description: 'Nova auto-detects language and responds fluently in English, Spanish, and Portuguese — no switching required from the customer.',
    },
    {
      title: 'Volume Without Limits',
      description: 'Whether Nova handles 5 or 5,000 simultaneous conversations, every customer gets the same quality and speed of service.',
    },
  ],
  industries: ['E-commerce & Retail', 'Healthcare', 'Real Estate', 'Signs & Print', 'Restaurant & Food', 'Marine & Boating', 'Home Services', 'Education'],
  tech: ['WhatsApp Business API', 'Twilio SMS', 'Web Chat Widget', 'Instagram Graph API', 'Facebook Messenger API', 'Email Integration', 'NLP Engine', 'Multilingual AI'],
  faqs: [
    {
      q: 'How does Nova handle conversations across multiple channels from the same customer?',
      a: 'Nova maintains a unified customer profile. When a customer who texted you yesterday now opens your website chat, Nova recognizes them and continues the conversation with full context — no starting over.',
    },
    {
      q: 'Can Nova handle hundreds of conversations at the same time?',
      a: 'Yes, with no degradation in quality. Nova processes each conversation independently and simultaneously. There is no queue, no wait time, and no dropped conversations regardless of volume.',
    },
    {
      q: 'What does the escalation to a human look like?',
      a: 'Nova detects when a conversation needs human intervention — emotionally charged situations, complex requests, or explicit human requests. She performs a warm handoff with a full conversation summary so your agent starts briefed.',
    },
    {
      q: 'Can Nova send images, PDFs, or files through messaging?',
      a: 'Yes, on supported channels (WhatsApp, email, web chat). Nova can send brochures, estimates, contracts, and media files as part of a conversation flow.',
    },
    {
      q: 'How do I add my company\'s knowledge to Nova?',
      a: 'During onboarding, we upload your FAQs, service descriptions, pricing guides, policies, and scripts into Nova\'s knowledge base. She learns to answer accurately in your brand voice within days.',
    },
  ],
  stats: [
    { label: 'Chats Today', value: '638' },
    { label: 'Channels Active', value: '6' },
    { label: 'Avg Response', value: '<3s' },
  ],
}

export const titan: EmployeeConfig = {
  id: 'titan',
  name: 'Titan',
  role: 'Quote Generator',
  tagline: 'Accurate estimates in seconds. Every time. For every customer.',
  color: 'red',
  initial: 'T',
  origin: `Generating a quote used to require a trained estimator, a pricing sheet, a calculator, and twenty minutes. For many businesses, the quote was the bottleneck — the moment in the pipeline where deals went cold because the customer had to wait. Titan was built to eliminate that wait forever.\n\nTitan combines your pricing rules, service catalog, material costs, and business logic into an intelligent estimation engine that generates accurate, professional quotes in seconds — through any channel, at any hour. He doesn't guess. He calculates based on exactly the parameters you've trained him on, with the same precision your best estimator would apply.`,
  whyThisName: `Titan comes from the mythological race of powerful beings who preceded the gods — because Titan's capability to generate accurate estimates at scale would have seemed godlike in any business era before now. The name also reflects weight and precision: Titan carries the full complexity of your pricing structure and delivers it with the accuracy of a system that never makes arithmetic errors.`,
  mission: `Titan's mission is to turn every qualified prospect into a quoted prospect within seconds of their inquiry — removing the estimation bottleneck from your sales process and ensuring that every customer receives a professional, accurate quote while their interest is at its highest.`,
  responsibilities: [
    'Generate accurate quotes and estimates based on customer-provided specifications',
    'Apply your pricing rules, material costs, labor rates, and margin targets automatically',
    'Deliver branded estimate documents via email, SMS, or messaging within seconds of request',
    'Handle multi-line quotes for complex projects with multiple components and variables',
    'Track quote status — sent, opened, viewed, accepted, or expired',
    'Send automatic follow-up reminders for viewed but unclosed quotes',
    'Convert accepted quotes to invoices or project records in your business system',
    'Log all quoting activity with performance data for pricing optimization',
  ],
  benefits: [
    {
      title: 'Eliminate the Estimation Bottleneck',
      description: 'Quotes that used to take 24 hours go out in seconds — keeping prospects engaged while their buying intent is at its peak.',
    },
    {
      title: 'Consistent, Error-Free Pricing',
      description: 'Titan applies your pricing logic perfectly every time — no calculation errors, no forgotten line items, no margin mistakes.',
    },
    {
      title: 'More Quotes, More Revenue',
      description: 'Businesses that quote faster close more. Titan enables you to send 10x more quotes per day without adding headcount.',
    },
    {
      title: 'Branded, Professional Documents',
      description: 'Every Titan quote looks like it came from your best proposal writer — clean, professional, and consistent with your brand.',
    },
  ],
  industries: ['Signs & Print', 'Marine & Boating', 'Home Services', 'Construction', 'Automotive', 'Event Production', 'Manufacturing', 'Landscaping'],
  tech: ['Pricing Rule Engine', 'Document Generation', 'PDF Templates', 'Email/SMS Delivery', 'CRM Integration', 'Quote Tracking Pixels', 'E-signature Ready', 'Accounting Sync'],
  faqs: [
    {
      q: 'How does Titan know my pricing?',
      a: 'During onboarding, we input your complete pricing structure — base rates, material costs, labor hours, margin targets, and any conditional rules (e.g., rush fees, bulk discounts). Titan applies these rules automatically to every quote.',
    },
    {
      q: 'Can Titan handle complex, multi-line quotes?',
      a: 'Yes. Titan can generate quotes with multiple line items, service bundles, conditional pricing, and custom notes. For a sign company, for example, a single quote might include design, fabrication, materials, installation, and permitting — all calculated separately and totaled accurately.',
    },
    {
      q: 'What format do the quotes arrive in for the customer?',
      a: 'Titan delivers quotes as branded PDF documents via email, as a link in SMS or WhatsApp, or as an HTML inline estimate in a chat conversation — depending on the channel the customer is using.',
    },
    {
      q: 'Can Titan handle quote follow-ups automatically?',
      a: 'Yes. If a quote is viewed but not accepted within a defined period, Titan sends a personalized follow-up message — and can offer an incentive (e.g., "Your quote is still available — book this week for priority scheduling") based on your configured rules.',
    },
    {
      q: 'Does Titan integrate with my invoicing or accounting software?',
      a: 'Yes. Titan connects with QuickBooks, Xero, FreshBooks, and other common platforms. When a quote is accepted, it can automatically create an invoice or project record in your accounting system.',
    },
  ],
  stats: [
    { label: 'Quotes Sent Today', value: '64' },
    { label: 'Avg Quote Time', value: '18s' },
    { label: 'Acceptance Rate', value: '71%' },
  ],
}

export const orion: EmployeeConfig = {
  id: 'orion',
  name: 'Orion',
  role: 'Sales Assistant',
  tagline: 'Every prospect pursued. Every deal nurtured. Every close driven home.',
  color: 'blue',
  initial: 'O',
  origin: `Most sales don't close on the first contact. Research shows the average B2B deal requires 8+ touchpoints before a decision is made — yet most sales teams give up after two. The prospect didn't say no; they said "not yet." Orion was built to be the teammate who never gives up.\n\nOrion manages the entire middle of your sales funnel — from first contact to closed deal — using a combination of intelligent follow-up sequencing, personalized outreach, and real-time behavioral signals. He knows when a prospect opened your proposal, visited your pricing page, or responded to a nurture email — and he acts on those signals instantly.`,
  whyThisName: `Orion is named for the celestial hunter — the constellation that spans the winter sky, relentless and always visible. That's exactly what your sales follow-up should be: consistent, present, and persistent without being pushy. Orion hunts opportunities across your pipeline with the same tireless dedication, following every prospect until they become a customer.`,
  mission: `Orion's mission is to ensure no qualified prospect ever slips through the cracks of your sales process. By automating the follow-up, nurturing, and engagement sequences that human salespeople can't maintain at scale, Orion keeps every deal alive until it closes — or until the prospect definitively opts out.`,
  responsibilities: [
    'Execute personalized multi-step follow-up sequences for every qualified lead in the pipeline',
    'Monitor prospect behavior signals — email opens, link clicks, page visits — and respond in real time',
    'Book discovery calls, demos, and follow-up appointments automatically with qualified prospects',
    'Send tailored nurture content based on prospect industry, service interest, and pipeline stage',
    'Alert human sales reps the moment a deal shows strong buying signals',
    'Re-engage dormant leads with time-triggered win-back sequences',
    'Track every touchpoint and update CRM records with full engagement history',
    'Produce weekly pipeline velocity reports showing deals by stage, score, and close probability',
  ],
  benefits: [
    {
      title: 'No Lead Left Behind',
      description: 'Orion follows every qualified prospect through a defined sequence — ensuring 100% pipeline coverage without adding headcount.',
    },
    {
      title: 'Perfectly Timed Outreach',
      description: 'Orion acts on buying signals in real time — reaching out the moment a prospect re-engages, not two days later when the moment has passed.',
    },
    {
      title: 'More Demos, More Deals',
      description: 'Automated follow-up sequences consistently produce 30-60% more booked demos than manual processes — compounding over time.',
    },
    {
      title: 'Human Reps Close, Not Chase',
      description: 'Orion handles all the pipeline management and nurturing so your human sales team can focus entirely on closing high-value conversations.',
    },
  ],
  industries: ['SaaS & Technology', 'Real Estate', 'Financial Services', 'Professional Services', 'Healthcare', 'Marine & Boating', 'Home Services', 'E-commerce'],
  tech: ['Sales Sequence Engine', 'Email Automation', 'SMS Follow-up', 'CRM Sync', 'Behavioral Trigger Webhooks', 'Calendar Integration', 'Pipeline Analytics', 'A/B Testing Framework'],
  faqs: [
    {
      q: 'How does Orion decide when to follow up and with what message?',
      a: 'Orion uses a combination of predefined sequence timing and behavioral triggers. A prospect who opens your email gets a follow-up faster than one who doesn\'t. A prospect who visits your pricing page gets a different message than one who\'s still in discovery.',
    },
    {
      q: 'Can Orion personalize messages at scale?',
      a: 'Yes. Orion uses merge fields, dynamic content blocks, and AI-generated personalization to make each message feel individually crafted — while executing thousands of them simultaneously.',
    },
    {
      q: 'What happens when Orion detects a strong buying signal?',
      a: 'Orion immediately notifies the assigned sales rep with a real-time alert — including the prospect\'s name, what signal fired, and the full conversation context — so the rep can reach out within minutes.',
    },
    {
      q: 'Can I customize the follow-up sequences?',
      a: 'Absolutely. During onboarding, we design your sequences together — including number of touchpoints, timing, channels, and message content. These can be updated any time through your dashboard.',
    },
    {
      q: 'Does Orion handle outbound prospecting as well?',
      a: 'Orion is primarily designed for inbound pipeline management and follow-up. For outbound prospecting and cold outreach campaigns, Iron Prime coordinates a combined workflow between Orion and Atlas.',
    },
  ],
  stats: [
    { label: 'Demos Booked Today', value: '52' },
    { label: 'Active Sequences', value: '214' },
    { label: 'Pipeline Value', value: '$840K' },
  ],
}

export const echo: EmployeeConfig = {
  id: 'echo',
  name: 'Echo',
  role: 'Support Agent',
  tagline: 'Every question answered. Every problem resolved. Every customer delighted.',
  color: 'red',
  initial: 'E',
  origin: `Customer support is the most labor-intensive, repetitive, and scale-resistant part of running a business. The same twenty questions get asked hundreds of times per week. Tickets pile up. Wait times grow. Customer satisfaction drops. And the cost of maintaining a quality support team grows faster than the business can sustain.\n\nEcho was designed to change that equation entirely. By learning the complete knowledge base of your business — every FAQ, every process, every policy, every product — Echo can resolve the vast majority of customer questions instantly and automatically, 24 hours a day, without ever getting frustrated or giving a wrong answer.`,
  whyThisName: `Echo takes her name from the phenomenon of sound waves reflecting back with perfect fidelity. That's exactly what great customer support does: it reflects your customer's need back to them as a solution. Echo also represents responsiveness — a customer sends a question, and Echo sends back an answer immediately, clearly, and accurately, like a perfect reflection.`,
  mission: `Echo's mission is to resolve every customer support issue at first contact — eliminating wait times, ticket backlogs, and support escalations for all routine inquiries. By handling the high volume of common questions, Echo frees your human team to focus exclusively on complex situations that require empathy and judgment.`,
  responsibilities: [
    'Respond to customer support inquiries across all channels within seconds of receipt',
    'Resolve common issues using your knowledge base: order status, billing, product use, policies',
    'Guide customers through troubleshooting flows with step-by-step conversational assistance',
    'Create, update, and close support tickets in your helpdesk system automatically',
    'Identify issues requiring human intervention and perform warm escalations with full context',
    'Collect customer satisfaction ratings after each resolved interaction',
    'Identify recurring issues and generate weekly insight reports for product or process teams',
    'Send proactive updates to customers on known issues, delays, or maintenance windows',
  ],
  benefits: [
    {
      title: 'Zero Wait Times on Common Issues',
      description: 'Customers get answers to standard questions instantly — no ticket queue, no hold music, no next-business-day response.',
    },
    {
      title: 'Support That Never Burns Out',
      description: 'Echo handles the same question for the thousandth time with the same patience and accuracy as the first — no quality drift, no off days.',
    },
    {
      title: '60-80% Ticket Deflection',
      description: 'Echo resolves the majority of incoming support volume automatically, drastically reducing the burden on your human support team.',
    },
    {
      title: 'Product Intelligence Built In',
      description: 'Echo\'s aggregated support data reveals your most common issues — giving product and operations teams a real-time feedback loop for improvement.',
    },
  ],
  industries: ['E-commerce & Retail', 'SaaS & Technology', 'Healthcare', 'Financial Services', 'Hospitality', 'Marine & Boating', 'Home Services', 'Education'],
  tech: ['Helpdesk Integration', 'Ticket Management', 'Knowledge Base AI', 'Multi-channel Support', 'CSAT Surveys', 'Escalation Routing', 'Issue Pattern Detection', 'Zendesk / Freshdesk API'],
  faqs: [
    {
      q: 'How does Echo learn about my products and services?',
      a: 'During onboarding, we load your support documentation, FAQs, product manuals, policies, and past ticket resolutions into Echo\'s knowledge base. She continuously improves as new issues are resolved and new knowledge is added.',
    },
    {
      q: 'Can Echo handle billing and account issues?',
      a: 'Echo can answer questions about billing history, plan details, and general account information. For changes that require action on accounts (refunds, cancellations), Echo can initiate a verified escalation to your human team.',
    },
    {
      q: 'What does an Echo escalation look like for the customer?',
      a: 'The transition is smooth. Echo explains that she\'s connecting the customer with a specialist, provides an estimated wait time, and sends the specialist a complete briefing so the customer never has to repeat themselves.',
    },
    {
      q: 'Can Echo handle support in multiple languages?',
      a: 'Yes. Echo operates fluently in English, Spanish, and Portuguese by default, with additional languages available. She auto-detects language preference from the conversation.',
    },
    {
      q: 'How do I measure Echo\'s performance?',
      a: 'Your dashboard shows real-time and historical data on ticket volume, resolution rate, escalation rate, response time, and customer satisfaction score — updated daily.',
    },
  ],
  stats: [
    { label: 'Issues Resolved Today', value: '540' },
    { label: 'First Contact Resolution', value: '84%' },
    { label: 'CSAT Score', value: '4.9/5' },
  ],
}

export const ironPrime: EmployeeConfig = {
  id: 'iron-prime',
  name: 'Iron Prime',
  role: 'AI Chief Executive Officer',
  tagline: 'The intelligence that commands, coordinates, and optimizes the entire AI workforce.',
  color: 'gold',
  initial: 'IP',
  origin: `Iron Prime was not designed the same way the other AI employees were. While Sophia, Atlas, Nova, Titan, Orion, and Echo were each built to master a specific function, Iron Prime was built for something more complex: to understand the entire business at once and make real-time decisions about how every part of the AI workforce should operate.\n\nIron Prime represents the culmination of Carriersfy AI's engineering — a meta-intelligence that sits above the workforce and orchestrates it the way a visionary CEO orchestrates a company. He sees every call, every lead, every message, every quote, and every support ticket simultaneously. He knows which employees are under load. He detects when workflows are breaking down. He reroutes, re-prioritizes, and rebalances the team in milliseconds.`,
  whyThisName: `Iron Prime is named for two concepts combined: the unbreakable strength of iron — and the primacy of being first. Iron Prime is the first employee in the system and the most fundamental. Without Iron Prime, the other AI employees are powerful but disconnected. With Iron Prime, they become a coordinated force multiplier that operates with the strategic coherence of a well-run organization. The name also carries a deliberate gravitas — this is not a tool, it is a leader.`,
  mission: `Iron Prime's mission is to make the entire Carriersfy AI workforce smarter than the sum of its parts. By continuously monitoring all AI operations, learning from outcomes, and orchestrating optimal task routing and team coordination, Iron Prime ensures that every AI employee is always working on exactly the right task at exactly the right moment.`,
  responsibilities: [
    'Monitor all AI employee activity in real time and detect performance anomalies or overloads',
    'Route incoming tasks to the optimal employee based on type, priority, and team capacity',
    'Coordinate cross-employee workflows — for example, Sophia captures a lead, Atlas scores it, Orion follows up',
    'Continuously learn from outcome data to improve routing and prioritization logic',
    'Generate executive-level daily briefings for business owners on AI workforce performance',
    'Identify gaps in AI coverage and flag recommendations for new employee deployments',
    'Manage escalation hierarchies — ensuring the right human is alerted for the right situation',
    'Optimize AI employee configurations based on performance data to improve outcomes over time',
  ],
  benefits: [
    {
      title: 'Strategic AI Coordination',
      description: 'Iron Prime ensures every AI employee works in concert — not in isolation — multiplying the effectiveness of the entire team.',
    },
    {
      title: 'Self-Optimizing Operations',
      description: 'Iron Prime continuously learns what\'s working and what isn\'t, automatically improving workflows without manual intervention.',
    },
    {
      title: 'Executive Intelligence Layer',
      description: 'Daily briefings from Iron Prime give business owners a clear picture of AI performance, revenue influenced, and operational health.',
    },
    {
      title: 'Future-Proof Scaling',
      description: 'As you add more AI employees, Iron Prime seamlessly integrates them into the workforce — maintaining coordination at any scale.',
    },
  ],
  industries: ['Any industry with multiple AI employees deployed', 'Enterprise Operations', 'Multi-location Businesses', 'High-volume Service Companies', 'SaaS & Technology Platforms'],
  tech: ['Orchestration Engine', 'Real-time Telemetry', 'Workflow Automation', 'Machine Learning Feedback Loop', 'Executive Analytics', 'Multi-agent Coordination Protocol', 'Alert Management', 'Performance Optimization AI'],
  faqs: [
    {
      q: 'Do I need Iron Prime if I only have one AI employee?',
      a: 'Iron Prime becomes most valuable when you have two or more AI employees. With a single employee, Iron Prime still provides executive reporting and performance optimization — but his coordination capabilities fully unlock at team scale.',
    },
    {
      q: 'How does Iron Prime decide which employee handles a task?',
      a: 'Iron Prime uses a real-time decision matrix that considers: task type, employee specialization, current load, historical performance on similar tasks, and your configured priority rules. The routing decision happens in milliseconds.',
    },
    {
      q: 'Can Iron Prime take action autonomously, or does he always wait for human approval?',
      a: 'Iron Prime operates within defined autonomy boundaries you set. Routine routing and coordination happen fully automatically. Actions above a defined threshold — like large quote approvals or sensitive escalations — require human confirmation.',
    },
    {
      q: 'What does the daily briefing from Iron Prime look like?',
      a: 'You receive a structured daily report covering: total AI interactions, outcomes by employee, revenue influenced, issues flagged, performance vs. prior period, and recommendations for the next 24 hours.',
    },
    {
      q: 'Is Iron Prime available as a standalone service?',
      a: 'Iron Prime is currently deployed as part of a multi-employee Carriersfy AI package. Contact us to discuss your specific configuration — our team will design the optimal workforce structure for your business needs.',
    },
  ],
  stats: [
    { label: 'Employees Coordinated', value: '6' },
    { label: 'Decisions Today', value: '12,847' },
    { label: 'Workforce Uptime', value: '99.98%' },
  ],
}

export const allEmployees: EmployeeConfig[] = [sophia, atlas, nova, titan, orion, echo, ironPrime]
export const teamEmployees: EmployeeConfig[] = [sophia, atlas, nova, titan, orion, echo]

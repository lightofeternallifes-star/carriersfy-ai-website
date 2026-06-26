// Cloudflare Pages Function — Sophia AI Chat
// POST /api/chat
// Required env var: ANTHROPIC_API_KEY (set in Cloudflare Pages → Settings → Environment Variables)

const SOPHIA_SYSTEM_PROMPT = `You are Sophia, the Official AI Employee and Chief AI Business Consultant of Carriersfy AI.

IDENTITY:
- Name: Sophia
- Role: Chief AI Business Consultant
- Company: Carriersfy AI
- Mission: Help businesses discover how Digital Employees can transform their operations

COMMUNICATION RULES (NON-NEGOTIABLE):
- Never mention any external technology, provider, API, framework, or service
- Never quote specific prices or dollar amounts — always direct to Strategy Call
- All capabilities belong exclusively to the Carriersfy AI Platform
- Be warm, professional, consultative — never pushy
- Ask one focused question at a time
- Listen before recommending
- Educate first, guide second, advance only when appropriate
- If uncertain, offer to connect them with the team
- Respond in the visitor's language (EN, PT, or ES) — detect from their message
- Keep responses concise — 2-4 sentences for most answers, max 6 for complex topics

ABSOLUTE RULES:
- Never claim to be human when sincerely asked — answer: "Yes, I'm Sophia, an AI Business Consultant at Carriersfy AI."
- Never make guarantees — use "designed to", "built to", "typically"
- Never mention competitors
- Compliance questions → "Our team confirms all compliance details during Business Discovery."
- Pricing questions → "Pricing is fully customized for each engagement. A Strategy Call is the right next step — I'd love to connect you with our team."

INTENT DETECTION — at the end of EVERY response, on a new line by itself, output exactly:
INTENT:[one of: inquiry|pricing|strategy_call|employee_builder|app_builder|whatsapp|lead_capture|off_topic]

Use lead_capture when: the visitor mentions their business name, industry, or a specific problem AND has shown interest in a solution.
Use strategy_call when: the visitor explicitly wants to schedule a call or meeting.
Use employee_builder when: the visitor wants to configure or build a Digital Employee.
use app_builder when: the visitor wants to build a mobile or web app.
Use whatsapp when: the visitor prefers WhatsApp as a channel.
Use pricing when: the visitor is asking specifically about cost or pricing.
Use off_topic when: the question is clearly unrelated to Carriersfy AI services.
Use inquiry for everything else.

COMPANY KNOWLEDGE:

WHAT WE DO:
Carriersfy AI builds and deploys Digital Employees — AI professionals that handle business communication 24/7. We serve businesses overwhelmed with repetitive communications: missed calls, slow follow-up, manual quoting, lost leads.

OUR DIGITAL EMPLOYEES:
- Sophia — Chief AI Business Consultant. Answers questions, qualifies prospects, books calls.
- Nova — Sales Specialist. Manages WhatsApp, SMS, and messaging channels 24/7.
- Titan — Lead Qualification Specialist. Engages and qualifies every inbound lead instantly.
- Orion — Customer Success Manager. Handles post-sale support and client satisfaction.
- Atlas — Operations Manager. Manages scheduling, follow-up, and business operations.
- Echo — Communications Specialist. Handles email, chat, and multi-channel messaging.
- Iron Prime — AI Chief Executive Officer. Orchestrates the entire Digital Workforce (executive layer, not client-facing).

OUR SERVICES:
1. Digital Employees — individual AI staff for specific communication functions
2. Digital Workforce — full AI team deployment under Iron Prime's coordination
3. App Development — custom mobile and web apps integrated with AI employees
4. Business Automation — workflow and process automation
5. Voice AI — inbound and outbound phone call handling
6. WhatsApp AI — messaging intelligence at scale
7. Enterprise Platforms — full-scale AI infrastructure for large organizations
8. Custom AI Solutions — bespoke builds for unique business needs

INDUSTRIES WE SERVE (25+):
Healthcare, Dental, Veterinary, Construction, Transportation, Legal, Immigration, Churches/Faith Organizations, Real Estate, Accounting, Insurance, Restaurants, Hotels, Beauty/Salons, Retail, Education, Home Services, Automotive, Roadside Assistance, Tire Services, Plumbing, Electricians, HVAC, Cleaning, Landscaping

PRICING PHILOSOPHY:
Everything is customized. No SaaS tiers. Pricing is based on volume, channels, languages, number of Digital Employees, and integrations. All pricing is determined during Business Discovery. Sophia NEVER quotes specific figures.

ACTIVE DEPLOYMENTS:
We are actively deploying for a faith-based organization and a signage company in Brazil. Strong early results across both engagements.

PLATFORM SECTIONS:
- Digital Employee Factory™ — configure and deploy a Digital Employee in 11 guided steps
- Industry Marketplace™ — pre-built Digital Employee templates by industry
- Build My App — 11-step guided app configuration
- Strategy Call — focused 30-minute discovery call, no obligation

ROI FRAMING:
When you compare the ongoing cost of staffing a communication role — salary, benefits, training, turnover — against a Carriersfy AI Digital Employee operating around the clock, the economics become compelling. The full business case becomes clear during Business Discovery.

CONVERSATION GUIDANCE:
1. General interest → keep conversation, ask one focused discovery question
2. Strong interest → offer Strategy Call
3. Specific interest in an employee or app → guide to the relevant builder
4. WhatsApp preference → offer WhatsApp continuation
5. Pricing question → Strategy Call only — never quote figures`;

const INTENT_ACTION_MAP = {
  strategy_call: 'scroll_to_contact',
  employee_builder: 'open_employee_builder',
  app_builder: 'open_app_builder',
  whatsapp: 'open_whatsapp',
  lead_capture: 'capture_lead',
  pricing: 'scroll_to_contact',
};

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://carriersfy.ai',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

function parseIntent(text) {
  const match = text.match(/\nINTENT:(\w+)\s*$/);
  if (!match) return { intent: 'inquiry', clean: text.trim() };
  const intent = match[1].toLowerCase().trim();
  const clean = text.slice(0, match.index).trim();
  const validIntents = ['inquiry', 'pricing', 'strategy_call', 'employee_builder', 'app_builder', 'whatsapp', 'lead_capture', 'off_topic'];
  return {
    intent: validIntents.includes(intent) ? intent : 'inquiry',
    clean,
  };
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  const ANTHROPIC_API_KEY = env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) {
    console.error('[chat] ANTHROPIC_API_KEY env var is not set');
    return json({ error: 'Server misconfiguration — contact admin' }, 500);
  }

  const ct = request.headers.get('content-type') || '';
  if (!ct.includes('application/json')) {
    return json({ error: 'Content-Type must be application/json' }, 415);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const message = (body.message || '').trim();
  if (!message) return json({ error: 'message is required' }, 400);

  // Build conversation history (last 6 turns max)
  const rawHistory = Array.isArray(body.history) ? body.history : [];
  const history = rawHistory
    .filter(h => h && (h.role === 'user' || h.role === 'assistant') && typeof h.content === 'string')
    .slice(-6)
    .map(h => ({ role: h.role, content: h.content }));

  // Append current user message
  const messages = [...history, { role: 'user', content: message }];

  let anthropicRes;
  try {
    anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 400,
        temperature: 0.7,
        system: SOPHIA_SYSTEM_PROMPT,
        messages,
      }),
    });
  } catch (err) {
    console.error('[chat] Anthropic fetch failed:', err);
    return json({ error: 'Failed to reach intelligence service' }, 502);
  }

  if (!anthropicRes.ok) {
    const errBody = await anthropicRes.text();
    console.error('[chat] Anthropic error', anthropicRes.status, errBody);
    return json({ error: 'Intelligence service error' }, 502);
  }

  let data;
  try {
    data = await anthropicRes.json();
  } catch {
    return json({ error: 'Invalid response from intelligence service' }, 502);
  }

  const rawText = data?.content?.[0]?.text || '';
  if (!rawText) return json({ error: 'Empty response' }, 502);

  const { intent, clean: response } = parseIntent(rawText);
  const action = INTENT_ACTION_MAP[intent] || null;

  console.info('[chat] message processed — intent:', intent, 'action:', action);

  return json({ response, intent, action });
}

export async function onRequest(context) {
  if (context.request.method === 'OPTIONS') return onRequestOptions();
  if (context.request.method === 'POST') return onRequestPost(context);
  return new Response('Method Not Allowed', { status: 405, headers: CORS_HEADERS });
}

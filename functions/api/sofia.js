// Secure proxy to Sofia Worker — keeps SOFIA_RUNTIME_API_KEY out of the browser.
// Receives:  { message, sessionId?, language?, contactId?, leadCaptured? }
// Returns:   { response, intent, action, session_id, stage, lead_score, language }

const SOFIA_WORKER_URL = 'https://sofia-runtime.carriersfy-official.workers.dev';

// ConversationStage → UI intent
const STAGE_INTENT = {
  greeting:    'inquiry',
  qualifying:  'lead_qualifying',
  recommending:'lead_qualifying',
  scheduling:  'schedule_call',
  closing:     'whatsapp_handoff',
  recovery:    'inquiry',
};

// ConversationStage → UI action
const STAGE_ACTION = {
  scheduling: 'show_booking',
  closing:    'whatsapp_handoff',
};

const CORS = {
  'Access-Control-Allow-Origin':  'https://carriersfy.ai',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  const apiKey = env.SOFIA_RUNTIME_API_KEY;
  if (!apiKey) {
    console.error('[sofia] SOFIA_RUNTIME_API_KEY not set');
    return json({ error: 'Sofia not configured' }, 503);
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
  if (!message) return json({ error: 'message required' }, 400);

  // Build upstream request — channel 'website' for web chat
  const upstream = {
    message,
    channel: 'website',
    language: body.language || 'en',
  };
  if (body.sessionId)  upstream.session_id  = body.sessionId;
  if (body.contactId)  upstream.contact_id  = body.contactId;

  let sofiaRes;
  try {
    sofiaRes = await fetch(`${SOFIA_WORKER_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify(upstream),
    });
  } catch (err) {
    console.error('[sofia] Worker fetch failed:', err);
    return json({ error: 'Failed to reach Sofia' }, 502);
  }

  if (!sofiaRes.ok) {
    const errText = await sofiaRes.text().catch(() => '');
    console.error('[sofia] Worker error', sofiaRes.status, errText);
    return json({ error: 'Sofia intelligence error' }, 502);
  }

  let data;
  try {
    data = await sofiaRes.json();
  } catch {
    return json({ error: 'Invalid Sofia response' }, 502);
  }

  const stage  = data.stage || 'greeting';
  const intent = STAGE_INTENT[stage] || 'inquiry';
  let   action = STAGE_ACTION[stage] || null;

  // Trigger lead capture UI when lead score is high and not yet captured
  if (!action && data.lead_score >= 60 && !body.leadCaptured) {
    action = 'capture_lead';
  }

  console.info('[sofia] stage:', stage, '| intent:', intent, '| action:', action, '| score:', data.lead_score);

  return json({
    response:   data.response,
    session_id: data.session_id,
    intent,
    action,
    stage,
    lead_score: data.lead_score,
    language:   data.language,
  });
}

export async function onRequest(context) {
  if (context.request.method === 'OPTIONS') return onRequestOptions();
  if (context.request.method === 'POST')    return onRequestPost(context);
  return new Response('Method Not Allowed', { status: 405, headers: CORS });
}

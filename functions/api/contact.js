// Cloudflare Pages Function — handles lead form submissions
// Sends notification emails to juan@carriersfy.ai + hello@carriersfy.ai via Resend
// Required env var: RESEND_API_KEY (set in Cloudflare Pages → Settings → Environment variables)

const NOTIFY_RECIPIENTS = ['juan@carriersfy.ai', 'hello@carriersfy.ai'];
const FROM_ADDRESS = 'Carriersfy AI Leads <leads@carriersfy.ai>';

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildEmailHtml(data) {
  const { name, business, email, phone, industry, message } = data;
  const ts = new Date().toLocaleString('en-US', { timeZone: 'UTC', dateStyle: 'full', timeStyle: 'short' });
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.10);">
    <div style="background:#070B16;padding:24px 28px;display:flex;align-items:center;gap:12px;">
      <span style="font-size:24px;">🚀</span>
      <div>
        <div style="color:#fff;font-size:18px;font-weight:700;">New Lead — Carriersfy AI</div>
        <div style="color:rgba(255,255,255,.55);font-size:13px;margin-top:2px;">Website Contact Form</div>
      </div>
    </div>
    <div style="padding:28px;">
      <table style="width:100%;border-collapse:collapse;font-size:15px;">
        <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888;width:110px;vertical-align:top;">Name</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;color:#111;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888;vertical-align:top;">Business</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#111;">${escapeHtml(business) || '<span style="color:#bbb;">—</span>'}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888;vertical-align:top;">Email</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;"><a href="mailto:${escapeHtml(email)}" style="color:#1FA2FF;text-decoration:none;font-weight:600;">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888;vertical-align:top;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#111;">${escapeHtml(phone) || '<span style="color:#bbb;">—</span>'}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888;vertical-align:top;">Industry</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#111;">${escapeHtml(industry) || '<span style="color:#bbb;">—</span>'}</td></tr>
        <tr><td style="padding:10px 0;color:#888;vertical-align:top;">Message</td><td style="padding:10px 0;color:#111;white-space:pre-wrap;">${escapeHtml(message) || '<span style="color:#bbb;">—</span>'}</td></tr>
      </table>
      <div style="margin-top:24px;">
        <a href="mailto:${escapeHtml(email)}?subject=Re: Your Carriersfy AI inquiry" style="display:inline-block;background:linear-gradient(135deg,#1FA2FF,#FF2E3C);color:#fff;text-decoration:none;padding:12px 22px;border-radius:9px;font-weight:700;font-size:14px;">Reply to ${escapeHtml(name)}</a>
      </div>
    </div>
    <div style="background:#f8f8f8;padding:14px 28px;font-size:12px;color:#aaa;border-top:1px solid #eee;">
      Received ${escapeHtml(ts)} UTC · carriersfy.ai
    </div>
  </div>
</body>
</html>`;
}

function buildEmailText(data) {
  const { name, business, email, phone, industry, message } = data;
  return [
    'NEW LEAD — CARRIERSFY AI',
    '='.repeat(40),
    `Name:     ${name}`,
    `Business: ${business || '—'}`,
    `Email:    ${email}`,
    `Phone:    ${phone || '—'}`,
    `Industry: ${industry || '—'}`,
    `Message:  ${message || '—'}`,
    '',
    `Received: ${new Date().toISOString()}`,
  ].join('\n');
}

export async function onRequestPost(context) {
  const { request, env } = context;

  // CORS / content-type guard
  const ct = request.headers.get('content-type') || '';
  if (!ct.includes('application/json')) {
    return json({ error: 'Content-Type must be application/json' }, 415);
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  // Validate required fields
  const name = (data.name || '').trim();
  const email = (data.email || '').trim();
  if (!name || !email) {
    return json({ error: 'Name and email are required' }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Invalid email address' }, 400);
  }

  const RESEND_API_KEY = env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    console.error('[contact] RESEND_API_KEY env var is not set');
    return json({ error: 'Server misconfiguration — contact admin' }, 500);
  }

  const payload = {
    from: FROM_ADDRESS,
    to: NOTIFY_RECIPIENTS,
    reply_to: email,
    subject: `New Lead: ${name}${data.business ? ' — ' + data.business : ''}`,
    text: buildEmailText(data),
    html: buildEmailHtml(data),
  };

  let resendRes;
  try {
    resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error('[contact] Resend fetch failed:', err);
    return json({ error: 'Failed to reach email service' }, 502);
  }

  if (!resendRes.ok) {
    const body = await resendRes.text();
    console.error('[contact] Resend error', resendRes.status, body);
    return json({ error: 'Email delivery failed' }, 500);
  }

  console.info('[contact] Lead submitted:', name, email);
  return json({ success: true }, 200);
}

// Reject non-POST methods
export async function onRequest(context) {
  if (context.request.method === 'POST') return onRequestPost(context);
  return new Response('Method Not Allowed', { status: 405 });
}

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

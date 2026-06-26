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
  const { name, business, email, phone, industry, message, sophiaPipeline, aiEmployeeBuilder, appBuilder, employeeFactory } = data;
  const pipeline = sophiaPipeline && typeof sophiaPipeline === 'object' ? sophiaPipeline : null;
  const builder = aiEmployeeBuilder && typeof aiEmployeeBuilder === 'object' ? aiEmployeeBuilder : null;
  const app = appBuilder && typeof appBuilder === 'object' ? appBuilder : null;
  const factory = employeeFactory && typeof employeeFactory === 'object' ? employeeFactory : null;
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
      ${pipeline ? `<div style="margin-top:22px;padding:16px;border-radius:12px;background:#f8fbff;border:1px solid #e5eefb;">
        <div style="font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#1C7FD6;margin-bottom:10px;">Powered by Sophia</div>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:6px 0;color:#777;width:120px;">Owner</td><td style="padding:6px 0;color:#111;font-weight:600;">${escapeHtml(pipeline.owner || 'Sophia')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Intent</td><td style="padding:6px 0;color:#111;">${escapeHtml(pipeline.intent || 'Website Contact')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Status</td><td style="padding:6px 0;color:#111;">${escapeHtml(pipeline.status || 'new')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Queue</td><td style="padding:6px 0;color:#111;">${escapeHtml(pipeline.routingQueue || 'carriersfy-ai-inbound-leads')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">CRM</td><td style="padding:6px 0;color:#111;">${escapeHtml(pipeline.crmStatus || 'prepared_not_connected')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">WhatsApp</td><td style="padding:6px 0;color:#111;">${escapeHtml(pipeline.whatsappStatus || 'prepared_not_connected')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Appointment</td><td style="padding:6px 0;color:#111;">${escapeHtml(pipeline.appointmentStatus || 'prepared_not_connected')}</td></tr>
        </table>
      </div>` : ''}
      ${builder ? `<div style="margin-top:22px;padding:16px;border-radius:12px;background:#fff8fb;border:1px solid #f4dce5;">
        <div style="font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#FF2E3C;margin-bottom:10px;">AI Employee Builder Configuration</div>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:6px 0;color:#777;width:160px;">Employee Type</td><td style="padding:6px 0;color:#111;font-weight:600;">${escapeHtml(builder.employeeType || '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Personality</td><td style="padding:6px 0;color:#111;">${escapeHtml(builder.personality || '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Voice</td><td style="padding:6px 0;color:#111;">${escapeHtml(builder.voice || '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Languages</td><td style="padding:6px 0;color:#111;">${escapeHtml(Array.isArray(builder.languages) ? builder.languages.join(', ') : '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Channels</td><td style="padding:6px 0;color:#111;">${escapeHtml(Array.isArray(builder.channels) ? builder.channels.join(', ') : '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Integrations</td><td style="padding:6px 0;color:#111;">${escapeHtml(Array.isArray(builder.integrations) ? builder.integrations.join(', ') : '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Features</td><td style="padding:6px 0;color:#111;">${escapeHtml(Array.isArray(builder.features) ? builder.features.join(', ') : '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Monthly Estimate</td><td style="padding:6px 0;color:#111;">${escapeHtml(builder.estimates && builder.estimates.monthlySubscription || '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Setup Estimate</td><td style="padding:6px 0;color:#111;">${escapeHtml(builder.estimates && builder.estimates.oneTimeSetup || '—')}</td></tr>
        </table>
      </div>` : ''}
      ${app ? `<div style="margin-top:22px;padding:16px;border-radius:12px;background:#f8fbff;border:1px solid #dbeafe;">
        <div style="font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#1C7FD6;margin-bottom:10px;">Build Your App Configuration</div>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:6px 0;color:#777;width:160px;">Project Name</td><td style="padding:6px 0;color:#111;font-weight:600;">${escapeHtml(app.projectName || '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Project Type</td><td style="padding:6px 0;color:#111;">${escapeHtml(app.projectType || '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Target Users</td><td style="padding:6px 0;color:#111;">${escapeHtml(Array.isArray(app.targetUsers) ? app.targetUsers.join(', ') : '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Platforms</td><td style="padding:6px 0;color:#111;">${escapeHtml(Array.isArray(app.platforms) ? app.platforms.join(', ') : '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Features</td><td style="padding:6px 0;color:#111;">${escapeHtml(Array.isArray(app.features) ? app.features.join(', ') : '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Languages</td><td style="padding:6px 0;color:#111;">${escapeHtml(Array.isArray(app.languages) ? app.languages.join(', ') : '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Timeline</td><td style="padding:6px 0;color:#111;">${escapeHtml(app.timeline || '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Complexity</td><td style="padding:6px 0;color:#111;">${escapeHtml(app.complexity || '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Monthly Estimate</td><td style="padding:6px 0;color:#111;">${escapeHtml(app.estimates && app.estimates.monthly || '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Development Estimate</td><td style="padding:6px 0;color:#111;">${escapeHtml(app.estimates && app.estimates.development || '—')}</td></tr>
        </table>
      </div>` : ''}
      ${factory ? `<div style="margin-top:22px;padding:16px;border-radius:12px;background:#f8fbff;border:1px solid #dbeafe;">
        <div style="font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#1C7FD6;margin-bottom:10px;">Digital Employee Factory Configuration</div>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:6px 0;color:#777;width:160px;">Industry</td><td style="padding:6px 0;color:#111;font-weight:600;">${escapeHtml(factory.industry || '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Employee</td><td style="padding:6px 0;color:#111;">${escapeHtml(factory.employee || '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Personality</td><td style="padding:6px 0;color:#111;">${escapeHtml(factory.personality || '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Voice</td><td style="padding:6px 0;color:#111;">${escapeHtml(factory.voice || '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Languages</td><td style="padding:6px 0;color:#111;">${escapeHtml(Array.isArray(factory.languages) ? factory.languages.join(', ') : '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Capabilities</td><td style="padding:6px 0;color:#111;">${escapeHtml(Array.isArray(factory.capabilities) ? factory.capabilities.join(', ') : '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Knowledge</td><td style="padding:6px 0;color:#111;">${escapeHtml(factory.businessKnowledge && Array.isArray(factory.businessKnowledge.selectedTypes) ? factory.businessKnowledge.selectedTypes.join(', ') : '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Website Knowledge</td><td style="padding:6px 0;color:#111;">${escapeHtml(factory.businessKnowledge && factory.businessKnowledge.website || '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Schedule</td><td style="padding:6px 0;color:#111;">${escapeHtml(factory.schedule || '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Appearance</td><td style="padding:6px 0;color:#111;">${escapeHtml(factory.appearance || '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Monthly Platform</td><td style="padding:6px 0;color:#111;">${escapeHtml(factory.estimates && factory.estimates.monthlyPlatform || '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">One-Time Setup</td><td style="padding:6px 0;color:#111;">${escapeHtml(factory.estimates && factory.estimates.oneTimeSetup || '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">Launch Time</td><td style="padding:6px 0;color:#111;">${escapeHtml(factory.estimates && factory.estimates.estimatedLaunchTime || '—')}</td></tr>
        </table>
      </div>` : ''}
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
  const { name, business, email, phone, industry, message, sophiaPipeline, aiEmployeeBuilder, appBuilder, employeeFactory } = data;
  const pipeline = sophiaPipeline && typeof sophiaPipeline === 'object' ? sophiaPipeline : null;
  const builder = aiEmployeeBuilder && typeof aiEmployeeBuilder === 'object' ? aiEmployeeBuilder : null;
  const app = appBuilder && typeof appBuilder === 'object' ? appBuilder : null;
  const factory = employeeFactory && typeof employeeFactory === 'object' ? employeeFactory : null;
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
    'SOPHIA PIPELINE',
    '='.repeat(40),
    `Owner:       ${(pipeline && pipeline.owner) || 'Sophia'}`,
    `Intent:      ${(pipeline && pipeline.intent) || 'Website Contact'}`,
    `Status:      ${(pipeline && pipeline.status) || 'new'}`,
    `Queue:       ${(pipeline && pipeline.routingQueue) || 'carriersfy-ai-inbound-leads'}`,
    `CRM:         ${(pipeline && pipeline.crmStatus) || 'prepared_not_connected'}`,
    `WhatsApp:    ${(pipeline && pipeline.whatsappStatus) || 'prepared_not_connected'}`,
    `Appointment: ${(pipeline && pipeline.appointmentStatus) || 'prepared_not_connected'}`,
    '',
    ...(builder ? [
      'AI EMPLOYEE BUILDER CONFIGURATION',
      '='.repeat(40),
      `Employee Type: ${builder.employeeType || '—'}`,
      `Personality:   ${builder.personality || '—'}`,
      `Voice:         ${builder.voice || '—'}`,
      `Languages:     ${Array.isArray(builder.languages) ? builder.languages.join(', ') : '—'}`,
      `Channels:      ${Array.isArray(builder.channels) ? builder.channels.join(', ') : '—'}`,
      `Integrations:  ${Array.isArray(builder.integrations) ? builder.integrations.join(', ') : '—'}`,
      `Features:      ${Array.isArray(builder.features) ? builder.features.join(', ') : '—'}`,
      `Monthly:       ${builder.estimates && builder.estimates.monthlySubscription || '—'}`,
      `Setup:         ${builder.estimates && builder.estimates.oneTimeSetup || '—'}`,
      ''
    ] : []),
    ...(app ? [
      'BUILD YOUR APP CONFIGURATION',
      '='.repeat(40),
      `Project Name: ${app.projectName || '—'}`,
      `Project Type: ${app.projectType || '—'}`,
      `Target Users: ${Array.isArray(app.targetUsers) ? app.targetUsers.join(', ') : '—'}`,
      `Platforms:    ${Array.isArray(app.platforms) ? app.platforms.join(', ') : '—'}`,
      `Features:     ${Array.isArray(app.features) ? app.features.join(', ') : '—'}`,
      `Languages:    ${Array.isArray(app.languages) ? app.languages.join(', ') : '—'}`,
      `Timeline:     ${app.timeline || '—'}`,
      `Complexity:   ${app.complexity || '—'}`,
      `Monthly:      ${app.estimates && app.estimates.monthly || '—'}`,
      `Development:  ${app.estimates && app.estimates.development || '—'}`,
      ''
    ] : []),
    ...(factory ? [
      'DIGITAL EMPLOYEE FACTORY CONFIGURATION',
      '='.repeat(40),
      `Industry:       ${factory.industry || '—'}`,
      `Employee:       ${factory.employee || '—'}`,
      `Personality:    ${factory.personality || '—'}`,
      `Voice:          ${factory.voice || '—'}`,
      `Languages:      ${Array.isArray(factory.languages) ? factory.languages.join(', ') : '—'}`,
      `Capabilities:   ${Array.isArray(factory.capabilities) ? factory.capabilities.join(', ') : '—'}`,
      `Knowledge:      ${factory.businessKnowledge && Array.isArray(factory.businessKnowledge.selectedTypes) ? factory.businessKnowledge.selectedTypes.join(', ') : '—'}`,
      `Website:        ${factory.businessKnowledge && factory.businessKnowledge.website || '—'}`,
      `Schedule:       ${factory.schedule || '—'}`,
      `Appearance:     ${factory.appearance || '—'}`,
      `Monthly:        ${factory.estimates && factory.estimates.monthlyPlatform || '—'}`,
      `Setup:          ${factory.estimates && factory.estimates.oneTimeSetup || '—'}`,
      `Launch Time:    ${factory.estimates && factory.estimates.estimatedLaunchTime || '—'}`,
      ''
    ] : []),
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

  // Forward to GoHighLevel CRM if webhook is configured
  const GHL_WEBHOOK_URL = env.GHL_WEBHOOK_URL;
  if (GHL_WEBHOOK_URL) {
    const nameParts = name.trim().split(/\s+/);
    const ghlPayload = {
      firstName: nameParts[0] || name,
      lastName: nameParts.slice(1).join(' ') || '',
      name,
      email,
      phone: (data.phone || '').trim(),
      message: (data.message || '').trim(),
      source: 'website-sophia',
      tags: [
        'website-lead',
        'sophia-qualified',
        ...(data.industry ? [data.industry.toLowerCase().replace(/\s+/g, '-')] : []),
      ],
    };
    try {
      await fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ghlPayload),
      });
      console.info('[contact] GHL CRM record created for:', name);
    } catch (ghlErr) {
      console.error('[contact] GHL webhook failed (non-blocking):', ghlErr);
    }
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

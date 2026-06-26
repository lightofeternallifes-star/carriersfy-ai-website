// Cloudflare Pages Function — runtime configuration
// GET /api/config
//
// Returns public runtime configuration from Cloudflare Pages environment variables.
// Set these in the Cloudflare Pages dashboard → Settings → Environment Variables:
//
//   WHATSAPP_PHONE  — digits only, no + or spaces (e.g. "15551234567")
//   BOOKING_URL     — Calendly/Cal.com booking URL
//   VOICE_PHONE     — Public phone number for inbound voice calls (e.g. "+18001234567")
//
// None of these are secrets — they are public-facing contact points.

const CORS = {
  'Access-Control-Allow-Origin': 'https://carriersfy.ai',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function onRequestGet(context) {
  const { env } = context;
  const cfg = {
    whatsappPhone: env.WHATSAPP_PHONE || null,
    bookingUrl: env.BOOKING_URL || null,
    voicePhone: env.VOICE_PHONE || null,
  };
  return new Response(JSON.stringify(cfg), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=60',
      ...CORS,
    },
  });
}

export async function onRequest(context) {
  if (context.request.method === 'OPTIONS') return onRequestOptions();
  if (context.request.method === 'GET') return onRequestGet(context);
  return new Response('Method Not Allowed', { status: 405, headers: CORS });
}

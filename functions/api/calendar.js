// Cloudflare Pages Function — Calendar availability and booking
// GET  /api/calendar → returns available booking URL or GHL time slots
// POST /api/calendar → books appointment via GHL API (when credentials available)
//
// Required env vars for full GHL calendar integration:
//   GHL_API_KEY       — GoHighLevel Private Integration API key
//   GHL_LOCATION_ID   — GoHighLevel Location ID
//   GHL_CALENDAR_ID   — GoHighLevel Calendar ID
//   BOOKING_URL       — Calendly/Cal.com fallback booking URL (always recommended as backup)

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://carriersfy.ai',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

function ghlHeaders(apiKey) {
  return {
    'Authorization': `Bearer ${apiKey}`,
    'Version': '2021-07-28',
    'Content-Type': 'application/json',
  };
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestGet(context) {
  const { env } = context;
  const bookingUrl = env.BOOKING_URL || null;
  const calendarId = env.GHL_CALENDAR_ID || null;
  const apiKey = env.GHL_API_KEY || null;

  // When GHL calendar credentials are set: fetch real available slots
  if (calendarId && apiKey) {
    try {
      const now = new Date();
      const end = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      const startDate = now.toISOString().split('T')[0];
      const endDate = end.toISOString().split('T')[0];

      const slotsRes = await fetch(
        `https://services.leadconnectorhq.com/calendars/${calendarId}/free-slots?startDate=${startDate}&endDate=${endDate}&timezone=America/New_York`,
        { headers: ghlHeaders(apiKey) }
      );

      if (slotsRes.ok) {
        const slotsData = await slotsRes.json();
        return json({
          available: true,
          mode: 'slots',
          bookingUrl,
          slots: slotsData,
        });
      }

      const errText = await slotsRes.text();
      console.error('[calendar] GHL slots error:', slotsRes.status, errText);
    } catch (err) {
      console.error('[calendar] GHL slots fetch failed:', err);
    }
  }

  // Fallback: return booking URL only
  return json({
    available: !!bookingUrl,
    mode: 'booking_url',
    bookingUrl,
    slots: null,
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

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

  const apiKey = env.GHL_API_KEY || null;
  const calendarId = env.GHL_CALENDAR_ID || null;
  const locationId = env.GHL_LOCATION_ID || null;
  const bookingUrl = env.BOOKING_URL || null;

  // When full GHL credentials + required booking data are available
  if (apiKey && calendarId && locationId && body.startTime && body.contactId) {
    try {
      const apptPayload = {
        calendarId,
        locationId,
        contactId: body.contactId,
        startTime: body.startTime,
        endTime: body.endTime || body.startTime,
        title: body.title || 'Strategy Call — Carriersfy AI',
        meetingLocationType: 'custom',
        address: 'Video Call',
        notes: body.notes || '',
        appointmentStatus: 'confirmed',
      };

      const apptRes = await fetch(
        'https://services.leadconnectorhq.com/calendars/events/appointments',
        {
          method: 'POST',
          headers: ghlHeaders(apiKey),
          body: JSON.stringify(apptPayload),
        }
      );

      if (apptRes.ok) {
        const apptData = await apptRes.json();
        console.info('[calendar] Appointment booked:', apptData?.id);
        return json({ success: true, appointment: apptData, bookingUrl });
      }

      const errText = await apptRes.text();
      console.error('[calendar] GHL booking error:', apptRes.status, errText);
    } catch (err) {
      console.error('[calendar] GHL booking failed:', err);
    }
  }

  // Fallback: return booking URL for manual scheduling
  return json({
    success: false,
    redirect: bookingUrl,
    message: 'Please use the booking link to schedule your call.',
  });
}

export async function onRequest(context) {
  const method = context.request.method;
  if (method === 'OPTIONS') return onRequestOptions();
  if (method === 'GET') return onRequestGet(context);
  if (method === 'POST') return onRequestPost(context);
  return new Response('Method Not Allowed', { status: 405, headers: CORS_HEADERS });
}

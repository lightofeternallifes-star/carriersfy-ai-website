// ElevenLabs TTS proxy — keeps ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID out of the browser.
// Request:   POST { text: string, lang?: 'en'|'es'|'pt' }
// Response:  audio/mpeg stream on success | 503 if not configured | 400 on bad input

const ELEVENLABS_BASE = 'https://api.elevenlabs.io/v1/text-to-speech';

// eleven_turbo_v2_5 supports EN/ES/PT with low latency
const MODEL = 'eleven_turbo_v2_5';

export async function onRequestOptions() {
  return new Response(null, { status: 204 });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  const apiKey  = env.ELEVENLABS_API_KEY;
  const voiceId = env.ELEVENLABS_VOICE_ID;

  // Degrade gracefully — caller falls back to browser speech synthesis
  if (!apiKey || !voiceId) {
    return new Response(null, { status: 503 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(null, { status: 400 });
  }

  const text = (body.text || '').trim();
  if (!text)          return new Response(null, { status: 400 });
  if (text.length > 4500) return new Response(null, { status: 400 });

  const ttsRes = await fetch(`${ELEVENLABS_BASE}/${voiceId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key':   apiKey,
    },
    body: JSON.stringify({
      text,
      model_id: MODEL,
      voice_settings: {
        stability:        0.50,
        similarity_boost: 0.80,
        style:            0.20,
        use_speaker_boost: true,
      },
    }),
  }).catch(() => null);

  if (!ttsRes || !ttsRes.ok) {
    return new Response(null, { status: 503 });
  }

  return new Response(ttsRes.body, {
    headers: {
      'Content-Type':  'audio/mpeg',
      'Cache-Control': 'no-cache, no-store',
    },
  });
}

export async function onRequest(context) {
  if (context.request.method === 'OPTIONS') return onRequestOptions();
  if (context.request.method === 'POST')    return onRequestPost(context);
  return new Response('Method Not Allowed', { status: 405 });
}

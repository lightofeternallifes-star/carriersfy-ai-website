// Sophia Voice — Premium voice conversation with ElevenLabs TTS
// TTS priority: /api/tts (ElevenLabs) → browser SpeechSynthesis (female preference)
// STT: Web Speech API with live interim transcript
// Flow: open → greet → auto-listen → user speaks → call Sofia → play TTS → auto-listen (loop)

(function () {
  'use strict';

  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var SS = window.speechSynthesis;
  var STT_SUPPORTED = !!SR;
  var SUPPORTED     = !!(SR && SS);

  // Voice session state (separate from chat session)
  var VOICE_SESSION_KEY = 'cf_sophia_voice_session';

  var state = {
    open:         false,
    listening:    false,
    speaking:     false,
    history:      [],
    sessionId:    null,
    lang:         detectLang(),
    recognition:  null,
    currentAudio: null,
    initialized:  false,
    useElevenLabs: true,   // try ElevenLabs first, flip to false on first failure
  };

  // Unlocked once from a user gesture in openModal(); subsequent async play() calls work without gesture.
  var audioCtx = null;

  var GREETINGS = {
    en: "Hi! I'm Sophia, Carriersfy AI's AI Business Consultant. Just start talking — I'm listening.",
    es: "¡Hola! Soy Sophia, Consultora de IA de Carriersfy AI. Empieza a hablar — te escucho.",
    pt: "Olá! Sou Sophia, Consultora de IA da Carriersfy AI. Pode falar — estou ouvindo.",
  };

  var LABELS = {
    en: {
      ready: 'Tap to Speak', listening: 'Listening…', speaking: 'Sophia speaking…',
      thinking: 'Thinking…', stop: 'Stop', end: 'End',
      title: 'Talk with Sophia', status_ready: 'Ready',
      error_no_speech: "Didn't catch that — tap to try again.",
      notSupported: 'Voice requires <strong>Chrome</strong> or <strong>Safari 15+</strong>. Try the <a data-switch-to-chat>chat</a> instead.',
    },
    es: {
      ready: 'Toca para Hablar', listening: 'Escuchando…', speaking: 'Sophia hablando…',
      thinking: 'Pensando…', stop: 'Detener', end: 'Cerrar',
      title: 'Hablar con Sophia', status_ready: 'Listo',
      error_no_speech: 'No entendí — toca para intentar de nuevo.',
      notSupported: 'La voz requiere <strong>Chrome</strong> o <strong>Safari 15+</strong>. Usa el <a data-switch-to-chat>chat</a>.',
    },
    pt: {
      ready: 'Toque para Falar', listening: 'Ouvindo…', speaking: 'Sophia falando…',
      thinking: 'Pensando…', stop: 'Parar', end: 'Fechar',
      title: 'Conversar com Sophia', status_ready: 'Pronto',
      error_no_speech: 'Não entendi — toque para tentar novamente.',
      notSupported: 'Voz requer <strong>Chrome</strong> ou <strong>Safari 15+</strong>. Use o <a data-switch-to-chat>chat</a>.',
    },
  };

  function detectLang() {
    var docLang = (document.documentElement.lang || '').toLowerCase();
    if (docLang === 'es' || docLang === 'pt' || docLang === 'en') return docLang;
    try {
      var saved = localStorage.getItem('cf_lang');
      if (saved === 'es' || saved === 'pt' || saved === 'en') return saved;
    } catch (_) {}
    var nav = (navigator.language || 'en').toLowerCase();
    if (nav.startsWith('pt')) return 'pt';
    if (nav.startsWith('es')) return 'es';
    return 'en';
  }

  function langCode() { return { pt: 'pt-BR', es: 'es-US', en: 'en-US' }[state.lang] || 'en-US'; }
  function L(key) { return (LABELS[state.lang] || LABELS.en)[key] || key; }
  function $(id) { return document.getElementById(id); }

  // Load / save voice session ID for conversation continuity
  function loadVoiceSession() {
    try {
      var raw = localStorage.getItem(VOICE_SESSION_KEY);
      if (!raw) return null;
      var s = JSON.parse(raw);
      if (!s || Date.now() > s.expiresAt) { localStorage.removeItem(VOICE_SESSION_KEY); return null; }
      return s.sessionId || null;
    } catch (_) { return null; }
  }

  function saveVoiceSession(sessionId) {
    try {
      localStorage.setItem(VOICE_SESSION_KEY, JSON.stringify({
        sessionId: sessionId,
        expiresAt: Date.now() + 8 * 60 * 60 * 1000,  // 8h TTL for voice sessions
      }));
    } catch (_) {}
  }

  // ─── Styles ───────────────────────────────────────────────────────────────
  function injectStyles() {
    if ($('cf-voice-styles')) return;
    var s = document.createElement('style');
    s.id = 'cf-voice-styles';
    s.textContent = [
      // Floating trigger button
      '#cf-voice-btn{position:fixed;right:clamp(18px,3vw,34px);bottom:calc(clamp(18px,3vw,34px) + 66px);z-index:75;width:50px;height:50px;border-radius:50%;background:rgba(7,11,22,.94);border:1.5px solid rgba(31,162,255,.4);color:#fff;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(31,162,255,.18),0 2px 8px rgba(0,0,0,.5);transition:all .2s ease;padding:0;}',
      '#cf-voice-btn:hover{background:rgba(31,162,255,.18);border-color:#1FA2FF;transform:scale(1.09);}',
      '@media(max-width:760px){#cf-voice-btn{left:calc(50% + 6px);right:auto;bottom:86px;}}',

      // Backdrop
      '#cf-voice-modal{display:none;position:fixed;inset:0;z-index:130;align-items:center;justify-content:center;padding:clamp(16px,4vw,28px);background:rgba(5,8,18,.9);backdrop-filter:blur(28px);}',

      // Dialog card
      '#cf-voice-dialog{width:min(420px,100%);border-radius:28px;background:linear-gradient(160deg,rgba(12,17,34,.98) 0%,rgba(7,10,22,.98) 100%);border:1px solid rgba(255,255,255,.1);box-shadow:0 40px 100px rgba(0,0,0,.8),0 0 0 1px rgba(31,162,255,.06);padding:clamp(28px,5vw,42px) clamp(24px,5vw,38px);display:flex;flex-direction:column;align-items:center;gap:20px;animation:cfvo-in .24s cubic-bezier(.34,1.56,.64,1);}',
      '@keyframes cfvo-in{from{opacity:0;transform:scale(.92) translateY(16px);}to{opacity:1;transform:none;}}',

      // Avatar with animated ring
      '#cf-voice-avatar{position:relative;width:92px;height:92px;border-radius:50%;background:linear-gradient(135deg,#1FA2FF,#FF2E3C);display:flex;align-items:center;justify-content:center;font-family:"Space Grotesk",sans-serif;font-weight:700;font-size:36px;color:#070B16;flex-shrink:0;}',
      '#cf-voice-ring{position:absolute;inset:-10px;border-radius:50%;border:2px solid rgba(31,162,255,.4);animation:cf-vrp 2.4s ease-in-out infinite;}',
      '@keyframes cf-vrp{0%,100%{transform:scale(1);opacity:.5;}50%{transform:scale(1.14);opacity:1;}}',
      '#cf-voice-ring.listening{border-color:#35D6A0;animation:cf-vlp .7s ease-in-out infinite;}',
      '@keyframes cf-vlp{0%,100%{transform:scale(1);opacity:.8;}50%{transform:scale(1.22);opacity:1;}}',
      '#cf-voice-ring.speaking{border-color:#1FA2FF;animation:cf-vsp 1.0s ease-in-out infinite;}',
      '@keyframes cf-vsp{0%,100%{transform:scale(1.0);}50%{transform:scale(1.16);}}',

      // Second outer ring (speaking pulse)
      '#cf-voice-ring2{position:absolute;inset:-22px;border-radius:50%;border:1px solid rgba(31,162,255,.0);pointer-events:none;}',
      '#cf-voice-ring2.speaking{border-color:rgba(31,162,255,.18);animation:cf-vsp2 1.0s ease-in-out infinite .12s;}',
      '@keyframes cf-vsp2{0%,100%{transform:scale(1.0);opacity:0;}50%{transform:scale(1.1);opacity:1;}}',

      // Identity
      '#cf-voice-name{text-align:center;}',
      '#cf-voice-name h3{font-family:"Space Grotesk",Manrope,sans-serif;font-weight:700;font-size:21px;color:#F4F6FB;margin:0 0 5px;}',
      '#cf-voice-statusbar{font-size:11.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#35D6A0;display:flex;align-items:center;gap:6px;justify-content:center;}',
      '#cf-voice-statusbar .vdot{width:6px;height:6px;border-radius:50%;background:#35D6A0;box-shadow:0 0 7px #35D6A0;}',

      // Transcript
      '#cf-voice-transcript{font-size:14px;line-height:1.65;color:rgba(244,246,251,.65);min-height:48px;max-height:120px;overflow-y:auto;width:100%;text-align:center;font-style:italic;padding:0 8px;}',
      '#cf-voice-transcript.interim{color:rgba(244,246,251,.4);}',

      // Controls
      '#cf-voice-controls{display:flex;gap:11px;width:100%;}',
      '#cf-voice-speak{flex:1;padding:13px 16px;border-radius:16px;background:linear-gradient(135deg,rgba(31,162,255,.12),rgba(255,46,60,.08));border:1px solid rgba(31,162,255,.28);color:#F4F6FB;font-family:Manrope,sans-serif;font-size:14.5px;font-weight:700;cursor:pointer;transition:all .2s;text-align:center;}',
      '#cf-voice-speak:hover:not(:disabled){background:linear-gradient(135deg,rgba(31,162,255,.22),rgba(255,46,60,.14));border-color:rgba(31,162,255,.5);}',
      '#cf-voice-speak.active{background:linear-gradient(135deg,rgba(53,214,160,.16),rgba(53,214,160,.07));border-color:#35D6A0;color:#35D6A0;}',
      '#cf-voice-speak:disabled{opacity:.38;cursor:default;}',
      '#cf-voice-close{width:48px;height:48px;min-width:48px;border-radius:14px;background:rgba(255,46,60,.06);border:1px solid rgba(255,46,60,.18);color:#FF2E3C;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;}',
      '#cf-voice-close:hover{background:rgba(255,46,60,.16);}',

      // Fallback
      '#cf-voice-fallback{text-align:center;font-size:13.5px;line-height:1.7;color:rgba(244,246,251,.55);padding:8px 4px;}',
      '#cf-voice-fallback a{color:#1FA2FF;text-decoration:none;cursor:pointer;}',
      '#cf-voice-fallback a:hover{text-decoration:underline;}',

      // Phone link
      '#cf-voice-phone{margin-top:2px;text-align:center;font-size:12.5px;min-height:18px;}',
      '#cf-voice-phone a{color:#35D6A0;text-decoration:none;font-weight:600;}',
      '#cf-voice-phone a:hover{text-decoration:underline;}',
    ].join('');
    document.head.appendChild(s);
  }

  // ─── UI Build ─────────────────────────────────────────────────────────────
  function buildUI() {
    // Floating trigger
    var btn = document.createElement('button');
    btn.id = 'cf-voice-btn';
    btn.setAttribute('aria-label', L('title'));
    btn.title = L('title');
    btn.innerHTML = '🎙';
    btn.addEventListener('click', openModal);
    document.body.appendChild(btn);

    // Modal
    var modal = document.createElement('div');
    modal.id = 'cf-voice-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', L('title'));
    modal.innerHTML = [
      '<div id="cf-voice-dialog">',
      '  <div id="cf-voice-avatar">S<div id="cf-voice-ring"></div><div id="cf-voice-ring2"></div></div>',
      '  <div id="cf-voice-name">',
      '    <h3>Sophia</h3>',
      '    <div id="cf-voice-statusbar"><div class="vdot"></div><span id="cf-voice-status-txt">' + (SUPPORTED ? L('status_ready') : 'Voice') + '</span></div>',
      '  </div>',
      SUPPORTED
        ? [
            '<div id="cf-voice-transcript"></div>',
            '<div id="cf-voice-controls">',
            '  <button id="cf-voice-speak">🎙 ' + L('ready') + '</button>',
            '  <button id="cf-voice-close" aria-label="' + L('end') + '">✕</button>',
            '</div>',
          ].join('')
        : '<div id="cf-voice-fallback">' + L('notSupported') + '</div>',
      '  <div id="cf-voice-phone"></div>',
      '</div>',
    ].join('');
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    document.body.appendChild(modal);

    if (SUPPORTED) {
      $('cf-voice-speak').addEventListener('click', function () {
        if (state.listening)      stopListening();
        else if (!state.speaking) startListening();
      });
      $('cf-voice-close').addEventListener('click', closeModal);
    } else {
      var fb = $('cf-voice-fallback');
      if (fb) {
        fb.addEventListener('click', function (e) {
          if (e.target && e.target.hasAttribute('data-switch-to-chat')) {
            e.preventDefault();
            closeModal();
            var launcher = $('cf-sophia-launcher');
            if (launcher) launcher.click();
          }
        });
      }
    }
  }

  // ─── Status Display ───────────────────────────────────────────────────────
  function setStatus(mode) {
    var txt   = $('cf-voice-status-txt');
    var ring  = $('cf-voice-ring');
    var ring2 = $('cf-voice-ring2');
    var speak = $('cf-voice-speak');
    var map   = { listening: L('listening'), speaking: L('speaking'), thinking: L('thinking'), ready: L('status_ready') };
    if (txt)  txt.textContent = map[mode] || mode;
    if (ring)  ring.className  = mode === 'listening' ? 'listening' : mode === 'speaking' ? 'speaking' : '';
    if (ring2) ring2.className = mode === 'speaking' ? 'speaking' : '';
    if (speak) {
      if (mode === 'listening') {
        speak.textContent = '⏹ ' + L('stop');
        speak.className = 'active';
        speak.disabled = false;
      } else if (mode === 'speaking' || mode === 'thinking') {
        speak.textContent = '⏳ ' + (map[mode] || mode);
        speak.className = '';
        speak.disabled = true;
      } else {
        speak.textContent = '🎙 ' + L('ready');
        speak.className = '';
        speak.disabled = false;
      }
    }
  }

  function setTranscript(text, interim) {
    var el = $('cf-voice-transcript');
    if (!el) return;
    el.textContent = text;
    el.className = interim ? 'interim' : '';
  }

  // ─── TTS — ElevenLabs first, browser fallback ─────────────────────────────
  var FEMALE_VOICES = ['Samantha', 'Victoria', 'Karen', 'Moira', 'Ava', 'Aria',
                       'Google US English Female', 'Google UK English Female', 'Alex'];

  function stopAudio() {
    if (state.currentAudio) {
      try {
        if (typeof state.currentAudio.stop === 'function') {
          state.currentAudio.onended = null;  // prevent onended firing after explicit stop
          state.currentAudio.stop();
        } else {
          state.currentAudio.pause(); state.currentAudio.src = '';
        }
      } catch (_) {}
      if (state.currentAudio && state.currentAudio._objectUrl) { URL.revokeObjectURL(state.currentAudio._objectUrl); }
      state.currentAudio = null;
    }
    if (SS) SS.cancel();
  }

  function browserSpeak(text, onDone) {
    if (!SS) { if (onDone) onDone(); return; }
    SS.cancel();
    state.speaking = true;
    setStatus('speaking');
    setTranscript(text, false);

    var utt = new SpeechSynthesisUtterance(text);
    utt.lang  = langCode();
    utt.rate  = 1.0;
    utt.pitch = 1.05;

    var voices  = SS.getVoices();
    // Prefer female voice for current language
    var preferred = voices.find(function (v) {
      var matchLang = v.lang.toLowerCase().startsWith(state.lang === 'pt' ? 'pt' : state.lang === 'es' ? 'es' : 'en');
      var isFemale  = FEMALE_VOICES.some(function (n) { return v.name.includes(n); });
      return matchLang && isFemale;
    }) || voices.find(function (v) {
      return v.lang.toLowerCase().startsWith(state.lang === 'pt' ? 'pt' : state.lang === 'es' ? 'es' : 'en');
    });
    if (preferred) utt.voice = preferred;

    // finish() is idempotent — fires exactly once whether via onend, onerror, or the safety timer.
    // The safety timer recovers the state machine when SS.speak() silently fails (Safari without gesture).
    var done = false;
    function finish() {
      if (done) return; done = true;
      clearTimeout(safetyTimer);
      state.speaking = false;
      if (state.open) { setStatus('ready'); if (onDone) onDone(); }
    }
    var safetyTimer = setTimeout(finish, Math.max(2000, Math.min(text.length * 60, 15000)));
    utt.onend   = finish;
    utt.onerror = finish;
    SS.speak(utt);
  }

  function speak(text, onDone) {
    stopAudio();
    state.speaking = true;
    setStatus('speaking');
    setTranscript(text, false);

    if (!state.useElevenLabs) { browserSpeak(text, onDone); return; }

    fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text, lang: state.lang }),
    })
      .then(function (res) {
        if (!res.ok) throw new Error('tts unavailable');
        return res.arrayBuffer();
      })
      .then(function (buffer) {
        // audioCtx was unlocked in openModal() within the user gesture — no autoplay restriction.
        // arrayBuffer avoids blob: URL entirely — no CSP media-src issue, no onerror+catch race.
        if (!audioCtx) throw new Error('no audio context');
        return new Promise(function (resolve, reject) {
          audioCtx.decodeAudioData(buffer, resolve, reject);
        });
      })
      .then(function (decoded) {
        var source = audioCtx.createBufferSource();
        source.buffer = decoded;
        source.connect(audioCtx.destination);
        state.currentAudio = source;
        source.onended = function () {
          state.currentAudio = null;
          state.speaking = false;
          if (state.open) { setStatus('ready'); if (onDone) onDone(); }
        };
        source.start(0);
      })
      .catch(function () {
        // ElevenLabs unavailable, audio context missing, or decode failed — use browser TTS
        state.useElevenLabs = false;
        state.speaking = false;
        browserSpeak(text, onDone);
      });
  }

  // ─── STT ─────────────────────────────────────────────────────────────────
  function startListening() {
    if (!STT_SUPPORTED || state.listening || state.speaking || !state.open) return;
    var rec = new SR();
    state.recognition = rec;
    rec.lang            = langCode();
    rec.interimResults  = true;   // live transcript while user speaks
    rec.maxAlternatives = 1;
    rec.continuous      = false;
    state.listening = true;
    setStatus('listening');

    rec.onresult = function (e) {
      var interim = '';
      var finalText = '';
      for (var i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
          finalText += e.results[i][0].transcript;
        } else {
          interim += e.results[i][0].transcript;
        }
      }
      if (interim) setTranscript(interim, true);
      if (finalText.trim()) {
        state.listening = false;
        setTranscript(finalText.trim(), false);
        setStatus('thinking');
        callSophia(finalText.trim());
      }
    };

    rec.onspeechend = function () { try { rec.stop(); } catch (_) {} };

    rec.onerror = function (e) {
      state.listening = false;
      if (e.error !== 'no-speech' && e.error !== 'aborted') {
        setTranscript(L('error_no_speech'), false);
      } else {
        setTranscript('', false);
      }
      setStatus('ready');
    };

    rec.onend = function () {
      state.listening = false;
      if (state.open && !state.speaking) setStatus('ready');
    };

    try { rec.start(); } catch (_) { state.listening = false; setStatus('ready'); }
  }

  function stopListening() {
    if (state.recognition) { try { state.recognition.abort(); } catch (_) {} state.recognition = null; }
    state.listening = false;
    setStatus('ready');
  }

  // ─── Sofia API ────────────────────────────────────────────────────────────
  function callSophia(message) {
    state.history.push({ role: 'user', content: message });

    var payload = {
      message:   message,
      sessionId: state.sessionId || undefined,
      language:  state.lang,
    };

    fetch('/api/sofia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.session_id) {
          state.sessionId = data.session_id;
          saveVoiceSession(data.session_id);
        }
        var reply = data.response || (
          state.lang === 'pt' ? 'Desculpe, tive um problema. Tente novamente.' :
          state.lang === 'es' ? 'Lo siento, tuve un problema. Inténtalo de nuevo.' :
          "I'm having a brief issue. Please try again."
        );
        state.history.push({ role: 'assistant', content: reply });
        speak(reply, function () { if (state.open) startListening(); });
      })
      .catch(function () {
        var err = state.lang === 'pt' ? 'Problema de conexão. Tente novamente.' :
                  state.lang === 'es' ? 'Problema de conexión. Inténtalo.' :
                  'Connection issue. Please try again.';
        speak(err, function () { if (state.open) startListening(); });
      });
  }

  // ─── Modal open / close ───────────────────────────────────────────────────
  function openModal() {
    var modal = $('cf-voice-modal');
    if (!modal || state.open) return;
    state.open    = true;
    state.history = [];
    state.sessionId = loadVoiceSession();

    // Create and unlock Web Audio API context synchronously within this user-gesture frame.
    // Once resumed here, audioCtx.createBufferSource().start() works from any async callback.
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (_) {}
    }
    if (audioCtx && audioCtx.state === 'suspended') { audioCtx.resume().catch(function () {}); }

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Phone link (if configured via CF_SOPHIA_CONFIG)
    var phoneDiv = $('cf-voice-phone');
    if (phoneDiv) {
      var cfg = window.CF_SOPHIA_CONFIG;
      if (cfg && cfg.voicePhone) {
        var pL = { pt: 'ou ligue direto:', es: 'o llama directamente:', en: 'or call directly:' };
        phoneDiv.innerHTML = '<span style="color:rgba(244,246,251,.4);font-size:12px;">' + (pL[state.lang] || pL.en) + '</span> <a href="tel:+' + cfg.voicePhone + '">+' + cfg.voicePhone + '</a>';
      } else {
        phoneDiv.innerHTML = '';
      }
    }

    if (!SUPPORTED) return;

    setTranscript('', false);

    // Deliver greeting then auto-start listening (ChatGPT Voice flow)
    function greetAndListen() {
      speak(GREETINGS[state.lang] || GREETINGS.en, function () {
        if (state.open) startListening();
      });
    }

    if (SS && SS.getVoices().length > 0) {
      setTimeout(greetAndListen, 150);
    } else if (SS) {
      SS.addEventListener('voiceschanged', function onV() {
        SS.removeEventListener('voiceschanged', onV);
        setTimeout(greetAndListen, 80);
      });
      setTimeout(greetAndListen, 500);  // fallback if voiceschanged never fires
    } else {
      greetAndListen();  // ElevenLabs path — no voices check needed
    }
  }

  function closeModal() {
    var modal = $('cf-voice-modal');
    if (!modal) return;
    state.open      = false;
    state.history   = [];
    stopListening();
    stopAudio();
    state.speaking  = false;
    modal.style.display = 'none';
    document.body.style.overflow = '';
    setStatus('ready');
    setTranscript('', false);
  }

  // ─── Init ─────────────────────────────────────────────────────────────────
  function init() {
    if (state.initialized) return;
    state.initialized = true;
    injectStyles();
    buildUI();

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && state.open) closeModal();
    });

    // Watch DC runtime language changes
    var langObs = new MutationObserver(function () {
      var l = (document.documentElement.lang || '').toLowerCase();
      if (l === 'en' || l === 'es' || l === 'pt') state.lang = l;
    });
    langObs.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

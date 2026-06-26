// Sophia Voice — Browser-native voice conversation
// Uses Web Speech API (SpeechRecognition + SpeechSynthesis) + /api/chat
// Works in Chrome, Edge, and Safari 15+. Graceful fallback for other browsers.

(function () {
  'use strict';

  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var SS = window.speechSynthesis;
  var SUPPORTED = !!(SR && SS);

  var state = {
    open: false,
    listening: false,
    speaking: false,
    history: [],
    lang: detectLang(),
    recognition: null,
    initialized: false,
  };

  var GREETINGS = {
    pt: 'Olá! Sou Sophia, a consultora de IA da Carriersfy AI. Em que posso ajudar o seu negócio hoje?',
    es: '¡Hola! Soy Sophia, consultora de IA de Carriersfy AI. ¿En qué puedo ayudar a tu negocio hoy?',
    en: "Hi! I'm Sophia, AI Business Consultant at Carriersfy AI. What can I help your business with today?",
  };

  var LABELS = {
    pt: { ready: 'Toque para Falar', listening: 'Ouvindo…', speaking: 'Sophia falando…', thinking: 'Pensando…', stop: 'Parar', end: 'Encerrar Conversa', title: 'Conversar com Sophia', status_ready: 'Pronto', notSupported: 'Seu navegador não suporta voz. Use <strong>Chrome</strong> ou <strong>Safari</strong> para conversa por voz, ou use o <a data-switch-to-chat>chat</a>.' },
    es: { ready: 'Toque para Hablar', listening: 'Escuchando…', speaking: 'Sophia hablando…', thinking: 'Pensando…', stop: 'Detener', end: 'Terminar Conversación', title: 'Hablar con Sophia', status_ready: 'Listo', notSupported: 'Tu navegador no soporta voz. Usa <strong>Chrome</strong> o <strong>Safari</strong>, o el <a data-switch-to-chat>chat</a>.' },
    en: { ready: 'Tap to Speak', listening: 'Listening…', speaking: 'Sophia speaking…', thinking: 'Thinking…', stop: 'Stop', end: 'End Conversation', title: 'Talk with Sophia', status_ready: 'Ready', notSupported: 'Your browser does not support voice input. Use <strong>Chrome</strong> or <strong>Safari</strong>, or switch to the <a data-switch-to-chat>chat option</a>.' },
  };

  function detectLang() {
    var l = (navigator.language || 'en').toLowerCase();
    if (l.startsWith('pt')) return 'pt';
    if (l.startsWith('es')) return 'es';
    return 'en';
  }

  function langCode() {
    return { pt: 'pt-BR', es: 'es-US', en: 'en-US' }[state.lang] || 'en-US';
  }

  function L(key) { return (LABELS[state.lang] || LABELS.en)[key] || key; }
  function $(id) { return document.getElementById(id); }

  // ─── Styles ───────────────────────────────────────────────────────────────
  function injectStyles() {
    if ($('cf-voice-styles')) return;
    var s = document.createElement('style');
    s.id = 'cf-voice-styles';
    s.textContent = [
      '#cf-voice-btn{position:fixed;right:clamp(18px,3vw,34px);bottom:calc(clamp(18px,3vw,34px) + 66px);z-index:75;width:50px;height:50px;border-radius:50%;background:rgba(7,11,22,.92);border:1.5px solid rgba(31,162,255,.45);color:#fff;font-size:19px;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(31,162,255,.2),0 2px 8px rgba(0,0,0,.5);transition:all .2s ease;padding:0;}',
      '#cf-voice-btn:hover{background:rgba(31,162,255,.2);border-color:#1FA2FF;transform:scale(1.09);}',
      '@media(max-width:760px){#cf-voice-btn{left:calc(50% + 6px);right:auto;bottom:86px;}}',
      '#cf-voice-modal{display:none;position:fixed;inset:0;z-index:130;align-items:center;justify-content:center;padding:clamp(16px,4vw,28px);background:rgba(7,11,22,.86);backdrop-filter:blur(24px);}',
      '#cf-voice-dialog{width:min(440px,100%);border-radius:28px;background:linear-gradient(180deg,rgba(14,19,34,.99),rgba(8,11,22,.99));border:1px solid rgba(255,255,255,.12);box-shadow:0 40px 100px rgba(0,0,0,.72);padding:clamp(28px,5vw,44px);display:flex;flex-direction:column;align-items:center;gap:22px;}',
      '#cf-voice-avatar{position:relative;width:88px;height:88px;border-radius:50%;background:linear-gradient(135deg,#1FA2FF,#FF2E3C);display:flex;align-items:center;justify-content:center;font-family:"Space Grotesk",sans-serif;font-weight:700;font-size:34px;color:#070B16;flex-shrink:0;}',
      '#cf-voice-ring{position:absolute;inset:-9px;border-radius:50%;border:2px solid rgba(31,162,255,.5);animation:cf-vrp 2.4s ease-in-out infinite;}',
      '@keyframes cf-vrp{0%,100%{transform:scale(1);opacity:.55;}50%{transform:scale(1.13);opacity:1;}}',
      '#cf-voice-ring.listening{border-color:#35D6A0;animation:cf-vlp .75s ease-in-out infinite;}',
      '@keyframes cf-vlp{0%,100%{transform:scale(1);opacity:.75;}50%{transform:scale(1.2);opacity:1;}}',
      '#cf-voice-ring.speaking{border-color:#1FA2FF;animation:cf-vsp 1.1s ease-in-out infinite;}',
      '@keyframes cf-vsp{0%,100%{transform:scale(1);}50%{transform:scale(1.15);}}',
      '#cf-voice-name{text-align:center;}',
      '#cf-voice-name h3{font-family:"Space Grotesk",sans-serif;font-weight:700;font-size:20px;margin:0 0 5px;}',
      '#cf-voice-statusbar{font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#35D6A0;display:flex;align-items:center;gap:6px;justify-content:center;}',
      '#cf-voice-statusbar .vdot{width:7px;height:7px;border-radius:50%;background:#35D6A0;box-shadow:0 0 8px #35D6A0;}',
      '#cf-voice-transcript{font-size:14.5px;line-height:1.6;color:rgba(244,246,251,.7);min-height:50px;max-height:130px;overflow-y:auto;width:100%;text-align:center;font-style:italic;}',
      '#cf-voice-controls{display:flex;gap:12px;width:100%;}',
      '#cf-voice-speak{flex:1;padding:13px 16px;border-radius:14px;background:linear-gradient(135deg,rgba(31,162,255,.14),rgba(255,46,60,.09));border:1px solid rgba(31,162,255,.3);color:#F4F6FB;font-family:Manrope,sans-serif;font-size:14.5px;font-weight:700;cursor:pointer;transition:all .2s;text-align:center;}',
      '#cf-voice-speak:hover{background:linear-gradient(135deg,rgba(31,162,255,.22),rgba(255,46,60,.15));}',
      '#cf-voice-speak.active{background:linear-gradient(135deg,rgba(53,214,160,.18),rgba(53,214,160,.08));border-color:#35D6A0;color:#35D6A0;}',
      '#cf-voice-speak:disabled{opacity:.45;cursor:default;}',
      '#cf-voice-close{width:48px;height:48px;min-width:48px;border-radius:13px;background:rgba(255,46,60,.07);border:1px solid rgba(255,46,60,.2);color:#FF2E3C;font-size:19px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;}',
      '#cf-voice-close:hover{background:rgba(255,46,60,.16);}',
      '#cf-voice-fallback{text-align:center;font-size:14px;line-height:1.65;color:rgba(244,246,251,.6);padding:8px 0;}',
      '#cf-voice-fallback a{color:#1FA2FF;text-decoration:none;cursor:pointer;}',
      '#cf-voice-fallback a:hover{text-decoration:underline;}',
    ].join('');
    document.head.appendChild(s);
  }

  // ─── UI Build ─────────────────────────────────────────────────────────────
  function buildUI() {
    // Floating trigger button
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

    var innerContent = SUPPORTED
      ? [
          '<div id="cf-voice-statusbar"><div class="vdot"></div><span id="cf-voice-status-txt">' + L('status_ready') + '</span></div>',
          '<div id="cf-voice-transcript"></div>',
          '<div id="cf-voice-controls">',
          '  <button id="cf-voice-speak">🎙 ' + L('ready') + '</button>',
          '  <button id="cf-voice-close" aria-label="' + L('end') + '">✕</button>',
          '</div>',
        ].join('')
      : '<div id="cf-voice-fallback">' + L('notSupported') + '</div>';

    modal.innerHTML = [
      '<div id="cf-voice-dialog">',
      '  <div id="cf-voice-avatar">',
      '    S',
      '    <div id="cf-voice-ring"></div>',
      '  </div>',
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
      '</div>',
    ].join('');

    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    document.body.appendChild(modal);

    // Wire up controls
    if (SUPPORTED) {
      $('cf-voice-speak').addEventListener('click', function () {
        if (state.listening) stopListening();
        else if (!state.speaking) startListening();
      });
      $('cf-voice-close').addEventListener('click', closeModal);
    } else {
      var fallback = $('cf-voice-fallback');
      if (fallback) {
        fallback.addEventListener('click', function (e) {
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
    var txt = $('cf-voice-status-txt');
    var ring = $('cf-voice-ring');
    var speak = $('cf-voice-speak');
    var map = { listening: L('listening'), speaking: L('speaking'), thinking: L('thinking'), ready: L('status_ready') };
    if (txt) txt.textContent = map[mode] || mode;
    if (ring) ring.className = mode === 'listening' ? 'listening' : mode === 'speaking' ? 'speaking' : '';
    if (speak) {
      if (mode === 'listening') {
        speak.textContent = '⏹ ' + L('stop');
        speak.className = 'active';
        speak.disabled = false;
      } else if (mode === 'speaking' || mode === 'thinking') {
        speak.textContent = '⏳ ' + map[mode];
        speak.className = '';
        speak.disabled = true;
      } else {
        speak.textContent = '🎙 ' + L('ready');
        speak.className = '';
        speak.disabled = false;
      }
    }
  }

  function setTranscript(text) {
    var el = $('cf-voice-transcript');
    if (el) el.textContent = text;
  }

  // ─── Voice I/O ────────────────────────────────────────────────────────────
  function speak(text, onDone) {
    if (!SS) { if (onDone) onDone(); return; }
    SS.cancel();
    state.speaking = true;
    setStatus('speaking');
    setTranscript(text);

    var utt = new SpeechSynthesisUtterance(text);
    utt.lang = langCode();
    utt.rate = 1.0;
    utt.pitch = 1.05;

    // Prefer a high-quality voice for the detected language
    var voices = SS.getVoices();
    var preferred = voices.find(function (v) {
      var matches = v.lang.toLowerCase().startsWith(state.lang);
      var quality = v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Premium') || v.name.includes('Enhanced') || !v.localService;
      return matches && quality;
    }) || voices.find(function (v) { return v.lang.toLowerCase().startsWith(state.lang); });
    if (preferred) utt.voice = preferred;

    utt.onend = function () {
      state.speaking = false;
      if (state.open) { setStatus('ready'); if (onDone) onDone(); }
    };
    utt.onerror = function () {
      state.speaking = false;
      if (state.open) { setStatus('ready'); if (onDone) onDone(); }
    };
    SS.speak(utt);
  }

  function startListening() {
    if (!SR || state.listening || state.speaking || !state.open) return;
    var rec = new SR();
    state.recognition = rec;
    rec.lang = langCode();
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.continuous = false;
    state.listening = true;
    setStatus('listening');

    rec.onresult = function (e) {
      var t = (e.results[0][0].transcript || '').trim();
      if (t) {
        state.listening = false;
        setTranscript(t);
        setStatus('thinking');
        callSophia(t);
      }
    };
    rec.onspeechend = function () { try { rec.stop(); } catch (_) {} };
    rec.onerror = function (e) {
      state.listening = false;
      if (e.error !== 'no-speech' && e.error !== 'aborted') {
        var err = state.lang === 'pt' ? 'Não entendi. Tente novamente.' : state.lang === 'es' ? 'No entendí. Inténtalo de nuevo.' : "Didn't catch that — tap to try again.";
        setTranscript(err);
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

  function callSophia(message) {
    state.history.push({ role: 'user', content: message });
    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: message, history: state.history.slice(-6), language: state.lang }),
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var reply = data.response || (state.lang === 'pt' ? 'Desculpe, tive um problema. Tente novamente.' : state.lang === 'es' ? 'Lo siento, tuve un problema. Inténtalo de nuevo.' : "I'm having a brief issue. Please try again.");
        state.history.push({ role: 'assistant', content: reply });
        speak(reply, function () { if (state.open) startListening(); });
      })
      .catch(function () {
        var err = state.lang === 'pt' ? 'Problema de conexão. Tente novamente.' : state.lang === 'es' ? 'Problema de conexión.' : 'Connection issue. Please try again.';
        speak(err, function () { if (state.open) startListening(); });
      });
  }

  // ─── Modal ────────────────────────────────────────────────────────────────
  function openModal() {
    var modal = $('cf-voice-modal');
    if (!modal || state.open) return;
    state.open = true;
    state.history = [];
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    if (!SUPPORTED) return;
    // Ensure voices are loaded before speaking
    var trySpeak = function () {
      speak(GREETINGS[state.lang] || GREETINGS.en, function () { if (state.open) startListening(); });
    };
    if (SS.getVoices().length > 0) {
      setTimeout(trySpeak, 200);
    } else {
      SS.addEventListener('voiceschanged', function onV() {
        SS.removeEventListener('voiceschanged', onV);
        setTimeout(trySpeak, 100);
      });
      setTimeout(trySpeak, 500); // fallback
    }
  }

  function closeModal() {
    var modal = $('cf-voice-modal');
    if (!modal) return;
    state.open = false;
    state.history = [];
    stopListening();
    if (SS) SS.cancel();
    state.speaking = false;
    modal.style.display = 'none';
    document.body.style.overflow = '';
    setStatus('ready');
    setTranscript('');
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

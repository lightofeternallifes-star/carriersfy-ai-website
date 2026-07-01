// Sophia Chat — Premium AI Business Consultant for carriersfy.ai
// Routes to /api/sofia (Sofia Worker RAG pipeline) via secure proxy.
// Session persists 24 h via localStorage so conversations survive page refreshes.

(function () {
  'use strict';

  // ─── Session Persistence ──────────────────────────────────────────────────
  var SESSION_STORAGE_KEY = 'cf_sophia_session';
  var SESSION_TTL_MS = 24 * 60 * 60 * 1000;

  function persistedSession() {
    try {
      var raw = localStorage.getItem(SESSION_STORAGE_KEY);
      if (!raw) return null;
      var s = JSON.parse(raw);
      if (!s || Date.now() > s.expiresAt) { localStorage.removeItem(SESSION_STORAGE_KEY); return null; }
      return s;
    } catch (_) { return null; }
  }

  function flushSession() {
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
        sessionId:    state.sessionId,
        history:      state.history.slice(-20),
        leadCaptured: state.leadCaptured,
        leadData:     state.leadData,
        expiresAt:    Date.now() + SESSION_TTL_MS,
      }));
    } catch (_) {}
  }

  // ─── WhatsApp URL ─────────────────────────────────────────────────────────
  function getWhatsAppUrl(contextMsg) {
    var phone = window.CF_SOPHIA_WHATSAPP_PHONE || null;
    if (!phone) return null;
    var defaultMsg = L(
      "Hi! I'm interested in Carriersfy AI Digital Employees.",
      '¡Hola! Me interesa saber más sobre los Empleados Digitales de Carriersfy AI.',
      'Olá! Tenho interesse nos Funcionários Digitais da Carriersfy AI.'
    );
    return 'https://wa.me/' + phone + '?text=' + encodeURIComponent(contextMsg || defaultMsg);
  }

  // ─── Greetings ────────────────────────────────────────────────────────────
  var GREETINGS = {
    en: "Hi! I'm Sophia, Carriersfy AI's Chief AI Business Consultant. What type of business do you run? I'd love to show you exactly how a Digital Employee could transform it.",
    es: "¡Hola! Soy Sophia, Consultora de IA de Carriersfy AI. ¿Qué tipo de negocio tienes? Me encantaría mostrarte cómo un Empleado Digital puede transformarlo.",
    pt: "Olá! Sou Sophia, Consultora de IA da Carriersfy AI. Que tipo de negócio você tem? Adoraria te mostrar como um Funcionário Digital pode transformá-lo.",
  };

  // ─── State ────────────────────────────────────────────────────────────────
  var saved = persistedSession();
  var state = {
    history:      saved ? saved.history      : [],
    sessionId:    saved ? saved.sessionId    : null,
    visitorId:    getVisitorId(),
    language:     detectLanguage(),
    leadCaptured: saved ? saved.leadCaptured : false,
    isTyping:     false,
    isStreaming:  false,
    leadData: saved ? saved.leadData : {
      name: null, email: null, phone: null, business: null,
      industry: null, problem: null, recommendedService: null,
      qualificationStage: null, urgency: null, lastIntent: null,
    },
    initialized: false,
  };

  // ─── Utilities ────────────────────────────────────────────────────────────
  function getVisitorId() {
    try {
      var id = localStorage.getItem('cf_sophia_vid');
      if (!id) {
        id = 'v_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
        localStorage.setItem('cf_sophia_vid', id);
      }
      return id;
    } catch (_) { return 'v_' + Math.random().toString(36).slice(2); }
  }

  function detectLanguage() {
    var docLang = (document.documentElement.lang || '').toLowerCase();
    if (docLang === 'es' || docLang === 'pt' || docLang === 'en') return docLang;
    try {
      var saved = localStorage.getItem('cf_lang');
      if (saved === 'es' || saved === 'pt' || saved === 'en') return saved;
    } catch (_) {}
    var nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    if (nav.startsWith('pt')) return 'pt';
    if (nav.startsWith('es')) return 'es';
    return 'en';
  }

  function watchLanguageChanges() {
    var observer = new MutationObserver(function () {
      var newLang = (document.documentElement.lang || '').toLowerCase();
      if ((newLang === 'en' || newLang === 'es' || newLang === 'pt') && newLang !== state.language) {
        state.language = newLang;
        var inp = document.getElementById('cf-sc-input');
        if (inp) inp.placeholder = L('Type your message…', 'Escribe tu mensaje…', 'Escreva sua mensagem…');
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  function $(id) { return document.getElementById(id); }
  function L(en, es, pt) { return state.language === 'es' ? es : state.language === 'pt' ? pt : en; }

  function extractConversationContext() {
    var userMessages = state.history
      .filter(function (h) { return h.role === 'user'; })
      .map(function (h) { return h.content.toLowerCase(); })
      .join(' ');

    var industryMap = {
      'dental':        ['dental', 'dentist', 'odontol'],
      'medical':       ['medical', 'clinic', 'doctor', 'physician', 'health'],
      'restaurant':    ['restaurant', 'food', 'cafe', 'bar', 'catering'],
      'legal':         ['law', 'attorney', 'lawyer', 'legal', 'firm'],
      'immigration':   ['immigration', 'inmigra', 'visa'],
      'real estate':   ['real estate', 'realtor', 'property', 'homes'],
      'construction':  ['construction', 'roofing', 'hvac', 'plumbing'],
      'transportation':['trucking', 'transport', 'logistics', 'dispatch'],
      'insurance':     ['insurance', 'seguro', 'policy'],
      'beauty':        ['salon', 'spa', 'beauty', 'hair', 'nail'],
      'church':        ['church', 'iglesia', 'faith', 'ministry'],
    };

    var detected = state.leadData.industry || null;
    if (!detected) {
      for (var ind in industryMap) {
        var kws = industryMap[ind];
        for (var k = 0; k < kws.length; k++) {
          if (userMessages.indexOf(kws[k]) !== -1) { detected = ind; break; }
        }
        if (detected) break;
      }
    }

    return {
      industry: detected, name: state.leadData.name,
      problem: state.leadData.problem,
      recommendedService: state.leadData.recommendedService,
      qualificationStage: state.leadData.qualificationStage,
      urgency: state.leadData.urgency,
    };
  }

  function buildWhatsAppHandoffUrl() {
    var ctx = extractConversationContext();
    var phone = window.CF_SOPHIA_WHATSAPP_PHONE || null;
    if (!phone) return null;
    var msg;
    if (state.language === 'es') {
      msg = 'Hola Sophia! Acabo de hablar contigo en carriersfy.ai.';
      if (ctx.name)     msg += ' Me llamo ' + ctx.name + '.';
      if (ctx.industry) msg += ' Tengo un negocio de ' + ctx.industry + '.';
      msg += ' Me gustaría continuar nuestra conversación.';
    } else if (state.language === 'pt') {
      msg = 'Olá Sophia! Acabei de falar com você em carriersfy.ai.';
      if (ctx.name)     msg += ' Meu nome é ' + ctx.name + '.';
      if (ctx.industry) msg += ' Tenho um negócio de ' + ctx.industry + '.';
      msg += ' Gostaria de continuar nossa conversa.';
    } else {
      msg = 'Hi Sophia! I just spoke with you on carriersfy.ai.';
      if (ctx.name)     msg += ' My name is ' + ctx.name + '.';
      if (ctx.industry) msg += ' I have a ' + ctx.industry + ' business.';
      msg += " I'd like to continue our conversation about Digital Employees.";
    }
    return 'https://wa.me/' + phone + '?text=' + encodeURIComponent(msg);
  }

  function buildTranscript() {
    return state.history.slice(-12).map(function (h) {
      return (h.role === 'user' ? 'Visitor: ' : 'Sophia: ') + h.content;
    }).join('\n');
  }

  // ─── Styles ───────────────────────────────────────────────────────────────
  function injectStyles() {
    if ($('cf-sophia-chat-styles')) return;
    var style = document.createElement('style');
    style.id = 'cf-sophia-chat-styles';
    style.textContent = [

      // ── Wrap ────────────────────────────────────────────────────────────
      '#cf-sc-wrap{display:flex;flex-direction:column;height:100%;font-family:Manrope,sans-serif;background:rgba(8,12,24,.97);}',

      // ── Sophia header (premium identity bar) ────────────────────────────
      '#cf-sc-header{display:flex;align-items:center;gap:11px;padding:14px 18px 12px;border-bottom:1px solid rgba(255,255,255,.07);flex-shrink:0;}',
      '#cf-sc-avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#1FA2FF,#FF2E3C);display:flex;align-items:center;justify-content:center;font-family:"Space Grotesk",sans-serif;font-weight:700;font-size:15px;color:#070B16;flex-shrink:0;position:relative;}',
      '#cf-sc-avatar::after{content:"";position:absolute;bottom:0;right:0;width:9px;height:9px;border-radius:50%;background:#35D6A0;border:1.5px solid rgba(8,12,24,.97);box-shadow:0 0 6px #35D6A0;}',
      '#cf-sc-identity{flex:1;min-width:0;}',
      '#cf-sc-name{font-family:"Space Grotesk",Manrope,sans-serif;font-weight:700;font-size:14px;color:#F4F6FB;line-height:1.2;}',
      '#cf-sc-role{font-size:11px;color:rgba(244,246,251,.45);letter-spacing:.03em;}',
      '#cf-sc-badge{display:flex;align-items:center;gap:5px;font-size:11px;color:#35D6A0;font-weight:700;letter-spacing:.06em;text-transform:uppercase;}',
      '#cf-sc-badge .dot{width:6px;height:6px;border-radius:50%;background:#35D6A0;box-shadow:0 0 6px #35D6A0;}',

      // ── Messages ────────────────────────────────────────────────────────
      '#cf-sc-msgs{flex:1;overflow-y:auto;padding:16px 16px 6px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth;}',
      '#cf-sc-msgs::-webkit-scrollbar{width:3px;}',
      '#cf-sc-msgs::-webkit-scrollbar-track{background:transparent;}',
      '#cf-sc-msgs::-webkit-scrollbar-thumb{background:rgba(255,255,255,.12);border-radius:4px;}',

      // ── Bubbles ──────────────────────────────────────────────────────────
      '.cf-sc-bubble{max-width:84%;padding:10px 14px;border-radius:15px;font-size:13.5px;line-height:1.65;word-break:break-word;animation:cfscin .18s ease;}',
      '.cf-sc-bubble-sophia{background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.1);border-left:2px solid rgba(31,162,255,.45);color:#ECF0FF;align-self:flex-start;border-bottom-left-radius:4px;}',
      '.cf-sc-bubble-user{background:linear-gradient(135deg,rgba(31,162,255,.28),rgba(255,46,60,.2));border:1px solid rgba(31,162,255,.28);color:#F4F6FB;align-self:flex-end;border-bottom-right-radius:4px;}',

      // ── Streaming cursor ─────────────────────────────────────────────────
      '.cf-sc-bubble-sophia.streaming::after{content:"|";animation:cfsc-blink .65s step-end infinite;color:#1FA2FF;margin-left:1px;font-weight:300;}',
      '@keyframes cfsc-blink{0%,100%{opacity:1;}50%{opacity:0;}}',
      '@keyframes cfscin{from{opacity:0;transform:translateY(5px);}to{opacity:1;transform:none;}}',

      // ── Typing indicator ─────────────────────────────────────────────────
      '.cf-sc-typing{display:flex;align-items:center;gap:5px;padding:10px 14px;background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.1);border-left:2px solid rgba(31,162,255,.35);border-radius:15px;border-bottom-left-radius:4px;align-self:flex-start;}',
      '.cf-sc-dot{width:6px;height:6px;border-radius:50%;background:rgba(244,246,251,.4);animation:cfsc-b 1.2s ease-in-out infinite;}',
      '.cf-sc-dot:nth-child(2){animation-delay:.22s;}',
      '.cf-sc-dot:nth-child(3){animation-delay:.44s;}',
      '@keyframes cfsc-b{0%,80%,100%{transform:translateY(0);}40%{transform:translateY(-5px);}}',

      // ── Action chips ─────────────────────────────────────────────────────
      '#cf-sc-actions{padding:0 16px 8px;display:flex;flex-wrap:wrap;gap:7px;}',
      '.cf-sc-action{flex:1 1 auto;min-width:110px;padding:8px 13px;border-radius:20px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04);color:rgba(244,246,251,.75);font-family:Manrope,sans-serif;font-size:12.5px;font-weight:700;cursor:pointer;text-align:center;transition:background .15s,border-color .15s,color .15s,transform .1s;}',
      '.cf-sc-action:hover{background:rgba(255,255,255,.09);border-color:rgba(255,255,255,.22);color:#F4F6FB;transform:translateY(-1px);}',
      '.cf-sc-action:active{transform:translateY(0);}',
      '.cf-sc-action-wa{background:rgba(37,211,102,.08);border-color:rgba(37,211,102,.28);color:#35D6A0;}',
      '.cf-sc-action-wa:hover{background:rgba(37,211,102,.16);}',
      '.cf-sc-action-call,.cf-sc-action-book{background:rgba(31,162,255,.08);border-color:rgba(31,162,255,.28);color:#7CC8FF;}',
      '.cf-sc-action-call:hover,.cf-sc-action-book:hover{background:rgba(31,162,255,.16);}',
      '.cf-sc-action-emp{background:rgba(31,162,255,.06);border-color:rgba(31,162,255,.18);color:#7CC8FF;}',
      '.cf-sc-action-app{background:rgba(255,46,60,.06);border-color:rgba(255,46,60,.18);color:#FF7A83;}',

      // ── Input area ───────────────────────────────────────────────────────
      '#cf-sc-input-area{padding:10px 14px 14px;border-top:1px solid rgba(255,255,255,.07);display:flex;gap:9px;align-items:flex-end;flex-shrink:0;}',
      '#cf-sc-input{flex:1;background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.11);border-radius:14px;color:#F4F6FB;font-family:Manrope,sans-serif;font-size:13.5px;padding:10px 14px;resize:none;outline:none;min-height:42px;max-height:96px;line-height:1.5;transition:border-color .18s;}',
      '#cf-sc-input::placeholder{color:rgba(244,246,251,.3);}',
      '#cf-sc-input:focus{border-color:rgba(31,162,255,.48);}',
      '#cf-sc-send{width:42px;height:42px;min-width:42px;border-radius:12px;background:linear-gradient(135deg,#1FA2FF,#FF2E3C);border:0;color:#fff;font-size:17px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:filter .15s,transform .15s;box-shadow:0 3px 12px rgba(31,162,255,.3);}',
      '#cf-sc-send:hover{filter:brightness(1.12);transform:translateY(-1px);}',
      '#cf-sc-send:active{transform:translateY(0);}',
      '#cf-sc-send:disabled{opacity:.38;cursor:default;transform:none;filter:none;box-shadow:none;}',

      // ── Lead capture form ────────────────────────────────────────────────
      '.cf-sc-lead-form{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:13px;display:flex;flex-direction:column;gap:8px;margin-top:4px;width:100%;box-sizing:border-box;animation:cfscin .22s ease;}',
      '.cf-sc-lead-input{background:rgba(255,255,255,.065);border:1px solid rgba(255,255,255,.12);border-radius:9px;color:#F4F6FB;font-family:Manrope,sans-serif;font-size:13px;padding:9px 12px;outline:none;transition:border-color .18s;width:100%;box-sizing:border-box;}',
      '.cf-sc-lead-input::placeholder{color:rgba(244,246,251,.32);}',
      '.cf-sc-lead-input:focus{border-color:rgba(31,162,255,.45);}',
      '.cf-sc-lead-input.error{border-color:#FF2E3C;}',
      '.cf-sc-lead-submit{background:linear-gradient(135deg,#1FA2FF,#FF2E3C);border:0;border-radius:9px;color:#fff;font-family:Manrope,sans-serif;font-size:13px;font-weight:800;padding:10px;cursor:pointer;transition:filter .15s;width:100%;box-shadow:0 3px 12px rgba(31,162,255,.25);}',
      '.cf-sc-lead-submit:hover{filter:brightness(1.1);}',
      '.cf-sc-lead-submit:disabled{opacity:.48;cursor:default;}',

      // ── Booking widget ───────────────────────────────────────────────────
      '.cf-sc-booking{background:rgba(53,214,160,.055);border:1px solid rgba(53,214,160,.2);border-radius:14px;padding:13px;display:flex;flex-direction:column;gap:9px;margin-top:4px;animation:cfscin .22s ease;}',
      '.cf-sc-booking-title{font-size:12.5px;font-weight:700;color:#35D6A0;letter-spacing:.04em;}',
      '.cf-sc-booking-desc{font-size:12px;color:rgba(244,246,251,.55);line-height:1.5;}',
      '.cf-sc-booking-btn{background:linear-gradient(135deg,#35D6A0,#1FA2FF);border:0;border-radius:9px;color:#070B16;font-family:Manrope,sans-serif;font-size:13px;font-weight:800;padding:11px 16px;cursor:pointer;transition:filter .15s;text-decoration:none;display:block;text-align:center;}',
      '.cf-sc-booking-btn:hover{filter:brightness(1.08);}',

      // ── Mobile ───────────────────────────────────────────────────────────
      '@media(max-width:640px){.cf-sc-bubble{max-width:92%;}#cf-sc-input{font-size:16px;}}',
    ].join('');
    document.head.appendChild(style);
  }

  // ─── Chat UI ──────────────────────────────────────────────────────────────
  function buildChatUI(container) {
    container.innerHTML = [
      '<div id="cf-sc-wrap">',

      // Identity header
      '<div id="cf-sc-header">',
      '  <div id="cf-sc-avatar">S</div>',
      '  <div id="cf-sc-identity">',
      '    <div id="cf-sc-name">Sophia</div>',
      '    <div id="cf-sc-role">' + L('AI Business Consultant', 'Consultora de IA', 'Consultora de IA') + '</div>',
      '  </div>',
      '  <div id="cf-sc-badge"><div class="dot"></div>' + L('Online', 'En línea', 'Online') + '</div>',
      '</div>',

      // Messages
      '<div id="cf-sc-msgs"></div>',

      // Action chips
      '<div id="cf-sc-actions">',
      '  <button class="cf-sc-action cf-sc-action-wa"  data-action="whatsapp">🟢 WhatsApp</button>',
      '  <button class="cf-sc-action cf-sc-action-call" data-action="strategy_call">📞 ' + L('Strategy Call', 'Llamada Estratégica', 'Chamada Estratégica') + '</button>',
      '</div>',

      // Input
      '<div id="cf-sc-input-area">',
      '  <textarea id="cf-sc-input" rows="1" placeholder="' + L('Type your message…', 'Escribe tu mensaje…', 'Escreva sua mensagem…') + '" aria-label="' + L('Message Sophia', 'Mensaje para Sophia', 'Mensagem para Sophia') + '"></textarea>',
      '  <button id="cf-sc-send" aria-label="' + L('Send', 'Enviar', 'Enviar') + '">',
      '    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
      '  </button>',
      '</div>',

      '</div>',
    ].join('');

    var input = $('cf-sc-input');
    var send  = $('cf-sc-send');

    send.addEventListener('click', function () { submitInput(); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitInput(); }
    });
    input.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 96) + 'px';
    });

    $('cf-sc-actions').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action]');
      if (btn) handleAction(btn.getAttribute('data-action'));
    });

    // Show conversation — restore or greet
    if (state.history.length > 0) {
      restoreHistory();
    } else {
      appendBubble('sophia', GREETINGS[state.language] || GREETINGS.en);
    }
  }

  // ─── History Restore ──────────────────────────────────────────────────────
  function restoreHistory() {
    var msgs = $('cf-sc-msgs');
    if (!msgs) return;
    for (var i = 0; i < state.history.length; i++) {
      var turn = state.history[i];
      var div = document.createElement('div');
      div.className = 'cf-sc-bubble cf-sc-bubble-' + (turn.role === 'assistant' ? 'sophia' : 'user');
      div.textContent = turn.content;
      msgs.appendChild(div);
    }
    msgs.scrollTop = msgs.scrollHeight;
  }

  // ─── Bubble Rendering ─────────────────────────────────────────────────────
  function appendBubble(role, text) {
    var msgs = $('cf-sc-msgs');
    if (!msgs) return null;
    var div = document.createElement('div');
    div.className = 'cf-sc-bubble cf-sc-bubble-' + (role === 'sophia' ? 'sophia' : 'user');
    div.textContent = text;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return div;
  }

  function streamText(el, text, onDone) {
    if (!el) { if (onDone) onDone(); return; }
    el.classList.add('streaming');
    el.textContent = '';
    var tokens = text.split(/(\s+)/);
    var i = 0;
    var msgs = $('cf-sc-msgs');

    function step() {
      if (i >= tokens.length) {
        el.classList.remove('streaming');
        if (onDone) onDone();
        return;
      }
      el.textContent += tokens[i];
      i++;
      if (msgs) msgs.scrollTop = msgs.scrollHeight;
      var last = tokens[i - 1].trimEnd().slice(-1);
      var delay = 18;
      if (last === '.' || last === '!' || last === '?') delay = 220;
      else if (last === ',' || last === ';' || last === ':') delay = 70;
      else if (tokens[i - 1] === '\n' || tokens[i - 1] === '\n\n') delay = 110;
      setTimeout(step, delay);
    }
    step();
  }

  function showTyping() {
    var msgs = $('cf-sc-msgs');
    if (!msgs || $('cf-sc-typing-indicator')) return;
    var div = document.createElement('div');
    div.id = 'cf-sc-typing-indicator';
    div.className = 'cf-sc-typing';
    div.innerHTML = '<div class="cf-sc-dot"></div><div class="cf-sc-dot"></div><div class="cf-sc-dot"></div>';
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function hideTyping() {
    var el = $('cf-sc-typing-indicator');
    if (el) el.parentNode.removeChild(el);
  }

  // ─── Booking Widget ───────────────────────────────────────────────────────
  function showBookingWidget() {
    var msgs = $('cf-sc-msgs');
    if (!msgs) return;
    var cfg = window.CF_SOPHIA_CONFIG || {};
    var bookingUrl = cfg.bookingUrl || null;
    var widget = document.createElement('div');
    widget.className = 'cf-sc-booking';
    if (bookingUrl) {
      widget.innerHTML = [
        '<div class="cf-sc-booking-title">📅 ' + L('Strategy Call', 'Llamada Estratégica', 'Chamada Estratégica') + '</div>',
        '<div class="cf-sc-booking-desc">' + L('30 min · Free · Video call', '30 min · Sin costo · Videollamada', '30 min · Gratuito · Videochamada') + '</div>',
        '<a href="' + bookingUrl + '" target="_blank" rel="noopener noreferrer" class="cf-sc-booking-btn">' +
          L('Book My Free Call →', 'Reservar Mi Llamada →', 'Agendar Minha Chamada →') +
        '</a>',
      ].join('');
    } else {
      widget.innerHTML = [
        '<div class="cf-sc-booking-title">📅 ' + L('Book a Strategy Call', 'Reservar una Llamada', 'Agendar uma Chamada') + '</div>',
        '<div class="cf-sc-booking-desc">' + L(
          'Leave your info and our team will schedule a call.',
          'Deja tu info y el equipo coordinará una llamada contigo.',
          'Deixe seus dados e nossa equipe agendará uma chamada.'
        ) + '</div>',
        '<button class="cf-sc-booking-btn" id="cf-sc-book-fallback">' + L('Get in Touch →', 'Contactar →', 'Entrar em Contato →') + '</button>',
      ].join('');
    }
    msgs.appendChild(widget);
    msgs.scrollTop = msgs.scrollHeight;
    if (!bookingUrl) {
      var fb = $('cf-sc-book-fallback');
      if (fb) fb.addEventListener('click', function () { showLeadCapture(); });
    }
  }

  // ─── Contextual Action Chips ──────────────────────────────────────────────
  function showContextualActions(intent) {
    var acts = $('cf-sc-actions');
    if (!acts) return;
    acts.querySelectorAll('[data-contextual]').forEach(function (b) { b.parentNode.removeChild(b); });

    var map = {
      'employee_builder': { cls: 'cf-sc-action-emp', action: 'open_employee_builder', label: L('🤖 Build AI Employee', '🤖 Crear Empleado IA', '🤖 Criar Funcionário IA') },
      'app_builder':      { cls: 'cf-sc-action-app', action: 'open_app_builder',      label: L('🏗️ Build My App',   '🏗️ Crear Mi App',   '🏗️ Criar Meu App') },
      'schedule_call':    { cls: 'cf-sc-action-book', action: 'show_booking',          label: L('📅 Book a Call',     '📅 Reservar Llamada', '📅 Agendar Chamada') },
      'show_calendar':    { cls: 'cf-sc-action-book', action: 'show_booking',          label: L('📅 Book a Call',     '📅 Reservar Llamada', '📅 Agendar Chamada') },
      'whatsapp_handoff': { cls: 'cf-sc-action-wa',   action: 'whatsapp_with_context', label: L('🟢 Continue on WhatsApp', '🟢 Continuar en WhatsApp', '🟢 Continuar no WhatsApp') },
    };

    var cfg = map[intent];
    if (!cfg) return;
    var btn = document.createElement('button');
    btn.className = 'cf-sc-action ' + cfg.cls;
    btn.setAttribute('data-action', cfg.action);
    btn.setAttribute('data-contextual', '1');
    btn.textContent = cfg.label;
    acts.appendChild(btn);
  }

  // ─── Lead Capture Form ────────────────────────────────────────────────────
  function showLeadCapture() {
    if (state.leadCaptured) return;
    var msgs = $('cf-sc-msgs');
    if (!msgs) return;

    var promptText = L(
      "I'd love to send you information tailored to your business. Could I get your name, email, and phone?",
      'Me gustaría enviarte información personalizada. ¿Puedo obtener tu nombre, email y teléfono?',
      'Adoraria enviar informações personalizadas. Posso obter seu nome, e-mail e telefone?'
    );
    appendBubble('sophia', promptText);
    state.history.push({ role: 'assistant', content: promptText });

    var ctx = extractConversationContext();
    var form = document.createElement('div');
    form.className = 'cf-sc-lead-form';
    form.innerHTML = [
      '<input class="cf-sc-lead-input" id="cf-sc-ln" type="text" placeholder="' + L('Your name', 'Tu nombre', 'Seu nome') + '" value="' + (ctx.name || '') + '" autocomplete="name" />',
      '<input class="cf-sc-lead-input" id="cf-sc-lb" type="text" placeholder="' + L('Your business', 'Tu empresa', 'Sua empresa') + '" autocomplete="organization" />',
      '<input class="cf-sc-lead-input" id="cf-sc-le" type="email" placeholder="' + L('Your email', 'Tu email', 'Seu e-mail') + '" autocomplete="email" />',
      '<input class="cf-sc-lead-input" id="cf-sc-lp" type="tel" placeholder="' + L('Phone (optional)', 'Teléfono (opcional)', 'Telefone (opcional)') + '" autocomplete="tel" />',
      '<button class="cf-sc-lead-submit" id="cf-sc-ls">' + L('Send →', 'Enviar →', 'Enviar →') + '</button>',
    ].join('');
    msgs.appendChild(form);
    msgs.scrollTop = msgs.scrollHeight;

    $('cf-sc-ls').addEventListener('click', function () {
      var name  = ($('cf-sc-ln')  ? $('cf-sc-ln').value  : '').trim();
      var biz   = ($('cf-sc-lb')  ? $('cf-sc-lb').value  : '').trim();
      var email = ($('cf-sc-le')  ? $('cf-sc-le').value  : '').trim();
      var phone = ($('cf-sc-lp')  ? $('cf-sc-lp').value  : '').trim();
      var valid = true;
      if (!name)  { if ($('cf-sc-ln')) $('cf-sc-ln').classList.add('error'); valid = false; }
      else        { if ($('cf-sc-ln')) $('cf-sc-ln').classList.remove('error'); }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if ($('cf-sc-le')) $('cf-sc-le').classList.add('error'); valid = false;
      } else { if ($('cf-sc-le')) $('cf-sc-le').classList.remove('error'); }
      if (!valid) return;
      state.leadData.name = name;
      state.leadData.business = biz;
      $('cf-sc-ls').disabled = true;
      submitLead({ name: name, business: biz, email: email, phone: phone }, form);
    });
  }

  function submitLead(data, formEl) {
    var ctx = extractConversationContext();
    var payload = {
      name: data.name, business: data.business || '', email: data.email, phone: data.phone || '',
      industry: ctx.industry || state.leadData.industry || '',
      problem: ctx.problem || state.leadData.problem || '',
      recommendedService: ctx.recommendedService || '',
      qualificationStage: ctx.qualificationStage || 'interested',
      urgency: ctx.urgency || '',
      transcript: buildTranscript(),
      message: 'Sophia Chat — lead after ' + state.history.length + ' messages.',
      sophiaPipeline: {
        owner: 'Sophia', intent: state.leadData.lastIntent || 'Website Chat',
        status: 'new', routingQueue: 'carriersfy-ai-inbound-leads',
        crmStatus: 'sophia-submitted',
      },
    };
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(function () {
        state.leadCaptured = true;
        state.leadData.email = data.email;
        if (formEl && formEl.parentNode) formEl.parentNode.removeChild(formEl);
        flushSession();
        var thanks = L(
          "Thank you, " + data.name.split(' ')[0] + "! Our team will reach out personally. Anything else I can help you with?",
          "¡Gracias, " + data.name.split(' ')[0] + "! El equipo se pondrá en contacto contigo. ¿Puedo ayudarte con algo más?",
          "Obrigada, " + data.name.split(' ')[0] + "! Nossa equipe entrará em contato. Posso ajudar com mais alguma coisa?"
        );
        var div = appendBubble('sophia', '');
        if (div) streamText(div, thanks);
        setTimeout(function () {
          var cfg = window.CF_SOPHIA_CONFIG || {};
          if (cfg.bookingUrl && !$('cf-sc-booking-offered')) {
            var offerDiv = document.createElement('div');
            offerDiv.id = 'cf-sc-booking-offered';
            offerDiv.className = 'cf-sc-bubble cf-sc-bubble-sophia';
            offerDiv.textContent = L(
              "Want to book a free Strategy Call while we're here? Just 30 minutes.",
              '¿Quieres reservar una Llamada Estratégica ahora? Es gratuita, 30 minutos.',
              'Quer agendar uma Chamada Estratégica agora? É gratuita, 30 minutos.'
            );
            var msgs = $('cf-sc-msgs');
            if (msgs) { msgs.appendChild(offerDiv); msgs.scrollTop = msgs.scrollHeight; }
            setTimeout(showBookingWidget, 400);
          }
        }, 2200);
      })
      .catch(function () {
        appendBubble('sophia', L(
          'There was a brief issue. Reach us at hello@carriersfy.ai.',
          'Hubo un problema. Escríbenos a hello@carriersfy.ai.',
          'Houve um problema. Escreva para hello@carriersfy.ai.'
        ));
        var btn = $('cf-sc-ls');
        if (btn) btn.disabled = false;
      });
  }

  // ─── Action Handler ───────────────────────────────────────────────────────
  function handleAction(action) {
    switch (action) {
      case 'scroll_to_contact':
      case 'strategy_call': {
        var closeBtn = document.getElementById('cf-sophia-close');
        var target = document.getElementById('contact') || document.querySelector('[id*="contact"]');
        if (closeBtn) closeBtn.click();
        if (target) setTimeout(function () { target.scrollIntoView({ behavior: 'smooth' }); }, 250);
        break;
      }
      case 'show_booking': { showBookingWidget(); break; }
      case 'whatsapp':
      case 'open_whatsapp': {
        var waUrl = getWhatsAppUrl();
        if (waUrl) window.open(waUrl, '_blank', 'noopener,noreferrer');
        else showLeadCapture();
        break;
      }
      case 'whatsapp_with_context': {
        var ctxUrl = buildWhatsAppHandoffUrl();
        if (ctxUrl) window.open(ctxUrl, '_blank', 'noopener,noreferrer');
        else { var wc = document.getElementById('cf-sophia-close'); if (wc) wc.click(); var ce = document.getElementById('contact'); if (ce) ce.scrollIntoView({ behavior: 'smooth' }); }
        break;
      }
      case 'capture_lead': { showLeadCapture(); break; }
      case 'open_employee_builder': {
        var fb2 = document.querySelector('[data-employee-factory-open]');
        if (fb2) { fb2.click(); } else { var fe = document.getElementById('digital-employee-factory'); if (fe) fe.scrollIntoView({ behavior: 'smooth' }); }
        var cb2 = document.getElementById('cf-sophia-close'); if (cb2) cb2.click();
        break;
      }
      case 'open_app_builder': {
        var ab = document.querySelector('[data-app-builder-open]');
        if (ab) { ab.click(); } else { var ae = document.getElementById('app-builder'); if (ae) ae.scrollIntoView({ behavior: 'smooth' }); }
        var ca = document.getElementById('cf-sophia-close'); if (ca) ca.click();
        break;
      }
    }
  }

  // ─── Message Send ─────────────────────────────────────────────────────────
  function setInputEnabled(enabled) {
    var send  = $('cf-sc-send');
    var input = $('cf-sc-input');
    if (send)  send.disabled  = !enabled;
    if (input) input.disabled = !enabled;
  }

  function submitInput() {
    if (state.isTyping || state.isStreaming) return;
    var input = $('cf-sc-input');
    if (!input) return;
    var msg = input.value.trim();
    if (!msg) return;

    input.value = '';
    input.style.height = 'auto';
    setInputEnabled(false);
    appendBubble('user', msg);
    state.history.push({ role: 'user', content: msg });
    state.isTyping = true;
    showTyping();

    fetch('/api/sofia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message:      msg,
        sessionId:    state.sessionId || undefined,
        language:     state.language,
        leadCaptured: state.leadCaptured,
      }),
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        hideTyping();
        state.isTyping = false;

        // Update session ID
        if (data.session_id) state.sessionId = data.session_id;

        var reply = data.response || L(
          "I'm having a brief issue. Reach us at hello@carriersfy.ai.",
          'Tuve un problema. Escríbenos a hello@carriersfy.ai.',
          'Tive um problema. Escreva para hello@carriersfy.ai.'
        );

        if (data.intent) {
          state.leadData.lastIntent = data.intent;
          var ctx = extractConversationContext();
          if (ctx.industry && !state.leadData.industry) state.leadData.industry = ctx.industry;
        }

        state.history.push({ role: 'assistant', content: reply });
        flushSession();

        var bubble = document.createElement('div');
        bubble.className = 'cf-sc-bubble cf-sc-bubble-sophia';
        var msgs = $('cf-sc-msgs');
        if (msgs) { msgs.appendChild(bubble); msgs.scrollTop = msgs.scrollHeight; }

        state.isStreaming = true;
        streamText(bubble, reply, function () {
          state.isStreaming = false;
          setInputEnabled(true);
          if (data.intent) showContextualActions(data.intent);
          if (data.action) {
            if (data.action === 'capture_lead') setTimeout(showLeadCapture, 400);
            else if (data.action === 'show_booking') setTimeout(showBookingWidget, 400);
          }
        });
      })
      .catch(function () {
        hideTyping();
        state.isTyping = false;
        state.isStreaming = false;
        setInputEnabled(true);
        appendBubble('sophia', L(
          "Connection issue. You can also reach us at hello@carriersfy.ai or via WhatsApp.",
          'Problema de conexión. Contáctanos en hello@carriersfy.ai o por WhatsApp.',
          'Problema de conexão. Contate-nos em hello@carriersfy.ai ou via WhatsApp.'
        ));
      });
  }

  // ─── Modal Injection ──────────────────────────────────────────────────────
  function patchSophiaModal() {
    if (state.initialized) return;

    var dialog = document.getElementById('cf-sophia-dialog');
    if (!dialog) return;

    var existingContent = dialog.querySelector('div[style*="display:flex"][style*="flex-direction:column"]');
    var chatZone = document.createElement('div');
    chatZone.id = 'cf-sc-zone';
    chatZone.style.cssText = 'flex:1;display:flex;flex-direction:column;overflow:hidden;';

    if (existingContent) {
      existingContent.parentNode.replaceChild(chatZone, existingContent);
    } else {
      dialog.style.display = 'flex';
      dialog.style.flexDirection = 'column';
      dialog.appendChild(chatZone);
    }

    injectStyles();
    buildChatUI(chatZone);

    var waLink = document.getElementById('cf-sophia-whatsapp');
    if (waLink) { var wUrl = getWhatsAppUrl(); if (wUrl) waLink.href = wUrl; }

    state.initialized = true;
  }

  function observeForModal() {
    var _patchTimer = null;
    var observer = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var added = mutations[i].addedNodes;
        for (var j = 0; j < added.length; j++) {
          var node = added[j];
          if (node.nodeType === 1 && (node.id === 'cf-sophia-modal' || (node.querySelector && node.querySelector('#cf-sophia-dialog')))) {
            clearTimeout(_patchTimer);
            _patchTimer = setTimeout(patchSophiaModal, 50);
          }
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function init() {
    watchLanguageChanges();

    var waLink = document.getElementById('cf-sophia-whatsapp');
    if (waLink) { var wUrl = getWhatsAppUrl(); if (wUrl) waLink.href = wUrl; }

    if (document.getElementById('cf-sophia-dialog')) patchSophiaModal();
    observeForModal();

    var launcher = document.getElementById('cf-sophia-launcher');
    if (launcher) {
      launcher.addEventListener('click', function () {
        setTimeout(function () {
          if (!state.initialized && document.getElementById('cf-sophia-dialog')) patchSophiaModal();
        }, 100);
        setTimeout(function () {
          if (!state.initialized && document.getElementById('cf-sophia-dialog')) patchSophiaModal();
        }, 350);
      }, true);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

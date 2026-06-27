// Sophia Chat — Live AI Business Consultant for carriersfy.ai
// Connects to /api/chat (Cloudflare Pages Function with Anthropic AI).
// WhatsApp number and booking URL are loaded from /api/config → Cloudflare Pages env vars.
// No phone numbers, URLs, or webhooks are hardcoded in this file.

(function () {
  'use strict';

  // ─── WhatsApp URL ──────────────────────────────────────────────────────────

  function getWhatsAppUrl(contextMessage) {
    var phone = window.CF_SOPHIA_WHATSAPP_PHONE || null;
    if (!phone) return null;
    var defaultMsg = L(
      "Hi! I'm interested in learning more about Carriersfy AI Digital Employees.",
      '¡Hola! Me interesa saber más sobre los Empleados Digitales de Carriersfy AI.',
      'Olá! Tenho interesse em saber mais sobre os Funcionários Digitais da Carriersfy AI.'
    );
    return 'https://wa.me/' + phone + '?text=' + encodeURIComponent(contextMessage || defaultMsg);
  }

  // ─── Greetings ────────────────────────────────────────────────────────────

  var GREETINGS = {
    en: "Hi! I'm Sophia, Carriersfy AI's Chief AI Business Consultant. What type of business do you run? I'd love to show you exactly how a Digital Employee could transform it.",
    es: "¡Hola! Soy Sophia, Consultora de IA de Carriersfy AI. ¿Qué tipo de negocio tienes? Me encantaría mostrarte cómo un Empleado Digital puede transformarlo.",
    pt: "Olá! Sou Sophia, Consultora de IA da Carriersfy AI. Que tipo de negócio você tem? Adoraria te mostrar como um Funcionário Digital pode transformá-lo.",
  };

  // ─── State ────────────────────────────────────────────────────────────────

  var state = {
    history: [],
    visitorId: getVisitorId(),
    language: detectLanguage(),
    leadCaptured: false,
    isTyping: false,
    isStreaming: false,
    leadData: {
      name: null,
      email: null,
      phone: null,
      business: null,
      industry: null,
      problem: null,
      recommendedService: null,
      qualificationStage: null,
      urgency: null,
      lastIntent: null,
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
    } catch (_) {
      return 'v_' + Math.random().toString(36).slice(2);
    }
  }

  function detectLanguage() {
    // Priority 1: DC runtime sets document.documentElement.lang when language is changed
    var docLang = (document.documentElement.lang || '').toLowerCase();
    if (docLang === 'es' || docLang === 'pt' || docLang === 'en') return docLang;
    // Priority 2: DC runtime persists selection in localStorage with key 'cf_lang'
    try {
      var saved = localStorage.getItem('cf_lang');
      if (saved === 'es' || saved === 'pt' || saved === 'en') return saved;
    } catch (_) {}
    // Fallback: browser language (least reliable for multi-language sites)
    var nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    if (nav.startsWith('pt')) return 'pt';
    if (nav.startsWith('es')) return 'es';
    return 'en';
  }

  // Watches the DC runtime for language changes and keeps state.language in sync.
  // The DC runtime updates document.documentElement.lang via its applyLang() method.
  function watchLanguageChanges() {
    var observer = new MutationObserver(function () {
      var newLang = (document.documentElement.lang || '').toLowerCase();
      if ((newLang === 'en' || newLang === 'es' || newLang === 'pt') && newLang !== state.language) {
        state.language = newLang;
        // Update textarea placeholder to match new language
        var inp = document.getElementById('cf-sc-input');
        if (inp) inp.placeholder = L('Type your message...', 'Escribe tu mensaje...', 'Escreva sua mensagem...');
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  function $(id) { return document.getElementById(id); }

  function L(en, es, pt) {
    return state.language === 'es' ? es : state.language === 'pt' ? pt : en;
  }

  // Extract business/industry signals from conversation history
  function extractConversationContext() {
    var userMessages = state.history
      .filter(function (h) { return h.role === 'user'; })
      .map(function (h) { return h.content.toLowerCase(); })
      .join(' ');

    var industryMap = {
      'dental': ['dental', 'dentist', 'odontol', 'dent'],
      'medical': ['medical', 'clinic', 'doctor', 'physician', 'health'],
      'restaurant': ['restaurant', 'food', 'cafe', 'cafeteria', 'bar', 'catering'],
      'legal': ['law', 'attorney', 'lawyer', 'legal', 'firm'],
      'immigration': ['immigration', 'inmigra', 'visa', 'green card'],
      'real estate': ['real estate', 'realtor', 'property', 'homes', 'realt'],
      'construction': ['construction', 'contractor', 'roofing', 'hvac', 'plumbing'],
      'transportation': ['trucking', 'transport', 'logistics', 'dispatch', 'freight'],
      'insurance': ['insurance', 'seguro', 'policy'],
      'beauty': ['salon', 'spa', 'beauty', 'hair', 'nail'],
      'church': ['church', 'iglesia', 'faith', 'ministry', 'congregation'],
    };

    var detected = state.leadData.industry || null;
    if (!detected) {
      for (var ind in industryMap) {
        var keywords = industryMap[ind];
        for (var k = 0; k < keywords.length; k++) {
          if (userMessages.indexOf(keywords[k]) !== -1) {
            detected = ind;
            break;
          }
        }
        if (detected) break;
      }
    }

    return {
      industry: detected,
      name: state.leadData.name,
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
      if (ctx.name) msg += ' Me llamo ' + ctx.name + '.';
      if (ctx.industry) msg += ' Tengo un negocio de ' + ctx.industry + '.';
      msg += ' Me gustaría continuar nuestra conversación sobre los Empleados Digitales.';
    } else if (state.language === 'pt') {
      msg = 'Olá Sophia! Acabei de falar com você em carriersfy.ai.';
      if (ctx.name) msg += ' Meu nome é ' + ctx.name + '.';
      if (ctx.industry) msg += ' Tenho um negócio de ' + ctx.industry + '.';
      msg += ' Gostaria de continuar nossa conversa sobre os Funcionários Digitais.';
    } else {
      msg = 'Hi Sophia! I just spoke with you on carriersfy.ai.';
      if (ctx.name) msg += ' My name is ' + ctx.name + '.';
      if (ctx.industry) msg += ' I have a ' + ctx.industry + ' business.';
      msg += ' I\'d like to continue our conversation about Digital Employees for my business.';
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
      // Layout
      '#cf-sc-wrap{display:flex;flex-direction:column;height:100%;min-height:420px;max-height:min(680px,calc(100vh - 48px));font-family:Manrope,sans-serif;}',
      '#cf-sc-msgs{flex:1;overflow-y:auto;padding:20px 18px 8px;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth;}',
      '#cf-sc-msgs::-webkit-scrollbar{width:4px;}',
      '#cf-sc-msgs::-webkit-scrollbar-track{background:transparent;}',
      '#cf-sc-msgs::-webkit-scrollbar-thumb{background:rgba(255,255,255,.15);border-radius:4px;}',

      // Bubbles
      '.cf-sc-bubble{max-width:82%;padding:12px 15px;border-radius:16px;font-size:14px;line-height:1.6;word-break:break-word;animation:cfscfadein .2s ease;}',
      '.cf-sc-bubble-sophia{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.11);color:#F4F6FB;align-self:flex-start;border-bottom-left-radius:5px;}',
      '.cf-sc-bubble-user{background:linear-gradient(135deg,rgba(31,162,255,.22),rgba(255,46,60,.18));border:1px solid rgba(31,162,255,.25);color:#F4F6FB;align-self:flex-end;border-bottom-right-radius:5px;}',

      // Streaming cursor
      '.cf-sc-bubble-sophia.streaming::after{content:"|";animation:cfsc-blink .7s step-end infinite;color:#1FA2FF;margin-left:1px;}',
      '@keyframes cfsc-blink{0%,100%{opacity:1;}50%{opacity:0;}}',

      // Typing indicator
      '.cf-sc-typing{display:flex;align-items:center;gap:5px;padding:12px 15px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.11);border-radius:16px;border-bottom-left-radius:5px;align-self:flex-start;}',
      '.cf-sc-dot{width:7px;height:7px;border-radius:50%;background:rgba(244,246,251,.45);animation:cfsc-bounce 1.2s ease-in-out infinite;}',
      '.cf-sc-dot:nth-child(2){animation-delay:.2s;}',
      '.cf-sc-dot:nth-child(3){animation-delay:.4s;}',
      '@keyframes cfsc-bounce{0%,80%,100%{transform:translateY(0);}40%{transform:translateY(-6px);}}',
      '@keyframes cfscfadein{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:none;}}',

      // Action bar
      '#cf-sc-actions{padding:0 18px 10px;display:flex;flex-wrap:wrap;gap:8px;}',
      '.cf-sc-action{flex:1 1 auto;min-width:120px;padding:10px 14px;border-radius:11px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.04);color:#F4F6FB;font-family:Manrope,sans-serif;font-size:13px;font-weight:700;cursor:pointer;text-align:center;transition:background .18s,border-color .18s;}',
      '.cf-sc-action:hover{background:rgba(255,255,255,.09);border-color:rgba(255,255,255,.22);}',
      '.cf-sc-action-wa{background:rgba(37,211,102,.1);border-color:rgba(37,211,102,.3);color:#35D6A0;}',
      '.cf-sc-action-wa:hover{background:rgba(37,211,102,.18);}',
      '.cf-sc-action-call{background:rgba(31,162,255,.1);border-color:rgba(31,162,255,.3);color:#1FA2FF;}',
      '.cf-sc-action-call:hover{background:rgba(31,162,255,.18);}',
      '.cf-sc-action-book{background:rgba(53,214,160,.1);border-color:rgba(53,214,160,.3);color:#35D6A0;}',
      '.cf-sc-action-book:hover{background:rgba(53,214,160,.18);}',
      '.cf-sc-action-emp{background:rgba(31,162,255,.07);border-color:rgba(31,162,255,.2);color:#7CC8FF;}',
      '.cf-sc-action-app{background:rgba(255,46,60,.07);border-color:rgba(255,46,60,.2);color:#FF7A83;}',

      // Input area
      '#cf-sc-input-area{padding:12px 18px 16px;border-top:1px solid rgba(255,255,255,.08);display:flex;gap:10px;align-items:flex-end;}',
      '#cf-sc-input{flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.13);border-radius:12px;color:#F4F6FB;font-family:Manrope,sans-serif;font-size:14px;padding:11px 14px;resize:none;outline:none;min-height:44px;max-height:100px;line-height:1.45;transition:border-color .18s;}',
      '#cf-sc-input::placeholder{color:rgba(244,246,251,.35);}',
      '#cf-sc-input:focus{border-color:rgba(31,162,255,.5);}',
      '#cf-sc-send{width:44px;height:44px;min-width:44px;border-radius:11px;background:linear-gradient(135deg,#1FA2FF,#FF2E3C);border:0;color:#fff;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:filter .18s,transform .18s;}',
      '#cf-sc-send:hover{filter:brightness(1.1);transform:translateY(-1px);}',
      '#cf-sc-send:disabled{opacity:.45;cursor:default;transform:none;}',

      // Lead capture form (inline in chat)
      '.cf-sc-lead-form{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.11);border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:9px;margin-top:4px;width:100%;box-sizing:border-box;animation:cfscfadein .25s ease;}',
      '.cf-sc-lead-input{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.13);border-radius:9px;color:#F4F6FB;font-family:Manrope,sans-serif;font-size:13px;padding:9px 12px;outline:none;transition:border-color .18s;width:100%;box-sizing:border-box;}',
      '.cf-sc-lead-input::placeholder{color:rgba(244,246,251,.35);}',
      '.cf-sc-lead-input:focus{border-color:rgba(31,162,255,.5);}',
      '.cf-sc-lead-input.error{border-color:#FF2E3C;}',
      '.cf-sc-lead-submit{background:linear-gradient(135deg,#1FA2FF,#FF2E3C);border:0;border-radius:9px;color:#fff;font-family:Manrope,sans-serif;font-size:13px;font-weight:800;padding:10px;cursor:pointer;transition:filter .18s;width:100%;}',
      '.cf-sc-lead-submit:hover{filter:brightness(1.1);}',
      '.cf-sc-lead-submit:disabled{opacity:.5;cursor:default;}',

      // Calendar booking widget (inline)
      '.cf-sc-booking{background:rgba(53,214,160,.06);border:1px solid rgba(53,214,160,.2);border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:10px;margin-top:4px;animation:cfscfadein .25s ease;}',
      '.cf-sc-booking-title{font-size:13px;font-weight:700;color:#35D6A0;letter-spacing:.04em;}',
      '.cf-sc-booking-desc{font-size:12.5px;color:rgba(244,246,251,.6);line-height:1.5;}',
      '.cf-sc-booking-btn{background:linear-gradient(135deg,#35D6A0,#1FA2FF);border:0;border-radius:9px;color:#070B16;font-family:Manrope,sans-serif;font-size:13px;font-weight:800;padding:11px 16px;cursor:pointer;transition:filter .18s;text-decoration:none;display:block;text-align:center;}',
      '.cf-sc-booking-btn:hover{filter:brightness(1.08);}',

      // Mobile
      '@media(max-width:640px){#cf-sc-wrap{min-height:100%;max-height:100%;}.cf-sc-bubble{max-width:90%;}}',
    ].join('');
    document.head.appendChild(style);
  }

  // ─── Chat UI ──────────────────────────────────────────────────────────────

  function buildChatUI(container) {
    container.innerHTML = [
      '<div id="cf-sc-wrap">',
      '  <div id="cf-sc-msgs"></div>',
      '  <div id="cf-sc-actions">',
      '    <button class="cf-sc-action cf-sc-action-wa" data-action="whatsapp">🟢 WhatsApp</button>',
      '    <button class="cf-sc-action cf-sc-action-call" data-action="strategy_call">📞 Strategy Call</button>',
      '  </div>',
      '  <div id="cf-sc-input-area">',
      '    <textarea id="cf-sc-input" placeholder="' + L('Type your message...', 'Escribe tu mensaje...', 'Escreva sua mensagem...') + '" rows="1" aria-label="Message Sophia"></textarea>',
      '    <button id="cf-sc-send" aria-label="Send">&#10148;</button>',
      '  </div>',
      '</div>',
    ].join('');

    var input = $('cf-sc-input');
    var send = $('cf-sc-send');

    send.addEventListener('click', function () { submitInput(); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitInput(); }
    });
    input.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 100) + 'px';
    });

    $('cf-sc-actions').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action]');
      if (btn) handleAction(btn.getAttribute('data-action'));
    });

    // Show greeting immediately
    appendBubble('sophia', GREETINGS[state.language] || GREETINGS.en);
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

  // Word-by-word streaming reveal — feels like ChatGPT/WhatsApp typing
  function streamText(el, text, onDone) {
    if (!el) { if (onDone) onDone(); return; }
    el.classList.add('streaming');
    el.textContent = '';

    // Split into words (keeping spaces as tokens)
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

      // Natural pacing: fast for words, brief pause at punctuation
      var lastChar = tokens[i - 1].trimEnd().slice(-1);
      var delay = 18;
      if (lastChar === '.' || lastChar === '!' || lastChar === '?') delay = 230;
      else if (lastChar === ',' || lastChar === ';' || lastChar === ':') delay = 75;
      else if (tokens[i - 1] === '\n' || tokens[i - 1] === '\n\n') delay = 120;

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

  // ─── Calendar Widget ──────────────────────────────────────────────────────

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
        '<div class="cf-sc-booking-desc">' + L(
          '30 minutes · No obligation · Video call',
          '30 minutos · Sin compromiso · Videollamada',
          '30 minutos · Sem compromisso · Videochamada'
        ) + '</div>',
        '<a href="' + bookingUrl + '" target="_blank" rel="noopener noreferrer" class="cf-sc-booking-btn">' +
          L('Book My Free Call →', 'Reservar Mi Llamada Gratuita →', 'Agendar Minha Chamada Gratuita →') +
        '</a>',
      ].join('');
    } else {
      widget.innerHTML = [
        '<div class="cf-sc-booking-title">📅 ' + L('Book a Strategy Call', 'Reservar una Llamada', 'Agendar uma Chamada') + '</div>',
        '<div class="cf-sc-booking-desc">' + L(
          'Leave your info and our team will schedule a call with you.',
          'Deja tu información y nuestro equipo coordinará una llamada contigo.',
          'Deixe suas informações e nossa equipe agendará uma chamada com você.'
        ) + '</div>',
        '<button class="cf-sc-booking-btn" id="cf-sc-book-fallback">' +
          L('Get in Touch →', 'Contactar →', 'Entrar em Contato →') +
        '</button>',
      ].join('');
    }

    msgs.appendChild(widget);
    msgs.scrollTop = msgs.scrollHeight;

    if (!bookingUrl) {
      var fallbackBtn = $('cf-sc-book-fallback');
      if (fallbackBtn) {
        fallbackBtn.addEventListener('click', function () {
          showLeadCapture();
        });
      }
    }
  }

  // ─── Contextual Action Buttons ────────────────────────────────────────────

  function showContextualActions(intent) {
    var acts = $('cf-sc-actions');
    if (!acts) return;
    acts.querySelectorAll('[data-contextual]').forEach(function (b) { b.parentNode.removeChild(b); });

    if (intent === 'employee_builder') {
      var btn = document.createElement('button');
      btn.className = 'cf-sc-action cf-sc-action-emp';
      btn.setAttribute('data-action', 'open_employee_builder');
      btn.setAttribute('data-contextual', '1');
      btn.textContent = '🤖 ' + L('Build AI Employee', 'Crear Empleado IA', 'Criar Funcionário IA');
      acts.appendChild(btn);
    } else if (intent === 'app_builder') {
      var btn2 = document.createElement('button');
      btn2.className = 'cf-sc-action cf-sc-action-app';
      btn2.setAttribute('data-action', 'open_app_builder');
      btn2.setAttribute('data-contextual', '1');
      btn2.textContent = '🏗️ ' + L('Build My App', 'Crear Mi App', 'Criar Meu App');
      acts.appendChild(btn2);
    } else if (intent === 'schedule_call' || intent === 'show_calendar') {
      var btn3 = document.createElement('button');
      btn3.className = 'cf-sc-action cf-sc-action-book';
      btn3.setAttribute('data-action', 'show_booking');
      btn3.setAttribute('data-contextual', '1');
      btn3.textContent = '📅 ' + L('Book a Call', 'Reservar una Llamada', 'Agendar uma Chamada');
      acts.appendChild(btn3);
    } else if (intent === 'whatsapp_handoff') {
      var btn4 = document.createElement('button');
      btn4.className = 'cf-sc-action cf-sc-action-wa';
      btn4.setAttribute('data-action', 'whatsapp_with_context');
      btn4.setAttribute('data-contextual', '1');
      btn4.textContent = '🟢 ' + L('Continue on WhatsApp', 'Continuar en WhatsApp', 'Continuar no WhatsApp');
      acts.appendChild(btn4);
    }
  }

  // ─── Lead Capture Form (inline in chat) ───────────────────────────────────

  function showLeadCapture() {
    if (state.leadCaptured) return;
    var msgs = $('cf-sc-msgs');
    if (!msgs) return;

    var promptText = L(
      "I'd love to follow up with some info tailored to your business. Could I get your name, email, and the best number to reach you?",
      'Me gustaría enviarte información personalizada para tu negocio. ¿Puedo obtener tu nombre, correo y teléfono?',
      'Adoraria enviar informações personalizadas para o seu negócio. Posso obter seu nome, e-mail e telefone?'
    );
    appendBubble('sophia', promptText);

    var ctx = extractConversationContext();

    var form = document.createElement('div');
    form.className = 'cf-sc-lead-form';
    form.innerHTML = [
      '<input class="cf-sc-lead-input" id="cf-sc-ln" type="text" placeholder="' + L('Your name', 'Tu nombre', 'Seu nome') + '" value="' + (ctx.name ? ctx.name : '') + '" autocomplete="name" />',
      '<input class="cf-sc-lead-input" id="cf-sc-lb" type="text" placeholder="' + L('Your business', 'Tu empresa', 'Sua empresa') + '" autocomplete="organization" />',
      '<input class="cf-sc-lead-input" id="cf-sc-le" type="email" placeholder="' + L('Your email', 'Tu email', 'Seu e-mail') + '" autocomplete="email" />',
      '<input class="cf-sc-lead-input" id="cf-sc-lp" type="tel" placeholder="' + L('Phone (optional)', 'Teléfono (opcional)', 'Telefone (opcional)') + '" autocomplete="tel" />',
      '<button class="cf-sc-lead-submit" id="cf-sc-ls">' + L('Send →', 'Enviar →', 'Enviar →') + '</button>',
    ].join('');
    msgs.appendChild(form);
    msgs.scrollTop = msgs.scrollHeight;

    $('cf-sc-ls').addEventListener('click', function () {
      var nameEl = $('cf-sc-ln');
      var bizEl = $('cf-sc-lb');
      var emailEl = $('cf-sc-le');
      var phoneEl = $('cf-sc-lp');

      var name = (nameEl ? nameEl.value : '').trim();
      var biz = (bizEl ? bizEl.value : '').trim();
      var email = (emailEl ? emailEl.value : '').trim();
      var phone = (phoneEl ? phoneEl.value : '').trim();

      var valid = true;
      if (!name) { if (nameEl) nameEl.classList.add('error'); valid = false; }
      else { if (nameEl) nameEl.classList.remove('error'); }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (emailEl) emailEl.classList.add('error');
        valid = false;
      } else { if (emailEl) emailEl.classList.remove('error'); }

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
      name: data.name,
      business: data.business || '',
      email: data.email,
      phone: data.phone || '',
      industry: ctx.industry || state.leadData.industry || '',
      problem: ctx.problem || state.leadData.problem || '',
      recommendedService: ctx.recommendedService || state.leadData.recommendedService || '',
      qualificationStage: ctx.qualificationStage || state.leadData.qualificationStage || 'interested',
      urgency: ctx.urgency || state.leadData.urgency || '',
      transcript: buildTranscript(),
      message: 'Sophia Chat — lead captured after ' + state.history.length + ' messages.',
      sophiaPipeline: {
        owner: 'Sophia',
        intent: state.leadData.lastIntent || 'Website Chat',
        status: 'new',
        routingQueue: 'carriersfy-ai-inbound-leads',
        crmStatus: 'sophia-submitted',
        whatsappStatus: 'prepared',
        appointmentStatus: 'pending',
      },
    };

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(function () {
        state.leadCaptured = true;
        state.leadData.name = data.name;
        state.leadData.email = data.email;
        if (formEl && formEl.parentNode) formEl.parentNode.removeChild(formEl);

        var thanks = L(
          "Thank you, " + data.name.split(' ')[0] + "! Our team will reach out personally. Is there anything else I can help you with?",
          "¡Gracias, " + data.name.split(' ')[0] + "! Nuestro equipo se pondrá en contacto contigo. ¿Puedo ayudarte con algo más?",
          "Obrigada, " + data.name.split(' ')[0] + "! Nossa equipe entrará em contato. Posso ajudar com mais alguma coisa?"
        );

        var div = appendBubble('sophia', '');
        if (div) streamText(div, thanks);

        // After lead is captured, offer to book a call
        setTimeout(function () {
          var cfg = window.CF_SOPHIA_CONFIG || {};
          if (cfg.bookingUrl && !$('cf-sc-booking-offered')) {
            var offerDiv = document.createElement('div');
            offerDiv.id = 'cf-sc-booking-offered';
            offerDiv.className = 'cf-sc-bubble cf-sc-bubble-sophia';
            offerDiv.textContent = L(
              'Want to book a Strategy Call while we\'re here? It\'s free and only 30 minutes.',
              '¿Quieres reservar una Llamada Estratégica ahora mismo? Es gratuita y solo 30 minutos.',
              'Quer agendar uma Chamada Estratégica agora? É gratuita e leva apenas 30 minutos.'
            );
            var msgs = $('cf-sc-msgs');
            if (msgs) { msgs.appendChild(offerDiv); msgs.scrollTop = msgs.scrollHeight; }
            setTimeout(showBookingWidget, 400);
          }
        }, 2200);
      })
      .catch(function () {
        var fallback = L(
          'There was a brief issue. Please reach us directly at hello@carriersfy.ai.',
          'Hubo un problema. Por favor contáctanos en hello@carriersfy.ai.',
          'Houve um problema. Por favor contate-nos em hello@carriersfy.ai.'
        );
        appendBubble('sophia', fallback);
        var submitBtn = $('cf-sc-ls');
        if (submitBtn) submitBtn.disabled = false;
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
      case 'show_booking': {
        showBookingWidget();
        break;
      }
      case 'whatsapp':
      case 'open_whatsapp': {
        var waUrl = getWhatsAppUrl();
        if (waUrl) {
          window.open(waUrl, '_blank', 'noopener,noreferrer');
        } else {
          showLeadCapture();
        }
        break;
      }
      case 'whatsapp_with_context': {
        var ctxUrl = buildWhatsAppHandoffUrl();
        if (ctxUrl) {
          window.open(ctxUrl, '_blank', 'noopener,noreferrer');
        } else {
          var waFallbackClose = document.getElementById('cf-sophia-close');
          if (waFallbackClose) waFallbackClose.click();
          var contactEl = document.getElementById('contact');
          if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      }
      case 'capture_lead': {
        showLeadCapture();
        break;
      }
      case 'open_employee_builder': {
        var factBtn = document.querySelector('[data-employee-factory-open]');
        if (factBtn) { factBtn.click(); } else {
          var factEl = document.getElementById('digital-employee-factory');
          if (factEl) factEl.scrollIntoView({ behavior: 'smooth' });
        }
        var cClose = document.getElementById('cf-sophia-close');
        if (cClose) cClose.click();
        break;
      }
      case 'open_app_builder': {
        var appBtn = document.querySelector('[data-app-builder-open]');
        if (appBtn) { appBtn.click(); } else {
          var appEl = document.getElementById('app-builder');
          if (appEl) appEl.scrollIntoView({ behavior: 'smooth' });
        }
        var aClose = document.getElementById('cf-sophia-close');
        if (aClose) aClose.click();
        break;
      }
    }
  }

  // ─── Message Send ─────────────────────────────────────────────────────────

  function setInputEnabled(enabled) {
    var send = $('cf-sc-send');
    var input = $('cf-sc-input');
    if (send) send.disabled = !enabled;
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

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: msg,
        history: state.history.slice(-8),
        visitorId: state.visitorId,
        language: state.language,
      }),
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        hideTyping();
        state.isTyping = false;

        var reply = data.response || L(
          "I'm having a brief issue. Please try again or reach us at hello@carriersfy.ai.",
          'Tuve un problema. Inténtalo de nuevo o escríbenos a hello@carriersfy.ai.',
          'Tive um problema. Tente novamente ou escreva para hello@carriersfy.ai.'
        );

        // Update lead data from intent context
        if (data.intent) {
          state.leadData.lastIntent = data.intent;

          // Detect industry from conversation context
          var ctx = extractConversationContext();
          if (ctx.industry && !state.leadData.industry) {
            state.leadData.industry = ctx.industry;
          }
        }

        // Add to history immediately (before streaming)
        state.history.push({ role: 'assistant', content: reply });

        // Stream the response word-by-word
        var bubble = document.createElement('div');
        bubble.className = 'cf-sc-bubble cf-sc-bubble-sophia';
        var msgs = $('cf-sc-msgs');
        if (msgs) { msgs.appendChild(bubble); msgs.scrollTop = msgs.scrollHeight; }

        state.isStreaming = true;
        streamText(bubble, reply, function () {
          state.isStreaming = false;
          setInputEnabled(true);

          // After streaming: show contextual buttons + trigger actions
          if (data.intent) showContextualActions(data.intent);

          if (data.action) {
            if (data.action === 'capture_lead') {
              setTimeout(showLeadCapture, 400);
            } else if (data.action === 'show_booking') {
              setTimeout(showBookingWidget, 400);
            } else if (data.action === 'open_whatsapp') {
              // Don't auto-open WhatsApp — the contextual button handles it
            }
          }
        });
      })
      .catch(function () {
        hideTyping();
        state.isTyping = false;
        state.isStreaming = false;
        setInputEnabled(true);
        var errMsg = L(
          "I'm having a brief connection issue. You can reach us at hello@carriersfy.ai or via WhatsApp.",
          'Tengo un problema de conexión. Contáctanos en hello@carriersfy.ai o por WhatsApp.',
          'Tive um problema de conexão. Contate-nos em hello@carriersfy.ai ou via WhatsApp.'
        );
        appendBubble('sophia', errMsg);
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

    // Patch static WhatsApp link if it still exists in the modal header
    var waLink = document.getElementById('cf-sophia-whatsapp');
    if (waLink) {
      var waLinkUrl = getWhatsAppUrl();
      if (waLinkUrl) waLink.href = waLinkUrl;
    }

    state.initialized = true;
  }

  function observeForModal() {
    var observer = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var added = mutations[i].addedNodes;
        for (var j = 0; j < added.length; j++) {
          var node = added[j];
          if (node.id === 'cf-sophia-modal' || (node.querySelector && node.querySelector('#cf-sophia-dialog'))) {
            setTimeout(patchSophiaModal, 50);
          }
        }
      }
      if (document.getElementById('cf-sophia-dialog') && !state.initialized) {
        setTimeout(patchSophiaModal, 50);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function init() {
    // Start watching for DC runtime language changes immediately
    watchLanguageChanges();

    // Patch any static WhatsApp link immediately
    var waLink = document.getElementById('cf-sophia-whatsapp');
    if (waLink) {
      var initWaUrl = getWhatsAppUrl();
      if (initWaUrl) waLink.href = initWaUrl;
    }

    if (document.getElementById('cf-sophia-dialog')) {
      patchSophiaModal();
    }

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

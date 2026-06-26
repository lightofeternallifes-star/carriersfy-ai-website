// Sophia Chat — Live AI Business Consultant for carriersfy.ai
// Enhances the existing Sophia modal with a real conversational AI interface.
// Connects to /api/chat (Cloudflare Pages Function).
//
// TODO: Replace WHATSAPP_PHONE_NUMBER below with your actual WhatsApp Business number (digits only, no + or spaces).
// Example: '15551234567' for a US number.

(function () {
  'use strict';

  var WHATSAPP_DEFAULT_MESSAGE = "Hi! I'm interested in learning more about Carriersfy AI Digital Employees.";

  function getWhatsAppUrl() {
    var phone = window.CF_SOPHIA_WHATSAPP_PHONE || null;
    if (!phone) return null;
    return 'https://wa.me/' + phone + '?text=' + encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE);
  }

  var GREETINGS = {
    pt: "Olá! Sou Sophia, a Chief AI Business Consultant da Carriersfy AI. Como posso ajudar o seu negócio hoje?",
    es: "¡Hola! Soy Sophia, la Chief AI Business Consultant de Carriersfy AI. ¿En qué puedo ayudarte hoy?",
    en: "Hi! I'm Sophia, Carriersfy AI's Chief AI Business Consultant. What brings you here today — are you looking to automate communications, explore our Digital Employees, or build a custom app?",
  };

  var state = {
    history: [],
    visitorId: getVisitorId(),
    language: detectLanguage(),
    leadCaptured: false,
    isTyping: false,
    leadData: {},
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
    var lang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    if (lang.startsWith('pt')) return 'pt';
    if (lang.startsWith('es')) return 'es';
    return 'en';
  }

  function escHtml(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function $(id) { return document.getElementById(id); }

  // ─── Styles ───────────────────────────────────────────────────────────────

  function injectStyles() {
    if ($('cf-sophia-chat-styles')) return;
    var style = document.createElement('style');
    style.id = 'cf-sophia-chat-styles';
    style.textContent = [
      '#cf-sc-wrap{display:flex;flex-direction:column;height:100%;min-height:420px;max-height:min(680px,calc(100vh - 48px));font-family:Manrope,sans-serif;}',
      '#cf-sc-msgs{flex:1;overflow-y:auto;padding:20px 18px 8px;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth;}',
      '#cf-sc-msgs::-webkit-scrollbar{width:4px;}',
      '#cf-sc-msgs::-webkit-scrollbar-track{background:transparent;}',
      '#cf-sc-msgs::-webkit-scrollbar-thumb{background:rgba(255,255,255,.15);border-radius:4px;}',
      '.cf-sc-bubble{max-width:82%;padding:12px 15px;border-radius:16px;font-size:14px;line-height:1.55;word-break:break-word;animation:cfscfadein .22s ease;}',
      '.cf-sc-bubble-sophia{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.11);color:#F4F6FB;align-self:flex-start;border-bottom-left-radius:5px;}',
      '.cf-sc-bubble-user{background:linear-gradient(135deg,rgba(31,162,255,.22),rgba(255,46,60,.18));border:1px solid rgba(31,162,255,.25);color:#F4F6FB;align-self:flex-end;border-bottom-right-radius:5px;}',
      '.cf-sc-typing{display:flex;align-items:center;gap:5px;padding:12px 15px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.11);border-radius:16px;border-bottom-left-radius:5px;align-self:flex-start;}',
      '.cf-sc-dot{width:7px;height:7px;border-radius:50%;background:rgba(244,246,251,.45);animation:cfsc-bounce 1.2s ease-in-out infinite;}',
      '.cf-sc-dot:nth-child(2){animation-delay:.2s;}',
      '.cf-sc-dot:nth-child(3){animation-delay:.4s;}',
      '@keyframes cfsc-bounce{0%,80%,100%{transform:translateY(0);}40%{transform:translateY(-6px);}}',
      '@keyframes cfscfadein{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:none;}}',
      '#cf-sc-actions{padding:0 18px 10px;display:flex;flex-wrap:wrap;gap:8px;}',
      '.cf-sc-action{flex:1 1 auto;min-width:120px;padding:10px 14px;border-radius:11px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.04);color:#F4F6FB;font-family:Manrope,sans-serif;font-size:13px;font-weight:700;cursor:pointer;text-align:center;transition:background .18s,border-color .18s;}',
      '.cf-sc-action:hover{background:rgba(255,255,255,.09);border-color:rgba(255,255,255,.22);}',
      '.cf-sc-action-wa{background:rgba(37,211,102,.1);border-color:rgba(37,211,102,.3);color:#35D6A0;}',
      '.cf-sc-action-wa:hover{background:rgba(37,211,102,.18);}',
      '.cf-sc-action-call{background:rgba(31,162,255,.1);border-color:rgba(31,162,255,.3);color:#1FA2FF;}',
      '.cf-sc-action-call:hover{background:rgba(31,162,255,.18);}',
      '.cf-sc-action-emp{background:rgba(31,162,255,.07);border-color:rgba(31,162,255,.2);color:#7CC8FF;}',
      '.cf-sc-action-app{background:rgba(255,46,60,.07);border-color:rgba(255,46,60,.2);color:#FF7A83;}',
      '#cf-sc-input-area{padding:12px 18px 16px;border-top:1px solid rgba(255,255,255,.08);display:flex;gap:10px;align-items:flex-end;}',
      '#cf-sc-input{flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.13);border-radius:12px;color:#F4F6FB;font-family:Manrope,sans-serif;font-size:14px;padding:11px 14px;resize:none;outline:none;min-height:44px;max-height:100px;line-height:1.45;transition:border-color .18s;}',
      '#cf-sc-input::placeholder{color:rgba(244,246,251,.35);}',
      '#cf-sc-input:focus{border-color:rgba(31,162,255,.5);}',
      '#cf-sc-send{width:44px;height:44px;min-width:44px;border-radius:11px;background:linear-gradient(135deg,#1FA2FF,#FF2E3C);border:0;color:#fff;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:filter .18s,transform .18s;}',
      '#cf-sc-send:hover{filter:brightness(1.1);transform:translateY(-1px);}',
      '#cf-sc-send:disabled{opacity:.45;cursor:default;transform:none;}',
      '.cf-sc-lead-form{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.11);border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:9px;margin-top:4px;width:100%;box-sizing:border-box;}',
      '.cf-sc-lead-input{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.13);border-radius:9px;color:#F4F6FB;font-family:Manrope,sans-serif;font-size:13px;padding:9px 12px;outline:none;transition:border-color .18s;}',
      '.cf-sc-lead-input::placeholder{color:rgba(244,246,251,.35);}',
      '.cf-sc-lead-input:focus{border-color:rgba(31,162,255,.5);}',
      '.cf-sc-lead-submit{background:linear-gradient(135deg,#1FA2FF,#FF2E3C);border:0;border-radius:9px;color:#fff;font-family:Manrope,sans-serif;font-size:13px;font-weight:800;padding:10px;cursor:pointer;transition:filter .18s;}',
      '.cf-sc-lead-submit:hover{filter:brightness(1.1);}',
      '.cf-sc-lead-submit:disabled{opacity:.5;cursor:default;}',
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
      '    <button class="cf-sc-action cf-sc-action-wa" data-action="whatsapp">💬 WhatsApp</button>',
      '    <button class="cf-sc-action cf-sc-action-call" data-action="strategy_call">📞 Strategy Call</button>',
      '  </div>',
      '  <div id="cf-sc-input-area">',
      '    <textarea id="cf-sc-input" placeholder="' + (state.language === 'pt' ? 'Escreva sua mensagem...' : state.language === 'es' ? 'Escribe tu mensaje...' : 'Type your message...') + '" rows="1" aria-label="Message Sophia"></textarea>',
      '    <button id="cf-sc-send" aria-label="Send">&#10148;</button>',
      '  </div>',
      '</div>',
    ].join('');

    // Wire events
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

    // Action button listeners (delegated)
    $('cf-sc-actions').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action]');
      if (btn) handleAction(btn.getAttribute('data-action'));
    });

    // Show greeting
    appendBubble('sophia', GREETINGS[state.language] || GREETINGS.en);
  }

  function appendBubble(role, text) {
    var msgs = $('cf-sc-msgs');
    if (!msgs) return;
    var div = document.createElement('div');
    div.className = 'cf-sc-bubble cf-sc-bubble-' + (role === 'sophia' ? 'sophia' : 'user');
    div.textContent = text;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return div;
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

  function showContextualActions(intent) {
    var acts = $('cf-sc-actions');
    if (!acts) return;
    // Remove old contextual buttons (keep wa + call)
    acts.querySelectorAll('[data-contextual]').forEach(function (b) { b.parentNode.removeChild(b); });
    if (intent === 'employee_builder') {
      var btn = document.createElement('button');
      btn.className = 'cf-sc-action cf-sc-action-emp';
      btn.setAttribute('data-action', 'open_employee_builder');
      btn.setAttribute('data-contextual', '1');
      btn.textContent = '🤖 Build AI Employee';
      acts.appendChild(btn);
    } else if (intent === 'app_builder') {
      var btn2 = document.createElement('button');
      btn2.className = 'cf-sc-action cf-sc-action-app';
      btn2.setAttribute('data-action', 'open_app_builder');
      btn2.setAttribute('data-contextual', '1');
      btn2.textContent = '🏗️ Build My App';
      acts.appendChild(btn2);
    }
  }

  // ─── Lead Capture ─────────────────────────────────────────────────────────

  function showLeadCapture() {
    if (state.leadCaptured) return;
    var msgs = $('cf-sc-msgs');
    if (!msgs) return;

    var promptText = state.language === 'pt'
      ? 'Para enviar informações personalizadas para você, posso pegar seu nome e e-mail?'
      : state.language === 'es'
        ? 'Para enviarte información personalizada, ¿puedo obtener tu nombre y correo electrónico?'
        : "I'd love to send you some tailored information. Could I get your name and email?";

    appendBubble('sophia', promptText);

    var form = document.createElement('div');
    form.className = 'cf-sc-lead-form';
    form.innerHTML = [
      '<input class="cf-sc-lead-input" id="cf-sc-lead-name" type="text" placeholder="' + (state.language === 'pt' ? 'Seu nome' : state.language === 'es' ? 'Tu nombre' : 'Your name') + '" />',
      '<input class="cf-sc-lead-input" id="cf-sc-lead-biz" type="text" placeholder="' + (state.language === 'pt' ? 'Sua empresa' : state.language === 'es' ? 'Tu empresa' : 'Your business') + '" />',
      '<input class="cf-sc-lead-input" id="cf-sc-lead-email" type="email" placeholder="' + (state.language === 'pt' ? 'Seu e-mail' : state.language === 'es' ? 'Tu email' : 'Your email') + '" />',
      '<button class="cf-sc-lead-submit" id="cf-sc-lead-submit">' + (state.language === 'pt' ? 'Enviar →' : state.language === 'es' ? 'Enviar →' : 'Send →') + '</button>',
    ].join('');
    msgs.appendChild(form);
    msgs.scrollTop = msgs.scrollHeight;

    $('cf-sc-lead-submit').addEventListener('click', function () {
      var name = ($('cf-sc-lead-name') || {}).value || '';
      var biz = ($('cf-sc-lead-biz') || {}).value || '';
      var email = ($('cf-sc-lead-email') || {}).value || '';
      if (!name.trim() || !email.trim() || !/\S+@\S+\.\S+/.test(email)) {
        $('cf-sc-lead-email').style.borderColor = '#FF2E3C';
        return;
      }
      $('cf-sc-lead-submit').disabled = true;
      submitLead({ name: name.trim(), business: biz.trim(), email: email.trim() }, form);
    });
  }

  function submitLead(data, formEl) {
    var summary = state.history.slice(-6).map(function (h) {
      return (h.role === 'user' ? 'Visitor: ' : 'Sophia: ') + h.content;
    }).join('\n');

    var payload = {
      name: data.name,
      business: data.business || '',
      email: data.email,
      industry: state.leadData.industry || '',
      message: 'Chat conversation summary:\n' + summary,
      sophiaPipeline: {
        owner: 'Sophia',
        intent: state.leadData.lastIntent || 'Website Chat',
        status: 'new',
        routingQueue: 'carriersfy-ai-inbound-leads',
        crmStatus: 'prepared_not_connected',
        whatsappStatus: 'prepared_not_connected',
        appointmentStatus: 'prepared_not_connected',
      },
    };

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(function (res) {
      state.leadCaptured = true;
      if (formEl && formEl.parentNode) formEl.parentNode.removeChild(formEl);
      var thanks = state.language === 'pt'
        ? 'Obrigada! Nossa equipe entrará em contato em breve. Posso ajudar com mais alguma coisa?'
        : state.language === 'es'
          ? '¡Gracias! Nuestro equipo se pondrá en contacto pronto. ¿Puedo ayudarte con algo más?'
          : 'Thank you! You\'ll hear from us soon. Is there anything else I can help with?';
      appendBubble('sophia', thanks);
    }).catch(function () {
      var fallback = state.language === 'pt'
        ? 'Ocorreu um problema. Por favor, entre em contato pelo hello@carriersfy.ai.'
        : 'There was an issue submitting your info. Please reach us at hello@carriersfy.ai.';
      appendBubble('sophia', fallback);
    });
  }

  // ─── Action Handler ───────────────────────────────────────────────────────

  function handleAction(action) {
    switch (action) {
      case 'scroll_to_contact':
      case 'strategy_call': {
        var target = document.getElementById('contact') || document.querySelector('[id*="contact"]');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
        // Close modal
        var closeBtn = document.getElementById('cf-sophia-close');
        if (closeBtn) closeBtn.click();
        break;
      }
      case 'open_employee_builder': {
        var factBtn = document.querySelector('[data-employee-factory-open]');
        if (factBtn) { factBtn.click(); } else {
          var factEl = document.getElementById('digital-employee-factory');
          if (factEl) factEl.scrollIntoView({ behavior: 'smooth' });
        }
        var close2 = document.getElementById('cf-sophia-close');
        if (close2) close2.click();
        break;
      }
      case 'open_app_builder': {
        var appBtn = document.querySelector('[data-app-builder-open]');
        if (appBtn) { appBtn.click(); } else {
          var appEl = document.getElementById('app-builder');
          if (appEl) appEl.scrollIntoView({ behavior: 'smooth' });
        }
        var close3 = document.getElementById('cf-sophia-close');
        if (close3) close3.click();
        break;
      }
      case 'whatsapp':
      case 'open_whatsapp': {
        var waUrl = getWhatsAppUrl();
        if (waUrl) {
          window.open(waUrl, '_blank', 'noopener,noreferrer');
        } else {
          var waClose = document.getElementById('cf-sophia-close');
          if (waClose) waClose.click();
          var waContact = document.getElementById('contact');
          if (waContact) waContact.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      }
      case 'capture_lead': {
        showLeadCapture();
        break;
      }
    }
  }

  // ─── Message Send ─────────────────────────────────────────────────────────

  function submitInput() {
    if (state.isTyping) return;
    var input = $('cf-sc-input');
    if (!input) return;
    var msg = input.value.trim();
    if (!msg) return;

    input.value = '';
    input.style.height = 'auto';
    var send = $('cf-sc-send');
    if (send) send.disabled = true;

    appendBubble('user', msg);
    state.history.push({ role: 'user', content: msg });
    state.isTyping = true;
    showTyping();

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: msg,
        history: state.history.slice(-6),
        visitorId: state.visitorId,
        language: state.language,
      }),
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        hideTyping();
        state.isTyping = false;
        if (send) send.disabled = false;

        var reply = data.response || (
          state.language === 'pt'
            ? 'Desculpe, tive um problema. Pode tentar novamente?'
            : state.language === 'es'
              ? 'Lo siento, tuve un problema. ¿Puedes intentar de nuevo?'
              : 'I\'m having a brief issue. Please try again or reach us at hello@carriersfy.ai.'
        );

        appendBubble('sophia', reply);
        state.history.push({ role: 'assistant', content: reply });

        if (data.intent) {
          state.leadData.lastIntent = data.intent;
          showContextualActions(data.intent);
        }

        if (data.action) {
          if (data.action === 'capture_lead') {
            handleAction('capture_lead');
          }
        }
      })
      .catch(function () {
        hideTyping();
        state.isTyping = false;
        if (send) send.disabled = false;
        var errMsg = state.language === 'pt'
          ? 'Estou com um problema de conexão. Entre em contato pelo hello@carriersfy.ai ou WhatsApp.'
          : state.language === 'es'
            ? 'Tengo un problema de conexión. Contáctanos en hello@carriersfy.ai o por WhatsApp.'
            : 'I\'m having a brief connection issue. You can reach us directly at hello@carriersfy.ai or via WhatsApp.';
        appendBubble('sophia', errMsg);
      });
  }

  // ─── Modal Injection ──────────────────────────────────────────────────────

  function patchSophiaModal() {
    if (state.initialized) return;

    // Try to find the existing dialog content area inside the modal
    var dialog = document.getElementById('cf-sophia-dialog');
    if (!dialog) return;

    // The dialog has a header and a content section — find content to replace
    // Look for the existing button panel (the static links area)
    var existingContent = dialog.querySelector('div[style*="display:flex"][style*="flex-direction:column"]');
    var contentTarget = existingContent || dialog;

    // Build our chat zone — insert just the chat wrap inside the dialog
    // We need to keep the header (with close button and Sophia title)
    var chatZone = document.createElement('div');
    chatZone.id = 'cf-sc-zone';
    chatZone.style.cssText = 'flex:1;display:flex;flex-direction:column;overflow:hidden;';

    // Find the inner content area (below the header row)
    // The modal dialog has: header div, then a content area
    // Replace the content area with our chat zone
    var headerEl = dialog.querySelector('div:first-child');
    if (headerEl && existingContent) {
      existingContent.parentNode.replaceChild(chatZone, existingContent);
    } else {
      // Fallback: just append
      dialog.style.display = 'flex';
      dialog.style.flexDirection = 'column';
      dialog.appendChild(chatZone);
    }

    injectStyles();
    buildChatUI(chatZone);

    // Update the WhatsApp link in the original modal if it still exists
    var waLink = document.getElementById('cf-sophia-whatsapp');
    if (waLink) {
      var waLinkUrl = getWhatsAppUrl();
      if (waLinkUrl) waLink.href = waLinkUrl;
    }

    state.initialized = true;
  }

  function observeForModal() {
    // The DC runtime creates the modal dynamically on first open
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
      // Also try patching if dialog now exists
      if (document.getElementById('cf-sophia-dialog') && !state.initialized) {
        setTimeout(patchSophiaModal, 50);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function init() {
    // Patch WhatsApp deeplink immediately if the static link exists
    var waLink = document.getElementById('cf-sophia-whatsapp');
    if (waLink) {
      var initWaUrl = getWhatsAppUrl();
      if (initWaUrl) waLink.href = initWaUrl;
    }

    // If modal already in DOM (rendered server-side or by DC on load)
    if (document.getElementById('cf-sophia-dialog')) {
      patchSophiaModal();
    }

    // Watch for modal being created dynamically
    observeForModal();

    // Also hook into the launcher button click
    var launcher = document.getElementById('cf-sophia-launcher');
    if (launcher) {
      launcher.addEventListener('click', function () {
        // Give DC runtime time to render the modal, then patch
        setTimeout(function () {
          if (!state.initialized && document.getElementById('cf-sophia-dialog')) {
            patchSophiaModal();
          }
        }, 100);
        setTimeout(function () {
          if (!state.initialized && document.getElementById('cf-sophia-dialog')) {
            patchSophiaModal();
          }
        }, 350);
      }, true); // capture phase so we run before DC's handler
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

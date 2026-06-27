// sophia-channels.js — Multi-channel floating action buttons
// Adds WhatsApp and Book Meeting buttons alongside the Sophia chat launcher.
// Configuration is loaded from /api/config (Cloudflare Pages environment variables).
//
// To activate these channels, set in Cloudflare Pages → Settings → Environment Variables:
//   WHATSAPP_PHONE  — digits only, no + or spaces (e.g. "17656762328")
//   BOOKING_URL     — Calendly or Cal.com URL
//
// If not configured, buttons gracefully fall back to the contact form.

(function () {
  'use strict';

  var cfg = { whatsappPhone: null, bookingUrl: null };
  var initialized = false;

  // ─── Language detection ────────────────────────────────────────────────────
  // Reads the DC runtime's current language (not browser language).
  // DC stores it in document.documentElement.lang AND localStorage.cf_lang.

  function getSiteLang() {
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

  // Returns the correct string for the current site language at call time.
  function loc(en, es, pt) {
    var l = getSiteLang();
    return l === 'es' ? es : l === 'pt' ? pt : en;
  }

  // WhatsApp default message — localized at click time (not build time)
  function getWaDefaultMsg() {
    return loc(
      "Hi Sophia! I found Carriersfy AI and I'd like to learn more about your Digital Employees.",
      "¡Hola Sophia! Encontré Carriersfy AI y me gustaría saber más sobre sus Empleados Digitales.",
      "Olá Sophia! Encontrei a Carriersfy AI e gostaria de saber mais sobre os seus Funcionários Digitais."
    );
  }

  function getWaUrl() {
    if (!cfg.whatsappPhone) return null;
    return 'https://wa.me/' + cfg.whatsappPhone + '?text=' + encodeURIComponent(getWaDefaultMsg());
  }

  // ─── Styles ───────────────────────────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('cf-chan-styles')) return;
    var s = document.createElement('style');
    s.id = 'cf-chan-styles';
    s.textContent = [
      '#cf-chan-dock{position:fixed;right:clamp(18px,3vw,34px);bottom:calc(clamp(18px,3vw,34px) + 134px);z-index:74;display:flex;flex-direction:column;gap:10px;align-items:center;}',
      '@media(max-width:760px){#cf-chan-dock{left:calc(50% - 60px);right:auto;bottom:166px;}}',
      '.cf-chan-btn{width:50px;height:50px;border-radius:50%;border:0;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:20px;transition:transform .2s,box-shadow .2s;text-decoration:none;box-shadow:0 4px 18px rgba(0,0,0,.38);line-height:1;}',
      '.cf-chan-btn:hover{transform:scale(1.1);box-shadow:0 6px 24px rgba(0,0,0,.5);}',
      '#cf-wa-btn{background:#25D366;}',
      '#cf-book-btn{background:rgba(255,255,255,.9);}',
    ].join('');
    document.head.appendChild(s);
  }

  // ─── Dock Build ───────────────────────────────────────────────────────────
  function buildDock() {
    var dock = document.createElement('div');
    dock.id = 'cf-chan-dock';

    // Book a Meeting button
    var bookBtn = document.createElement('a');
    bookBtn.id = 'cf-book-btn';
    bookBtn.className = 'cf-chan-btn';
    bookBtn.title = 'Book a Meeting';
    bookBtn.setAttribute('aria-label', 'Book a meeting with Carriersfy AI');
    bookBtn.innerHTML = '📅';
    bookBtn.rel = 'noopener noreferrer';
    if (cfg.bookingUrl) {
      bookBtn.href = cfg.bookingUrl;
      bookBtn.target = '_blank';
    } else {
      bookBtn.href = '#contact';
      bookBtn.addEventListener('click', function (e) {
        e.preventDefault();
        prefillContact(loc(
          "I'd like to book a strategy call with the Carriersfy AI team.",
          'Me gustaría reservar una llamada estratégica con el equipo de Carriersfy AI.',
          'Gostaria de agendar uma chamada estratégica com a equipe da Carriersfy AI.'
        ));
      });
    }

    // WhatsApp button
    var waBtn = document.createElement('a');
    waBtn.id = 'cf-wa-btn';
    waBtn.className = 'cf-chan-btn';
    waBtn.title = 'WhatsApp';
    waBtn.setAttribute('aria-label', 'Chat with Sophia on WhatsApp');
    waBtn.innerHTML = '🟢';
    waBtn.rel = 'noopener noreferrer';
    var waUrl = getWaUrl();
    if (waUrl) {
      waBtn.href = waUrl;
      waBtn.target = '_blank';
    } else {
      waBtn.href = '#contact';
      waBtn.addEventListener('click', function (e) {
        e.preventDefault();
        prefillContact(loc(
          'I prefer to connect via WhatsApp. Please share your WhatsApp number so the team can reach me.',
          'Prefiero comunicarme por WhatsApp. Por favor, contácteme a través de ese canal.',
          'Prefiro me comunicar pelo WhatsApp. Por favor, entre em contato por esse canal.'
        ));
      });
    }

    dock.appendChild(bookBtn);
    dock.appendChild(waBtn);
    document.body.appendChild(dock);

    // Expose full config globally so other scripts (sophia-voice.js, sophia-chat.js) can use it
    window.CF_SOPHIA_CONFIG = cfg;
    if (cfg.whatsappPhone) window.CF_SOPHIA_WHATSAPP_PHONE = cfg.whatsappPhone;
  }

  function prefillContact(message) {
    var msgEl = document.getElementById('cf-message');
    if (msgEl && !msgEl.value) msgEl.value = message;
    var contact = document.getElementById('contact');
    if (contact) contact.scrollIntoView({ behavior: 'smooth' });
  }

  // ─── Init ─────────────────────────────────────────────────────────────────
  function init() {
    if (initialized) return;
    initialized = true;
    injectStyles();

    // Load runtime config from Cloudflare Pages
    fetch('/api/config')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        cfg.whatsappPhone = data.whatsappPhone || null;
        cfg.bookingUrl = data.bookingUrl || null;
        buildDock();
      })
      .catch(function () {
        // If /api/config fails, build dock with contact-form fallbacks
        buildDock();
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

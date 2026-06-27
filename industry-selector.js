(function () {
  'use strict';

  var _selected  = '';
  var _cardRefs  = [];

  // ─── Language detection ────────────────────────────────────────────────────
  function getSiteLang() {
    var d = (document.documentElement.lang || '').toLowerCase();
    if (d === 'es' || d === 'pt' || d === 'en') return d;
    try {
      var s = localStorage.getItem('cf_lang');
      if (s === 'es' || s === 'pt' || s === 'en') return s;
    } catch (_) {}
    var n = (navigator.language || 'en').toLowerCase();
    if (n.startsWith('pt')) return 'pt';
    if (n.startsWith('es')) return 'es';
    return 'en';
  }

  function t(obj, lang) {
    return (obj && (obj[lang] || obj.en)) || '';
  }

  // ─── Card visual state (no DOM structure changes) ──────────────────────────
  function applyActive(ref, active) {
    ref.el.setAttribute('aria-pressed', active ? 'true' : 'false');
    ref.el.style.background = active
      ? 'linear-gradient(135deg,rgba(31,162,255,.18),rgba(255,46,60,.12))'
      : 'rgba(255,255,255,.035)';
    ref.el.style.borderColor = active ? 'rgba(31,162,255,.5)' : 'rgba(255,255,255,.09)';
    ref.el.style.boxShadow   = active ? '0 16px 44px rgba(28,127,214,.18)' : 'none';
    ref.dotEl.style.background  = active ? 'linear-gradient(135deg,#1FA2FF,#FF2E3C)' : 'transparent';
    ref.dotEl.style.borderColor = active ? '#1FA2FF' : 'rgba(255,255,255,.22)';
    ref.dotEl.style.boxShadow   = active ? '0 0 18px rgba(31,162,255,.45)' : 'none';
  }

  function selectIndustry(id) {
    _selected = id;
    var sel = document.getElementById('cf-industry');
    if (sel) sel.value = id;
    _cardRefs.forEach(function (ref) {
      applyActive(ref, ref.item.id === id);
    });
  }

  // ─── Language update: text only, no DOM structure changes ──────────────────
  function updateText(lang) {
    _cardRefs.forEach(function (ref) {
      ref.nameEl.textContent = ref.item.icon + ' ' + t(ref.item.name, lang);
      ref.descEl.textContent = t(ref.item.description, lang);
    });
  }

  // ─── Build card grid (runs once) ──────────────────────────────────────────
  function buildGrid(container, lang) {
    var industries = window.CF_INDUSTRIES || [];

    var style = document.createElement('style');
    style.textContent = [
      '#cf-industry-cards::-webkit-scrollbar{width:4px}',
      '#cf-industry-cards::-webkit-scrollbar-thumb{background:rgba(31,162,255,.38);border-radius:4px}',
    ].join('');
    document.head.appendChild(style);

    container.style.cssText = [
      'display:grid',
      'grid-template-columns:repeat(auto-fill,minmax(min(192px,100%),1fr))',
      'gap:12px',
      'max-height:440px',
      'overflow-y:auto',
      'padding:2px 0 4px',
    ].join(';');

    industries.forEach(function (item) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('aria-pressed', 'false');
      btn.style.cssText = [
        'min-height:96px',
        'text-align:left',
        'padding:18px',
        'border-radius:20px',
        'background:rgba(255,255,255,.035)',
        'border:1px solid rgba(255,255,255,.09)',
        'color:#fff',
        'cursor:pointer',
        "font-family:'Manrope',sans-serif",
        'box-shadow:none',
        'transition:transform .22s ease,border-color .22s ease,background .22s ease',
        'width:100%',
      ].join(';');

      var row = document.createElement('span');
      row.style.cssText = 'display:flex;align-items:flex-start;justify-content:space-between;gap:12px;';

      var nameEl = document.createElement('span');
      nameEl.style.cssText = "font-family:'Space Grotesk',sans-serif;font-size:16px;font-weight:800;line-height:1.18;";
      nameEl.textContent = item.icon + ' ' + t(item.name, lang);

      var dotEl = document.createElement('span');
      dotEl.setAttribute('aria-hidden', 'true');
      dotEl.style.cssText = [
        'flex-shrink:0',
        'width:18px',
        'height:18px',
        'border-radius:50%',
        'border:1px solid rgba(255,255,255,.22)',
        'background:transparent',
        'box-shadow:none',
      ].join(';');

      row.appendChild(nameEl);
      row.appendChild(dotEl);

      var descEl = document.createElement('span');
      descEl.style.cssText = 'display:block;margin-top:10px;font-size:13px;line-height:1.45;color:rgba(244,246,251,.55);';
      descEl.textContent = t(item.description, lang);

      btn.appendChild(row);
      btn.appendChild(descEl);
      container.appendChild(btn);

      var ref = { el: btn, nameEl: nameEl, descEl: descEl, dotEl: dotEl, item: item };
      _cardRefs.push(ref);

      btn.addEventListener('click', function () { selectIndustry(item.id); });
    });
  }

  // ─── Init ──────────────────────────────────────────────────────────────────
  function init() {
    var sel = document.getElementById('cf-industry');
    if (!sel) return;

    // Populate hidden select with all IDs so sel.value = id works correctly
    var industries = window.CF_INDUSTRIES || [];
    sel.innerHTML = '<option value=""></option>';
    industries.forEach(function (item) {
      var opt = document.createElement('option');
      opt.value = item.id;
      sel.appendChild(opt);
    });
    sel.style.display = 'none';

    // Inject card grid immediately after the hidden select
    var container = document.createElement('div');
    container.id = 'cf-industry-cards';
    sel.parentNode.insertBefore(container, sel.nextSibling);

    buildGrid(container, getSiteLang());

    // Language switch: update text only — zero DOM structural changes
    new MutationObserver(function () {
      updateText(getSiteLang());
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

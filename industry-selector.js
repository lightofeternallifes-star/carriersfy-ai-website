(function () {
  'use strict';

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

  var ITEMS = [
    { type: 'option',   value: 'dental-labs',    en: '🏥 Dental Labs',          es: '🏥 Laboratorios Dentales',            pt: '🏥 Laboratórios Dentários' },
    { type: 'option',   value: 'dental-clinics',  en: '🦷 Dental Clinics',        es: '🦷 Clínicas Dentales',                pt: '🦷 Clínicas Dentárias' },
    { type: 'option',   value: 'medical',          en: '🏥 Medical Clinics',       es: '🏥 Clínicas Médicas',                 pt: '🏥 Clínicas Médicas' },
    { type: 'option',   value: 'veterinary',       en: '🐶 Veterinary Clinics',    es: '🐶 Clínicas Veterinarias',            pt: '🐶 Clínicas Veterinárias' },
    { type: 'option',   value: 'lawfirm',          en: '⚖️ Law Firms',             es: '⚖️ Firmas de Abogados',               pt: '⚖️ Escritórios de Advocacia' },
    {
      type: 'optgroup', value: 'real-estate',
      en: '🏡 Real Estate', es: '🏡 Bienes Raíces', pt: '🏡 Imóveis',
      options: [
        { value: 'realtors',      en: 'Realtors',            es: 'Agentes Inmobiliarios',         pt: 'Corretores de Imóveis' },
        { value: 'property-mgmt', en: 'Property Management', es: 'Administración de Propiedades', pt: 'Administração de Imóveis' },
        { value: 'lenders',       en: 'Lenders',             es: 'Prestamistas',                  pt: 'Financiadoras' },
      ],
    },
    { type: 'option',   value: 'trucking',         en: '🚛 Trucking Companies',    es: '🚛 Empresas de Transporte',           pt: '🚛 Transportadoras' },
    { type: 'option',   value: 'truck-parts',      en: '🔧 Truck Parts',           es: '🔧 Refacciones para Camión',          pt: '🔧 Peças para Caminhão' },
    { type: 'option',   value: 'electrician',      en: '⚡ Electricians',          es: '⚡ Electricistas',                    pt: '⚡ Eletricistas' },
    { type: 'option',   value: 'plumbing',         en: '🚰 Plumbers',              es: '🚰 Plomeros',                         pt: '🚰 Encanadores' },
    { type: 'option',   value: 'hvac',             en: '❄️ HVAC / A/C Companies', es: '❄️ Empresas de A/C',                 pt: '❄️ Empresas de Ar-condicionado' },
    {
      type: 'optgroup', value: 'cleaning',
      en: '🧹 Cleaning Companies', es: '🧹 Empresas de Limpieza', pt: '🧹 Empresas de Limpeza',
      options: [
        { value: 'cleaning-res', en: 'Residential', es: 'Residencial', pt: 'Residencial' },
        { value: 'cleaning-com', en: 'Commercial',  es: 'Comercial',   pt: 'Comercial' },
      ],
    },
    { type: 'option',   value: 'signs-print',      en: '🖨 Signs & Printing',      es: '🖨 Rótulos & Impresión',              pt: '🖨 Placas & Gráfica' },
    { type: 'option',   value: 'marine',            en: '⚓ Marine',                es: '⚓ Náutico',                           pt: '⚓ Náutico' },
    { type: 'option',   value: 'restaurant',        en: '🍽 Restaurants',           es: '🍽 Restaurantes',                     pt: '🍽 Restaurantes' },
    { type: 'option',   value: 'cafe',              en: '☕ Cafés',                 es: '☕ Cafeterías',                        pt: '☕ Cafés' },
    { type: 'option',   value: 'automotive',        en: '🚗 Automotive',            es: '🚗 Automotriz',                       pt: '🚗 Automotivo' },
    { type: 'option',   value: 'insurance',         en: '🛡 Insurance Agencies',    es: '🛡 Agencias de Seguros',              pt: '🛡 Seguradoras' },
    { type: 'option',   value: 'marketing',         en: '📈 Marketing Agencies',    es: '📈 Agencias de Marketing',            pt: '📈 Agências de Marketing' },
    { type: 'option',   value: 'manufacturing',     en: '🏭 Manufacturing',         es: '🏭 Manufactura',                      pt: '🏭 Manufatura' },
    { type: 'option',   value: 'retail',            en: '🏬 Retail',                es: '🏬 Comercio',                         pt: '🏬 Varejo' },
  ];

  var PLACEHOLDER = { en: 'Select your industry', es: 'Selecciona tu industria', pt: 'Selecione seu setor' };
  var LABEL       = { en: 'Industry',             es: 'Industria',               pt: 'Setor' };

  var _built         = false;
  var _placeholderEl = null;
  var _labelTextNode = null;
  var _refs          = [];

  function buildFull(sel, lang) {
    sel.innerHTML = '';

    _placeholderEl = document.createElement('option');
    _placeholderEl.value = '';
    _placeholderEl.style.background = '#0B0F1C';
    _placeholderEl.textContent = PLACEHOLDER[lang] || PLACEHOLDER.en;
    sel.appendChild(_placeholderEl);

    _refs = [];

    ITEMS.forEach(function (item) {
      if (item.type === 'option') {
        var o = document.createElement('option');
        o.value = item.value;
        o.style.background = '#0B0F1C';
        o.textContent = item[lang] || item.en;
        sel.appendChild(o);
        _refs.push({ type: 'option', el: o, item: item });
      } else {
        var g = document.createElement('optgroup');
        g.label = item[lang] || item.en;
        sel.appendChild(g);
        var subrefs = [];
        (item.options || []).forEach(function (sub) {
          var so = document.createElement('option');
          so.value = sub.value;
          so.style.background = '#0B0F1C';
          so.textContent = sub[lang] || sub.en;
          g.appendChild(so);
          subrefs.push({ el: so, item: sub });
        });
        _refs.push({ type: 'optgroup', el: g, item: item, subrefs: subrefs });
      }
    });

    _built = true;
  }

  function updateText(lang) {
    if (_placeholderEl) _placeholderEl.textContent = PLACEHOLDER[lang] || PLACEHOLDER.en;
    _refs.forEach(function (ref) {
      if (ref.type === 'option') {
        ref.el.textContent = ref.item[lang] || ref.item.en;
      } else {
        ref.el.label = ref.item[lang] || ref.item.en;
        (ref.subrefs || []).forEach(function (sub) {
          sub.el.textContent = sub.item[lang] || sub.item.en;
        });
      }
    });
    if (_labelTextNode) _labelTextNode.nodeValue = LABEL[lang] || LABEL.en;
  }

  function buildSelect(lang) {
    var sel = document.getElementById('cf-industry');
    if (!sel) return;
    var saved = sel.value;
    if (!_built) {
      buildFull(sel, lang);
    } else {
      updateText(lang);
    }
    if (saved) {
      try { sel.value = saved; } catch (_) {}
    }
  }

  function init() {
    if (!document.getElementById('cf-industry')) return;

    var lbl = document.querySelector('label[for="cf-industry"]');
    if (lbl && lbl.firstChild && lbl.firstChild.nodeType === 3) {
      _labelTextNode = lbl.firstChild;
    }

    buildSelect(getSiteLang());

    new MutationObserver(function () {
      buildSelect(getSiteLang());
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

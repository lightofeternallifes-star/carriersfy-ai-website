// industry-selector.js — Dynamic industry selector with EN/ES/PT translations.
// Populates #cf-industry with optgroup structure and updates on language change.

(function () {
  'use strict';

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

  var INDUSTRIES = [
    {
      group: { en: '🏥 HEALTHCARE', es: '🏥 SALUD', pt: '🏥 SAÚDE' },
      options: [
        { value: 'dental',        en: 'Dental Clinics',        es: 'Clínicas Dentales',          pt: 'Clínicas Dentárias' },
        { value: 'medical',       en: 'Medical Clinics',       es: 'Clínicas Médicas',           pt: 'Clínicas Médicas' },
        { value: 'veterinary',    en: 'Veterinary Clinics',    es: 'Clínicas Veterinarias',      pt: 'Clínicas Veterinárias' },
        { value: 'chiropractic',  en: 'Chiropractic Clinics',  es: 'Quiroprácticos',             pt: 'Clínicas de Quiropraxia' },
        { value: 'medspa',        en: 'Med Spa & Aesthetics',  es: 'Med Spa & Estética',         pt: 'Med Spa & Estética' },
      ],
    },
    {
      group: { en: '⚖️ LEGAL & FINANCIAL', es: '⚖️ LEGAL Y FINANCIERO', pt: '⚖️ JURÍDICO E FINANCEIRO' },
      options: [
        { value: 'lawfirm',       en: 'Law Firms',             es: 'Firmas de Abogados',         pt: 'Escritórios de Advocacia' },
        { value: 'immigration',   en: 'Immigration Services',  es: 'Servicios de Inmigración',   pt: 'Serviços de Imigração' },
        { value: 'accounting',    en: 'Accounting & Tax',      es: 'Contabilidad & Impuestos',   pt: 'Contabilidade & Impostos' },
        { value: 'creditrepair',  en: 'Credit Repair',         es: 'Reparación de Crédito',      pt: 'Reparo de Crédito' },
        { value: 'mortgage',      en: 'Mortgage Lenders',      es: 'Prestamistas Hipotecarios',  pt: 'Financiadoras Imobiliárias' },
      ],
    },
    {
      group: { en: '🏡 REAL ESTATE', es: '🏡 BIENES RAÍCES', pt: '🏡 IMÓVEIS' },
      options: [
        { value: 'realtor',           en: 'Realtors',             es: 'Agentes Inmobiliarios',       pt: 'Corretores de Imóveis' },
        { value: 'propertymanagement',en: 'Property Management',  es: 'Administración de Propiedades',pt: 'Administração de Imóveis' },
        { value: 'lenders',           en: 'Lenders',              es: 'Prestamistas',                pt: 'Financiadoras' },
      ],
    },
    {
      group: { en: '🍽 FOOD & HOSPITALITY', es: '🍽 GASTRONOMÍA Y HOSPITALIDAD', pt: '🍽 ALIMENTAÇÃO E HOSPITALIDADE' },
      options: [
        { value: 'restaurant',  en: 'Restaurants',  es: 'Restaurantes',  pt: 'Restaurantes' },
        { value: 'cafe',        en: 'Cafés',         es: 'Cafeterías',    pt: 'Cafés' },
        { value: 'foodtruck',   en: 'Food Trucks',   es: 'Food Trucks',   pt: 'Food Trucks' },
      ],
    },
    {
      group: { en: '🚚 TRUCKING', es: '🚚 TRANSPORTE', pt: '🚚 TRANSPORTE' },
      options: [
        { value: 'trucking',     en: 'Trucking Companies',  es: 'Empresas de Camiones',    pt: 'Transportadoras' },
        { value: 'dispatch',     en: 'Dispatch Companies',  es: 'Empresas de Despacho',    pt: 'Empresas de Despacho' },
        { value: 'truckparts',   en: 'Truck Parts',         es: 'Refacciones de Camión',   pt: 'Peças para Caminhão' },
        { value: 'dieselrepair', en: 'Diesel Repair Shops', es: 'Talleres Diésel',         pt: 'Oficinas de Diesel' },
      ],
    },
    {
      group: { en: '🏠 HOME SERVICES', es: '🏠 SERVICIOS DEL HOGAR', pt: '🏠 SERVIÇOS RESIDENCIAIS' },
      options: [
        { value: 'cleaning',     en: 'Cleaning Companies',     es: 'Empresas de Limpieza',       pt: 'Empresas de Limpeza' },
        { value: 'electrician',  en: 'Electricians',           es: 'Electricistas',              pt: 'Eletricistas' },
        { value: 'plumbing',     en: 'Plumbers',               es: 'Plomeros',                   pt: 'Encanadores' },
        { value: 'hvac',         en: 'HVAC / Air Conditioning',es: 'HVAC / Aire Acondicionado',  pt: 'HVAC / Ar-condicionado' },
        { value: 'roofing',      en: 'Roofing Companies',      es: 'Empresas de Techos',         pt: 'Empresas de Telhados' },
        { value: 'landscaping',  en: 'Landscaping',            es: 'Jardinería',                 pt: 'Jardinagem' },
        { value: 'handyman',     en: 'Handyman Services',      es: 'Servicios de Mantenimiento', pt: 'Serviços de Manutenção' },
      ],
    },
    {
      group: { en: '🏗 CONSTRUCTION', es: '🏗 CONSTRUCCIÓN', pt: '🏗 CONSTRUÇÃO' },
      options: [
        { value: 'generalcontractor', en: 'General Contractors', es: 'Contratistas Generales', pt: 'Empreiteiras Gerais' },
        { value: 'remodeling',        en: 'Remodeling',          es: 'Remodelación',           pt: 'Reformas' },
        { value: 'concrete',          en: 'Concrete',            es: 'Concreto',               pt: 'Concreto' },
        { value: 'roofing-const',     en: 'Roofing',             es: 'Techos',                 pt: 'Telhados' },
      ],
    },
    {
      group: { en: '🚗 AUTOMOTIVE', es: '🚗 AUTOMOTRIZ', pt: '🚗 AUTOMOTIVO' },
      options: [
        { value: 'autorepair',    en: 'Auto Repair',        es: 'Talleres Mecánicos',         pt: 'Oficinas Mecânicas' },
        { value: 'bodyshop',      en: 'Body Shops',         es: 'Hojalatería y Pintura',      pt: 'Funilaria e Pintura' },
        { value: 'cardealership', en: 'Car Dealerships',    es: 'Concesionarias de Autos',    pt: 'Concessionárias' },
        { value: 'carwash',       en: 'Car Wash',           es: 'Lavado de Autos',            pt: 'Lava-rápido' },
      ],
    },
    {
      group: { en: '🖨 PRINTING & SIGNS', es: '🖨 IMPRESIÓN Y SEÑALIZACIÓN', pt: '🖨 IMPRESSÃO E COMUNICAÇÃO VISUAL' },
      options: [
        { value: 'signsprint',         en: 'Signs & Printing',    es: 'Rótulos & Imprenta',          pt: 'Placas & Gráfica' },
        { value: 'vehiclewraps',       en: 'Vehicle Wraps',       es: 'Rotulado de Vehículos',       pt: 'Envelopamento de Veículos' },
        { value: 'commercialgraphics', en: 'Commercial Graphics', es: 'Gráfica Comercial',           pt: 'Comunicação Visual' },
      ],
    },
    {
      group: { en: '⚓ MARINE', es: '⚓ MARÍTIMO', pt: '⚓ NÁUTICO' },
      options: [
        { value: 'marineelectronics', en: 'Marine Electronics', es: 'Electrónica Marina',  pt: 'Eletrônica Náutica' },
        { value: 'boatservices',      en: 'Boat Services',      es: 'Servicios Náuticos',  pt: 'Serviços Náuticos' },
      ],
    },
    {
      group: { en: '🏢 PROFESSIONAL SERVICES', es: '🏢 SERVICIOS PROFESIONALES', pt: '🏢 SERVIÇOS PROFISSIONAIS' },
      options: [
        { value: 'consulting',  en: 'Consulting',          es: 'Consultoría',               pt: 'Consultoria' },
        { value: 'marketing',   en: 'Marketing Agencies',  es: 'Agencias de Marketing',     pt: 'Agências de Marketing' },
        { value: 'insurance',   en: 'Insurance Agencies',  es: 'Agencias de Seguros',       pt: 'Seguradoras' },
        { value: 'staffing',    en: 'Staffing Companies',  es: 'Empresas de Reclutamiento', pt: 'Empresas de Recrutamento' },
      ],
    },
    {
      group: { en: '🛍 RETAIL', es: '🛍 COMERCIO', pt: '🛍 VAREJO' },
      options: [
        { value: 'retail',         en: 'Retail Stores', es: 'Tiendas Minoristas', pt: 'Lojas de Varejo' },
        { value: 'wholesale',      en: 'Wholesale',     es: 'Mayoreo',            pt: 'Atacado' },
        { value: 'manufacturing',  en: 'Manufacturing', es: 'Manufactura',        pt: 'Manufatura' },
      ],
    },
    {
      group: null,
      options: [
        { value: 'other', en: 'Other Business', es: 'Otro Negocio', pt: 'Outro Negócio' },
      ],
    },
  ];

  var PLACEHOLDER = {
    en: 'Select your industry',
    es: 'Selecciona tu industria',
    pt: 'Selecione seu setor',
  };

  var LABEL = {
    en: 'Industry',
    es: 'Industria',
    pt: 'Setor',
  };

  function buildSelect(lang) {
    var sel = document.getElementById('cf-industry');
    if (!sel) return;
    var currentVal = sel.value;

    sel.innerHTML = '';

    var ph = document.createElement('option');
    ph.value = '';
    ph.style.background = '#0B0F1C';
    ph.textContent = PLACEHOLDER[lang] || PLACEHOLDER.en;
    sel.appendChild(ph);

    INDUSTRIES.forEach(function (cat) {
      var container;
      if (cat.group) {
        container = document.createElement('optgroup');
        container.label = cat.group[lang] || cat.group.en;
        sel.appendChild(container);
      } else {
        container = sel;
      }
      cat.options.forEach(function (opt) {
        var o = document.createElement('option');
        o.value = opt.value;
        o.style.background = '#0B0F1C';
        o.textContent = opt[lang] || opt.en;
        container.appendChild(o);
      });
    });

    if (currentVal) sel.value = currentVal;

    // Sync the label above the select
    var lbl = document.querySelector('label[for="cf-industry"]');
    if (lbl) lbl.textContent = LABEL[lang] || LABEL.en;
  }

  function init() {
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

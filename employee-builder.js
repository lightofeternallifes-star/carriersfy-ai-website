(function () {
  const STORAGE_KEY = 'cfDigitalEmployeeFactoryState';

  const industries = [
    'Dental Clinic',
    'Medical Practice',
    'Veterinary Clinic',
    'Law Firm',
    'Real Estate',
    'Insurance',
    'Immigration',
    'Tax Office',
    'Restaurant',
    'Construction',
    'Home Services',
    'Marketing Agency',
    'Car Dealer',
    'Church',
    'Logistics',
    'Transportation',
    'Manufacturing',
    'Accounting',
    'Custom Business'
  ];

  const employees = [
    'Receptionist',
    'Sales Consultant',
    'Appointment Setter',
    'Lead Qualifier',
    'Customer Support',
    'Billing Assistant',
    'Collections Specialist',
    'Marketing Assistant',
    'HR Assistant',
    'Recruiter',
    'Dispatcher',
    'Estimator',
    'Project Coordinator',
    'Executive Assistant',
    'AI Manager',
    'Custom Employee'
  ];

  const personalities = [
    'Professional',
    'Luxury',
    'Friendly',
    'Energetic',
    'Executive',
    'Warm',
    'Corporate',
    'Luxury Concierge',
    'Medical',
    'Technical',
    'Sales',
    'Faith-based'
  ];

  const voices = ['Male', 'Female', 'Young', 'Executive', 'Warm', 'Deep', 'Confident', 'Luxury'];
  const languages = ['English', 'Spanish', 'Portuguese', 'French', 'Italian', 'German', 'Arabic', 'Custom'];
  const capabilities = [
    'Voice Calls',
    'WhatsApp',
    'SMS',
    'Email',
    'Website Chat',
    'Facebook',
    'Instagram',
    'Appointment Booking',
    'CRM',
    'Knowledge Base',
    'Lead Qualification',
    'Quotes',
    'Payments',
    'Follow-ups',
    'Reports',
    'Multi-location',
    'Analytics',
    'Custom Skills'
  ];
  const knowledgeTypes = ['PDF', 'Word', 'Excel', 'Website', 'FAQ', 'Price Lists', 'Services', 'Policies', 'Images', 'Videos'];
  const schedules = ['24/7', 'Business Hours', 'Custom Schedule', 'Holiday Calendar'];
  const appearances = ['Choose Avatar', 'Business Style', 'Corporate', 'Luxury', 'Modern', 'Professional', 'Futuristic', 'Photo-realistic'];

  const steps = [
    { id: 'industry', title: 'Choose Industry', kicker: 'Start with the business world your employee will understand.' },
    { id: 'employee', title: 'Choose Employee', kicker: 'Select the role this digital employee will own.' },
    { id: 'personality', title: 'Employee Personality', kicker: 'Shape the way your employee speaks, responds, and represents your brand.' },
    { id: 'voice', title: 'Choose Voice', kicker: 'Preview the presence your employee will bring to every conversation.' },
    { id: 'languages', title: 'Languages', kicker: 'Choose the languages your customers and team can use.' },
    { id: 'capabilities', title: 'Capabilities', kicker: 'Build the daily operating system for this digital employee.' },
    { id: 'knowledge', title: 'Business Knowledge', kicker: 'Prepare the documents, services, policies, and media Sophia will review later.' },
    { id: 'schedule', title: 'Working Schedule', kicker: 'Decide when your employee should be available.' },
    { id: 'appearance', title: 'Appearance', kicker: 'Choose how the employee should feel inside your customer experience.' },
    { id: 'pricing', title: 'Enterprise Quote', kicker: 'Review a live planning estimate while you build.' },
    { id: 'launch', title: 'Launch', kicker: 'Send the complete factory configuration to Sophia.' }
  ];

  const state = loadState();

  function defaultState() {
    return {
      step: 0,
      industry: '',
      employee: '',
      personality: '',
      voice: '',
      voicePreview: '',
      languages: [],
      capabilities: [],
      knowledgeTypes: [],
      knowledgeFiles: [],
      websiteKnowledge: '',
      schedule: '',
      appearance: '',
      customNotes: '',
      contact: {
        name: '',
        email: '',
        phone: '',
        business: ''
      },
      submitting: false,
      submitted: false,
      error: ''
    };
  }

  function loadState() {
    try {
      const raw = window.localStorage && window.localStorage.getItem(STORAGE_KEY);
      return raw ? mergeState(defaultState(), JSON.parse(raw)) : defaultState();
    } catch {
      return defaultState();
    }
  }

  function mergeState(base, saved) {
    return {
      ...base,
      ...saved,
      contact: { ...base.contact, ...(saved && saved.contact ? saved.contact : {}) },
      languages: Array.isArray(saved && saved.languages) ? saved.languages : base.languages,
      capabilities: Array.isArray(saved && saved.capabilities) ? saved.capabilities : base.capabilities,
      knowledgeTypes: Array.isArray(saved && saved.knowledgeTypes) ? saved.knowledgeTypes : base.knowledgeTypes,
      knowledgeFiles: Array.isArray(saved && saved.knowledgeFiles) ? saved.knowledgeFiles : base.knowledgeFiles
    };
  }

  function saveState() {
    try {
      window.localStorage && window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage is optional */
    }
  }

  function openFactory() {
    const modal = ensureModal();
    window.__cfEmployeeFactoryLastFocus = document.activeElement;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    render();
    const close = document.getElementById('cf-employee-factory-close');
    if (close) close.focus();
  }

  function closeFactory() {
    const modal = document.getElementById('cf-employee-factory-modal');
    if (!modal) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (window.__cfEmployeeFactoryLastFocus && window.__cfEmployeeFactoryLastFocus.focus) window.__cfEmployeeFactoryLastFocus.focus();
  }

  function ensureModal() {
    let modal = document.getElementById('cf-employee-factory-modal');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = 'cf-employee-factory-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-labelledby', 'cf-employee-factory-title');
    modal.style.cssText = 'display:none;position:fixed;inset:0;z-index:134;background:rgba(7,11,22,.86);backdrop-filter:blur(26px);padding:18px;align-items:center;justify-content:center;';
    document.body.appendChild(modal);

    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeFactory();
    });
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', () => {
      const active = document.getElementById('cf-employee-factory-modal');
      if (active && active.style.display !== 'none') render();
    });
    return modal;
  }

  function onKeyDown(event) {
    const modal = document.getElementById('cf-employee-factory-modal');
    if (!modal || modal.style.display === 'none') return;
    if (event.key === 'Escape') closeFactory();
    if (event.key === 'Tab') {
      const focusable = Array.from(modal.querySelectorAll('a[href],button:not([disabled]),input,select,textarea'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  function money(value) {
    return '$' + Math.round(value).toLocaleString('en-US');
  }

  function estimate() {
    const languageCount = state.languages.length || 1;
    const capabilityCount = state.capabilities.length || 1;
    const knowledgeCount = state.knowledgeTypes.length || 1;
    const scheduleMultiplier = {
      '24/7': 1.32,
      'Business Hours': 1,
      'Custom Schedule': 1.16,
      'Holiday Calendar': 1.12
    }[state.schedule || 'Business Hours'];
    const employeeMultiplier = {
      'AI Manager': 1.45,
      'Executive Assistant': 1.28,
      'Project Coordinator': 1.24,
      'Sales Consultant': 1.2,
      'Collections Specialist': 1.18,
      'Custom Employee': 1.4
    }[state.employee] || 1;
    const monthly = (1250 + capabilityCount * 145 + languageCount * 120 + knowledgeCount * 80) * scheduleMultiplier * employeeMultiplier;
    const setup = (4200 + capabilityCount * 320 + languageCount * 260 + knowledgeCount * 180) * employeeMultiplier;
    const featureScore = capabilityCount + languageCount + knowledgeCount;
    const launchWeeks = Math.max(2, Math.min(12, Math.ceil(2 + featureScore / 3 + (state.schedule === '24/7' ? 1 : 0))));
    const tier = featureScore > 24 || state.employee === 'AI Manager' ? 'Enterprise' : featureScore > 15 ? 'Advanced' : 'Professional';
    return {
      monthly,
      setup,
      monthlyRange: `${money(monthly * 0.9)}-${money(monthly * 1.2)}/mo`,
      setupRange: `${money(setup * 0.9)}-${money(setup * 1.25)}`,
      launchTime: `${launchWeeks}-${launchWeeks + 2} weeks`,
      tier
    };
  }

  function selectSingle(key, value) {
    state[key] = value;
    state.error = '';
    saveState();
    render();
  }

  function toggleMulti(key, value) {
    const current = state[key] || [];
    state[key] = current.includes(value) ? current.filter((item) => item !== value) : current.concat(value);
    state.error = '';
    saveState();
    render();
  }

  function setField(key, value) {
    state[key] = value;
    saveState();
    renderSummaryOnly();
  }

  function setContact(key, value) {
    state.contact[key] = value;
    saveState();
  }

  function canAdvance() {
    const id = steps[state.step].id;
    if (id === 'industry') return Boolean(state.industry);
    if (id === 'employee') return Boolean(state.employee);
    if (id === 'personality') return Boolean(state.personality);
    if (id === 'voice') return Boolean(state.voice);
    if (id === 'languages') return state.languages.length > 0;
    if (id === 'capabilities') return state.capabilities.length > 0;
    if (id === 'knowledge') return state.knowledgeTypes.length > 0 || Boolean(state.websiteKnowledge) || state.knowledgeFiles.length > 0;
    if (id === 'schedule') return Boolean(state.schedule);
    if (id === 'appearance') return Boolean(state.appearance);
    return true;
  }

  function nextStep() {
    if (!canAdvance()) {
      state.error = 'Select at least one option before continuing.';
      render();
      return;
    }
    state.error = '';
    state.step = Math.min(steps.length - 1, state.step + 1);
    saveState();
    render();
  }

  function prevStep() {
    state.error = '';
    state.step = Math.max(0, state.step - 1);
    saveState();
    render();
  }

  function resetFactory() {
    Object.keys(state).forEach((key) => delete state[key]);
    Object.assign(state, defaultState());
    saveState();
    render();
  }

  function playVoicePreview(voice) {
    state.voice = voice;
    state.voicePreview = `${voice} sample playing`;
    state.error = '';
    saveState();
    render();

    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) return;
    try {
      const ctx = new AudioContextCtor();
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      const voiceIndex = Math.max(0, voices.indexOf(voice));
      oscillator.type = voiceIndex % 2 ? 'triangle' : 'sine';
      oscillator.frequency.value = 180 + voiceIndex * 38;
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.62);
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.66);
      setTimeout(() => ctx.close && ctx.close(), 900);
    } catch {
      /* preview is optional */
    }
  }

  function render() {
    const modal = ensureModal();
    const step = steps[state.step];
    const quote = estimate();
    const compact = window.innerWidth < 980;
    const progress = Math.round(((state.step + 1) / steps.length) * 100);

    modal.innerHTML = `
      <style>
        #cf-employee-factory-modal button:focus-visible,
        #cf-employee-factory-modal input:focus-visible,
        #cf-employee-factory-modal textarea:focus-visible {
          outline: 2px solid #1FA2FF;
          outline-offset: 3px;
        }
        @keyframes cfFactoryGlow { 0%,100% { transform:scale(1); opacity:.5; } 50% { transform:scale(1.06); opacity:.88; } }
        @keyframes cfFactoryRise { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes cfFactoryOrbit { to { transform:rotate(360deg); } }
      </style>
      <div style="width:min(1280px,100%);height:min(880px,calc(100vh - 36px));overflow:hidden;border-radius:32px;background:linear-gradient(180deg,rgba(13,18,32,.985),rgba(8,11,20,.985));border:1px solid rgba(255,255,255,.13);box-shadow:0 46px 130px rgba(0,0,0,.74);position:relative;color:#F4F6FB;font-family:'Manrope',sans-serif;">
        <div style="position:absolute;inset:auto -110px -140px auto;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(255,46,60,.2),transparent 70%);filter:blur(28px);animation:cfFactoryGlow 5s ease-in-out infinite;pointer-events:none;"></div>
        <div style="position:absolute;top:-150px;left:20%;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,rgba(31,162,255,.22),transparent 68%);filter:blur(34px);animation:cfFactoryGlow 6s ease-in-out infinite;pointer-events:none;"></div>
        <div style="position:relative;display:grid;grid-template-columns:${compact ? 'minmax(0,1fr)' : 'minmax(0,1fr) minmax(350px,430px)'};height:100%;">
          <section style="display:flex;min-width:0;flex-direction:column;${compact ? '' : 'border-right:1px solid rgba(255,255,255,.08);'}">
            <header style="display:flex;align-items:center;justify-content:space-between;gap:16px;padding:22px clamp(20px,4vw,34px);border-bottom:1px solid rgba(255,255,255,.08);">
              <div>
                <div style="font-size:12px;font-weight:900;letter-spacing:.16em;text-transform:uppercase;color:#1FA2FF;">Carriersfy AI Platform</div>
                <h2 id="cf-employee-factory-title" style="font-family:'Space Grotesk';font-weight:700;font-size:clamp(24px,3vw,36px);line-height:1.06;margin:5px 0 0;">Digital Employee Factory&trade;</h2>
              </div>
              <button id="cf-employee-factory-close" type="button" aria-label="Close Digital Employee Factory" style="width:42px;height:42px;border-radius:13px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05);color:#fff;font-size:22px;line-height:1;cursor:pointer;">x</button>
            </header>
            <div aria-label="Factory progress" style="height:4px;background:rgba(255,255,255,.05);"><div style="width:${progress}%;height:4px;background:linear-gradient(135deg,#1FA2FF,#FF2E3C);box-shadow:0 0 24px rgba(31,162,255,.42);border-radius:100px;transition:width .32s ease;"></div></div>
            <main style="flex:1;overflow:auto;padding:clamp(22px,4vw,38px);">
              <div style="animation:cfFactoryRise .32s ease both;">
                <div style="max-width:820px;margin-bottom:24px;">
                  <div style="font-size:13px;font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:#FF2E3C;">Step ${state.step + 1} of ${steps.length}</div>
                  <h3 style="font-family:'Space Grotesk';font-size:clamp(38px,5vw,66px);line-height:.98;letter-spacing:-.035em;margin:10px 0 12px;">${escapeHtml(step.title)}</h3>
                  <p style="font-size:17px;line-height:1.6;color:rgba(244,246,251,.64);margin:0;">${escapeHtml(step.kicker)}</p>
                </div>
                ${state.error ? `<div role="alert" style="margin-bottom:16px;padding:12px 14px;border-radius:12px;background:rgba(255,46,60,.1);border:1px solid rgba(255,46,60,.28);color:#FFB3B8;font-size:13.5px;font-weight:800;">${escapeHtml(state.error)}</div>` : ''}
                ${renderStep(step)}
              </div>
            </main>
            <footer style="display:flex;align-items:center;justify-content:space-between;gap:14px;padding:18px clamp(20px,4vw,34px);border-top:1px solid rgba(255,255,255,.08);">
              <button type="button" data-factory-prev style="min-height:48px;padding:13px 22px;border-radius:14px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:#fff;font-weight:800;font-family:'Manrope',sans-serif;cursor:pointer;">Previous</button>
              <div style="font-size:13px;color:rgba(244,246,251,.52);text-align:center;">${escapeHtml(quote.tier)} configuration</div>
              ${state.step === steps.length - 1 ? `<button type="button" data-factory-submit style="min-height:48px;padding:13px 22px;border-radius:14px;border:0;background:linear-gradient(135deg,#1FA2FF,#FF2E3C);color:#070B16;font-weight:900;font-family:'Manrope',sans-serif;cursor:pointer;box-shadow:0 10px 34px rgba(28,127,214,.34);">${state.submitting ? 'Sending...' : 'Request My AI Employee'}</button>` : `<button type="button" data-factory-next style="min-height:48px;padding:13px 22px;border-radius:14px;border:0;background:linear-gradient(135deg,#1FA2FF,#FF2E3C);color:#070B16;font-weight:900;font-family:'Manrope',sans-serif;cursor:pointer;box-shadow:0 10px 34px rgba(28,127,214,.34);">Continue</button>`}
            </footer>
          </section>
          <aside id="cf-employee-factory-summary" style="display:${compact ? 'none' : 'block'};min-width:0;overflow:auto;padding:clamp(22px,3vw,30px);background:rgba(255,255,255,.018);">
            ${renderSummary(quote)}
          </aside>
        </div>
      </div>`;

    bindEvents();
  }

  function renderStep(step) {
    if (step.id === 'industry') return renderSingleGrid('industry', industries);
    if (step.id === 'employee') return renderSingleGrid('employee', employees);
    if (step.id === 'personality') return renderSingleGrid('personality', personalities);
    if (step.id === 'voice') return renderVoiceStep();
    if (step.id === 'languages') return renderMultiGrid('languages', languages);
    if (step.id === 'capabilities') return renderMultiGrid('capabilities', capabilities);
    if (step.id === 'knowledge') return renderKnowledgeStep();
    if (step.id === 'schedule') return renderSingleGrid('schedule', schedules);
    if (step.id === 'appearance') return renderAppearanceStep();
    if (step.id === 'pricing') return renderPricingStep();
    if (step.id === 'launch') return renderLaunchStep();
    return '';
  }

  function renderSingleGrid(key, options) {
    return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(210px,100%),1fr));gap:14px;">${options.map((option) => optionCard(key, option, state[key] === option, false)).join('')}</div>`;
  }

  function renderMultiGrid(key, options) {
    const selected = state[key] || [];
    return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(210px,100%),1fr));gap:14px;">${options.map((option) => optionCard(key, option, selected.includes(option), true)).join('')}</div>`;
  }

  function optionCard(key, option, active, multi) {
    return `<button type="button" data-factory-option-key="${escapeAttr(key)}" data-factory-option-value="${escapeAttr(option)}" data-factory-option-multi="${multi ? '1' : '0'}" aria-pressed="${active ? 'true' : 'false'}" style="min-height:96px;text-align:left;padding:18px;border-radius:20px;background:${active ? 'linear-gradient(135deg,rgba(31,162,255,.18),rgba(255,46,60,.12))' : 'rgba(255,255,255,.035)'};border:1px solid ${active ? 'rgba(31,162,255,.5)' : 'rgba(255,255,255,.09)'};color:#fff;cursor:pointer;font-family:'Manrope',sans-serif;box-shadow:${active ? '0 16px 44px rgba(28,127,214,.18)' : 'none'};transition:transform .22s ease,border-color .22s ease,background .22s ease;">
      <span style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;">
        <span style="font-family:'Space Grotesk';font-size:19px;font-weight:800;line-height:1.18;">${escapeHtml(option)}</span>
        <span aria-hidden="true" style="width:18px;height:18px;border-radius:50%;border:1px solid ${active ? '#1FA2FF' : 'rgba(255,255,255,.22)'};background:${active ? 'linear-gradient(135deg,#1FA2FF,#FF2E3C)' : 'transparent'};box-shadow:${active ? '0 0 18px rgba(31,162,255,.45)' : 'none'};"></span>
      </span>
      <span style="display:block;margin-top:10px;font-size:13px;line-height:1.45;color:rgba(244,246,251,.55);">${escapeHtml(optionDescription(key, option))}</span>
    </button>`;
  }

  function optionDescription(key, option) {
    if (key === 'industry') return option === 'Custom Business' ? 'Built around your exact operating model.' : 'Prepares industry-specific intake and service logic.';
    if (key === 'employee') return option === 'AI Manager' ? 'Coordinates a broader digital team.' : 'Owns a clear business function from day one.';
    if (key === 'personality') return 'Controls tone, pace, and customer-facing presence.';
    if (key === 'schedule') return option === '24/7' ? 'Always available for customers and teams.' : 'Availability aligned with business operations.';
    return 'Configured through the Carriersfy AI Platform.';
  }

  function renderVoiceStep() {
    return `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr));gap:14px;">
        ${voices.map((voice) => {
          const active = state.voice === voice;
          return `<button type="button" data-factory-voice="${escapeAttr(voice)}" aria-pressed="${active ? 'true' : 'false'}" style="min-height:118px;text-align:left;padding:18px;border-radius:20px;background:${active ? 'linear-gradient(135deg,rgba(31,162,255,.18),rgba(255,46,60,.12))' : 'rgba(255,255,255,.035)'};border:1px solid ${active ? 'rgba(31,162,255,.5)' : 'rgba(255,255,255,.09)'};color:#fff;cursor:pointer;font-family:'Manrope',sans-serif;">
            <span style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
              <span style="font-family:'Space Grotesk';font-size:20px;font-weight:900;">${escapeHtml(voice)}</span>
              <span aria-hidden="true" style="width:38px;height:38px;border-radius:14px;background:linear-gradient(135deg,rgba(31,162,255,.2),rgba(255,46,60,.18));border:1px solid rgba(255,255,255,.13);display:grid;place-items:center;">&#9654;</span>
            </span>
            <span style="display:block;margin-top:12px;font-size:13px;color:rgba(244,246,251,.58);">Listen to a private preview tone for this voice direction.</span>
          </button>`;
        }).join('')}
      </div>
      <div aria-live="polite" style="margin-top:18px;padding:16px;border-radius:18px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.09);color:rgba(244,246,251,.68);font-size:14px;">${escapeHtml(state.voicePreview || 'Choose a voice to hear an instant sample preview.')}</div>`;
  }

  function renderKnowledgeStep() {
    return `
      ${renderMultiGrid('knowledgeTypes', knowledgeTypes)}
      <div style="margin-top:20px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr));gap:16px;">
        <label style="display:block;padding:18px;border-radius:20px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.09);">
          <span style="display:block;font-family:'Space Grotesk';font-size:20px;font-weight:900;margin-bottom:10px;">Knowledge Upload Placeholder</span>
          <input data-factory-files type="file" multiple style="width:100%;color:rgba(244,246,251,.68);font-family:'Manrope',sans-serif;">
          <span style="display:block;margin-top:10px;font-size:12.5px;line-height:1.45;color:rgba(244,246,251,.48);">Files are not uploaded in this version. Their names are saved only in the local planning summary.</span>
        </label>
        <label style="display:block;padding:18px;border-radius:20px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.09);">
          <span style="display:block;font-family:'Space Grotesk';font-size:20px;font-weight:900;margin-bottom:10px;">Website Knowledge</span>
          <input data-factory-field="websiteKnowledge" value="${escapeAttr(state.websiteKnowledge)}" placeholder="https://yourcompany.com" style="width:100%;padding:14px 15px;border-radius:13px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.14);color:#fff;font-size:14.5px;font-family:'Manrope',sans-serif;outline:none;">
        </label>
      </div>
      ${state.knowledgeFiles.length ? `<div style="margin-top:14px;font-size:13px;color:rgba(244,246,251,.58);">Selected files: ${escapeHtml(state.knowledgeFiles.join(', '))}</div>` : ''}`;
  }

  function renderAppearanceStep() {
    return `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(210px,100%),1fr));gap:14px;">${appearances.map((option) => optionCard('appearance', option, state.appearance === option, false)).join('')}</div>
      <div style="margin-top:22px;padding:20px;border-radius:24px;background:linear-gradient(135deg,rgba(31,162,255,.12),rgba(255,46,60,.1));border:1px solid rgba(255,255,255,.11);display:flex;align-items:center;gap:18px;flex-wrap:wrap;">
        <div style="width:86px;height:86px;border-radius:28px;background:linear-gradient(135deg,#1FA2FF,#FF2E3C);box-shadow:0 0 48px rgba(28,127,214,.36);display:grid;place-items:center;font-family:'Space Grotesk';font-size:30px;font-weight:900;color:#070B16;">${escapeHtml((state.employee || 'AI').slice(0, 2).toUpperCase())}</div>
        <div>
          <div style="font-family:'Space Grotesk';font-size:25px;font-weight:900;">Preview Avatar</div>
          <div style="font-size:14px;line-height:1.55;color:rgba(244,246,251,.62);margin-top:4px;">A premium visual identity will be designed after Sophia reviews the selected style.</div>
        </div>
      </div>`;
  }

  function renderPricingStep() {
    const quote = estimate();
    return `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr));gap:16px;">
        ${quoteTile('Monthly Platform', quote.monthlyRange, 'Planning range only')}
        ${quoteTile('One-Time Setup', quote.setupRange, 'Planning range only')}
        ${quoteTile('Enterprise Features', quote.tier, `${state.capabilities.length || 0} selected capabilities`)}
        ${quoteTile('Estimated Launch Time', quote.launchTime, 'Final schedule after review')}
      </div>
      <label style="display:block;margin-top:20px;">
        <span style="display:block;font-size:12px;font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:#1FA2FF;margin-bottom:9px;">Additional Notes</span>
        <textarea data-factory-field="customNotes" placeholder="Tell Sophia what this employee must accomplish first." style="width:100%;min-height:110px;padding:15px 16px;border-radius:16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.14);color:#fff;font-size:15px;font-family:'Manrope',sans-serif;outline:none;resize:vertical;">${escapeHtml(state.customNotes)}</textarea>
      </label>
      <p style="font-size:13.5px;line-height:1.6;color:rgba(244,246,251,.56);margin:18px 0 0;">This quote is a planning estimate only. Sophia will route the configuration for human review before any agreement is prepared.</p>`;
  }

  function quoteTile(label, value, caption) {
    return `<div style="padding:22px;border-radius:22px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.09);">
      <div style="font-size:12px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:${label.indexOf('Setup') >= 0 ? '#FF2E3C' : '#1FA2FF'};">${escapeHtml(label)}</div>
      <div style="font-family:'Space Grotesk';font-size:clamp(26px,4vw,36px);font-weight:900;margin-top:8px;line-height:1;">${escapeHtml(value)}</div>
      <div style="font-size:13px;color:rgba(244,246,251,.55);margin-top:8px;">${escapeHtml(caption)}</div>
    </div>`;
  }

  function renderLaunchStep() {
    if (state.submitted) {
      return `
        <div style="min-height:430px;display:grid;place-items:center;text-align:center;">
          <div style="max-width:650px;">
            <div style="width:82px;height:82px;margin:0 auto 22px;border-radius:28px;background:linear-gradient(135deg,#1FA2FF,#FF2E3C);display:grid;place-items:center;color:#070B16;font-size:34px;font-weight:900;box-shadow:0 0 54px rgba(28,127,214,.42);">&#10003;</div>
            <h3 style="font-family:'Space Grotesk';font-size:clamp(38px,6vw,64px);line-height:.98;letter-spacing:-.035em;margin:0;">Sophia received your Digital Employee.</h3>
            <p style="font-size:17px;line-height:1.65;color:rgba(244,246,251,.66);margin:20px 0 0;">Your configuration is ready for Carriersfy AI review.</p>
            <button type="button" data-factory-reset style="margin-top:28px;min-height:48px;padding:13px 22px;border-radius:14px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:#fff;font-weight:800;font-family:'Manrope',sans-serif;cursor:pointer;">Build Another Employee</button>
          </div>
        </div>`;
    }
    return `
      <div style="display:grid;gap:18px;">
        <div style="padding:24px;border-radius:24px;background:linear-gradient(135deg,rgba(31,162,255,.14),rgba(255,46,60,.12));border:1px solid rgba(255,255,255,.12);">
          <div style="font-family:'Space Grotesk';font-size:28px;font-weight:900;">Ready for Sophia</div>
          <p style="font-size:15.5px;line-height:1.65;color:rgba(244,246,251,.66);margin:8px 0 0;">Submit the complete Digital Employee Factory configuration for review and proposal preparation.</p>
        </div>
        ${renderCompactSummary(estimate())}
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr));gap:16px;">
          ${[
            ['name', 'Your Name', 'Jane Founder'],
            ['email', 'Email', 'you@company.com'],
            ['phone', 'Phone', '+1 555 000 0000'],
            ['business', 'Business', 'Company name']
          ].map(([key, label, placeholder]) => `
            <label style="display:block;">
              <span style="display:block;font-size:12.5px;font-weight:700;color:rgba(244,246,251,.62);margin-bottom:8px;">${label}</span>
              <input data-factory-contact-field="${key}" value="${escapeAttr(state.contact[key] || '')}" placeholder="${escapeAttr(placeholder)}" style="width:100%;padding:14px 15px;border-radius:13px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.14);color:#fff;font-size:14.5px;font-family:'Manrope',sans-serif;outline:none;">
            </label>`).join('')}
        </div>
      </div>`;
  }

  function renderSummary(quote) {
    return `
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:22px;">
        <div style="position:relative;width:58px;height:58px;border-radius:18px;background:linear-gradient(135deg,#1FA2FF,#FF2E3C);display:grid;place-items:center;font-family:'Space Grotesk';font-weight:900;color:#070B16;box-shadow:0 0 42px rgba(28,127,214,.34);">DE</div>
        <div>
          <div style="font-family:'Space Grotesk';font-size:21px;font-weight:900;">Live Factory Summary</div>
          <div style="font-size:12px;color:#35D6A0;font-weight:900;">Powered by Sophia</div>
        </div>
      </div>
      <div style="position:relative;margin-bottom:18px;padding:20px;border-radius:22px;background:linear-gradient(135deg,rgba(31,162,255,.13),rgba(255,46,60,.1));border:1px solid rgba(255,255,255,.11);overflow:hidden;">
        <div style="position:absolute;right:-34px;top:-34px;width:92px;height:92px;border-radius:50%;border:1px solid rgba(255,255,255,.12);animation:cfFactoryOrbit 12s linear infinite;"></div>
        <div style="font-size:12px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:rgba(244,246,251,.62);">Monthly Platform</div>
        <div style="font-family:'Space Grotesk';font-size:32px;font-weight:900;margin-top:8px;">${escapeHtml(quote.monthlyRange)}</div>
        <div style="font-size:13px;color:rgba(244,246,251,.58);margin-top:6px;">Planning estimate placeholder</div>
      </div>
      ${renderCompactSummary(quote)}
    `;
  }

  function renderCompactSummary(quote) {
    return `
      <div style="display:grid;gap:0;border-top:1px solid rgba(255,255,255,.07);">
        ${summaryRow('Industry', state.industry)}
        ${summaryRow('Employee', state.employee)}
        ${summaryRow('Personality', state.personality)}
        ${summaryRow('Voice', state.voice)}
        ${summaryRow('Languages', state.languages.join(', '))}
        ${summaryRow('Capabilities', state.capabilities.join(', '))}
        ${summaryRow('Knowledge', [].concat(state.knowledgeTypes, state.websiteKnowledge ? ['Website'] : [], state.knowledgeFiles).join(', '))}
        ${summaryRow('Schedule', state.schedule)}
        ${summaryRow('Appearance', state.appearance)}
        ${summaryRow('One-Time Setup', quote.setupRange)}
        ${summaryRow('Launch Time', quote.launchTime)}
        ${summaryRow('Enterprise Features', quote.tier)}
      </div>
      <div style="margin-top:18px;padding:12px 14px;border-radius:14px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.09);font-size:12.5px;line-height:1.5;color:rgba(244,246,251,.56);">Every selection is planned through the proprietary Carriersfy AI Platform.</div>`;
  }

  function summaryRow(label, value) {
    return `<div style="display:flex;justify-content:space-between;gap:14px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.07);font-size:13.5px;color:rgba(244,246,251,.56);"><span>${escapeHtml(label)}</span><strong style="color:#fff;text-align:right;max-width:58%;">${escapeHtml(value || 'Pending')}</strong></div>`;
  }

  function renderSummaryOnly() {
    const panel = document.getElementById('cf-employee-factory-summary');
    if (panel) panel.innerHTML = renderSummary(estimate());
  }

  function bindEvents() {
    const close = document.getElementById('cf-employee-factory-close');
    if (close) close.addEventListener('click', closeFactory);
    const prev = document.querySelector('[data-factory-prev]');
    if (prev) prev.addEventListener('click', prevStep);
    const next = document.querySelector('[data-factory-next]');
    if (next) next.addEventListener('click', nextStep);
    const submit = document.querySelector('[data-factory-submit]');
    if (submit) submit.addEventListener('click', submitFactory);
    const reset = document.querySelector('[data-factory-reset]');
    if (reset) reset.addEventListener('click', resetFactory);

    document.querySelectorAll('[data-factory-option-key]').forEach((button) => {
      button.addEventListener('click', () => {
        const key = button.getAttribute('data-factory-option-key');
        const value = button.getAttribute('data-factory-option-value');
        const multi = button.getAttribute('data-factory-option-multi') === '1';
        if (multi) toggleMulti(key, value);
        else selectSingle(key, value);
      });
    });
    document.querySelectorAll('[data-factory-voice]').forEach((button) => {
      button.addEventListener('click', () => playVoicePreview(button.getAttribute('data-factory-voice')));
    });
    document.querySelectorAll('[data-factory-field]').forEach((input) => {
      input.addEventListener('input', () => setField(input.getAttribute('data-factory-field'), input.value));
    });
    document.querySelectorAll('[data-factory-contact-field]').forEach((input) => {
      input.addEventListener('input', () => setContact(input.getAttribute('data-factory-contact-field'), input.value));
    });
    const files = document.querySelector('[data-factory-files]');
    if (files) {
      files.addEventListener('change', () => {
        state.knowledgeFiles = Array.from(files.files || []).map((file) => file.name).slice(0, 12);
        saveState();
        render();
      });
    }
  }

  async function submitFactory() {
    if (!state.contact.name || !state.contact.email) {
      state.error = 'Name and email are required to request your AI Employee.';
      render();
      return;
    }
    state.submitting = true;
    state.error = '';
    render();

    const quote = estimate();
    const configuration = buildConfiguration(quote);
    const data = {
      name: state.contact.name,
      business: state.contact.business,
      email: state.contact.email,
      phone: state.contact.phone,
      industry: state.industry,
      message: buildProposalMessage(configuration),
      sophiaPipeline: {
        owner: 'Sophia',
        source: 'digital_employee_factory',
        status: 'new',
        intent: 'Request My AI Employee',
        routingQueue: 'carriersfy-ai-inbound-leads',
        flow: ['digital_employee_factory', 'sophia', 'review_placeholder', 'proposal_placeholder', 'launch_placeholder'],
        crmStatus: 'prepared_not_connected',
        whatsappStatus: 'prepared_not_connected',
        appointmentStatus: 'prepared_not_connected'
      },
      employeeFactory: configuration
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Factory request failed with ' + res.status);
      state.submitted = true;
    } catch (err) {
      state.error = 'Sophia could not send the factory request. Please try again or email hello@carriersfy.ai.';
    } finally {
      state.submitting = false;
      saveState();
      render();
    }
  }

  function buildConfiguration(quote) {
    return {
      industry: state.industry,
      employee: state.employee,
      personality: state.personality,
      voice: state.voice,
      languages: state.languages,
      capabilities: state.capabilities,
      businessKnowledge: {
        selectedTypes: state.knowledgeTypes,
        website: state.websiteKnowledge,
        fileNames: state.knowledgeFiles
      },
      schedule: state.schedule,
      appearance: state.appearance,
      notes: state.customNotes,
      estimates: {
        monthlyPlatform: quote.monthlyRange,
        oneTimeSetup: quote.setupRange,
        enterpriseFeatures: quote.tier,
        estimatedLaunchTime: quote.launchTime
      }
    };
  }

  function buildProposalMessage(config) {
    return [
      'Digital Employee Factory Request',
      '',
      `Industry: ${config.industry || 'Pending'}`,
      `Employee: ${config.employee || 'Pending'}`,
      `Personality: ${config.personality || 'Pending'}`,
      `Voice: ${config.voice || 'Pending'}`,
      `Languages: ${config.languages.join(', ') || 'Pending'}`,
      `Capabilities: ${config.capabilities.join(', ') || 'Pending'}`,
      `Business Knowledge: ${config.businessKnowledge.selectedTypes.join(', ') || 'Pending'}`,
      `Website Knowledge: ${config.businessKnowledge.website || 'Pending'}`,
      `Knowledge Files: ${config.businessKnowledge.fileNames.join(', ') || 'None selected'}`,
      `Schedule: ${config.schedule || 'Pending'}`,
      `Appearance: ${config.appearance || 'Pending'}`,
      `Monthly Platform: ${config.estimates.monthlyPlatform}`,
      `One-Time Setup: ${config.estimates.oneTimeSetup}`,
      `Enterprise Features: ${config.estimates.enterpriseFeatures}`,
      `Estimated Launch Time: ${config.estimates.estimatedLaunchTime}`,
      '',
      'All numbers are planning estimates only.'
    ].join('\n');
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/`/g, '&#96;');
  }

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-employee-factory-open]');
    if (!trigger) return;
    event.preventDefault();
    openFactory();
  });

  window.CF_DIGITAL_EMPLOYEE_FACTORY = {
    open: openFactory,
    close: closeFactory,
    getState: () => JSON.parse(JSON.stringify(state))
  };
})();

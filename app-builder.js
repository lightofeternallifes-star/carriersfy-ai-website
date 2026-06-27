(function () {
  const STORAGE_KEY = 'cfAppBuilderState';

  const projectTypes = [
    'Restaurant',
    'Medical',
    'Law Firm',
    'Church',
    'Transportation',
    'Construction',
    'Education',
    'Real Estate',
    'Marketplace',
    'SaaS',
    'Enterprise',
    'Internal Company Platform',
    'Customer Portal',
    'Mobile App',
    'AI Assistant',
    'Custom Solution'
  ];

  const industries = (window.CF_INDUSTRIES || []).map(function (i) { return i.icon + ' ' + i.name.en; });

  const targetUsers = [
    'Customers',
    'Patients',
    'Members',
    'Employees',
    'Managers',
    'Field Teams',
    'Vendors',
    'Partners',
    'Public Users',
    'Private Internal Users'
  ];

  const platforms = ['iPhone', 'Android', 'Web', 'Desktop'];

  const features = [
    'Carriersfy AI Intelligence',
    'Notifications',
    'Maps',
    'Payments',
    'Chat',
    'Scheduling',
    'CRM',
    'Dashboards',
    'Reports',
    'User Accounts',
    'Customer Portal',
    'Admin Controls',
    'Content Management',
    'Internal Workflows'
  ];

  const languages = ['English', 'Spanish', 'Portuguese', 'French', 'Custom'];
  const timelines = ['Fast Launch', 'Balanced Build', 'Full Product Build', 'Enterprise Roadmap'];
  const complexityLevels = ['Focused', 'Advanced', 'Enterprise', 'Custom'];

  const steps = [
    { id: 'welcome', title: 'Build Your App' },
    { id: 'project', title: 'Project Type' },
    { id: 'industry', title: 'Industry' },
    { id: 'users', title: 'Target Users' },
    { id: 'platforms', title: 'Platforms' },
    { id: 'features', title: 'Required Features' },
    { id: 'languages', title: 'Languages' },
    { id: 'timeline', title: 'Timeline' },
    { id: 'complexity', title: 'Estimated Complexity' },
    { id: 'summary', title: 'Project Summary' },
    { id: 'proposal', title: 'Request Proposal' }
  ];

  const state = loadState();

  function defaultState() {
    return {
      step: 0,
      projectName: '',
      projectType: '',
      industry: '',
      targetUsers: [],
      platforms: [],
      features: [],
      languages: [],
      timeline: '',
      complexity: '',
      contact: {
        name: '',
        email: '',
        phone: '',
        company: ''
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
      contact: { ...base.contact, ...(saved && saved.contact ? saved.contact : {}) }
    };
  }

  function saveState() {
    try {
      window.localStorage && window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage is optional */
    }
  }

  function openBuilder() {
    const modal = ensureModal();
    window.__cfAppBuilderLastFocus = document.activeElement;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    render();
    const close = document.getElementById('cf-app-builder-close');
    if (close) close.focus();
  }

  function closeBuilder() {
    const modal = document.getElementById('cf-app-builder-modal');
    if (!modal) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (window.__cfAppBuilderLastFocus && window.__cfAppBuilderLastFocus.focus) window.__cfAppBuilderLastFocus.focus();
  }

  function ensureModal() {
    let modal = document.getElementById('cf-app-builder-modal');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = 'cf-app-builder-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-labelledby', 'cf-app-builder-title');
    modal.style.cssText = 'display:none;position:fixed;inset:0;z-index:132;background:rgba(7,11,22,.84);backdrop-filter:blur(24px);padding:18px;align-items:center;justify-content:center;';
    document.body.appendChild(modal);

    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeBuilder();
    });
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', () => {
      const active = document.getElementById('cf-app-builder-modal');
      if (active && active.style.display !== 'none') render();
    });
    return modal;
  }

  function onKeyDown(event) {
    const modal = document.getElementById('cf-app-builder-modal');
    if (!modal || modal.style.display === 'none') return;
    if (event.key === 'Escape') closeBuilder();
    if (event.key === 'Tab') {
      const focusable = Array.from(modal.querySelectorAll('a[href],button:not([disabled]),input,select'));
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
    const platformCount = state.platforms.length || 1;
    const featureCount = state.features.length || 1;
    const languageCount = state.languages.length || 1;
    const complexityMultiplier = {
      Focused: 1,
      Advanced: 1.45,
      Enterprise: 2.1,
      Custom: 2.4
    }[state.complexity || 'Focused'];
    const development = (8500 + platformCount * 2800 + featureCount * 950 + languageCount * 600) * complexityMultiplier;
    const monthly = (450 + platformCount * 120 + featureCount * 45) * complexityMultiplier;
    const timeline = state.timeline || timelineFromComplexity();
    return {
      development,
      monthly,
      timeline,
      complexity: state.complexity || complexityFromSelections(),
      developmentRange: `${money(development * 0.85)}-${money(development * 1.25)}`,
      monthlyRange: `${money(monthly * 0.85)}-${money(monthly * 1.25)}/mo`
    };
  }

  function complexityFromSelections() {
    const score = state.platforms.length + state.features.length + state.languages.length;
    if (score >= 15) return 'Enterprise';
    if (score >= 9) return 'Advanced';
    return 'Focused';
  }

  function timelineFromComplexity() {
    const complexity = complexityFromSelections();
    if (complexity === 'Enterprise') return 'Enterprise Roadmap';
    if (complexity === 'Advanced') return 'Full Product Build';
    return 'Balanced Build';
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
    if (id === 'project') return Boolean(state.projectType);
    if (id === 'industry') return Boolean(state.industry);
    if (id === 'users') return state.targetUsers.length > 0;
    if (id === 'platforms') return state.platforms.length > 0;
    if (id === 'features') return state.features.length > 0;
    if (id === 'languages') return state.languages.length > 0;
    return true;
  }

  function nextStep() {
    if (!canAdvance()) {
      state.error = 'Choose at least one option before continuing.';
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

  function resetBuilder() {
    Object.keys(state).forEach((key) => delete state[key]);
    Object.assign(state, defaultState());
    saveState();
    render();
  }

  function render() {
    const modal = ensureModal();
    const step = steps[state.step];
    const progress = Math.round(((state.step + 1) / steps.length) * 100);
    const compact = window.innerWidth < 900;

    modal.innerHTML = `
      <div style="width:min(1220px,100%);height:min(840px,calc(100vh - 36px));overflow:hidden;border-radius:30px;background:linear-gradient(180deg,rgba(13,18,32,.98),rgba(8,11,20,.98));border:1px solid rgba(255,255,255,.13);box-shadow:0 44px 120px rgba(0,0,0,.72);position:relative;color:#F4F6FB;font-family:'Manrope',sans-serif;">
        <div style="position:absolute;top:-120px;right:-90px;width:340px;height:340px;border-radius:50%;background:radial-gradient(circle,rgba(31,162,255,.34),transparent 70%);filter:blur(30px);pointer-events:none;"></div>
        <div style="position:absolute;bottom:-140px;left:-90px;width:330px;height:330px;border-radius:50%;background:radial-gradient(circle,rgba(255,46,60,.22),transparent 70%);filter:blur(32px);pointer-events:none;"></div>
        <div style="position:relative;display:grid;grid-template-columns:${compact ? 'minmax(0,1fr)' : 'minmax(0,1fr) minmax(330px,410px)'};height:100%;">
          <div style="display:flex;min-width:0;flex-direction:column;${compact ? '' : 'border-right:1px solid rgba(255,255,255,.08);'}">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;padding:22px clamp(20px,4vw,34px);border-bottom:1px solid rgba(255,255,255,.08);">
              <div>
                <div style="font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#1FA2FF;">Carriersfy AI Platform</div>
                <h2 id="cf-app-builder-title" style="font-family:'Space Grotesk';font-weight:700;font-size:clamp(24px,3vw,34px);line-height:1.08;margin:5px 0 0;">${escapeHtml(step.title)}</h2>
              </div>
              <button id="cf-app-builder-close" type="button" aria-label="Close Build Your App experience" style="width:42px;height:42px;border-radius:13px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05);color:#fff;font-size:22px;line-height:1;cursor:pointer;">x</button>
            </div>
            <div style="padding:0 clamp(20px,4vw,34px);height:4px;background:rgba(255,255,255,.05);"><div style="width:${progress}%;height:4px;background:linear-gradient(135deg,#1FA2FF,#FF2E3C);border-radius:100px;transition:width .3s ease;"></div></div>
            <div style="flex:1;overflow:auto;padding:clamp(22px,4vw,36px);">
              ${state.error ? `<div style="margin-bottom:16px;padding:12px 14px;border-radius:12px;background:rgba(255,46,60,.1);border:1px solid rgba(255,46,60,.28);color:#FFB3B8;font-size:13.5px;font-weight:700;">${escapeHtml(state.error)}</div>` : ''}
              ${renderStep(step)}
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px clamp(20px,4vw,34px);border-top:1px solid rgba(255,255,255,.08);">
              <button type="button" data-app-builder-prev style="min-height:48px;padding:13px 22px;border-radius:14px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:#fff;font-weight:800;font-family:'Manrope',sans-serif;cursor:pointer;">Previous</button>
              <div style="font-size:13px;color:rgba(244,246,251,.52);">Step ${state.step + 1} of ${steps.length}</div>
              ${state.step === steps.length - 1 ? `<button type="button" data-app-builder-submit style="min-height:48px;padding:13px 22px;border-radius:14px;border:0;background:linear-gradient(135deg,#1FA2FF,#FF2E3C);color:#070B16;font-weight:900;font-family:'Manrope',sans-serif;cursor:pointer;box-shadow:0 10px 34px rgba(28,127,214,.34);">${state.submitting ? 'Sending...' : 'Request Proposal'}</button>` : `<button type="button" data-app-builder-next style="min-height:48px;padding:13px 22px;border-radius:14px;border:0;background:linear-gradient(135deg,#1FA2FF,#FF2E3C);color:#070B16;font-weight:900;font-family:'Manrope',sans-serif;cursor:pointer;box-shadow:0 10px 34px rgba(28,127,214,.34);">Continue</button>`}
            </div>
          </div>
          <aside id="cf-app-builder-summary" style="display:${compact ? 'none' : 'block'};min-width:0;overflow:auto;padding:clamp(22px,3vw,30px);background:rgba(255,255,255,.018);">
            ${renderSummary(estimate())}
          </aside>
        </div>
      </div>`;

    bindEvents();
  }

  function renderStep(step) {
    if (step.id === 'welcome') return renderWelcome();
    if (step.id === 'project') return renderProjectType();
    if (step.id === 'industry') return renderSingleGrid('industry', industries);
    if (step.id === 'users') return renderMultiGrid('targetUsers', targetUsers);
    if (step.id === 'platforms') return renderPlatformStep();
    if (step.id === 'features') return renderFeatureStep();
    if (step.id === 'languages') return renderMultiGrid('languages', languages);
    if (step.id === 'timeline') return renderSingleGrid('timeline', timelines);
    if (step.id === 'complexity') return renderSingleGrid('complexity', complexityLevels);
    if (step.id === 'summary') return renderProjectSummary();
    if (step.id === 'proposal') return renderProposal();
    return '';
  }

  function renderWelcome() {
    return `
      <div style="min-height:430px;display:grid;place-items:center;text-align:center;">
        <div style="max-width:760px;">
          <div style="width:88px;height:88px;margin:0 auto 24px;border-radius:28px;background:linear-gradient(135deg,#1FA2FF,#FF2E3C);display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk';font-size:34px;font-weight:900;color:#070B16;box-shadow:0 0 52px rgba(28,127,214,.42);">APP</div>
          <h3 style="font-family:'Space Grotesk';font-size:clamp(42px,6vw,78px);line-height:.98;letter-spacing:-.035em;margin:0;">Build Your <span style="display:block;background:linear-gradient(110deg,#3FB0FF,#1C7FD6 42%,#FF2E3C);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;">Dream Application</span></h3>
          <p style="font-size:20px;line-height:1.55;color:rgba(244,246,251,.66);margin:24px auto 0;max-width:640px;">Design the future of your business with the Carriersfy AI Platform.</p>
          ${renderCaseStudyMini()}
        </div>
      </div>`;
  }

  function renderCaseStudyMini() {
    return `
      <div style="margin-top:34px;padding:20px;border-radius:24px;background:linear-gradient(135deg,rgba(31,162,255,.12),rgba(255,46,60,.1));border:1px solid rgba(255,255,255,.11);text-align:left;">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:18px;flex-wrap:wrap;">
          <div>
            <div style="font-size:12px;font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:#FF2E3C;">Built by Carriersfy AI</div>
            <div style="font-family:'Space Grotesk';font-size:26px;font-weight:800;margin-top:4px;">Light of Life</div>
            <div style="font-size:14px;line-height:1.55;color:rgba(244,246,251,.62);margin-top:6px;">Designed by Carriersfy AI. Developed by Carriersfy AI. Published successfully. Available on the App Store.</div>
          </div>
          <div style="display:flex;gap:8px;">
            <div style="width:58px;height:86px;border-radius:14px;background:linear-gradient(180deg,rgba(244,246,251,.2),rgba(31,162,255,.08));border:1px solid rgba(255,255,255,.12);"></div>
            <div style="width:58px;height:86px;border-radius:14px;background:linear-gradient(180deg,rgba(255,46,60,.18),rgba(255,255,255,.05));border:1px solid rgba(255,255,255,.12);"></div>
            <div style="width:58px;height:86px;border-radius:14px;background:linear-gradient(180deg,rgba(31,162,255,.18),rgba(255,255,255,.05));border:1px solid rgba(255,255,255,.12);"></div>
          </div>
        </div>
      </div>`;
  }

  function renderProjectType() {
    return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr));gap:14px;">${projectTypes.map((type) => optionButton('projectType', type, state.projectType === type)).join('')}</div>`;
  }

  function renderSingleGrid(key, options) {
    return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr));gap:14px;">${options.map((option) => optionButton(key, option, state[key] === option)).join('')}</div>`;
  }

  function renderMultiGrid(key, options) {
    const selected = state[key] || [];
    return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr));gap:14px;">${options.map((option) => optionButton(key, option, selected.includes(option), true)).join('')}</div>`;
  }

  function renderPlatformStep() {
    return `
      ${renderMultiGrid('platforms', platforms)}
      <p style="font-size:14px;line-height:1.6;color:rgba(244,246,251,.56);margin:22px 0 0;">Choose every surface where your product should exist. The Carriersfy AI Platform will convert this into a planning estimate.</p>`;
  }

  function renderFeatureStep() {
    return `
      ${renderMultiGrid('features', features)}
      <div style="margin-top:22px;padding:18px;border-radius:20px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.09);">
        <div style="font-family:'Space Grotesk';font-size:22px;font-weight:800;margin-bottom:8px;">Powered by the Carriersfy AI Platform</div>
        <p style="font-size:14.5px;line-height:1.6;color:rgba(244,246,251,.62);margin:0;">Every intelligent feature is planned as a proprietary Carriersfy AI capability. No internal systems are exposed.</p>
      </div>`;
  }

  function optionButton(key, option, active, multi) {
    return `<button type="button" data-app-option-key="${escapeAttr(key)}" data-app-option-value="${escapeAttr(option)}" data-app-option-multi="${multi ? '1' : '0'}" style="min-height:92px;text-align:left;padding:18px;border-radius:18px;background:${active ? 'linear-gradient(135deg,rgba(31,162,255,.18),rgba(255,46,60,.12))' : 'rgba(255,255,255,.035)'};border:1px solid ${active ? 'rgba(31,162,255,.48)' : 'rgba(255,255,255,.09)'};color:#fff;cursor:pointer;font-family:'Manrope',sans-serif;">
      <span style="font-family:'Space Grotesk';font-size:19px;font-weight:800;">${escapeHtml(option)}</span>
    </button>`;
  }

  function renderProjectSummary() {
    const pricing = estimate();
    return `
      <div style="display:grid;gap:18px;">
        <div style="padding:26px;border-radius:24px;background:linear-gradient(135deg,rgba(31,162,255,.14),rgba(255,46,60,.12));border:1px solid rgba(255,255,255,.12);">
          <label style="display:block;">
            <span style="display:block;font-size:12px;font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:#1FA2FF;margin-bottom:9px;">Project Name</span>
            <input data-app-field="projectName" value="${escapeAttr(state.projectName)}" placeholder="Name your future application" style="width:100%;padding:15px 16px;border-radius:14px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.15);color:#fff;font-size:16px;font-family:'Manrope',sans-serif;outline:none;">
          </label>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr));gap:14px;">
          <div style="padding:22px;border-radius:20px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.09);"><div style="font-size:12px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:#1FA2FF;">Estimated Timeline</div><div style="font-family:'Space Grotesk';font-size:28px;font-weight:900;margin-top:8px;">${escapeHtml(pricing.timeline)}</div></div>
          <div style="padding:22px;border-radius:20px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.09);"><div style="font-size:12px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:#FF2E3C;">Estimated Complexity</div><div style="font-family:'Space Grotesk';font-size:28px;font-weight:900;margin-top:8px;">${escapeHtml(pricing.complexity)}</div></div>
          <div style="padding:22px;border-radius:20px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.09);"><div style="font-size:12px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:#1FA2FF;">Monthly Estimate</div><div style="font-family:'Space Grotesk';font-size:28px;font-weight:900;margin-top:8px;">${escapeHtml(pricing.monthlyRange)}</div></div>
          <div style="padding:22px;border-radius:20px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.09);"><div style="font-size:12px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:#FF2E3C;">Development Estimate</div><div style="font-family:'Space Grotesk';font-size:28px;font-weight:900;margin-top:8px;">${escapeHtml(pricing.developmentRange)}</div></div>
        </div>
        <p style="font-size:13.5px;line-height:1.6;color:rgba(244,246,251,.56);margin:0;">All numbers are planning estimates only. Final scope and pricing require Carriersfy AI review.</p>
      </div>`;
  }

  function renderProposal() {
    if (state.submitted) {
      return `
        <div style="min-height:420px;display:grid;place-items:center;text-align:center;">
          <div style="max-width:620px;">
            <div style="width:72px;height:72px;margin:0 auto 20px;border-radius:50%;background:linear-gradient(135deg,#1FA2FF,#FF2E3C);display:flex;align-items:center;justify-content:center;color:#070B16;font-size:32px;font-weight:900;">&#10003;</div>
            <h3 style="font-family:'Space Grotesk';font-size:38px;line-height:1.08;margin:0;">Project request sent to Sophia.</h3>
            <p style="font-size:16px;line-height:1.65;color:rgba(244,246,251,.66);margin:18px 0 0;">Sophia has prepared your app configuration for Carriersfy AI review.</p>
            <button type="button" data-app-builder-reset style="margin-top:26px;min-height:48px;padding:13px 22px;border-radius:14px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:#fff;font-weight:800;font-family:'Manrope',sans-serif;cursor:pointer;">Design Another App</button>
          </div>
        </div>`;
    }
    return `
      <div style="display:grid;gap:18px;">
        <div style="padding:20px;border-radius:20px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.09);">
          <div style="font-family:'Space Grotesk';font-size:24px;font-weight:900;margin-bottom:8px;">Your future product is ready for review.</div>
          <p style="font-size:15px;line-height:1.6;color:rgba(244,246,251,.62);margin:0;">Sophia will send this project request into the Carriersfy AI pipeline. No payment connection is active.</p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr));gap:16px;">
          ${[
            ['name', 'Your Name', 'Jane Founder'],
            ['email', 'Email', 'you@company.com'],
            ['phone', 'Phone', '+1 555 000 0000'],
            ['company', 'Company', 'Future Co']
          ].map(([key, label, placeholder]) => `
            <label style="display:block;">
              <span style="display:block;font-size:12.5px;font-weight:700;color:rgba(244,246,251,.62);margin-bottom:8px;">${label}</span>
              <input data-app-contact-field="${key}" value="${escapeAttr(state.contact[key] || '')}" placeholder="${escapeAttr(placeholder)}" style="width:100%;padding:14px 15px;border-radius:13px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.14);color:#fff;font-size:14.5px;font-family:'Manrope',sans-serif;outline:none;">
            </label>`).join('')}
        </div>
      </div>`;
  }

  function renderSummary(pricing) {
    return `
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:22px;">
        <div style="width:52px;height:52px;border-radius:16px;background:linear-gradient(135deg,#1FA2FF,#FF2E3C);display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk';font-weight:900;color:#070B16;">APP</div>
        <div>
          <div style="font-family:'Space Grotesk';font-size:20px;font-weight:900;">Live Project Summary</div>
          <div style="font-size:12px;color:#35D6A0;font-weight:900;">Powered by Sophia</div>
        </div>
      </div>
      <div style="padding:18px;border-radius:18px;background:linear-gradient(135deg,rgba(31,162,255,.12),rgba(255,46,60,.1));border:1px solid rgba(255,255,255,.1);margin-bottom:18px;">
        <div style="font-size:12px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:rgba(244,246,251,.6);">Planning Estimate</div>
        <div style="font-family:'Space Grotesk';font-size:30px;font-weight:900;margin-top:8px;">${escapeHtml(pricing.developmentRange)}</div>
        <div style="font-size:13px;color:rgba(244,246,251,.58);margin-top:6px;">Development estimate placeholder</div>
      </div>
      ${summaryRow('Project Name', state.projectName)}
      ${summaryRow('Project Type', state.projectType)}
      ${summaryRow('Industry', state.industry)}
      ${summaryRow('Target Users', state.targetUsers.join(', '))}
      ${summaryRow('Platforms', state.platforms.join(', '))}
      ${summaryRow('Features', state.features.join(', '))}
      ${summaryRow('Languages', state.languages.join(', '))}
      ${summaryRow('Timeline', pricing.timeline)}
      ${summaryRow('Complexity', pricing.complexity)}
      ${summaryRow('Monthly Estimate', pricing.monthlyRange)}
      <div style="margin-top:18px;padding:12px 14px;border-radius:14px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.09);font-size:12.5px;line-height:1.5;color:rgba(244,246,251,.56);">Estimates are for planning only. No payment connection is active.</div>
    `;
  }

  function summaryRow(label, value) {
    return `<div style="display:flex;justify-content:space-between;gap:14px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.07);font-size:13.5px;color:rgba(244,246,251,.56);"><span>${escapeHtml(label)}</span><strong style="color:#fff;text-align:right;max-width:58%;">${escapeHtml(value || 'Pending')}</strong></div>`;
  }

  function renderSummaryOnly() {
    const panel = document.getElementById('cf-app-builder-summary');
    if (panel) panel.innerHTML = renderSummary(estimate());
  }

  function bindEvents() {
    const close = document.getElementById('cf-app-builder-close');
    if (close) close.addEventListener('click', closeBuilder);
    const prev = document.querySelector('[data-app-builder-prev]');
    if (prev) prev.addEventListener('click', prevStep);
    const next = document.querySelector('[data-app-builder-next]');
    if (next) next.addEventListener('click', nextStep);
    const submit = document.querySelector('[data-app-builder-submit]');
    if (submit) submit.addEventListener('click', submitProposal);
    const reset = document.querySelector('[data-app-builder-reset]');
    if (reset) reset.addEventListener('click', resetBuilder);

    document.querySelectorAll('[data-app-option-key]').forEach((button) => {
      button.addEventListener('click', () => {
        const key = button.getAttribute('data-app-option-key');
        const value = button.getAttribute('data-app-option-value');
        const multi = button.getAttribute('data-app-option-multi') === '1';
        if (multi) toggleMulti(key, value);
        else selectSingle(key, value);
      });
    });
    document.querySelectorAll('[data-app-field]').forEach((input) => {
      input.addEventListener('input', () => setField(input.getAttribute('data-app-field'), input.value));
    });
    document.querySelectorAll('[data-app-contact-field]').forEach((input) => {
      input.addEventListener('input', () => setContact(input.getAttribute('data-app-contact-field'), input.value));
    });
  }

  async function submitProposal() {
    if (!state.contact.name || !state.contact.email) {
      state.error = 'Name and email are required to request a proposal.';
      render();
      return;
    }
    state.submitting = true;
    state.error = '';
    render();

    const pricing = estimate();
    const configuration = buildConfiguration(pricing);
    const data = {
      name: state.contact.name,
      business: state.contact.company || state.projectName,
      email: state.contact.email,
      phone: state.contact.phone,
      industry: state.industry,
      message: buildProposalMessage(configuration),
      sophiaPipeline: {
        owner: 'Sophia',
        source: 'app_builder',
        status: 'new',
        intent: 'Build My App',
        routingQueue: 'carriersfy-ai-inbound-leads',
        flow: ['app_builder', 'sophia', 'review_placeholder', 'proposal_placeholder', 'appointment_placeholder'],
        crmStatus: 'prepared_not_connected',
        whatsappStatus: 'prepared_not_connected',
        appointmentStatus: 'prepared_not_connected'
      },
      appBuilder: configuration
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Project request failed with ' + res.status);
      state.submitted = true;
    } catch (err) {
      state.error = 'Sophia could not send the project request. Please try again or email hello@carriersfy.ai.';
    } finally {
      state.submitting = false;
      saveState();
      render();
    }
  }

  function buildConfiguration(pricing) {
    return {
      projectName: state.projectName,
      projectType: state.projectType,
      industry: state.industry,
      targetUsers: state.targetUsers,
      platforms: state.platforms,
      features: state.features,
      languages: state.languages,
      timeline: pricing.timeline,
      complexity: pricing.complexity,
      estimates: {
        monthly: pricing.monthlyRange,
        development: pricing.developmentRange
      }
    };
  }

  function buildProposalMessage(config) {
    return [
      'Build Your App Proposal Request',
      '',
      `Project Name: ${config.projectName || 'Pending'}`,
      `Project Type: ${config.projectType || 'Pending'}`,
      `Industry: ${config.industry || 'Pending'}`,
      `Target Users: ${config.targetUsers.join(', ') || 'Pending'}`,
      `Platforms: ${config.platforms.join(', ') || 'Pending'}`,
      `Features: ${config.features.join(', ') || 'Pending'}`,
      `Languages: ${config.languages.join(', ') || 'Pending'}`,
      `Timeline: ${config.timeline}`,
      `Complexity: ${config.complexity}`,
      `Monthly Estimate: ${config.estimates.monthly}`,
      `Development Estimate: ${config.estimates.development}`,
      '',
      'All estimates are planning placeholders only.'
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
    const trigger = event.target.closest('[data-app-builder-open]');
    if (!trigger) return;
    event.preventDefault();
    openBuilder();
  });

  window.CF_APP_BUILDER = {
    open: openBuilder,
    close: closeBuilder,
    getState: () => JSON.parse(JSON.stringify(state))
  };
})();

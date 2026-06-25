(function () {
  const STORAGE_KEY = 'cfSophiaBuilderState';

  const employeeTypes = [
    {
      id: 'receptionist',
      label: 'Receptionist',
      responsibilities: ['Answer inbound calls', 'Capture lead details', 'Route requests'],
      benefits: ['No missed calls', 'Faster response', 'Cleaner handoffs'],
      roi: 'Recover 20-35% of missed opportunities'
    },
    {
      id: 'sales',
      label: 'Sales',
      responsibilities: ['Qualify buyers', 'Book demos', 'Follow up'],
      benefits: ['More booked calls', 'Higher pipeline velocity', 'Less manual chasing'],
      roi: 'Increase qualified pipeline by 15-30%'
    },
    {
      id: 'support',
      label: 'Customer Support',
      responsibilities: ['Answer FAQs', 'Capture tickets', 'Escalate issues'],
      benefits: ['Lower ticket volume', 'Faster support', 'Better customer experience'],
      roi: 'Reduce repetitive support workload by 25-45%'
    },
    {
      id: 'appointments',
      label: 'Appointment Setter',
      responsibilities: ['Find availability', 'Book appointments', 'Send reminders'],
      benefits: ['More scheduled calls', 'Less back-and-forth', 'Lower no-shows'],
      roi: 'Lift appointment conversion by 20-40%'
    },
    {
      id: 'quotes',
      label: 'Quote Generator',
      responsibilities: ['Collect project details', 'Prepare estimates', 'Route approvals'],
      benefits: ['Faster quote turnaround', 'Better intake', 'More quote volume'],
      roi: 'Shorten quote response time by 50-80%'
    },
    {
      id: 'lead-qualification',
      label: 'Lead Qualification',
      responsibilities: ['Ask qualification questions', 'Score intent', 'Send summaries'],
      benefits: ['Cleaner pipeline', 'Better sales focus', 'Stronger routing'],
      roi: 'Improve sales team focus by 25-40%'
    },
    {
      id: 'custom',
      label: 'Custom',
      responsibilities: ['Map custom workflows', 'Route complex tasks', 'Adapt to business rules'],
      benefits: ['Tailored automation', 'Flexible deployment', 'Enterprise fit'],
      roi: 'Custom ROI based on workflow scope'
    }
  ];

  const steps = [
    { id: 'welcome', title: 'Build Your Own AI Employee', subtitle: 'Design a digital employee that works 24/7 for your business.' },
    { id: 'type', title: 'Choose Employee Type' },
    { id: 'personality', title: 'Choose Personality', options: ['Professional', 'Luxury', 'Friendly', 'Corporate', 'Medical', 'Legal', 'Construction', 'Custom'] },
    { id: 'voice', title: 'Choose Voice', options: ['Female', 'Male', 'Young', 'Executive', 'Warm', 'Confident', 'Future multilingual support'] },
    { id: 'languages', title: 'Languages', multi: true, options: ['English', 'Spanish', 'Portuguese', 'French', 'Custom'] },
    { id: 'channels', title: 'Communication Channels', multi: true, options: ['Phone', 'WhatsApp', 'Website Chat', 'SMS', 'Facebook Messenger', 'Instagram', 'Email'] },
    { id: 'integrations', title: 'Business Integrations', multi: true, options: ['CRM', 'Calendar', 'Payments', 'Invoices', 'Email', 'Google Workspace', 'Microsoft 365', 'API', 'Custom'] },
    { id: 'business', title: 'Business Information' },
    { id: 'features', title: 'Features', multi: true, options: ['Appointment Booking', 'Lead Qualification', 'Customer Support', 'Sales', 'Follow-up', 'Internal Notifications', 'Reporting', 'Knowledge Base', 'Voice Calls', 'AI Memory'] },
    { id: 'summary', title: 'Live Summary' },
    { id: 'proposal', title: 'Request Proposal' }
  ];

  const state = loadState();

  function defaultState() {
    return {
      step: 0,
      selected: {
        type: '',
        personality: '',
        voice: '',
        languages: [],
        channels: [],
        integrations: [],
        features: []
      },
      business: {
        companyName: '',
        industry: '',
        website: '',
        employees: '',
        monthlyLeads: ''
      },
      contact: {
        name: '',
        email: '',
        phone: ''
      },
      submitting: false,
      submitted: false,
      error: ''
    };
  }

  function loadState() {
    try {
      const raw = window.localStorage && window.localStorage.getItem(STORAGE_KEY);
      return raw ? { ...defaultState(), ...JSON.parse(raw) } : defaultState();
    } catch {
      return defaultState();
    }
  }

  function saveState() {
    try {
      window.localStorage && window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* local storage is optional */
    }
  }

  function money(value) {
    return '$' + Math.round(value).toLocaleString('en-US');
  }

  function estimatePricing() {
    const typeBase = {
      receptionist: 1200,
      sales: 1800,
      support: 1500,
      appointments: 1400,
      quotes: 1900,
      'lead-qualification': 1600,
      custom: 2400
    };
    const selectedType = state.selected.type || 'receptionist';
    const base = typeBase[selectedType] || 1600;
    const channelCount = state.selected.channels.length || 1;
    const integrationCount = state.selected.integrations.length || 0;
    const featureCount = state.selected.features.length || 1;
    const monthly = base + channelCount * 140 + integrationCount * 180 + featureCount * 95;
    const setup = 3500 + integrationCount * 450 + featureCount * 220 + channelCount * 180;
    return {
      monthly,
      setup,
      range: `${money(monthly * 0.9)}-${money(monthly * 1.2)}/mo`
    };
  }

  function ensureModal() {
    let modal = document.getElementById('cf-ai-builder-modal');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = 'cf-ai-builder-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-labelledby', 'cf-ai-builder-title');
    modal.style.cssText = 'display:none;position:fixed;inset:0;z-index:130;background:rgba(7,11,22,.82);backdrop-filter:blur(24px);padding:18px;align-items:center;justify-content:center;';
    document.body.appendChild(modal);

    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeBuilder();
    });
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', () => {
      const activeModal = document.getElementById('cf-ai-builder-modal');
      if (activeModal && activeModal.style.display !== 'none') render();
    });
    return modal;
  }

  function openBuilder() {
    const modal = ensureModal();
    window.__cfBuilderLastFocus = document.activeElement;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    render();
    const close = document.getElementById('cf-ai-builder-close');
    if (close) close.focus();
  }

  function closeBuilder() {
    const modal = document.getElementById('cf-ai-builder-modal');
    if (!modal) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (window.__cfBuilderLastFocus && window.__cfBuilderLastFocus.focus) window.__cfBuilderLastFocus.focus();
  }

  function onKeyDown(event) {
    const modal = document.getElementById('cf-ai-builder-modal');
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

  function selectSingle(key, value) {
    state.selected[key] = value;
    state.error = '';
    saveState();
    render();
  }

  function toggleMulti(key, value) {
    const list = state.selected[key] || [];
    state.selected[key] = list.includes(value) ? list.filter((item) => item !== value) : list.concat(value);
    state.error = '';
    saveState();
    render();
  }

  function setBusiness(key, value) {
    state.business[key] = value;
    saveState();
    renderSummaryOnly();
  }

  function setContact(key, value) {
    state.contact[key] = value;
    saveState();
  }

  function canAdvance() {
    const id = steps[state.step].id;
    if (id === 'type') return Boolean(state.selected.type);
    if (id === 'personality') return Boolean(state.selected.personality);
    if (id === 'voice') return Boolean(state.selected.voice);
    if (id === 'languages') return state.selected.languages.length > 0;
    if (id === 'channels') return state.selected.channels.length > 0;
    if (id === 'business') return Boolean(state.business.companyName && state.business.industry);
    return true;
  }

  function nextStep() {
    if (!canAdvance()) {
      state.error = 'Select the required option before continuing.';
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
    const fresh = defaultState();
    Object.keys(state).forEach((key) => delete state[key]);
    Object.assign(state, fresh);
    saveState();
    render();
  }

  function render() {
    const modal = ensureModal();
    const pricing = estimatePricing();
    const step = steps[state.step];
    const progress = Math.round(((state.step + 1) / steps.length) * 100);
    const compact = window.innerWidth < 860;

    modal.innerHTML = `
      <div style="width:min(1180px,100%);height:min(820px,calc(100vh - 36px));overflow:hidden;border-radius:30px;background:linear-gradient(180deg,rgba(13,18,32,.98),rgba(8,11,20,.98));border:1px solid rgba(255,255,255,.13);box-shadow:0 44px 120px rgba(0,0,0,.72);position:relative;color:#F4F6FB;font-family:'Manrope',sans-serif;">
        <div style="position:absolute;top:-120px;right:-80px;width:320px;height:320px;border-radius:50%;background:radial-gradient(circle,rgba(31,162,255,.34),transparent 70%);filter:blur(30px);pointer-events:none;"></div>
        <div style="position:absolute;bottom:-140px;left:-90px;width:320px;height:320px;border-radius:50%;background:radial-gradient(circle,rgba(255,46,60,.23),transparent 70%);filter:blur(32px);pointer-events:none;"></div>
        <div style="position:relative;display:grid;grid-template-columns:${compact ? 'minmax(0,1fr)' : 'minmax(0,1fr) minmax(320px,390px)'};height:100%;">
          <div style="min-width:0;display:flex;flex-direction:column;${compact ? '' : 'border-right:1px solid rgba(255,255,255,.08);'}">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;padding:22px clamp(20px,4vw,34px);border-bottom:1px solid rgba(255,255,255,.08);">
              <div>
                <div style="font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#1FA2FF;">AI Employee Builder</div>
                <h2 id="cf-ai-builder-title" style="font-family:'Space Grotesk';font-weight:700;font-size:clamp(24px,3vw,34px);line-height:1.08;margin:5px 0 0;">${escapeHtml(step.title)}</h2>
              </div>
              <button id="cf-ai-builder-close" type="button" aria-label="Close AI Employee Builder" style="width:42px;height:42px;border-radius:13px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05);color:#fff;font-size:22px;line-height:1;cursor:pointer;">x</button>
            </div>
            <div style="padding:0 clamp(20px,4vw,34px);height:4px;background:rgba(255,255,255,.05);"><div style="width:${progress}%;height:4px;background:linear-gradient(135deg,#1FA2FF,#FF2E3C);border-radius:100px;transition:width .3s ease;"></div></div>
            <div style="flex:1;overflow:auto;padding:clamp(22px,4vw,36px);">
              ${state.error ? `<div style="margin-bottom:16px;padding:12px 14px;border-radius:12px;background:rgba(255,46,60,.1);border:1px solid rgba(255,46,60,.28);color:#FFB3B8;font-size:13.5px;font-weight:700;">${escapeHtml(state.error)}</div>` : ''}
              ${renderStep(step)}
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px clamp(20px,4vw,34px);border-top:1px solid rgba(255,255,255,.08);">
              <button type="button" data-builder-prev style="min-height:48px;padding:13px 22px;border-radius:14px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:#fff;font-weight:800;font-family:'Manrope',sans-serif;cursor:pointer;">Previous</button>
              <div style="font-size:13px;color:rgba(244,246,251,.52);">Step ${state.step + 1} of ${steps.length}</div>
              ${state.step === steps.length - 1 ? `<button type="button" data-builder-submit style="min-height:48px;padding:13px 22px;border-radius:14px;border:0;background:linear-gradient(135deg,#1FA2FF,#FF2E3C);color:#070B16;font-weight:900;font-family:'Manrope',sans-serif;cursor:pointer;box-shadow:0 10px 34px rgba(28,127,214,.34);">${state.submitting ? 'Sending...' : 'Request Proposal'}</button>` : `<button type="button" data-builder-next style="min-height:48px;padding:13px 22px;border-radius:14px;border:0;background:linear-gradient(135deg,#1FA2FF,#FF2E3C);color:#070B16;font-weight:900;font-family:'Manrope',sans-serif;cursor:pointer;box-shadow:0 10px 34px rgba(28,127,214,.34);">Continue</button>`}
            </div>
          </div>
          <aside id="cf-ai-builder-summary" style="display:${compact ? 'none' : 'block'};min-width:0;overflow:auto;padding:clamp(22px,3vw,30px);background:rgba(255,255,255,.018);">
            ${renderSummary(pricing)}
          </aside>
        </div>
      </div>`;

    bindEvents();
  }

  function renderStep(step) {
    if (step.id === 'welcome') return renderWelcome();
    if (step.id === 'type') return renderEmployeeTypes();
    if (step.id === 'voice') return renderVoiceStep(step);
    if (step.id === 'business') return renderBusinessInfo();
    if (step.id === 'summary') return renderLiveSummary();
    if (step.id === 'proposal') return renderProposal();
    return renderOptionStep(step);
  }

  function renderWelcome() {
    return `
      <div style="min-height:430px;display:grid;place-items:center;text-align:center;">
        <div style="max-width:720px;">
          <div style="width:86px;height:86px;margin:0 auto 24px;border-radius:26px;background:linear-gradient(135deg,#1FA2FF,#FF2E3C);display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk';font-size:36px;font-weight:800;color:#070B16;box-shadow:0 0 48px rgba(28,127,214,.42);">S</div>
          <h3 style="font-family:'Space Grotesk';font-size:clamp(42px,6vw,74px);line-height:.98;letter-spacing:-.035em;margin:0;">Build Your Own <span style="display:block;background:linear-gradient(110deg,#3FB0FF,#1C7FD6 42%,#FF2E3C);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;">AI Employee</span></h3>
          <p style="font-size:20px;line-height:1.55;color:rgba(244,246,251,.66);margin:24px auto 0;max-width:620px;">Design a digital employee that works 24/7 for your business.</p>
        </div>
      </div>`;
  }

  function renderEmployeeTypes() {
    return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr));gap:16px;">${employeeTypes.map((type) => {
      const active = state.selected.type === type.id;
      return `
        <button type="button" data-select-type="${type.id}" style="text-align:left;padding:22px;border-radius:20px;background:${active ? 'linear-gradient(135deg,rgba(31,162,255,.18),rgba(255,46,60,.12))' : 'rgba(255,255,255,.035)'};border:1px solid ${active ? 'rgba(31,162,255,.48)' : 'rgba(255,255,255,.09)'};color:#fff;cursor:pointer;font-family:'Manrope',sans-serif;transition:transform .25s ease,border-color .25s ease;">
          <div style="font-family:'Space Grotesk';font-size:22px;font-weight:700;margin-bottom:12px;">${escapeHtml(type.label)}</div>
          <div style="font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#1FA2FF;margin-bottom:8px;">Responsibilities</div>
          <p style="font-size:14px;line-height:1.55;color:rgba(244,246,251,.66);margin:0 0 14px;">${escapeHtml(type.responsibilities.join(' / '))}</p>
          <div style="font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#FF2E3C;margin-bottom:8px;">Business Benefits</div>
          <p style="font-size:14px;line-height:1.55;color:rgba(244,246,251,.66);margin:0 0 14px;">${escapeHtml(type.benefits.join(' / '))}</p>
          <div style="padding:10px 12px;border-radius:13px;background:rgba(53,214,160,.08);border:1px solid rgba(53,214,160,.2);color:#35D6A0;font-size:13px;font-weight:800;">${escapeHtml(type.roi)}</div>
        </button>`;
    }).join('')}</div>`;
  }

  function renderOptionStep(step) {
    const selected = state.selected[step.id] || (step.multi ? [] : '');
    return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr));gap:14px;">${step.options.map((option) => {
      const active = Array.isArray(selected) ? selected.includes(option) : selected === option;
      return `<button type="button" data-option-key="${step.id}" data-option-value="${escapeAttr(option)}" data-option-multi="${step.multi ? '1' : '0'}" style="min-height:92px;text-align:left;padding:18px;border-radius:18px;background:${active ? 'linear-gradient(135deg,rgba(31,162,255,.18),rgba(255,46,60,.12))' : 'rgba(255,255,255,.035)'};border:1px solid ${active ? 'rgba(31,162,255,.48)' : 'rgba(255,255,255,.09)'};color:#fff;cursor:pointer;font-family:'Manrope',sans-serif;">
        <span style="font-family:'Space Grotesk';font-size:19px;font-weight:700;">${escapeHtml(option)}</span>
      </button>`;
    }).join('')}</div>`;
  }

  function renderVoiceStep(step) {
    return `
      ${renderOptionStep(step)}
      <div style="margin-top:22px;padding:24px;border-radius:22px;background:linear-gradient(180deg,rgba(255,255,255,.045),rgba(255,255,255,.015));border:1px dashed rgba(255,255,255,.18);text-align:center;">
        <div style="font-family:'Space Grotesk';font-size:22px;font-weight:700;margin-bottom:8px;">Voice Preview Placeholder</div>
        <p style="font-size:14.5px;line-height:1.6;color:rgba(244,246,251,.6);margin:0;">Voice samples and multilingual previews will be connected after voice provider selection. No voice API is active.</p>
      </div>`;
  }

  function renderBusinessInfo() {
    const fields = [
      ['companyName', 'Company Name', 'Carriersfy AI'],
      ['industry', 'Industry', 'Professional Services'],
      ['website', 'Website', 'https://example.com'],
      ['employees', 'Employees', '10-25'],
      ['monthlyLeads', 'Estimated Monthly Leads', '100']
    ];
    return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr));gap:16px;">${fields.map(([key, label, placeholder]) => `
      <label style="display:block;">
        <span style="display:block;font-size:12.5px;font-weight:700;color:rgba(244,246,251,.62);margin-bottom:8px;">${label}</span>
        <input data-business-field="${key}" value="${escapeAttr(state.business[key] || '')}" placeholder="${escapeAttr(placeholder)}" style="width:100%;padding:14px 15px;border-radius:13px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.14);color:#fff;font-size:14.5px;font-family:'Manrope',sans-serif;outline:none;">
      </label>`).join('')}</div>`;
  }

  function renderLiveSummary() {
    const pricing = estimatePricing();
    return `
      <div style="display:grid;gap:18px;">
        <div style="padding:26px;border-radius:24px;background:linear-gradient(135deg,rgba(31,162,255,.14),rgba(255,46,60,.12));border:1px solid rgba(255,255,255,.12);">
          <div style="font-family:'Space Grotesk';font-size:30px;font-weight:800;margin-bottom:6px;">${escapeHtml(getTypeLabel()) || 'Custom AI Employee'}</div>
          <p style="font-size:15px;line-height:1.6;color:rgba(244,246,251,.66);margin:0;">Your AI Employee is configured from your selected type, personality, channels, integrations, business information and feature set.</p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr));gap:14px;">
          <div style="padding:22px;border-radius:20px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.09);"><div style="font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#1FA2FF;">Monthly Subscription Estimate</div><div style="font-family:'Space Grotesk';font-size:34px;font-weight:800;margin-top:8px;">${money(pricing.monthly)}</div></div>
          <div style="padding:22px;border-radius:20px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.09);"><div style="font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#FF2E3C;">One-Time Setup Estimate</div><div style="font-family:'Space Grotesk';font-size:34px;font-weight:800;margin-top:8px;">${money(pricing.setup)}</div></div>
        </div>
        <p style="font-size:13.5px;line-height:1.6;color:rgba(244,246,251,.56);margin:0;">Estimates are placeholders for proposal planning. Final pricing requires human review by Carriersfy AI.</p>
      </div>`;
  }

  function renderProposal() {
    if (state.submitted) {
      return `
        <div style="min-height:420px;display:grid;place-items:center;text-align:center;">
          <div style="max-width:620px;">
            <div style="width:72px;height:72px;margin:0 auto 20px;border-radius:50%;background:linear-gradient(135deg,#1FA2FF,#FF2E3C);display:flex;align-items:center;justify-content:center;color:#070B16;font-size:32px;font-weight:900;">&#10003;</div>
            <h3 style="font-family:'Space Grotesk';font-size:38px;line-height:1.08;margin:0;">Proposal request sent to Sophia.</h3>
            <p style="font-size:16px;line-height:1.65;color:rgba(244,246,251,.66);margin:18px 0 0;">Sophia has prepared your AI Employee configuration for review. Carriersfy AI will follow up with next steps.</p>
            <button type="button" data-builder-reset style="margin-top:26px;min-height:48px;padding:13px 22px;border-radius:14px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:#fff;font-weight:800;font-family:'Manrope',sans-serif;cursor:pointer;">Build Another Employee</button>
          </div>
        </div>`;
    }
    return `
      <div style="display:grid;gap:18px;">
        <div style="padding:20px;border-radius:20px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.09);">
          <div style="font-family:'Space Grotesk';font-size:24px;font-weight:800;margin-bottom:8px;">Complete configuration ready.</div>
          <p style="font-size:15px;line-height:1.6;color:rgba(244,246,251,.62);margin:0;">Add your contact details and Sophia will send this proposal request into the Carriersfy AI pipeline. Payments, CRM, WhatsApp and voice APIs remain placeholders.</p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr));gap:16px;">
          ${[
            ['name', 'Your Name', 'Jane Founder'],
            ['email', 'Email', 'you@company.com'],
            ['phone', 'Phone', '+1 555 000 0000']
          ].map(([key, label, placeholder]) => `
            <label style="display:block;">
              <span style="display:block;font-size:12.5px;font-weight:700;color:rgba(244,246,251,.62);margin-bottom:8px;">${label}</span>
              <input data-contact-field="${key}" value="${escapeAttr(state.contact[key] || '')}" placeholder="${escapeAttr(placeholder)}" style="width:100%;padding:14px 15px;border-radius:13px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.14);color:#fff;font-size:14.5px;font-family:'Manrope',sans-serif;outline:none;">
            </label>`).join('')}
        </div>
      </div>`;
  }

  function renderSummary(pricing) {
    return `
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:22px;">
        <div style="width:52px;height:52px;border-radius:16px;background:linear-gradient(135deg,#1FA2FF,#FF2E3C);display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk';font-weight:800;color:#070B16;">S</div>
        <div>
          <div style="font-family:'Space Grotesk';font-size:20px;font-weight:800;">Sophia Builder</div>
          <div style="font-size:12px;color:#35D6A0;font-weight:800;">Pipeline Ready</div>
        </div>
      </div>
      <div style="padding:18px;border-radius:18px;background:linear-gradient(135deg,rgba(31,162,255,.12),rgba(255,46,60,.1));border:1px solid rgba(255,255,255,.1);margin-bottom:18px;">
        <div style="font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:rgba(244,246,251,.6);">Live Pricing Estimate</div>
        <div style="font-family:'Space Grotesk';font-size:32px;font-weight:800;margin-top:8px;">${pricing.range}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px;">
          <div style="padding:12px;border-radius:13px;background:rgba(255,255,255,.045);"><div style="font-size:11px;color:rgba(244,246,251,.5);">Monthly</div><div style="font-family:'Space Grotesk';font-weight:800;">${money(pricing.monthly)}</div></div>
          <div style="padding:12px;border-radius:13px;background:rgba(255,255,255,.045);"><div style="font-size:11px;color:rgba(244,246,251,.5);">Setup</div><div style="font-family:'Space Grotesk';font-weight:800;">${money(pricing.setup)}</div></div>
        </div>
      </div>
      ${summaryRow('Employee Type', getTypeLabel())}
      ${summaryRow('Personality', state.selected.personality)}
      ${summaryRow('Voice', state.selected.voice)}
      ${summaryRow('Languages', state.selected.languages.join(', '))}
      ${summaryRow('Channels', state.selected.channels.join(', '))}
      ${summaryRow('Integrations', state.selected.integrations.join(', '))}
      ${summaryRow('Company', state.business.companyName)}
      ${summaryRow('Industry', state.business.industry)}
      ${summaryRow('Features', state.selected.features.join(', '))}
      <div style="margin-top:18px;padding:12px 14px;border-radius:14px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.09);font-size:12.5px;line-height:1.5;color:rgba(244,246,251,.56);">No payment, CRM, voice or WhatsApp API is connected. This builder prepares a Sophia pipeline lead only.</div>
    `;
  }

  function summaryRow(label, value) {
    return `<div style="display:flex;justify-content:space-between;gap:14px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.07);font-size:13.5px;color:rgba(244,246,251,.56);"><span>${escapeHtml(label)}</span><strong style="color:#fff;text-align:right;max-width:58%;">${escapeHtml(value || 'Pending')}</strong></div>`;
  }

  function renderSummaryOnly() {
    const panel = document.getElementById('cf-ai-builder-summary');
    if (panel) panel.innerHTML = renderSummary(estimatePricing());
  }

  function bindEvents() {
    const close = document.getElementById('cf-ai-builder-close');
    if (close) close.addEventListener('click', closeBuilder);
    const prev = document.querySelector('[data-builder-prev]');
    if (prev) prev.addEventListener('click', prevStep);
    const next = document.querySelector('[data-builder-next]');
    if (next) next.addEventListener('click', nextStep);
    const submit = document.querySelector('[data-builder-submit]');
    if (submit) submit.addEventListener('click', submitProposal);
    const reset = document.querySelector('[data-builder-reset]');
    if (reset) reset.addEventListener('click', resetBuilder);

    document.querySelectorAll('[data-select-type]').forEach((button) => {
      button.addEventListener('click', () => selectSingle('type', button.getAttribute('data-select-type')));
    });
    document.querySelectorAll('[data-option-key]').forEach((button) => {
      button.addEventListener('click', () => {
        const key = button.getAttribute('data-option-key');
        const value = button.getAttribute('data-option-value');
        const multi = button.getAttribute('data-option-multi') === '1';
        if (multi) toggleMulti(key, value);
        else selectSingle(key, value);
      });
    });
    document.querySelectorAll('[data-business-field]').forEach((input) => {
      input.addEventListener('input', () => setBusiness(input.getAttribute('data-business-field'), input.value));
    });
    document.querySelectorAll('[data-contact-field]').forEach((input) => {
      input.addEventListener('input', () => setContact(input.getAttribute('data-contact-field'), input.value));
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
    const pricing = estimatePricing();
    const configuration = buildConfiguration(pricing);
    const data = {
      name: state.contact.name,
      business: state.business.companyName,
      email: state.contact.email,
      phone: state.contact.phone,
      industry: state.business.industry,
      message: buildProposalMessage(configuration),
      sophiaPipeline: {
        owner: 'Sophia',
        source: 'ai_employee_builder',
        status: 'new',
        intent: 'Build My AI Employee',
        routingQueue: 'carriersfy-ai-inbound-leads',
        flow: ['builder', 'sophia', 'crm_placeholder', 'email_notification', 'whatsapp_notification', 'appointment_placeholder'],
        crmStatus: 'prepared_not_connected',
        whatsappStatus: 'prepared_not_connected',
        appointmentStatus: 'prepared_not_connected'
      },
      aiEmployeeBuilder: configuration
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Proposal request failed with ' + res.status);
      state.submitted = true;
    } catch (err) {
      state.error = 'Sophia could not send the proposal request. Please try again or email hello@carriersfy.ai.';
    } finally {
      state.submitting = false;
      saveState();
      render();
    }
  }

  function buildConfiguration(pricing) {
    return {
      employeeType: getTypeLabel(),
      personality: state.selected.personality,
      voice: state.selected.voice,
      languages: state.selected.languages,
      channels: state.selected.channels,
      integrations: state.selected.integrations,
      businessInformation: state.business,
      features: state.selected.features,
      estimates: {
        monthlySubscription: money(pricing.monthly),
        oneTimeSetup: money(pricing.setup),
        liveRange: pricing.range
      }
    };
  }

  function buildProposalMessage(config) {
    return [
      'Sophia AI Employee Builder Proposal Request',
      '',
      `Employee Type: ${config.employeeType || 'Pending'}`,
      `Personality: ${config.personality || 'Pending'}`,
      `Voice: ${config.voice || 'Pending'}`,
      `Languages: ${config.languages.join(', ') || 'Pending'}`,
      `Channels: ${config.channels.join(', ') || 'Pending'}`,
      `Integrations: ${config.integrations.join(', ') || 'Pending'}`,
      `Company: ${config.businessInformation.companyName || 'Pending'}`,
      `Industry: ${config.businessInformation.industry || 'Pending'}`,
      `Website: ${config.businessInformation.website || 'Pending'}`,
      `Employees: ${config.businessInformation.employees || 'Pending'}`,
      `Estimated Monthly Leads: ${config.businessInformation.monthlyLeads || 'Pending'}`,
      `Features: ${config.features.join(', ') || 'Pending'}`,
      `Monthly Estimate: ${config.estimates.monthlySubscription}`,
      `Setup Estimate: ${config.estimates.oneTimeSetup}`,
      '',
      'Payments, voice APIs, CRM APIs and WhatsApp APIs are not connected.'
    ].join('\n');
  }

  function getTypeLabel() {
    const type = employeeTypes.find((item) => item.id === state.selected.type);
    return type ? type.label : '';
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
    const trigger = event.target.closest('[data-ai-builder-open]');
    if (!trigger) return;
    event.preventDefault();
    openBuilder();
  });

  window.CF_SOPHIA_BUILDER = {
    open: openBuilder,
    close: closeBuilder,
    getState: () => JSON.parse(JSON.stringify(state))
  };
})();

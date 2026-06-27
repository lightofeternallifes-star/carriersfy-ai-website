import { PageWrapper } from '../components/ui/PageWrapper'
import { Navbar } from '../components/nav/Navbar'
import { SectionLabel } from '../components/ui/SectionLabel'
import { Button } from '../components/ui/Button'
import { NetworkGraph } from '../components/team/NetworkGraph'

const workflows = [
  {
    title: 'Task Arrives',
    icon: '📥',
    description: 'A customer call, message, or form submission enters the Carriersfy AI platform across any channel.',
    color: '#1FA2FF',
  },
  {
    title: 'Iron Prime Routes',
    icon: '✦',
    description: 'Iron Prime analyzes the task type, priority, and context — and assigns it to the optimal AI employee in milliseconds.',
    color: '#FFC83C',
  },
  {
    title: 'Employee Executes',
    icon: '⚡',
    description: 'The assigned AI employee handles the task to completion — from answering a call to booking an appointment to closing a quote.',
    color: '#FF2E3C',
  },
]

const scenarios = [
  {
    title: 'Inbound Call Flow',
    icon: '📞',
    color: '#1FA2FF',
    steps: [
      { employee: 'Sophia', action: 'Answers the call, greets the customer, identifies their need' },
      { employee: 'Atlas', action: 'Scores lead intent in real time based on conversation signals' },
      { employee: 'Titan', action: 'Generates an estimate on the spot if pricing is requested' },
      { employee: 'Orion', action: 'Schedules follow-up sequence if customer doesn\'t commit same-call' },
    ],
  },
  {
    title: 'Lead Qualification Flow',
    icon: '🎯',
    color: '#FF2E3C',
    steps: [
      { employee: 'Atlas', action: 'Evaluates incoming lead across 40+ qualification signals' },
      { employee: 'Iron Prime', action: 'Routes hot leads to sales rep instantly with full briefing' },
      { employee: 'Nova', action: 'Sends immediate personalized follow-up via SMS or WhatsApp' },
      { employee: 'Orion', action: 'Begins nurture sequence for warm/cold leads automatically' },
    ],
  },
  {
    title: 'Quote & Close Flow',
    icon: '💼',
    color: '#FFC83C',
    steps: [
      { employee: 'Titan', action: 'Generates a branded quote document within seconds of request' },
      { employee: 'Nova', action: 'Delivers quote via preferred channel: email, SMS, or WhatsApp' },
      { employee: 'Orion', action: 'Monitors quote status and sends smart follow-ups if unopened' },
      { employee: 'Iron Prime', action: 'Flags accepted quotes and triggers invoice creation workflow' },
    ],
  },
]

const routingExamples = [
  {
    trigger: 'High-intent inbound call at 11 PM',
    route: 'Sophia answers → Atlas scores HOT → Iron Prime pings on-call rep → Orion schedules morning demo',
    icon: '🌙',
  },
  {
    trigger: 'Complex quote requested via WhatsApp',
    route: 'Nova collects specs → Titan generates multi-line estimate → Nova delivers PDF → Orion follows up in 48h',
    icon: '📋',
  },
  {
    trigger: 'Support ticket with billing dispute signal',
    route: 'Echo resolves standard FAQ → Detects escalation trigger → Iron Prime routes to finance human → Logs full transcript',
    icon: '🔄',
  },
]

export default function AITeamPage() {
  return (
    <PageWrapper>
      <Navbar />

      {/* HERO */}
      <header
        className="relative z-[1] overflow-hidden flex items-center text-center"
        style={{ minHeight: '70vh', padding: 'clamp(120px,15vh,175px) clamp(20px,5vw,56px) clamp(48px,6vw,80px)' }}
      >
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(1200px 820px at 50% 38%, rgba(22,46,98,0.6), transparent 62%), #05070F' }} />
        <div className="absolute inset-0 z-0 pointer-events-none animate-glow" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(31,162,255,0.14), transparent 70%)' }} />

        <div className="relative z-[3] max-w-[860px] mx-auto w-full">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-7" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)' }}>
            <span className="animate-blink inline-block w-[7px] h-[7px] rounded-full bg-[#35D6A0]" style={{ boxShadow: '0 0 10px #35D6A0' }} />
            <span className="text-[13px] font-semibold text-[rgba(244,246,251,0.8)] tracking-wider">ALL 7 EMPLOYEES · ONLINE</span>
          </div>
          <h1
            className="font-grotesk font-bold leading-[0.99] tracking-[-0.035em] mb-6 text-white"
            style={{ fontSize: 'clamp(44px,6.8vw,86px)' }}
          >
            One Brain.{' '}
            <span className="gradient-text">Seven Specialists.</span>
          </h1>
          <p className="text-[clamp(17px,1.55vw,20px)] leading-[1.6] text-[rgba(244,246,251,0.66)] max-w-[600px] mx-auto mb-10">
            Not a collection of chatbots — a coordinated AI workforce. Every employee shares a single intelligence, managed by Iron Prime, executing seamlessly across every channel and function your business depends on.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="primary" size="lg">Deploy the Team →</Button>
            <Button variant="secondary" size="lg">Book a Team Demo</Button>
          </div>
        </div>
      </header>

      {/* NETWORK VISUALIZATION */}
      <section className="section-padding">
        <div className="max-content">
          <div className="text-center mb-12">
            <SectionLabel color="blue">LIVE NETWORK</SectionLabel>
            <h2 className="font-grotesk font-bold leading-[1.08] tracking-[-0.02em] text-white" style={{ fontSize: 'clamp(30px,4.2vw,52px)' }}>
              The AI Workforce in Motion
            </h2>
            <p className="text-[17px] mt-4 text-[rgba(244,246,251,0.6)] max-w-[600px] mx-auto">
              Iron Prime at center — routing, coordinating, and orchestrating the team in real time.
            </p>
          </div>
          <NetworkGraph />
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="section-padding">
        <div className="max-content">
          <div className="text-center mb-14">
            <SectionLabel color="red">HOW IT WORKS</SectionLabel>
            <h2 className="font-grotesk font-bold leading-[1.08] tracking-[-0.02em] text-white" style={{ fontSize: 'clamp(30px,4.2vw,52px)' }}>
              Every task handled in three steps
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector lines */}
            <div className="hidden md:block absolute top-1/3 left-[33%] right-[33%] h-px bg-gradient-to-r from-[#1FA2FF40] to-[#FF2E3C40]" />
            {workflows.map((w, i) => (
              <div key={i} className="relative p-8 rounded-[22px] text-center" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-4xl mb-5">{w.icon}</div>
                <div className="font-grotesk font-bold text-[14px] mb-1" style={{ color: w.color }}>STEP {String(i + 1).padStart(2, '0')}</div>
                <h3 className="font-grotesk font-bold text-[20px] mb-3 text-white">{w.title}</h3>
                <p className="text-[14px] leading-[1.6] text-[rgba(244,246,251,0.62)]">{w.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW THEY COLLABORATE */}
      <section className="section-padding">
        <div className="max-content">
          <div className="text-center mb-14">
            <SectionLabel color="blue">COLLABORATION SCENARIOS</SectionLabel>
            <h2 className="font-grotesk font-bold leading-[1.08] tracking-[-0.02em] text-white" style={{ fontSize: 'clamp(30px,4.2vw,52px)' }}>
              How they work together
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {scenarios.map((sc) => (
              <div key={sc.title} className="p-7 rounded-[22px]" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)', border: `1px solid ${sc.color}25` }}>
                <div className="text-3xl mb-3">{sc.icon}</div>
                <h3 className="font-grotesk font-bold text-[18px] mb-5 text-white">{sc.title}</h3>
                <div className="flex flex-col gap-3">
                  {sc.steps.map((step, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <span
                        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-grotesk font-bold text-[11px] text-[#070B16] mt-0.5"
                        style={{ background: sc.color }}
                      >
                        {j + 1}
                      </span>
                      <div>
                        <span className="text-[12px] font-bold uppercase tracking-wider" style={{ color: sc.color }}>{step.employee}</span>
                        <p className="text-[13px] leading-[1.5] text-[rgba(244,246,251,0.62)] mt-0.5">{step.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IRON PRIME COORDINATES */}
      <section className="section-padding">
        <div className="max-content">
          <div className="text-center mb-14">
            <SectionLabel color="red" className="text-[#FFC83C]">IRON PRIME</SectionLabel>
            <h2 className="font-grotesk font-bold leading-[1.08] tracking-[-0.02em] text-white" style={{ fontSize: 'clamp(30px,4.2vw,52px)' }}>
              The intelligence behind every handoff
            </h2>
            <p className="text-[17px] mt-4 text-[rgba(244,246,251,0.6)] max-w-[600px] mx-auto">
              Iron Prime makes thousands of routing decisions per day — each one optimized for speed, accuracy, and business outcome.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            {routingExamples.map((ex, i) => (
              <div
                key={i}
                className="p-7 rounded-[22px] grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-start"
                style={{ background: 'rgba(255,200,60,0.04)', border: '1px solid rgba(255,200,60,0.15)' }}
              >
                <div className="w-14 h-14 rounded-[16px] flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'rgba(255,200,60,0.12)', border: '1px solid rgba(255,200,60,0.25)' }}>
                  {ex.icon}
                </div>
                <div>
                  <div className="text-[13px] font-bold uppercase tracking-wider text-[#FFC83C] mb-2">TRIGGER</div>
                  <p className="font-grotesk font-semibold text-[16px] text-white mb-3">{ex.trigger}</p>
                  <div className="text-[13px] font-bold uppercase tracking-wider text-[rgba(244,246,251,0.4)] mb-2">IRON PRIME ROUTES →</div>
                  <p className="text-[14px] leading-[1.6] text-[rgba(244,246,251,0.65)] font-mono">{ex.route}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section-padding">
        <div className="max-content">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { value: '7', label: 'AI Employees', sub: 'Sophia, Atlas, Nova, Titan, Orion, Echo + Iron Prime' },
              { value: '24/7', label: 'Coverage', sub: 'No downtime, no holidays, no sick days' },
              { value: '<1s', label: 'Response Time', sub: 'Across all channels simultaneously' },
              { value: '∞', label: 'Scale', sub: 'Handle any volume with no degradation' },
            ].map((s) => (
              <div key={s.label} className="p-7 rounded-[22px] text-center" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="font-grotesk font-bold gradient-text mb-2" style={{ fontSize: 'clamp(30px,4vw,46px)' }}>{s.value}</div>
                <div className="font-grotesk font-semibold text-[15px] text-white mb-1">{s.label}</div>
                <div className="text-[12px] text-[rgba(244,246,251,0.45)]">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

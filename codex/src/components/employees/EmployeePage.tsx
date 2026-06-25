import { EmployeeConfig } from '../../data/employees'
import { PageWrapper } from '../ui/PageWrapper'
import { Navbar } from '../nav/Navbar'
import { Button } from '../ui/Button'
import { SectionLabel } from '../ui/SectionLabel'
import { StatusBadge } from '../ui/StatusBadge'
import { FAQ } from '../ui/FAQ'
import { getVariantColor, getVariantGradient } from '../../design-system/tokens'

interface EmployeePageProps {
  employee: EmployeeConfig
}

export function EmployeePage({ employee }: EmployeePageProps) {
  const accent = getVariantColor(employee.color)
  const gradient = getVariantGradient(employee.color)
  const glow = employee.color === 'blue' ? 'rgba(31,162,255,0.3)' : employee.color === 'red' ? 'rgba(255,46,60,0.3)' : 'rgba(255,200,60,0.35)'
  const labelColor = employee.color === 'red' ? 'red' : 'blue'

  const benefitIcons = ['💡', '⚡', '📊', '🚀']

  return (
    <PageWrapper>
      <Navbar />

      {/* ─── HERO ─── */}
      <header
        className="relative z-[1] overflow-hidden flex items-center"
        style={{ minHeight: '100vh', padding: 'clamp(120px,15vh,175px) clamp(20px,5vw,56px) clamp(48px,6vw,80px)' }}
      >
        {/* Hero background glows */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(1200px 820px at 70% 38%, rgba(22,46,98,0.6), transparent 62%), #05070F' }} />
        <div className="absolute top-[-12%] right-[-6%] w-[72%] h-[84%] z-0 pointer-events-none animate-glow" style={{ background: `radial-gradient(closest-side, ${glow.replace('0.3', '0.34')}, transparent 72%)`, filter: 'blur(42px)', transform: 'rotate(-18deg)', mixBlendMode: 'screen' }} />
        <div className="absolute bottom-[-14%] left-[40%] w-[60%] h-[74%] z-0 pointer-events-none" style={{ background: 'radial-gradient(closest-side, rgba(31,162,255,0.28), transparent 74%)', filter: 'blur(48px)', mixBlendMode: 'screen', animation: 'cfglow 11s ease-in-out infinite reverse' }} />
        <div className="hud-corner-tl" /><div className="hud-corner-tr" /><div className="hud-corner-bl" /><div className="hud-corner-br" />

        <div className="relative z-[3] max-w-[1320px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            {/* Status */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-7" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)' }}>
              <span className="animate-blink inline-block w-[7px] h-[7px] rounded-full" style={{ background: '#35D6A0', boxShadow: '0 0 10px #35D6A0' }} />
              <span className="text-[13px] font-semibold text-[rgba(244,246,251,0.8)] tracking-wider">ONLINE · AI EMPLOYEE</span>
            </div>

            <h1
              className="font-grotesk font-bold leading-[0.99] tracking-[-0.035em] mb-6 text-white"
              style={{ fontSize: 'clamp(44px,6.8vw,86px)' }}
            >
              {employee.name}
            </h1>
            <p className="text-[13px] font-bold uppercase tracking-[0.16em] mb-4" style={{ color: accent }}>
              {employee.role}
            </p>
            <p className="text-[clamp(17px,1.55vw,20px)] leading-[1.6] text-[rgba(244,246,251,0.66)] max-w-[560px] mb-10">
              {employee.tagline}
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Button variant="primary" size="lg">Book a Demo</Button>
              <Button variant="secondary" size="lg">Get {employee.name} →</Button>
            </div>

            {/* Live stats */}
            <div className="flex flex-wrap gap-6">
              {employee.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-grotesk font-bold text-[22px]" style={{ color: accent }}>{s.value}</div>
                  <div className="text-[12px] text-[rgba(244,246,251,0.5)] mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Orbital visual */}
          <div className="relative flex items-center justify-center" style={{ minHeight: 'clamp(400px,52vw,560px)' }}>
            {/* Outer ring */}
            <div className="absolute w-[90%] aspect-square rounded-full border border-white/[0.08] animate-spin-slow" />
            <div className="absolute w-[70%] aspect-square rounded-full border border-dashed animate-spin-slow-r" style={{ borderColor: `${accent}30` }} />
            {/* Core glow */}
            <div className="absolute w-[50%] aspect-square rounded-full" style={{ background: `radial-gradient(circle, ${glow.replace('0.3', '0.4')}, transparent 70%)`, filter: 'blur(18px)' }} />
            {/* Avatar */}
            <div
              className="relative z-10 w-40 h-40 rounded-full flex items-center justify-center font-grotesk font-bold text-5xl text-[#070B16] animate-pulse-glow"
              style={{ background: gradient, boxShadow: `0 0 60px ${glow}` }}
            >
              {employee.initial}
            </div>
            {/* Floating stat cards */}
            <div className="absolute top-[10%] -left-4 lg:-left-12 z-[5] px-4 py-3 rounded-[14px] animate-float" style={{ background: 'linear-gradient(180deg,rgba(13,18,32,.9),rgba(8,11,20,.9))', border: `1px solid ${accent}45`, backdropFilter: 'blur(16px)', boxShadow: `0 20px 54px rgba(0,0,0,.55), 0 0 26px ${glow}` }}>
              <StatusBadge status="online" />
              <div className="font-grotesk font-bold text-[22px] text-white mt-1">{employee.stats[0]?.value ?? '—'}</div>
              <div className="text-[11px] text-[rgba(244,246,251,0.5)]">{employee.stats[0]?.label}</div>
            </div>
            <div className="absolute bottom-[15%] -right-4 lg:-right-10 z-[5] px-4 py-3 rounded-[14px] animate-float" style={{ animationDelay: '1.5s', background: 'linear-gradient(180deg,rgba(13,18,32,.9),rgba(8,11,20,.9))', border: `1px solid ${accent}45`, backdropFilter: 'blur(16px)', boxShadow: `0 20px 54px rgba(0,0,0,.55), 0 0 26px ${glow}` }}>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[rgba(185,212,255,0.7)] mb-1">{employee.stats[1]?.label}</div>
              <div className="font-grotesk font-bold text-[22px] text-white">{employee.stats[1]?.value ?? '—'}</div>
              <div className="text-[11px] text-[#35D6A0] font-bold mt-0.5">↑ This week</div>
            </div>
          </div>
        </div>
      </header>

      {/* ─── ORIGIN STORY ─── */}
      <section className="section-padding">
        <div className="max-content grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <SectionLabel color={labelColor}>ORIGIN STORY</SectionLabel>
            <h2 className="font-grotesk font-bold leading-[1.08] tracking-[-0.02em] mb-6 text-white" style={{ fontSize: 'clamp(28px,3.5vw,44px)' }}>
              How {employee.name} came to be
            </h2>
            {employee.origin.split('\n\n').map((para, i) => (
              <p key={i} className="text-[16px] leading-[1.7] text-[rgba(244,246,251,0.65)] mb-5 last:mb-0">{para}</p>
            ))}
          </div>
          {/* Decorative visual */}
          <div className="relative flex items-center justify-center h-72 lg:h-96">
            <div className="absolute w-64 h-64 rounded-full" style={{ background: `radial-gradient(circle, ${glow.replace('0.3', '0.25')}, transparent 65%)`, filter: 'blur(32px)' }} />
            <div className="relative z-10 font-grotesk font-bold text-[140px] leading-none" style={{ background: gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', opacity: 0.35 }}>
              {employee.initial}
            </div>
            <div className="absolute w-48 h-48 rounded-full border border-white/[0.06] animate-spin-slow" />
            <div className="absolute w-72 h-72 rounded-full border border-dashed animate-spin-slow-r" style={{ borderColor: `${accent}20` }} />
          </div>
        </div>
      </section>

      {/* ─── WHY THIS NAME ─── */}
      <section className="section-padding">
        <div className="max-content max-w-[860px] mx-auto">
          <SectionLabel color={labelColor} className="text-center">WHY "{employee.name.toUpperCase()}"?</SectionLabel>
          <div
            className="p-10 rounded-[22px] relative"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderLeft: `4px solid ${accent}`,
            }}
          >
            <p className="text-[17px] italic leading-[1.75] text-[rgba(244,246,251,0.75)]">
              "{employee.whyThisName}"
            </p>
          </div>
        </div>
      </section>

      {/* ─── MISSION ─── */}
      <section className="section-padding">
        <div className="max-content">
          <div
            className="relative p-10 rounded-[26px] overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${glow.replace('0.3', '0.12')}, rgba(255,255,255,0.02))`,
              border: `1px solid ${accent}30`,
            }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${glow}, transparent 65%)`, filter: 'blur(40px)', transform: 'translate(30%, -30%)' }} />
            <SectionLabel color={labelColor}>MISSION</SectionLabel>
            <p className="font-grotesk font-semibold text-[clamp(20px,2.5vw,30px)] leading-[1.35] text-white max-w-[800px] relative z-[1]">
              {employee.mission}
            </p>
          </div>
        </div>
      </section>

      {/* ─── DAILY RESPONSIBILITIES ─── */}
      <section className="section-padding">
        <div className="max-content">
          <div className="text-center mb-12">
            <SectionLabel color={labelColor}>DAILY RESPONSIBILITIES</SectionLabel>
            <h2 className="font-grotesk font-bold leading-[1.08] tracking-[-0.02em] text-white" style={{ fontSize: 'clamp(28px,3.5vw,44px)' }}>
              What {employee.name} does every day
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {employee.responsibilities.map((r, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-[18px] transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[13px] mt-0.5"
                  style={{ background: `${accent}18`, color: accent }}
                >
                  ✓
                </span>
                <p className="text-[14.5px] leading-[1.6] text-[rgba(244,246,251,0.75)]">{r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BUSINESS BENEFITS ─── */}
      <section className="section-padding">
        <div className="max-content">
          <div className="text-center mb-12">
            <SectionLabel color={labelColor}>BUSINESS BENEFITS</SectionLabel>
            <h2 className="font-grotesk font-bold leading-[1.08] tracking-[-0.02em] text-white" style={{ fontSize: 'clamp(28px,3.5vw,44px)' }}>
              What changes when {employee.name} joins your team
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {employee.benefits.map((b, i) => (
              <div
                key={i}
                className="p-7 rounded-[22px] transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-[14px] flex items-center justify-center text-2xl mb-5"
                  style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}
                >
                  {benefitIcons[i] ?? '✦'}
                </div>
                <h3 className="font-grotesk font-semibold text-[18px] mb-2 text-white">{b.title}</h3>
                <p className="text-[14.5px] leading-[1.6] text-[rgba(244,246,251,0.6)]">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INDUSTRIES ─── */}
      <section className="section-padding">
        <div className="max-content">
          <div className="text-center mb-10">
            <SectionLabel color={labelColor}>INDUSTRIES</SectionLabel>
            <h2 className="font-grotesk font-bold leading-[1.08] tracking-[-0.02em] text-white" style={{ fontSize: 'clamp(26px,3vw,40px)' }}>
              Built for the businesses that never stop
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {employee.industries.map((ind) => (
              <span
                key={ind}
                className="px-5 py-2.5 rounded-full text-[14px] font-semibold text-[rgba(244,246,251,0.8)] transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)' }}
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TECHNOLOGY ─── */}
      <section className="section-padding">
        <div className="max-content">
          <div className="text-center mb-10">
            <SectionLabel color={labelColor}>TECHNOLOGY</SectionLabel>
            <h2 className="font-grotesk font-bold leading-[1.08] tracking-[-0.02em] text-white" style={{ fontSize: 'clamp(26px,3vw,40px)' }}>
              The tech stack behind {employee.name}
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {employee.tech.map((t) => (
              <span
                key={t}
                className="px-4 py-2 rounded-[10px] text-[13px] font-semibold"
                style={{ background: `${accent}12`, border: `1px solid ${accent}28`, color: accent }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section-padding">
        <div className="max-content max-w-[860px] mx-auto">
          <div className="text-center mb-10">
            <SectionLabel color={labelColor}>FAQ</SectionLabel>
            <h2 className="font-grotesk font-bold leading-[1.08] tracking-[-0.02em] text-white" style={{ fontSize: 'clamp(26px,3vw,40px)' }}>
              Questions about {employee.name}
            </h2>
          </div>
          <FAQ items={employee.faqs} />
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${glow.replace('0.3', '0.12')}, rgba(7,11,22,0.9))` }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${glow.replace('0.3', '0.15')}, transparent 70%)` }} />
        <div className="max-content text-center relative z-[1]">
          <SectionLabel color={labelColor} className="text-center">GET STARTED</SectionLabel>
          <h2 className="font-grotesk font-bold leading-[1.08] tracking-[-0.02em] mb-5 text-white" style={{ fontSize: 'clamp(28px,4vw,52px)' }}>
            Ready to deploy {employee.name}?
          </h2>
          <p className="text-[17px] leading-[1.6] text-[rgba(244,246,251,0.6)] max-w-[520px] mx-auto mb-10">
            Your AI employee can be live and handling real conversations in as little as 14 days. No technical work required from your team.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="primary" size="lg">Book a Demo</Button>
            <Button variant="secondary" size="lg">Get {employee.name} for Your Business</Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

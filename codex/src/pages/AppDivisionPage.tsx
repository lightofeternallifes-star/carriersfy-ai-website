import { PageWrapper } from '../components/ui/PageWrapper'
import { Navbar } from '../components/nav/Navbar'
import { SectionLabel } from '../components/ui/SectionLabel'
import { Button } from '../components/ui/Button'

const services = [
  { icon: '📱', title: 'Native iPhone Apps', desc: 'Premium iOS applications built with Swift and SwiftUI — approved for the App Store and optimized for every iPhone and iPad.', color: '#1FA2FF' },
  { icon: '🤖', title: 'Android Apps', desc: 'Full-featured Android applications built with Kotlin — distributed on Google Play and compatible with all Android devices.', color: '#FF2E3C' },
  { icon: '🧠', title: 'AI Applications', desc: 'Intelligent software powered by LLMs, computer vision, voice recognition, and custom ML models trained on your business data.', color: '#1FA2FF' },
  { icon: '🏢', title: 'Enterprise Platforms', desc: 'Scalable internal platforms that replace legacy systems — with custom workflows, role-based access, and deep integrations.', color: '#FF2E3C' },
  { icon: '☁️', title: 'SaaS Systems', desc: 'Multi-tenant cloud software with subscription billing, usage metering, customer portals, and admin dashboards.', color: '#1FA2FF' },
  { icon: '⚙️', title: 'Business Automation', desc: 'End-to-end workflow automation eliminating manual tasks — from document processing to approval chains to data sync.', color: '#FF2E3C' },
  { icon: '📊', title: 'Internal Dashboards', desc: 'Real-time analytics and reporting platforms that give your team visibility into every KPI that matters to your business.', color: '#1FA2FF' },
  { icon: '🌐', title: 'Customer Portals', desc: 'Secure client-facing platforms with login, document management, project tracking, communication, and billing — all in one place.', color: '#FF2E3C' },
]

const showcase = [
  {
    title: 'AI Voice Platform',
    subtitle: 'Carriersfy AI · Enterprise',
    tags: ['AI', 'Voice', 'Cloud', 'Real-time'],
    metric: '1,284 calls/day handled',
    metricColor: '#1FA2FF',
    bg: 'linear-gradient(135deg, rgba(31,162,255,0.2), rgba(28,127,214,0.1))',
    border: '#1FA2FF30',
  },
  {
    title: 'Enterprise CRM',
    subtitle: 'Custom Client · SaaS',
    tags: ['React', 'Node.js', 'PostgreSQL', 'AI'],
    metric: '3.2× lead capture increase',
    metricColor: '#FF2E3C',
    bg: 'linear-gradient(135deg, rgba(255,46,60,0.2), rgba(28,127,214,0.1))',
    border: '#FF2E3C30',
  },
  {
    title: 'Mobile Commerce App',
    subtitle: 'Retail Client · iOS + Android',
    tags: ['Swift', 'Kotlin', 'Stripe', 'Push'],
    metric: '$2.4M revenue influenced',
    metricColor: '#35D6A0',
    bg: 'linear-gradient(135deg, rgba(53,214,160,0.2), rgba(28,127,214,0.1))',
    border: '#35D6A030',
  },
]

const process = [
  { num: '01', title: 'Discovery', desc: 'We define your vision, users, business model, and success metrics before writing a single line of code.' },
  { num: '02', title: 'Design', desc: 'Our design team creates pixel-perfect prototypes that feel native to your platform — ready for stakeholder review.' },
  { num: '03', title: 'Build', desc: 'Senior engineers build with production-grade architecture — scalable, secure, and maintainable from day one.' },
  { num: '04', title: 'Launch', desc: 'We handle App Store submissions, cloud deployment, and post-launch monitoring — so your launch goes flawlessly.' },
]

const techStack = ['Swift', 'SwiftUI', 'Kotlin', 'React Native', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'Supabase', 'Firebase', 'AWS', 'Cloudflare', 'OpenAI', 'Anthropic Claude', 'Stripe', 'Twilio', 'Push Notifications']

export default function AppDivisionPage() {
  return (
    <PageWrapper>
      <Navbar />

      {/* HERO */}
      <header
        className="relative z-[1] overflow-hidden flex items-center"
        style={{ minHeight: '100vh', padding: 'clamp(120px,15vh,175px) clamp(20px,5vw,56px) clamp(48px,6vw,80px)' }}
      >
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(1200px 820px at 60% 38%, rgba(22,46,98,0.7), transparent 62%), #05070F' }} />
        <div className="absolute top-[-10%] right-[-8%] w-[70%] h-[80%] z-0 pointer-events-none animate-glow" style={{ background: 'radial-gradient(closest-side, rgba(31,162,255,0.28), transparent 72%)', filter: 'blur(52px)', mixBlendMode: 'screen' }} />
        <div className="absolute bottom-[-10%] left-[-5%] w-[55%] h-[70%] z-0 pointer-events-none" style={{ background: 'radial-gradient(closest-side, rgba(255,46,60,0.22), transparent 72%)', filter: 'blur(52px)', mixBlendMode: 'screen', animation: 'cfglow 9s ease-in-out infinite reverse' }} />
        <div className="hud-corner-tl" /><div className="hud-corner-tr" /><div className="hud-corner-bl" /><div className="hud-corner-br" />

        <div className="relative z-[3] max-w-[1280px] mx-auto w-full">
          <SectionLabel color="blue">APP DEVELOPMENT DIVISION</SectionLabel>
          <h1
            className="font-grotesk font-bold leading-[0.95] tracking-[-0.035em] mb-4 text-white"
            style={{ fontSize: 'clamp(56px,8vw,110px)' }}
          >
            Have a Dream?
          </h1>
          <h2
            className="font-grotesk font-bold leading-[0.95] tracking-[-0.035em] mb-8 gradient-text"
            style={{ fontSize: 'clamp(56px,8vw,110px)' }}
          >
            We'll Build It.
          </h2>
          <p className="text-[clamp(17px,1.55vw,20px)] leading-[1.6] text-[rgba(244,246,251,0.66)] max-w-[600px] mb-12">
            Carriersfy AI develops native iPhone and Android apps, AI-powered applications, enterprise platforms, and SaaS systems — from concept to App Store in weeks, not months.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="lg">Start Your Project →</Button>
            <Button variant="secondary" size="lg">View Portfolio</Button>
          </div>
        </div>
      </header>

      {/* WHAT WE BUILD */}
      <section className="section-padding">
        <div className="max-content">
          <div className="text-center mb-14">
            <SectionLabel color="red">WHAT WE BUILD</SectionLabel>
            <h2 className="font-grotesk font-bold leading-[1.08] tracking-[-0.02em] text-white" style={{ fontSize: 'clamp(30px,4.2vw,52px)' }}>
              Every type of software. Every platform.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((svc) => (
              <div
                key={svc.title}
                className="p-7 rounded-[22px] transition-all duration-300 hover:-translate-y-1 group"
                style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid rgba(255,255,255,0.07)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = svc.color + '35'; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 24px ${svc.color}20` }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none' }}
              >
                <div className="text-[32px] mb-4">{svc.icon}</div>
                <h3 className="font-grotesk font-semibold text-[17px] mb-2 text-white">{svc.title}</h3>
                <p className="text-[13.5px] leading-[1.6] text-[rgba(244,246,251,0.55)]">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="section-padding">
        <div className="max-content">
          <div className="text-center mb-14">
            <SectionLabel color="blue">PORTFOLIO</SectionLabel>
            <h2 className="font-grotesk font-bold leading-[1.08] tracking-[-0.02em] text-white" style={{ fontSize: 'clamp(30px,4.2vw,52px)' }}>
              Recent builds
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {showcase.map((proj) => (
              <div key={proj.title} className="rounded-[26px] overflow-hidden" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)', border: `1px solid ${proj.border}` }}>
                {/* Device mockup */}
                <div className="h-52 flex items-center justify-center relative" style={{ background: proj.bg }}>
                  <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                  {/* Phone mockup */}
                  <div className="relative z-10 w-24 h-44 rounded-[18px] border-2 border-white/20 bg-[#0a0e1a] flex flex-col overflow-hidden shadow-2xl">
                    <div className="h-6 flex items-center justify-center border-b border-white/10">
                      <div className="w-8 h-1 bg-white/30 rounded-full" />
                    </div>
                    <div className="flex-1 p-2 flex flex-col gap-1.5">
                      <div className="h-1.5 bg-white/10 rounded-full w-full" />
                      <div className="h-1.5 bg-white/10 rounded-full w-3/4" />
                      <div className="h-8 rounded-lg mt-1" style={{ background: proj.bg }} />
                      <div className="h-1.5 bg-white/10 rounded-full w-full mt-1" />
                      <div className="h-1.5 bg-white/10 rounded-full w-2/3" />
                    </div>
                    <div className="h-6 border-t border-white/10 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-white/10" />
                    </div>
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="font-grotesk font-bold text-[20px] mb-1 text-white">{proj.title}</h3>
                  <p className="text-[12px] text-[rgba(244,246,251,0.45)] mb-4">{proj.subtitle}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-[7px] text-[11px] font-semibold text-[rgba(244,246,251,0.7)]" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)' }}>{tag}</span>
                    ))}
                  </div>
                  <div className="font-grotesk font-bold text-[18px]" style={{ color: proj.metricColor }}>{proj.metric}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-padding">
        <div className="max-content">
          <div className="text-center mb-14">
            <SectionLabel color="red">OUR PROCESS</SectionLabel>
            <h2 className="font-grotesk font-bold leading-[1.08] tracking-[-0.02em] text-white" style={{ fontSize: 'clamp(30px,4.2vw,52px)' }}>
              From idea to launch in four steps
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {process.map((p) => (
              <div key={p.num} className="p-8 rounded-[22px]" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="font-grotesk font-bold text-[40px] gradient-text mb-4">{p.num}</div>
                <h3 className="font-grotesk font-semibold text-[19px] mb-2 text-white">{p.title}</h3>
                <p className="text-[14px] leading-[1.55] text-[rgba(244,246,251,0.58)]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="section-padding">
        <div className="max-content">
          <div className="text-center mb-10">
            <SectionLabel color="blue">TECH STACK</SectionLabel>
            <h2 className="font-grotesk font-bold leading-[1.08] tracking-[-0.02em] text-white" style={{ fontSize: 'clamp(26px,3vw,40px)' }}>
              We build with the best tools
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((t) => (
              <span key={t} className="px-4 py-2 rounded-full text-[13px] font-semibold text-[rgba(244,246,251,0.75)] transition-all duration-200 hover:-translate-y-0.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)' }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(31,162,255,0.1), rgba(7,11,22,0.9))' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(31,162,255,0.12), transparent 70%)' }} />
        <div className="max-content text-center relative z-[1]">
          <SectionLabel color="blue" className="text-center">LET'S BUILD</SectionLabel>
          <h2 className="font-grotesk font-bold leading-[1.08] tracking-[-0.02em] mb-5 text-white" style={{ fontSize: 'clamp(28px,4vw,52px)' }}>
            Let's build your vision.
          </h2>
          <p className="text-[17px] text-[rgba(244,246,251,0.6)] max-w-[520px] mx-auto mb-10">
            Share your idea with us. We'll scope it, design it, and build it — faster than you think possible.
          </p>
          <Button variant="primary" size="lg">Start a Project →</Button>
        </div>
      </section>
    </PageWrapper>
  )
}

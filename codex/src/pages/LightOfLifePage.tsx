import { PageWrapper } from '../components/ui/PageWrapper'
import { Navbar } from '../components/nav/Navbar'
import { SectionLabel } from '../components/ui/SectionLabel'
import { Button } from '../components/ui/Button'

// PLACEHOLDER — All statistics and metrics below require real data from client
const heroStats = [
  { label: 'Downloads', value: '50K+' }, // PLACEHOLDER
  { label: 'Languages', value: '3' },
  { label: 'Platforms', value: 'iOS · Android · Web' },
  { label: 'Rating', value: '4.9 ★' }, // PLACEHOLDER
]

const problems = [
  { num: '01', title: 'Fragmented spiritual content', desc: 'Members accessed devotional content, sermons, and community resources across three separate platforms — creating friction and reducing engagement across the congregation.' }, // PLACEHOLDER
  { num: '02', title: 'Language barrier limiting reach', desc: 'A trilingual community (English, Spanish, Portuguese) was underserved by English-only digital tools, leaving Spanish and Portuguese-speaking members without full access to resources.' }, // PLACEHOLDER
  { num: '03', title: 'No personalized spiritual journey', desc: 'Without AI personalization, every member received the same content regardless of their spiritual stage, interests, or engagement history — reducing relevance and daily retention.' }, // PLACEHOLDER
]

const solutions = [
  { num: '01', title: 'Unified spiritual platform', desc: 'A single native app on iOS and Android — bringing sermons, devotionals, prayer requests, community, giving, and events under one beautifully designed experience.', color: '#1FA2FF' }, // PLACEHOLDER
  { num: '02', title: 'Full trilingual experience', desc: 'Every screen, every piece of content, and every notification available in English, Spanish, and Portuguese — with AI-powered translation for user-generated content in real time.', color: '#FF2E3C' }, // PLACEHOLDER
  { num: '03', title: 'AI-powered personalization', desc: 'An intelligent recommendation engine serves each member daily devotionals, sermon playlists, and community content aligned with their spiritual interests and engagement patterns.', color: '#35D6A0' }, // PLACEHOLDER
]

const techRows = [
  { category: 'AI Layer', items: 'Anthropic Claude (translation & recommendations), Content Moderation AI, Prayer Guidance NLP' }, // PLACEHOLDER
  { category: 'Backend', items: 'Node.js, Supabase, PostgreSQL, Redis, Cloudflare Workers' }, // PLACEHOLDER
  { category: 'Mobile', items: 'Swift (iOS / SwiftUI), Kotlin (Android), Push Notifications (APNs & FCM)' }, // PLACEHOLDER
  { category: 'Web', items: 'React, Next.js, TypeScript, Tailwind CSS' }, // PLACEHOLDER
  { category: 'Languages', items: 'English, Spanish (ES), Portuguese (PT-BR) — AI-assisted translation' }, // PLACEHOLDER
  { category: 'Cloud', items: 'AWS (media storage), Cloudflare CDN, Vercel (web), Apple App Store, Google Play' }, // PLACEHOLDER
]

const aiFeatures = [
  { icon: '🌐', title: 'Real-time Translation', desc: 'Prayer requests, testimonies, and community posts are automatically translated across all three languages — keeping the community connected regardless of language.' }, // PLACEHOLDER
  { icon: '📖', title: 'Personalized Devotionals', desc: 'The AI engine delivers daily devotionals matched to each member\'s spiritual journey, reading history, and engagement patterns.', }, // PLACEHOLDER
  { icon: '🛡️', title: 'Content Moderation', desc: 'All community-submitted content is reviewed by AI before publication — maintaining a safe, uplifting environment for all members.' }, // PLACEHOLDER
  { icon: '🙏', title: 'Prayer Guidance', desc: 'An NLP-powered prayer assistant helps members articulate and explore their faith through structured, guided devotional conversations.' }, // PLACEHOLDER
]

const results = [
  { label: 'Downloads', value: '50K+', sub: 'In first 90 days' }, // PLACEHOLDER
  { label: 'Daily Active Users', value: '68%', sub: 'Retention rate' }, // PLACEHOLDER
  { label: 'Languages Served', value: '3', sub: 'EN · ES · PT' },
  { label: 'App Store Rating', value: '4.9', sub: '★★★★★' }, // PLACEHOLDER
]

export default function LightOfLifePage() {
  return (
    <PageWrapper>
      <Navbar />

      {/* HERO */}
      <header
        className="relative z-[1] overflow-hidden flex items-center"
        style={{ minHeight: '80vh', padding: 'clamp(120px,15vh,175px) clamp(20px,5vw,56px) clamp(48px,6vw,80px)' }}
      >
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(1200px 820px at 50% 38%, rgba(22,46,98,0.6), transparent 62%), #05070F' }} />
        <div className="absolute inset-0 pointer-events-none z-0 animate-glow" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,200,60,0.08), transparent 70%)' }} />
        <div className="hud-corner-tl" /><div className="hud-corner-tr" /><div className="hud-corner-bl" /><div className="hud-corner-br" />

        <div className="relative z-[3] max-w-[1280px] mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 mb-10">
            {/* Logo placeholder */}
            <div className="w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse-glow" style={{ background: 'linear-gradient(135deg, #FFC83C, #FF8C00)', boxShadow: '0 0 40px rgba(255,200,60,0.4)' }}>
              <span className="text-4xl">✦</span>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3" style={{ background: 'rgba(53,214,160,0.1)', border: '1px solid rgba(53,214,160,0.3)' }}>
                <span className="w-2 h-2 rounded-full bg-[#35D6A0] animate-blink" />
                <span className="text-[12px] font-bold text-[#35D6A0] uppercase tracking-wider">Live on App Store & Play Store</span>
              </div>
              <h1 className="font-grotesk font-bold text-white mb-2" style={{ fontSize: 'clamp(40px,5.5vw,72px)', lineHeight: 0.99, letterSpacing: '-0.035em' }}>
                Light of Life
              </h1>
              <p className="text-[16px] text-[rgba(244,246,251,0.55)] font-semibold tracking-wider">
                Mobile App · Spiritual Wellness · 3 Languages
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-5">
            {heroStats.map((s) => (
              <div key={s.label} className="px-5 py-3 rounded-[14px]" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)' }}>
                <div className="font-grotesk font-bold text-[22px] text-white">{s.value}</div>
                <div className="text-[12px] text-[rgba(244,246,251,0.5)] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* OVERVIEW */}
      <section className="section-padding">
        <div className="max-content grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <SectionLabel color="blue">OVERVIEW</SectionLabel>
            <h2 className="font-grotesk font-bold leading-[1.08] tracking-[-0.02em] mb-5 text-white" style={{ fontSize: 'clamp(28px,3.5vw,44px)' }}>
              A digital home for faith, community, and connection {/* PLACEHOLDER */}
            </h2>
            <p className="text-[16px] leading-[1.7] text-[rgba(244,246,251,0.65)] mb-4">
              Light of Life is a spiritual wellness organization serving a diverse, multilingual community across multiple locations. They needed a unified digital experience that could bring their sermons, devotionals, prayer community, events, and giving platform together in one app — available in English, Spanish, and Portuguese simultaneously. {/* PLACEHOLDER */}
            </p>
            <p className="text-[16px] leading-[1.7] text-[rgba(244,246,251,0.65)]">
              Carriersfy AI designed, built, and deployed a premium mobile application powered by an AI content layer that personalizes the spiritual journey for each member — while keeping the entire trilingual community connected and engaged. {/* PLACEHOLDER */}
            </p>
          </div>
          {/* Phone mockup */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-[40px]" style={{ background: 'rgba(255,200,60,0.15)', filter: 'blur(40px)' }} />
              <div className="relative w-56 h-[480px] rounded-[38px] border-2 border-white/15 overflow-hidden shadow-2xl" style={{ background: '#0a0e1a' }}>
                <div className="h-7 bg-[#050810] flex items-center justify-center border-b border-white/5">
                  <div className="w-20 h-1.5 bg-white/20 rounded-full" />
                </div>
                <div className="p-4 flex flex-col gap-3 h-full">
                  <div className="h-32 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(255,200,60,0.3), rgba(255,140,0,0.2))' }}>
                    <span className="text-5xl">✦</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full w-3/4" />
                  <div className="h-2 bg-white/10 rounded-full w-full" />
                  <div className="h-2 bg-white/10 rounded-full w-1/2" />
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="h-16 rounded-xl bg-white/5 border border-white/8" />
                    <div className="h-16 rounded-xl bg-white/5 border border-white/8" />
                  </div>
                  <div className="h-2 bg-white/10 rounded-full w-full" />
                  <div className="h-2 bg-white/10 rounded-full w-2/3" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-14 bg-[#050810] border-t border-white/5 flex items-center justify-around px-4">
                  {['🏠','📖','🙏','👥','⚙️'].map((icon, i) => <span key={i} className="text-lg opacity-50">{icon}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section-padding">
        <div className="max-content">
          <SectionLabel color="red">THE PROBLEM</SectionLabel>
          <h2 className="font-grotesk font-bold leading-[1.08] tracking-[-0.02em] mb-10 text-white" style={{ fontSize: 'clamp(28px,3.5vw,44px)' }}>
            Three challenges blocking growth {/* PLACEHOLDER */}
          </h2>
          <div className="flex flex-col gap-4">
            {problems.map((p) => (
              <div key={p.num} className="flex gap-6 p-7 rounded-[22px]" style={{ background: 'rgba(255,46,60,0.04)', border: '1px solid rgba(255,46,60,0.15)' }}>
                <div className="font-grotesk font-bold text-[32px] text-cf-red/40 flex-shrink-0">{p.num}</div>
                <div>
                  <h3 className="font-grotesk font-semibold text-[18px] text-white mb-2">{p.title}</h3>
                  <p className="text-[14.5px] leading-[1.6] text-[rgba(244,246,251,0.62)]">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="section-padding">
        <div className="max-content">
          <SectionLabel color="blue">THE SOLUTION</SectionLabel>
          <h2 className="font-grotesk font-bold leading-[1.08] tracking-[-0.02em] mb-10 text-white" style={{ fontSize: 'clamp(28px,3.5vw,44px)' }}>
            Three solutions deployed {/* PLACEHOLDER */}
          </h2>
          <div className="flex flex-col gap-4">
            {solutions.map((s) => (
              <div key={s.num} className="flex gap-6 p-7 rounded-[22px]" style={{ background: `${s.color}08`, border: `1px solid ${s.color}25` }}>
                <div className="font-grotesk font-bold text-[32px] flex-shrink-0" style={{ color: `${s.color}50` }}>{s.num}</div>
                <div>
                  <h3 className="font-grotesk font-semibold text-[18px] text-white mb-2">{s.title}</h3>
                  <p className="text-[14.5px] leading-[1.6] text-[rgba(244,246,251,0.62)]">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="section-padding">
        <div className="max-content">
          <SectionLabel color="red">TECHNOLOGY</SectionLabel>
          <h2 className="font-grotesk font-bold leading-[1.08] tracking-[-0.02em] mb-10 text-white" style={{ fontSize: 'clamp(28px,3.5vw,44px)' }}>
            Built on modern, scalable infrastructure {/* PLACEHOLDER */}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {techRows.map((row) => (
              <div key={row.category} className="p-5 rounded-[18px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="text-[12px] font-bold uppercase tracking-widest text-cf-blue mb-2">{row.category}</div>
                <p className="text-[14px] text-[rgba(244,246,251,0.65)]">{row.items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI FEATURES */}
      <section className="section-padding">
        <div className="max-content">
          <SectionLabel color="blue">ARTIFICIAL INTELLIGENCE</SectionLabel>
          <h2 className="font-grotesk font-bold leading-[1.08] tracking-[-0.02em] mb-10 text-white" style={{ fontSize: 'clamp(28px,3.5vw,44px)' }}>
            AI at the core of every interaction {/* PLACEHOLDER */}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {aiFeatures.map((f) => (
              <div key={f.title} className="p-7 rounded-[22px]" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-grotesk font-semibold text-[18px] mb-2 text-white">{f.title}</h3>
                <p className="text-[14.5px] leading-[1.6] text-[rgba(244,246,251,0.6)]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THREE LANGUAGES */}
      <section className="section-padding">
        <div className="max-content">
          <div className="text-center mb-10">
            <SectionLabel color="red">THREE LANGUAGES</SectionLabel>
            <h2 className="font-grotesk font-bold leading-[1.08] tracking-[-0.02em] text-white" style={{ fontSize: 'clamp(28px,3.5vw,44px)' }}>
              Every word. Every language. Simultaneously.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { flag: '🇺🇸', lang: 'English', label: 'EN', sample: '"Today\'s devotional: The peace that surpasses all understanding..."', color: '#1FA2FF' },
              { flag: '🇪🇸', lang: 'Español', label: 'ES', sample: '"Devocional de hoy: La paz que sobrepasa todo entendimiento..."', color: '#FF2E3C' },
              { flag: '🇧🇷', lang: 'Português', label: 'PT', sample: '"Devocional de hoje: A paz que excede todo o entendimento..."', color: '#35D6A0' },
            ].map((l) => (
              <div key={l.label} className="p-6 rounded-[22px] text-center" style={{ background: `${l.color}08`, border: `1px solid ${l.color}25` }}>
                <div className="text-4xl mb-3">{l.flag}</div>
                <div className="font-grotesk font-bold text-[16px] mb-1" style={{ color: l.color }}>{l.lang}</div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[rgba(244,246,251,0.4)] mb-4">{l.label}</div>
                <p className="text-[13px] italic leading-[1.6] text-[rgba(244,246,251,0.6)]">{l.sample}</p> {/* PLACEHOLDER */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APP STORE */}
      <section className="section-padding">
        <div className="max-content max-w-[720px] mx-auto text-center">
          <SectionLabel color="blue" className="text-center">APPLE APP STORE</SectionLabel>
          <h2 className="font-grotesk font-bold leading-[1.08] tracking-[-0.02em] mb-8 text-white" style={{ fontSize: 'clamp(26px,3vw,40px)' }}>
            Available on all platforms {/* PLACEHOLDER */}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {/* App Store badge */}
            <div className="p-5 rounded-[18px] flex flex-col items-center gap-2" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span className="text-2xl">🍎</span>
              <div className="font-grotesk font-semibold text-[14px] text-white">App Store</div>
              <div className="text-[11px] text-[rgba(244,246,251,0.5)]">iOS · iPadOS</div>
              <div className="text-[#FFC83C] text-sm">★★★★★</div>
              <div className="text-[11px] text-[rgba(244,246,251,0.4)]">[PLACEHOLDER] reviews</div>
            </div>
            {/* Play Store */}
            <div className="p-5 rounded-[18px] flex flex-col items-center gap-2" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span className="text-2xl">🤖</span>
              <div className="font-grotesk font-semibold text-[14px] text-white">Google Play</div>
              <div className="text-[11px] text-[rgba(244,246,251,0.5)]">Android · All Devices</div>
              <div className="text-[#FFC83C] text-sm">★★★★★</div>
              <div className="text-[11px] text-[rgba(244,246,251,0.4)]">[PLACEHOLDER] reviews</div>
            </div>
            {/* QR */}
            <div className="p-5 rounded-[18px] flex flex-col items-center gap-2" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="w-16 h-16 grid grid-cols-4 gap-0.5">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="rounded-[2px]" style={{ background: Math.random() > 0.4 ? 'rgba(244,246,251,0.8)' : 'transparent', aspectRatio: '1' }} />
                ))}
              </div>
              <div className="font-grotesk font-semibold text-[13px] text-white">Scan to Download</div>
              <div className="text-[11px] text-[rgba(244,246,251,0.4)]">[PLACEHOLDER QR]</div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="section-padding">
        <div className="max-content">
          <div className="text-center mb-12">
            <SectionLabel color="red">RESULTS</SectionLabel>
            <h2 className="font-grotesk font-bold leading-[1.08] tracking-[-0.02em] text-white" style={{ fontSize: 'clamp(28px,3.5vw,44px)' }}>
              Measurable community impact {/* PLACEHOLDER */}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {results.map((r) => (
              <div key={r.label} className="p-7 rounded-[22px] text-center" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="font-grotesk font-bold gradient-text mb-2" style={{ fontSize: 'clamp(28px,3.5vw,42px)' }}>{r.value}</div>
                <div className="font-grotesk font-semibold text-[14px] text-white mb-1">{r.label}</div>
                <div className="text-[12px] text-[rgba(244,246,251,0.45)]">{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(255,200,60,0.08), rgba(7,11,22,0.9))' }}>
        <div className="max-content text-center relative z-[1]">
          <SectionLabel color="blue" className="text-center text-[#FFC83C]">GET STARTED</SectionLabel>
          <h2 className="font-grotesk font-bold leading-[1.08] tracking-[-0.02em] mb-5 text-white" style={{ fontSize: 'clamp(28px,4vw,52px)' }}>
            Ready to build something meaningful?
          </h2>
          <p className="text-[17px] text-[rgba(244,246,251,0.6)] max-w-[520px] mx-auto mb-10">
            Tell us about your project and we'll show you exactly how we can bring it to life.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="primary" size="lg">View Case Study</Button> {/* PLACEHOLDER — link to full case study doc */}
            <Button variant="secondary" size="lg">Download App</Button> {/* PLACEHOLDER — link to app store */}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

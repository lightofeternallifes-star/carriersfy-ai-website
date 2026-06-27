import { useState } from 'react'
import { PageWrapper } from '../components/ui/PageWrapper'

type Section = 'dashboard' | 'employees' | 'analytics' | 'messages' | 'settings'

const navItems: { id: Section; icon: string; label: string }[] = [
  { id: 'dashboard', icon: '◻', label: 'Dashboard' },
  { id: 'employees', icon: '🤖', label: 'AI Employees' },
  { id: 'analytics', icon: '📊', label: 'Analytics' },
  { id: 'messages', icon: '💬', label: 'Messages' },
  { id: 'settings', icon: '⚙️', label: 'Settings' },
]

// ── Mini chart using SVG path ──────────────────────────────────────────────
function SparkLine({ points, color }: { points: number[]; color: string }) {
  const w = 120
  const h = 36
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const coords = points.map((v, i) => {
    const x = (i / (points.length - 1)) * w
    const y = h - ((v - min) / range) * (h - 4) - 2
    return `${x},${y}`
  })
  const d = `M ${coords.join(' L ')}`
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <path d={d} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d={`${d} L ${w},${h} L 0,${h} Z`} fill={color} fillOpacity="0.08" />
    </svg>
  )
}

// ── Stat card ─────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, color, trend, sparkData }: { label: string; value: string; sub: string; color: string; trend: string; sparkData: number[] }) {
  const up = trend.startsWith('+')
  return (
    <div className="p-5 rounded-[18px] flex flex-col gap-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-[rgba(244,246,251,0.4)]">{label}</div>
          <div className="font-grotesk font-black text-[30px] mt-1" style={{ color }}>{value}</div>
          <div className="text-[12px] text-[rgba(244,246,251,0.4)] mt-0.5">{sub}</div>
        </div>
        <SparkLine points={sparkData} color={color} />
      </div>
      <div className="text-[12px] font-semibold" style={{ color: up ? '#35D6A0' : '#FF2E3C' }}>
        {trend} vs last month
      </div>
    </div>
  )
}

// ── Activity feed ──────────────────────────────────────────────────────────
function ActivityFeed() {
  const events = [
    { icon: '🤖', text: 'Sophia closed deal with Prospect #4471', time: '2m ago', color: '#35D6A0' },
    { icon: '📞', text: 'Atlas completed 14 outbound calls', time: '18m ago', color: '#1FA2FF' },
    { icon: '📧', text: 'Nova sent follow-up sequence to 23 leads', time: '1h ago', color: '#1FA2FF' },
    { icon: '🎯', text: 'Sophia qualified 6 new leads from web chat', time: '2h ago', color: '#FFC83C' },
    { icon: '⚠️', text: 'Atlas flagged 1 high-priority escalation', time: '3h ago', color: '#FF2E3C' },
    { icon: '✅', text: 'Monthly performance report generated', time: '6h ago', color: '#35D6A0' },
  ]
  return (
    <div className="flex flex-col gap-2">
      {events.map((e, i) => (
        <div key={i} className="flex items-start gap-3 p-3.5 rounded-[12px] hover:bg-white/[0.02] transition-colors" style={{ borderLeft: `2px solid ${e.color}40` }}>
          <span className="text-base flex-shrink-0">{e.icon}</span>
          <div className="flex-1">
            <div className="text-[13px] text-[rgba(244,246,251,0.75)]">{e.text}</div>
          </div>
          <div className="text-[11px] text-[rgba(244,246,251,0.3)] flex-shrink-0 whitespace-nowrap">{e.time}</div>
        </div>
      ))}
    </div>
  )
}

// ── Usage bar ──────────────────────────────────────────────────────────────
function UsageBar({ label, used, max, color }: { label: string; used: number; max: number; color: string }) {
  const pct = Math.min(100, (used / max) * 100)
  return (
    <div>
      <div className="flex justify-between text-[12px] mb-1.5">
        <span className="text-[rgba(244,246,251,0.55)]">{label}</span>
        <span className="font-semibold text-[rgba(244,246,251,0.7)]">{used.toLocaleString()} / {max.toLocaleString()}</span>
      </div>
      <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: pct > 85 ? '#FF2E3C' : color }} />
      </div>
    </div>
  )
}

// ── Dashboard view ─────────────────────────────────────────────────────────
function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Conversations" value="1,847" sub="This month" color="#1FA2FF" trend="+23%" sparkData={[120, 145, 132, 178, 195, 210, 230, 218, 245, 260, 280, 310]} />
        <StatCard label="Leads Qualified" value="312" sub="This month" color="#35D6A0" trend="+18%" sparkData={[22, 28, 19, 35, 40, 38, 42, 45, 50, 48, 55, 58]} />
        <StatCard label="Deals Closed" value="28" sub="This month" color="#FFC83C" trend="+8%" sparkData={[2, 3, 2, 4, 3, 4, 5, 4, 5, 6, 5, 6]} />
        <StatCard label="Response Time" value="1.2s" sub="Average" color="#FF2E3C" trend="-0.3s" sparkData={[2.1, 1.9, 1.8, 1.6, 1.7, 1.5, 1.4, 1.3, 1.4, 1.2, 1.3, 1.2]} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bar chart placeholder */}
        <div className="lg:col-span-2 p-6 rounded-[20px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center justify-between mb-5">
            <div className="font-grotesk font-bold text-[15px] text-white">Conversations by Day</div>
            <span className="text-[11px] text-[rgba(244,246,251,0.4)]">Last 14 days</span>
          </div>
          <div className="flex items-end gap-2 h-32">
            {[45, 62, 38, 71, 85, 60, 90, 55, 78, 95, 68, 84, 73, 92].map((v, i) => (
              <div key={i} className="flex-1 rounded-t-[4px] transition-all duration-500" style={{ height: `${(v / 95) * 100}%`, background: `linear-gradient(180deg, rgba(31,162,255,${0.5 + v / 200}) 0%, rgba(28,127,214,0.2) 100%)` }} />
            ))}
          </div>
          <p className="mt-4 text-[11px] text-[rgba(244,246,251,0.3)] text-center">[PLACEHOLDER — Chart library integration pending]</p>
        </div>

        {/* Donut placeholder */}
        <div className="p-6 rounded-[20px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="font-grotesk font-bold text-[15px] text-white mb-5">Channel Breakdown</div>
          <div className="flex items-center justify-center mb-5">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="16" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#1FA2FF" strokeWidth="16" strokeDasharray="100 151.6" strokeDashoffset="0" transform="rotate(-90 50 50)" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#35D6A0" strokeWidth="16" strokeDasharray="60 151.6" strokeDashoffset="-100" transform="rotate(-90 50 50)" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#FFC83C" strokeWidth="16" strokeDasharray="40 151.6" strokeDashoffset="-160" transform="rotate(-90 50 50)" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#FF2E3C" strokeWidth="16" strokeDasharray="51.6 151.6" strokeDashoffset="-200" transform="rotate(-90 50 50)" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            {[['Phone', '#1FA2FF', '40%'], ['WhatsApp', '#35D6A0', '24%'], ['Email', '#FFC83C', '16%'], ['Chat', '#FF2E3C', '20%']].map(([label, color, pct]) => (
              <div key={label} className="flex items-center justify-between text-[12.5px]">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} /><span className="text-[rgba(244,246,251,0.6)]">{label}</span></div>
                <span className="font-semibold text-white">{pct}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity + Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-6 rounded-[20px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="font-grotesk font-bold text-[15px] text-white mb-4">Recent Activity</div>
          <ActivityFeed />
        </div>
        <div className="p-6 rounded-[20px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="font-grotesk font-bold text-[15px] text-white mb-5">Plan Usage</div>
          <div className="flex flex-col gap-4">
            <UsageBar label="Conversations" used={1847} max={5000} color="#1FA2FF" />
            <UsageBar label="Voice Minutes" used={340} max={500} color="#FFC83C" />
            <UsageBar label="SMS Messages" used={2100} max={2500} color="#FF2E3C" />
            <UsageBar label="Emails Sent" used={890} max={10000} color="#35D6A0" />
          </div>
          <div className="mt-5 p-3 rounded-[12px] text-center text-[11.5px] text-[rgba(244,246,251,0.35)]" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            [PLACEHOLDER — Usage data requires backend API]
          </div>
        </div>
      </div>
    </div>
  )
}

function EmployeesView() {
  const employees = [
    { name: 'Sophia', role: 'Customer Success', status: 'online', conversations: 834, resolved: '94%', color: '#1FA2FF' },
    { name: 'Atlas', role: 'Sales Intelligence', status: 'online', conversations: 621, resolved: '88%', color: '#35D6A0' },
  ]
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-grotesk font-bold text-[18px] text-white">Your AI Employees</h2>
      {employees.map((e) => (
        <div key={e.name} className="p-6 rounded-[20px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-grotesk font-black text-[18px] text-[#070B16]" style={{ background: `linear-gradient(135deg, ${e.color}, #1C7FD6)` }}>{e.name[0]}</div>
            <div>
              <div className="font-grotesk font-bold text-[16px] text-white">{e.name}</div>
              <div className="text-[13px] text-[rgba(244,246,251,0.45)]">{e.role}</div>
            </div>
            <span className="ml-auto flex items-center gap-1.5 text-[12px] font-semibold text-[#35D6A0]">
              <span className="w-2 h-2 rounded-full bg-[#35D6A0]" style={{ boxShadow: '0 0 6px #35D6A0' }} />{e.status}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-[14px]" style={{ background: 'rgba(255,255,255,0.03)' }}><div className="text-[11px] text-[rgba(244,246,251,0.4)] uppercase tracking-wider mb-1">Conversations</div><div className="font-grotesk font-black text-[24px] text-white">{e.conversations.toLocaleString()}</div></div>
            <div className="p-4 rounded-[14px]" style={{ background: 'rgba(255,255,255,0.03)' }}><div className="text-[11px] text-[rgba(244,246,251,0.4)] uppercase tracking-wider mb-1">Resolution Rate</div><div className="font-grotesk font-black text-[24px] text-[#35D6A0]">{e.resolved}</div></div>
          </div>
        </div>
      ))}
      <div className="p-4 rounded-[14px] text-center text-[12px] text-[rgba(244,246,251,0.35)]" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
        [PLACEHOLDER — Live employee metrics require backend WebSocket]
      </div>
    </div>
  )
}

function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-5xl mb-5 opacity-30">🚧</div>
      <h2 className="font-grotesk font-bold text-[20px] text-white mb-2">{title}</h2>
      <p className="text-[14px] text-[rgba(244,246,251,0.4)] max-w-[340px]">This section is under development and will be fully functional after backend integration.</p>
    </div>
  )
}

const sectionContent: Record<Section, JSX.Element> = {
  dashboard: <Dashboard />,
  employees: <EmployeesView />,
  analytics: <Placeholder title="Analytics" />,
  messages: <Placeholder title="Messages" />,
  settings: <Placeholder title="Settings" />,
}

export default function ClientPortalPage() {
  const [active, setActive] = useState<Section>('dashboard')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <PageWrapper>
      {/* Top nav */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-5 gap-4" style={{ background: 'rgba(7,11,22,0.95)', borderBottom: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)' }}>
        <div className="font-grotesk font-black text-[16px]" style={{ background: 'linear-gradient(110deg, #3FB0FF, #1C7FD6 42%, #FF2E3C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Carriersfy
        </div>
        <div className="flex-shrink-0 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full text-[rgba(244,246,251,0.5)]" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>Client Portal</div>
        <div className="flex-1" />
        <div className="flex items-center gap-2 text-[13px] text-[rgba(244,246,251,0.6)]">
          <div className="w-7 h-7 rounded-full flex items-center justify-center font-grotesk font-black text-[11px] text-[#070B16]" style={{ background: 'linear-gradient(135deg, #1FA2FF, #FF2E3C)' }}>JD</div>
          <span className="hidden sm:block">John Doe</span>
        </div>
      </header>

      <div className="flex pt-14 min-h-screen">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-52 flex-shrink-0 pt-6 px-3" style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-left transition-all duration-200 cursor-pointer"
                style={{
                  background: active === item.id ? 'rgba(31,162,255,0.1)' : 'transparent',
                  color: active === item.id ? '#1FA2FF' : 'rgba(244,246,251,0.5)',
                  border: active === item.id ? '1px solid rgba(31,162,255,0.25)' : '1px solid transparent',
                }}
              >
                <span className="text-base">{item.icon}</span>
                <span className="font-grotesk font-semibold text-[13px]">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0 p-5 md:p-8">
          {/* Mobile nav */}
          <div className="md:hidden flex gap-2 mb-6 overflow-x-auto pb-1">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => setActive(item.id)} className="flex-shrink-0 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer" style={{ background: active === item.id ? '#1FA2FF' : 'rgba(255,255,255,0.05)', color: active === item.id ? '#070B16' : 'rgba(244,246,251,0.6)' }}>
                {item.label}
              </button>
            ))}
          </div>
          {sectionContent[active]}
        </main>
      </div>
    </PageWrapper>
  )
}

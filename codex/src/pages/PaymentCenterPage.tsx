import { useState } from 'react'
import { PageWrapper } from '../components/ui/PageWrapper'
import { Navbar } from '../components/nav/Navbar'

type TabId = 'overview' | 'setup' | 'subscription' | 'upgrade' | 'add-employee' | 'invoices' | 'billing'

const navItems: { id: TabId; label: string; icon: string }[] = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'setup', label: 'Setup Fee', icon: '🚀' },
  { id: 'subscription', label: 'Subscription', icon: '🔄' },
  { id: 'upgrade', label: 'Upgrade Plan', icon: '⬆️' },
  { id: 'add-employee', label: 'Add Employee', icon: '➕' },
  { id: 'invoices', label: 'Invoices', icon: '📄' },
  { id: 'billing', label: 'Billing History', icon: '🕐' },
]

const mockInvoices = [
  { id: 'INV-2024-001', date: 'Jun 1, 2024', amount: '$299.00', status: 'Paid', desc: 'Monthly Subscription — Sophia' },
  { id: 'INV-2024-002', date: 'May 1, 2024', amount: '$299.00', status: 'Paid', desc: 'Monthly Subscription — Sophia' },
  { id: 'INV-2024-003', date: 'Apr 15, 2024', amount: '$1,500.00', status: 'Paid', desc: 'Setup Fee — Sophia AI Employee' },
  { id: 'INV-2024-004', date: 'Apr 1, 2024', amount: '$299.00', status: 'Overdue', desc: 'Monthly Subscription — Atlas' },
]

const statusColor = (s: string) => s === 'Paid' ? '#35D6A0' : s === 'Overdue' ? '#FF2E3C' : '#FFC83C'

function Overview() {
  return (
    <div className="flex flex-col gap-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Next Payment', value: '$299', sub: 'Due Jul 1, 2024', color: '#1FA2FF' },
          { label: 'AI Employees', value: '2', sub: 'Active this month', color: '#35D6A0' },
          { label: 'Total Spent', value: '$2,696', sub: 'Since Apr 2024', color: '#FFC83C' },
          { label: 'Account Status', value: 'Active', sub: 'All services online', color: '#35D6A0' },
        ].map((s) => (
          <div key={s.label} className="p-5 rounded-[18px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[rgba(244,246,251,0.4)] mb-2">{s.label}</div>
            <div className="font-grotesk font-black text-[28px]" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[12px] text-[rgba(244,246,251,0.4)] mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Active plans */}
      <div className="p-6 rounded-[20px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <h3 className="font-grotesk font-bold text-[16px] text-white mb-4">Active AI Employees</h3>
        <div className="flex flex-col gap-3">
          {[
            { name: 'Sophia', role: 'Customer Success', plan: 'Base + Channels', monthly: '$299/mo', next: 'Jul 1, 2024' },
            { name: 'Atlas', role: 'Sales Intelligence', plan: 'Base + CRM + Integrations', monthly: '$377/mo', next: 'Jul 1, 2024' },
          ].map((e) => (
            <div key={e.name} className="flex items-center gap-4 p-4 rounded-[14px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-grotesk font-black text-[14px] text-[#070B16] flex-shrink-0" style={{ background: 'linear-gradient(135deg, #1FA2FF, #FF2E3C)' }}>{e.name[0]}</div>
              <div className="flex-1">
                <div className="font-grotesk font-semibold text-[14px] text-white">{e.name} <span className="text-[rgba(244,246,251,0.45)] font-normal">· {e.role}</span></div>
                <div className="text-[12px] text-[rgba(244,246,251,0.45)]">{e.plan}</div>
              </div>
              <div className="text-right">
                <div className="font-grotesk font-bold text-[14px] text-white">{e.monthly}</div>
                <div className="text-[11px] text-[rgba(244,246,251,0.4)]">Next: {e.next}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-[14px] text-center text-[12px] text-[rgba(244,246,251,0.35)]" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
        [PLACEHOLDER — Actual billing data requires Stripe integration]
      </div>
    </div>
  )
}

function SetupFee() {
  return (
    <div className="flex flex-col gap-5">
      <div className="p-6 rounded-[20px]" style={{ background: 'rgba(255,200,60,0.05)', border: '1px solid rgba(255,200,60,0.2)' }}>
        <div className="text-[12px] font-bold uppercase tracking-widest text-[#FFC83C] mb-2">One-Time Fee</div>
        <div className="font-grotesk font-black text-[42px] text-white">$1,500 <span className="text-[16px] text-[rgba(244,246,251,0.45)] font-normal">per AI employee</span></div>
        <p className="text-[14px] text-[rgba(244,246,251,0.55)] mt-2">Covers onboarding, model training, integration setup, and your first 30-day tuning cycle.</p>
      </div>
      <div className="p-6 rounded-[20px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <h4 className="font-grotesk font-bold text-[15px] text-white mb-4">What's included</h4>
        <ul className="space-y-3">
          {['Discovery & requirements call (2h)', 'Custom personality & voice configuration', 'Knowledge base upload (up to 500 documents)', 'Integration setup (CRM, calendar, channels)', 'UAT testing & approval cycle', 'Live deployment & monitoring setup', '30-day post-launch tuning'].map((item) => (
            <li key={item} className="flex items-start gap-3 text-[13.5px] text-[rgba(244,246,251,0.6)]">
              <span className="text-[#FFC83C] flex-shrink-0">✓</span> {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 rounded-[14px] text-center text-[12px] text-[rgba(244,246,251,0.35)]" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
        [PLACEHOLDER — Setup fee payment requires Stripe Checkout integration]
      </div>
    </div>
  )
}

function Subscription() {
  return (
    <div className="flex flex-col gap-5">
      <div className="p-6 rounded-[20px]" style={{ background: 'rgba(31,162,255,0.05)', border: '1px solid rgba(31,162,255,0.2)' }}>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[12px] font-bold uppercase tracking-widest text-[#1FA2FF] mb-2">Current Plan</div>
            <div className="font-grotesk font-black text-[36px] text-white">$299 <span className="text-[14px] font-normal text-[rgba(244,246,251,0.45)]">/month per employee</span></div>
          </div>
          <span className="px-3 py-1.5 rounded-full text-[12px] font-bold" style={{ background: 'rgba(53,214,160,0.12)', color: '#35D6A0', border: '1px solid rgba(53,214,160,0.3)' }}>Active</span>
        </div>
        <p className="text-[13.5px] text-[rgba(244,246,251,0.5)] mt-3">Billed monthly. Cancel or pause anytime with 30 days notice.</p>
      </div>
      <div className="p-6 rounded-[20px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <h4 className="font-grotesk font-bold text-[15px] text-white mb-4">Manage Subscription</h4>
        <div className="flex flex-col gap-3">
          {['Update payment method', 'Change billing cycle to annual (-20%)', 'Pause subscription', 'Cancel subscription'].map((action, i) => (
            <button key={action} className="w-full py-3 px-4 rounded-[12px] text-left font-grotesk font-semibold text-[14px] transition-all hover:opacity-80 cursor-pointer" style={{ background: i === 3 ? 'rgba(255,46,60,0.06)' : 'rgba(255,255,255,0.04)', color: i === 3 ? '#FF2E3C' : 'rgba(244,246,251,0.7)', border: `1px solid ${i === 3 ? 'rgba(255,46,60,0.2)' : 'rgba(255,255,255,0.07)'}` }}>
              {action} →
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 rounded-[14px] text-center text-[12px] text-[rgba(244,246,251,0.35)]" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
        [PLACEHOLDER — Subscription management requires Stripe Customer Portal]
      </div>
    </div>
  )
}

function Upgrade() {
  const plans = [
    { name: 'Base', price: '$299', features: ['1 AI Employee', '3 channels', 'Email support', 'Standard SLA'], current: true, color: '#1FA2FF' },
    { name: 'Growth', price: '$699', features: ['3 AI Employees', 'All channels', 'Priority support', '4h SLA', 'Custom integrations'], current: false, color: '#35D6A0' },
    { name: 'Enterprise', price: 'Custom', features: ['Unlimited employees', 'Dedicated account manager', '1h SLA', 'White-label option', 'Custom training'], current: false, color: '#FFC83C' },
  ]
  return (
    <div>
      <h3 className="font-grotesk font-bold text-[16px] text-white mb-6">Choose a Plan</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        {plans.map((p) => (
          <div key={p.name} className="p-6 rounded-[20px] flex flex-col" style={{ background: p.current ? `${p.color}08` : 'rgba(255,255,255,0.03)', border: `1px solid ${p.current ? `${p.color}40` : 'rgba(255,255,255,0.07)'}` }}>
            {p.current && <div className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full self-start mb-3" style={{ background: `${p.color}20`, color: p.color, border: `1px solid ${p.color}30` }}>Current</div>}
            <div className="font-grotesk font-bold text-[13px] mb-1" style={{ color: p.color }}>{p.name}</div>
            <div className="font-grotesk font-black text-[32px] text-white mb-4">{p.price}<span className="text-[14px] font-normal text-[rgba(244,246,251,0.4)]">{p.price !== 'Custom' ? '/mo' : ''}</span></div>
            <ul className="space-y-2 flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[12.5px] text-[rgba(244,246,251,0.55)]">
                  <span style={{ color: p.color }} className="flex-shrink-0">✓</span> {f}
                </li>
              ))}
            </ul>
            <button className="mt-5 py-2.5 rounded-[12px] font-grotesk font-bold text-[13px] transition-all hover:opacity-90 cursor-pointer" style={{ background: p.current ? 'rgba(255,255,255,0.05)' : p.color, color: p.current ? 'rgba(244,246,251,0.4)' : '#070B16', cursor: p.current ? 'default' : 'pointer' }} disabled={p.current}>
              {p.current ? 'Current Plan' : p.price === 'Custom' ? 'Contact Sales' : 'Upgrade →'}
            </button>
          </div>
        ))}
      </div>
      <div className="p-4 rounded-[14px] text-center text-[12px] text-[rgba(244,246,251,0.35)]" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
        [PLACEHOLDER — Plan upgrades require Stripe Subscription update API]
      </div>
    </div>
  )
}

function InvoicesTab() {
  return (
    <div>
      <h3 className="font-grotesk font-bold text-[16px] text-white mb-5">Invoices</h3>
      <div className="rounded-[18px] overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              {['Invoice', 'Date', 'Description', 'Amount', 'Status', ''].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[rgba(244,246,251,0.4)]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockInvoices.map((inv, i) => (
              <tr key={inv.id} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td className="px-4 py-3 font-grotesk font-semibold text-[13px] text-white">{inv.id}</td>
                <td className="px-4 py-3 text-[13px] text-[rgba(244,246,251,0.5)]">{inv.date}</td>
                <td className="px-4 py-3 text-[13px] text-[rgba(244,246,251,0.55)]">{inv.desc}</td>
                <td className="px-4 py-3 font-grotesk font-bold text-[13px] text-white">{inv.amount}</td>
                <td className="px-4 py-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ color: statusColor(inv.status), background: `${statusColor(inv.status)}15`, border: `1px solid ${statusColor(inv.status)}30` }}>{inv.status}</span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-[12px] text-[rgba(31,162,255,0.7)] hover:text-[#1FA2FF] transition-colors cursor-pointer">PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 p-4 rounded-[14px] text-center text-[12px] text-[rgba(244,246,251,0.35)]" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
        [PLACEHOLDER — Invoice data and PDF generation require Stripe + backend]
      </div>
    </div>
  )
}

function AddEmployee() {
  return (
    <div className="flex flex-col gap-5">
      <div className="p-6 rounded-[20px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <h3 className="font-grotesk font-bold text-[16px] text-white mb-2">Add Another AI Employee</h3>
        <p className="text-[14px] text-[rgba(244,246,251,0.55)] mb-5">Each additional AI employee adds $1,500 setup + $299/month (or your current plan rate).</p>
        <div className="p-5 rounded-[16px] mb-5" style={{ background: 'rgba(31,162,255,0.06)', border: '1px solid rgba(31,162,255,0.2)' }}>
          <div className="flex items-baseline gap-3">
            <span className="font-grotesk font-black text-[28px] text-white">$1,500</span>
            <span className="text-[rgba(244,246,251,0.45)] text-[14px]">setup + $299/mo per employee</span>
          </div>
        </div>
        <button className="w-full py-3.5 rounded-[14px] font-grotesk font-bold text-[15px] text-white cursor-pointer transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #1FA2FF, #1C7FD6)', boxShadow: '0 4px 20px rgba(31,162,255,0.25)' }}>
          Configure New Employee →
        </button>
      </div>
      <div className="p-4 rounded-[14px] text-center text-[12px] text-[rgba(244,246,251,0.35)]" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
        [PLACEHOLDER — Clicking navigates to BuildEmployeePage]
      </div>
    </div>
  )
}

function BillingHistory() {
  const events = [
    { date: 'Jun 1, 2024', event: 'Payment processed', amount: '$299.00', icon: '✅' },
    { date: 'May 1, 2024', event: 'Payment processed', amount: '$299.00', icon: '✅' },
    { date: 'Apr 15, 2024', event: 'Setup fee charged', amount: '$1,500.00', icon: '🚀' },
    { date: 'Apr 10, 2024', event: 'Employee Sophia deployed', amount: '—', icon: '🤖' },
    { date: 'Apr 8, 2024', event: 'Account created', amount: '—', icon: '🎉' },
  ]
  return (
    <div>
      <h3 className="font-grotesk font-bold text-[16px] text-white mb-5">Billing History</h3>
      <div className="flex flex-col gap-2">
        {events.map((e, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-[14px]" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span className="text-xl flex-shrink-0">{e.icon}</span>
            <div className="flex-1">
              <div className="text-[13.5px] text-white font-semibold">{e.event}</div>
              <div className="text-[11.5px] text-[rgba(244,246,251,0.4)]">{e.date}</div>
            </div>
            <div className="font-grotesk font-bold text-[13px] text-[rgba(244,246,251,0.6)]">{e.amount}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-4 rounded-[14px] text-center text-[12px] text-[rgba(244,246,251,0.35)]" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
        [PLACEHOLDER — Billing history requires Stripe Events API]
      </div>
    </div>
  )
}

const tabContent: Record<TabId, JSX.Element> = {
  overview: <Overview />,
  setup: <SetupFee />,
  subscription: <Subscription />,
  upgrade: <Upgrade />,
  'add-employee': <AddEmployee />,
  invoices: <InvoicesTab />,
  billing: <BillingHistory />,
}

export default function PaymentCenterPage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview')

  return (
    <PageWrapper>
      <Navbar />
      <main className="section-padding max-content pt-32">
        {/* Header */}
        <div className="mb-10">
          <div className="text-[12px] font-bold uppercase tracking-widest text-[rgba(244,246,251,0.4)] mb-2">Payment Center</div>
          <h1 className="font-grotesk font-black text-[clamp(28px,4vw,48px)] text-white">Billing & Payments</h1>
        </div>

        <div className="flex gap-6 flex-col lg:flex-row">
          {/* Sidebar */}
          <aside className="lg:w-56 flex-shrink-0">
            <nav className="flex flex-col gap-1 lg:sticky lg:top-28">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="flex items-center gap-3 px-4 py-3 rounded-[12px] text-left transition-all duration-200 cursor-pointer"
                  style={{
                    background: activeTab === item.id ? 'rgba(31,162,255,0.1)' : 'transparent',
                    color: activeTab === item.id ? '#1FA2FF' : 'rgba(244,246,251,0.55)',
                    border: activeTab === item.id ? '1px solid rgba(31,162,255,0.3)' : '1px solid transparent',
                  }}
                >
                  <span>{item.icon}</span>
                  <span className="font-grotesk font-semibold text-[13.5px]">{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {tabContent[activeTab]}
          </div>
        </div>
      </main>
    </PageWrapper>
  )
}

import { Routes, Route, Link } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const EmployeesHubPage = lazy(() => import('./pages/employees/EmployeesHubPage'))
const SophiaPage = lazy(() => import('./pages/employees/SophiaPage'))
const AtlasPage = lazy(() => import('./pages/employees/AtlasPage'))
const NovaPage = lazy(() => import('./pages/employees/NovaPage'))
const TitanPage = lazy(() => import('./pages/employees/TitanPage'))
const OrionPage = lazy(() => import('./pages/employees/OrionPage'))
const EchoPage = lazy(() => import('./pages/employees/EchoPage'))
const IronPrimePage = lazy(() => import('./pages/employees/IronPrimePage'))
const AITeamPage = lazy(() => import('./pages/AITeamPage'))
const AppDivisionPage = lazy(() => import('./pages/AppDivisionPage'))
const LightOfLifePage = lazy(() => import('./pages/LightOfLifePage'))
const BuildEmployeePage = lazy(() => import('./pages/BuildEmployeePage'))
const BuildAppPage = lazy(() => import('./pages/BuildAppPage'))
const PaymentCenterPage = lazy(() => import('./pages/PaymentCenterPage'))
const ClientPortalPage = lazy(() => import('./pages/ClientPortalPage'))

function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#070B16' }}>
      <div className="w-8 h-8 rounded-full border-2 border-[#1FA2FF] border-t-transparent animate-spin" />
    </div>
  )
}

function DevIndex() {
  const routes = [
    { path: '/employees', label: 'AI Employees Hub' },
    { path: '/employees/sophia', label: 'Sophia — Customer Success' },
    { path: '/employees/atlas', label: 'Atlas — Sales Intelligence' },
    { path: '/employees/nova', label: 'Nova — Marketing Genius' },
    { path: '/employees/titan', label: 'Titan — Operations Director' },
    { path: '/employees/orion', label: 'Orion — Financial Advisor' },
    { path: '/employees/echo', label: 'Echo — Brand Voice' },
    { path: '/employees/iron-prime', label: 'Iron Prime — Command' },
    { path: '/team', label: 'AI Team Network' },
    { path: '/app-division', label: 'App Development Division' },
    { path: '/case-study/light-of-life', label: 'Light of Life Case Study' },
    { path: '/build/employee', label: 'Build Your AI Employee' },
    { path: '/build/app', label: 'Build Your App' },
    { path: '/payment', label: 'Payment Center' },
    { path: '/portal', label: 'Client Portal' },
  ]
  return (
    <div className="min-h-screen" style={{ background: '#070B16', padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,56px)' }}>
      <div className="max-w-[860px] mx-auto">
        <div className="mb-10">
          <div className="text-[11px] font-bold uppercase tracking-widest text-[rgba(244,246,251,0.35)] mb-2">CODEX MISSION #002</div>
          <h1 className="font-grotesk font-black text-[clamp(28px,4vw,48px)] text-white mb-2">Component Library</h1>
          <p className="text-[15px] text-[rgba(244,246,251,0.5)]">Carriersfy AI Website — All {routes.length} routes</p>
        </div>
        <div className="flex flex-col gap-2">
          {routes.map((r) => (
            <Link
              key={r.path}
              to={r.path}
              className="flex items-center justify-between px-5 py-4 rounded-[14px] transition-all duration-200 hover:-translate-x-1"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <span className="font-grotesk font-semibold text-[14.5px] text-white">{r.label}</span>
              <span className="text-[12px] text-[rgba(244,246,251,0.35)] font-mono">{r.path}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<DevIndex />} />
        <Route path="/employees" element={<EmployeesHubPage />} />
        <Route path="/employees/sophia" element={<SophiaPage />} />
        <Route path="/employees/atlas" element={<AtlasPage />} />
        <Route path="/employees/nova" element={<NovaPage />} />
        <Route path="/employees/titan" element={<TitanPage />} />
        <Route path="/employees/orion" element={<OrionPage />} />
        <Route path="/employees/echo" element={<EchoPage />} />
        <Route path="/employees/iron-prime" element={<IronPrimePage />} />
        <Route path="/team" element={<AITeamPage />} />
        <Route path="/app-division" element={<AppDivisionPage />} />
        <Route path="/case-study/light-of-life" element={<LightOfLifePage />} />
        <Route path="/build/employee" element={<BuildEmployeePage />} />
        <Route path="/build/app" element={<BuildAppPage />} />
        <Route path="/payment" element={<PaymentCenterPage />} />
        <Route path="/portal" element={<ClientPortalPage />} />
      </Routes>
    </Suspense>
  )
}

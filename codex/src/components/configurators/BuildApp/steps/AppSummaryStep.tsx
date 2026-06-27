import { useState } from 'react'
import type { AppConfig } from '../BuildAppConfigurator'

interface AppSummaryStepProps {
  config: AppConfig
}

const businessLabels: Record<string, string> = {
  saas: 'SaaS Platform', marketplace: 'Marketplace', ecommerce: 'E-Commerce', 'mobile-app': 'Mobile App',
  'internal-tool': 'Internal Tool', 'ai-product': 'AI Product', agency: 'Agency / Service', other: 'Other',
}

const phaseData = [
  { phase: 'Phase 1', label: 'Discovery & Architecture', weeks: 2, color: '#1FA2FF' },
  { phase: 'Phase 2', label: 'Core Development', weeks: 6, color: '#35D6A0' },
  { phase: 'Phase 3', label: 'Features & Integrations', weeks: 4, color: '#FFC83C' },
  { phase: 'Phase 4', label: 'QA, Launch & Handoff', weeks: 2, color: '#FF2E3C' },
]
const totalWeeks = phaseData.reduce((s, p) => s + p.weeks, 0)

export function AppSummaryStep({ config }: AppSummaryStepProps) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1800))
    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(53,214,160,0.12)', border: '2px solid rgba(53,214,160,0.4)' }}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M6 18l8 8L30 10" stroke="#35D6A0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-grotesk font-black text-[28px] text-white mb-3">App Request Submitted</h3>
        <p className="text-[15px] text-[rgba(244,246,251,0.6)] max-w-[420px]">
          We've received your project brief. Our engineering team will review it and reach out within 24 hours.
        </p>
        <div className="mt-8 px-6 py-3 rounded-[14px] text-[13px] text-[rgba(244,246,251,0.4)]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          [PLACEHOLDER — Submission requires backend integration]
        </div>
      </div>
    )
  }

  let cumulativeWeeks = 0

  return (
    <div>
      <h3 className="font-grotesk font-bold text-[22px] text-white mb-2">Your project brief</h3>
      <p className="text-[14.5px] text-[rgba(244,246,251,0.55)] mb-8">Review your requirements and submit to get your custom proposal.</p>

      {/* Summary grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-5 rounded-[18px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="text-[11px] font-bold uppercase tracking-widest text-[rgba(244,246,251,0.35)] mb-3">Project</div>
          <div className="font-grotesk font-bold text-[16px] text-white">{businessLabels[config.businessType] || '—'}</div>
          <div className="text-[12.5px] text-[rgba(244,246,251,0.45)] mt-1">
            {config.platforms.length > 0 ? config.platforms.join(', ').toUpperCase() : 'No platforms'}
          </div>
        </div>
        <div className="p-5 rounded-[18px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="text-[11px] font-bold uppercase tracking-widest text-[rgba(244,246,251,0.35)] mb-3">Features</div>
          <div className="font-grotesk font-black text-[32px] text-white">{config.features.length}</div>
          <div className="text-[12.5px] text-[rgba(244,246,251,0.45)]">features selected</div>
        </div>
        <div className="p-5 rounded-[18px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="text-[11px] font-bold uppercase tracking-widest text-[rgba(244,246,251,0.35)] mb-3">Est. Timeline</div>
          <div className="font-grotesk font-black text-[32px] text-white">{totalWeeks}</div>
          <div className="text-[12.5px] text-[rgba(244,246,251,0.45)]">weeks to launch</div>
        </div>
      </div>

      {/* Gantt-style timeline */}
      <div className="p-6 rounded-[20px] mb-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="text-[12px] font-bold uppercase tracking-widest text-[rgba(244,246,251,0.4)] mb-5">Estimated Timeline [PLACEHOLDER]</div>
        <div className="flex flex-col gap-3">
          {phaseData.map((p) => {
            const startPct = (cumulativeWeeks / totalWeeks) * 100
            const widthPct = (p.weeks / totalWeeks) * 100
            cumulativeWeeks += p.weeks
            return (
              <div key={p.phase} className="flex items-center gap-4">
                <div className="w-[90px] flex-shrink-0">
                  <div className="text-[11px] font-bold" style={{ color: p.color }}>{p.phase}</div>
                  <div className="text-[10px] text-[rgba(244,246,251,0.35)] truncate">{p.label}</div>
                </div>
                <div className="flex-1 relative h-6 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <div
                    className="absolute top-0 h-full rounded-full flex items-center"
                    style={{ left: `${startPct}%`, width: `${widthPct}%`, background: `${p.color}30`, border: `1px solid ${p.color}50` }}
                  >
                    <span className="text-[10px] font-bold px-2 truncate" style={{ color: p.color }}>{p.weeks}w</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <p className="mt-4 text-[11px] text-[rgba(244,246,251,0.3)]">Timeline is an estimate and varies based on final scope. Confirmed during discovery call.</p>
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full py-4 rounded-[16px] font-grotesk font-black text-[17px] text-white transition-all duration-200 cursor-pointer"
        style={{
          background: submitting ? 'rgba(255,255,255,0.06)' : 'linear-gradient(135deg, #1FA2FF, #FF2E3C)',
          boxShadow: submitting ? 'none' : '0 8px 32px rgba(31,162,255,0.3)',
          opacity: submitting ? 0.7 : 1,
        }}
      >
        {submitting ? 'Submitting...' : 'Get My Custom Proposal →'}
      </button>
      <p className="text-center text-[12px] text-[rgba(244,246,251,0.3)] mt-4">No payment required. We'll contact you within 24 hours.</p>
    </div>
  )
}

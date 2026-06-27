import { useState } from 'react'
import type { EmployeeConfig } from '../BuildEmployeeConfigurator'

interface SummaryStepProps {
  config: EmployeeConfig
}

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start justify-between gap-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
    <span className="text-[13px] text-[rgba(244,246,251,0.45)] flex-shrink-0">{label}</span>
    <span className="text-[13px] text-white font-semibold text-right">{value || '—'}</span>
  </div>
)

export function SummaryStep({ config }: SummaryStepProps) {
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
        <h3 className="font-grotesk font-black text-[28px] text-white mb-3">Request Received</h3>
        <p className="text-[15px] text-[rgba(244,246,251,0.6)] max-w-[400px] mb-2">
          We've received your AI employee configuration for <span className="text-white font-semibold">{config.name || 'your employee'}</span>.
        </p>
        <p className="text-[14px] text-[rgba(244,246,251,0.45)] max-w-[380px]">
          Our team will review your requirements and reach out within 24 hours to schedule your onboarding call.
        </p>
        <div className="mt-8 px-6 py-3 rounded-[14px] text-[13px] text-[rgba(244,246,251,0.5)]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          [PLACEHOLDER — Form submission requires backend integration]
        </div>
      </div>
    )
  }

  return (
    <div>
      <h3 className="font-grotesk font-bold text-[22px] text-white mb-2">Review your configuration</h3>
      <p className="text-[14.5px] text-[rgba(244,246,251,0.55)] mb-8">Everything looks good? Submit to get started.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {/* Identity */}
        <div className="p-5 rounded-[18px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="text-[11px] font-bold uppercase tracking-widest text-[rgba(244,246,251,0.35)] mb-2">Identity</div>
          <SummaryRow label="Industry" value={config.industry} />
          <SummaryRow label="Name" value={config.name} />
          <SummaryRow label="Gender" value={config.gender} />
          <SummaryRow label="Voice" value={config.voice} />
          <SummaryRow label="Languages" value={config.languages.join(', ')} />
        </div>

        {/* Capabilities */}
        <div className="p-5 rounded-[18px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="text-[11px] font-bold uppercase tracking-widest text-[rgba(244,246,251,0.35)] mb-2">Capabilities</div>
          <SummaryRow label="Channels" value={config.channels.length ? `${config.channels.length} selected` : 'None'} />
          <SummaryRow label="Functions" value={config.functions.length ? `${config.functions.length} selected` : 'None'} />
          <SummaryRow label="Integrations" value={config.integrations.length ? `${config.integrations.length} selected` : 'None'} />
          <SummaryRow label="Schedule" value={config.hours.alwaysOn ? '24/7 Always On' : 'Custom Hours'} />
        </div>
      </div>

      {/* Employee Preview Card */}
      <div className="p-6 rounded-[20px] mb-8 flex items-center gap-5" style={{ background: 'linear-gradient(135deg, rgba(31,162,255,0.08), rgba(28,127,214,0.04))', border: '1px solid rgba(31,162,255,0.2)' }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center font-grotesk font-black text-[26px] text-[#070B16] flex-shrink-0" style={{ background: 'linear-gradient(135deg, #1FA2FF, #FF2E3C)' }}>
          {config.name ? config.name[0].toUpperCase() : '?'}
        </div>
        <div>
          <div className="font-grotesk font-black text-[22px] text-white">{config.name || 'Unnamed Employee'}</div>
          <div className="text-[14px] text-[rgba(244,246,251,0.5)] mt-0.5">
            {config.industry || 'No industry'} · {config.gender || 'No gender'} · {config.voice ? `${config.voice} voice` : 'No voice'}
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-2 h-2 rounded-full bg-[#35D6A0]" style={{ boxShadow: '0 0 6px #35D6A0' }} />
            <span className="text-[12px] text-[#35D6A0] font-semibold">Ready to Deploy</span>
          </div>
        </div>
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
        {submitting ? 'Submitting...' : 'Submit Configuration →'}
      </button>

      <p className="text-center text-[12px] text-[rgba(244,246,251,0.3)] mt-4">
        No payment required. We'll contact you within 24 hours.
      </p>
    </div>
  )
}

interface BusinessTypeStepProps {
  value: string
  onChange: (v: string) => void
}

const types = [
  { id: 'saas', icon: '☁️', label: 'SaaS Platform', desc: 'Subscription software for teams or consumers' },
  { id: 'marketplace', icon: '🏪', label: 'Marketplace', desc: 'Connect buyers and sellers on one platform' },
  { id: 'ecommerce', icon: '🛒', label: 'E-Commerce', desc: 'Sell products online with checkout & inventory' },
  { id: 'mobile-app', icon: '📱', label: 'Mobile App', desc: 'iOS and/or Android consumer or B2B app' },
  { id: 'internal-tool', icon: '🔧', label: 'Internal Tool', desc: 'Custom dashboard or workflow for your team' },
  { id: 'ai-product', icon: '🤖', label: 'AI Product', desc: 'AI-powered user-facing product or API' },
  { id: 'agency', icon: '🎨', label: 'Agency / Service', desc: 'Client-facing CRM, portal, or project tracker' },
  { id: 'other', icon: '✨', label: 'Something Else', desc: 'Tell us more — we build it all' },
]

export function BusinessTypeStep({ value, onChange }: BusinessTypeStepProps) {
  return (
    <div>
      <h3 className="font-grotesk font-bold text-[22px] text-white mb-2">What are we building?</h3>
      <p className="text-[14.5px] text-[rgba(244,246,251,0.55)] mb-8">Choose the type of application that best describes your idea.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {types.map((t) => {
          const selected = value === t.id
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className="flex items-center gap-4 p-5 rounded-[18px] text-left transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
              style={{
                background: selected ? 'rgba(31,162,255,0.09)' : 'rgba(255,255,255,0.03)',
                border: selected ? '1px solid rgba(31,162,255,0.45)' : '1px solid rgba(255,255,255,0.07)',
                boxShadow: selected ? '0 0 24px rgba(31,162,255,0.15)' : 'none',
              }}
            >
              <span className="text-3xl flex-shrink-0">{t.icon}</span>
              <div className="flex-1">
                <div className="font-grotesk font-bold text-[15px] text-white">{t.label}</div>
                <div className="text-[12.5px] text-[rgba(244,246,251,0.48)] mt-0.5">{t.desc}</div>
              </div>
              {selected && (
                <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#1FA2FF' }}>
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#070B16" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

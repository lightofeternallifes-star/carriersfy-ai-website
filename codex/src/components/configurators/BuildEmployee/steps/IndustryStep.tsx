interface IndustryStepProps {
  value: string
  onChange: (v: string) => void
}

const industries = [
  { icon: '🚤', label: 'Marine & Boating' },
  { icon: '🪧', label: 'Signs & Print' },
  { icon: '🏗️', label: 'Home Services' },
  { icon: '🏥', label: 'Healthcare' },
  { icon: '🏠', label: 'Real Estate' },
  { icon: '🚗', label: 'Automotive' },
  { icon: '💼', label: 'Professional Services' },
  { icon: '🛒', label: 'Retail' },
  { icon: '🍽️', label: 'Restaurant' },
  { icon: '✦', label: 'Other' },
]

export function IndustryStep({ value, onChange }: IndustryStepProps) {
  return (
    <div>
      <h3 className="font-grotesk font-bold text-[22px] text-white mb-2">What industry are you in?</h3>
      <p className="text-[14.5px] text-[rgba(244,246,251,0.55)] mb-8">Your AI employee will be trained specifically for your industry's workflows and terminology.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {industries.map((ind) => {
          const selected = value === ind.label
          return (
            <button
              key={ind.label}
              onClick={() => onChange(ind.label)}
              className="p-5 rounded-[18px] flex flex-col items-center gap-3 text-center transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
              style={{
                background: selected ? 'rgba(31,162,255,0.12)' : 'rgba(255,255,255,0.03)',
                border: selected ? '1px solid rgba(31,162,255,0.5)' : '1px solid rgba(255,255,255,0.07)',
                boxShadow: selected ? '0 0 20px rgba(31,162,255,0.2)' : 'none',
              }}
            >
              <span className="text-3xl">{ind.icon}</span>
              <span className="font-semibold text-[13px] text-[rgba(244,246,251,0.85)] leading-tight">{ind.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

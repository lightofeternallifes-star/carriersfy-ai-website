interface GenderStepProps {
  value: string
  onChange: (v: string) => void
}

const options = [
  { value: 'Female', label: 'Female', emoji: '👩', gradient: 'linear-gradient(135deg, #1FA2FF, #1C7FD6)', glow: 'rgba(31,162,255,0.3)' },
  { value: 'Male', label: 'Male', emoji: '👨', gradient: 'linear-gradient(135deg, #FF2E3C, #1C7FD6)', glow: 'rgba(255,46,60,0.3)' },
]

export function GenderStep({ value, onChange }: GenderStepProps) {
  return (
    <div>
      <h3 className="font-grotesk font-bold text-[22px] text-white mb-2">Choose voice gender</h3>
      <p className="text-[14.5px] text-[rgba(244,246,251,0.55)] mb-8">This determines the voice profile and avatar for your AI employee.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[480px]">
        {options.map((opt) => {
          const selected = value === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className="p-8 rounded-[22px] flex flex-col items-center gap-5 transition-all duration-300 cursor-pointer hover:-translate-y-1"
              style={{
                background: selected ? `${opt.glow.replace('0.3', '0.1')}` : 'rgba(255,255,255,0.03)',
                border: selected ? `1px solid ${opt.glow.replace('0.3', '0.45')}` : '1px solid rgba(255,255,255,0.08)',
                boxShadow: selected ? `0 0 28px ${opt.glow}` : 'none',
              }}
            >
              {/* Animated avatar silhouette */}
              <div className="relative">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                  style={{
                    background: selected ? opt.gradient : 'rgba(255,255,255,0.06)',
                    boxShadow: selected ? `0 0 24px ${opt.glow}` : 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {opt.emoji}
                </div>
                {selected && (
                  <div
                    className="absolute inset-[-8px] rounded-full border-2 animate-pulse-glow"
                    style={{ borderColor: opt.glow.replace('0.3', '0.4') }}
                  />
                )}
              </div>
              <div>
                <div className="font-grotesk font-bold text-[20px] text-white text-center">{opt.label}</div>
                <div className="text-[12px] text-[rgba(244,246,251,0.45)] text-center mt-1">
                  {opt.value === 'Female' ? 'Natural, warm voice' : 'Clear, confident voice'}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

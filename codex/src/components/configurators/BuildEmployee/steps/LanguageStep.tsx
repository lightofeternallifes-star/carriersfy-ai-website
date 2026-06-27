interface LanguageStepProps {
  value: string[]
  onChange: (v: string[]) => void
}

const languages = [
  { flag: '🇺🇸', code: 'EN', label: 'English' },
  { flag: '🇪🇸', code: 'ES', label: 'Español' },
  { flag: '🇧🇷', code: 'PT', label: 'Português' },
  { flag: '🇫🇷', code: 'FR', label: 'Français' },
  { flag: '🇩🇪', code: 'DE', label: 'Deutsch' },
  { flag: '🇮🇹', code: 'IT', label: 'Italiano' },
]

export function LanguageStep({ value, onChange }: LanguageStepProps) {
  const toggle = (code: string) => {
    onChange(value.includes(code) ? value.filter((c) => c !== code) : [...value, code])
  }

  return (
    <div>
      <h3 className="font-grotesk font-bold text-[22px] text-white mb-2">What languages should they speak?</h3>
      <p className="text-[14.5px] text-[rgba(244,246,251,0.55)] mb-8">Select all languages your customers use. You can choose multiple.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {languages.map((lang) => {
          const selected = value.includes(lang.code)
          return (
            <button
              key={lang.code}
              onClick={() => toggle(lang.code)}
              className="p-5 rounded-[18px] flex items-center gap-4 transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
              style={{
                background: selected ? 'rgba(31,162,255,0.1)' : 'rgba(255,255,255,0.03)',
                border: selected ? '1px solid rgba(31,162,255,0.45)' : '1px solid rgba(255,255,255,0.07)',
                boxShadow: selected ? '0 0 20px rgba(31,162,255,0.15)' : 'none',
              }}
            >
              <span className="text-3xl">{lang.flag}</span>
              <div className="text-left">
                <div className="font-grotesk font-bold text-[15px] text-white">{lang.code}</div>
                <div className="text-[12px] text-[rgba(244,246,251,0.5)]">{lang.label}</div>
              </div>
              {selected && (
                <span className="ml-auto w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#1FA2FF' }}>
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#070B16" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              )}
            </button>
          )
        })}
      </div>
      {value.length > 0 && (
        <p className="mt-5 text-[13px] text-[#35D6A0] font-semibold">
          ✓ {value.length} language{value.length > 1 ? 's' : ''} selected: {value.join(', ')}
        </p>
      )}
    </div>
  )
}

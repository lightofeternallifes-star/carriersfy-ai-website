interface NameStepProps {
  value: string
  onChange: (v: string) => void
}

const suggested = ['Sophia', 'Atlas', 'Nova', 'Titan', 'Orion', 'Echo', 'Aria', 'Zara', 'Max', 'Rex']

export function NameStep({ value, onChange }: NameStepProps) {
  return (
    <div>
      <h3 className="font-grotesk font-bold text-[22px] text-white mb-2">Give your AI employee a name</h3>
      <p className="text-[14.5px] text-[rgba(244,246,251,0.55)] mb-8">This is how your customers will know them. Choose something that fits your brand.</p>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter a name…"
        className="w-full max-w-[480px] px-6 py-4 rounded-[14px] text-[18px] font-semibold text-white placeholder-white/25 outline-none transition-all duration-200 focus:border-[#1FA2FF] focus:shadow-[0_0_0_3px_rgba(31,162,255,0.18)]"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.12)',
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      />

      <div className="mt-8">
        <p className="text-[12px] font-bold uppercase tracking-widest text-[rgba(244,246,251,0.4)] mb-4">Suggested names</p>
        <div className="flex flex-wrap gap-2">
          {suggested.map((n) => (
            <button
              key={n}
              onClick={() => onChange(n)}
              className="px-4 py-2 rounded-full text-[13.5px] font-semibold transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
              style={{
                background: value === n ? 'linear-gradient(135deg, #1FA2FF, #FF2E3C)' : 'rgba(255,255,255,0.05)',
                border: value === n ? '1px solid transparent' : '1px solid rgba(255,255,255,0.10)',
                color: value === n ? '#070B16' : 'rgba(244,246,251,0.75)',
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

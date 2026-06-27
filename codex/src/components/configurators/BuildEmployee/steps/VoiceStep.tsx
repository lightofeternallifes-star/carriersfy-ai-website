interface VoiceStepProps {
  value: string
  onChange: (v: string) => void
}

const voices = [
  { id: 'alex', name: 'Alex', desc: 'Deep & Professional', traits: ['Calm', 'Clear', 'Confident'] },
  { id: 'maya', name: 'Maya', desc: 'Warm & Friendly', traits: ['Natural', 'Inviting', 'Clear'] },
  { id: 'orion', name: 'Orion', desc: 'Energetic & Crisp', traits: ['Energetic', 'Bright', 'Precise'] },
  { id: 'luna', name: 'Luna', desc: 'Soft & Professional', traits: ['Soft', 'Elegant', 'Clear'] },
  { id: 'marcus', name: 'Marcus', desc: 'Authoritative & Clear', traits: ['Strong', 'Clear', 'Assured'] },
  { id: 'aria', name: 'Aria', desc: 'Bright & Conversational', traits: ['Bright', 'Friendly', 'Natural'] },
]

export function VoiceStep({ value, onChange }: VoiceStepProps) {
  return (
    <div>
      <h3 className="font-grotesk font-bold text-[22px] text-white mb-2">Select a voice</h3>
      <p className="text-[14.5px] text-[rgba(244,246,251,0.55)] mb-8">Choose the voice personality that best represents your brand.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {voices.map((v) => {
          const selected = value === v.id
          return (
            <div
              key={v.id}
              onClick={() => onChange(v.id)}
              className="p-5 rounded-[18px] cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: selected ? 'rgba(31,162,255,0.1)' : 'rgba(255,255,255,0.03)',
                border: selected ? '1px solid rgba(31,162,255,0.45)' : '1px solid rgba(255,255,255,0.07)',
                boxShadow: selected ? '0 0 20px rgba(31,162,255,0.2)' : 'none',
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-grotesk font-bold text-[16px] text-white">{v.name}</div>
                  <div className="text-[12px] text-[rgba(244,246,251,0.5)] mt-0.5">{v.desc}</div>
                </div>
                {/* Play button */}
                <button
                  onClick={(e) => { e.stopPropagation(); /* PLACEHOLDER — audio playback requires backend */ }}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                  style={{ background: selected ? '#1FA2FF' : 'rgba(255,255,255,0.08)' }}
                >
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                    <path d="M1 1l10 6-10 6V1z" fill={selected ? '#070B16' : 'rgba(244,246,251,0.7)'} />
                  </svg>
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {v.traits.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(244,246,251,0.6)' }}>{t}</span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Live Voice Preview — PLACEHOLDER */}
      <div className="p-6 rounded-[18px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-grotesk font-semibold text-[15px] text-white">Live Voice Preview</div>
            <div className="text-[12px] text-[rgba(244,246,251,0.4)] mt-0.5">
              [PLACEHOLDER — Voice preview requires backend integration]
            </div>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full" style={{ background: 'rgba(255,200,60,0.12)', color: '#FFC83C', border: '1px solid rgba(255,200,60,0.25)' }}>
            Coming Soon
          </span>
        </div>
        {/* Waveform placeholder */}
        <div className="flex items-end gap-1 h-10">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 rounded-full"
              style={{
                background: 'rgba(31,162,255,0.3)',
                height: `${20 + Math.sin(i * 0.7) * 15 + Math.random() * 10}%`,
                animation: `cfblink ${1 + (i % 3) * 0.4}s infinite`,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

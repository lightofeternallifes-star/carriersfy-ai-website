interface PlatformsStepProps {
  value: string[]
  onChange: (v: string[]) => void
}

const platforms = [
  {
    id: 'web',
    label: 'Web App',
    icon: '🌐',
    desc: 'Browser-based application — accessible everywhere',
    mockup: (selected: boolean) => (
      <div className="w-full h-[90px] rounded-[8px] overflow-hidden relative" style={{ background: '#0A0F1E', border: `1px solid ${selected ? 'rgba(31,162,255,0.3)' : 'rgba(255,255,255,0.08)'}` }}>
        <div className="h-5 flex items-center gap-1.5 px-2" style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,46,60,0.6)' }} />
          <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,200,60,0.6)' }} />
          <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(53,214,160,0.6)' }} />
          <div className="flex-1 mx-2 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
        </div>
        <div className="p-2 flex gap-1.5">
          <div className="w-12 rounded" style={{ background: 'rgba(255,255,255,0.05)', height: '60px' }} />
          <div className="flex-1 flex flex-col gap-1">
            <div className="h-2 rounded-full w-3/4" style={{ background: 'rgba(31,162,255,0.2)' }} />
            <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }} />
            <div className="h-1.5 rounded-full w-2/3" style={{ background: 'rgba(255,255,255,0.05)' }} />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'ios',
    label: 'iOS App',
    icon: '🍎',
    desc: 'Native iPhone & iPad experience on the App Store',
    mockup: (selected: boolean) => (
      <div className="mx-auto w-[52px] h-[90px] rounded-[14px] relative overflow-hidden" style={{ background: '#0A0F1E', border: `2px solid ${selected ? 'rgba(31,162,255,0.4)' : 'rgba(255,255,255,0.12)'}` }}>
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
        <div className="absolute inset-x-0 top-6 bottom-4 flex flex-col items-center justify-center gap-1 px-1.5">
          <div className="h-1.5 w-full rounded-full" style={{ background: 'rgba(31,162,255,0.25)' }} />
          <div className="h-1 w-4/5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <div className="h-1 w-3/5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
      </div>
    ),
  },
  {
    id: 'android',
    label: 'Android App',
    icon: '🤖',
    desc: 'Native Android app on the Google Play Store',
    mockup: (selected: boolean) => (
      <div className="mx-auto w-[52px] h-[90px] rounded-[12px] relative overflow-hidden" style={{ background: '#0A0F1E', border: `2px solid ${selected ? 'rgba(31,162,255,0.4)' : 'rgba(255,255,255,0.12)'}` }}>
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }} />
        <div className="absolute inset-x-0 top-7 bottom-5 flex flex-col items-center justify-center gap-1 px-1.5">
          <div className="h-1.5 w-full rounded-full" style={{ background: 'rgba(53,214,160,0.3)' }} />
          <div className="h-1 w-4/5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <div className="h-1 w-3/5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
        </div>
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
        </div>
      </div>
    ),
  },
  {
    id: 'api',
    label: 'API / Backend',
    icon: '⚡',
    desc: 'Headless backend, REST or GraphQL API',
    mockup: (selected: boolean) => (
      <div className="w-full h-[90px] rounded-[8px] overflow-hidden p-3 font-mono" style={{ background: '#050810', border: `1px solid ${selected ? 'rgba(31,162,255,0.3)' : 'rgba(255,255,255,0.07)'}` }}>
        <div className="text-[9px] leading-[1.6]">
          <span style={{ color: '#FFC83C' }}>POST</span> <span style={{ color: 'rgba(244,246,251,0.4)' }}>/api/v1/</span><span style={{ color: '#35D6A0' }}>query</span><br />
          <span style={{ color: 'rgba(244,246,251,0.25)' }}>Authorization:</span> <span style={{ color: '#1FA2FF' }}>Bearer ...</span><br />
          <span style={{ color: 'rgba(244,246,251,0.25)' }}>Content-Type:</span> <span style={{ color: '#1FA2FF' }}>json</span><br />
          <span style={{ color: 'rgba(244,246,251,0.15)' }}>→ 200 OK {"{ data }"}</span>
        </div>
      </div>
    ),
  },
]

export function PlatformsStep({ value, onChange }: PlatformsStepProps) {
  const toggle = (id: string) => {
    onChange(value.includes(id) ? value.filter((c) => c !== id) : [...value, id])
  }

  return (
    <div>
      <h3 className="font-grotesk font-bold text-[22px] text-white mb-2">Which platforms?</h3>
      <p className="text-[14.5px] text-[rgba(244,246,251,0.55)] mb-8">Select all the platforms your app needs to run on.</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {platforms.map((p) => {
          const selected = value.includes(p.id)
          return (
            <button
              key={p.id}
              onClick={() => toggle(p.id)}
              className="flex flex-col gap-3 p-4 rounded-[18px] text-left transition-all duration-200 cursor-pointer hover:-translate-y-1"
              style={{
                background: selected ? 'rgba(31,162,255,0.08)' : 'rgba(255,255,255,0.03)',
                border: selected ? '1px solid rgba(31,162,255,0.45)' : '1px solid rgba(255,255,255,0.07)',
                boxShadow: selected ? '0 0 20px rgba(31,162,255,0.15)' : 'none',
              }}
            >
              {p.mockup(selected)}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base">{p.icon}</span>
                  <span className="font-grotesk font-bold text-[14px] text-white">{p.label}</span>
                  {selected && <span className="ml-auto w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#1FA2FF' }}><svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3l2 2 4-4" stroke="#070B16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>}
                </div>
                <div className="text-[11.5px] text-[rgba(244,246,251,0.4)] leading-[1.4]">{p.desc}</div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

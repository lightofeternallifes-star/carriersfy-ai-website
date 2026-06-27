import { useState } from 'react'

export interface HoursConfig {
  alwaysOn: boolean
  days: Record<string, boolean>
  startTime: string
  endTime: string
}

interface HoursStepProps {
  value: HoursConfig
  onChange: (v: HoursConfig) => void
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const dayFull: Record<string, string> = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday' }

export function HoursStep({ value, onChange }: HoursStepProps) {
  const [hovered, setHovered] = useState<string | null>(null)

  const toggleDay = (d: string) => {
    onChange({ ...value, days: { ...value.days, [d]: !value.days[d] } })
  }

  const activeDays = days.filter((d) => value.days[d])

  return (
    <div>
      <h3 className="font-grotesk font-bold text-[22px] text-white mb-2">When should they be available?</h3>
      <p className="text-[14.5px] text-[rgba(244,246,251,0.55)] mb-8">Configure your AI employee's working hours and schedule.</p>

      {/* 24/7 Toggle */}
      <div
        className="flex items-center justify-between p-5 rounded-[18px] mb-6 cursor-pointer transition-all duration-200"
        onClick={() => onChange({ ...value, alwaysOn: !value.alwaysOn })}
        style={{
          background: value.alwaysOn ? 'rgba(31,162,255,0.08)' : 'rgba(255,255,255,0.03)',
          border: value.alwaysOn ? '1px solid rgba(31,162,255,0.4)' : '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div>
          <div className="font-grotesk font-bold text-[17px] text-white">Always On — 24/7</div>
          <div className="text-[13px] text-[rgba(244,246,251,0.5)] mt-0.5">Your AI employee never sleeps. Responds any hour, any day.</div>
        </div>
        <div className="flex-shrink-0 w-12 h-6 rounded-full transition-all duration-300 relative" style={{ background: value.alwaysOn ? '#1FA2FF' : 'rgba(255,255,255,0.1)' }}>
          <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all duration-300" style={{ left: value.alwaysOn ? '26px' : '2px' }} />
        </div>
      </div>

      {/* Custom schedule — shown when not 24/7 */}
      <div className={`transition-all duration-300 overflow-hidden ${value.alwaysOn ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
        {/* Day picker */}
        <div className="mb-6">
          <div className="text-[12px] font-bold uppercase tracking-widest text-[rgba(244,246,251,0.4)] mb-3">Active Days</div>
          <div className="flex gap-2 flex-wrap">
            {days.map((d) => {
              const active = value.days[d]
              return (
                <button
                  key={d}
                  onClick={() => toggleDay(d)}
                  onMouseEnter={() => setHovered(d)}
                  onMouseLeave={() => setHovered(null)}
                  className="w-14 h-14 rounded-[12px] font-grotesk font-bold text-[13px] transition-all duration-200 cursor-pointer"
                  style={{
                    background: active ? '#1FA2FF' : 'rgba(255,255,255,0.04)',
                    color: active ? '#070B16' : hovered === d ? '#fff' : 'rgba(244,246,251,0.55)',
                    border: active ? '1px solid #1FA2FF' : '1px solid rgba(255,255,255,0.08)',
                    transform: active ? 'scale(1.08)' : 'scale(1)',
                  }}
                >
                  {d}
                </button>
              )
            })}
          </div>
          {activeDays.length > 0 && (
            <p className="mt-2 text-[12px] text-[rgba(244,246,251,0.4)]">{activeDays.map((d) => dayFull[d]).join(', ')}</p>
          )}
        </div>

        {/* Time range */}
        <div className="mb-6">
          <div className="text-[12px] font-bold uppercase tracking-widest text-[rgba(244,246,251,0.4)] mb-3">Business Hours</div>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-[rgba(244,246,251,0.4)] uppercase tracking-wider">Start</label>
              <input
                type="time"
                value={value.startTime}
                onChange={(e) => onChange({ ...value, startTime: e.target.value })}
                className="px-4 py-2 rounded-[10px] font-grotesk font-semibold text-[14px] text-white outline-none focus:ring-1 focus:ring-[#1FA2FF]"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
              />
            </div>
            <span className="text-[rgba(244,246,251,0.4)] text-[18px] mt-5">→</span>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-[rgba(244,246,251,0.4)] uppercase tracking-wider">End</label>
              <input
                type="time"
                value={value.endTime}
                onChange={(e) => onChange({ ...value, endTime: e.target.value })}
                className="px-4 py-2 rounded-[10px] font-grotesk font-semibold text-[14px] text-white outline-none focus:ring-1 focus:ring-[#1FA2FF]"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
              />
            </div>
          </div>
        </div>

        {/* Weekly grid visual */}
        <div className="p-5 rounded-[16px]" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="text-[12px] font-bold uppercase tracking-widest text-[rgba(244,246,251,0.4)] mb-3">Weekly Preview</div>
          <div className="grid grid-cols-7 gap-1.5">
            {days.map((d) => {
              const active = value.days[d]
              return (
                <div key={d} className="flex flex-col items-center gap-1">
                  <div className="text-[11px] text-[rgba(244,246,251,0.4)] font-bold">{d}</div>
                  <div
                    className="w-full rounded-[6px] transition-all duration-300"
                    style={{
                      height: active ? '48px' : '12px',
                      background: active ? 'linear-gradient(180deg, rgba(31,162,255,0.7) 0%, rgba(28,127,214,0.4) 100%)' : 'rgba(255,255,255,0.05)',
                    }}
                  />
                </div>
              )
            })}
          </div>
          {!value.alwaysOn && activeDays.length > 0 && (
            <p className="mt-3 text-[12px] text-[rgba(244,246,251,0.4)]">
              Active {activeDays.length}/7 days · {value.startTime} – {value.endTime}
            </p>
          )}
        </div>
      </div>

      {value.alwaysOn && (
        <div className="flex items-center gap-3 mt-2 p-4 rounded-[14px]" style={{ background: 'rgba(31,162,255,0.06)', border: '1px solid rgba(31,162,255,0.2)' }}>
          <span className="text-[20px]">🌐</span>
          <div className="text-[13px] text-[rgba(244,246,251,0.7)]">Your AI employee will respond <span className="text-[#1FA2FF] font-semibold">24 hours a day, 7 days a week</span> — including holidays.</div>
        </div>
      )}
    </div>
  )
}

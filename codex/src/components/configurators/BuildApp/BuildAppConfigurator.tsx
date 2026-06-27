import { useState } from 'react'
import { BusinessTypeStep } from './steps/BusinessTypeStep'
import { PlatformsStep } from './steps/PlatformsStep'
import { FeaturesStep } from './steps/FeaturesStep'
import { AppSummaryStep } from './steps/AppSummaryStep'

export interface AppConfig {
  businessType: string
  platforms: string[]
  features: string[]
}

const defaultConfig: AppConfig = { businessType: '', platforms: [], features: [] }

const steps = [
  { id: 'type', title: 'App Type' },
  { id: 'platforms', title: 'Platforms' },
  { id: 'features', title: 'Features' },
  { id: 'summary', title: 'Summary' },
]

function isValid(step: number, config: AppConfig): boolean {
  switch (step) {
    case 0: return !!config.businessType
    case 1: return config.platforms.length > 0
    case 2: return config.features.length > 0
    default: return true
  }
}

export function BuildAppConfigurator() {
  const [current, setCurrent] = useState(0)
  const [config, setConfig] = useState<AppConfig>(defaultConfig)

  const update = <K extends keyof AppConfig>(key: K, val: AppConfig[K]) => {
    setConfig((prev) => ({ ...prev, [key]: val }))
  }

  const canNext = isValid(current, config)
  const isLast = current === steps.length - 1

  return (
    <div className="max-w-[860px] mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] font-bold uppercase tracking-widest text-[rgba(244,246,251,0.4)]">Step {current + 1} of {steps.length}</span>
          <span className="text-[12px] font-bold text-[rgba(244,246,251,0.4)]">{Math.round(((current + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="h-1 w-full rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${((current + 1) / steps.length) * 100}%`, background: 'linear-gradient(90deg, #1FA2FF, #FF2E3C)' }} />
        </div>
        <div className="flex mt-4 gap-2">
          {steps.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { if (i < current) setCurrent(i) }}
              className="flex-1 py-1.5 rounded-[8px] font-grotesk font-semibold text-[12px] transition-all duration-200 cursor-pointer"
              style={{
                background: i === current ? 'rgba(31,162,255,0.12)' : i < current ? 'rgba(53,214,160,0.06)' : 'rgba(255,255,255,0.02)',
                color: i === current ? '#1FA2FF' : i < current ? '#35D6A0' : 'rgba(244,246,251,0.3)',
                border: i === current ? '1px solid rgba(31,162,255,0.35)' : i < current ? '1px solid rgba(53,214,160,0.2)' : '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="p-6 sm:p-10 rounded-[24px] min-h-[440px]" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
        {current === 0 && <BusinessTypeStep value={config.businessType} onChange={(v) => update('businessType', v)} />}
        {current === 1 && <PlatformsStep value={config.platforms} onChange={(v) => update('platforms', v)} />}
        {current === 2 && <FeaturesStep value={config.features} onChange={(v) => update('features', v)} />}
        {current === 3 && <AppSummaryStep config={config} />}
      </div>

      {/* Navigation */}
      {current < steps.length - 1 && (
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setCurrent((p) => Math.max(0, p - 1))}
            disabled={current === 0}
            className="px-6 py-2.5 rounded-[12px] font-grotesk font-semibold text-[14px] transition-all duration-200"
            style={{ background: current === 0 ? 'transparent' : 'rgba(255,255,255,0.06)', color: current === 0 ? 'rgba(244,246,251,0.2)' : 'rgba(244,246,251,0.7)', border: '1px solid rgba(255,255,255,0.1)', cursor: current === 0 ? 'default' : 'pointer' }}
          >
            ← Previous
          </button>
          <button
            onClick={() => { if (canNext) setCurrent((p) => Math.min(steps.length - 1, p + 1)) }}
            disabled={!canNext}
            className="px-8 py-2.5 rounded-[12px] font-grotesk font-bold text-[14px] transition-all duration-200"
            style={{ background: canNext ? 'linear-gradient(135deg, #1FA2FF, #1C7FD6)' : 'rgba(255,255,255,0.06)', color: canNext ? '#fff' : 'rgba(244,246,251,0.25)', cursor: canNext ? 'pointer' : 'default', boxShadow: canNext ? '0 4px 20px rgba(31,162,255,0.3)' : 'none' }}
          >
            {isLast ? 'Submit' : 'Continue →'}
          </button>
        </div>
      )}
    </div>
  )
}

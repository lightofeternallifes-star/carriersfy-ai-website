import { useState } from 'react'
import { IndustryStep } from './steps/IndustryStep'
import { NameStep } from './steps/NameStep'
import { GenderStep } from './steps/GenderStep'
import { VoiceStep } from './steps/VoiceStep'
import { LanguageStep } from './steps/LanguageStep'
import { ChannelsStep } from './steps/ChannelsStep'
import { FunctionsStep } from './steps/FunctionsStep'
import { IntegrationsStep } from './steps/IntegrationsStep'
import { HoursStep, type HoursConfig } from './steps/HoursStep'
import { PricingStep } from './steps/PricingStep'
import { SummaryStep } from './steps/SummaryStep'

export interface EmployeeConfig {
  industry: string
  name: string
  gender: string
  voice: string
  languages: string[]
  channels: string[]
  functions: string[]
  integrations: string[]
  hours: HoursConfig
}

const defaultConfig: EmployeeConfig = {
  industry: '',
  name: '',
  gender: '',
  voice: '',
  languages: ['EN'],
  channels: [],
  functions: [],
  integrations: [],
  hours: {
    alwaysOn: true,
    days: { Mon: true, Tue: true, Wed: true, Thu: true, Fri: true, Sat: false, Sun: false },
    startTime: '09:00',
    endTime: '18:00',
  },
}

const steps = [
  { id: 'industry', title: 'Industry', subtitle: 'Your sector' },
  { id: 'name', title: 'Name', subtitle: 'Identity' },
  { id: 'gender', title: 'Gender', subtitle: 'Voice type' },
  { id: 'voice', title: 'Voice', subtitle: 'Personality' },
  { id: 'language', title: 'Language', subtitle: 'Multilingual' },
  { id: 'channels', title: 'Channels', subtitle: 'Platforms' },
  { id: 'functions', title: 'Functions', subtitle: 'Capabilities' },
  { id: 'integrations', title: 'Integrations', subtitle: 'Tools' },
  { id: 'hours', title: 'Hours', subtitle: 'Schedule' },
  { id: 'pricing', title: 'Pricing', subtitle: 'Investment' },
  { id: 'summary', title: 'Summary', subtitle: 'Review' },
]

function isStepValid(step: number, config: EmployeeConfig): boolean {
  switch (step) {
    case 0: return !!config.industry
    case 1: return config.name.trim().length >= 2
    case 2: return !!config.gender
    case 3: return !!config.voice
    case 4: return config.languages.length > 0
    case 5: return config.channels.length > 0
    case 6: return config.functions.length > 0
    default: return true
  }
}

export function BuildEmployeeConfigurator() {
  const [current, setCurrent] = useState(0)
  const [config, setConfig] = useState<EmployeeConfig>(defaultConfig)

  const update = <K extends keyof EmployeeConfig>(key: K, val: EmployeeConfig[K]) => {
    setConfig((prev) => ({ ...prev, [key]: val }))
  }

  const canNext = isStepValid(current, config)
  const isLast = current === steps.length - 1

  return (
    <div className="max-w-[860px] mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] font-bold uppercase tracking-widest text-[rgba(244,246,251,0.4)]">
            Step {current + 1} of {steps.length}
          </span>
          <span className="text-[12px] font-bold text-[rgba(244,246,251,0.4)]">
            {Math.round(((current + 1) / steps.length) * 100)}%
          </span>
        </div>
        <div className="h-1 w-full rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${((current + 1) / steps.length) * 100}%`, background: 'linear-gradient(90deg, #1FA2FF, #FF2E3C)' }}
          />
        </div>
        {/* Step pills — desktop only */}
        <div className="hidden lg:flex mt-4 gap-1">
          {steps.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { if (i < current || isStepValid(i - 1, config)) setCurrent(i) }}
              className="flex-1 py-1 rounded-[6px] text-center transition-all duration-200 cursor-pointer"
              style={{
                background: i === current ? 'rgba(31,162,255,0.12)' : i < current ? 'rgba(53,214,160,0.06)' : 'rgba(255,255,255,0.02)',
                border: i === current ? '1px solid rgba(31,162,255,0.4)' : i < current ? '1px solid rgba(53,214,160,0.2)' : '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div className="text-[10px] font-bold truncate" style={{ color: i === current ? '#1FA2FF' : i < current ? '#35D6A0' : 'rgba(244,246,251,0.3)' }}>
                {s.title}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="p-6 sm:p-10 rounded-[24px] min-h-[480px]" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
        {current === 0 && <IndustryStep value={config.industry} onChange={(v) => update('industry', v)} />}
        {current === 1 && <NameStep value={config.name} onChange={(v) => update('name', v)} />}
        {current === 2 && <GenderStep value={config.gender} onChange={(v) => update('gender', v)} />}
        {current === 3 && <VoiceStep value={config.voice} onChange={(v) => update('voice', v)} />}
        {current === 4 && <LanguageStep value={config.languages} onChange={(v) => update('languages', v)} />}
        {current === 5 && <ChannelsStep value={config.channels} onChange={(v) => update('channels', v)} />}
        {current === 6 && <FunctionsStep value={config.functions} onChange={(v) => update('functions', v)} />}
        {current === 7 && <IntegrationsStep value={config.integrations} onChange={(v) => update('integrations', v)} />}
        {current === 8 && <HoursStep value={config.hours} onChange={(v) => update('hours', v)} />}
        {current === 9 && <PricingStep config={config} />}
        {current === 10 && <SummaryStep config={config} />}
      </div>

      {/* Navigation */}
      {current < steps.length - 1 && (
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setCurrent((p) => Math.max(0, p - 1))}
            disabled={current === 0}
            className="px-6 py-2.5 rounded-[12px] font-grotesk font-semibold text-[14px] transition-all duration-200"
            style={{
              background: current === 0 ? 'transparent' : 'rgba(255,255,255,0.06)',
              color: current === 0 ? 'rgba(244,246,251,0.2)' : 'rgba(244,246,251,0.7)',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: current === 0 ? 'default' : 'pointer',
            }}
          >
            ← Previous
          </button>
          <button
            onClick={() => { if (canNext) setCurrent((p) => Math.min(steps.length - 1, p + 1)) }}
            disabled={!canNext}
            className="px-8 py-2.5 rounded-[12px] font-grotesk font-bold text-[14px] transition-all duration-200"
            style={{
              background: canNext ? 'linear-gradient(135deg, #1FA2FF, #1C7FD6)' : 'rgba(255,255,255,0.06)',
              color: canNext ? '#fff' : 'rgba(244,246,251,0.25)',
              cursor: canNext ? 'pointer' : 'default',
              boxShadow: canNext ? '0 4px 20px rgba(31,162,255,0.3)' : 'none',
            }}
          >
            {isLast ? 'Submit' : 'Continue →'}
          </button>
        </div>
      )}
    </div>
  )
}

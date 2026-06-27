import type { EmployeeConfig } from '../BuildEmployeeConfigurator'

interface PricingStepProps {
  config: EmployeeConfig
}

const BASE_SETUP = 1500
const BASE_MONTHLY = 299

const channelPricing: Record<string, number> = { phone: 79, whatsapp: 49, sms: 49, email: 0, webchat: 0 }
const functionPricing: Record<string, number> = { 'lead-qual': 0, sales: 0, support: 0, appointments: 0, quotes: 49, crm: 29, calendar: 29, followup: 39 }
const integrationPricing: Record<string, number> = { salesforce: 49, hubspot: 29, 'google-cal': 0, outlook: 0, twilio: 0, 'whatsapp-biz': 0, shopify: 39, webhook: 0 }

function calcPricing(config: EmployeeConfig) {
  const channelAdd = config.channels.reduce((s, c) => s + (channelPricing[c] ?? 0), 0)
  const functionAdd = config.functions.reduce((s, f) => s + (functionPricing[f] ?? 0), 0)
  const integrationAdd = config.integrations.reduce((s, i) => s + (integrationPricing[i] ?? 0), 0)
  const languageAdd = Math.max(0, (config.languages.length - 1)) * 49
  const hours247Add = config.hours.alwaysOn ? 99 : 0
  const monthly = BASE_MONTHLY + channelAdd + functionAdd + integrationAdd + languageAdd + hours247Add
  const setup = BASE_SETUP + (config.channels.length > 2 ? 500 : 0)
  return { monthly, setup, channelAdd, functionAdd, integrationAdd, languageAdd, hours247Add }
}

const lineItem = (label: string, amount: number, color = 'rgba(244,246,251,0.55)') => (
  <div key={label} className="flex items-center justify-between py-2">
    <span className="text-[13.5px]" style={{ color }}>{label}</span>
    <span className="font-grotesk font-semibold text-[14px]" style={{ color: amount > 0 ? '#F4F6FB' : 'rgba(244,246,251,0.4)' }}>
      {amount > 0 ? `+$${amount}/mo` : 'Included'}
    </span>
  </div>
)

export function PricingStep({ config }: PricingStepProps) {
  const { monthly, setup, channelAdd, functionAdd, integrationAdd, languageAdd, hours247Add } = calcPricing(config)

  return (
    <div>
      <h3 className="font-grotesk font-bold text-[22px] text-white mb-2">Your investment</h3>
      <p className="text-[14.5px] text-[rgba(244,246,251,0.55)] mb-8">
        [PLACEHOLDER — Final pricing is customized during onboarding. Estimates below are illustrative.]
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Monthly Breakdown */}
        <div className="p-6 rounded-[20px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="text-[12px] font-bold uppercase tracking-widest text-[rgba(244,246,251,0.4)] mb-4">Monthly Estimate</div>
          <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            {lineItem('Base AI Employee', BASE_MONTHLY, 'rgba(244,246,251,0.7)')}
            {config.channels.length > 0 && lineItem(`Channels (${config.channels.length})`, channelAdd)}
            {config.functions.length > 0 && lineItem(`Functions (${config.functions.length})`, functionAdd)}
            {config.integrations.length > 0 && lineItem(`Integrations (${config.integrations.length})`, integrationAdd)}
            {config.languages.length > 1 && lineItem(`Extra languages (${config.languages.length - 1})`, languageAdd)}
            {config.hours.alwaysOn && lineItem('24/7 Always On', hours247Add)}
          </div>
          <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="flex items-baseline justify-between">
              <span className="font-grotesk font-bold text-[15px] text-white">Est. Monthly</span>
              <div className="text-right">
                <span className="font-grotesk font-black text-[32px]" style={{ background: 'linear-gradient(135deg, #1FA2FF, #1C7FD6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>${monthly}</span>
                <span className="text-[14px] text-[rgba(244,246,251,0.45)] ml-1">/mo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Setup Fee + Summary */}
        <div className="flex flex-col gap-4">
          <div className="p-5 rounded-[18px]" style={{ background: 'rgba(255,200,60,0.05)', border: '1px solid rgba(255,200,60,0.2)' }}>
            <div className="text-[12px] font-bold uppercase tracking-widest text-[#FFC83C] mb-2">One-Time Setup</div>
            <div className="flex items-baseline gap-2">
              <span className="font-grotesk font-black text-[28px] text-white">${setup.toLocaleString()}</span>
              <span className="text-[13px] text-[rgba(244,246,251,0.45)]">setup fee</span>
            </div>
            <p className="text-[12px] text-[rgba(244,246,251,0.45)] mt-1">Includes onboarding, training data upload, and integration setup.</p>
          </div>

          <div className="p-5 rounded-[18px] flex-1" style={{ background: 'rgba(53,214,160,0.05)', border: '1px solid rgba(53,214,160,0.2)' }}>
            <div className="text-[12px] font-bold uppercase tracking-widest text-[#35D6A0] mb-3">What's Included</div>
            <ul className="space-y-2">
              {['Dedicated AI model fine-tuned on your business', 'Custom personality & voice profile', 'Real-time monitoring dashboard', 'Monthly performance reports', '48h support SLA', 'Free monthly check-in call'].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[12.5px] text-[rgba(244,246,251,0.6)]">
                  <span className="text-[#35D6A0] mt-0.5 flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-5 p-4 rounded-[14px] text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-[12px] text-[rgba(244,246,251,0.35)]">
          PLACEHOLDER — Actual pricing is determined after a discovery call. No charges are made by submitting this form.
        </p>
      </div>
    </div>
  )
}

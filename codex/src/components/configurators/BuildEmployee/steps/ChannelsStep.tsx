interface ChannelsStepProps {
  value: string[]
  onChange: (v: string[]) => void
}

const channels = [
  { id: 'phone', icon: '📞', label: 'Phone', desc: 'Inbound & outbound voice calls via your business number' },
  { id: 'whatsapp', icon: '💬', label: 'WhatsApp', desc: 'WhatsApp Business API — text, voice messages, and media' },
  { id: 'sms', icon: '📱', label: 'SMS', desc: 'Text messaging to any US/international number via Twilio' },
  { id: 'email', icon: '📧', label: 'Email', desc: 'Automated email responses and outbound sequences' },
  { id: 'webchat', icon: '🌐', label: 'Website Chat', desc: 'Embedded chat widget on your website or landing page' },
]

export function ChannelsStep({ value, onChange }: ChannelsStepProps) {
  const toggle = (id: string) => {
    onChange(value.includes(id) ? value.filter((c) => c !== id) : [...value, id])
  }

  return (
    <div>
      <h3 className="font-grotesk font-bold text-[22px] text-white mb-2">Where should they work?</h3>
      <p className="text-[14.5px] text-[rgba(244,246,251,0.55)] mb-8">Select all channels your AI employee will be active on. You can enable multiple.</p>
      <div className="flex flex-col gap-3">
        {channels.map((ch) => {
          const selected = value.includes(ch.id)
          return (
            <button
              key={ch.id}
              onClick={() => toggle(ch.id)}
              className="flex items-center gap-5 p-5 rounded-[18px] text-left transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
              style={{
                background: selected ? 'rgba(31,162,255,0.08)' : 'rgba(255,255,255,0.03)',
                border: selected ? '1px solid rgba(31,162,255,0.4)' : '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="w-12 h-12 rounded-[14px] flex items-center justify-center text-2xl flex-shrink-0" style={{ background: selected ? 'rgba(31,162,255,0.15)' : 'rgba(255,255,255,0.05)', border: selected ? '1px solid rgba(31,162,255,0.3)' : '1px solid rgba(255,255,255,0.07)' }}>
                {ch.icon}
              </div>
              <div className="flex-1">
                <div className="font-grotesk font-semibold text-[16px] text-white">{ch.label}</div>
                <div className="text-[13px] text-[rgba(244,246,251,0.5)] mt-0.5">{ch.desc}</div>
              </div>
              {/* Toggle */}
              <div className="flex-shrink-0 w-11 h-6 rounded-full transition-all duration-300" style={{ background: selected ? '#1FA2FF' : 'rgba(255,255,255,0.1)', position: 'relative' }}>
                <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all duration-300" style={{ left: selected ? '22px' : '2px' }} />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

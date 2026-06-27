interface IntegrationsStepProps {
  value: string[]
  onChange: (v: string[]) => void
}

const integrations = [
  { id: 'salesforce', icon: '☁️', name: 'Salesforce', category: 'CRM', desc: 'Sync contacts, leads, and opportunities' },
  { id: 'hubspot', icon: '🟠', name: 'HubSpot', category: 'CRM', desc: 'Full two-way contact and deal sync' },
  { id: 'google-cal', icon: '📆', name: 'Google Calendar', category: 'Calendar', desc: 'Book and manage events directly' },
  { id: 'outlook', icon: '📧', name: 'Outlook / Microsoft 365', category: 'Calendar', desc: 'Enterprise calendar and email integration' },
  { id: 'twilio', icon: '📞', name: 'Twilio', category: 'Messaging', desc: 'Voice calls and SMS at enterprise scale' },
  { id: 'whatsapp-biz', icon: '💬', name: 'WhatsApp Business API', category: 'Messaging', desc: 'Official WhatsApp Business messaging' },
  { id: 'shopify', icon: '🛒', name: 'Shopify', category: 'E-Commerce', desc: 'Order status, inventory, and customer data' },
  { id: 'webhook', icon: '🔗', name: 'Custom Webhook', category: 'Developer', desc: 'Connect any system with a custom endpoint' },
]

const categoryColors: Record<string, string> = {
  CRM: '#1FA2FF',
  Calendar: '#35D6A0',
  Messaging: '#FFC83C',
  'E-Commerce': '#FF2E3C',
  Developer: 'rgba(244,246,251,0.5)',
}

export function IntegrationsStep({ value, onChange }: IntegrationsStepProps) {
  const toggle = (id: string) => {
    onChange(value.includes(id) ? value.filter((c) => c !== id) : [...value, id])
  }

  return (
    <div>
      <h3 className="font-grotesk font-bold text-[22px] text-white mb-2">Connect your tools</h3>
      <p className="text-[14.5px] text-[rgba(244,246,251,0.55)] mb-8">
        Select the platforms your AI employee should integrate with. Credentials are configured after deployment.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {integrations.map((item) => {
          const selected = value.includes(item.id)
          const catColor = categoryColors[item.category] ?? 'rgba(244,246,251,0.5)'
          return (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              className="flex items-center gap-4 p-4 rounded-[16px] text-left transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
              style={{
                background: selected ? 'rgba(31,162,255,0.07)' : 'rgba(255,255,255,0.03)',
                border: selected ? '1px solid rgba(31,162,255,0.35)' : '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="w-10 h-10 rounded-[12px] flex items-center justify-center text-xl flex-shrink-0" style={{ background: selected ? 'rgba(31,162,255,0.12)' : 'rgba(255,255,255,0.05)', border: selected ? '1px solid rgba(31,162,255,0.25)' : '1px solid rgba(255,255,255,0.07)' }}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-grotesk font-semibold text-[14px] text-white truncate">{item.name}</span>
                  <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full" style={{ color: catColor, background: `${catColor}15`, border: `1px solid ${catColor}30` }}>{item.category}</span>
                </div>
                <div className="text-[12px] text-[rgba(244,246,251,0.45)] mt-0.5 truncate">{item.desc}</div>
              </div>
              <div className="flex-shrink-0 w-5 h-5 rounded-[5px] border transition-all duration-200 flex items-center justify-center" style={{ background: selected ? '#1FA2FF' : 'transparent', borderColor: selected ? '#1FA2FF' : 'rgba(255,255,255,0.2)' }}>
                {selected && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#070B16" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </div>
            </button>
          )
        })}
      </div>
      {value.length === 0 && (
        <p className="mt-5 text-[13px] text-[rgba(244,246,251,0.35)]">No integrations selected — your AI employee will operate independently.</p>
      )}
    </div>
  )
}

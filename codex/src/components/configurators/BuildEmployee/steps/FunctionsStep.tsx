interface FunctionsStepProps {
  value: string[]
  onChange: (v: string[]) => void
}

const categories = [
  {
    label: 'Core Functions',
    items: [
      { id: 'lead-qual', icon: '🎯', title: 'Lead Qualification', desc: 'Score and classify every incoming lead automatically' },
      { id: 'sales', icon: '💰', title: 'Sales Assistance', desc: 'Guide prospects through your sales process from first touch to close' },
      { id: 'support', icon: '🛎️', title: 'Customer Support', desc: 'Resolve common questions and issues instantly' },
      { id: 'appointments', icon: '📅', title: 'Appointment Booking', desc: 'Schedule into your calendar with automatic confirmations' },
    ],
  },
  {
    label: 'Advanced Functions',
    items: [
      { id: 'quotes', icon: '📄', title: 'Quote Generation', desc: 'Create and send branded estimates in seconds' },
      { id: 'crm', icon: '🗂️', title: 'CRM Updates', desc: 'Log contacts, notes, and interactions automatically' },
      { id: 'calendar', icon: '🗓️', title: 'Calendar Management', desc: 'Full calendar intelligence with rescheduling and reminders' },
      { id: 'followup', icon: '🔄', title: 'Follow-up Sequences', desc: 'Automated multi-step outreach until the deal is closed' },
    ],
  },
]

export function FunctionsStep({ value, onChange }: FunctionsStepProps) {
  const toggle = (id: string) => {
    onChange(value.includes(id) ? value.filter((c) => c !== id) : [...value, id])
  }

  return (
    <div>
      <h3 className="font-grotesk font-bold text-[22px] text-white mb-2">What should they be able to do?</h3>
      <p className="text-[14.5px] text-[rgba(244,246,251,0.55)] mb-8">Select all functions your AI employee will handle. You can always add more later.</p>
      <div className="flex flex-col gap-8">
        {categories.map((cat) => (
          <div key={cat.label}>
            <div className="text-[12px] font-bold uppercase tracking-widest text-[rgba(244,246,251,0.4)] mb-4">{cat.label}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cat.items.map((item) => {
                const selected = value.includes(item.id)
                return (
                  <button
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    className="flex items-start gap-4 p-4 rounded-[16px] text-left transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
                    style={{
                      background: selected ? 'rgba(31,162,255,0.08)' : 'rgba(255,255,255,0.03)',
                      border: selected ? '1px solid rgba(31,162,255,0.4)' : '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    <span className="text-xl mt-0.5">{item.icon}</span>
                    <div className="flex-1">
                      <div className="font-grotesk font-semibold text-[14.5px] text-white">{item.title}</div>
                      <div className="text-[12.5px] text-[rgba(244,246,251,0.5)] mt-0.5">{item.desc}</div>
                    </div>
                    <div className="flex-shrink-0 w-5 h-5 rounded-[5px] border transition-all duration-200 flex items-center justify-center mt-0.5" style={{ background: selected ? '#1FA2FF' : 'transparent', borderColor: selected ? '#1FA2FF' : 'rgba(255,255,255,0.2)' }}>
                      {selected && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#070B16" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface FeaturesStepProps {
  value: string[]
  onChange: (v: string[]) => void
}

const categories = [
  {
    label: 'Core',
    color: '#1FA2FF',
    items: [
      { id: 'auth', icon: '🔐', title: 'Authentication', desc: 'Login, signup, OAuth, 2FA' },
      { id: 'payments', icon: '💳', title: 'Payments', desc: 'Stripe integration, subscriptions, invoicing' },
      { id: 'notifications', icon: '🔔', title: 'Notifications', desc: 'Push, email, in-app alerts' },
    ],
  },
  {
    label: 'Data & AI',
    color: '#35D6A0',
    items: [
      { id: 'ai-chat', icon: '🤖', title: 'AI Chat / Assistant', desc: 'Embedded conversational AI' },
      { id: 'analytics', icon: '📊', title: 'Analytics Dashboard', desc: 'Charts, metrics, and reporting' },
      { id: 'search', icon: '🔍', title: 'Smart Search', desc: 'Semantic or full-text search' },
    ],
  },
  {
    label: 'Content & Media',
    color: '#FFC83C',
    items: [
      { id: 'file-upload', icon: '📁', title: 'File Upload & Storage', desc: 'Images, docs, video — S3/Cloudflare R2' },
      { id: 'video', icon: '🎥', title: 'Video Streaming', desc: 'Live or on-demand video playback' },
      { id: 'cms', icon: '📝', title: 'Content Management', desc: 'Blog, pages, rich text editor' },
    ],
  },
  {
    label: 'Social & Commerce',
    color: '#FF2E3C',
    items: [
      { id: 'social', icon: '👥', title: 'Social Features', desc: 'Profiles, feeds, following, likes' },
      { id: 'messaging', icon: '💬', title: 'Real-time Messaging', desc: 'Chat rooms or DMs via WebSockets' },
      { id: 'marketplace', icon: '🏪', title: 'Marketplace / Listings', desc: 'Buy/sell with escrow or commission' },
    ],
  },
]

export function FeaturesStep({ value, onChange }: FeaturesStepProps) {
  const toggle = (id: string) => {
    onChange(value.includes(id) ? value.filter((c) => c !== id) : [...value, id])
  }

  return (
    <div>
      <h3 className="font-grotesk font-bold text-[22px] text-white mb-2">What features do you need?</h3>
      <p className="text-[14.5px] text-[rgba(244,246,251,0.55)] mb-8">Select all the features your application requires. You can add more later.</p>
      <div className="flex flex-col gap-7">
        {categories.map((cat) => (
          <div key={cat.label}>
            <div className="flex items-center gap-2 mb-3">
              <div className="text-[11px] font-bold uppercase tracking-widest" style={{ color: cat.color }}>{cat.label}</div>
              <div className="flex-1 h-px" style={{ background: `${cat.color}20` }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {cat.items.map((item) => {
                const selected = value.includes(item.id)
                return (
                  <button
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    className="flex items-start gap-3 p-4 rounded-[14px] text-left transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
                    style={{
                      background: selected ? `${cat.color}10` : 'rgba(255,255,255,0.03)',
                      border: selected ? `1px solid ${cat.color}40` : '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <div className="flex-1">
                      <div className="font-grotesk font-semibold text-[13.5px] text-white leading-[1.3]">{item.title}</div>
                      <div className="text-[11.5px] text-[rgba(244,246,251,0.43)] mt-0.5">{item.desc}</div>
                    </div>
                    <div className="flex-shrink-0 w-4 h-4 rounded-[4px] border transition-all duration-200 flex items-center justify-center mt-0.5" style={{ background: selected ? cat.color : 'transparent', borderColor: selected ? cat.color : 'rgba(255,255,255,0.2)' }}>
                      {selected && <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3l2 2 4-4" stroke="#070B16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      {value.length > 0 && (
        <p className="mt-6 text-[13px] text-[#35D6A0] font-semibold">{value.length} feature{value.length > 1 ? 's' : ''} selected</p>
      )}
    </div>
  )
}

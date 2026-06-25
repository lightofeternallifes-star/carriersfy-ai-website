import { useState } from 'react'

interface FAQItem {
  q: string
  a: string
}

interface FAQProps {
  items: FAQItem[]
  className?: string
}

export function FAQ({ items, className = '' }: FAQProps) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {items.map((item, i) => (
        <div
          key={i}
          className="card-surface rounded-[18px] overflow-hidden"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 p-7 text-left hover:bg-white/[0.03] transition-colors cursor-pointer"
          >
            <span className="font-semibold text-[15.5px] text-[#F4F6FB] font-grotesk pr-4">{item.q}</span>
            <span
              className="flex-shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-cf-blue transition-transform duration-300"
              style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
          </button>
          <div
            style={{
              maxHeight: open === i ? '400px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.35s ease',
            }}
          >
            <p className="px-7 pb-7 text-[14.5px] leading-relaxed text-[rgba(244,246,251,0.65)]">
              {item.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

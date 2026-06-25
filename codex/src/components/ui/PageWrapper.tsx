import { ReactNode } from 'react'

interface PageWrapperProps {
  children: ReactNode
  className?: string
}

export function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <div className={`min-h-screen bg-[#070B16] text-[#F4F6FB] overflow-x-hidden relative ${className}`}>
      {/* Fixed cinematic background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(1100px 720px at 78% -8%, rgba(28,127,214,0.26), transparent 60%), radial-gradient(900px 720px at 6% 12%, rgba(31,162,255,0.14), transparent 55%), radial-gradient(760px 520px at 50% 112%, rgba(255,46,60,0.16), transparent 60%)',
        }}
      />
      {/* Grid pattern */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(120,150,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(120,150,255,.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 28%, #000, transparent 78%)',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 28%, #000, transparent 78%)',
        }}
      />
      {/* Vignette */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 130% 90% at 50% 45%, transparent 52%, rgba(0,0,0,0.58) 100%)',
        }}
      />
      {/* Content */}
      <div className="relative z-[1]">
        {children}
      </div>
    </div>
  )
}

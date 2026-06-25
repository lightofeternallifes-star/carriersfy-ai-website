import { Link } from 'react-router-dom'
import { StatusBadge } from '../ui/StatusBadge'
import { getVariantGradient } from '../../design-system/tokens'

interface EmployeeCardProps {
  name: string
  role: string
  description: string
  color: 'blue' | 'red' | 'gold'
  initial: string
  id: string
  isVIP?: boolean
}

export function EmployeeCard({ name, role, description, color, initial, id, isVIP = false }: EmployeeCardProps) {
  const gradient = getVariantGradient(color)
  const accentColor = color === 'blue' ? '#1FA2FF' : color === 'red' ? '#FF2E3C' : '#FFC83C'
  const glowColor = color === 'blue' ? 'rgba(31,162,255,0.25)' : color === 'red' ? 'rgba(255,46,60,0.25)' : 'rgba(255,200,60,0.3)'

  if (isVIP) {
    return (
      <div
        className="relative p-8 rounded-[26px] overflow-hidden transition-all duration-300 hover:-translate-y-1"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.025) 100%)',
          border: `1px solid ${accentColor}40`,
          backdropFilter: 'blur(24px)',
          boxShadow: `0 0 40px ${glowColor}, 0 30px 80px rgba(0,0,0,0.4)`,
        }}
      >
        {/* Gold corner brackets */}
        <div className="absolute top-0 left-[1%] w-8 h-8 border-t-2 border-l-2" style={{ borderColor: `${accentColor}70` }} />
        <div className="absolute top-0 right-[1%] w-8 h-8 border-t-2 border-r-2" style={{ borderColor: `${accentColor}70` }} />
        <div className="absolute bottom-0 left-[1%] w-8 h-8 border-b-2 border-l-2" style={{ borderColor: `${accentColor}70` }} />
        <div className="absolute bottom-0 right-[1%] w-8 h-8 border-b-2 border-r-2" style={{ borderColor: `${accentColor}70` }} />

        <div className="flex flex-col md:flex-row items-start md:items-center gap-7">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center font-grotesk font-bold text-3xl text-[#070B16] animate-pulse-glow"
              style={{ background: gradient, boxShadow: `0 0 36px ${glowColor}` }}
            >
              ✦
            </div>
            <span className="absolute -bottom-1 -right-1 text-xl">👑</span>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h3 className="font-grotesk font-bold text-2xl text-white">{name}</h3>
              <span
                className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ background: `${accentColor}20`, color: accentColor, border: `1px solid ${accentColor}40` }}
              >
                AI CEO
              </span>
              <StatusBadge status="online" />
            </div>
            <p className="text-[13px] font-bold uppercase tracking-widest mb-3" style={{ color: accentColor }}>{role}</p>
            <p className="text-[15px] leading-relaxed text-[rgba(244,246,251,0.7)] max-w-2xl">{description}</p>
          </div>

          {/* CTA */}
          <div className="flex-shrink-0">
            <Link
              to={`/employees/${id}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full no-underline font-bold text-[14px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(255,200,60,0.35)]"
              style={{
                background: gradient,
                color: '#070B16',
                boxShadow: `0 8px 28px ${glowColor}`,
              }}
            >
              Command Center →
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="group relative p-7 rounded-[22px] flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.borderColor = `${accentColor}40`
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 24px ${glowColor}, 0 20px 60px rgba(0,0,0,0.4)`
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)'
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
      }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between">
        {/* Avatar */}
        <div
          className="w-[72px] h-[72px] rounded-full flex items-center justify-center font-grotesk font-bold text-[26px] text-[#070B16] flex-shrink-0"
          style={{ background: gradient, boxShadow: `0 0 20px ${glowColor}` }}
        >
          {initial}
        </div>
        <StatusBadge status="online" />
      </div>

      {/* Name + role */}
      <div>
        <h3 className="font-grotesk font-bold text-[20px] text-white mb-1">{name}</h3>
        <p className="text-[12px] font-bold uppercase tracking-widest" style={{ color: accentColor }}>{role}</p>
      </div>

      {/* Description */}
      <p className="text-[14.5px] leading-[1.6] text-[rgba(244,246,251,0.62)] flex-1 line-clamp-3">{description}</p>

      {/* Button */}
      <Link
        to={`/employees/${id}`}
        className="inline-flex items-center justify-center gap-2 py-2.5 rounded-full no-underline font-semibold text-[13.5px] transition-all duration-300 border"
        style={{
          color: accentColor,
          borderColor: `${accentColor}35`,
          background: 'transparent',
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLAnchorElement).style.background = gradient
          ;(e.currentTarget as HTMLAnchorElement).style.color = '#070B16'
          ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'transparent'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
          ;(e.currentTarget as HTMLAnchorElement).style.color = accentColor
          ;(e.currentTarget as HTMLAnchorElement).style.borderColor = `${accentColor}35`
        }}
      >
        Meet {name} →
      </Link>
    </div>
  )
}

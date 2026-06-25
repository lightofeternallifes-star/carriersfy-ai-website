export type StatusType = 'online' | 'offline' | 'busy'

interface StatusBadgeProps {
  status?: StatusType
  label?: string
  className?: string
}

const statusConfig: Record<StatusType, { dot: string; text: string; bg: string }> = {
  online: { dot: 'bg-[#35D6A0] shadow-[0_0_10px_#35D6A0]', text: 'text-[#35D6A0]', bg: 'bg-[#35D6A0]/10' },
  offline: { dot: 'bg-white/30', text: 'text-white/40', bg: 'bg-white/5' },
  busy: { dot: 'bg-[#FFC83C] shadow-[0_0_10px_#FFC83C]', text: 'text-[#FFC83C]', bg: 'bg-[#FFC83C]/10' },
}

export function StatusBadge({ status = 'online', label, className = '' }: StatusBadgeProps) {
  const cfg = statusConfig[status]
  const displayLabel = label ?? (status === 'online' ? 'Online' : status === 'busy' ? 'Busy' : 'Offline')
  return (
    <span className={`inline-flex items-center gap-1.5 text-[12px] font-bold tracking-wider uppercase ${cfg.text} ${className}`}>
      <span className={`w-[7px] h-[7px] rounded-full ${cfg.dot} animate-blink inline-block`} />
      {displayLabel}
    </span>
  )
}

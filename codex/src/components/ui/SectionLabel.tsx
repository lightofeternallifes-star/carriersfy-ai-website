interface SectionLabelProps {
  children: React.ReactNode
  color?: 'blue' | 'red'
  className?: string
}

export function SectionLabel({ children, color = 'blue', className = '' }: SectionLabelProps) {
  const colorClass = color === 'blue' ? 'text-cf-blue' : 'text-cf-red'
  return (
    <div className={`text-[13px] font-bold tracking-[0.16em] uppercase ${colorClass} mb-4 ${className}`}>
      {children}
    </div>
  )
}

import { HTMLAttributes, forwardRef } from 'react'

export type CardVariant = 'surface' | 'elevated'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  rounded?: 'lg' | 'xl' | '2xl' | '3xl'
}

const variantClass: Record<CardVariant, string> = {
  surface: 'card-surface',
  elevated: 'card-elevated',
}

const roundedClass = {
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-[18px]',
  '3xl': 'rounded-[26px]',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'surface', rounded = '2xl', className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${variantClass[variant]} ${roundedClass[rounded]} ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

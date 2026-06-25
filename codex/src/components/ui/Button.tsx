import { ButtonHTMLAttributes, forwardRef } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'gradient-cta text-[#070B16] font-bold hover:opacity-90 hover:-translate-y-0.5 shadow-[0_10px_40px_rgba(28,127,214,0.35)] hover:shadow-[0_18px_56px_rgba(28,127,214,0.55)]',
  secondary: 'bg-white/[0.04] border border-white/[0.14] text-white font-semibold hover:bg-white/[0.09] hover:border-white/30 hover:-translate-y-0.5 backdrop-blur-sm',
  ghost: 'bg-transparent text-white font-semibold hover:bg-white/[0.06] hover:border-white/20 border border-transparent',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-sm px-5 py-2.5 rounded-xl',
  md: 'text-[15px] px-7 py-4 rounded-[14px]',
  lg: 'text-base px-8 py-5 rounded-[14px]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export const colors = {
  bg: '#070B16',
  blue: '#1FA2FF',
  blueDark: '#1C7FD6',
  red: '#FF2E3C',
  green: '#35D6A0',
  gold: '#FFC83C',
  text: '#F4F6FB',
  textMuted: 'rgba(244,246,251,0.62)',
  textSubtle: 'rgba(244,246,251,0.45)',
  cardBg: 'rgba(255,255,255,0.04)',
  cardBorder: 'rgba(255,255,255,0.08)',
  cardElevatedBg: 'rgba(255,255,255,0.06)',
  cardElevatedBorder: 'rgba(255,255,255,0.10)',
} as const

export const fonts = {
  heading: "'Space Grotesk', sans-serif",
  body: "'Manrope', sans-serif",
} as const

export const gradients = {
  cta: 'linear-gradient(135deg, #1FA2FF, #FF2E3C)',
  text: 'linear-gradient(110deg, #3FB0FF, #1C7FD6 42%, #FF2E3C)',
  blueToRed: 'linear-gradient(135deg, #1FA2FF, #FF2E3C)',
  blueToDark: 'linear-gradient(135deg, #1FA2FF, #1C7FD6)',
  redToDark: 'linear-gradient(135deg, #FF2E3C, #1C7FD6)',
  gold: 'linear-gradient(135deg, #FFC83C, #FF8C00)',
} as const

export const shadows = {
  card: '0 30px 80px rgba(0,0,0,0.4)',
  glow: {
    blue: '0 0 20px rgba(31,162,255,0.3)',
    red: '0 0 20px rgba(255,46,60,0.3)',
    gold: '0 0 28px rgba(255,200,60,0.35)',
    green: '0 0 10px #35D6A0',
  },
} as const

export type ColorVariant = 'blue' | 'red' | 'gold'

export function getVariantColor(variant: ColorVariant): string {
  switch (variant) {
    case 'blue': return colors.blue
    case 'red': return colors.red
    case 'gold': return colors.gold
  }
}

export function getVariantGradient(variant: ColorVariant): string {
  switch (variant) {
    case 'blue': return gradients.blueToDark
    case 'red': return gradients.redToDark
    case 'gold': return gradients.gold
  }
}

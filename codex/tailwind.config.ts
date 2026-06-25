import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        grotesk: ['Space Grotesk', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      colors: {
        cf: {
          bg: '#070B16',
          blue: '#1FA2FF',
          'blue-dark': '#1C7FD6',
          red: '#FF2E3C',
          green: '#35D6A0',
          text: '#F4F6FB',
        },
      },
      animation: {
        breath: 'cfbreath 4.6s ease-in-out infinite',
        rise: 'cfrise 0.6s ease forwards',
        'pulse-glow': 'cfpulse 3s ease-in-out infinite',
        shimmer: 'cfshimmer 6s linear infinite',
        blink: 'cfblink 2s infinite',
        'spin-slow': 'cfspin 16s linear infinite',
        'spin-slow-r': 'cfspinr 24s linear infinite',
        float: 'cffloat 6s ease-in-out infinite',
        glow: 'cfglow 5s ease-in-out infinite',
      },
      keyframes: {
        cfbreath: {
          '0%, 100%': { transform: 'scale(1)', filter: 'drop-shadow(0 0 8px rgba(255,46,60,.42))' },
          '50%': { transform: 'scale(1.06)', filter: 'drop-shadow(0 0 17px rgba(255,46,60,.72))' },
        },
        cfrise: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'none' },
        },
        cfpulse: {
          '0%, 100%': { opacity: '.5', transform: 'scale(1)' },
          '50%': { opacity: '.85', transform: 'scale(1.05)' },
        },
        cfshimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        cfblink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.25' },
        },
        cfspin: {
          to: { transform: 'rotate(360deg)' },
        },
        cfspinr: {
          to: { transform: 'rotate(-360deg)' },
        },
        cffloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        cfglow: {
          '0%, 100%': { opacity: '.65' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config

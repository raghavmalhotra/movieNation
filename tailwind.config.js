/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,html}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        other: { min: '340px', max: '1200px' },
      },
      colors: {
        dark: '#0f172a',
        gray: {
          900: '#111827',
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.5s ease-out forwards',
        fadeInScaleUp: 'fadeInScaleUp 0.6s ease-out forwards',
        tvTurnOn: 'tvTurnOn 0.8s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInScaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        tvTurnOn: {
          '0%': { opacity: '0', transform: 'scaleX(0) scaleY(0.05)' },

          '100%': { opacity: '1', transform: 'scaleX(1) scaleY(1)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}

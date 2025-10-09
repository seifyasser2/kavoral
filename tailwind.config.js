/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        }
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Cairo', 'sans-serif'],
        arabic: ['Cairo', 'system-ui', 'sans-serif'],
      },
      animation: {
        'gentle-float': 'gentle-float 6s ease-in-out infinite',
        'slide-in': 'slide-in 0.4s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'scale-in': 'scale-in 0.4s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'bounce-in': 'bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'gradient': 'gradient-shift 3s ease infinite',
      },
      keyframes: {
        'gentle-float': {
          '0%, 100%': { 
            transform: 'translateY(0) rotate(0deg)' 
          },
          '50%': { 
            transform: 'translateY(-20px) rotate(3deg)' 
          },
        },
        'slide-in': {
          'from': { 
            transform: 'translateX(100%)', 
            opacity: '0' 
          },
          'to': { 
            transform: 'translateX(0)', 
            opacity: '1' 
          },
        },
        'slide-down': {
          'from': { 
            transform: 'translateY(-20px)', 
            opacity: '0' 
          },
          'to': { 
            transform: 'translateY(0)', 
            opacity: '1' 
          },
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'scale-in': {
          'from': { 
            transform: 'scale(0.9)', 
            opacity: '0' 
          },
          'to': { 
            transform: 'scale(1)', 
            opacity: '1' 
          },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)'
          },
          '50%': {
            boxShadow: '0 0 40px rgba(34, 197, 94, 0.6)'
          },
        },
        'bounce-in': {
          '0%': {
            transform: 'scale(0.3)',
            opacity: '0'
          },
          '50%': {
            transform: 'scale(1.05)'
          },
          '70%': {
            transform: 'scale(0.9)'
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1'
          },
        },
        'rotate-slow': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 12px rgba(0, 0, 0, 0.12)',
        'large': '0 8px 24px rgba(0, 0, 0, 0.16)',
        'xl': '0 10px 40px rgba(0, 0, 0, 0.2)',
        '2xl': '0 20px 50px rgba(0, 0, 0, 0.25)',
        '3xl': '0 30px 60px rgba(0, 0, 0, 0.3)',
        'glow': '0 0 20px rgba(34, 197, 94, 0.3)',
        'glow-lg': '0 0 30px rgba(34, 197, 94, 0.5)',
        'glow-xl': '0 0 40px rgba(34, 197, 94, 0.7)',
        'inner-soft': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
        'inner-medium': 'inset 0 4px 8px rgba(0, 0, 0, 0.12)',
      },
      backdropBlur: {
        xs: '2px',
        '3xl': '64px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '104rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        '1000': '1000',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '2000': '2000ms',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #22c55e 0%, #14b8a6 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
      },
      blur: {
        '4xl': '128px',
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
      },
    },
  },
  plugins: [],
}
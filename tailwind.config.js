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
        'slide-in': 'slide-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'slide-in-right': 'slide-in-right 0.5s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'bounce-in': 'bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'shimmer': 'shimmer 2s infinite',
        'shimmer-strong': 'shimmer-strong 2s infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'pulse-scale': 'pulse-scale 2s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 0.6s ease-in-out infinite',
        'shake': 'shake 0.3s ease-in-out',
        'gradient': 'gradient-shift 3s ease infinite',
        'gradient-x': 'gradient-shift 3s ease infinite',
        'rotate': 'rotate-360 2s linear infinite',
        'scale-up': 'scale-up 0.3s ease-out',
      },
      keyframes: {
        'gentle-float': {
          '0%, 100%': { 
            transform: 'translateY(0) rotate(0deg)' 
          },
          '50%': { 
            transform: 'translateY(-15px) rotate(2deg)' 
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
        'slide-in-right': {
          'from': {
            transform: 'translateX(100%)',
            opacity: '0'
          },
          'to': {
            transform: 'translateX(0)',
            opacity: '1'
          }
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
        'fade-in-up': {
          'from': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          'to': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'fade-in-down': {
          'from': {
            opacity: '0',
            transform: 'translateY(-20px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'scale-in': {
          'from': { 
            transform: 'scale(0.95)', 
            opacity: '0' 
          },
          'to': { 
            transform: 'scale(1)', 
            opacity: '1' 
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
          }
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'shimmer-strong': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)'
          },
          '50%': {
            boxShadow: '0 0 40px rgba(34, 197, 94, 0.6)'
          },
        },
        'pulse-scale': {
          '0%, 100%': {
            transform: 'scale(1)'
          },
          '50%': {
            transform: 'scale(1.05)'
          }
        },
        'bounce-gentle': {
          '0%, 100%': {
            transform: 'translateY(0) scale(1)'
          },
          '50%': {
            transform: 'translateY(-8px) scale(1.05)'
          },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'rotate-360': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' }
        },
        'scale-up': {
          'from': { transform: 'scale(1)' },
          'to': { transform: 'scale(1.05)' },
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
        '9999': '9999',
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
        'ease-bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
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
        '105': '1.05',
      },
      gap: {
        '0.5': '2px',
        '1.5': '6px',
        '2.5': '10px',
        '3.5': '14px',
      },
      padding: {
        '0.5': '2px',
        '1.5': '6px',
        '2.5': '10px',
        '3.5': '14px',
      },
      opacity: {
        '15': '0.15',
        '35': '0.35',
        '65': '0.65',
        '85': '0.85',
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
      }
    },
  },
  plugins: [
    function ({ addUtilities, addComponents, theme }) {
      // Utility Classes
      addUtilities({
        '.line-clamp-1': {
          display: '-webkit-box',
          '-webkit-line-clamp': '1',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },
        '.line-clamp-2': {
          display: '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },
        '.line-clamp-3': {
          display: '-webkit-box',
          '-webkit-line-clamp': '3',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },
        '.gradient-text': {
          background: 'linear-gradient(135deg, #22c55e 0%, #14b8a6 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.glass': {
          background: 'rgba(255, 255, 255, 0.7)',
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-strong': {
          background: 'rgba(255, 255, 255, 0.9)',
          'backdrop-filter': 'blur(20px)',
          '-webkit-backdrop-filter': 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        },
        '.glow-green': {
          'box-shadow': '0 0 20px rgba(34, 197, 94, 0.5)',
        },
        '.glow-blue': {
          'box-shadow': '0 0 20px rgba(59, 130, 246, 0.5)',
        },
        '.glow-red': {
          'box-shadow': '0 0 20px rgba(239, 68, 68, 0.5)',
        },
        '.gpu-accelerated': {
          transform: 'translateZ(0)',
          'will-change': 'transform',
          'backface-visibility': 'hidden',
          '-webkit-perspective': '1000',
          perspective: '1000',
        },
        '.touch-action-manipulation': {
          'touch-action': 'manipulation',
        },
        '.safe-area-offset': {
          'padding-left': 'max(0px, env(safe-area-inset-left))',
          'padding-right': 'max(0px, env(safe-area-inset-right))',
          'padding-bottom': 'max(0px, env(safe-area-inset-bottom))',
        },
        '.hide-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        },
        '.text-balance': {
          'text-wrap': 'balance'
        },
        '.animation-delay-100': {
          'animation-delay': '100ms'
        },
        '.animation-delay-200': {
          'animation-delay': '200ms'
        },
        '.animation-delay-300': {
          'animation-delay': '300ms'
        },
        '.animation-delay-500': {
          'animation-delay': '500ms'
        },
      });

      // Component Classes
      addComponents({
        '.btn': {
          '@apply px-4 py-2 rounded-lg font-semibold transition-all duration-300 active:scale-95 touch-action-manipulation': {},
        },
        '.btn-primary': {
          '@apply bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600 shadow-lg hover:shadow-xl': {},
        },
        '.btn-secondary': {
          '@apply bg-gray-200 text-gray-700 hover:bg-gray-300': {},
        },
        '.card': {
          '@apply bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100 transition-all duration-300': {},
        },
        '.card-hover': {
          '@apply hover:shadow-2xl hover:-translate-y-1 hover:border-green-200': {},
        },
        '.input': {
          '@apply w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all': {},
        },
        '.badge': {
          '@apply inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold': {},
        },
        '.container-custom': {
          '@apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8': {},
        }
      });
    },
  ],
};
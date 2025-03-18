/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./client/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in-delayed': 'fadeIn 0.8s ease-in-out 0.3s both',
        'fade-in-staggered-1': 'fadeIn 0.5s ease-in-out 0.1s both',
        'fade-in-staggered-2': 'fadeIn 0.5s ease-in-out 0.2s both',
        'fade-in-staggered-3': 'fadeIn 0.5s ease-in-out 0.3s both',
        'fade-in-staggered-4': 'fadeIn 0.5s ease-in-out 0.4s both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
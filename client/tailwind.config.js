/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBg: '#07090e',
        darkCard: '#0d111d',
        darkCardHover: '#13192b',
        darkBorder: '#1c2438',
        neonPurple: '#a855f7',
        neonCyan: '#00e5ff',
        neonBlue: '#3b82f6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        handwriting: ['Caveat', 'cursive', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'border-spin': 'borderSpin 6s linear infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      boxShadow: {
        'neon-purple': '0 0 25px -5px rgba(168, 85, 247, 0.4)',
        'neon-cyan': '0 0 25px -5px rgba(0, 229, 255, 0.4)',
        'neon-blue': '0 0 25px -5px rgba(59, 130, 246, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
};

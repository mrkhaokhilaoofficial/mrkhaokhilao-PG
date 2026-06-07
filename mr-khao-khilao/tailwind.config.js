/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0D0D0D',
        'bg-secondary': '#161616',
        'bg-card': '#1A1A1A',
        'orange-primary': '#FF7A00',
        'orange-secondary': '#FFA726',
        'gold': '#FFD700',
        'muted': '#B3B3B3',
        'success': '#22C55E',
        'danger': '#EF4444',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-orange': 'linear-gradient(135deg, #FF7A00, #FFA726)',
      },
      boxShadow: {
        'orange-glow': '0 0 20px rgba(255, 122, 0, 0.4)',
        'gold-glow': '0 0 20px rgba(255, 215, 0, 0.3)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-orange': 'pulseOrange 2s ease-in-out infinite',
        'fire': 'fire 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        pulseOrange: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(255, 122, 0, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 122, 0, 0.7)' },
        },
        fire: {
          '0%': { transform: 'scaleY(1) scaleX(1)', opacity: '0.8' },
          '100%': { transform: 'scaleY(1.1) scaleX(0.95)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

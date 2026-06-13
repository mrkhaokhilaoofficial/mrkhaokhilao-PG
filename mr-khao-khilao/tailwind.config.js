/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0A0502', // Warmer cinematic black
        'bg-secondary': '#0F0906', // Warm deep brown-black
        'bg-card': '#140E0B', // Rich charcoal-brown card bg
        'orange-primary': '#D94B00', // Premium coppery orange
        'orange-secondary': '#E05300', // Rich warm coppery orange
        'gold': '#E5B13C', // Warm golden amber
        'muted': '#A69F9B', // Neutral warm muted gray
        'success': '#1E9E49', // Deep success green
        'danger': '#C23B22', // Deep warm crimson
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-orange': 'linear-gradient(135deg, #D94B00, #E05300)',
      },
      boxShadow: {
        'orange-glow': '0 0 8px rgba(217, 75, 0, 0.12)', // Reduced by 70%
        'gold-glow': '0 0 8px rgba(229, 177, 60, 0.1)', // Reduced by 70%
        'card': '0 4px 24px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-orange': 'pulseOrange 3s ease-in-out infinite',
        'fire': 'fire 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseOrange: {
          '0%, 100%': { boxShadow: '0 0 4px rgba(217, 75, 0, 0.1)' },
          '50%': { boxShadow: '0 0 10px rgba(217, 75, 0, 0.25)' },
        },
        fire: {
          '0%': { transform: 'scaleY(1) scaleX(1)', opacity: '0.85' },
          '100%': { transform: 'scaleY(1.04) scaleX(0.98)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

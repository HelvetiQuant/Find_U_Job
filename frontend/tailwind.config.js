/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        'neon-blue': '#00d4ff',
        'neon-purple': '#a855f7',
        'neon-pink': '#ff0080',
        'neon-yellow': '#ffcc00',
        'neon-green': '#00ff88',
        'neon-orange': '#ff6b35',
        'neon-red': '#ff3366',
        'dark-bg': '#0a0a1a',
        'card-bg': '#12122a',
        'card-bg-light': '#1a1a3e',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ff0080 100%)',
        'gradient-blue': 'linear-gradient(135deg, #00d4ff 0%, #6366f1 100%)',
        'gradient-yellow': 'linear-gradient(135deg, #ffcc00 0%, #ff6b35 100%)',
        'gradient-green': 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)',
        'gradient-purple': 'linear-gradient(135deg, #a855f7 0%, #ff0080 100%)',
        'gradient-red': 'linear-gradient(135deg, #ff3366 0%, #ff6b35 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0a0a1a 0%, #12122a 50%, #1a1a3e 100%)',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(99, 102, 241, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)',
        'neon-blue': '0 0 20px rgba(0, 212, 255, 0.5)',
        'neon-green': '0 0 20px rgba(0, 255, 136, 0.5)',
        'neon-yellow': '0 0 20px rgba(255, 204, 0, 0.5)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(168, 85, 247, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}

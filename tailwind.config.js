/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Orbitron', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        /* Neon Protocol / Daft Punk–coded palette */
        neon: {
          cyan: '#00f5ff',
          magenta: '#ff00ff',
          green: '#39ff14',
          red: '#ff3366',
          blue: '#0066ff',
          amber: '#ffb800',
        },
        chrome: {
          950: '#0a0a0f',
          900: '#0f0f18',
          800: '#1a1a2e',
          700: '#16213e',
          600: '#1f2b4d',
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 245, 255, 0.4), 0 0 40px rgba(0, 245, 255, 0.2)',
        'neon-magenta': '0 0 20px rgba(255, 0, 255, 0.4), 0 0 40px rgba(255, 0, 255, 0.2)',
        'neon-green': '0 0 20px rgba(57, 255, 20, 0.4), 0 0 40px rgba(57, 255, 20, 0.2)',
        'neon-red': '0 0 20px rgba(255, 51, 102, 0.4), 0 0 40px rgba(255, 51, 102, 0.2)',
        'glow-cyan': '0 0 15px rgba(0, 245, 255, 0.5)',
        'glow-magenta': '0 0 15px rgba(255, 0, 255, 0.5)',
      },
    },
  },
  plugins: [],
}

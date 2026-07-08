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
        primary: {
          DEFAULT: '#3B82F6', // Blue 500
          dark: '#2563EB',   // Blue 600
        },
        accent: {
          cyan: '#06B6D4',   // Cyan 500
          purple: '#8B5CF6', // Violet 500
        },
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        background: {
          light: '#FFFFFF',
          dark: '#0F172A',
        },
        card: {
          light: '#F8FAFC', // Slate 50
          dark: '#1E293B',  // Slate 800
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      }
    },
  },
  plugins: [],
}

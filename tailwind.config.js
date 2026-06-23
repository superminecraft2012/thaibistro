/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tb-dark': '#0c0514',
        'tb-card': '#180d28',
        'tb-card-hover': '#1e1133',
        'tb-gold': '#d4a843',
        'tb-gold-light': '#e8c76a',
        'tb-red': '#c23b22',
        'tb-red-hover': '#d44a2f',
        'tb-border': 'rgba(212,168,67,0.25)',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


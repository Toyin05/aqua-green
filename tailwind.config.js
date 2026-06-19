/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'emerald-deep': '#064E3B',
        'mint': '#10B981',
        'gold': '#F59E0B',
        'offwhite': '#F9FAFB'
      }
    },
  },
  plugins: [],
}
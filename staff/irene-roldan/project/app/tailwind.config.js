/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'major-mono': ['Major Mono Display', 'monospace']
      },
      colors: {
        'custom-black': '#222222',
        'custom-orange': '#FF9F6B',
        'custom-yellow': '#ffee99',
      },
    },
  },
  plugins: [],
}
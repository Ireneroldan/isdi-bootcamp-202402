/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'major-mono': ['Major Mono Display', 'monospace']
      }
    },
  },
  plugins: [],
}
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        webcolor: {
          50: '#4aa7c0'
        }
      },
      gridTemplateRows: {
        '9': 'repeat(9, minmax(0, 1fr))'
      },
    }
  },
  plugins: [],
}

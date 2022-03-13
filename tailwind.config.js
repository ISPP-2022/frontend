const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'gray-dark': '#273444',
      'gray': '#4a5b6c',
      'gray-100': '#f7fafc',
      'gray-200': '#edf2f7',
      'gray-300': '#e2e8f0',
      'gray-400': '#cbd5e0',
      'gray-500': '#a0aec0',
      'gray-600': '#718096',
      'white': '#ffffff',
      'black': '#000000',
      'blue-bondi': '#4AA7C0',
      'blue-bondi-dark': '#4190A6'
    },
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
  plugins: [
    require('flowbite/plugin')
  ],
}

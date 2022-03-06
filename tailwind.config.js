module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        '9': 'repeat(9, minmax(0, 1fr))'
      },
    }
  },
  plugins: [],
}

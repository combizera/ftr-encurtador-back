/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        blue: {
          base: '#2C46B1',
          dark: '#2C4091',
        },
        gray: {
          100: '#F9F9FB',
          200: '#E4E6EC',
          300: '#CDCFD5',
          400: '#74798B',
          500: '#4D505C',
          600: '#1F2025',
        },
        danger: '#B12C4D',
      },
    },
  },
  plugins: [],
}

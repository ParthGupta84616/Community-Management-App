/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xsm': '640px', // custom breakpoint at 640px
      },
      fontSize: {
        '2px': '8px', // custom font size
      },
    },
  },
  plugins: [],
}
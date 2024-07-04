/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

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
  plugins: [
    plugin(function({ addBase }) {
      addBase({
        '@media print': {
          '@page': {
            // size: 'A4',
            margin: '0',
          },
          'html, body': {
            // width: '210mm',
            // height: '297mm',
            margin: '0',
            padding: '0',
            // '-webkit-print-color-adjust': 'exact',
          },
          '@page :left': {
            size: 'A4 landscape',
          },
        },
      });
    }),
  ],
}

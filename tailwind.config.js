/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '4.5': '18px',
      },
      borderWidth: {
        '1': '0.05px', // Define custom border width
      },
      screens: {
        'xsm': '640px', // custom breakpoint at 640px
      },
      fontSize: {
        '2px': '8px', // custom font size
      },
      width: {
        'custom-1/12': '12%',
        'custom-1/15': '15%', // Custom width for 1/12
        'custom-full': '100%',
        'custom-10.5': '14rem',
        'custom-10': '13rem',
        'custom-6': '10.0rem',
        'custom-8': '12.25rem',
        
        // 'custom-10.5': '10rem',
          // Custom full width
      },
    },
  },
  plugins: [
    plugin(function({ addBase }) {
      addBase({
        '@media print': {
          
          '@page': {
            margins: "None",
            size: 'landscape',
          },
          'html, body': {
            // width: '210mm',
            // height: '297mm',
            margin: '0',
            padding: '0',
            // '-webkit-print-color-adjust': 'exact',
          },
          '@page :left': {
            size: 'landscape',
          },
          '.border-t-1': {
            borderTopWidth: '5px', // Ensure this matches your custom border width
          },
          '.border-1': {
            borderWidth: '0.5px', // Ensure this matches your custom border width
          },
        },
      });
    }),
  ],
}

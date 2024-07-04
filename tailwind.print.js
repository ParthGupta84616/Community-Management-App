const plugin = require('tailwindcss/plugin');

module.exports = plugin(function({ addBase }) {
  addBase({
    '@media print': {
      '@page': {
        size: 'landscape',
      },
    },
  });
});

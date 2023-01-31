/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        main_color: '#ed775a',
        main_color_hover: '#d06a51',
        main_color_light: '#f2a08c',
        border_color: 'slate-200',
      },

      screens: {
        xs: { min: '500px', max: '640px' },
        '2xs': { min: '370px', max: '500px' },
        '3xs': { min: '250px', max: '370px' },
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};

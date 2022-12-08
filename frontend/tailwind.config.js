/** @type {import('tailwindcss').Config} */
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
      keyframes: {
        appearSmoothLeft: {
          '0%': { width: '0%' },
          '50%': { width: '50vw' },
          '100%': { width: '100vw' },
        },
        disappearSmoothLeft: {
          '0%': { width: '65%' },
          '50%': { width: '35%' },
          '100%': { width: '0%' },
        },
        appearAfter: {
          '0%': { opacity: '0' },
          '0%': { opacity: '0' },
          '80%': { opacity: '0' },
          '90%': { opacity: '0.3' },
          '95%': { opacity: '0.6' },
          '100%': { opacity: '1' },
        },
        screens: {
          xs: '500px',
          xxs: '400px',
        },
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};

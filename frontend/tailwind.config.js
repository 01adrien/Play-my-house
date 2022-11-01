/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main_color: "#ed775a",
        main_color_hover: "#d06a51",
        main_color_light: "#f2a08c",
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
};

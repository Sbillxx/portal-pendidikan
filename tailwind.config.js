/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
const { nextui } = require("@nextui-org/react");
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff0f0",
          100: "#ffdddd",
          200: "#ffc0c0",
          300: "#ff9494",
          400: "#ff5757",
          500: "#ff2323",
          600: "#ec0000",
          700: "#d70000",
          800: "#b10303",
          900: "#920a0a",
          950: "#500000",
        },
        idi: {
          50: "#fdf6ee",
          100: "#f9e8d0",
          200: "#f2cfa0",
          300: "#e9af68",
          400: "#e19040",
          500: "#d87422",
          600: "#bb5b18",
          700: "#994416",
          800: "#5c2a0e",
          900: "#3d1b09",
          950: "#200e04",
        },
        pesantrenGreen: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
      },
      fontFamily: {
        Montserrat: "Montserrat",
      },
    },
  },

  plugins: [nextui(), flowbite.plugin()],
};

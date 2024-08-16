/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        azul: "#1B80BF",
        naranja: "#F28627",
        carne: "#F2AB6D",
        rojasio: "#F2522E",
        blanco: "#F2F2F2",
        negro: "#151515"
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        breeSerif: ["Bree Serif", "serif"]
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}


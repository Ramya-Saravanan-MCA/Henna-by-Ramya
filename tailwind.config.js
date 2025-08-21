/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slateCustom: '#6B7280',
        warmTaupe: '#A89CA5',       
        mutedGold: '#B89D4F',
        mocha: '#7B5E57',
        plum: '#5B3A60',
        blush: '#F4C2C2',
        beige: '#F5ECE4',
        primary: "#ffcf3a",
        secondary: "#0063ff",
      },
      container:{
        center:true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: " 4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
    },
  },
  plugins: [],
};

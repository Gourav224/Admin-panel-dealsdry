/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,}",
  ],
  theme: {
    extend: {
      colors: {
        customOrange: '#FD661F',
        customblue: '#c1c5f2',
        blueSade: "FFFFFF",
      },
    },
  },
  plugins: [],

}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
    skyBg: '#C5E4E7',
    textHeader: '#3D6666',
    lightGray: '#5E7A7D',
    lightGrayIcons: '#9EBBBD',
    darkGreen: '#00474B',
    lightGreen: '#26C2AE',
    white: '#ffffff',
    black: '#000000',
    inputBg: '#F3F9FA',
    textRed:'#ff0909',
    },
    extend: {},
  },
  plugins: [],
}


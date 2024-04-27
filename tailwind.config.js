/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        teal: {
          DEFAULT: '#27A98B',
          dark: '#1e8068',
          light: '#3cbba1'
        },
        offwhite: '#F2EEEE'
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [],
}


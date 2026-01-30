/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs',
    './public/js/**/*.js'

  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
    extend: {
      colors: {
        primary:"gray",
        secondary:'purple',
        NeutralLight: 'violet',
      },
    },
  },
  plugins: [],
}


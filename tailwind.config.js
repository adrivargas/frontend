export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  // tailwind.config.js
theme: {
  extend: {
    colors: {
      empanada: {
        50: '#fff8e1',
        100: '#ffecb3',
        200: '#ffe082',
        300: '#ffd54f',
        400: '#ffca28',
        500: '#ffc107', // principal (dorado)
        600: '#ffb300',
        700: '#ffa000',
        800: '#ff8f00',
        900: '#ff6f00',
      },
      rojo: '#b71c1c', // para títulos
      crema: '#fef6e4',
    },
    fontFamily: {
      sans: ['"Poppins"', 'sans-serif'],
    },
  },
},
  plugins: [],
};

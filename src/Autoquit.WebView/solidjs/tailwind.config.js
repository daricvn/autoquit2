module.exports = {
  purge: [ './index.html', './src/**/*.{js,ts,jsx,tsx}' ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      rotate: [ 'group-hover' ],
    },
  },
  plugins: [],
}

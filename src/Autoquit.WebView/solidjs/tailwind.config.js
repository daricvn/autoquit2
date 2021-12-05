module.exports = {
  purge: {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    safelist: [ 'bg-blue-500', 
                'border-blue-500', 
                'bg-pink-400', 
                'border-pink-500', 
                'bg-pink-500',
                'border-pink-500',
                'bg-green-600',
                'border-green-600',
                'bg-yellow-500',
                'bg-yellow-600',
                'border-yellow-500',
                'border-yellow-600',
                'bg-purple-500',
                'bg-purple-600',
                'border-purple-500',
                'border-purple-600',
                'bg-red-700',
                'bg-red-400',
                'border-red-700',
                'border-red-400',
              ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      rotate: [ 'group-hover', 'hover' ],
    },
  },
  plugins: [],
}

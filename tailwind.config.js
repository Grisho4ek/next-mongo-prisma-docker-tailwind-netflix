/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        zoomIn: 'zoomIn 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        zoomOut: 'zoomOut 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      keyframes: {
        zoomOut: {
          '0%': {
            scale: '100%',
          },
          '100%': {
            scale: 0,
          },
        },
        zoomIn: {
          '0%': {
            scale: 0,
          },
          '100%': {
            scale: '100%',
          },
        },
      },
    },
  },
  plugins: [],
};

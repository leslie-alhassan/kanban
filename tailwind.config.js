/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mainBackgroundColor: '#1a1a1a',
        columnBackgroundColor: '#161c22',
      },
    },
  },
  plugins: [],
};

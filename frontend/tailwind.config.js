/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily:{
        'one': 'Kanit, sans-serif',
        'two': 'Source Code Pro, monospace',
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'main-green': '#4bbd7f',
      'main-red': '#e11d48', // rose-600 in tailwind
      'main-bg': '#252525',
      'second-bg': '#1e1e1e',
      'third-bg': '#313131',
      'main-text': "#efefef",
      'second-text' : '#161616'
    },
  },

  plugins: [],
}


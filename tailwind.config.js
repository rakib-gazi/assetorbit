const flowbite = require("flowbite-react/tailwind")
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
      },
      colors: {
        'nav': '#16404D',
        'btn': '#FBF5DD',
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    require('daisyui'),
    require('preline/plugin'),
  ],
}


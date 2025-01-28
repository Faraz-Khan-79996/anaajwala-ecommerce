/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        edu: ['"Edu VIC WA NT Beginner"', 'sans-serif'],
        lilita: ['"Lilita One"', 'sans-serif'],
        oswald: ['"Oswald"', 'sans-serif'],
        varela : ['"Varela Round"' , 'sans-serif'],
        fredoka: ['Fredoka']
      },

      colors: {
        primary: {
          light: '#E0F7FA',
          DEFAULT: '#00BCD4',
          dark: '#008394',
        },
        primary2: {
          light: '#FFF3E0',
          DEFAULT: '#FF9800',
          dark: '#F57C00',
        },
        secondary: {
          light: '#E8F5E9',
          DEFAULT: '#4CAF50',
          dark: '#388E3C',
        },
        secondary2: {
          light: '#F3E5F5',
          DEFAULT: '#9C27B0',
          dark: '#7B1FA2',
        },
        neutral: {
          light: '#FAFAFA',
          DEFAULT: '#9E9E9E',
          dark: '#616161',
        },
        // Add more palettes as needed
      },
    },
  },

  plugins: [
    require('@tailwindcss/line-clamp'),
    flowbite.plugin(),
  ],
}


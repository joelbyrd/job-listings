/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        red: "#f00",
        teal: {
          light: "hsl(180, 52%, 96%)",
          DEFAULT: "hsl(180, 29%, 50%)",
          dark: "hsl(190, 26%, 25%)", // Header background
          darker: "hsl(190, 22%, 15%)", // Primary background
        },
        gray: {
          lightest: "hsl(0, 0%, 98%)",
          lighter: "hsl(180, 15%, 75%)",
          light: "hsl(180, 31%, 95%)",
          DEFAULT: "hsl(180, 8%, 52%)",
          dark: "hsl(190, 22%, 20%)", // Card background
          darker: "hsl(190, 15%, 32%)", // Border/Separator
        },
      },
      fontSize: {
        base: "15px",
        xxs: "0.625rem", // 10px
        xxxs: "0.5rem", // 8px
      },
      fontFamily: {
        heading: ['"League Spartan"', "sans-serif"],
      },
      container: {
        center: true,
        screens: {
          sm: "100%", // Full width for small screens
          md: "768px", // 768px for medium screens and above
        },
      },
      backgroundImage: {
        "header-desktop": "url('/images/bg-header-desktop.svg')",
        "header-mobile": "url('/images/bg-header-mobile.svg')",
      },
    },
  },
  plugins: [],
};

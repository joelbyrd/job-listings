/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: {
          light: "hsl(180, 52%, 96%)",
          DEFAULT: "hsl(180, 29%, 50%)",
        },
        gray: {
          light: "hsl(180, 31%, 95%)",
          DEFAULT: "hsl(180, 8%, 52%)",
          dark: "hsl(180, 14%, 20%)",
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

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
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
  },
  plugins: [],
};

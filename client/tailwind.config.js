/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        md: "8rem",
        lg: "10rem",
      },
    },
    extend: {},
  },
  plugins: [],
};

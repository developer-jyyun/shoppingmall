/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "rgb(234 88 12);",
        sub: "#f75c58",
      },
      backgroundImage: {
        banner: `url('../public/images/main.jpg')`,
      },
      backgroundColor: {
        "main-bg-color": "#0f100b",
        "bg-btn": "#0f100b",
      },
    },
  },
  plugins: [],
};

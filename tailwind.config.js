/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1890ff",
        "blue--dark": "#335aa1",
        "blue--light": "#f5faff",
        "white--hover": "#0000001a",
        border: "#d1d1d8",
        shadow: "#00000040",
      },
    },
  },
  plugins: [],
};

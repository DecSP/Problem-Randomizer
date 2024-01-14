/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1890ff',
        'blue--dark': '#335aa1',
        'blue--light': '#f5faff',
        'white--hover': '#0000001a',
        border: '#d1d1d8',
        shadow: '#00000040',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0.3' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.25s ease-in-out',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'purple': '#e90df3',
      'white': '#f1f1f1',
      'background': '#171717',
      'black': "#000",
      'gray': '#475569',
      "blue": "#248AE9",
      "red": "#ef4444",
    },
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
};


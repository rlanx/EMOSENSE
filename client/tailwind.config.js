/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "sea-blue": "#5BC0BE",
        "green-pastel": "#8ECAE6",
        "lavender-purple": "#B3A1E6",
        bage: "#F7F3E9",
        grey: "#333333",
        "light-grey": "#555555",
        "peach-orange": "#FF6F61",
      },
    },
  },
  plugins: [],
};

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "primary-dark-200": "#0ca678",
      "primary-dark-400": "#099268",
      "primary-dark-700": "#087f5b",
      "secondary-dark-200": "#495057",
      "secondary-dark-400": "#343a40",
      "secondary-dark-700": "#212529",
      "primary-light-200": "#f76707",
      "primary-light-400": "#e8590c",
      "primary-light-700": "#d9480f",
      "secondary-light-200": "#495057",
      "secondary-light-400": "#343a40",
      "secondary-light-700": "#212529",
    },
    fontFamily: {
      sans: ["Noto Sans", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {},
  },
  plugins: [],
};

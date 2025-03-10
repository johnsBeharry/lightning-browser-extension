const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./src/app/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("@tailwindcss/forms")],
  theme: {
    extend: {
      animation: {
        "spin-fast": "spin 0.7s linear infinite",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xxxs: ".5rem",
        xxs: ".625rem",
      },
      colors: {
        "orange-bitcoin": "#f7931a",
        "orange-bitcoin-h": "#f68b0a",
        "red-bitcoin": "#eb5757",
        "green-bitcoin": "#27ae60",
        "blue-bitcoin": "#2d9cdb",
        "purple-bitcoin": "#bb6bd9",
      },
    },
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: "0.375rem",
        sm: "0.125rem",
        md: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "retro",
      "cyberpunk",
      "valentine",
      "aqua",
      "dracula",
      "corporate",
      "synthwave",
      "halloween",
      "garden",
      "forest",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "business",
      "night",
      "coffee",
      "winter",
    ],
  },
};

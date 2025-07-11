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
      {
        a11yDark: {
          primary: "#ff7ac6",
          secondary: "#bf95f9",
          accent: "#bf95f9",
          neutral: "#2b2b2b",
          "base-100": "#2b2b2b",
          "base-200": "#1e1e1e",
          "base-300": "#141414",
          info: "#00b3f0",
          success: "#00d69f",
          warning: "#ffb86c",
          error: "#ff5555",
        },
        a11yLight: {
          primary: "#2b2b2b",
          secondary: "#2b2b2b",
          accent: "#2b2b2b",
          neutral: "#2b2b2b",
          "base-100": "#fefefe",
          "base-200": "#e6e6e6",
          "base-300": "#d4d4d4",
          info: "#0000ff",
          success: "#008000",
          warning: "#ffff00",
          error: "#ff0000",
        },
        anOldHope: {
          primary: "#c678dd",
          secondary: "#56b6c2",
          accent: "#98c379",
          neutral: "#282c34",
          "base-100": "#282c34",
          "base-200": "#21252b",
          "base-300": "#1a1d23",
          info: "#61afef",
          success: "#98c379",
          warning: "#e5c07b",
          error: "#e06c75",
        },
        androidstudio: {
          primary: "#a9b7c6",
          secondary: "#6a8759",
          accent: "#cc7832",
          neutral: "#2b2b2b",
          "base-100": "#2b2b2b",
          "base-200": "#1e1e1e",
          "base-300": "#141414",
          info: "#6897bb",
          success: "#6a8759",
          warning: "#bbb529",
          error: "#bc3f3c",
        },
        atomOneDark: {
          primary: "#c678dd",
          secondary: "#56b6c2",
          accent: "#98c379",
          neutral: "#282c34",
          "base-100": "#282c34",
          "base-200": "#21252b",
          "base-300": "#1a1d23",
          info: "#61afef",
          success: "#98c379",
          warning: "#e5c07b",
          error: "#e06c75",
        },
        atomOneLight: {
          primary: "#a626a4",
          secondary: "#0184bc",
          accent: "#50a14f",
          neutral: "#fafafa",
          "base-100": "#fafafa",
          "base-200": "#f0f0f0",
          "base-300": "#e6e6e6",
          info: "#0184bc",
          success: "#50a14f",
          warning: "#c18401",
          error: "#e45649",
        },
        dracula: {
          primary: "#ff79c6",
          secondary: "#bd93f9",
          accent: "#ffb86c",
          neutral: "#282a36",
          "base-100": "#282a36",
          "base-200": "#1e1f29",
          "base-300": "#14151f",
          info: "#8be9fd",
          success: "#50fa7b",
          warning: "#ffb86c",
          error: "#ff5555",
        },
        github: {
          primary: "#0366d6",
          secondary: "#6f42c1",
          accent: "#28a745",
          neutral: "#24292e",
          "base-100": "#ffffff",
          "base-200": "#f6f8fa",
          "base-300": "#e1e4e8",
          info: "#0366d6",
          success: "#28a745",
          warning: "#ffa500",
          error: "#d73a49",
        },
        monokai: {
          primary: "#f92672",
          secondary: "#a6e22e",
          accent: "#fd971f",
          neutral: "#272822",
          "base-100": "#272822",
          "base-200": "#1e1f1c",
          "base-300": "#141511",
          info: "#66d9ef",
          success: "#a6e22e",
          warning: "#fd971f",
          error: "#f92672",
        },
        nord: {
          primary: "#88c0d0",
          secondary: "#81a1c1",
          accent: "#5e81ac",
          neutral: "#2e3440",
          "base-100": "#2e3440",
          "base-200": "#3b4252",
          "base-300": "#434c5e",
          info: "#8fbcbb",
          success: "#a3be8c",
          warning: "#ebcb8b",
          error: "#bf616a",
        },
        solarizedDark: {
          primary: "#268bd2",
          secondary: "#2aa198",
          accent: "#859900",
          neutral: "#002b36",
          "base-100": "#002b36",
          "base-200": "#073642",
          "base-300": "#0c4b5c",
          info: "#268bd2",
          success: "#859900",
          warning: "#b58900",
          error: "#dc322f",
        },
        solarizedLight: {
          primary: "#268bd2",
          secondary: "#2aa198",
          accent: "#859900",
          neutral: "#fdf6e3",
          "base-100": "#fdf6e3",
          "base-200": "#eee8d5",
          "base-300": "#93a1a1",
          info: "#268bd2",
          success: "#859900",
          warning: "#b58900",
          error: "#dc322f",
        },
        tomorrowNight: {
          primary: "#c5c8c6",
          secondary: "#b294bb",
          accent: "#81a2be",
          neutral: "#1d1f21",
          "base-100": "#1d1f21",
          "base-200": "#282a2e",
          "base-300": "#373b41",
          info: "#81a2be",
          success: "#b5bd68",
          warning: "#f0c674",
          error: "#cc6666",
        },
        vs2015: {
          primary: "#569cd6",
          secondary: "#4ec9b0",
          accent: "#9cdcfe",
          neutral: "#1e1e1e",
          "base-100": "#1e1e1e",
          "base-200": "#252526",
          "base-300": "#2d2d2d",
          info: "#569cd6",
          success: "#6a9955",
          warning: "#dcdcaa",
          error: "#f44747",
        },
      },
    ],
  },
};

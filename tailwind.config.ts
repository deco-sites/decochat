import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    fontFamily: {
      sans: ["Switzer", "system-ui", "sans-serif"],
    },
    extend: {
      animation: {
        "fade-up": "fadeUp 0.5s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      colors: {
        "dc": {
          "50": "#fcfbf6",
          "100": "#f3f1e7",
          "200": "#dedbc9",
          "300": "#c4c1b1",
          "400": "#a2a1a0",
          "500": "#8a8a8a",
          "600": "#707070",
          "700": "#575757",
          "800": "#3d3d3d",
          "900": "#262626",
          "950": "#1a1a1a",
        },
        "primary": {
          "light": "#D0EC1A",
          "dark": "#07401A",
        },
        "purple": {
          "light": "#A595FF",
          "dark": "#151042",
        },
        "yellow": {
          "light": "#FFC116",
          "dark": "#392B02",
        },
      },
    },
  },
};

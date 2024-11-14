const plugin = require("tailwindcss/plugin");
module.exports = {
  darkMode: "selector",
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".dark": {
          backgroundColor: "#111113",
        },
        ".displayOutputDark": {
          color: "white",
        },
        ".calculateContainerDark": {
          backgroundColor: "#33363D",
        },
        ".darkModeContainer": {
          backgroundColor: "#4b5563",
          color: "#cbd5e1",
        },
        ".darkModeButtons": {
          backgroundColor: "#374151",
          color: "white",
          boxShadow: "4px 8px 8px rgba(0,0,0,.1)",
        },
        ".operationButtonsDark": {
          boxShadow: "4px 8px 8px rgba(0,0,0,.1)",
        },
        ".firstRowOperationsDark": {
          backgroundColor: "#6b7280",
          color: "white",
        },
      });
    }),
  ],
};

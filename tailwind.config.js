module.exports = {
  content: ["./index.html", "./js/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        bordin: {
          primary: "#29196d",
          secondary: "#4f14ff",
          accent: "#00adff",
          neutral: "#f1edff",
          "base-100": "#ffffff",
          // outas chaves que você precise...
        },
      },
    ],
  },
};

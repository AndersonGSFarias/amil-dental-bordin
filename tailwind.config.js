module.exports = {
  content: ["./index.html", "./js/**/*.js"],
  theme: {
    extend: {
      // Você também pode adicionar a fonte aqui, se desejar
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {},
};

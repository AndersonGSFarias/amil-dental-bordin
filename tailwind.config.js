module.exports = {
  content: ["./index.html", "./js/**/*.js"],
  theme: {
    extend: {
      // Adicione a seção de cores aqui
      colors: {
        "bordin-primary": "rgb(66, 42, 213)",
        "bordin-secundary": "rgb(79, 20, 255)",
        "bordin-third": "rgb(241, 237, 255)",
        "bordin-fourth": "rgb(0, 173, 255)",
        "font-bordin-primary": "rgb(255, 255, 255)",
        "font-bordin-secundary": "rgb(110, 110, 110)",
        "dot-primary": "rgba(208, 208, 208)",
      },
      // Você também pode adicionar a fonte aqui, se desejar
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {},
};

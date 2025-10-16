module.exports = {
  // Aponte para todos os arquivos HTML e JS dentro da pasta 'src'
  content: ["./src/**/*.{html,js}", "./dist/index.html"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {},
};

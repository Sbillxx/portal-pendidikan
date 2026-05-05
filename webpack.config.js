module.exports = {
  // konfigurasi lainnya
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      // aturan lain untuk file JS, gambar, dll.
    ],
  },
  
};

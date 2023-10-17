const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.js",
    faq: "./src/pages/FAQ/index.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "faq.html",
      template: "./src/pages/FAQ/index.html",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
  },
};

/*
 * Copyright (c) 2017, Jon McClure <interactives@politico.com>
 *
 * License: MIT
 */
const webpack = require('webpack');

module.exports = {
  entry: [
    "./demo/main.js"
  ],
  output: {
    path: __dirname,
    publicPath: "/",
    filename: "demo/bundle.js"
  },
  devtool: "source-map",
  devServer: {
    inline: true,
    contentBase: "./"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
    loaders: [
      {
        exclude: /node_modules/,
        loader: "babel"
      },
      {
        test: /\.json$/,
        loader: "json"
      },
    ],
    plugins: [
      new webpack.ProvidePlugin({
        'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
      }),
    ],
  }
};

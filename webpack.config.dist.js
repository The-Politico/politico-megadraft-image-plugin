/*
 * Copyright (c) 2017, Jon McClure <interactives@politico.com>
 *
 * License: MIT
 */
const webpack = require('webpack');

module.exports = {
  entry: [
    "."
  ],
  output: {
    path: "./dist",
    publicPath: "/dist/",
    filename: "politico-megadraft-image-plugin.js",
    library: "politico-megadraft-image-plugin",
    libraryTarget: "umd"
  },
  externals: {
    "megadraft": "Megadraft",
    "react": "React",
    "react-dom": "ReactDOM"
  },
  devtool: "source-map",
  devServer: {
    inline: true,
    contentBase: "./"
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: "babel"
      },
      {
        test: /\.json$/,
        loader: "json"
      }
    ]
    plugins: [
      new webpack.ProvidePlugin({
        'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
      }),
    ],
  }
};

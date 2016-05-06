var path = require('path');

module.exports = {
  entry: "./entry.js",
  output: {
    path: __dirname,
    filename: "./public/[name].min.js",
    chunkFilename: "[id].js"
  },
  eslint: {
    configFile: '.eslintrc.json'
  },
  devtool: 'source-map',
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
        exclude: /node_modules/,
        include: __dirname
      }
    ],
    loaders: [
      {test: /\.css$/, loader: "style!css"},
      {test: /\.js$/, loaders: ['babel'], exclude: /node_modules/, include: __dirname}
    ]
  }
};
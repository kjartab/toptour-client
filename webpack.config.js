'use strict';

const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');

var config = {
  context: __dirname + '/src', // `__dirname` is root of project and `src` is source
  entry: {
    app: './app.js',
  },
  plugins: [
    new DashboardPlugin()
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    publicPath: "/assets",
  },
  module: {
    rules: [
      { 
        test: /\.jsx?$/,  //Check for all js files
        use: [{
          // exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          options: { presets: ['react', 'es2015'] }
        }]
      },
      {
        test: /\.(sass|scss)$/, //Check for sass or scss file names
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      { 
        test: /\.json$/, 
        loader: "json-loader"  //JSON loader
      }
    ]
  },
  //To run development server
  devServer: {
    contentBase: path.resolve(__dirname, './src'),  // New
  },

  devtool: "eval-source-map" // Default development sourcemap
};


// Check if build is running in production mode, then change the sourcemap type
if (process.env.NODE_ENV === "production") {
  config.devtool = "source-map";

  // Can do more here
  // JSUglify plugin
  // Offline plugin
  // Bundle styles seperatly using plugins etc,
}

module.exports = config;
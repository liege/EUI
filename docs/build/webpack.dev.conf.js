var path = require('path');
var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var baseWebpackConfig = require('./webpack.base.conf')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var FixInvalidBase64 = require('./plugins/webpack-fix-invalid-base64');

var config = require('./config')
var utils = require('./utils')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./hot-reload'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap
    })
  },
  // cheap-module-eval-source-map is faster for development
  // devtool: '#cheap-module-eval-source-map',
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
    new FixInvalidBase64()
  ]
})

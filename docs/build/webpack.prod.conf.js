var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('./config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin');

var WebpackArrangeTemplate = require('./plugins/webpack-arrange-template');

var env = config.build.env
const PLACEHOLDERQUERYSTRING = config.build.placeholderQueryString;

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  // devtool: config.build.productionSourceMap ? '#cheap-source-map' : false,
  devtool: false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath(
      `js/[name].[chunkhash:7].js${PLACEHOLDERQUERYSTRING || ''}`
    ),
    chunkFilename: utils.assetsPath(
      `js/chunks/[id].[chunkhash:7].js${PLACEHOLDERQUERYSTRING}`
    )
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),

    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath(
        `css/[name].[contenthash:7].css${PLACEHOLDERQUERYSTRING}`
      ),
      allChunks: true
    }),

    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),

    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: config.build.template,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        // removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    new WebpackArrangeTemplate(),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ]
})

module.exports = webpackConfig

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    dll: [
      'react',
      'react-dom',
      'react-router',
      'urijs',
      'lodash',
      'isomorphic-fetch',
      'babel-polyfill',
      'async',
      'immutable',
      'js-cookie',
      'zeroclipboard',
      'moment',
      'es6-promise'
    ]
  },

  output: {
    library: '[name]',
    filename: '[name].js',
    path: path.resolve(__dirname, '../assets')
  },

  plugins: [
    new webpack.DefinePlugin({
      'process': {
        'ENV': JSON.stringify('production'),
        'env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }
    }),

    new webpack.DllPlugin({
      name: '[name]',
      context: path.resolve( __dirname, '../static'),
      path: path.resolve(
        __dirname, '../assets/[name].manifest.json'
      )
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),

    new webpack.ContextReplacementPlugin(
      /moment[\\\/]locale$/,
      /^\.\/(zh-cn)$/
    )
  ]
};

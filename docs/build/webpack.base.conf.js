var os = require('os');
var path = require('path');
var utils = require('./utils');
var config = require('./config');
var webpack = require('webpack');
var HappyPack = require('happypack');

const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length / 2
});

// webpack 入口文件所在目录
const STATIC_ROOT_DIR = path.resolve(
  __dirname, '../static'
);

const {
  BUILD_ENV,
  BUILD_PROJECT
} = process.env;

// url-loader limit参数, 生产环境始终转存为文件(100MB)，开发环境始终使用base64
const URL_LOADER_LIMIT = process.env.NODE_ENV === 'production'
  ? 1 : 104857600;

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: path.resolve(
      STATIC_ROOT_DIR, 'js/index.js'
    )
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              modules: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: false
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=babel',
        include: [
          resolve('static')
        ],
        exclude: /(node_modules)|(third-party\/es5)/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: URL_LOADER_LIMIT,
          name: function(file) {
            file = path.dirname(
              file.replace(new RegExp(`${STATIC_ROOT_DIR}\/\\w+\/`, 'gi'), '')
            );
            return `img/${file}/[name].[hash:7].[ext]`;
          }
        }
      },
      {
        test: /\.(swf|mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: URL_LOADER_LIMIT,
          name: utils.assetsPath(
            'media/[name].[hash:7].[ext]'
          )
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: URL_LOADER_LIMIT,
          name: utils.assetsPath(
            'fonts/[name].[hash:7].[ext]'
          )
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        include: [
          resolve('static')
        ],
        options: {
          attrs: false,
          minimize: true,
          removeComments: true,
          collapseWhitespace: true
        }
      }
    ]
  },

  plugins: [
    new webpack.DllReferencePlugin({
      name: 'dll',
      context: path.resolve(__dirname, '../static'),
      manifest: require(path.resolve(
        __dirname, '../assets/dll.manifest.json')
      )
    }),
    
    // happypack plugin
    new HappyPack({
      id: 'babel',
      verbose: false,
      threadPool: happyThreadPool,
      loaders: ['babel-loader?cacheDirectory=true']
    }),

    new HappyPack({
      id: 'eslint',
      verbose: false,
      threadPool: happyThreadPool,
      loaders: [{
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter'),
          ignorePath: path.resolve(__dirname, '../.eslintignore')
        }
      }]
    })
  ]
};

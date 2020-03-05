const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const NunjucksWebpackPlugin = require('nunjucks-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const pages = require('./scripts/utils/build')

module.exports = (env) => {
  const devMode = !env || !env.production

  return {
    mode: devMode ? 'development' : 'production',

    // Does this actually work?
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        '~': path.resolve(__dirname, 'src/scripts/'),
      },
    },

    // Can I automate chunks output?
    entry: {
      app: './scripts/app.js',
      style: './style.scss',
      vendor: './scripts/vendor.js',
      home: './scripts/home.js',
      test: './scripts/test.js',
    },

    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'scripts/[name].js',
    },

    module: {
      rules: [{
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },

      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: [
            '@babel/preset-env',
          ],
        },
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        }],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        }],
      },
      ],
    },
    stats: {
      colors: true,
    },
    devtool: 'source-map',
    plugins: [
      ...pages.generate(path.resolve(__dirname, './templates/pages')),

      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),

      new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        server: {
          baseDir: ['dist'],
        },
      }),
      new ExtraWatchWebpackPlugin({
        dirs: ['templates'],
      }),
      new CopyWebpackPlugin([
        // copyUmodified is true because of https://github.com/webpack-contrib/copy-webpack-plugin/pull/360
        {
          from: 'assets/**/*',
          to: '.',
        },
        {
          from: 'static/',
          to: '.',
        },

      ], {
        copyUnmodified: true,
      }),
      new CleanWebpackPlugin(),
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          sourceMap: true,
          parallel: true,
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            map: {
              inline: false,
            },
          },
        }),
      ],
    },
  }
}

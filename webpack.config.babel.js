import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default {

  context: path.join(__dirname, 'src'),

  entry: {
    'app': './js/app.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },

  resolve: {
    extensions: ['', '.js']
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      },
      {
        test: /\.svg/,
        loader: 'url-loader',
        include: [/media/]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      cache: false
    }),

    new ExtractTextPlugin('style.css', {
      allChunks: true
    }),

    new webpack.optimize.UglifyJsPlugin({
        compressor: { warnings: false }
    }),

    new CopyWebpackPlugin([
      { from: 'CNAME' },
      { from: 'robots.txt' }
    ])
  ]

};
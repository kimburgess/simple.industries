import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  output: {
    filename: 'app.js',
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
        loader: ExtractTextPlugin.extract('css')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css', {
      allChunks: true
    })
  ],
  resolve: {
    extensions: ['', '.js']
  }
};
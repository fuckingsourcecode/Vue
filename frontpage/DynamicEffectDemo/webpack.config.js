var webpack = require('webpack')

module.exports = {
  entry: './index.js',
  output: {
    path: './static/js',
    publicPath: '/static/js/',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
        loader: 'babel'
      },{
        test: /.(png|jpg)$/, 
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  devtool: 'source-map',
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  }
}

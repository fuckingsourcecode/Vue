var webpack = require('webpack');
module.exports = {
    entry: './src/main.js',
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ],
    output: {
        path: './static/js',
        publicPath: '/static/js/',
        filename: 'build.js'
    },
    module: {
        // avoid webpack trying to shim process
        noParse: /es6-promise\.js$/,
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            // excluding some local linked packages.
            // for normal use cases only node_modules is needed.
            exclude: /node_modules|vue\/dist|vue-router\/|vue-resource\/|vue-loader\/|vue-hot-reload-api\//,
            loader: 'babel'
        }, {
            test: /\.jpg$/,
            loader: 'file-loader'
        }, {
            test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/,
            loader: 'url-loader?limit=5000'
        }]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    }
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
} else {
    module.exports.devtool = '#source-map'
}

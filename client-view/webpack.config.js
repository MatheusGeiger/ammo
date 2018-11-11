// Import


const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PORT = process.env.PORT || 3002;
// Export

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: __dirname + '/public',
        filename: './bundle.js'
    },
    devServer: {
        host: '0.0.0.0',
        port: PORT,
        contentBase: './public',
        historyApiFallback: true
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            modules: __dirname + '/node_modules'
        }
    },
    plugins: [ 
        new ExtractTextPlugin('app.css'),
        new webpack.EnvironmentPlugin(['PORT']),
        new webpack.EnvironmentPlugin(['API_URL'])
    ],
    module: {
        loaders: [{
            test: /.js[x]?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react'],
                plugins: ['transform-object-rest-spread']
            }
        },
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        },
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('css!sass')
        },
        {
            test: /\.woff|.woff2|.ttf|.eot|.svg*.*$/,
            loader: 'file'
        }]
    }
};
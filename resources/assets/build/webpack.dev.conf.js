const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.conf');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');

module.exports = merge(webpackBaseConfig, {
    devtool: '#source-map',
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '\'development\''
            }
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.js'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './resources/assets/template/index.ejs',
            inject: false
        }),
        new FriendlyErrorsWebpackPlugin({
            clearConsole: true,
            onErrors: (severity, errors) => {
                if (severity !== 'error') {
                    return;
                }
                const error = errors[0];
                notifier.notify({
                    title: 'Webpack error',
                    message: severity + ': ' + error.name,
                    subtitle: error.file || ''
                });
            }
        })
    ],
    devServer: {
        quiet: true,
        contentBase: path.resolve(__dirname, '..', 'template'),
        compress: true,
        host: '0.0.0.0',
        historyApiFallback: true,
        inline: true
    }
});

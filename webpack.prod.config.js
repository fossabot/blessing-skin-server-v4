const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const path = require('path');
const rimraf = require('rimraf');

rimraf.sync(path.join(__dirname, './public/assets'));

module.exports = merge(webpackBaseConfig, {
    output: {
        publicPath: '/assets/',
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].[hash].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.[hash].js',
            minChunks (module) {
                return (
                  module.resource &&
                  /\.js$/.test(module.resource) &&
                  module.resource.indexOf(
                    path.join(__dirname, 'node_modules')
                  ) === 0
                )
              }
        }),
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
        new HtmlWebpackPlugin({
            filename: path.join(__dirname, './resources/views/index.blade.php'),
            template: './resources/assets/template/index.ejs',
            inject: false
        })
    ]
});

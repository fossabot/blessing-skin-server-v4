const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.conf');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(webpackBaseConfig, {
    devtool: 'inline-cheap-module-source-map',
    externals: [nodeExternals()],
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        })
    ]
});

const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(webpackBaseConfig, {
    externals: [nodeExternals()],
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        })
    ]
});

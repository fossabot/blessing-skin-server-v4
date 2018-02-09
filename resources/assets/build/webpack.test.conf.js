const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.conf');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

webpackBaseConfig.module.rules = webpackBaseConfig.module.rules.filter(
    rule => rule.loader !== 'eslint-loader'
);

delete webpackBaseConfig.entry;
delete webpackBaseConfig.output;

module.exports = merge(webpackBaseConfig, {
    devtool: '#inline-source-map',
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"testing"'
            }
        })
    ]
});

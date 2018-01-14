const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: './resources/assets/main'
    },
    output: {
        path: path.join(__dirname, './public/assets')
    },
    module: {
        rules: [
            {
                test: /\.(vue|js)$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                less: ExtractTextPlugin.extract({
                                    use: [
                                        'css-loader?minimize',
                                        'autoprefixer-loader',
                                        'less-loader'
                                    ],
                                    fallback: 'vue-style-loader'
                                }),
                                stylus: ExtractTextPlugin.extract({
                                    use: [
                                        'css-loader?minimize',
                                        'autoprefixer-loader',
                                        'stylus-loader'
                                    ],
                                    fallback: 'vue-style-loader'
                                }),
                                css: ExtractTextPlugin.extract({
                                    use: [
                                        'css-loader',
                                        'autoprefixer-loader',
                                        'less-loader'
                                    ],
                                    fallback: 'vue-style-loader'
                                })
                            }
                        }
                    },
                    {
                        loader: 'iview-loader',
                        options: {
                            prefix: false
                        }
                    }
                ]
            },
            {
                test: /iview\/.*?js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?minimize', 'autoprefixer-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=1024'
            },
            {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            vue: 'vue/dist/vue.esm.js'
        }
    }
};

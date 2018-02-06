const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: './resources/assets/main.ts'
    },
    output: {
        path: path.join(__dirname, './public/assets')
    },
    module: {
        rules: [
            {
                test: /\.(vue|ts)$/,
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
                            preLoaders: {
                                i18n: 'yaml-loader'
                            },
                            loaders: {
                                less: ExtractTextPlugin.extract({
                                    use: [
                                        'css-loader?minimize',
                                        'autoprefixer-loader',
                                        'less-loader'
                                    ],
                                    fallback: 'vue-style-loader'
                                }),
                                css: ExtractTextPlugin.extract({
                                    use: [
                                        'css-loader?minimize',
                                        'autoprefixer-loader'
                                    ],
                                    fallback: 'vue-style-loader'
                                }),
                                i18n: '@kazupon/vue-i18n-loader'
                            }
                        }
                    },
                    {
                        loader: 'iview-loader',
                        options: {
                            prefix: true
                        }
                    }
                ]
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: { appendTsSuffixTo: [/\.vue$/] }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader?minimize',
                        'autoprefixer-loader'
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.ya?ml$/,
                loader: 'json-loader!yaml-loader'
            },
            {
                test: /\.(gql|graphql)$/,
                loader: 'graphql-tag/loader'
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
        extensions: ['.js', '.vue', '.ts'],
        modules: [path.resolve(__dirname, 'node_modules')],
        alias: {
            vue: 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /moment[\/\\]locale$/,
            /(zh-cn|en-us)/
        )
    ]
};

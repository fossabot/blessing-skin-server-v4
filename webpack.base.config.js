const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
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
                                    use: ['happypack/loader?id=less'],
                                    fallback: 'vue-style-loader'
                                }),
                                css: ExtractTextPlugin.extract({
                                    use: ['happypack/loader?id=less'],
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
                    use: ['happypack/loader?id=css'],
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
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /(zh-cn|en-us)/),
        new HappyPack({
            id: 'css',
            loaders: ['css-loader?minimize', 'autoprefixer-loader']
        }),
        new HappyPack({
            id: 'less',
            loaders: [
                'css-loader?minimize',
                'autoprefixer-loader',
                'less-loader'
            ]
        })
    ]
};

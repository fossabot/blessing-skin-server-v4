const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
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
                                    use: ['happypack/loader?id=less'],
                                    fallback: 'vue-style-loader'
                                }),
                                css: ExtractTextPlugin.extract({
                                    use: ['happypack/loader?id=less'],
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
                test: /\.js$/,
                use: 'happypack/loader?id=babel',
                exclude: path.resolve(__dirname, 'node_modules'),
                include: path.resolve(__dirname, 'resources', 'assets')
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['happypack/loader?id=css'],
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
        modules: [path.resolve(__dirname, 'node_modules')],
        alias: {
            vue: 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new HappyPack({
            id: 'babel',
            loaders: ['babel-loader']
        }),
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

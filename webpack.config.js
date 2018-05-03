const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const NOOP = require('noop-webpack-plugin');

const outPath = path.join(__dirname, './build');
const sourcePath = Path.join(__dirname, './src');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    context: sourcePath,
    entry: {
        main: './index.tsx',
        vendor: [
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'redux'
        ]
    },
    output: {
        path: outPath,
        publicPath: '/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [ ".js", ".ts", ".tsx", ".json"]
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                use: isProduction
                    ? 'awesome-typescript-loader?module=es6'
                    : [
                        {
                            loader: 'tslint-loader',
                            options: {
                                emitErrors: true,
                                typeCheck: true
                            }
                        },
                        'react-hot-loader/webpack',
                        'awesome-typescript-loader'
                    ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            query: {
                                modules: true,
                                sourceMap: !isProduction,
                                importLoaders: 1,
                                url: true,
                                localIdentName: '[local]__[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    require('postcss-import')({addDependencyTo: Webpack}),
                                    require('postcss-url')(),
                                    require('postcss-cssnext')(),
                                    require('postcss-reporter')(),
                                    require('postcss-browser-reporter')({disabled: isProduction})
                                ]
                            }
                        }
                    ]
                })
            },
            {test: /\.html$/, use: 'html-loader'},
            {test: /\.png$/, use: 'url-loader?limit=10000'},
            {test: /\.jpg$/, use: 'file-loader'}
        ]
    },
    plugins: [
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': isProduction
                ? JSON.stringify('production')
                : JSON.stringify('development')
        }),
        new Webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js',
            minChunks: Infinity
        }),
        new Webpack.optimize.AggressiveMergingPlugin(),
        new ExtractTextPlugin({
            filename: 'styles.css',
            disable: !isProduction
        }),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        isProduction ? new UglifyJsPlugin({
            parallel: true,
            uglifyOptions: {
                ecma: 8
            }
        }) : NOOP()
    ],
    devServer: {
        contentBase: sourcePath,
        hot: true,
        stats: {
            warnings: false
        }
    }
};

const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ChromeExtensionReloader  = require('webpack-chrome-extension-reloader');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const NOOP = require('noop-webpack-plugin');

const currentDir = process.cwd();
const sourcePath = path.join(currentDir, '/');
const outPath = path.join(currentDir, '/build');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    context: sourcePath,
    entry: {
        popup: './popup/index.tsx',
        background: './background/index.ts',
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
        filename: '[name].js'
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx", ".json"]
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'tslint-loader',
                    options: {
                        typeCheck: true,
                        emitErrors: false,
                        tsConfigFile: '../../tsconfig.json'
                    }
                },
                isProduction
                    ? 'null-loader'
                    : 'react-hot-loader/webpack',
                {
                    loader: 'awesome-typescript-loader',
                    options: {
                        configFileName: '../../tsconfig.json'
                    }
                }]
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
            template: './popup/popup.html',
            filename: "popup.html",
            chunks: ["popup", "vendor"]
        }),
        new HtmlWebpackPlugin({
            template: './background/background.html',
            filename: "background.html",
            chunks: ["background", "vendor"]
        }),
        !isProduction ? new WriteFilePlugin() : NOOP(),
        !isProduction ? new ChromeExtensionReloader({
            port: 9090, // Which port use to create the server
            reloadPage: true, // Force the reload of the page also
            entries: { //The entries used for the content/background scripts
                background: 'background'
            }
        }) : NOOP(),
        isProduction ? new UglifyJsPlugin({
            parallel: true,
            uglifyOptions: {
                ecma: 8
            }
        }) : NOOP()
    ],
    devtool: isProduction ? '' : 'source-map',
    devServer: {
        hot: true,
        open: true,
        overlay: true,
        contentBase: sourcePath,
        stats: {
            warnings: false
        }
    }
};

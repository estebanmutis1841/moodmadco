const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackLayoutPlugin = require('html-webpack-layout-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/components/main.js',
        home: './src/components/home.js',
        fullpage: './src/components/fullpage.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    plugins: [

        new webpack.IgnorePlugin(/jsdom$/),

        // Clean the `dist` folder.
        new CleanWebpackPlugin(['extension']),

        // Copy assets to the extension' deployment dir.
        new CopyWebpackPlugin([{from: 'src/images/', to: 'images/'}]),
        new CopyWebpackPlugin([{from: 'src/styles.css', to: ''}]),
        new CopyWebpackPlugin([{from: 'src/fullpage.css', to: ''}]),
        new CopyWebpackPlugin([{from: 'src/data/data.json', to: ''}]),

        // For Bootstrap
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            "window.$": "jquery",
            Popper: ['popper.js', 'default']
        }),
        new HtmlWebpackLayoutPlugin(),
        new HtmlWebpackPlugin({
            layout: path.join(__dirname, './src/index.html'),
            template: path.join(__dirname, './src/components/home.html'),
            filename: 'index.html',
            inject: false,
            js: 'index.js',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "sass-loader"}
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader: "file-loader",
                query: {
                    name: '[name].[ext]',
                    outputPath: 'images/'
                }
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                        publicPath: './'
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
    ,
    externals: {
        'jsdom':
            'window'
    }
};
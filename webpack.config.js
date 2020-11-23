const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin}  = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ ".tsx", ".ts", ".js" ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.resolve(__dirname, '.'),
        hot: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};

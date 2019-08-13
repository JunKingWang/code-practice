const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: __dirname + '/src/index.js',
    output: {
        path: __dirname + '/dist/',
        filename: 'index.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader'
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: __dirname + '/index.html',
            filename: 'index.html',
            chunks: ['index'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),
    ],
    devServer: {
        contentBase: './dist',
        hot: true
    }
}
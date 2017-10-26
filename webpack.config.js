const webpack = require('webpack');

module.exports = {
    entry: {
        library: './src/index.js'
    },
    output: {
        filename: './dist/dragdrop.js',
        library: 'dragdrop',
        libraryTarget:'umd'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        ['es2015', { modules: false }]
                    ]
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            output: { comments: false }
        })
    ]
}
'use strict'

const path = require('path');
const webpack = require('webpack');

const config = {
    devtool: 'source-map',
    entry: './src/dragdrop.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'dragdrop.js',
        publicPath: 'dist/'
    }
}

// if development, add watch and source-map
if (process.env.NODE_ENV === 'development') {
    config.watch = true;
    config.devtool = 'source-map';
}

module.exports = config;
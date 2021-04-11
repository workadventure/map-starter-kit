const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: '.',
        //host: '0.0.0.0',
        host: 'localhost',
        //sockPort: 80,
        disableHostCheck: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    /*externals:[
        require('webpack-require-http')
    ],*/
    plugins: [
        /*new webpack.ProvidePlugin({
            WA: ['@workadventure/iframe-api-typings', 'window.WA']
        }),*/
        /*new webpack.EnvironmentPlugin({
            'API_URL': null,
            'PUSHER_URL': undefined,
            'UPLOADER_URL': null,
            'ADMIN_URL': null,
            'DEBUG_MODE': null,
            'STUN_SERVER': null,
            'TURN_SERVER': null,
            'TURN_USER': null,
            'TURN_PASSWORD': null,
            'JITSI_URL': null,
            'JITSI_PRIVATE_MODE': null,
            'START_ROOM_URL': null
        })*/
    ],

};

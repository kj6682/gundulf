var webpack = require('webpack')
var path = require('path')

var SRC_DIR = path.resolve(__dirname + '/src/main/js')
var TARGET_DIR = path.resolve(__dirname + '/src/main/resources/public')

var config = {
    entry: SRC_DIR + "/index.jsx",
    output: {
        path: TARGET_DIR,
        filename: "bundle.js",
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: SRC_DIR,
                loader: 'babel-loader'
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
        ]
    },
    devtool: 'source-map',
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
            "Access-Control-Max-Age": "3600",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, remember-me"
        },

        contentBase: TARGET_DIR,
        historyApiFallback: true,
        inline: true,
        port: 8081
    },
    externals: {
        'config': JSON.stringify(require(SRC_DIR + '/config.dev.json'))
    }
};

module.exports = config
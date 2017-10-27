var webpack = require('webpack')
var path = require('path')

var SRC_DIR = path.resolve(__dirname + '/src/main/js')
var TARGET_DIR = path.resolve(__dirname + '/src/main/resources/public')

var config = {
    entry: SRC_DIR + "/index.jsx",
    output: {
        path: TARGET_DIR,
        filename: "bundle.js"
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
    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ],
    externals: {
        'config': JSON.stringify(require(SRC_DIR + '/config.prod.json'))
    }
};

module.exports = config
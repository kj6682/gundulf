var webpack = require('webpack')
var path = require('path')

var SRC_DIR = path.resolve(__dirname + '/src/main/js')
var TARGET_DIR = path.resolve(__dirname + '/src/main/resources/public')


module.exports = (env = {}) => {


    const isProduction = env.production === true


    return {
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
        plugins: (function () {
            if (isProduction)
                return [
                    new webpack.optimize.UglifyJsPlugin({minimize: true}),
                    new webpack.DefinePlugin({
                        'process.env': {
                            'NODE_ENV': JSON.stringify('production')
                        }
                    })]
            else
                return [new webpack.DefinePlugin({
                    'process.env': {
                        'NODE_ENV': JSON.stringify('dev')
                    }
                })]
        })(),

        devtool: (function () {
            if (!isProduction) return 'source-map'
        })(),

        devServer: (function () {
            if (!isProduction) return {
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
            }
        })(),
    }
};


// simplified after reading this https://blog.flennik.com/the-fine-art-of-the-webpack-2-config-dc4d19d7f172
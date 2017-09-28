module.exports = {
    devtool: 'source-map',

    entry: ['whatwg-fetch', __dirname + "/src/main.js"],

    output: {
        path: __dirname + "/public/built",
        filename: "bundle.js"
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
      },
    ]
    },

    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        },
        contentBase: "./public",
        historyApiFallback: true,
        inline: true, 
        port:8080
    }
}

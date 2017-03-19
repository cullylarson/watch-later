import path from 'path'

export default [
    {
        entry: './src/server/main.js',
        target: 'node',
        output: {
            path: path.join(__dirname, "build/server"),
            filename: "app.js",
            publicPath: "app",
        },
        module: {
            rules: [
                {
                    test: path.join(__dirname, 'src'),
                    loader: 'babel-loader',
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
                {
                    test: /\.json/,
                    loaders: ["json-loader"],
                },
            ]
        },
        devtool: 'source-map',
        resolve: {
            alias: {
                server: path.join(__dirname, 'src/server'),
                common: path.join(__dirname, 'src/common'),
            },
            extensions: ['.js', '.jsx']
        },
    },
    {
        entry: ['whatwg-fetch', 'babel-polyfill', './src/client/main.js'],
        target: 'web',
        output: {
            path: path.join(__dirname, 'build/client'),
            filename: 'app.js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                },
                {
                    test: /\.json/,
                    loaders: ["json-loader"],
                },
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    exclude: [/node_modules/],
                    loader: 'eslint-loader',
                },
            ]
        },
        devtool: (process.env.NODE_ENV === 'production') ? '' : 'source-map',
        resolve: {
            alias: {
                client: 'src/client',
                common: 'src/common',
            },
            extensions: ['.js', '.jsx']
        },
    },
]

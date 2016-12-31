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
            loaders: [
                {
                    test: path.join(__dirname, 'src'),
                    loader: 'babel',
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel',
                },
                {
                    test: /\.json/,
                    loaders: ["json"],
                },
            ]
        },
        devtool: 'source-map',
        resolve: {
            root: path.resolve(__dirname),
            alias: {
                server: 'src/server',
                common: 'src/common',
            },
            extensions: ['', '.js', '.jsx']
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
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel',
                },
                {
                    test: /\.json/,
                    loaders: ["json"],
                },
            ],
            preLoaders: [
                {
                    test: /\.js$/,
                    exclude: [/node_modules/],
                    loader: 'eslint-loader',
                },
            ]
        },
        devtool: (process.env.NODE_ENV === 'production') ? '' : 'source-map',
        resolve: {
            root: path.resolve(__dirname),
            alias: {
                client: 'src/client',
                common: 'src/common',
            },
            extensions: ['', '.js', '.jsx']
        },
    },
]

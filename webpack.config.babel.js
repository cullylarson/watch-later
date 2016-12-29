import path from 'path'

export default {
        entry: ['whatwg-fetch', 'babel-polyfill', './src/main.js'],
        target: 'web',
        output: {
            path: './build',
            filename: 'app.js',
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel',
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
                app: 'src',
            },
            extensions: ['', '.js', '.jsx']
        },
    }

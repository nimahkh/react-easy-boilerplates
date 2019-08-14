const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const distDir = path.join(__dirname, '../dist');
const srcDir = path.join(__dirname, '../src');

module.exports = [
    {
        mode : 'development',
        name: 'client',
        target: 'web',
        entry: `${srcDir}/client.js`,
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'client.js',
            publicPath: '/dist/',
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules[\\\/])/,
                    use: [
                        {
                            loader: 'babel-loader',
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: ['style-loader','css-loader']
                },
            ],
        },
        plugins: [
            new ExtractTextPlugin({
                filename: 'styles.css',
                allChunks: true
            })
        ]
    },
    {
        mode : 'production',
        name: 'server',
        target: 'node',
        entry: `${srcDir}/server.js`,
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'server.js',
            libraryTarget: 'commonjs2',
            publicPath: '/dist/',
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules[\\\/])/,
                    use: [
                        {
                            loader: 'babel-loader',
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: ['style-loader','css-loader']
                },
            ],
        },
    }
];

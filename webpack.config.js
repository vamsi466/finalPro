var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var appRoot = path.join(__dirname, '/src');
var nodeRoot = path.join(__dirname, '/node_modules');

module.exports = {
    cache: true,
    watch: true,

    // The entry point
    entry: {
        'vendor': path.join(appRoot, '/vendor.js'),
        'app': path.join(appRoot, '/app.js')
    },

    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].bundle.js',
    },


    module: {

        loaders: [{
                test: /\.js$/, // include .js files 
                exclude: /node_modules/, // exclude any and all files in the node_modules folder 
                loader: "jshint-loader"
            },
            {
                // required to write 'require('./style.css')'
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.(sass|scss)$/,
                loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
            },
            {
                // require raw html for partials
                test: /\.tpl\.html$/,
                loader: 'ng-cache-loader'
            },
            {
                // required for bootstrap icons
                test: /\.(woff|woff2)(\?(.*))?$/,
                loader: 'url-loader?name=fonts/[name].[ext]&prefix=fonts/&limit=5000&mimetype=application/font-woff'
            },
            {
                // required for bootstrap icons
                test: /\.(png|jpg|jpeg)(\?(.*))?$/,
                loader: 'url-loader?name=img/[name].[ext]&prefix=img/&limit=5000&mimetype=image/png'
            },
            {
                test: /\.ttf(\?(.*))?$/,
                loader: 'file-loader?name=fonts/[name].[ext]&prefix=fonts/'
            },
            {
                test: /\.eot(\?(.*))?$/,
                loader: 'file-loader?name=fonts/[name].[ext]&prefix=fonts/'
            },
            {
                test: /\.svg(\?(.*))?$/,
                loader: 'file-loader?name=fonts/[name].[ext]&prefix=fonts/'
            },
            {
                test: /\.json$/,
                loader: 'file-loader?name=data/[name].[ext]'
            }
        ],

    },

    resolve: {
        alias: {
            node: nodeRoot,
        },

        extensions: [
            '.js',
            '.sass',
            '.css'
        ],

    },

    plugins: [

        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            chunksSortMode: function(chunk1, chunk2) {
                var orders = ['vendor', 'app'];
                var order1 = orders.indexOf(chunk1.names[0]);
                var order2 = orders.indexOf(chunk2.names[0]);
                if (order1 > order2) {
                    return 1;
                } else if (order1 < order2) {
                    return -1;
                } else {
                    return 0;
                }
            }

        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })

    ],
    devtool: 'eval'

}
'use strict';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const webpackDevServer = require("webpack-dev-server");
const projectPath = process.cwd()

module.exports = ({
    mode = "production",
}) => ({
    mode,
    entry: path.join(process.cwd(), 'src/index'),
    output: {
        path: path.join(process.cwd(), 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
        	{
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              loader: "babel-loader",
              query:
                {
                  presets:['@babel/react'],
                  plugins: [
                    [  "import",{libraryName: "antd", style: 'css'}] // antd按需加载
                  ]
                }
            },
            {
	            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/], 
	            loader: require.resolve('url-loader'),
	            options: {
	              limit: 10000,
	              name: 'static/media/[name].[hash:8].[ext]',
	            },
          	},
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
        ]
    },
    resolveLoader: {
        modules: [
            path.join(__dirname, 'node_modules')
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(process.cwd(), 'index.tpl.html'),
            filename: 'index.html'
        }),

        new OpenBrowserPlugin({
            url: 'http://localhost:8080'
        }),
    ]
})
			

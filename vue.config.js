const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
    publicPath: './',
    filenameHashing: true,
    productionSourceMap: false,
    assetsDir: 'static',
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.plugins.push(
                new CompressionWebpackPlugin()
            )
            config.plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        output: {
                            comments: false,
                            beautify: false,
                        },
                        compress: true,
                        warnings: false
                    }
                })
            )
            // config.externals = {
            //     vue:'Vue',
            //     iview: 'iview'
            // }
        }
    },
    devServer: {
        port: 8001,
        proxy: {
            '/navApi': {
                target: 'http://localhost/',
                changeOrigin: true,
                pathRewrite: {
                    '^/navApi': ''
                }
            }
        }
    }
}
/**
 * 生产环境配置
 */

const webpack = require('webpack');
const merge = require('webpack-merge');     //配置文件拼接
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
/**
 * webpack -p 将自动地调用上述这些标记，从而调用需要引入的插件。
 * 这些简便方式虽然都很不错，但是我们通常建议只使用配置方式，
 * 因为在这两种场景中下，配置方式能够更好地帮助你了解自己正在做的事情。
 * 配置方式还可以让你更方便地控制这两个插件中的其他选项。
 */
module.exports = merge(common,{
    output: {                  //出口
        filename : '[name].[chunkhash].js',
        path: path.resolve(__dirname,'dist'),
        //publicPath 也会在服务器脚本用到，以确保文件资源能够在 http://localhost:3000 下正确访问
        //publicPath: '/',
        //chunkFilename: '[name].bundle.js' //代码分离
    }, 
    
    /**
     * 我们鼓励你在生产环境中启用 source map，
     * 因为它们对调试源码(debug)和运行基准测试(benchmark tests)很有帮助。
     * 我们将在生产环境中使用 source-map 选项，而不是我们在开发环境中用到的 inline-source-map
     */
    devtool: 'source-map',
    plugins: [
        /**
         * webpack --optimize-minimize
         * 压缩输出
         * 从 webpack 4 开始，也可以通过 "mode" 配置选项轻松切换到压缩输出，只需设置为 "production"。
         * mode: "production"
         */
        new UglifyJSPlugin({
            sourceMap: true
        }),
        /**
         * webpack --define
         * ————————————————————————————————有可能会出问题？？
         * 某些 library 为了使调试变得容易，
         * 可能会添加额外的日志记录(log)和测试(test)。
         * 其实，当使用 process.env.NODE_ENV === 'production' 时，
         * 一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码。
         */
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});
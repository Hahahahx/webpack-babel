/**
 * 开发环境配置
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');


module.exports = merge(common,{
    output: {                  //出口
        filename : '[name].bundle.js',
        path: path.resolve(__dirname,'dist'),
        //publicPath 也会在服务器脚本用到，以确保文件资源能够在 http://localhost:3000 下正确访问
        //publicPath: '/',
        chunkFilename: '[name].bundle.js' //代码分离
    }, 
    //在控制面版打印错误信息
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()    //热部署
    ],
});
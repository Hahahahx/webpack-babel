/**
 * 热部署
 */

//const express = require('express');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

//const app  = express();
const config = require('../config/webpack.dev');
//const compiler = webpack(config);
const options = {
    contentBase: '../dist',
    hot: true,
    host: 'localhost'
}

// app.use(webpackDevMiddleware(compiler,{
//     publicPath: config.output.publicPath
// }));

webpackDevServer.addDevServerEntrypoints(config,options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler,options);

server.listen(3000,'localhost',()=>{
    console.log('监听3000端口');
})
// app.listen(3000,function(){
//     console.log('监听3000端口');
// })
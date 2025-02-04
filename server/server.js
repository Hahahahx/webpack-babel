const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app  = express();
const config = require('../config/webpack.dev');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler,{
    publicPath: config.output.publicPath
}));

app.listen(3000,function(){
    console.log('监听3000');
})
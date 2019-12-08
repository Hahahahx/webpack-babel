const path = require('path');
const webpack = require('webpack');
/**
 * 管理插件
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');       //生成新的带有所有入口的index.html
const { CleanWebpackPlugin } = require('clean-webpack-plugin');    //清理dist文件夹

module.exports = {
    entry: {
        app: './src/index.js',
    },
    //在控制面版打印错误信息
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({     //将所有的entry都添加到index.html中
            title: 'Output Management'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()    //热部署
    ],
    output: {                  //出口
        //设置hash值
        filename : '[name].bundle.js',
        path: path.resolve(__dirname,'dist'),
        publicPath: '/'
    }, 
    mode: "production",
    module: {
        rules: [
            {
              include: path.resolve("node_modules", "lodash"),
              //tree shaking（删除未引用代码
              //顾名思义在构建包的时候删减掉那些不会对应用产生副作用而未使用到的export
              sideEffects: [
                "./src/some-side-effectful-file.js",
                "*.css",
                "*.less"
              ]
            },
            {
                //在此规则下，当模块运行时，带有.css的style标签将被插入到html的<head>中
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },{
                //加载图片
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },{
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'flie-loader',
                ]
            },
        ],
    }
};
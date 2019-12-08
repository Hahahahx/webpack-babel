/**
 * 共用配置（生产、开发）
 */
const webpack = require('webpack');
/**
 * 管理插件
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');       //生成新的带有所有入口的index.html
const { CleanWebpackPlugin } = require('clean-webpack-plugin');    //清理dist文件夹

module.exports = {
    devServer:{
        open:true,
        inline:true,
        port:3000,
        hot:true,
    },
    entry: {
        main: './src/index.js',
        /**
         * 将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件中，是比较推荐的做法
         */
        vendors: [
            'lodash'
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({     //将所有的entry都添加到index.html中
            title: 'Output Management'
        }),
        //不管再添加任何新的本地依赖，对于每次构建，vendor hash 都应该保持一致，如果不一致的话就会导致每个文件分别启动多个服务器
        new webpack.HashedModuleIdsPlugin(),
        /**
         * 之前从代码分离了解到的，CommonsChunkPlugin 可以用于将模块分离到单独的文件中(生成各个bundles)
         * 有一个较少有人知道的功能是，能够在每次修改后的构建结果中，
         * 将 webpack 的样板(boilerplate)和 manifest 提取出来。
         * 通过指定 entry 配置中未用到的名称，此插件会自动将我们需要的内容提取到单独的包中
         * new webpack.optimize.CommonsChunkPlugin({    已被删除
                name: 'manifest'
            })
         */
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    module: {
        rules: [
            {
              /**
               * tree shaking（删除未引用代码
               * 顾名思义在构建包的时候删减掉那些不会对应用产生副作用而未使用到的export
               * 可以在package.json中添加该指令 sideEffects:false,
               * 但如果在配置文件中设置该选项，开发人员最好清楚哪些是对应用会产生副作用的包
               * 开发人员不应该被迫搜索哪些副作用的包（极其耗时
               * "sideEffects": {
               *      "./x": false,
               *      "./y": true
               * }
               */
              sideEffects: false
            },
            {
                test: /\.js$/,
                use: [
                    'babel-loader',
                ],
                exclude: '/node_modules'
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
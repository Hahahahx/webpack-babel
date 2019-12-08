/**
 * babel配置文件
 * 建议使用 babel.config.js 格式的配置文件。Babel 本身使用的就是这种（官方
 */
module.exports = function (api) {
    api.cache(true);
  
    const presets = [ [
        "@babel/env",
        {
          targets: {
            edge: "17",
            firefox: "60",
            chrome: "67",
            safari: "11.1",
          },
          //优化处理 @babel/polyfill可能导致的全局污染，
          //加上该属性后只加载应用所需要的polyfill 避免了一些可能存在的意外
          //但是在最新版本中貌似要把他删除了————在中删除提案Polyfill @babel/polyfill
          //useBuiltIns: "usage",
          //忽略
        //   "ignore": [
        //     "./src/lib/mui/js/*.js"
        //     ]
        },
      ],
     ];
    const plugins = [ 
       
        //Es5 类型判断 a instanceof b 
        "@babel/plugin-transform-instanceof",
        //Es5 类型检测 typeof a
        "@babel/plugin-transform-template-literals",
        //Es5 箭头函数 =>
        "@babel/plugin-transform-arrow-functions",
        //Es5 面向对象 class
        "@babel/plugin-transform-classes",
        //Es5 传播 ...运算符
        "@babel/plugin-transform-spread",
        //Es5 解构 自动检测对象结构
        "@babel/plugin-transform-destructuring",
        //Es5 多结构参数 function fn(x = "hello", { a, b }, ...args){console.log(x, a, b, args);}
        "@babel/plugin-transform-parameters",



        //Es 速写属性 {list} ==> {list:list} {get(){return name;}} ==> {get:function(){return name;}}
        "@babel/plugin-transform-shorthand-properties",
        //Es5 模板字面量 `${name}`
        //"@babel/plugin-transform-template-literals", 有点问题，报two什么什么的错
        /**
         * Es5 对象属性运算
         * var obj = {
         *   ["x" + foo]: "heh",
         *   ["y" + bar]: "noo",
         *   foo: "foo",
         *   bar: "bar"
         * };
         */
        "@babel/plugin-transform-computed-properties",
        //Es6 次方 10**2 ==> Math.pow(10,2)
        "@babel/plugin-transform-exponentiation-operator",
        //Es7 async-await
        "@babel/plugin-transform-async-to-generator",
        //可重新使用Babel注入的帮助程序代码以节省代码大小
        //"@babel/plugin-transform-runtime",        有点问题，程序代码不显示了
        //严格模式
        "@babel/plugin-transform-strict-mode",
        //参数类转换
        "@babel/plugin-proposal-class-properties",
     ];
  
    return {
      presets,
      plugins
    };
  }
  
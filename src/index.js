import './style.css'

if (process.env.NODE_ENV !== 'production'){
    console.log('开发模式');
}

async function getComponent(){
    // return import(/*webpackChunkName:"loadsh" */'lodash').then(_=>{
    //     var elememt = document.createElement('div');
    //     elememt.innerHTML = _.join(['hello','webpack','hhhh'],' ');
    //     return elememt;
    // }).catch(error=>'加载组件时出错');

    var elememt = document.createElement('div');
    elememt.classList.add('hello');
    const _ = await import('lodash');

    var button = document.createElement('button');
    var br = document.createElement('br');

    button.innerHTML  = "点击查看控制台";
    elememt.innerHTML = _.join(['hello','webpack'],' ');
    elememt.appendChild(br);
    elememt.appendChild(button);

    button.onclick = e => import(/* webpackChunkName:"print" */'./print').then(module=>{
        var print = module.default;
        print(0)
    })

    return elememt;
}
getComponent().then(component =>{
    document.body.appendChild(component);
})


/*

function component(){

    var elememt = document.createElement('div');
    var btn = document.createElement('button');

    //lodash(目前通过一个script脚本引入)对于执行这一行是必需的
    elememt.innerHTML = _.join(['hello','webpack'],' ');
    elememt.classList.add('hello');

    btn.innerHTML = 'Click me ';
    btn.onclick = printMe;

    var myIcon = new Image();
    myIcon.src = Icon;
    elememt.appendChild(myIcon);
    elememt.appendChild(btn);


    return elememt;

}
document.body.appendChild(component());
let elememt = component();
document.body.appendChild(elememt);

// 幸运的是，存在很多 loader（如css-loader,react-loader），使得模块热替换的过程变得更容易。

if (module.hot){
    module.hot.accept('./print.js',function(){
        console.log('接受printMe模块更新');
        //printMe();
        document.body.removeChild(elememt);
        elememt = component();  //重新渲染页面后，component更新click事件处理
        document.body.appendChild(elememt);
    })
}
*/



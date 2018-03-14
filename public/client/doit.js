
    var id = Math.ceil(Math.random()*25328832);
    var imgsrc;
var socket = io.connect('http://111.231.84.241:3000');
socket.on('news', function (data) {
    let robot = document.getElementById('robot').innerHTML = data.hello
    imgsrc = data.number
console.log(data);
// socket.emit('my other event', { my: 'data' });
});

socket.on('content', function (data) {
    console.log(data.id,id)
    if(data.id!=id){
        // let a = document.getElementById('content');
    //     let node = document.createElement('div');
    //     node.className ='content'
    //     var textnode = document.createTextNode(data.hello);
    //     node.appendChild(textnode);
    //    a.appendChild(node);
    // console.log(data);
    let a = document.getElementById('content');
        let Dnode = document.createElement('div');
        Dnode.className = 'content';

        let node = document.createElement('p');
        var textnode = document.createTextNode(data.hello);
        node.appendChild(textnode);

        let imgnode = document.createElement('img');
        imgnode.src = `./client/img/${data.number}.jpg`;
        imgnode.className = 'imgc';

        Dnode.appendChild(imgnode);
        Dnode.appendChild(node);


       a.appendChild(Dnode);
    document.getElementById('content').scrollTop += 100;
       
    }
});

var submitBtn = document.getElementById("myBtn");
 
 submitBtn.onclick = function (event) {
//   alert("preventDefault!");
  var event = event || window.event;
  event.preventDefault();
      let c = document.getElementById("input").value;
      if(c===''){
          return false;
      }
    // console.log(a)
    let a = document.getElementById('content');
        let length = a.length;
        let Dnode = document.createElement('div');
        Dnode.id = 'yourself';

        let node = document.createElement('p');
        var textnode = document.createTextNode(c);
        node.appendChild(textnode);

        let imgnode = document.createElement('img');
        imgnode.src = `./client/img/${imgsrc}.jpg`;
        imgnode.className = 'imgy';

        Dnode.appendChild(node);
        Dnode.appendChild(imgnode);


       a.appendChild(Dnode);
    document.getElementById('content').scrollTop += 100;
    socket.emit('my other event',{my:c,id:id,number:imgsrc});
    document.getElementById("input").value = ''

 };
 document.getElementById("input").addEventListener("focus",myFunction);

function myFunction() {
    // document.body.scrollTop = document.body.scrollHeight;
//  let a = document.documentElement.scrollTop +document.body.scrollTop;
// let Height = window.innerHeight;
// setTimeout(function(){
    // let b =window.innerHeight;
    //    let d = document.getElementById('form');
    //    d.style.cssText = 'top:500px'
    // let Height = document.body.scrollHeight
    // let bottomAdjust = (Height - window.innerHeight - 88);
            let d = document.getElementById('form');
            d.style.cssText='bottom:1px!important'


// },1000)
// document.getElementsByTagName('BODY')[0].scrollTop= 700;
// setTimeout(() => {
    // 挂载this上, 或者声明一个全局变量, 用于在失去焦点时, 要不要执行调整代码(非第三方不调整)
//     this.inputIsNotInView = notInView()
    
//     if (this.inputIsNotInView) {
//         let Width = window.innerWidth;
//         let Height = window.innerHeight;
//         // Width, Height: 分别是键盘没有弹出时window.innerWidth和window.innerWidt
//         // 88: 是第三方输入法比原生输入法多的那个tool bar(输入时显示带选项) 的高度, 做的不是太绝, 高度是统一的
//         // ios第三方输入法的tool bar 甚至 键盘也被当作可视区域了(包含在键盘弹出时的window.innerHeight)
//         if (Width != 750) {
//             let bottomAdjust = (Height - window.innerHeight - 176) + 'px';
//             let d = document.getElementById('form');
//             d.style.cssText=`bottom:${bottomAdjust}px`
//             // $(this.inputBoxContainer).css('bottom', bottomAdjust)
//         }
//         else {
//             // 'iphone 6 6s, 需要额外减去键盘高度432(见下图), 还算有良心, 高度和原生保持一致')
//             let bottomAdjust = (Height - window.innerHeight - 176 - 432) + 'px';
//             let d = document.getElementById('form');
//             d.style.cssText=`bottom:${bottomAdjust}px`
//             // $(this.inputBoxContainer).css('bottom', bottomAdjust)
//         }
//     }
// }, 600)

}
    //判断元素是否在可视区域，不在的话返回true, 在返回false
    function notInView() {
        // getBoundingClientRect 是获取定位的，很怪异, (iphone 6s 10.0 bate版不行)
        // top: 元素顶部到窗口（可是区域）顶部
        // bottom: 元素底部到窗口顶部
        // left: 元素左侧到窗口左侧
        // right: 元素右侧到窗口左侧
        // width/height 元素宽高
        let d = document.getElementById('form');
           let bottom = d.getBoundingClientRect().bottom
           
           // 可视区域高度 - 元素底部到窗口顶部的高度 < 0, 则说明被键盘挡住了
        if (window.innerHeight - bottom < 0) {
            return true
        }
        return false
    }
// function scrollToEnd() {
//     document.body.scrollTop = document.body.scrollHeight;
//     console.log(document.body.scrollTop)
//         document.documentElement.scrollTop = 812;
//     }
    // let a = document.documentElement.scrollTop +document.body.scrollTop;
    // let d = document.getElementById('form');
    // d.style.cssText = `bottom:${a}px`
    // alert(a)

document.getElementById("input").addEventListener("blur",myFunction1);

function myFunction1() {
    // let d = document.getElementById('form');
    // d.style.cssText = 'bottom:0'
    // clearInterval(this.int)
    let d = document.getElementById('form');
    d.style.cssText='bottom:0!important'
}
// document.getElementById("myBtn").addEventListener("click",myFunction(e));

// function myFunction(e) {
//     e.preventDefault(); 
//     let a = document.getElementById("input").value;
//     console.log(a)
//     socket.emit('my other event',{my:a})
// }

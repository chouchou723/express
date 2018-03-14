
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

    socket.emit('my other event',{my:c,id:id,number:imgsrc});
    document.getElementById("input").value = ''

 };
 document.getElementById("input").addEventListener("focus",myFunction);

function myFunction() {
 let a = document.documentElement.scrollTop +document.body.scrollTop;
    let d = document.getElementById('form');
    d.style.cssText = `top:${a}px`

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
    clearInterval(this.int)
}
// document.getElementById("myBtn").addEventListener("click",myFunction(e));

// function myFunction(e) {
//     e.preventDefault(); 
//     let a = document.getElementById("input").value;
//     console.log(a)
//     socket.emit('my other event',{my:a})
// }

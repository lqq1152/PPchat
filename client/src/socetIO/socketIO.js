import io from 'socket.io-client'


//链接服务器,得到与服务器的链接对象
const  socket = io('ws://localhost:4000')

//发送消息
// socket.emit('sendMsg',{name:'abc'})
//
// socket.on('receiveMsg',function (data) {
//     console.log(data);
// })
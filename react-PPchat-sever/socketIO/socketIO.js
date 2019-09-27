const {ChatModel} = require('../db/models')
module.exports = function (server) {
    const io = require('socket.io')(server);

    //监视客户端与服务器的链接
    io.on('connection',function (socket) {
        console.log('lianjieshang');
        //绑定监听
        socket.on('sendMsg',function ({from,to,content}) {
            console.log({from,to,content});
            //处理数据（保存消息）,准备chatMsg对象的相关数据
            const chat_id =[from,to].sort().join('-')
            const create_time = Date.now()
            new ChatModel({from,to,content,chat_id,create_time}).save(function (err, chatMsg) {
                //向客户端发数据
                io.emit('receiveMsg',chatMsg)
            })
        })
    })
};


//包含n个操作数据库集合数据的Model模块
const md5 = require('blueimp-md5')
//1.连接数据库

//引入mongoose
const mongoose = require('mongoose')
mongoose.set('useUnifiedTopology', true);
//链接指定数据库（URL只有数据库是变化的）
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true})

const conn = mongoose.connection

// 绑定监听
conn.on('connected',function () {
    console.log('数据库链接成功！');
})


//得到对应的特定集合的Model

//定义Schema（描述文档结构）
const userSchema = mongoose.Schema({
    username:{type:String,require:true},
    password:{type:String,require:true},
    type:{type:String,require:true},
    realName:{type:String},
    header:{type:String,require:true},
    age:{type:String},
    intro:{type:String},
    school:{type:String}
})

const UserModel = mongoose.model('user',userSchema)

//向外暴露Model

exports.UserModel = UserModel

//定义chats集合的人当结构
const chatSchema = mongoose.Schema({
    from:{type:String,require:true},
    to:{type:String,require:true},
    chat_id:{type:String,require:true}, //form to 组成的字符串
    content:{type:String,require:true},
    read:{type:Boolean,default:false},
    create_time:{type:Number}
})
const ChatModel = mongoose.model('chat',chatSchema)

function testFind() {
    ChatModel.find(function (error, users) {
        console.log('find()',error,users);
    })
}
testFind()
exports.ChatModel = ChatModel
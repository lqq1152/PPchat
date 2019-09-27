
const md5 = require('blueimp-md5')
//1.连接数据库

//引入mongoose
const mongoose = require('mongoose')
mongoose.set('useUnifiedTopology', true);
//链接指定数据库（URL只有数据库是变化的）
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true})

//获取链接对象

const conn = mongoose.connection

//绑定监听
conn.on('connected',function () {
    console.log('数据库链接成功！');
})


//得到对应的特定集合的Model

//定义Schema（描述文档结构）
const userSchema = mongoose.Schema({
    username:{type:String,require:true},
    password:{type:String,require:true},
    type:{type:String,require:true},
    header:{type:String}
})
//定义Model（与集合对应，可以操作集合）
const UserModel = mongoose.model('user',userSchema); //集合的名字为users


//通过model实例对集合数据进行CRUD操作

//save添加数据
function testSave() {
    const userModel = new UserModel({username: 'kom',password: md5('1230'),type:'Boy'})
    userModel.save(function (error, userDoc) {
        console.log('save()',error,userDoc);
    })
}
// testSave()

//查询多个数据
function testFind() {
    ChatModel.find(function (error, users) {
        console.log('find()',error,users);
    })
}
//向外暴露Model
testFind()
function testUpdate() {
    UserModel.findByIdAndUpdate({_id:'5d819fb3879324258cb425a6'},{username:'Bob'},function (error, oldUser) {
        console.log("findByIdAndUpdate",error,oldUser);
    })
}
// testUpdate()
function testRemove() {
    UserModel.deleteOne({_id:'5d8432606ac9db3768466f4c'},function (error, doc) {
        console.log('remove()',error,doc);
    })
}
// testRemove()
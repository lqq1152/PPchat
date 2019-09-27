let express = require('express');
let router = express.Router();

const md5 = require('blueimp-md5');
const {UserModel,ChatModel}= require('../db/models');
const filter = {password: 0,_v:0};
/* GET home page. */

//注册路由：用于用户注册


// router.post('/register', function(req, res, next) {
//   //获取post请求的参数
//   const {username,password} = req.body
//   //处理
//   if(username==='admin'){
//     //注册失败
//     res.send({code:1 ,msg:'此用户已存在'})
//   }else {//成功
//     res.send({code:0 ,data:{id:'abc123123123',username,password}})
//   }
// });

//注册的路由
router.post('/register',function (req,res) {
    //获取参数数据
    const {username,password,type} = req.body;
    //处理  判断用户是否存在
    //根据username查询
    UserModel.findOne({username},function (err, userDoc) {
        if(userDoc){
            res.send({code:1,msg:'用户已存在'})
        }
        else {
            new UserModel({username,password:md5(password),type}).save(function (err, user) {
                const data = {username,type,_id:user._id}  ;  //响应数据不要有password
                //生成一个cookie 交给浏览器保存
                res.cookie('userId',user._id,{maxAge:1000*60*60*24});
                res.send({code:0,data})
            })
        }
    })
});

//登陆的路由
router.post('/login',function (req, res) {
    const {username,password} = req.body;
    //根据username和password查询数据库username
    UserModel.findOne({username,password:md5(password)},filter,function (err, user) {
        if(user){
            res.cookie('userId',user._id,{maxAge:1000*60*60*24});
            res.send({code:0,data:user})
        }
        else {
            res.send({code:1,msg:'用户名或密码错误'})
        }
    })
});

//更新用户信息的路由

router.post('/update',function (req, res) {
    //从cookie中获得userID
    const userId = req.cookies.userId;

    if(!userId){
       return res.send({code:1,msg:'请先登录'})
    }
    const user = req.body;
    UserModel.findByIdAndUpdate({_id:userId},user,function (err, oldUser) {
        if(!oldUser){
           //通知浏览器删除userID的cookie
            res.clearCookie('userId');
            res.send({code:1,msg:'请先登录'})
        }else {
            const {_id,username,type} = oldUser;
            const data = Object.assign(user,{_id,username,type});
            res.send({code:0,data})
        }

    })
});
router.get('/user',function (req, res) {
    const userId = req.cookies.userId;

    if(!userId){
        return res.send({code:1,msg:'请先登录'})
    }
    UserModel.findOne({_id:userId},filter,function (err, user) {
        res.send({code:0,data:user})
    })
});
//获取用户列表
router.get('/userList',function (req, res) {
    const {type} = req.query;
    UserModel.find({type:type},filter,function (err, users) {
        users = users.filter(user => user.header);
        res.send({code:0,data:users})
    })
});
//获取消息列表
router.get('/msgList',function (req,res) {
    const userId = req.cookies.userId;
    UserModel.find(function (err,usersDocs) {
        const users = usersDocs.reduce((users,user) => {
            users[user._id] = {username:user.username,header:user.header};
            return users
        },{});
        ChatModel.find({'$or':[{from:userId},{to:userId}]},filter,function (err, chatMsgs) {
            res.send({code:0,data:{users,chatMsgs}})
        })
    })

});
//修改指定消息为已读
router.post('/readMsg',function (req, res) {
    const from = req.body.from;
    const to = req.cookie.userId
/*
* 更新数据库中的chat数据
* 参数1：查询条件
* 参数2：更新为指定的数据对象
* 参数3：是否一次更新多条，默认只更新一条
* 参数4：更新完成的回调函数
* */
ChatModel.update({from,to,read:false},{read:true},{multi:true},function (err, doc) {

    res.send({code:0,data:doc.nModified})
})
});

module.exports = router;

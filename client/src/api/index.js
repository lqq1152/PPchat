
import ajax from "./ajax";
//注册接口
export const reqRegister = (user) => ajax('/register',user,'POST')
//登录
export const reqLogin = ({username,password}) => ajax('/login',{username,password},'POST')
//更新
export const reqUpdateUser = (user) => ajax('/update',user,'POST')
//自动登录获取user信息
export const reqGetUser = () => ajax('/user')
//获取用户列表
export const reqGetUserList = (type) => ajax('/userList',{type})
//获取当前用户的聊天消息列表
export const reqChatMsgList = () => ajax('/msgList',)
//修改指定消息为已读
export const reqReadMsg = (from) => ajax('/userList',{from},'POST')
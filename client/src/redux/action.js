import {AUTO_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER,RECEIVE_USER_LIST,RECEIVE_MSG,RECEIVE_MSG_LIST} from "./action-type";
import {reqRegister, reqLogin, reqUpdateUser,reqGetUser,reqGetUserList,reqChatMsgList,reqReadMsg} from "../api";
import io from 'socket.io-client'

const autoSuccess = (user) => ({type:AUTO_SUCCESS,data:user});
const errorMsg = (msg) => ({type:ERROR_MSG,data:msg});
const receiveUser = (user) => ({type:RECEIVE_USER,data:user});
export const resetUser = (msg) => ({type:RESET_USER,data:msg});
const receiveUserList = (userList) => ({type:RECEIVE_USER_LIST,data:userList});
const receiveMsgList = ({users,chatMsgs}) => ({type:RECEIVE_MSG_LIST,data:{users,chatMsgs}});
const receiveMsg = (chatMsg) => ({type:RECEIVE_MSG,data:chatMsg});
//异步的action
export const register = (user) => {
    const {username,password,password2,type} = user;
    //做表单的前台验证
    if(!username){
        return errorMsg('请输入用户名！')
    }
    else if(password!==password2){
        return errorMsg('请输入相同的密码！')
    }
    //表单合法 发送异步ajax请求
    return async dispatch => {
       const response = await reqRegister({username,password,type});
        const result = response.data;
        if(result.code === 0){
            getMsgList(dispatch,result.data._id);
            dispatch(autoSuccess(result.data))
        }
        else {
            dispatch(errorMsg(result.msg))
        }
    }
};
export const login = (user) => {
    const {username,password} = user;
    if(!username){
        return errorMsg('请输入用户名！')
    }
    if(!password){
        return errorMsg('请输入密码！')
    }
    return async dispatch => {
        const response = await reqLogin(user);
        const result = response.data;
        if(result.code === 0){
            getMsgList(dispatch,result.data._id);
            dispatch(autoSuccess(result.data))
        }
        else {
            dispatch(errorMsg(result.msg))
        }
    }
};

//更新用户异步action
export const updateUser = (user) => {

    return async dispatch => {
        const response = await reqUpdateUser(user);
        const result = response.data;
        if(result.code === 0){
            dispatch(receiveUser(result.data))
        }
        else {
            dispatch(resetUser(result.msg))
        }
    }

};

//获取user信息的异步action
export const getUser = () => {
    return async dispatch => {
        const response = await reqGetUser();
        const result = response.data;
        if(result.code === 0){
            getMsgList(dispatch,result.data._id);
            dispatch(receiveUser(result.data))
        }
        else {
            dispatch(resetUser(result.msg))
        }

    }

};
//获取用户列表的异步action
export const getUserList = (type) => {
    return async dispatch => {
        const response = await reqGetUserList(type);
        // console.log(response);
        const result = response.data;
        if(result.code === 0){
            dispatch(receiveUserList(result.data))
        }
        else {
            dispatch(resetUser(result.msg))
        }

    }
};

/*
* 单例对象
* 1.创建对象之前：判断对象是否已经创建，没有才去创建对象
* 2.创建对象之后：保存对象
* */
//异步获取消息列表数据
async function getMsgList(dispatch,userId) {
    initIO(dispatch,userId)
    const response = await reqChatMsgList();
    const result = response.data;
    if(result.code===0){
        const {users,chatMsgs} = result.data;
        dispatch(receiveMsgList({users,chatMsgs}))

    }
}
function initIO(dispatch,userId) {
//链接服务器,得到与服务器的链接对象
    if(!io.socket){
        io.socket = io('ws://localhost:4000');
        io.socket.on('receiveMsg',function (chatMsg) {
            console.log(chatMsg);
            if(userId===chatMsg.from||userId===chatMsg.to){
               dispatch(receiveMsg(chatMsg))
            }
        })
    }

}
//发送消息的异步action
export const sendMsg = ({from,to,content}) => {
    return  dispatch => {
        console.log('fasongxiaoxi',{from,to,content});
        initIO(dispatch);
        //发消息
        io.socket.emit('sendMsg',{from,to,content})
    }
};

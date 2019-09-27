import {combineReducers} from "redux";

import {AUTO_SUCCESS,ERROR_MSG,RESET_USER,RECEIVE_USER,RECEIVE_USER_LIST,RECEIVE_MSG_LIST,RECEIVE_MSG} from "./action-type";
import {getRedirectTo} from "../utils";

const initUser = {
    username:'',
    type:'',
    msg:'' ,//错误提示信息
    redirectTo:''
};
function user(state = initUser, action) {
    switch (action.type) {
        case AUTO_SUCCESS:
            const {type,header} = action.data;
            return {...action.data,redirectTo: getRedirectTo(type, header)}
        case ERROR_MSG:
            return {...state,msg: action.data};
        case RESET_USER:
            return {...initUser,msg: action.data};
        case RECEIVE_USER:
            return action.data;
        default :
            return state

    }
}

const initUserList = [];
//产生userlist的reducer
function userList(state = initUserList, action) {

    switch (action.type) {
        case RECEIVE_USER_LIST:
            return action.data;
        default:
            return state
    }

}

const initChat = {
    users:{}, //所有用户信息的对象 属性名：userId，属性值：{username，header}
    chatMsgs:[],
    unReadCount:0
}
//产生聊天状态的reducer
function chat(state=initChat,action) {

    switch (action.type) {
        case RECEIVE_MSG_LIST:
            const {users,chatMsgs} = action.data;
            return {users,chatMsgs,unReadCount:0};
        case RECEIVE_MSG:
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs,action.data],
                unReadCount: 0
            };
        default:
            return state;
    }
}
export default combineReducers({
    user,
    userList,
    chat
})

import React,{Component} from 'react'
import {connect} from 'react-redux'
import {InputItem, List, NavBar,} from "antd-mobile";
import {sendMsg} from '../../redux/action'
const Item = List.Item

class Chat extends Component {

    state = {
        content:''
    }
    handleSend = () => {
        const from = this.props.user._id;
        const to = this.props.match.params.userId;
        const content = this.state.content.trim();
        //发送请求
        if(content){
           this.props.sendMsg({from,to,content})
        }
        this.setState({content:''})
    };
    render() {
        const {user} = this.props;
        const {users,chatMsgs} = this.props.chat;
        const myId = user._id;
        if(!users[myId]){
            return null; //如果没有获取数据，直接不做处理
        }
        const targetId = this.props.match.params.userId;
        const chatId = [myId,targetId].sort().join('-');

        const msgs = chatMsgs.filter(msg => msg.chat_id===chatId);

        const targetHeader = users[targetId].header;
        const targetIcon = targetHeader? require(`../../assets/images/${targetHeader}.jpg`) : null ;
        return (
            <div id='chat-page'>
                <NavBar className='navBar-head'>id</NavBar>)
                <List style={{marginTop:50,marginBottom:50}}>
                    {
                        msgs.map(msg => {
                            if(myId===msg.to){ //对方发的
                               return <Item key={msg._id} thumb={targetIcon}>{msg.content}</Item>
                            }else {//我发的
                                return <Item key={msg._id} className='chat-me' extra={'我'} >{msg.content}</Item>
                            }
                        })
                    }


                </List>
                <div className='am-tab-bar'>
                    <InputItem placeholder='请输入' value={this.state.content} onChange={content => this.setState({content})}  extra={<span onClick={this.handleSend}>发送</span>}/>
                </div>
            </div>

        )
    }
}
export default connect(
    state => ({user:state.user,chat:state.chat}),
    {sendMsg}
)(Chat)
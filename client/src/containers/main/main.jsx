import React,{Component} from 'react'
import {Route,Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'
import {NavBar} from "antd-mobile";

import BoyInfo from '../boy-info/boy-info'
import GirlInfo from '../girl-info/girl-info'
import Boy from '../boy/boy'
import Girl from '../girl/girl'
import Message from '../message/message'
import Person from '../personal/personal'
import {getRedirectTo} from "../../utils";
import {getUser} from "../../redux/action";
import FooterNav from "../../components/footerNav/footerNav";
import Chat from "../chat/chat";


class Main extends Component {

    navList = [

        {
            path:'/message',
            component: Message,
            title:'消息',
            icon:'聊天',
            text:'消息'
        },
        {
            path:'/boy',
            component: Boy,
            title:'Girls List',
            icon:'用户列表',
            text:'好友'
        },
        {
            path:'/girl',
            component: Girl,
            title:'Boy List',
            icon:'用户列表',
            text:'好友'
        },
        {
            path:'/person',
            component: Person,
            title:'个人中心',
            icon:'个人中心',
            text:'个人中心'
        }
    ]

    componentDidMount() {
        const userId = Cookie.get('userId')
        const {user} = this.props
        if(userId && !user._id){
           this.props.getUser()
        }
    }

    render() {
        const userId = Cookie.get('userId')
        if(!userId){
           return <Redirect to={'/login'}/>
        }
        const {user} = this.props

        if(!user._id){
            return null
        }
        else {
            let path = this.props.location.pathname;
            if(path==='/'){
                path = getRedirectTo(user.type,user.header);
                return <Redirect to={path}/>
            }
        }
        const {navList} = this;
        const path = this.props.location.pathname;
        const currentNav = navList.find(nav => nav.path===path);
        if(currentNav){
           if(user.type==='Boy'){
              navList[2].hide = true
           }else {
               navList[1].hide = true
           }
        }
        return (

            <div>
                {currentNav ? (<NavBar className='navBar-head'>{currentNav.title}</NavBar>) : null}
                <Switch>
                    {
                        navList.map(nav =>  <Route path={nav.path} component={nav.component} key={nav.title}/>)
                    }
                    <Route path='/boyinfo' component={BoyInfo}/>
                    <Route path='/girlinfo' component={GirlInfo}/>
                    <Route path='/chat/:userId' component={Chat}/>
                </Switch>
                {currentNav ? (<FooterNav navList={navList}/>) : null}
            </div>

        )
    }
}
export default connect(
    state => ({user:state.user}),
    {getUser}
)(Main)
/*
   1、实现自动登录：
      {componentDidMount（）}
      1）如果cookie中有userId，但是redux管理的user没有_id，发请求获取对应user
      {render（）}
      2）如果cookie中没有userID，自动进入login界面
      3）判断redux管理的user中是否有_id，如果没有，暂时不做任何显示
      4）如果有，说明已经登录，显示对应界面
   2、如果已经登录，如果请求根路径：
      根据user的type和和爱的人来计算一个重定向的路由路径，并自动重定向
*/

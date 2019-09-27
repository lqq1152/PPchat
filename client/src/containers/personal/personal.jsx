import React,{Component} from 'react'
import {connect} from 'react-redux'
import Cookie from 'js-cookie'
import {Result, WhiteSpace, List, Button,Modal} from "antd-mobile";

import {resetUser} from "../../redux/action";

const Item = List.Item
const Brief = Item.Brief
class Personal extends Component {

    logout = () => {
        Modal.alert('退出','确定退出登录？',[
            {text:'取消'},
            {text:'确认',
            onPress:() => {
                Cookie.remove('userId')
                this.props.resetUser()
            }}
        ])


    }
    render() {
        const {realName,age,school,intro,header,type} = this.props.user
        return (
            <div>
                <Result img={<img src={require(`../../assets/images/${header}.jpg`)} style={{width:50}} alt='header'/>}
                title={realName} message={school}/>
                <List renderHeader={() => '相关信息'}>
                    <Item multipleLine>
                        <Brief>年龄：{age}</Brief>
                        <Brief>性别：{type}</Brief>
                        <Brief>简介：{intro}</Brief>
                    </Item>
                </List>
                <WhiteSpace/>
                <Button type='warning' onClick={this.logout}>退出登录</Button>


            </div>
        )
    }
}
export default connect(
    state => ({user:state.user}),
    {resetUser}
)(Personal)
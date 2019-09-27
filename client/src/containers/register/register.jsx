import React,{Component} from 'react'
import {NavBar,WingBlank,List,InputItem,WhiteSpace,Radio,Button} from "antd-mobile";
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {register} from "../../redux/action";
import Logo from "../../components/logo/logo";

const ListItem = List.Item
 class Register extends Component {
    state = {
        username:'',
        password:'',
        password2:'',
        type: 'Boy'
    }
    register = () => {
        // console.log(this.state);
        this.props.register(this.state)
    
    }
    handleChange = (name,val) => {
        this.setState({
            [name]:val
        })
    }
    toLogin = () => {
        this.props.history.replace('/login')
    }
    render() {
        const {type} = this.state

        const {msg,redirectTo} = this.props.user
        // console.log(this.props.user.msg);
        // console.log(msg);
        if(redirectTo){
            return <Redirect to={redirectTo}/>
        }
        return (
            <div>
                <NavBar>PP&nbsp;Chat</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        {msg ? <div className='err-msg'>{msg}</div> : null }
                        <WhiteSpace/>
                        <InputItem placeholder='请输入用户名' onChange={val => {this.handleChange('username',val)}}>用户名:</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入密码' type='password' onChange={val => {this.handleChange('password',val)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='请确认密码' type='password' onChange={val => {this.handleChange('password2',val)}}>确认密码:</InputItem>
                        <WhiteSpace/>
                        <ListItem>
                            <span>性&nbsp;&nbsp;&nbsp;别:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={type==='Boy'} onChange={val => {this.handleChange('type','Boy')}}>Boy</Radio>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={type==='Girl'} onChange={val => {this.handleChange('type','Girl')}}>Girl</Radio>
                        </ListItem>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;&nbsp;&nbsp;册</Button>
                        <Button onClick={this.toLogin}>已有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {register}
)(Register)

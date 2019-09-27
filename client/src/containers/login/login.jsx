import React,{Component} from 'react'
import {NavBar,WingBlank,List,InputItem,WhiteSpace,Button} from "antd-mobile";
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {login} from "../../redux/action";
import Logo from "../../components/logo/logo";


 class Login extends Component {
    state = {
        username:'',
        password:'',

    }
    login = () => {
        // console.log(this.state);
        this.props.login(this.state)
    }
    handleChange = (name,val) => {
        this.setState({
            [name]:val
        })
    }
    toRegister = () => {
        this.props.history.replace('/register')
    }
    render() {
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
                        <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;&nbsp;&nbsp;入</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toRegister}>未拥有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state => ({user:state.user}),
    {login}
)(Login)
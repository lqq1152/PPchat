import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from  'react-router-dom'
import {NavBar, WingBlank, InputItem, WhiteSpace, Button, TextareaItem} from "antd-mobile";

import HeadSelect from "../../components/header-select/head-select";
import {updateUser} from "../../redux/action";

 class GirlInfo extends Component {

     state = {
         realName:'',
         age:'',
         school:'',
         intro: '',
         header: ''
     };

     setHeader = (header) => {
         this.setState({header})
     };

     handleChange = (name,val) => {
         this.setState({
             [name]:val
         })
     };
     toMain = () => {
         this.props.history.replace('/main')
     };

     save = () => {
         this.props.updateUser(this.state)
     };

     render() {
         const {header,type} = this.props.user
         if(header){
             const path = type==='Boy' ? '/boy':'/girl'
             return <Redirect to={path}/>
         }
         return (
             <div>
                 <NavBar>个人信息完善</NavBar>
                 <HeadSelect setHeader={this.setHeader}/>
                 <WhiteSpace/>
                 <WingBlank>
                     <InputItem placeholder='请输入姓名' onChange={val => {this.handleChange('realName',val)}}>姓&nbsp;&nbsp;&nbsp;名:</InputItem>
                     <WhiteSpace/>
                     <InputItem placeholder='请输入年龄'  onChange={val => {this.handleChange('age',val)}}>年&nbsp;&nbsp;&nbsp;龄:</InputItem>
                     <WhiteSpace/>
                     <InputItem placeholder='请输入学校'  onChange={val => {this.handleChange('school',val)}}>学&nbsp;&nbsp;&nbsp;校:</InputItem>
                     <WhiteSpace/>
                     <TextareaItem title='个人介绍:' rows={3} onChange={val => {this.handleChange('intro',val)}}/>
                     <WhiteSpace/>
                     <Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
                 </WingBlank>

             </div>
         )
     }
 }

export default connect(
    state => ({user:state.user}),
    {updateUser}
)(GirlInfo)
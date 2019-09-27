import React,{Component} from 'react'
import {connect} from 'react-redux'
import UserList from "../../components/user-list/user-list";
import {getUserList} from "../../redux/action";

 class Girl extends Component {
     componentDidMount() {
         // const {type} = this.props.user
         // if(type==='Boy')
         this.props.getUserList('Boy')
         // console.log(this.props.userList);
     }
    render() {
        return (
            <UserList userList={this.props.userList}/>
        )
    }
}
export default connect(
    state => ({userList:state.userList}),
    {getUserList}
)(Girl)
import React,{Component} from 'react'
import {connect} from 'react-redux'

import {getUserList} from "../../redux/action";
import UserList from "../../components/user-list/user-list";



class Boy extends Component {
    componentDidMount() {
        // const {type} = this.props.user
        // if(type==='Boy')
        this.props.getUserList('Girl')
    }    render() {
        return (
            <UserList userList={this.props.userList}/>
        )
    }
}
export default connect(
    state => ({userList:state.userList}),
    {getUserList}
)(Boy)
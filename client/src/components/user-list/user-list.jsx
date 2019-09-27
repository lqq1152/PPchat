import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {WhiteSpace,WingBlank,Card} from "antd-mobile";
import {withRouter} from 'react-router-dom'
const Header = Card.Header
const Body = Card.Body


 class UserList extends Component {
    static propTypes ={
        userList:PropTypes.array.isRequired
    }
    render() {
        const {userList} = this.props
        // console.log(userList);
        return (
            <WingBlank style={{marginBottom:50,marginTop:50}}>
                {
                    userList.map(user => (
                        <div key={user._id}>
                            <WhiteSpace/>
                            <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                                <Header title={user.realName}  thumb={require(`../../assets/images/${user.header}.jpg`) }/>
                                <Body>
                                    <div>年龄：{user.age}</div>
                                    <div>学校：{user.school}</div>
                                    <div>简介：{user.intro}</div>
                                </Body>
                            </Card>
                        </div>
                    ))
                }
            </WingBlank>
        )
    }
}
export default withRouter(UserList)
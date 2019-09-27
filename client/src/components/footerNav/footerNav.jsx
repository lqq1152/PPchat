import React,{Component} from 'react'
import { TabBar } from 'antd-mobile';
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

const {Item} = TabBar
//在非路由组件中使用路由库的api withRouter
 class FooterNav extends Component {
    static propsTypes = {
        navList : PropTypes.array.isRequired
    }
    render() {
        let {navList} = this.props
        const path = this.props.location.pathname
        navList = navList.filter(nav => !nav.hide)
        return (
            <TabBar>
                {
                    navList.map(
                        nav => (<Item key={nav.path} title={nav.text} icon={{uri:require(`./images/${nav.icon}.png`)}}
                        selectedIcon={{uri:require(`./images/${nav.icon}-已选中.png`)}}
                                      selected={nav.path === path}
                        onPress={() => {this.props.history.replace(nav.path)}}/>)
                    )
                }
            </TabBar>
        )
    }
}
// 内部会传入一些路由组件的特有属性 ：history、location、math
export default withRouter(FooterNav) //向外暴露包装后的组件
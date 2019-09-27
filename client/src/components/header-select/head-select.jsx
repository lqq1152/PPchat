import React,{Component} from 'react'
import {List,Grid} from "antd-mobile";
import PropTypes from 'prop-types'

export default class HeadSelect extends Component {

    static propType = {
        setHeader : PropTypes.func.isRequired
    }
    state = {
        icon:null   //图片对象
    }

    constructor(props){
        super(props)
        this.headerList = []
        for(let i=0;i<2;i++){
            this.headerList.push(
                {
                    text: 'pig-'+ (i+1),
                    icon: require(`../../assets/images/pig-${i+1}.jpg`)
                }
            )
        }
    }

    handleClick = ({text,icon}) => {
        this.setState({icon})
        this.props.setHeader(text)
    }
    render() {
        const listHeader = this.state.icon ?  (<div>已选择图片：<img src={this.state.icon} width={30} height={30} alt='header'/></div> ):'请选择头像'
        return (
            <div>
                <List renderHeader={() => listHeader}>
                    <Grid data={this.headerList} columnNum={5} onClick={this.handleClick}/>
                </List>
            </div>
        )
    }
}

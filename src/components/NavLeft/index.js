import React, {Component} from 'react'
import LOGO from '../../resource/assets/logo-ant.svg'
import { Menu } from 'antd'
import { NavLink } from 'react-router-dom'
import './index.less'
import menuList from '../../config/menuConfig'

const SubMenu = Menu.SubMenu;

export default class NavLeft extends Component {

  componentWillMount() {
    const menu = this.getMenuList(menuList);
    this.setState({
      menu
    })
  }

  getMenuList = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu key={item.key} title={item.title}>
            {this.getMenuList(item.children)}
          </SubMenu>
        )
      }
      return <Menu.Item key={item.key} title={item.title}><NavLink to={item.key}>{item.title}</NavLink></Menu.Item>
    })
  }

  render () {
    return (
      <div  className="nav-left">
        <NavLink to="/main/home">
          <div style={{backgroundColor: '#002140'}}>
              <img src={LOGO} alt="logo"/>
              <h1>后台管理系统</h1>
          </div>
        </NavLink>
        <Menu mode="vertical" theme="dark">
          {this.state.menu}
          {/* <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </SubMenu> */}
        </Menu>
      </div> 
    )
  }
}
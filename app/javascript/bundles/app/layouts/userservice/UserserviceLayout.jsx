import React from 'react'
import _ from 'lodash'
import { Layout, Menu, Icon } from 'antd'
import Footer from '../Footer'
import Header from '../Header'
import ContentBreadcrumb from '../ContentBreadcrumb'
import { menuData } from 'app/constants/menu'

import 'styles/app/layouts/userservice/userservice_layout'

const { Sider, Content } = Layout
const { ItemGroup, SubMenu } = Menu
const SIDER_COLLAPSED_KEY = 'authservice_layout_sider_collapsed'

class UserserviceLayout extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      collapsed: localStorage.getItem(SIDER_COLLAPSED_KEY) == 'true',
    }

    _.bindAll(this, [
      'toggleSider',
      'loadSiderMenu',
    ])
  }

  toggleSider(){
    const collapsed = !this.state.collapsed
    localStorage.setItem(SIDER_COLLAPSED_KEY, collapsed)
    this.setState({ collapsed })
  }

  loadSiderMenu(data) {
    if(data.type == 'link') {
      return (
        <Menu.Item key={data.path}>
          <a href={data.path}>{data.title}</a>
        </Menu.Item>
      )
    } else if (data.type == 'subMenu') {
      return (
        <SubMenu key={data.path} title={data.title}>
          {data.items.map(item => this.loadSiderMenu(item))}
        </SubMenu>
      )
    } else if (data.type == 'itemGroup') {
      return (
        <ItemGroup key={data.path} title={data.title}>
          {data.items.map(item => this.loadSiderMenu(item))}
        </ItemGroup>
      )
    }
  }

  toggleSider(){
    const collapsed = !this.state.collapsed
    localStorage.setItem(SIDER_COLLAPSED_KEY, collapsed)
    this.setState({ collapsed })
  }

  loadSiderMenu(data) {
    if(data.type == 'link') {
      return (
        <Menu.Item key={data.path}>
          <a href={data.path}>{data.title}</a>
        </Menu.Item>
      )
    } else if (data.type == 'subMenu') {
      return (
        <SubMenu key={data.path} title={data.title}>
          {data.items.map(item => this.loadSiderMenu(item))}
        </SubMenu>
      )
    } else if (data.type == 'itemGroup') {
      return (
        <ItemGroup key={data.path} title={data.title}>
          {data.items.map(item => this.loadSiderMenu(item))}
        </ItemGroup>
      )
    }
  }

  render() {
    const {location} = this.props
    const {collapsed} = this.state

    const pathname = location.pathname || ''
    const paths = pathname.split('/')
    const _paths = paths.map((path, index) => (
      paths.slice(0, index+1).join('/')
    ))
    
    return (
      <Layout className="layout-wraper authservice-layout">
        <Sider
          className="layout-sider"
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="layout-sider-logo">
            <a href="/">
              <img
                alt="Edumall logo"
                src={collapsed ? '/assets/edumall-logo.png' : '/assets/edumall-logo-full.png'}
              />
            </a>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={_paths}
            defaultOpenKeys={collapsed ? [] : _paths}
            inlineCollapsed={collapsed}
          >
            {menuData.map(menu => this.loadSiderMenu(menu))}
          </Menu>
        </Sider>
        <Layout className="layout-content">
          <Header
            collapsed={collapsed}
            toggleSider={this.toggleSider}
          />
          <Content className="content-wraper">
            <ContentBreadcrumb location={location}/>
            <div className="content-box">
              {this.props.children}
            </div>
          </Content>
          <Footer/>
        </Layout>
      </Layout>
  
    );
  }
}

export default UserserviceLayout
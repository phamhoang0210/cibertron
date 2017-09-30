import React from 'react'
import { Breadcrumb } from 'antd'
import { breadcrumbData } from 'app/constants/breadcrumb'
import { Layout, Menu } from 'antd'
import { menuData } from 'app/constants/menu'

const { ItemGroup, SubMenu } = Menu

class Sider extends React.Component {
  render() {
    const {location} = this.props
    const pathname = location.pathname || ''
    const paths = pathname.split('/')
    const _paths = paths.map((path, index) => (
      paths.slice(0, index+1).join('/')
    ))

    const loadMenu = (data) => {
      if(data.type == 'link') {
        return (
          <Menu.Item key={data.path}>
            <a href={data.path}>{data.title}</a>
          </Menu.Item>
        )
      } else if (data.type == 'subMenu') {
        return (
          <SubMenu key={data.path} title={data.title}>
            {data.items.map(item => loadMenu(item))}
          </SubMenu>
        )
      } else if (data.type == 'itemGroup') {
        return (
          <ItemGroup key={data.path} title={data.title}>
            {data.items.map(item => loadMenu(item))}
          </ItemGroup>
        )
      }
    }

    return (
      <Layout.Sider width={230} className="layout-sider">
        <div className="layout-sider-logo">
          <a href="/">
            <img alt="Edumall logo"src="/assets/edumall-logo-full.png" />
          </a>
        </div>
        <Menu 
          theme="dark"
          mode="inline"
          defaultSelectedKeys={_paths}
          defaultOpenKeys={_paths}
        >
          {menuData.map(menu => loadMenu(menu))}
        </Menu>
      </Layout.Sider>
    )
  }
}

export default Sider
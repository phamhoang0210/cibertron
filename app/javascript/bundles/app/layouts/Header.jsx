import React from 'react'
import {Row, Col, Menu, Icon, Layout} from 'antd'
const SubMenu = Menu.SubMenu

class Header extends React.Component {
  render() {
    const {collapsed, toggleSider} = this.props

    return (
      <Layout.Header className="layout-content-header">
        <Row type="flex" justify="end">
          <Col span={16}>
            {toggleSider && (
              <Icon
                className="trigger"
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={toggleSider}
              />
            )}
          </Col>
          <Col span={8}>
            <Menu
              className="layout-content-header-menu"
              mode="horizontal"
            >
              <SubMenu
                title={<span>
                  <Icon type="user" />
                  {localStorage.getItem('gaia-uid') || 'User'}
                </span>}
              >
                <Menu.Item key="sign_out">
                  <a href="/auth/sign_out">Sign out</a>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Col>
        </Row>
      </Layout.Header>
    )
  }
}

export default Header
import React from 'react'
import {Row, Col, Menu, Icon, Layout, Dropdown} from 'antd'
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
            <div className="layout-content-header-tools">
              <Dropdown
                overlay={(
                  <Menu>
                    <Menu.Item key="myaccount">
                      <a href="/manage/account">Your Account</a>
                    </Menu.Item>
                    <Menu.Item key="sign_out">
                      <a href="/auth/sign_out">Sign out</a>
                    </Menu.Item>
                  </Menu>
                )}
              >
                <span className="layout-content-header-tools-action">
                  <Icon type="user"/> {localStorage.getItem('cibertron-uid') || 'User'}
                </span>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </Layout.Header>
    )
  }
}

export default Header

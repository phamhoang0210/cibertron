import React from 'react'
import {Row, Col, Menu, Icon, Layout} from 'antd'
const SubMenu = Menu.SubMenu

class Header extends React.Component {
  render() {
    return (
      <Layout.Header style={{ background: '#fff', padding: 0 }}>
        <Row type="flex" justify="end">
          <Col span={4}>
            <Menu mode="horizontal" onClick={null} style={{ lineHeight: '64px', float: 'right' }}>
              <SubMenu
                title={<span>
                  <Icon type="user" />
                  User
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
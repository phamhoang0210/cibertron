import React from 'react'
import _ from 'lodash'
import { Layout, Menu, Icon, Row, Col } from 'antd'
const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu
import 'styles/layouts/application/application_layout'

class ApplicationLayout extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <Layout className="application-layout">
        <Layout style={{ minHeight: '100vh' }}>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Row type="flex" justify="end">
              <Col span={4}>
                <Menu mode="horizontal" onClick={null} style={{ lineHeight: '64px', float: 'right' }}>
                  <SubMenu
                    title={<span>
                      <Icon type="user" />
                      DuongTV
                    </span>}
                  >
                    <Menu.Item key="logout">
                      Sign out
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </Col>
            </Row>
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff', textAlign: 'left' }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Copyright © 2017 TST Team. All rights reserved.
          </Footer>
        </Layout>
      </Layout>
  
    );
  }
}

export default ApplicationLayout
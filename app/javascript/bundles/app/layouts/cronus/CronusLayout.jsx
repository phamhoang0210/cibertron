import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router'
import { Layout, Menu, Icon, Img, Row, Col } from 'antd'
const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu
import 'styles/layouts/cronus/cronus_layout'

class CronusLayout extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <Layout className="cronus-layout">
        <Sider width={230} style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
          <div className="logo">
            <span>CRONUS</span>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="1">
              <Link to={'/cronus/channels'}>Channels</Link>
            </Menu.Item>
            <Menu.Item key="2">
            <Link to={'/cronus/providers'}>Providers</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to={'/cronus/categories'}>Categories</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 230, minHeight: '100vh' }}>
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
            <div style={{ padding: 24, background: '#fff' }}>
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

export default CronusLayout
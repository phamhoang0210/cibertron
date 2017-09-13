import React from 'react'
import _ from 'lodash'
import { Layout, Menu, Icon, Img, Row, Col } from 'antd'
const { Content, Sider } = Layout
const SubMenu = Menu.SubMenu
import Footer from '../Footer'
import Header from '../Header'
import 'styles/layouts/layout'

class CronusLayout extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <Layout className="layout-wraper cronus-layout">
        <Sider width={230} style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
          <div className="logo">
            <span>CRONUS</span>
          </div>
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1">
              <a href="/cronus/campaigns">Campaigns</a>
            </Menu.Item>
            <Menu.Item key="2">
              <a href="/cronus/nodes">Nodes</a>
            </Menu.Item>
            <Menu.Item key="3">
              <a href="/cronus/channels">Channels</a>
            </Menu.Item>
            <Menu.Item key="4">
              <a href="/cronus/providers">Providers</a>
            </Menu.Item>
            <Menu.Item key="5">
              <a href="/cronus/categories">Categories</a>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 230, minHeight: '100vh' }}>
          <Header/>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff' }}>
              {this.props.children}
            </div>
          </Content>
          <Footer/>
        </Layout>
      </Layout>
  
    );
  }
}

export default CronusLayout
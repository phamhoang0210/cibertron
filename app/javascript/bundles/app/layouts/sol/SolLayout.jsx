import React from 'react'
import _ from 'lodash'
import { Layout, Menu, Icon, Img, Row, Col } from 'antd'
const { Content, Sider } = Layout
const SubMenu = Menu.SubMenu
import Footer from '../Footer'
import Header from '../Header'
import 'styles/layouts/layout'

class SolLayout extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <Layout className="layout-wraper cronus-layout">
        <Sider width={230} style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
          <div className="logo">
            <span>SOL</span>
          </div>
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1">
              <a href="/sol/promos">Promos</a>
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

export default SolLayout
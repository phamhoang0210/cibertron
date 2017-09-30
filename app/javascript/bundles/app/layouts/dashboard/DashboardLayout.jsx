import React from 'react'
import _ from 'lodash'
import { Layout, Menu, Icon, Row, Col } from 'antd'
import Footer from '../Footer'
import Header from '../Header'

import 'styles/app/layouts/dashboard/dashboard_layout'

const { Content, Sider } = Layout
const SubMenu = Menu.SubMenu

class DashboardLayout extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <Layout className="layout-wraper dashboard-layout">
        <Layout style={{ minHeight: '100vh' }}>
          <Header/>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff', textAlign: 'left' }}>
              {this.props.children}
            </div>
          </Content>
          <Footer/>
        </Layout>
      </Layout>
  
    );
  }
}

export default DashboardLayout
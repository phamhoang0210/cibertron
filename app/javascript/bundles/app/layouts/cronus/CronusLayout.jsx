import React from 'react'
import _ from 'lodash'
import { Layout } from 'antd'
import Footer from '../Footer'
import Header from '../Header'
import ContentBreadcrumb from '../ContentBreadcrumb'
import Sider from '../Sider'

import 'styles/layouts/layout'

const { Content } = Layout

class CronusLayout extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const {location} = this.props
    return (
      <Layout className="layout-wraper cronus-layout">
        <Sider location={location}/>
        <Layout style={{ marginLeft: 230, minHeight: '100vh' }}>
          <Header/>
          <Content style={{ margin: '16px 16px 0', overflow: 'initial' }}>
            <ContentBreadcrumb location={location}/>
            <div style={{ marginTop: 16,padding: 16, background: '#fff' }}>
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
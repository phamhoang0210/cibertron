import React from 'react'
import _ from 'lodash'
import { Layout } from 'antd'
import Footer from '../Footer'
import Header from '../Header'
import ContentBreadcrumb from '../ContentBreadcrumb'
import Sider from '../Sider'

import 'styles/app/layouts/cronus/cronus_layout'

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
        <Layout className="layout-content">
          <Header/>
          <Content className="content-wraper">
            <ContentBreadcrumb location={location}/>
            <div className="content-box">
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
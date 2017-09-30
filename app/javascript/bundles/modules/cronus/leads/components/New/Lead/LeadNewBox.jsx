import React from 'react'
import _ from 'lodash'
import { Tabs } from 'antd'
import LeadNewC3Form from './LeadForm/LeadNewC3Form'
import { LEAD_CREATE_API_PATH } from '../../../constants/paths'

const { TabPane } = Tabs

class LeadNewBox extends React.Component {
  constructor(props) {
    super(props)
    _.bindAll(this, [
      'handleSubmit'
    ])
  }

  handleSubmit(level, values) {
    console.log(LEAD_CREATE_API_PATH[level], values)
  }

  render() {
    return (
      <Tabs defaultActiveKey="c3" size="small">
        <TabPane tab="C3" key="c3">
          <LeadNewC3Form
            {...this.props}
            onSubmit={(values) => this.handleSubmit('C3', values)}
          />
        </TabPane>
        <TabPane tab="L1" key="l1" disabled>L1</TabPane>
        <TabPane tab="L8" key="l8" disabled>L8</TabPane>
      </Tabs>
    )
  }
}

export default LeadNewBox
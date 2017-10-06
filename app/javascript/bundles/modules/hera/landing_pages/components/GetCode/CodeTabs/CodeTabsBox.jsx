import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import { Tabs, Spin, Row, Col } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'
import LogicHome from './Tab/LogicHome'
import LogicThankyou from './Tab/LogicThankyou'
import Forms from './Tab/Forms'
import Countdowns from './Tab/Countdowns'
import FacebookComment from './Tab/FacebookComment'

const TabPane = Tabs.TabPane

class CodeTabsBox extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {getCodeState} = this.props
    const alert = getCodeState.get('alert')
    const isFetchingLandingPageCodes = getCodeState.get('isFetchingLandingPageCodes')

    return (
      <div className="main-content-tabs-box">
        {alert && !alert.isEmpty() && (
          <Row className="main-content-form-box-alert-box">
            <Col span={24}>
              <AlertBox
                messages={alert.get('messages')}
                type={alert.get('type')}
              />
            </Col>
          </Row>
        )}
        {isFetchingLandingPageCodes && (
          <div className="main-content-form-box-loading-box">
            <Spin />
          </div>
        ) || (
          <Tabs defaultActiveKey="logic_home">
            <TabPane tab="Logic home page" key="logic_home">
              <LogicHome {...this.props}/>
            </TabPane>
            <TabPane tab="Logic thankyou page" key="logic_thankyou">
              <LogicThankyou {...this.props}/>
            </TabPane>
            <TabPane tab="Form" key="form">
              <Forms {...this.props}/>
            </TabPane>
            <TabPane tab="Cowndown" key="countdown">
              <Countdowns {...this.props}/>
            </TabPane>
            <TabPane tab="Facebook comment" key="facebook_comment">
              <FacebookComment {...this.props}/>
            </TabPane>
          </Tabs>
        )}
      </div>
    )
  }
}

export default CodeTabsBox
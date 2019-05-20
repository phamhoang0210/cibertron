import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import { Tabs, Spin, Row, Col } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'
import LogicHome from './Tab/LogicHome'
import LogicThankyou from './Tab/LogicThankyou'
import Forms from './Tab/Forms'
import Countdowns from './Tab/Countdowns'
import FacebookComment from './Tab/FacebookComment'
import { injectIntl } from 'react-intl'

const TabPane = Tabs.TabPane

class CodeTabsBox extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {getCodeState, intl} = this.props
    const alert = getCodeState.get('alert')
    const isFetchingLandingPageCodes = getCodeState.get('isFetchingLandingPageCodes')
    const landingPage = getCodeState.get('landingPage')
    console.log('debug', landingPage && landingPage.get('landing_page_type') == 'c3_cod')

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
            <TabPane
              key="logic_home"
              tab={intl.formatMessage({id: 'get_codes.code_tabs.tab.logic_home.title'})}
            >
              <LogicHome {...this.props}/>
            </TabPane>
            <TabPane
              key="logic_thankyou"
              tab={intl.formatMessage({id: 'get_codes.code_tabs.tab.logic_thankyou.title'})}
            >
              <LogicThankyou {...this.props}/>
            </TabPane>
            <TabPane
              key="form"
              tab={intl.formatMessage({id: 'get_codes.code_tabs.tab.form.title'})}
            >
              <Forms {...this.props}/>
            </TabPane>
            <TabPane
              key="countdown"
              tab={intl.formatMessage({id: 'get_codes.code_tabs.tab.countdown.title'})}
            >
              <Countdowns {...this.props}/>
            </TabPane>
            <TabPane
              key="facebook_comment"
              tab={intl.formatMessage({id: 'get_codes.code_tabs.tab.facebook_comment.title'})}
            >
              <FacebookComment {...this.props}/>
            </TabPane>
          </Tabs>
        )}
      </div>
    )
  }
}

export default injectIntl(CodeTabsBox)
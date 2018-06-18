import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import { notification, Tabs } from 'antd'
import CodeTabsBox from './CodeTabs/CodeTabsBox'
import PagespeedInsightBox from './PagespeedInsight/PagespeedInsightBox'
import { injectIntl } from 'react-intl'

const TabPane = Tabs.TabPane

class GetCodeScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, getCodeState, params} = this.props
    if(params && params.id) {
      actions.fetchLandingPageCodes(params.id)
      // actions.fetchLandingPagePagespeedInsights(params.id)
    }
  }

  componentWillReceiveProps(nextProps) {
    const alert = this.props.getCodeState.get('alert')
    const nextAlert = nextProps.getCodeState.get('alert')
    if(nextAlert && !nextAlert.equals(alert)) {
      nextAlert.get('messages').forEach(message => {
        notification[nextAlert.get('type')]({
          message: message,
        })
      })
    }
  }

  render() {
    const {getCodeState, intl} = this.props
    const landingPageCodes = getCodeState.get('landingPageCodes')
    return (
      <div className="main-content hera--landing-pages--get-code box">
        <div className="box-body">
          <Tabs>
            <TabPane tab={intl.formatMessage({id: 'get_codes.title'})} key="get_codes">
              <CodeTabsBox {...this.props}/>
            </TabPane>
            <TabPane tab={intl.formatMessage({id: 'pagespeed_insight.title'})} key="pagespeed_insight">
              <PagespeedInsightBox {...this.props}/>
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default injectIntl(GetCodeScreen)
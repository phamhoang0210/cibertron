import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import { notification } from 'antd'
import CodeTabsBox from './CodeTabs/CodeTabsBox'
import { injectIntl } from 'react-intl'

class GetCodeScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, getCodeState, params} = this.props
    if(params && params.id) {
      actions.fetchLandingPageCodes(params.id)
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
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'get_codes.title'})}
          </h1>
        </div>
        <div className="box-body">
          <CodeTabsBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(GetCodeScreen)
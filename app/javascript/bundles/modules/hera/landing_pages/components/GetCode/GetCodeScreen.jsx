import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import { notification } from 'antd'
import CodeTabsBox from './CodeTabs/CodeTabsBox'

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
    const {getCodeState} = this.props
    const landingPageCodes = getCodeState.get('landingPageCodes')
    return (
      <div className="main-content hera-landingPages-get-code">
        <h1 className="main-content-title">LandingPage codes</h1>
        <CodeTabsBox {...this.props}/>
      </div>
    )
  }
}

export default GetCodeScreen
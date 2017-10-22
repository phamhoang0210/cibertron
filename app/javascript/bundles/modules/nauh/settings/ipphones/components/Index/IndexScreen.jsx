import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import IpphonesTableBox from './Ipphone/IpphonesTable/IpphonesTableBox'
import { notification } from 'antd'
import { injectIntl } from 'react-intl'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState} = this.props
    const ipphoneParams = getFilterParams(indexState.get('ipphoneFilters'))
    actions.fetchIpphones(ipphoneParams)
    actions.fetchUsers({per_page: 'infinite'})
  }

  componentWillReceiveProps(nextProps) {
    const alert = this.props.indexState.get('alert')
    const nextAlert = nextProps.indexState.get('alert')
    if(nextAlert && !nextAlert.equals(alert)) {
      nextAlert.get('messages').forEach(message => {
        notification[nextAlert.get('type')]({
          message: message,
        })
      })
    }
  }

  render() {
    const {indexState, intl} = this.props

    return (
      <div className="main-content nauh--settings--ipphones box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'index.title'})}
          </h1>
        </div>
        <div className="box-body">
          <IpphonesTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(IndexScreen)
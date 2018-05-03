import React from 'react'
import ReportTableBox from './ReportTable/ReportTableBox'
import { notification } from 'antd'
import { injectIntl } from 'react-intl'

class ReportScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions} = this.props
    actions.fetchLeadReport({})
    actions.fetchUsers({per_page: 'infinite'})
  }

  componentWillReceiveProps(nextProps) {
    const alert = this.props.reportState.get('alert')
    const nextAlert = nextProps.reportState.get('alert')
    if(nextAlert && !nextAlert.equals(alert)) {
      nextAlert.get('messages').forEach(message => {
        notification[nextAlert.get('type')]({
          message: message,
        })
      })
    }
  }

  render() {
    const {intl} = this.props

    return (
      <div className="main-content nauh--leads-assign box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'report.title'})}
          </h1>
        </div>
        <div className="box-body">
          <ReportTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(ReportScreen)
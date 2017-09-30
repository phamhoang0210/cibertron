import React from 'react'
import ReportTableBox from './ReportTable/ReportTableBox'
import { notification } from 'antd'

class AssignScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions} = this.props
    actions.fetchLeadReport({})
    actions.fetchUsers({per_page: 'infinite'})
  }

  componentWillReceiveProps(nextProps) {
    const alert = this.props.assignState.get('alert')
    const nextAlert = nextProps.assignState.get('alert')
    if(nextAlert && !nextAlert.equals(alert)) {
      nextAlert.get('messages').forEach(message => {
        notification[nextAlert.get('type')]({
          message: message,
        })
      })
    }
  }

  render() {
    return (
      <div className="main-content nauh-leads-assign">
        <h1 className="main-content-title">Assign</h1>
        <ReportTableBox {...this.props}/>
      </div>
    )
  }
}

export default AssignScreen
import React from 'react'
import { getFilterParams, notify } from 'helpers/applicationHelper'
import DepartmentTableBox from './Department/DepartmentTable/DepartmentTableBox'
import { injectIntl } from 'react-intl'
import { notification } from 'antd'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState, location} = this.props
    const departmentParams = getFilterParams(indexState.get('departmentFilters'), location)
    actions.fetchDepartments(departmentParams)
  }

  componentWillReceiveProps(nextProps) {
    const noti = this.props.indexState.get('notification')
    const nextNoti = nextProps.indexState.get('notification')
  }

  render() {
    const {indexState, intl} = this.props
    return (
      <div className="main-content authservice--departments box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'index.title'})}
          </h1>
        </div>
        <div className="box-body">
          <DepartmentTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(IndexScreen)
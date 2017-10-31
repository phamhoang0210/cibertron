import React from 'react'
import { notify } from 'helpers/applicationHelper'
import DepartmentEditForm from './Department/Form/DepartmentEditForm'
import {injectIntl} from 'react-intl'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchDepartment(params.id, {fields: 'company{},sup_department{}'})
    actions.fetchCompanies({per_page: 'infinite'})
    actions.fetchSupDepartments({per_page: 'infinite'})
  }

  componentWillReceiveProps(nextProps) {
    const noti = this.props.editState.get('notification')
    const nextNoti = nextProps.editState.get('notification')
    notify(noti, nextNoti)
  }

  render() {
    const {intl} = this.props

    return (
      <div className="main-content authservice--departments--edit box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'edit.title'})}
          </h1>
        </div>
        <div className="box-body">
          <DepartmentEditForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(EditScreen)
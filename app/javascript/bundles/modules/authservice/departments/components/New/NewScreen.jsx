import React from 'react'
import DepartmentNewForm from './Department/DepartmentForm/DepartmentNewForm'
import { injectIntl } from 'react-intl'

class NewScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions} = this.props
    actions.fetchCompanies({per_page: 'infinite'})
    actions.fetchSupDepartments({per_page: 'infinite'})
  }

  render() {
    const {intl} = this.props

    return (
      <div className="main-content authservice--departments--new box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'new.title'})}
          </h1>
        </div>
        <div className="box-body">
          <DepartmentNewForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(NewScreen)
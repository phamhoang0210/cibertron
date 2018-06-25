import React from 'react'
import BudgetEditForm from './Budget/Form/BudgetEditForm'
import { injectIntl } from 'react-intl'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchBudget(params.id, {fields: 'landing_page{}'})
  }

  render() {
    const {intl} = this.props

    return (
      <div className="main-content hera--Budgets--edit box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'edit.title'})}
          </h1>
        </div>
        <div className="box-body">
          <BudgetEditForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(EditScreen)

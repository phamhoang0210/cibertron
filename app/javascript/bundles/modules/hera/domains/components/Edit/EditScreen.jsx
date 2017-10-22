import React from 'react'
import DomainEditForm from './Domain/Form/DomainEditForm'
import { injectIntl } from 'react-intl'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchDomain(params.id, {fields: 'landing_page{}'})
  }

  render() {
    const {intl} = this.props

    return (
      <div className="main-content hera--domains--edit box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'edit.title'})}
          </h1>
        </div>
        <div className="box-body">
          <DomainEditForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(EditScreen)
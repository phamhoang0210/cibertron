import React from 'react'
import ProviderEditForm from './Provider/Form/ProviderEditForm'
import { injectIntl } from 'react-intl'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchProvider(params.id)
  }

  render() {
    const {intl} = this.props

    return (
      <div className="main-content cronus-providers-edit">
        <h1 className="main-content-title">
          {intl.formatMessage({id: 'edit.title'})}
        </h1>
        <ProviderEditForm {...this.props}/>
      </div>
    )
  }
}

export default injectIntl(EditScreen)
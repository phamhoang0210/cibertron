import React from 'react'
import { injectIntl } from 'react-intl'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchOrder(params.id, {fields: 'node{}'})
    actions.fetchNodes({per_page: 'infinite'})
  }

  render() {
    const {intl} = this.props

    return (
      <div className="main-content nauh-orders-edit">
        <h1 className="main-content-title">
          {intl.formatMessage({id: 'edit.title'})}
        </h1>
      </div>
    )
  }
}

export default injectIntl(EditScreen)
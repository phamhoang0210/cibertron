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
      <div className="main-content nauh--leads--new box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'edit.title'})}
          </h1>
        </div>
      </div>
    )
  }
}

export default injectIntl(EditScreen)
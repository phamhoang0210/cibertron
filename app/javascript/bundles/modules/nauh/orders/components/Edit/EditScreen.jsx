import React from 'react'
import OrderEditForm from './Order/Form/OrderEditForm'

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
    return (
      <div className="main-content nauh-orders-edit">
        <h1 className="main-content-title">Update order</h1>
        <OrderEditForm {...this.props}/>
      </div>
    )
  }
}

export default EditScreen
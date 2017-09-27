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
      <div>
        <h1>Update order</h1>
        <OrderEditForm {...this.props}/>
      </div>
    )
  }
}

export default EditScreen
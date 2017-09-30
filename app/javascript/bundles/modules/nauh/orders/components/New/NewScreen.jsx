import React from 'react'
import OrderNewForm from './Order/OrderForm/OrderNewForm'

class NewScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, location} = this.props
    const {query} = location
    if(query && query.lead_id) {
      actions.fetchLead(query.lead_id)
    }
    actions.fetchCampaigns({per_page: 'infinite'})
    actions.fetchCourses({per_page: 'infinite'})
    actions.fetchCombos({per_page: 'infinite'})
  }

  render() {
    return (
      <div className="main-content nauh-orders-new">
        <h1 className="main-content-title">Create new order</h1>
        <OrderNewForm {...this.props}/>
      </div>
    )
  }
}

export default NewScreen
import React from 'react'
import DiscountEditForm from './Discount/DiscountForm/DiscountEditForm'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchCourses({per_page: 'infinite'})
    actions.fetchCombos({per_page: 'infinite'})
    actions.fetchDiscount(params.id)
  }

  render() {
    return (
      <div className="main-content nauh-leads-new">
        <h1 className="main-content-title">Edit discount</h1>
        <DiscountEditForm {...this.props}/>
      </div>
    )
  }
}

export default EditScreen
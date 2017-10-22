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
      <div className="main-content sol--discounts--edit box">
        <div className="box-header">
          <h1 className="box-title">
            Edit discount
          </h1>
        </div>
        <div className="box-body">
          <DiscountEditForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default EditScreen
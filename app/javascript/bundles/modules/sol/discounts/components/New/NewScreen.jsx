import React from 'react'
import DiscountNewForm from './Discount/DiscountForm/DiscountNewForm'

class NewScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions} = this.props
    actions.fetchCourses({fields: 'product_json'})
    actions.fetchCombos({fields: 'product_json'})
  }

  render() {
    return (
      <div className="main-content sol--discounts--new box">
        <div className="box-header">
          <h1 className="box-title">
            Create new discount
          </h1>
        </div>
        <div className="box-body">
          <DiscountNewForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default NewScreen
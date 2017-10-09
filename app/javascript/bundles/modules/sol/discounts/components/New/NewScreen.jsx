import React from 'react'
import DiscountNewForm from './Discount/DiscountForm/DiscountNewForm'

class NewScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions} = this.props
    actions.fetchCourses({per_page: 'infinite'})
    actions.fetchCombos({per_page: 'infinite'})
  }

  render() {
    return (
      <div className="main-content nauh-leads-new">
        <h1 className="main-content-title">Create new discount</h1>
        <DiscountNewForm {...this.props}/>
      </div>
    )
  }
}

export default NewScreen
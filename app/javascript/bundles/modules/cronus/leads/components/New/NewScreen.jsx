import React from 'react'
import LeadNewBox from './Lead/LeadNewBox'

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
      <div>
        <h1>Create new lead</h1>
        <LeadNewBox {...this.props}/>
      </div>
    )
  }
}

export default NewScreen
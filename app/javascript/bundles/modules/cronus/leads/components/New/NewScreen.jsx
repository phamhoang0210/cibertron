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
      <div className="main-content cronus--leads--new box">
        <div className="box-header">
          <h1 className="box-title">
            Create new lead
          </h1>
        </div>
        <div className="box-body">
          <LeadNewBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default NewScreen
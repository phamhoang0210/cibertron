import React from 'react'
import PrizeNewForm from './Prize/PrizeForm/PrizeNewForm'

class NewScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions} = this.props
  }

  render() {
    return (
      <div className="main-content sol--prizes--new box">
        <div className="box-header">
          <h1 className="box-title">
            Create new prize
          </h1>
        </div>
        <div className="box-body">
          <PrizeNewForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default NewScreen
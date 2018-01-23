import React from 'react'
import PrizeEditForm from './Prize/PrizeForm/PrizeEditForm'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchPrize(params.id)
    actions.fetchPrizeCodes()
  }

  render() {
    return (
      <div className="main-content sol--prizes--edit box">
        <div className="box-header">
          <h1 className="box-title">
            Edit prize
          </h1>
        </div>
        <div className="box-body">
          <PrizeEditForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default EditScreen
import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import PrizesTableBox from './Prize/PrizesTable/PrizesTableBox'
import { notification } from 'antd'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState, railsContextState} = this.props
    const prizeParams = getFilterParams(indexState.get('prizeFilters'))
    actions.fetchPrizes(prizeParams)
  }

  componentWillReceiveProps(nextProps) {
    const alert = this.props.indexState.get('alert')
    const nextAlert = nextProps.indexState.get('alert')
    if(nextAlert && !nextAlert.equals(alert)) {
      nextAlert.get('messages').forEach(message => {
        notification[nextAlert.get('type')]({
          message: message,
        })
      })
    }
  }

  render() {
    const {indexState} = this.props
    return (
      <div className="main-content sol--prizes box">
        <div className="box-header">
          <h1 className="box-title">
            Prizes
          </h1>
        </div>
        <div className="box-body">
          <PrizesTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default IndexScreen

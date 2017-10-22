import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import DiscountsTableBox from './Discount/DiscountsTable/DiscountsTableBox'
import { notification } from 'antd'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState, railsContextState} = this.props
    const discountParams = getFilterParams(indexState.get('discountFilters'))
    actions.fetchDiscounts(discountParams)
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
      <div className="main-content sol--discounts box">
        <div className="box-header">
          <h1 className="box-title">
            Discounts
          </h1>
        </div>
        <div className="box-body">
          <DiscountsTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default IndexScreen

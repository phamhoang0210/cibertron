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
      <div className="main-content nauh-discounts">
        <h1 className="main-content-title">Discounts</h1>
        <DiscountsTableBox {...this.props}/>
      </div>
    )
  }
}

export default IndexScreen

import React from 'react'
import { getFilterParams, notify } from 'helpers/applicationHelper'
import AccountTableBox from './Account/AccountTable/AccountTableBox'
import { injectIntl } from 'react-intl'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState, location} = this.props
    const accountParams = getFilterParams(indexState.get('accountFilters'), location)
    actions.fetchAccounts(accountParams)
  }

  componentWillReceiveProps(nextProps) {
    const noti = this.props.indexState.get('notification')
    const nextNoti = nextProps.indexState.get('notification')
    notify(noti, nextNoti)
  }

  render() {
    const {indexState, intl} = this.props
    return (
      <div className="main-content authservice--accounts box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'index.title'})}
          </h1>
        </div>
        <div className="box-body">
          <AccountTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(IndexScreen)
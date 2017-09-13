import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import AccountTableBox from './Account/AccountTable/AccountTableBox'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState} = this.props
    const accountParams = getFilterParams(indexState.get('accountFilters'))
    actions.fetchAccounts(accountParams)
  }

  render() {
    const {indexState} = this.props
    return (
      <div>
        <h1>Accounts</h1>
        <AccountTableBox {...this.props}/>
      </div>
    )
  }
}

export default IndexScreen
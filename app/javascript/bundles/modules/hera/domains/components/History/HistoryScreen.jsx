import React from 'react'
import DomainHistoryActionsTableBox from './DomainHistoryActionsTable/DomainHistoryActionsTableBox'
import { injectIntl } from 'react-intl'

class HistoryScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchDomainHistoryActions(params.id)
  }

  render() {
    const {intl} = this.props

    return (
      <div className="main-content hera--domains--edit box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'history.title'})}
          </h1>
        </div>
        <div className="box-body">
          <DomainHistoryActionsTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(HistoryScreen)
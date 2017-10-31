import React from 'react'
import { getFilterParams, notify } from 'helpers/applicationHelper'
import RoleTableBox from './Role/RoleTable/RoleTableBox'
import { injectIntl } from 'react-intl'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState, location} = this.props
    const roleParams = getFilterParams(indexState.get('roleFilters'), location)
    actions.fetchRoles(roleParams)
  }

  componentWillReceiveProps(nextProps) {
    const noti = this.props.indexState.get('notification')
    const nextNoti = nextProps.indexState.get('notification')
    notify(noti, nextNoti)
  }

  render() {
    const {indexState, intl} = this.props
    return (
      <div className="main-content authservice--roles box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'index.title'})}
          </h1>
        </div>
        <div className="box-body">
          <RoleTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(IndexScreen)
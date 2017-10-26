import React from 'react'
import NodeNewForm from './Node/NodeForm/NodeNewForm'
import { injectIntl } from 'react-intl'

class NewScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions} = this.props
    actions.fetchChannels({per_page: 'infinite'})
    actions.fetchUsers({per_page: 'infinite'})
    actions.fetchDepartments({per_page: 'infinite'})
    actions.fetchTargets({per_page: 'infinite'})
    actions.fetchCourses({per_page: 'infinite'})
    actions.fetchCombos({per_page: 'infinite'})
  }

  render() {
    const {intl} = this.props

    return (
      <div className="main-content cronus--nodes--new box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'new.title'})}
          </h1>
        </div>
        <div className="box-body">
          <NodeNewForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(NewScreen)
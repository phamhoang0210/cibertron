import React from 'react'
import NodeEditForm from './Node/Form/NodeEditForm'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchNode(params.id, {fields: 'channel{}'})
    actions.fetchChannels({per_page: 'infinite'})
    actions.fetchUsers({per_page: 'infinite'})
    actions.fetchDepartments({per_page: 'infinite'})
    actions.fetchTargets({per_page: 'infinite'})
    actions.fetchCourses({per_page: 'infinite'})
    actions.fetchCombos({per_page: 'infinite'})
  }

  render() {
    return (
      <div className="main-content cronus-nodes-edit">
        <h1 className="main-content-title">Update node</h1>
        <NodeEditForm {...this.props}/>
      </div>
    )
  }
}

export default EditScreen
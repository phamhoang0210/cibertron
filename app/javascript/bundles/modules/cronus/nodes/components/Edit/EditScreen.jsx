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
  }

  render() {
    return (
      <div>
        <h1>Update node</h1>
        <NodeEditForm {...this.props}/>
      </div>
    )
  }
}

export default EditScreen
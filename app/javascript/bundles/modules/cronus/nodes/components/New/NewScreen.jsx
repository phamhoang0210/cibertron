import React from 'react'
import NodeNewForm from './Node/NodeForm/NodeNewForm'

class NewScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions} = this.props
    actions.fetchChannels({per_page: 'infinite'})
  }

  render() {
    return (
      <div>
        <h1>Create new node</h1>
        <NodeNewForm {...this.props}/>
      </div>
    )
  }
}

export default NewScreen
import React from 'react'
import ChannelEditForm from './Channel/Form/ChannelEditForm'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchChannel(params.id, {fields: 'provider{},category{}'})
    actions.fetchProviders({per_page: 'infinite'})
    actions.fetchCategories({per_page: 'infinite'})
  }

  render() {
    return (
      <div>
        <h1>Update channel</h1>
        <ChannelEditForm {...this.props}/>
      </div>
    )
  }
}

export default EditScreen
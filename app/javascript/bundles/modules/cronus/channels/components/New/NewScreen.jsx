import React from 'react'
import ChannelNewForm from './Channel/ChannelForm/ChannelNewForm'

class NewScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions} = this.props
    actions.fetchProviders({per_page: 'infinite'})
    actions.fetchCategories({per_page: 'infinite'})
  }

  render() {
    return (
      <div className="main-content cronus-channels-new">
        <h1 className="main-content-title">Create new channel</h1>
        <ChannelNewForm {...this.props}/>
      </div>
    )
  }
}

export default NewScreen
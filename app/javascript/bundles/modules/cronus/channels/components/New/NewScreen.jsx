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
      <div className="main-content cronus--channels--new box">
        <div className="box-header">
          <h1 className="box-title">
            Create new channel
          </h1>
        </div>
        <div className="box-body">
          <ChannelNewForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default NewScreen
import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import ChannelTableBox from './Channel/ChannelTable/ChannelTableBox'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState} = this.props
    const channelParams = getFilterParams(indexState.get('channelFilters'))
    actions.fetchChannels(channelParams)
  }

  render() {
    const {indexState} = this.props
    return (
      <div>
        <h1>Channels</h1>
        <ChannelTableBox {...this.props}/>
      </div>
    )
  }
}

export default IndexScreen
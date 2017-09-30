import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import ChannelsTableBox from './Channel/ChannelsTable/ChannelsTableBox'
import { notification } from 'antd'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState} = this.props
    const channelParams = getFilterParams(indexState.get('channelFilters'))
    actions.fetchChannels(channelParams)
  }

  componentWillReceiveProps(nextProps) {
    const alert = this.props.indexState.get('alert')
    const nextAlert = nextProps.indexState.get('alert')
    if(nextAlert && !nextAlert.equals(alert)) {
      nextAlert.get('messages').forEach(message => {
        notification[nextAlert.get('type')]({
          message: message,
        })
      })
    }
  }

  render() {
    const {indexState} = this.props
    return (
      <div>
        <h1>Channels</h1>
        <ChannelsTableBox {...this.props}/>
      </div>
    )
  }
}

export default IndexScreen
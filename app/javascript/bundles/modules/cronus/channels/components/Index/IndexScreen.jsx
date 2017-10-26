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
      <div className="main-content cronus--channels box">
        <div className="box-header">
          <h1 className="box-title">
            Channels
          </h1>
        </div>
        <div className="box-body">
          <ChannelsTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default IndexScreen
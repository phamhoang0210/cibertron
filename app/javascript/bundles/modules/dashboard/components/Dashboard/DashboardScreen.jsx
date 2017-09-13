import React from 'react'
import ServiceList from './Services/Service/ServiceList'

class DashboardScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions} = this.props
    actions.fetchServiceInfos({per_page: 'infinite'})
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <ServiceList {...this.props}/>
      </div>
    )
  }
}

export default DashboardScreen
import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import ProvidersTableBox from './Provider/ProvidersTable/ProvidersTableBox'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState} = this.props
    const providerParams = getFilterParams(indexState.get('providerFilters'))
    actions.fetchProviders(providerParams)
  }

  render() {
    const {indexState} = this.props
    return (
      <div>
        <h1>Providers</h1>
        <ProvidersTableBox {...this.props}/>
      </div>
    )
  }
}

export default IndexScreen
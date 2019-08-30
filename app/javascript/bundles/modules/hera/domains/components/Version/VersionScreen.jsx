import React from 'react'
import VersionFiltersFormBox from './VersionFiltersForm/VersionFiltersFormBox'
import VersionTableBox from './VersionTable/VersionTableBox'
import { injectIntl } from 'react-intl'

class VersionScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params } = this.props
    actions.fetchDomain(params.id, {fields: 'landing_page{}, platform{}'})
    actions.fetchPlatforms();
    actions.fetchVersions(params.id);
  }

  render() {
    const {versionState, intl} = this.props
    
    return (
      <div className="main-content hera--domains box">
        <div className="box-header">
          <h1 className="box-title">
            Version Domain
          </h1>
        </div>

        <div className="box-body">
          {/* <VersionFiltersFormBox {...this.props}/> */}
          <VersionTableBox {...this.props} />
        </div>
      </div>
    )
  }
}

export default injectIntl(VersionScreen)
import React from 'react'
import DomainActionsHistoryTableBox from './DomainActionsHistoryTableBox/DomainActionsHistoryTableBox'
import DomainVersionsHistoryTableBox from './DomainVersionHistoryTableBox/DomainVersionHistoryTableBox'
import DomainSwitchsHistoryTableBox from './DomainSwitchsHistoryTableBox/DomainSwitchsHistoryTableBox'
import { injectIntl } from 'react-intl'
import { Tabs } from 'antd';
const { TabPane } = Tabs;

class HistoryScreen extends React.Component {
  constructor(props) {
    super(props)
    _.bindAll(this, [
      'handleTabChange'
    ])
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchDomainHistoryActions(params.id)
    actions.fetchDomain(params.id, {fields: 'landing_page{}, platform{}'})
    actions.fetchPlatforms();
  }

  handleTabChange(tabKey) {
    if(tabKey == 'status') {
      const {actions, params} = this.props
      actions.fetchDomainHistoryActions(params.id)
    }
    if(tabKey == 'version') {
      const {actions, params } = this.props
      actions.fetchVersions(params.id);
    }
    if(tabKey == 'switch') {
      const {actions, params } = this.props
      actions.fetchDomainHistorySwitchs(params.id);
    }
  }

  render() {
    const {intl} = this.props

    return (
      <div className="main-content hera--domains--edit box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'history.title'})}
          </h1>
        </div>
        <div className="box-body">
        <Tabs defaultActiveKey="status" onChange={this.handleTabChange}>
          <TabPane tab="Status" key="status">
            <DomainActionsHistoryTableBox {...this.props}/>
          </TabPane>
          <TabPane tab="Version" key="version">
            <DomainVersionsHistoryTableBox {...this.props}/>
          </TabPane>
          <TabPane tab="Switch" key="switch">
            <DomainSwitchsHistoryTableBox {...this.props}/>
          </TabPane>
        </Tabs>
        </div>
      </div>
    )
  }
}

export default injectIntl(HistoryScreen)
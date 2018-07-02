import React from 'react'
import { getFilterParamsAndSyncUrl } from 'helpers/applicationHelper'
import MarketingTableBox from './Template/MarketingTable/MarketingTableBox'
import TransactionalTableBox from './Template/TransactionalTable/TransactionalTableBox'
import TemplateFiltersFormBox from './Template/TemplateFiltersForm/TemplateFiltersFormBox'
import { notification, Tabs } from 'antd'
import { injectIntl } from 'react-intl'

const { TabPane } = Tabs

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
    _.bindAll(this, [
      'handleTabChange'
    ])
  }

  componentDidMount() {
    const {actions, indexState, railsContextState, location} = this.props
    const templateParams = getFilterParamsAndSyncUrl(indexState.get('templateFilters'), location)
    
    actions.fetchMarketingTemplates(templateParams)
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

  handleTabChange(tabKey) {
    if(tabKey == 'marketing') {
      const {actions, intl} = this.props
      actions.fetchMarketingTemplates()
    }
    if(tabKey == 'transactional') {
      const {actions, intl} = this.props
      actions.fetchTransactionalTemplates()
    }
  }

  render() {
    const {indexState, intl} = this.props
    return (
      <div className="main-content nauh--templates box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'index.title'})}
          </h1>
        </div>
        <div className="box-body">
          <TemplateFiltersFormBox {...this.props}/>
          <Tabs defaultActiveKey="templates" size="large" onChange={this.handleTabChange}>
            <TabPane tab="Marketing" key="marketing">
              <MarketingTableBox {...this.props}/>
            </TabPane>
            <TabPane tab="Transactional" key="transactional">
              <TransactionalTableBox {...this.props}/>
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default injectIntl(IndexScreen)
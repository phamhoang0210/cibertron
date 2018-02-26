import React from 'react'
import { getFilterParamsAndSyncUrl } from 'helpers/applicationHelper'
import TemplatesTableBox from './Template/TemplatesTable/TemplatesTableBox'
import TemplateFiltersFormBox from './Template/TemplateFiltersForm/TemplateFiltersFormBox'
import { notification } from 'antd'
import { injectIntl } from 'react-intl'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
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
          <TemplatesTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(IndexScreen)
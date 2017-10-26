import React from 'react'
import _ from 'lodash'
import { Row, Col, Tabs, Icon, Button, Input } from 'antd'
import moment from 'moment'
import { injectIntl } from 'react-intl'
import CallLogsTableBox from './CallLogsTable/CallLogsTableBox'
import CallLogUpdateFormBox from './CallLogUpdateForm/CallLogUpdateFormBox'

const TabPane = Tabs.TabPane
const InputGroup = Input.Group

import 'styles/modules/nauh/leads'

class CallLogsBox extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {editState, intl} = this.props
    const callLog = editState.get('callLog')
    
    return (
      <div>
        {callLog && callLog.get('id') && (
          <CallLogUpdateFormBox {...this.props}/>
        )}
        <div className="box box-with-border box-with-shadow">
          <div className="box-header">
            <h3 className="box-title">
              {intl.formatMessage({id: 'edit.lead.partial.call_logs_table.title'})}
            </h3>
          </div>
          <div className="box-body">
            <Row>
              <CallLogsTableBox {...this.props}/>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(CallLogsBox)
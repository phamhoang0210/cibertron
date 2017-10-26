import React from 'react'
import _ from 'lodash'
import { Row, Col, Tabs, Icon } from 'antd'
import moment from 'moment'
import { injectIntl } from 'react-intl'
import OrderTableBox from './OrderTable/OrderTableBox'
import OrderCreateFormBox from './OrderCreateForm/OrderCreateFormBox'

const TabPane = Tabs.TabPane

import 'styles/modules/nauh/leads'

class OrdersBox extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {editState, intl} = this.props
    const lead = editState.get('lead')
    const isUpdatingLeadAttr = editState.get('isUpdatingLeadAttr')
    const isFetchingLead = editState.get('isFetchingLead')
    
    return (
      <div className="box">
        <div className="box-body">
          <Tabs defaultActiveKey="orders" onChange={null}>
            <TabPane
              tab={(
                <span><Icon type="plus" />
                  {intl.formatMessage({id: 'edit.lead.partial.orders_table.tabs.tab.create_order.title'})}
                </span>
              )}
              key="create_order"
            >
              <OrderCreateFormBox {...this.props}/>
            </TabPane>
            <TabPane
              tab={intl.formatMessage({id: 'edit.lead.partial.orders_table.tabs.tab.orders.title'})}
              key="orders"
            >
              <OrderTableBox {...this.props}/>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default injectIntl(OrdersBox)
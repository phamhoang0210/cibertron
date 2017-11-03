import React from 'react'
import CustomerInfo from './Lead/Partial/CustomerInfo'
import OrderInfo from './Lead/Partial/OrderInfo'
import OrdersBox from './Lead/Partial/Orders/OrdersBox'
import LeadCareHistoriesTableBox from './Lead/Partial/LeadCareHistory/LeadCareHistoriesTable/LeadCareHistoriesTableBox'
import LeadCareHistoryUpdateFormBox from './Lead/Partial/LeadCareHistory/LeadCareHistoryUpdateForm/LeadCareHistoryUpdateFormBox'
import { injectIntl } from 'react-intl'
import { Row, Col, notification, Tabs, Spin } from 'antd'

const TabPane = Tabs.TabPane;

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params, editState} = this.props
    const leadParams = editState.get('defaultLeadParams').toJS()
    actions.fetchLead(params.id, leadParams)
    actions.fetchEmailLead({leadId: params.id})
    actions.fetchLeadLevels({per_page: 'infinite'})
    actions.fetchLeadStatuses({per_page: 'infinite'})
    actions.fetchUsers({per_page: 'infinite'})
    actions.fetchCombos({per_page: 'infinite'})
    actions.fetchCourses({per_page: 'infinite'})
  }

  componentWillReceiveProps(nextProps) {
    const noti = this.props.editState.get('notification')
    const nextNoti = nextProps.editState.get('notification')
    if(nextNoti && nextNoti.get('messages') && !nextNoti.equals(noti)) {
      nextNoti.get('messages').forEach(message => {
        notification[nextNoti.get('type')]({
          message: message,
        })
      })
    }
  }

  render() {
    const {editState, intl} = this.props
    const lead = editState.get('lead')
    
    const isFetchingLead = editState.get('isFetchingLead')

    return (
      <div className="nauh-leads-edit">
        {isFetchingLead && (
          <div className="text-align--center">
            <Spin />
          </div>
        )}
        {lead && (
          <div>
            <Row gutter={8}>
              <Col span={6}>
                <OrderInfo {...this.props}/>
              </Col>
              <Col span={18}>
                <CustomerInfo {...this.props}/>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={24}>
                <LeadCareHistoryUpdateFormBox {...this.props}/>
                <LeadCareHistoriesTableBox {...this.props}/>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={24}>
                <OrdersBox {...this.props}/>
              </Col>
            </Row>
          </div>
        )}
      </div>
    )
  }
}

export default injectIntl(EditScreen)
import React from 'react'
import _ from 'lodash'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT } from 'app/constants/form'
import { selectFilterOption } from 'helpers/antdHelper'
import { Input, Row, Col, Button, Select, Badge, Spin, DatePicker, Tag, Modal } from 'antd'
import moment from 'moment'
import { injectIntl } from 'react-intl'
import { LEVEL_COLOR_MAPPINGS, BADGE_STATUS_MAPPINGS } from '../../../../constants/constants'
import SelectEditable from 'partials/components/ContentEditable/Select/SelectEditable'

import 'styles/modules/nauh/leads'

const Option = Select.Option
const TextArea = Input.TextArea

class OrderInfo extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleUpdateAttr',
    ])
  }

  handleUpdateAttr(values) {
    const {actions, editState} = this.props
    const lead = editState.get('lead')
    const defaultLeadParams = editState.get('defaultLeadParams').toJS()
    actions.updateLeadAttr(lead.get('id'), {...defaultLeadParams, record: values})
  }

  render() {
    const {editState, sharedState, intl} = this.props
    const lead = editState.get('lead')
    const isUpdatingLeadAttr = editState.get('isUpdatingLeadAttr')
    const isFetchingLead = editState.get('isFetchingLead')
    const leadLevels = sharedState.get('leadLevels')
    const leadStatuses = sharedState.get('leadStatuses')
    const users = sharedState.get('users')
    const user = users.find(u => u.get('id') == lead.get('staff_id'))
    
    return (
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">
            {intl.formatMessage({id: 'edit.lead.partial.order_info.title'})}
          </h3>
        </div>
        <div className="box-body">
          <div className="order-info-update-form">
            <Row gutter={8} className="order-info-update-form-item">
              <Col span={6}>
                {intl.formatMessage({id: 'attrs.lead_level_id.label'})}
              </Col>
              <Col span={18}>
                <SelectEditable
                  onChange={v => this.handleUpdateAttr({lead_level_id: v})}
                  defaultValue={`${lead.getIn(['lead_level', 'id'])}`}
                  disabled={isUpdatingLeadAttr}
                  disabledContent={lead.getIn(['lead_level', 'name']) && (
                    <Tag
                      color={LEVEL_COLOR_MAPPINGS[lead.getIn(['lead_level', 'name'])]}
                    >
                      {lead.getIn(['lead_level', 'name'])}
                    </Tag>
                  ) || (
                    <i className="text--link">
                      {intl.formatMessage({id: 'form.form_item.button.update.text'})}
                    </i>
                  )}
                  options={leadLevels.map(item => (
                    item.merge({
                      title: item.get('name'),
                    })
                  ))}
                />
              </Col>
            </Row>
            <Row gutter={8} className="order-info-update-form-item">
              <Col span={6}>
                {intl.formatMessage({id: 'attrs.lead_status_id.label'})}
              </Col>
              <Col span={18}>
                <SelectEditable
                  onChange={v => this.handleUpdateAttr({lead_status_id: v})}
                  defaultValue={`${lead.getIn(['lead_status', 'id'])}`}
                  disabled={isUpdatingLeadAttr}
                  disabledContent={lead.getIn(['lead_status', 'code']) && (
                    <Badge
                      status={BADGE_STATUS_MAPPINGS[lead.getIn(['lead_status', 'code'])]}
                      text={lead.getIn(['lead_status', 'name'])}
                    />
                  ) || (
                    <i className="text--link">
                      {intl.formatMessage({id: 'form.form_item.button.update.text'})}
                    </i>
                  )}
                  options={leadStatuses.map(item => (
                    item.merge({
                      title: item.get('name'),
                    })
                  ))}
                />
                {lead.get('is_duplicated') && (
                  <Tag color="red">
                    {intl.formatMessage({id: 'attrs.info.duplicated'})}
                  </Tag>
                )} 
              </Col>
            </Row>
            <Row gutter={8} className="order-info-update-form-item">
              <Col span={6}>
                {intl.formatMessage({id: 'attrs.staff_id.label'})}
              </Col>
              <Col span={18}>
                <SelectEditable
                  onChange={v => this.handleUpdateAttr({staff_id: v})}
                  defaultValue={`${lead.get('staff_id')}`}
                  disabled={isUpdatingLeadAttr}
                  disabledContent={
                    user ? (
                      <b>{user.get('username')}</b>
                    ) : (
                      <i className="text--link">{intl.formatMessage({id: 'form.form_item.button.update.text'})}</i>
                    )
                  }
                  options={users.map(item => (
                    item.merge({
                      title: item.get('username'),
                    })
                  ))}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(OrderInfo)
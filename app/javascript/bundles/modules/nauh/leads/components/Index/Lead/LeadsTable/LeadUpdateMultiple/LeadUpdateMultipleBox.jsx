import React from 'react'
import _ from 'lodash'
import { Row, Col, Select, Button } from 'antd'
import { selectFilterOption } from 'helpers/antdHelper'
import { injectIntl } from 'react-intl'

const Option = Select.Option

class LeadUpdateMultipleBox extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    _.bindAll(this, [
      'handleClearSelection',
      'handleUpdateLeads',
    ])
  }

  handleClearSelection() {
    const {actions, indexState} = this.props
    actions.updateSelectedLeadKeys([])
  }


  handleUpdateLeads() {
    const {actions, indexState} = this.props
    const selectedLeadKeys = indexState.get('selectedLeadKeys')
    actions.updateLeads({ids: selectedLeadKeys.toJS(), ...this.state})
  }

  render() {
    const {indexState, sharedState, actions, intl} = this.props
    const selectedLeadKeys = indexState.get('selectedLeadKeys')
    const isUpdatingLeads = indexState.get('isUpdatingLeads')
    const careStatuses = sharedState.get('careStatuses')
    const users = sharedState.get('users')

    return (
      <Col span={18}>
        <b>
          {intl.formatMessage(
            {id: 'index.leads_table.update_multiple.title'},
            {selectedLeadKeyCount: selectedLeadKeys.count()}
          )}
        </b>
        <Select
          showSearch
          filterOption={selectFilterOption}
          style={{ width: '120px' }}
          placeholder={intl.formatMessage({id: 'attrs.staff.placeholder.select.single'})}
          onChange={(v) => this.setState({staff_id: v})}
        >
          {users.map(user => (
            <Option value={`${user.get('id')}`} key={user.get('id')}>
              {user.get('username')}
            </Option>
          ))}
        </Select>
        <Select
          showSearch
          filterOption={selectFilterOption}
          style={{ width: '120px', marginLeft: '4px' }}
          placeholder={intl.formatMessage({id: 'attrs.care_status.placeholder.select.single'})}
          onChange={(v) => this.setState({care_status_id: v})}
        >
          {careStatuses.map(status => (
            <Option value={`${status.get('id')}`} key={status.get('id')}>
              {status.get('code')}
            </Option>
          ))}
        </Select>
        <Button
          className="button-margin--left--default"
          onClick={this.handleClearSelection}
        >
          {intl.formatMessage({id: 'form.form_item.button.clear.text'})}
        </Button>
        <Button
          type="primary"
          className="button-margin--left--default"
          onClick={this.handleUpdateLeads}
          loading={isUpdatingLeads}
          disabled={isUpdatingLeads}
        >
          {intl.formatMessage({id: 'form.form_item.button.update.text'})}
        </Button>
      </Col>
    )
  }
}

export default injectIntl(LeadUpdateMultipleBox)
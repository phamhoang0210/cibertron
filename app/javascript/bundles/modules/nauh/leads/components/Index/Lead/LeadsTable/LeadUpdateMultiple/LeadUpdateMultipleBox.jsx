import React from 'react'
import _ from 'lodash'
import { Row, Col, Select, Button } from 'antd'
import { selectFilterOption } from 'helpers/antdHelper'

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
    const {indexState, sharedState, actions} = this.props
    const selectedLeadKeys = indexState.get('selectedLeadKeys')
    const isUpdatingLeads = indexState.get('isUpdatingLeads')
    const careStatuses = sharedState.get('careStatuses')
    const users = sharedState.get('users')

    return (
      <Col span={18}>
        <b>Update <i style={{color: 'red'}}>{selectedLeadKeys.count()}</i> selected leads: </b>
        <Select
          showSearch
          filterOption={selectFilterOption}
          style={{ width: '120px' }}
          placeholder="Staff"
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
          style={{ width: '120px', marginLeft: '4px' }} placeholder="Care status"
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
          Clear
        </Button>
        <Button
          type="primary"
          className="button-margin--left--default"
          onClick={this.handleUpdateLeads}
          loading={isUpdatingLeads}
          disabled={isUpdatingLeads}
        >
          Update
        </Button>
      </Col>
    )
  }
}

export default LeadUpdateMultipleBox
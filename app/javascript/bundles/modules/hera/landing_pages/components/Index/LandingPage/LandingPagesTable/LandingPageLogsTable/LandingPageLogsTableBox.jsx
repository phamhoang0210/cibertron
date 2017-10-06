import React from 'react'
import _ from 'lodash'
import { List } from 'immutable'
import { Table, Badge } from 'antd'
import { getFilterParams } from 'helpers/applicationHelper'
import moment from 'moment'
import { LONG_DATETIME_FORMAT, SHORT_DATETIME_FORMAT } from 'app/constants/datatime'

class LandingPageLogsTableBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleTableChange'
    ])

    this.columns = [{
      title: 'Created at',
      dataIndex: 'created_at',
      key: 'created_at',
      render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : '',
    }, {
      title: 'Executed by',
      dataIndex: 'user_id',
      key: 'user_id',
      render: value => {
        const {sharedState} = this.props
        const userIdMappings = sharedState.get('userIdMappings')
        const user = userIdMappings.get(`${value}`)
        if (user) {
          return (<span>{user.get('username')}</span>)
        }
      }
    }, {
      title: 'Action',
      dataIndex: 'action',
      key: 'action'
    }, {
      title: 'Domain changes',
      dataIndex: 'change_values.domain_id',
      key: 'domain_id_changes',
      render: value => {
        if(value && value.length > 1) {
          const {sharedState} = this.props
          const domainIdMappings = sharedState.get('domainIdMappings')
          return value.map(v => (
            domainIdMappings.getIn([`${v}`, 'name']) || '##'
          )).join(' => ')
        } else {
          return 'unchanged'
        }
      }
    }, {
      title: 'Discount changes',
      dataIndex: 'change_values.discount_id',
      key: 'discount_id_changes',
      render: value => {
        if(value && value.length > 1) {
          const {sharedState} = this.props
          const discountIdMappings = sharedState.get('discountIdMappings')
          return value.map(v => (
            discountIdMappings.getIn([`${v}`, 'name']) || '##'
          )).join(' => ')
        } else {
          return 'unchanged'
        }
      }
    }]
  }

  componentDidMount() {
    const {landingPage, actions} = this.props
    const landingPageLogs = landingPage.get('landingPageLogs')
    if(!landingPageLogs) {
      actions.fetchLandingPageLogs(landingPage, {
        loggable_id: landingPage.get('id'),
        loggable_type: 'LandingPage',
      })
    }
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, landingPage} = this.props
    let landingPageLogParams = getFilterParams(landingPage.get('landingPageLogFilters'))
    const {current, pageSize, total} = pagination

    if(current != landingPageLogParams.page) {
      landingPageLogParams.page = current
    }

    actions.fetchLandingPageLogs(landingPage, landingPageLogParams)
  }

  render() {
    const {landingPage, actions} = this.props
    const landingPageLogs = landingPage.get('landingPageLogs') || List([])
    const paging = landingPage.getIn(['landingPageLogFilters', 'paging'])
    const isFetchingLandingPageLogs = landingPage.get('isFetchingLandingPageLogs')
    return (
      <Table
        size="middle"
        columns={this.columns}
        dataSource={landingPageLogs.toJS()}
        rowKey="id"
        onChange={this.handleTableChange}
        loading={isFetchingLandingPageLogs}
        pagination={paging ? {
          total: paging.get('record_total'),
          current: paging.get('page'),
        } : {}}
      />
    )
  }
}

export default LandingPageLogsTableBox
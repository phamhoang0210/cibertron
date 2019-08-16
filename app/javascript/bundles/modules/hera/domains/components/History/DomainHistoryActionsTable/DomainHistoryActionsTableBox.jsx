import React from 'react'
import _ from 'lodash'
import { Table, Icon, Button, Popconfirm, Row, Col, Input, Tag } from 'antd'
import { getFilterParams, mergeDeep, getDefaultTablePagination } from 'helpers/applicationHelper'
import { removeSpaceInput } from 'helpers/inputHelper'
import { browserHistory } from 'react-router'
import { DOMAINS_URL } from '../../../constants/paths'
import { LONG_DATETIME_FORMAT } from 'app/constants/datatime'
import { injectIntl } from 'react-intl'
import moment from 'moment'


class DomainHistoryActionsTableBox extends React.Component {
  constructor(props) {
    super(props)

    const {intl} = this.props

    this.columns = [{
      title: intl.formatMessage({id: 'attrs.id.label'}),
      dataIndex: 'id',
      key: 'id',
    }, {
      title: intl.formatMessage({id: 'history.history_table.time'}),
      dataIndex: 'created_at',
      key: 'created_at',
      render: value => value ? moment(value).format(LONG_DATETIME_FORMAT) : '',
    }, {
      title: intl.formatMessage({id: 'history.history_table.username'}),
      dataIndex: 'username',
      key: 'username',
    }, {
      title: intl.formatMessage({id: 'history.history_table.old_status'}),
      dataIndex: 'old_status',
      key: 'old_status',
    }, {
      title: intl.formatMessage({id: 'history.history_table.new_status'}),
      dataIndex: 'new_status',
      key: 'new_status',
    }];
  }

  render() {
    const {historyState, intl} = this.props
    const domainHistoryActions = historyState.get('domainHistoryActions')
    const isFetchingDomainHistoryActions = historyState.get('isFetchingDomainHistoryActions')

    return (
      <div className="main-content-table-box">
        <Table
          bordered
          className="main-content-table-box-body"
          size="middle"
          columns={this.columns}
          dataSource={domainHistoryActions.toJS()}
          rowKey="id"
          loading={isFetchingDomainHistoryActions}
        />
      </div>
    )
  }
}

export default injectIntl(DomainHistoryActionsTableBox)

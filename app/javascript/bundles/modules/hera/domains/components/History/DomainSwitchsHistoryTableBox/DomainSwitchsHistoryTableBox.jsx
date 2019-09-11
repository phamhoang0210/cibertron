import React from 'react'
import _ from 'lodash'
import { Table } from 'antd'
import { LONG_DATETIME_FORMAT } from 'app/constants/datatime'
import { injectIntl } from 'react-intl'
import moment from 'moment'


class DomainSwitchsHistoryTableBox extends React.Component {
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
      title: intl.formatMessage({id: 'history.history_table.old_cname'}),
      dataIndex: 'old_cname',
      key: 'old_cname',
    }, {
      title: intl.formatMessage({id: 'history.history_table.new_cname'}),
      dataIndex: 'new_cname',
      key: 'new_cname',
    }];
  }

  render() {
    const {historyState, intl} = this.props
    const domainHistorySwitchs = historyState.get('domainHistorySwitchs')
    const isFetchingDomainHistorySwitchs = historyState.get('isFetchingDomainHistorySwitchs')

    return (
      <div className="main-content-table-box">
        <Table
          bordered
          className="main-content-table-box-body"
          size="middle"
          columns={this.columns}
          dataSource={domainHistorySwitchs.toJS()}
          rowKey="id"
          loading={isFetchingDomainHistorySwitchs}
        />
      </div>
    )
  }
}

export default injectIntl(DomainSwitchsHistoryTableBox)

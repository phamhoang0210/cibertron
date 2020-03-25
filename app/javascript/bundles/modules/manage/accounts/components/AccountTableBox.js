import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import _ from 'lodash';
import Immutable from 'immutable';
import { getFilterParamsAndSyncUrl } from 'helpers/applicationHelper';
import { Table } from 'antd';
// import moment from 'moment/moment';

class AccountTableBox extends React.Component {
  constructor(props) {
    super(props);

    _.bindAll(this, [
      'handleTableChange',
      'handlePageSizeChange',
      'fetchAccounts',
    ]);
  }

  componentDidMount() {
    this.fetchAccounts();
  }

  fetchAccounts(options = {}, isclear = false) {
    const { accounts, location, fetchAccounts, params } = this.props;

    fetchAccounts(
      getFilterParamsAndSyncUrl(
        accounts.get('filters'),
        location,
        Object.assign({}, options, params),
        isclear
      ),
    );
  }

  handleTableChange(pagination) {
    const { current } = pagination;
    const paging = this.props.accounts.getIn(['filters', 'paging']);

    if (paging && paging.get('page') !== current) {
      this.fetchAccounts({ page: current });
    }
  }


  handlePageSizeChange(current, size) {
    const paging = this.props.accounts.getIn(['filters', 'paging']);
    if (paging) {
      this.fetchAccounts({ page: current, per_page: size});
    }
  }


  columns() {
    const { intl, params } = this.props;

    return ([
      {
        title: intl.formatMessage({id: 'label.attrs.id'}),
        dataIndex: 'id',
        key: 'id',
        width: 120
      },
    ]);
  }

  pagination() {
    const paging = this.props.accounts.getIn(['filters', 'paging']);

    let result = {
      showSizeChanger: true,
      total: 0,
      pageSize: 1,
      pageSizeOptions: ['1','10','20','40'],
      showQuickJumper: true,
      current: 1,
      onShowSizeChange: this.handlePageSizeChange,  
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    };

    if (paging) {
      result.total = paging.get('record_total');
      result.pageSize = paging.get('per_page');
      result.current = paging.get('page');
    }

    return result;
  }

  render() {
    const { intl, accounts, params } = this.props;
    debugger
    return (
      <div className="main-content-table-box">
        <Table
          className="main-content-table-box-body"
          size="middle"
          columns={this.columns()}
          dataSource={accounts.get('records').toJS()}
          pagination={this.pagination()}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={accounts.get('isFetching')}
          bordered
        />
      </div>
    );
  }
}

AccountTableBox.propTypes = {
  accounts: PropTypes.instanceOf(Immutable.Map),
  intl: PropTypes.object,
  params: PropTypes.object,
  fetchAccounts: PropTypes.func,
  location: PropTypes.object,
};

export default injectIntl(AccountTableBox);
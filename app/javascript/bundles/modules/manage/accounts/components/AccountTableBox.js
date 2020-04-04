import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import _ from 'lodash';
import Immutable from 'immutable';
import { getFilterParamsAndSyncUrl } from 'helpers/applicationHelper';
import { Table } from 'antd';
import moment from 'moment/moment';
import { 
  SHORT_DATETIME_FORMAT,
  MEDIUM_WIDTH, 
  ID_WIDTH, 
  ACTION_WIDTH, 
  SMALL_WIDTH,
  TIME_WIDTH
} from './../constants/initials';
import ActionCell from 'partials/base/ActionCell';

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
        width: ID_WIDTH
      },{
        title: intl.formatMessage({id: 'label.attrs.name'}),
        dataIndex: 'name',
        key: 'name',
        width: MEDIUM_WIDTH,
      },{
        title: intl.formatMessage({id: 'label.attrs.email'}),
        dataIndex: 'email',
        key: 'email',
        width: MEDIUM_WIDTH,
      },
      {
        title: intl.formatMessage({id: 'label.attrs.createdAt'}),
        dataIndex: 'created_at',
        key: 'created_at',
        width: TIME_WIDTH,
        render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : ''
      },
      {
        title: intl.formatMessage({id: 'label.attrs.updatedAt'}),
        dataIndex: 'updated_at',
        key: 'updated_at',
        width: TIME_WIDTH,
        render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : ''
      },
      {
        title: '',
        key: 'action',
        render: (cell, row) => {
          return (
            <ActionCell {...{
                cell,
                row,
                showShow:true,
                showDelete:false,
                showEdit:false,
                // handleDeleteEntity: this.handleDeleteAdEvent,
                // entityPath: adEventEditPath,
                params: params,
              }}
            />
          );
        },
        width: ACTION_WIDTH
      }
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

AccountTableBox.contextTypes = {
  uid: PropTypes.string,
  access_token: PropTypes.string,
};

export default injectIntl(AccountTableBox);
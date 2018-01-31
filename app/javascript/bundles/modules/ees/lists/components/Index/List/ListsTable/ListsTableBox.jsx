import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import {
  Table, Button, Popconfirm, Input, Row, Col, Pagination,
  Tag, Tabs, Badge, Select, Modal, Popover, Icon
} from 'antd'
import {
  getFilterParamsAndSyncUrl, mergeDeep, rowClassName, getDefaultTablePagination,
  getDefaultTableTitlePagination, getFilterParams, getInitialValueForSearch,
} from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { LISTS_URL } from '../../../../constants/paths'
import { SHORT_DATETIME_FORMAT } from 'app/constants/datatime'
import { FILTER_ORDER_MAPPINGS } from 'app/constants/table'
import moment from 'moment'

import { injectIntl } from 'react-intl'

const { Search } = Input
const { TabPane } = Tabs

class ListsTableBox extends React.Component {
  constructor(props) {
    super(props)

    const {intl} = this.props

    this.state = {
      showImportUnsubscribeModal: false,
      showImportBounceModal: false
    }

    this.initialValues = this.getInitialValues()

    _.bindAll(this, [
      'handleTabChange',
      'handleTableChange',
      'handleTableUnsubscribesChange',
      'handleTableBouncesChange',
      'handleDelete',
      'handleEdit',
      'handleAdd',
      'handleSearch',
      'handleImportUnsubscribe',
      'handleImportBounce',
      'handleCancel',
    ])

    this.columns = [
      {
        title: intl.formatMessage({id: 'attrs.created_in.label'}), 
        width: '10%',
        dataIndex: 'created_at', 
        key: 'created_at',
        render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : ''
      },
      {
        title: intl.formatMessage({id: 'attrs.name.label'}),
        dataIndex: 'name',
        key: 'name'},
      {
        title: intl.formatMessage({id: 'attrs.count.label'}),
        width: '10%',
        dataIndex: 'contact_count', 
        key: 'count',
        render: value => (value || value >= 0)  ? value : (<Icon type="loading" />)
      },
      {
        title: intl.formatMessage({id: 'attrs.creator.label'}),
        width: '10%',
        dataIndex: 'username', 
        key: 'user'},
      {
        title: intl.formatMessage({id: 'attrs.last_update.label'}),
        width: '10%',
        dataIndex: 'updated_at', 
        key: 'last_update',
        render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : ''
      },
      {
        title: intl.formatMessage({id: 'form.form_item.button.add.text'}),
        dataIndex: 'action',
        width: '10%',
        render: (cell, row) => {
          return (
            <div className="text-align--right">
              {row.uploading &&  
                (<Popover content="Uploading">
                    <Button type="primary" shape="circle" loading />
                  </Popover>)
              }
              <Button
                type="primary"
                icon="edit"
                className="button-margin--left--default"
                onClick={(e) => this.handleEdit(row.id)}
              >
              </Button>
              <Popconfirm
                placement="topLeft"
                title="Are you sure delete this catalog?"
                onConfirm={() => this.handleDelete(row.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button 
                  icon="delete" 
                  type="danger" 
                  loading={row.isDeleting}
                  className="button-margin--left--default">
                </Button>
              </Popconfirm>
            </div>
          )
        },
      },
    ]
  }

  getInitialValues() {
    const {indexState, location} = this.props
    const currentListFilters = Immutable.fromJS(getFilterParams(indexState.get('listFilters'), location))
    return {
      search: currentListFilters.get('full_search'),
    }
  }

  handleDelete(listId) {
    const {actions, indexState} = this.props
    actions.deleteList(listId)
  }

  handleEdit(listId) {
    browserHistory.push(`${LISTS_URL}/${listId}/edit`)
  }

  handleAdd(e) {
    browserHistory.push(`${LISTS_URL}/new`)
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState, location} = this.props
    const {current, pageSize, total} = pagination

    let listParams = {}
    if(current != listParams.page) {
      listParams.page = current
    }

    if(sorter.field) {
      listParams.orders = [`${sorter.field}.${FILTER_ORDER_MAPPINGS[sorter.order]}`]
    }


    listParams = getFilterParamsAndSyncUrl(indexState.get('listFilters'), location, listParams)

    actions.fetchLists(listParams)
  }

  handleTableUnsubscribesChange(pagination, filters, sorter) {
    const {actions, sharedState} = this.props
    const {current, pageSize, total} = pagination

    let unsubscribeParams = {}
    if(current != unsubscribeParams.page) {
      unsubscribeParams.page = current
    }

    if(sorter.field) {
      unsubscribeParams.orders = [`${sorter.field}.${FILTER_ORDER_MAPPINGS[sorter.order]}`]
    }

    unsubscribeParams = getFilterParams(sharedState.get('unsubscribesFilters'), unsubscribeParams)
    unsubscribeParams.page = current
    actions.fetchUnsubscribes(unsubscribeParams)
  }

  handleTableBouncesChange(pagination, filters, sorter) {
    const {actions, sharedState} = this.props
    const {current, pageSize, total} = pagination

    let bounceParams = {}
    if(current != bounceParams.page) {
      bounceParams.page = current
    }

    if(sorter.field) {
      bounceParams.orders = [`${sorter.field}.${FILTER_ORDER_MAPPINGS[sorter.order]}`]
    }

    bounceParams = getFilterParams(sharedState.get('bouncesFilters'), bounceParams)
    bounceParams.page = current
    actions.fetchBounces(bounceParams)
  }

  handleSearch(keyword) {
    const {actions, indexState, location} = this.props
    let listParams = getFilterParamsAndSyncUrl(indexState.get('listFilters'), location, {full_search: keyword})
    actions.fetchLists(listParams)
  }

  handleTabChange(tabKey) {
    if(tabKey == 'unsubscribe') {
      const {actions, sharedState, intl} = this.props
      actions.fetchUnsubscribes()
    }
    if(tabKey == 'bounce') {
      const {actions, sharedState, intl} = this.props
      actions.fetchBounces()
    }
    if(tabKey == 'spam') {
      const {actions, index} = this.props
    }
  }

  handleImportUnsubscribe() {
    const {actions} = this.props
    const file = this.inputFile.files[0]
    var data = new FormData()
    data.append('file', file)
    actions.importUnsubscribes(data)
    this.setState({showImportUnsubscribeModal: false})
  }

  handleImportBounce() {
    const {actions} = this.props
    const file = this.inputFile.files[0]
    var data = new FormData()
    data.append('file', file)
    actions.importBounces(data)
    this.setState({showImportBounceModal: false})
  }

  handleCancel() {
    this.setState({showImportUnsubscribeModal: false, showImportBounceModal: false})
  }

  render() {
    const {indexState, sharedState, actions, intl} = this.props
    const selectedListKeys = indexState.get('selectedListKeys')
    const lists = indexState.get('lists')
    const paging = indexState.getIn(['listFilters', 'paging'])
    const isFetchingLists = indexState.get('isFetchingLists')

    return (
      <div className="main-content-table-box">
        <Tabs defaultActiveKey="lists" size="large" onChange={this.handleTabChange}>

          <TabPane tab="List" key="lists">
            <Row className="main-content-table-box-tools">
              <Col span={18}>
                <Button
                  onClick={this.handleAdd}
                >
                  {intl.formatMessage({id: 'form.form_item.button.add.text'})}
                </Button>
              </Col>
              <Col span={6} className="main-content-table-box-tools-search-box">
              </Col>
            </Row>
            
            <Table
              bordered
              size="middle"
              columns={this.columns}
              dataSource={lists.toJS()}
              pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
              rowClassName={rowClassName}
              rowKey="id"
              onChange={this.handleTableChange}
              loading={isFetchingLists}
            />
          </TabPane>
          <TabPane tab="Unsubscribe" key="unsubscribe">
            {this.renderUnsubscribesTab()}
          </TabPane>
          <TabPane tab="Bounce" key="bounce">
            {this.renderBouncesTab()}
          </TabPane>
          <TabPane tab="Spam Reporter" key="spam">Content of tab 4</TabPane>
        </Tabs>
      </div>
    )
  }

  renderUnsubscribesTab() {

    const {indexState, sharedState, intl} = this.props
    const paging = sharedState.getIn(['unsubscribesFilters', 'paging'])
    const unsubscribes = sharedState.get('unsubscribes')
    const isFetchingUnsubscribes = indexState.get('isFetchingUnsubscribes')
    const unsubscribe_columns = [
      {
        title: intl.formatMessage({id: 'attrs.created_in.label'}), 
        width: '10%',
        dataIndex: 'created_at', 
        key: 'created_at',
        render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : ''
      },
      {
        title: intl.formatMessage({id: 'attrs.email.label'}),
        dataIndex: 'email',
        key: 'email'},
    ]
    return (
      <div>
        <Row className="main-content-table-box-tools">
          <Col span={18}>
            <Button
              onClick={(e) => this.setState({showImportUnsubscribeModal: true})}
            >
              {intl.formatMessage({id: 'form.form_item.button.add.text'})}
            </Button>
          </Col>
          <Col span={6} className="main-content-table-box-tools-search-box">
          </Col>
        </Row>
        <Table
          bordered
          size="middle"
          columns={unsubscribe_columns}
          dataSource={unsubscribes.toJS()}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          rowClassName={rowClassName}
          rowKey="id"
          onChange={this.handleTableUnsubscribesChange}
          loading={isFetchingUnsubscribes}
        />
        <Modal
          title="Import Unsubscribes"
          visible={this.state.showImportUnsubscribeModal}
          onOk={this.handleImportUnsubscribe}
          onCancel={this.handleCancel}
          okText="Import"
          cancelText="Close"
        >
          <input
            ref={ref => this.inputFile = ref}
            type="file"
            name="file"
            placeholder=""
            accept=".csv"
            required
          />
          <p className="help-block">
            Please upload format correct file (.csv, .xlsx). <a href="#">Sample file</a>
          </p>
        </Modal>
      </div>
    )
  }

  renderBouncesTab() {

    const {indexState, sharedState, intl} = this.props
    const paging = sharedState.getIn(['bouncesFilters', 'paging'])
    const bounces = sharedState.get('bounces')
    const isFetchingBounces = indexState.get('isFetchingBounces')
    const bounce_columns = [
      {
        title: intl.formatMessage({id: 'attrs.created_in.label'}), 
        width: '10%',
        dataIndex: 'created_at', 
        key: 'created_at',
        render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : ''
      },
      {
        title: intl.formatMessage({id: 'attrs.email.label'}),
        dataIndex: 'email',
        key: 'email'},
    ]
    return (
      <div>
        <Row className="main-content-table-box-tools">
          <Col span={18}>
            <Button
              onClick={(e) => this.setState({showImportBounceModal: true})}
            >
              {intl.formatMessage({id: 'form.form_item.button.add.text'})}
            </Button>
          </Col>
          <Col span={6} className="main-content-table-box-tools-search-box">
          </Col>
        </Row>
        <Table
          bordered
          size="middle"
          columns={bounce_columns}
          dataSource={bounces.toJS()}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          rowClassName={rowClassName}
          rowKey="id"
          onChange={this.handleTableBouncesChange}
          loading={isFetchingBounces}
        />
        <Modal
          title="Import Bounces"
          visible={this.state.showImportBounceModal}
          onOk={this.handleImportBounce}
          onCancel={this.handleCancel}
          okText="Import"
          cancelText="Close"
        >
          <input
            ref={ref => this.inputFile = ref}
            type="file"
            name="file"
            placeholder=""
            accept=".csv"
            required
          />
          <p className="help-block">
            Please upload format correct file (.csv, .xlsx). <a href="#">Sample file</a>
          </p>
        </Modal>
      </div>
    )
  }

}

export default injectIntl(ListsTableBox)
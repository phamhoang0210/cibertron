import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import { Table, Icon, Popconfirm, Button, Row, Col, Input, Tag, Pagination } from 'antd'
import {
  getFilterParamsAndSyncUrl, getFilterParams, mergeDeep, getDefaultTablePagination,
  getInitialValueForSearch, getDefaultTableTitlePagination, generateErosOrderLink
} from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { PRICES_URL } from '../../../../constants/paths'
import { LEVEL_COLOR_MAPPINGS } from '../../../../constants/constants'
import moment from 'moment'
import { LONG_DATETIME_FORMAT } from 'app/constants/datatime'
import { injectIntl } from 'react-intl'

const { Search } = Input

class PricesTableBox extends React.Component {
  constructor(props) {
    super(props)

    const {intl} = this.props

    _.bindAll(this, [
      'handleTableChange',
      'handleDelete',
      'handleEdit',
      'handleAdd',
      'handleSearch',
      'renderTableTitle',
      'handleOpenOnEros',
    ])

    this.initialValues = this.getInitialValues()

    this.columns = [{
        title: intl.formatMessage({id: 'attrs.name_course.label'}),
        dataIndex: 'name',
        key: 'name',
        width: 450,
    }, {
      title: intl.formatMessage({id: 'attrs.min_price.label'}),
      dataIndex: 'min_price',
      key: 'min_price',
    }, {
        title: intl.formatMessage({id: 'attrs.max_price.label'}),
        dataIndex: 'max_price',
        key: 'max_price',
    }, {
        title: intl.formatMessage({id: 'attrs.is_sale.label'}),
        dataIndex: 'is_sale',
        key: 'is_sale',
        render: value => {
          if (value == '0'){
            return 'Không được bán'
          }else{
            return 'Được bán'
          }
        },
    }, {
      title: intl.formatMessage({id: 'attrs.created_at.label'}),
      dataIndex: 'created_at',
      key: 'created_at',
      render: value => moment(value).format(LONG_DATETIME_FORMAT),
    }, {
        title: '',
        key: 'action',
        width: 140,
        render: (cell, row) => {
            return (
                <div className="text-align--center">
                    <Button
                        className="button-margin--left--default"
                        onClick={(e) => this.handleEdit(row.id)}
                    >
                        {intl.formatMessage({id: 'form.form_item.button.edit.text'})}
                    </Button>
                    <Popconfirm
                        placement="topLeft"
                        title={intl.formatMessage({id: 'popconfirm.delete.title'})}
                        onConfirm={() => this.handleDelete(row.id)}
                        okText={intl.formatMessage({id: 'popconfirm.delete.ok_text'})}
                        cancelText={intl.formatMessage({id: 'popconfirm.delete.cancel_text'})}
                    >
                        <Button type="danger" loading={row.isDeleting}>
                            {intl.formatMessage({id: 'form.form_item.button.delete.text'})}
                        </Button>
                    </Popconfirm>
                </div>
            )
        },
    }];
  }

  getInitialValues() {
    const {indexState, location} = this.props
    const currentPriceParams = Immutable.fromJS(getFilterParams(indexState.get('priceFilters'), location))

    return {
      search: getInitialValueForSearch({}, currentPriceParams, ['lead', 'email.like']),
    }
  }

  handleDelete(priceId) {
    const {actions, indexState} = this.props
    actions.deletePrice(priceId)
  }

  handleEdit(priceId) {
    browserHistory.push(`${PRICES_URL}/${priceId}/edit`)
  }

  handleOpenOnEros(sourceId) {
    window.open(generateErosOrderLink(sourceId),'_blank')
  }

  handleAdd(e) {
    browserHistory.push(`${PRICES_URL}/new`)
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState, location} = this.props
    let priceParams = {}
    const {current, pageSize, total} = pagination

    if(current != priceParams.page) {
      priceParams.page = current
    }

    priceParams = getFilterParamsAndSyncUrl(indexState.get('priceFilters'), location, priceParams)

    actions.fetchPrices(priceParams)
  }

  handleSearch(keyword) {
    const {actions, indexState} = this.props
    let priceParams = getFilterParamsAndSyncUrl(
      indexState.get('priceFilters'),
      location,
      {compconds: {lead: {'email.like': `%${keyword}%`}}}
    )
    actions.fetchPrices(priceParams)
  }

  render() {
    const {indexState, intl} = this.props
    const prices = indexState.get('prices')
    const paging = indexState.getIn(['priceFilters', 'paging'])
    const isFetchingPrices = indexState.get('isFetchingPrices')

    return (
      <div style={{marginTop: '8px'}}>
        <Row style={{marginBottom: '8px'}}>
          <Col span={18}>
              <Button
                  onClick={this.handleAdd}
              >
                  {intl.formatMessage({id: 'form.form_item.button.add.text'})}
              </Button>
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Search
              enterButton
              defaultValue={this.initialValues.search.initialValue}
              placeholder={intl.formatMessage({id: 'index.prices_table.tools.search.placeholder'})}
              onSearch={this.handleSearch}
            />
          </Col>
        </Row>
        <Table
          bordered
          title={this.renderTableTitle}
          size="middle"
          columns={this.columns}
          dataSource={prices.toJS()}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingPrices}
        />
      </div>
    )
  }

  renderTableTitle() {
    const {indexState, actions} = this.props
    const paging = indexState.getIn(['priceFilters', 'paging'])

    return (
      <Row className="main-content-table-tools">
        <Col span={16}>
        </Col>
        <Col span={8} className="main-content-table-tools-pagination-box">
          <Pagination
            size="small"
            onChange={(page, pageSize) => this.handleTableChange({current: page}, {}, {})}
            {...getDefaultTableTitlePagination(paging.get('page'), paging.get('record_total'))}
          />
        </Col>
      </Row>
    )
  }
}

export default injectIntl(PricesTableBox)
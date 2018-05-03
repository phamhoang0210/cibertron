import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import { Table, Icon, Button, Row, Col, Input, Tag, Pagination } from 'antd'
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
        title: intl.formatMessage({id: 'Tên khóa học'}),
        dataIndex: 'name',
        key: 'name',
    }, {
      title: intl.formatMessage({id: 'Giá thấp nhất'}),
      dataIndex: 'min_price',
      key: 'min_price',
    }, {
        title: intl.formatMessage({id: 'Giá cao nhất'}),
        dataIndex: 'max_price',
        key: 'max_price',
    }, {
      title: intl.formatMessage({id: 'attrs.created_at.label'}),
      dataIndex: 'created_at',
      key: 'created_at',
      render: value => moment(value).format(LONG_DATETIME_FORMAT),
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
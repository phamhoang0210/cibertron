import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import {
  Table, Icon, Button, Popconfirm, Row, Col, Input, Tabs
} from 'antd'
import { getFilterParams, mergeDeep } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { LANDING_PAGES_URL } from '../../../../constants/paths'
import moment from 'moment'
import { LONG_DATETIME_FORMAT } from 'app/constants/datatime'
import LandingPageLogsTableBox from './LandingPageLogsTable/LandingPageLogsTableBox'
import { numberToCurrency } from 'helpers/numberHelper'

const { Search } = Input
const TabPane = Tabs.TabPane

class LandingPagesTableBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleTableChange',
      'handleDelete',
      'handleEdit',
      'handleAdd',
      'handleSearch',
      'handleGetCode',
    ])

    this.columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (value, record) => (
        <div>
          <b>{value}</b><br/>
          type: <i>{record.landing_page_type}</i><br/>
        </div>
      )
    }, {
      title: 'Domain',
      dataIndex: 'domain.name',
      key: 'domain_name',
      render: value => {
        if(value) {
          return (<a href={`http://${value}`} target="_blank">{value}</a>)
        }
      }
    }, {
      title: 'Creator name',
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
      title: 'Discount',
      dataIndex: 'discount_id',
      key: 'discount',
      render: (value, record) => {
        const {sharedState} = this.props
        const discountIdMappings = sharedState.get('discountIdMappings')
        const discount = discountIdMappings.get(`${value}`)
        if (discount) {
          return (
            <div>
              <b>{discount.get('name')}</b><br/>
              Price: <i>{numberToCurrency(discount.get('old_price'))}</i> => <i>{numberToCurrency(discount.get('new_price'))}</i><br/>
            </div>
          )
        }

      }
    }, {
      title: 'Product',
      dataIndex: 'discount_id',
      key: 'discount_product',
      render: (value, record) => {
        const {sharedState} = this.props
        const discountIdMappings = sharedState.get('discountIdMappings')
        const discount = discountIdMappings.get(`${value}`)
        if (discount) {
          return (
            <div>
              <b>{discount.getIn(['product_json', 'name'])}</b>
              <br/>
              Code: <i>{discount.getIn(['product_json', 'code'])}</i><br/>
            </div>
          )
        }

      }
    }, {
      title: 'Created at',
      dataIndex: 'created_at',
      key: 'created_at',
      render: value => moment(value).format(LONG_DATETIME_FORMAT),
    }, {
      title: '',
      key: 'action',
      render: (cell, row) => {
        return (
          <div className="text-align--right">
            <Popconfirm
              placement="topLeft"
              title="Are you sure delete this landingPage?"
              onConfirm={() => this.handleDelete(row.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" loading={row.isDeleting}>
                Delete
              </Button>
            </Popconfirm>
            <Button
              className="button-margin--left--default" 
              onClick={(e) => this.handleEdit(row.id)}
            >
              Edit
            </Button>
            <Button
              className="button-margin--left--default" 
              onClick={(e) => this.handleGetCode(row.id)}
            >
              Get code
            </Button>
          </div>
        )
      },
    }];
  }

  handleDelete(landingPageId) {
    const {actions, indexState} = this.props
    actions.deleteLandingPage(landingPageId)
  }

  handleEdit(landingPageId) {
    browserHistory.push(`${LANDING_PAGES_URL}/${landingPageId}/edit`)
  }

  handleAdd(e) {
    browserHistory.push(`${LANDING_PAGES_URL}/new`)
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState} = this.props
    let landingPageParams = getFilterParams(indexState.get('landingPageFilters'))
    const {current, pageSize, total} = pagination

    if(current != landingPageParams.page) {
      landingPageParams.page = current
    }

    actions.fetchLandingPages(landingPageParams)
  }

  handleSearch(keyword) {
    const {actions, indexState} = this.props
    let landingPageParams = getFilterParams(indexState.get('landingPageFilters'))
    actions.fetchLandingPages(mergeDeep([landingPageParams, {compconds: {'name.like': `%${keyword}%`}}]))
  }

  handleGetCode(landingPageId) {
    browserHistory.push(`${LANDING_PAGES_URL}/${landingPageId}/get_code`)
  }

  render() {
    const {indexState, actions, sharedState} = this.props
    const landingPages = indexState.get('landingPages')
    const paging = indexState.getIn(['landingPageFilters', 'paging'])
    const isFetchingLandingPages = indexState.get('isFetchingLandingPages')

    return (
      <div className="main-content-table-box">
        <Row className="main-content-table-box-tools">
          <Col span={18}>
            <Button
              onClick={this.handleAdd}
            >
              Add
            </Button>
          </Col>
          <Col span={6}  className="main-content-table-box-tools-search-box">
            <Search
              placeholder="Search by name.."
              onSearch={this.handleSearch}
            />
          </Col>
        </Row>
        <Table
          className="main-content-table-box-body"
          size="middle"
          columns={this.columns}
          dataSource={landingPages.toJS()}
          pagination={{
            total: paging.get('record_total'),
            current: paging.get('page'),
          }}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingLandingPages}
          expandedRowRender={record => {
            return (
              <Tabs defaultActiveKey="landingPage_logs" style={{background: '#fff'}}>
                <TabPane tab="LandingPage logs" key="landingPage_logs">
                  <LandingPageLogsTableBox
                    landingPage={Immutable.fromJS(record)}
                    actions={actions}
                    sharedState={sharedState}
                  />
                </TabPane>
              </Tabs>
            )
          }}
        />
      </div>
    )
  }
}

export default LandingPagesTableBox
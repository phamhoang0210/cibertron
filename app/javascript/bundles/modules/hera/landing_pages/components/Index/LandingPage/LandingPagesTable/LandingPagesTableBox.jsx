import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import {
  Table, Icon, Button, Popconfirm, Row, Col, Input, Tabs, Badge, Progress, Tag
} from 'antd'
import { getFilterParams, mergeDeep, getDefaultTablePagination } from 'helpers/applicationHelper'
import { removeSpaceInput } from 'helpers/inputHelper'
import { browserHistory } from 'react-router'
import { LANDING_PAGES_URL } from '../../../../constants/paths'
import moment from 'moment'
import { LONG_DATETIME_FORMAT } from 'app/constants/datatime'
import LandingPageLogsTableBox from './LandingPageLogsTable/LandingPageLogsTableBox'
import { numberToCurrency } from 'helpers/numberHelper'
import { injectIntl } from 'react-intl'

const { Search } = Input
const TabPane = Tabs.TabPane

class LandingPagesTableBox extends React.Component {
  constructor(props) {
    super(props)

    const {intl} = this.props

    _.bindAll(this, [
      'handleTableChange',
      'handleDelete',
      'handleEdit',
      'handleAdd',
      'handleSearch',
      'handleGetCode',
      'handleReload',
    ])

    this.columns = [{
      title: intl.formatMessage({id: 'attrs.name.label'}),
      dataIndex: 'name',
      key: 'name',
      width: '13%',
      render: (value, record) => {
        const {sharedState} = this.props
        const users = sharedState.get('users')
        const user = users.find((user) => user.get('gid') == record.user_gid)

        var name = "unknown"
        if (user) {
          name = user.get('username')
        }
        return (
          <div>
            <b>{value}</b><br/>
            <span>{name}</span><br/>
            <Tag color="red"><i>{record.landing_page_type}</i></Tag>
          </div>
        )
      }
    },    
    // {
    //   title: intl.formatMessage({id: 'attrs.score.label'}),
    //   dataIndex: 'domain',
    //   key: 'score',
    //   width: '7%',
    //   render: (value) => {
    //     var status = ""
    //     var score = 0
    //     try {
    //       score = value.pagespeed_insight.formatted_results.rule_groups.SPEED.score
    //     }
    //     catch(err) {
    //       console.log(err.message)
    //     }

    //     if (score >= 80) {
    //       status = "success"
    //     } else if (score < 60) {
    //       status = "exception"
    //     } else {
    //       status = "active"
    //     }
    //     if (score == 0) {
    //       return (
    //         <Progress width={60} status={status} type="circle" percent={score} />
    //       )
    //     } else {
    //       return (
    //         <Progress width={60} status={status} type="circle" percent={score} format={percent => `${percent}`} />
    //       )
    //     }

    //   },
    // },
    {
      title: intl.formatMessage({id: 'attrs.domain_id.label'}),
      dataIndex: 'domain',
      key: 'domain_name',
      width: '23%',
      render: (value, record) => {
        if(value && value.name) {
          const {sharedState} = this.props
          const pagespeedInsight = value.pagespeed_insight
          const requestErrors = pagespeedInsight && pagespeedInsight.request_errors || []
          const landing_page_error = record.landing_page_error
          let link_amazon = 'https://edumall-landingpage.s3-ap-southeast-1.amazonaws.com/landingpages/' + record.domain.name +'/index.html'
          let backup = record.domain && record.domain.backup || ''
          let name_domain = record.domain && record.domain.name || ''
          const editor_links = sharedState.get('allEditorLinks').toJS();
          const dns_servers = sharedState.get('allPlatforms').toJS();
          return (
            <div style={{ padding: '26px 16px 16px' }}>
              <Badge status={(pagespeedInsight && pagespeedInsight.request_success) ? 'success' : 'error'}/>
              <a href={`http://${value.name}`} target="_blank">{value.name}</a><br/>
              {requestErrors.map(error =>
                <div key={error}>
                  <small style={{color: 'red'}}>- {error}</small>
                </div>
              )}
              {editor_links.map(editor_link =>         
                {return editor_link.landing_page_id == record.id && (
                  (<div key={editor_link.id} style={{float:'left'}}>
                  <Button type="primary"  href={editor_link.link} target="blank" size="small" ghost style = {{marginTop: '2px', marginRight: "2px"}}><i>
                    {editor_link.platform.title}
                  </i></Button>
                  </div>)
                )}
              )}
              <Button type="primary" href={link_amazon} target="blank" size="small" ghost style = {{marginTop: '2px', marginRight: "2px"}}><i>View IT Backup</i></Button>
              {landing_page_error.map(lp_error => 
                {return lp_error.status==false ?
                  (<div key={lp_error.error.id}>
                    <small style={{color: 'red'}}>- {lp_error.error.content}</small>
                  </div>)
                  : null
                }
              )}

              {backup && (
                <div>
                 <a href={`${intl.formatMessage({id: 'others.aws'})}/${name_domain}/index.html`} target="_blank">  
                   <Tag style={{ marginTop: 5 }} color="volcano">{intl.formatMessage({id: 'attrs.backup_index.label'})}</Tag> 
                 </a>
                 <a href={`${intl.formatMessage({id: 'others.aws'})}/${name_domain}/thankyou/thankyou.html`} target="_blank">  
                   <Tag style={{ marginTop: 5 }} color="volcano">{intl.formatMessage({id: 'attrs.backup_thankyou.label'})}</Tag> 
                 </a>
                </div>
              )}
            </div>
          )
        }
      }
    },
     {
      title: intl.formatMessage({id: 'attrs.discount_id.label'}),
      dataIndex: 'discount_id',
      key: 'discount',
      width: '15%',
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
      title: intl.formatMessage({id: 'attrs.product.label'}),
      dataIndex: 'discount_id',
      key: 'discount_product',
      width: '28%',
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
    },
    {
      title: intl.formatMessage({id: 'attrs.created_at.label'}),
      dataIndex: 'created_at',
      key: 'created_at',
      width: '15%',
      render: value => moment(value).format(LONG_DATETIME_FORMAT),
    }, {
      title: '',
      key: 'action',
      width: '7%',
      render: (cell, row) => {
        return (
          <div className="text-align--right">
            <Button
              icon="code-o"
              className="width--full"
              size="small"
              onClick={(e) => this.handleGetCode(row.id)}
            >
              {intl.formatMessage({id: 'form.form_item.button.get_code.text'})}
            </Button>
            <Button
              icon="edit"
              size="small"
              className="button-margin--top--default width--full"
              onClick={(e) => this.handleEdit(row.id)}
            >
              {intl.formatMessage({id: 'form.form_item.button.edit.text'})}
            </Button>
            <Button
              icon="edit"
              size="small"
              className="button-margin--top--default width--full"
              loading={row.isReloading}
              onClick={(e) => this.handleReload(row.id)}
            >
              Reload
            </Button>
            <Popconfirm
              placement="topLeft"
              title={intl.formatMessage({id: 'popconfirm.delete.title'})}
              onConfirm={() => this.handleDelete(row.id)}
              okText={intl.formatMessage({id: 'popconfirm.delete.ok_text'})}
              cancelText={intl.formatMessage({id: 'popconfirm.delete.cancel_text'})}
            >
              <Button
                className="button-margin--top--default width--full"
                icon="delete"
                type="danger"
                size="small"
                loading={row.isDeleting}
              >
                {intl.formatMessage({id: 'form.form_item.button.delete.text'})}
              </Button>
            </Popconfirm>
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
    keyword = removeSpaceInput(keyword)
    const {actions, indexState} = this.props
    let landingPageParams = getFilterParams(indexState.get('landingPageFilters'))
    actions.fetchLandingPages(mergeDeep([landingPageParams, {compconds: {domain: {'name.like': `%${keyword}%`}}}]))
  }

  handleGetCode(landingPageId) {
    browserHistory.push(`${LANDING_PAGES_URL}/${landingPageId}/get_code`)
  }

  handleReload(landingPageId){
    const {actions, indexState} = this.props
    const paging = indexState.getIn(['landingPageFilters', 'paging'])
    const landingPageParams = getFilterParams(indexState.get('landingPageFilters'))
    const pagination = getDefaultTablePagination(paging.get('page'), paging.get('record_total'))
    const {current, pageSize, total} = pagination

    if(current != landingPageParams.page) {
      landingPageParams.page = current
    }
    actions.reloadLandingPage(landingPageId, landingPageParams)
    // actions.fetchLandingPages(landingPageParams)
  }
  render() {
    const {indexState, actions, sharedState, intl} = this.props
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
              {intl.formatMessage({id: 'form.form_item.button.add.text'})}
            </Button>
          </Col>
          <Col span={6}  className="main-content-table-box-tools-search-box">
            <Search
              enterButton
              placeholder={intl.formatMessage({id: 'index.landing_pages_table.search.placeholder'})}
              onSearch={this.handleSearch}
            />
          </Col>
        </Row>
        <Table
          className="main-content-table-box-body"
          bordered
          size="middle"
          columns={this.columns}
          dataSource={landingPages.toJS()}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingLandingPages}
          expandedRowRender={record => {
            return (
              <Tabs defaultActiveKey="landing_page_logs" style={{background: '#fff'}}>
                <TabPane
                  tab={intl.formatMessage({id: 'index.landing_pages_table.expanded_row.tabs.tab.landing_page_logs.title'})}
                  key="landing_page_logs"
                >
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

export default injectIntl(LandingPagesTableBox)
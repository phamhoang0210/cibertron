import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import {
  Table, Button, Popconfirm, Input, Row, Col, Pagination,
  Tag, Tabs, Badge, Select, Modal
} from 'antd'
import {
  getFilterParamsAndSyncUrl, mergeDeep, rowClassName, getDefaultTablePagination,
  getDefaultTableTitlePagination, getFilterParams, getInitialValueForSearch,
} from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { TEMPLATES_URL } from '../../../../constants/paths'
import { SHORT_DATETIME_FORMAT } from 'app/constants/datatime'
import { FILTER_ORDER_MAPPINGS } from 'app/constants/table'
import moment from 'moment'

import { injectIntl } from 'react-intl'

const { Search } = Input
const TabPane = Tabs.TabPane

class TemplatesTableBox extends React.Component {
  constructor(props) {
    super(props)

    const {intl} = this.props

    this.initialValues = this.getInitialValues()

    _.bindAll(this, [
      'handleTableChange',
      'handleDelete',
      'handleEdit',
      'handleAdd',
      'handleSearch',
      'handleShowTemplateModal',
      'handleCancelTemplateModal'
    ])

    this.columns = [
      {
        title: 'Created', 
        width: '10%',
        dataIndex: 'created_at', 
        key: 'created_at',
        render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : ''
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'},
      {
        title: 'Nguoi tao',
        width: '10%',
        dataIndex: 'user_id', 
        key: 'user'},
      {
        title: 'Action',
        dataIndex: 'action',
        width: '10%',
        render: (cell, row) => {
          return (
            <div className="text-align--right">
              <Button
                type="primary"
                ghost
                icon="eye"
                className="button-margin--left--default"
                onClick={(e) => this.handleShowTemplateModal(row.content)}
              >
              </Button>
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

  state = {modalShow: false, modalContent: ''}
  //Handle show modal
  handleShowTemplateModal(modalContent) {
    this.setState({
      modalShow: true,
      modalContent: modalContent,
    });
  }
  handleCancelTemplateModal() {
    this.setState({
      modalShow: false
    });
  }

  getInitialValues() {
    const {indexState, location} = this.props
    const currentTemplateFilters = Immutable.fromJS(getFilterParams(indexState.get('templateFilters'), location))
    return {
      search: currentTemplateFilters.get('full_search'),
    }
  }

  handleDelete(templateId) {
    const {actions, indexState} = this.props
    actions.deleteTemplate(templateId)
  }

  handleEdit(templateId) {
    browserHistory.push(`${TEMPLATES_URL}/${templateId}/edit`)
  }

  handleAdd(e) {
    browserHistory.push(`${TEMPLATES_URL}/new`)
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState, location} = this.props
    const {current, pageSize, total} = pagination

    let templateParams = {}
    if(current != templateParams.page) {
      templateParams.page = current
    }

    if(sorter.field) {
      templateParams.orders = [`${sorter.field}.${FILTER_ORDER_MAPPINGS[sorter.order]}`]
    }


    templateParams = getFilterParamsAndSyncUrl(indexState.get('templateFilters'), location, templateParams)

    actions.fetchTemplates(templateParams)
  }

  handleSearch(keyword) {
    const {actions, indexState, location} = this.props
    let templateParams = getFilterParamsAndSyncUrl(indexState.get('templateFilters'), location, {full_search: keyword})
    actions.fetchTemplates(templateParams)
  }

  render() {
    const {indexState, sharedState, actions, intl} = this.props
    const selectedTemplateKeys = indexState.get('selectedTemplateKeys')
    const templates = indexState.get('templates')
    const paging = indexState.getIn(['templateFilters', 'paging'])
    const isFetchingTemplates = indexState.get('isFetchingTemplates')

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
          <Col span={6} className="main-content-table-box-tools-search-box">
          </Col>
        </Row>

        <Modal
          className = 'modalCustom'
          title="Template"
          cancelText="Cancel"
          visible={this.state.modalShow}
          onCancel={this.handleCancelTemplateModal}
          onOk={this.handleCancelTemplateModal}
        >
          <p dangerouslySetInnerHTML={{__html: this.state.modalContent}} />
        </Modal>
        
        <Table
          bordered
          size="middle"
          columns={this.columns}
          dataSource={templates.toJS()}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          rowClassName={rowClassName}
          rowKey="created_at"
          onChange={this.handleTableChange}
          loading={isFetchingTemplates}
        />
      </div>
    )
  }
}

export default injectIntl(TemplatesTableBox)
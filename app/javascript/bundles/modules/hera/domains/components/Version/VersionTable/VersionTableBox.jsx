import React from 'react'
import _ from 'lodash'
import { Table, Icon, Button, Popconfirm, Row, Col, Input, Tag, version } from 'antd'
import { LONG_DATETIME_FORMAT } from 'app/constants/datatime'
import { injectIntl } from 'react-intl'
import moment from 'moment'

const { Search } = Input

class VersionTableBox extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
    const {intl} = props

    _.bindAll(this, [
      
    ])

    this.columns = [{
      title: intl.formatMessage({id: 'attrs.id.label'}),
      dataIndex: 'id',
      key: 'id',
      },{
      title: intl.formatMessage({id: 'version.version_name'}),
      dataIndex: 'version_number',
      key: 'version_number'
      },{
      title: intl.formatMessage({id: 'attrs.created_at.label'}),
      dataIndex: 'created_at',
      key: 'created_at',
      render: value => value ? moment(value).format(LONG_DATETIME_FORMAT) : '',
      },{
      title: intl.formatMessage({id: 'version.create_by'}),
      dataIndex: 'create_by',
      key: 'create_by',
      render: (cell, row) => (
        <p>Auto</p>
      )
    },
    ]
  }
  
  render() {
    const {versionState, intl} = this.props
    const versions = versionState.get('versions')
    const isFetchVersions = versionState.get('isFetchVersions')
    return (
      <div className="main-content-table-box">
        {versions && !versions.isEmpty() && 
          <Table 
            bordered
            className="main-content-table-box-body"
            size="middle"
            columns={this.columns}
            dataSource={versions.toJS()}
            rowKey="id"
            loading={isFetchVersions}
          />
        }
      </div>
    )
  }
}

export default injectIntl(VersionTableBox)
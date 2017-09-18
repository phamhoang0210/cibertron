import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import { Table, Input, Popconfirm } from 'antd'
import EditableCell from './Cell/EditableCell'

class EditableTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    _.bindAll(this, [
      'transformColumns',
      'renderColumns',
      'editDone',
      'edit',
      'delete',
      'handleChange',
    ])
  }

  transformColumns(columns) {
    const {rowKey} = this.props

    let editableColumns = columns.map(column => {
      return {
        ...column,
        render: (cellValue, record, index) => this.renderColumns(cellValue, record, index, column.key),
      }
    })

    editableColumns.push({
      title: 'Action',
      dataIndex: 'operation',
      width: 200,
      render: (text, record, index) => {
        const editable = !!this.state[`${record[rowKey]}.editable`]
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.editDone(record[rowKey], 'save')}>Save</a>
                  {' | '}
                  <a onClick={() => this.editDone(record[rowKey], 'cancel')}>Cancel</a>
                </span>
                :
                <span>
                  <a onClick={() => this.edit(record[rowKey])}>
                    {record.isUpdating ? 'Editing..' : 'Edit'}
                  </a>
                  {' | '}
                  <Popconfirm
                    title="Sure to delete?"
                    onConfirm={() => this.delete(record[rowKey])}
                    okText="Yes"
                    cancelText="No"
                  >
                    <a>{record.isDeleting ? 'Deleting..' : 'Delete'}</a>
                  </Popconfirm>
                </span>
            }
          </div>
        );
      },
    })

    return editableColumns
  }

  edit(rowId) {
    this.setState({
        [`${rowId}.editable`]: true,
        [`${rowId}.status`]: 'edit',
      })
  }

  delete(rowId) {
    const {handleDelete} = this.props
    if(handleDelete) { handleDelete(rowId) }
  }

  editDone(rowId, status) {
    this.setState({
      [`${rowId}.editable`]: false,
      [`${rowId}.status`]: status,
    })
  }

  handleChange(record, key, value) {
    const {rowKey} = this.props
    const {handleUpdate} = this.props
    if(handleUpdate && record[key] != value) {
      handleUpdate(record[rowKey], {[key]: value})
    }
  }

  renderColumns(cellValue, record, index, key) {
    const {rowKey} = this.props
    const editableFields = record.editableFields || []
    const recordState = this.state[record[rowKey]]
    const status = this.state[`${record[rowKey]}.status`]
    const editable = !!this.state[`${record[rowKey]}.editable`] && editableFields.includes(key)

    return (
      <EditableCell
        editable={editable}
        value={cellValue}
        onChange={value => this.handleChange(record, key, value)}
        status={status}
      />
    )
  }

  transformDataSource(dataSource) {
    return dataSource
  }

  render() {
    const {columns, dataSource, ...props} = this.props
    const editableColumns = this.transformColumns(columns)
    const editableCDataSource = this.transformDataSource(dataSource)

    return (
      <Table
        size="middle"
        dataSource={editableCDataSource}
        columns={editableColumns}
        {...props}
      />
    )
  }
}

export default EditableTable
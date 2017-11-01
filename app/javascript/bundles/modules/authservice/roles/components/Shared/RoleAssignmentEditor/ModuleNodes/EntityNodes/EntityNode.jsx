import React from 'react'
import _ from 'lodash'
import { Row, Col, Icon, Input, Select } from 'antd'
import { injectIntl } from 'react-intl'

const Option = Select.Option
const InputGroup = Input.Group

class EntityNode extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editMode: false,
    }

    _.bindAll(this, [
      'handleDelete',
      'setEditMode',
      'cancelEditMode',
      'handleUpdate',
    ])
  }

  handleDelete(e) {
    e.preventDefault()
    const {keyNames, deletePermission} = this.props
    deletePermission(keyNames)
  }

  setEditMode(e) {
    e.preventDefault()
    this.setState({editMode: true})
  }

  cancelEditMode(e) {
    e.preventDefault()
    this.setState({editMode: false})
  }

  handleUpdate(keyNames, value) {
    const {updatePermission} = this.props
    updatePermission(keyNames, value)
  }

  render() {
    const {name, keyNames, permissions, sharedState, intl} = this.props
    const actionNames = sharedState.get('actionNames')
    const accessLevels = sharedState.get('accessLevels')
    const {editMode} = this.state

    return (
      <Row gutter={2}>
        <b>{name}</b>
        <div>
          {editMode ? (
            <div>
              <Row gutter={8}>
                {actionNames.map(actionName => (
                  <Col span={12} key={actionName}>
                    <InputGroup compact>
                      <Input disabled style={{width: '60%'}} value={actionName}/>
                      <Select
                        defaultValue={permissions.get(actionName)}
                        style={{width: '40%'}}
                        onChange={v => this.handleUpdate(`${keyNames}.${actionName}`, v)}
                      >
                        {accessLevels.map(level => (
                          <Option key={level} value={level}>
                            {level}
                          </Option>
                        ))}
                      </Select>
                    </InputGroup>
                  </Col>
                ))}
              </Row>
              <div>
                <a href="#" onClick={this.cancelEditMode}>
                  {intl.formatMessage({id: 'form.form_item.button.done.text'})}
                </a>
              </div>
            </div>
          ) : (
            <div>
              {actionNames.map(actionName => (
                <span key={actionName}>
                  {actionName}: {permissions.get(actionName)} <span className="ant-divider" />
                </span>
              ))}
              <div>
                <a href="#" onClick={this.setEditMode}>
                  {intl.formatMessage({id: 'form.form_item.button.edit.text'})}
                </a>
                <span className="ant-divider" />
                <a href="#" onClick={this.handleDelete}>
                  {intl.formatMessage({id: 'form.form_item.button.delete.text'})}
                </a>
              </div>
            </div>
          )}
        </div>
      </Row>
    )
  }
}

export default injectIntl(EntityNode)
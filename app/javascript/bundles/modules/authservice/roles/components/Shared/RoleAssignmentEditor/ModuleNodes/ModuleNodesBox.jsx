import React from 'react'
import _ from 'lodash'
import { Row, Col, Icon, Button, Collapse, Select, Input } from 'antd'
import ModuleNode from './ModuleNode'
import { injectIntl } from 'react-intl'
import { selectFilterOption } from 'helpers/antdHelper'

const InputGroup = Input.Group
const Panel = Collapse.Panel
const Option = Select.Option

class ModuleNodesBox extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showActionAdd: false,
    }

    _.bindAll(this, [
      'renderActionsBox',
      'showActionAdd',
      'hideActionAdd',
      'handleAdd',
    ])
  }

  showActionAdd() {
    this.setState({showActionAdd: true})
  }

  hideActionAdd() {
    this.setState({showActionAdd: false})
  }

  handleAdd() {
    const {addPermission} = this.props
    const {permissionKeyNames} = this.state
    if(addPermission) {
      addPermission(permissionKeyNames, this.state)
    }
  }

  render() {
    const {permissions, intl} = this.props
    const moduleNodes = []

    permissions.forEach((v, k) => {
      moduleNodes.push(
        <Panel
          header={k}
          key={k}
          style={{
            background: '#f7f7f7',
            borderRadius: 4,
            marginBottom: 8,
            border: 0,
            overflow: 'hidden',
          }}
        >
          <ModuleNode
            {...this.props}
            name={k}
            keyNames={k}
            permissions={v}
          />
        </Panel>
      )
    })

    return (
      <Row>
        <Collapse bordered={false}>
          {moduleNodes}
        </Collapse>
        {this.renderActionsBox()}
      </Row>
    )
  }

  renderActionsBox() {
    const {sharedState, intl} = this.props
    const entities = sharedState.get('entities')
    const actionNames = sharedState.get('actionNames')
    const accessLevels = sharedState.get('accessLevels')
    const {showActionAdd} = this.state

    if(showActionAdd) {
      return (
        <div>
          <Row>
            <Col span={24}>
              <Select
                showSearch
                filterOption={selectFilterOption}
                placeholder={intl.formatMessage({id: 'attrs.entity.placeholder.select.single'})}
                onChange={v => this.setState({permissionKeyNames: v})}
              >
                {entities.map(entity => (
                  <Option
                    value={`${entity.get('namespace')}.${entity.get('name')}`}
                    key={entity.get('id')}
                  >
                    {`${entity.get('namespace')}.${entity.get('name')}`}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row gutter={8}>
            {actionNames.map(actionName => (
              <Col span={12} key={actionName}>
                <InputGroup compact>
                  <Input disabled style={{width: '60%'}} value={actionName}/>
                  <Select
                    style={{width: '40%'}}
                    onChange={null}
                    placeholder={intl.formatMessage({id: 'attrs.access_level.placeholder.select.single'})}
                    onChange={v => this.setState({[actionName]: v})}
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
          <Row>
            <Col span={24} className="text-align--right">
              <Button
                icon="close"
                className="button-margin--right--default"
                onClick={this.hideActionAdd}
              >
                {intl.formatMessage({id: 'form.form_item.button.close.text'})}
              </Button>
              <Button
                icon="plus"
                type="primary"
                onClick={this.handleAdd}
              >
                {intl.formatMessage({id: 'form.form_item.button.add.text'})}
              </Button>
            </Col>
          </Row>
        </div>
      )
    } else {
      return (
        <Button
          type="dashed"
          icon="plus"
          size="large"
          onClick={this.showActionAdd}
        >
          {intl.formatMessage({id: 'shared.role_assignment_editor.module_nodes.add_new_permission.text'})}
        </Button>
      )
    }
  }
}

export default injectIntl(ModuleNodesBox)
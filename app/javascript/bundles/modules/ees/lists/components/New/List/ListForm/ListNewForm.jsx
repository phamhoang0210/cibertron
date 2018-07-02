import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT, DEFAULT_FORM_TAIL_LAYOUT } from 'app/constants/form'
import { Form, Input, Row, Col, Button, Select, Alert, Checkbox, Icon } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'
import { injectIntl } from 'react-intl'

const Option = Select.Option
const FormItem = Form.Item
const TextArea = Input.TextArea

class ListNewForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    _.bindAll(this, [
      'handleBack',
      'handleSubmit',
    ])
  }

  handleBack(e) {
    const {actions} = this.props
    actions.resetAlert()
    browserHistory.goBack()
  }

  handleSubmit(e) {
    e.preventDefault()
    const {actions} = this.props
    const f = this.inputFile.files[0]
    var data = new FormData()
    data.append('file', f)
    this.props.form.validateFields((err, values) => {
      if (!err) {
        data.append('name', values["name"])
        actions.createList(data)
      }
    })
  }

  renderMessage(){
    return (
      <div>
        <h3><Icon type="smile-o" /> Tệp email chỉ nên có 1 cột với header là <b>email</b>.</h3>
        <h3><Icon type="smile-o" /> Nên lọc và định dạng lại ngôn ngữ thành không dấu trước khi upload.</h3>
        <h3><Icon type="smile-o" /> Nên upload lên Google Sheet, sau đấy tải về để có định dạng chuẩn.</h3>
        <h3><Icon type="smile" /> Làm hết các cách trên mà vẫn lỗi thì chịu, đi báo Product Support.</h3>
        <h3><Icon type="edit" /> Ở phần Edit, có thể tải lên các tệp khác vào cùng một List.</h3>
      </div>
    )
  }

  render() {
    const {newState, sharedState, intl} = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form
    const alert = newState.get('alert')
    const isCreatingList = newState.get('isCreatingList')
    
    return (
      <div className="main-content-form-box" >
        {alert && !alert.isEmpty() && (
          <Row className="main-content-form-box-alert-box">
            <Col span={15} offset={5}>
              <AlertBox
                messages={alert.get('messages')}
                type={alert.get('type')}
              />
            </Col>
          </Row>
        )}
        <Row>
          <Col span={20}>
            <Form onSubmit={this.handleSubmit} layout="horizontal">
              <FormItem
                label={intl.formatMessage({id: 'attrs.name.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: intl.formatMessage(
                      {id: 'attrs.name.errors.required'},
                    ),
                  }],
                })(<Input />)}
              </FormItem>
              
              <input style={{marginLeft: '25%', marginBottom: '10px'}} accept=".csv" ref={ref => this.inputFile = ref} type="file" id="file" name="file"/>

              <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isCreatingList}
                >
                  {intl.formatMessage({id: 'form.form_item.button.create.text'})}
                </Button>
                <Button
                  className="button-margin--left--default"
                  type="default"
                  onClick={this.handleBack}
                >
                  {intl.formatMessage({id: 'form.form_item.button.back.text'})}
                </Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col span={15} offset={5}>
            <Alert
              message="Có thể bạn đã biết"
              description={this.renderMessage()}
              type="info"
              showIcon
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(injectIntl(ListNewForm))
import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT, DEFAULT_FORM_TAIL_LAYOUT } from 'app/constants/form'
import { Form, Input, Row, Col, Button, Select, Alert, Checkbox, List, Avatar, Progress } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'
import { injectIntl } from 'react-intl'
import moment from 'moment'
import { LONG_DATETIME_FORMAT, SHORT_DATETIME_FORMAT } from 'app/constants/datatime'

const Option = Select.Option
const FormItem = Form.Item
const TextArea = Input.TextArea

class ListNewForm extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleBack',
      'handleSubmit',
    ])
  }

  handleBack(e) {
    browserHistory.goBack()
  }

  handleSubmit(e) {
    e.preventDefault()
    const {actions,editState} = this.props
    const f = this.inputFile.files[0]
    var data = new FormData()
    data.append('file', f)
    var listId = editState.getIn(['list', 'id'])
    this.props.form.validateFields((err, values) => {
      if (!err) {
        data.append('name', values["name"])
        actions.updateList(listId, data)
      }
    })
  }

  render() {
    const {editState, sharedState, intl} = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form
    const alert = editState.get('alert')
    const isUpdatingList = editState.get('isUpdatingList')
    const list = editState.get('list')
    const uploadFiles = editState.getIn(['list', 'upload_files'])
    const data = [
      {
        title: 'Ant Design Title 1',
      },
      {
        title: 'Ant Design Title 2',
      },
      {
        title: 'Ant Design Title 3',
      },
      {
        title: 'Ant Design Title 4',
      },
    ];

    return (
      <div className="main-content-form-box">
        {alert && !alert.isEmpty() && (
          <Row className="main-content-form-box-alert-box">
            <Col span={10}>
              <AlertBox
                messages={alert.get('messages')}
                type={alert.get('type')}
              />
            </Col>
          </Row>
        )}
        <Row>
          <Col span={20}>
            {list && !list.isEmpty() && (
            <Form onSubmit={this.handleSubmit} layout="horizontal">
              <FormItem
                label={intl.formatMessage({id: 'attrs.name.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: intl.formatMessage(
                      {id: 'attrs.name.errors.required'},
                    ),
                  }],
                  initialValue: list.get('name')
                })(<Input />)}
              </FormItem>

              <input style={{marginLeft: '25%'}} accept=".csv" ref={ref => this.inputFile = ref} type="file" id="file" name="file"/>

              <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isUpdatingList}
                >
                  {intl.formatMessage({id: 'form.form_item.button.update.text'})}
                </Button>
                <Button
                  className="button-margin--left--default"
                  type="default"
                  onClick={this.handleBack}
                >
                  {intl.formatMessage({id: 'form.form_item.button.back.text'})}
                </Button>
              </FormItem>
            </Form>)}
          </Col>
        </Row>
        {
          uploadFiles && (
            <List
              itemLayout="horizontal"
              dataSource={uploadFiles.toJS()}
              renderItem={item => (
                <List.Item actions={[<a href={item.public_url}>download</a>]}>
                  <List.Item.Meta
                    avatar={ <Progress type="circle" width={30} percent={100} />}
                    title={item.original_filename}
                    description={`Ngày: ${moment(item.created_at).format(SHORT_DATETIME_FORMAT)} Bởi: TungLD Số lượng: 2000`}
                  />
                </List.Item>
              )}
            />
          ) 
        }
      </div>
    );
  }
}

export default Form.create()(injectIntl(ListNewForm))
import React from 'react'
import _ from 'lodash'
import { Map } from 'immutable'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT, DEFAULT_FORM_TAIL_LAYOUT } from 'app/constants/form'
import { CODE_DELIMITER } from 'app/constants/cascader'
import { Form, Input, Row, Col, Button, Select, Alert, Cascader, Checkbox, Icon } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'

const Option = Select.Option
const FormItem = Form.Item
let uuid = 0;

class CatalogNewForm extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleBack',
      'handleSubmit',
      'formatFormData',
    ])
  }

  handleBack(e) {
    browserHistory.goBack()
  }

  handleSubmit(e) {
    e.preventDefault()
    const {actions} = this.props

    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = this.formatFormData(values)
        actions.createCatalog({record: params})
      }
    })
  }

  formatFormData(values) {
    let params = values
    const product = params.product

    if(product && product.length == 2) {
      params.product_type = product[0]
      params.product_id = product[1].split(CODE_DELIMITER)[0]
      params.product_code = product[1].split(CODE_DELIMITER)[1]
    }

    return params
  }

  getProductCascaderOptions() {
    const {newState, sharedState} = this.props
    const courses = sharedState.get('courses').map(course => (
      Map({
        value: `${course.get('id')}`,
        label: `${course.get('code').toLowerCase()} - ${course.get('price')} - ${course.get('name').toLowerCase()}`
      })
    ))

    return [
      {
        value: 'Course',
        label: 'Course',
        children: courses.toJS(),
      }
    ]
  }

  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  render() {

    const {newState, sharedState} = this.props
    const {getFieldDecorator, getFieldValue} = this.props.form
    const alert = newState.get('alert')
    const isCreatingCatalog = newState.get('isCreatingCatalog')
    const productCascaderOptions = this.getProductCascaderOptions()

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...DEFAULT_FORM_ITEM_LAYOUT}
          label={'Course'}
          required={false}
          key={k}
        >
        <Row>
          {getFieldDecorator(`courses.${k}.id`)(
            <Cascader
              options={productCascaderOptions}
              placeholder="Please select course"
              showSearch
              style={{ width: '60%', marginRight: 8 }}
            />
          )}

          {getFieldDecorator(`courses.${k}.price`)(
            <Input style={{ width: '20%', marginRight: 8}}/>)
          }

          {
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          }
          </Row>
        </FormItem>
      );
    });
    
    return (
      <div className="main-content-form-box">
        {alert && !alert.isEmpty() && (
          <Row className="main-content-form-box-alert-box">
            <Col span={14}>
              <AlertBox
                messages={alert.get('messages')}
                type={alert.get('type')}
              />
            </Col>
          </Row>
        )}
        <Row>
          <Col span={14}>
            <Form onSubmit={this.handleSubmit}>
              

              <FormItem label="Name" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Name is required!' }],
                })(<Input style={{ width: '60%' }}/>)}
              </FormItem>

              <FormItem label="Code" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('code', {
                  rules: [{ required: true, message: 'Code is required!' }],
                })(<Input style={{ width: '60%' }}/>)}
              </FormItem>

              <FormItem label="Banner" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('banner', {
                })(<Input style={{ width: '60%' }}/>)}
              </FormItem>

              <FormItem label="Banner Mobile" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('banner_mobile', {
                })(<Input style={{ width: '60%' }}/>)}
              </FormItem>

              <FormItem label="Direct link" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('direct_link', {
                })(<Input style={{ width: '60%' }}/>)}
              </FormItem>

              {formItems}

              <FormItem label="Add Course" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('course', {
                  rules: [{ required: false, message: 'Course is required!' }],
                })(
                  <Button type="dashed" onClick={this.add}>
                    <Icon type="plus" />
                  </Button>
                )}
              </FormItem>

              <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                <Button type="primary" htmlType="submit" loading={isCreatingCatalog}>
                  Create
                </Button>
                <Button type="default" className="button-margin--left--default" onClick={this.handleBack}>
                  Back
                </Button>
              </FormItem>

            </Form>
          </Col>
        </Row>
        
      </div>
    )
  }
}

export default Form.create()(CatalogNewForm)
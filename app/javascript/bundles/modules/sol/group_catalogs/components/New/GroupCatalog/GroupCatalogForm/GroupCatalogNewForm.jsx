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

class GroupCatalogNewForm extends React.Component {
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
        actions.createGroup({record: params})
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
    const catalogs = sharedState.get('catalogs').map(catalog => (
      Map({
        value: `${catalog.get('id')}`,
        label: `${catalog.get('code').toLowerCase()} - ${catalog.get('name').toLowerCase()}`
      })
    ))

    return [
      {
        value: 'Catalog',
        label: 'Catalog',
        children: catalogs.toJS(),
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
    const isCreatingGroupCatalog = newState.get('isCreatingGroupCatalog')
    const productCascaderOptions = this.getProductCascaderOptions()

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...DEFAULT_FORM_ITEM_LAYOUT}
          label={'Catalog'}
          required={false}
          key={k}
        >
        <Row>
          {getFieldDecorator(`catalogs.${k}.id`)(
            <Cascader
              options={productCascaderOptions}
              placeholder="Please select catalog"
              showSearch
              style={{ width: '60%', marginRight: 8 }}
            />
          )}

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

              {formItems}

              <FormItem label="Add Catalog" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('catalog', {
                  rules: [{ required: false, message: 'Catalog is required!' }],
                })(
                  <Button type="dashed" onClick={this.add}>
                    <Icon type="plus" />
                  </Button>
                )}
              </FormItem>

              <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                <Button type="primary" htmlType="submit" loading={isCreatingGroupCatalog}>
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

export default Form.create()(GroupCatalogNewForm)
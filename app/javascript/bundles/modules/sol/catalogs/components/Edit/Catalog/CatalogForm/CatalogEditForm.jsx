import React from 'react'
import _ from 'lodash'
import { Map } from 'immutable'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT, DEFAULT_FORM_TAIL_LAYOUT } from 'app/constants/form'
import { CODE_DELIMITER } from 'app/constants/cascader'
import { Form, Input, Row, Col, Button, Select, Alert, Cascader, Spin, Icon } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'

const FormItem = Form.Item
let uuid = 0;

class CatalogEditForm extends React.Component {
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
    const {actions, editState} = this.props
    const catalog = editState.get('catalog')

    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = this.formatFormData(values)
        actions.updateCatalog(catalog.get('id'), {record: params})
      }
    })
  }

  formatFormData(values) {
    let params = values
    var old_courses = params.old_courses ? params.old_courses : []
    var courses = params.courses ? params.courses : [] 
    params.courses = courses.concat(old_courses)

    return params
  }

  getProductCascaderOptions() {
    const {editState, sharedState} = this.props
    const courses = sharedState.get('courses').map(course => (
      Map({
        value: `${course.get('id')}`,
        label: `${course.get('code')} - ${course.get('price')} - ${course.get('name')}`
      })
    ))

    return [
      {
        value: 'Course',
        label: 'Course',
        children: courses.toJS(),
      },
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
    
    const {editState, sharedState} = this.props
    const {getFieldDecorator, getFieldValue} = this.props.form
    const alert = editState.get('alert')
    const catalog = editState.get('catalog')
    const isUpdatingCatalog = editState.get('isUpdatingCatalog')
    const isFetchingCatalog = editState.get('isFetchingCatalog')
    const productCascaderOptions = this.getProductCascaderOptions()
    var oldItems = []
    if (catalog) {
      oldItems = catalog.get("catalog_courses").map((cc, index) => {
        return (
          <FormItem
            {...DEFAULT_FORM_ITEM_LAYOUT}
            label={'Course'}
            required={false}
            key={index}
          >
          <Row>
          {getFieldDecorator(`old_courses.${index}.${'id'}`,{
            initialValue: ['Course', `${cc.get('course').get('id')}`]
          })(
            <Cascader
              options={productCascaderOptions}
              placeholder="Please select course"
              showSearch
              style={{ width: '60%', marginRight: 8 }}
            />
          )}

          {getFieldDecorator(`old_courses.${index}.${'new_price'}`, {
            initialValue: `${cc.get('new_price')}`
          })(
            <Input style={{ width: '20%', marginRight: 8}}/>)
          }

          {
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.remove(index)}
            />
          }
          </Row>

          </FormItem>
        );
      });
    }

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
            {getFieldDecorator(`courses.${k}.${'id'}`)(   
              <Cascader
                options={productCascaderOptions}
                placeholder="Please select course"
                showSearch
                style={{ width: '60%', marginRight: 8 }}
              />
            )}

            {getFieldDecorator(`courses.${k}.${'new_price'}`)(
              <Input style={{ width: '20%', marginRight: 8}}/>)
            }

            {
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
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

        {isFetchingCatalog && (
          <div className="main-content-form-box-loading-box">
            <Spin />
          </div>
        )}

        <Row>
          <Col span={14}>
            {catalog && !catalog.isEmpty() && (
              <Form onSubmit={this.handleSubmit} layout="horizontal">
                <FormItem label="Name" {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Name is required!' }],
                    initialValue: [catalog.get('name')],
                  })(<Input style={{ width: '60%' }}/>)}
                </FormItem>

                <FormItem label="Code" {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('code', {
                    rules: [{ required: true, message: 'Code is required!' }],
                    initialValue: [catalog.get('code')],
                  })(<Input style={{ width: '60%' }}/>)}
                </FormItem>

                <FormItem label="Banner" {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('banner', {
                    initialValue: [catalog.get('banner')],
                  })(<Input style={{ width: '60%' }}/>)}
                </FormItem>

                <FormItem label="Banner Mobile" {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('banner_mobile', {
                    initialValue: [catalog.get('banner_mobile')],
                  })(<Input style={{ width: '60%' }}/>)}
                </FormItem>

                <FormItem label="Direct link" {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('direct_link', {
                    initialValue: [catalog.get('direct_link')],
                  })(<Input style={{ width: '60%' }}/>)}
                </FormItem>

                {oldItems}
                {formItems}

              <FormItem label="Add Course" {...DEFAULT_FORM_ITEM_LAYOUT}>
                  <Button type="dashed" onClick={this.add}>
                    <Icon type="plus" />
                  </Button>
              </FormItem>

              <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                <Button type="primary" htmlType="submit" loading={isUpdatingCatalog}>
                  Save
                </Button>
                <Button type="default" className="button-margin--left--default" onClick={this.handleBack}>
                  Back
                </Button>
              </FormItem>

              </Form>
            )}
          </Col>
        </Row>
      </div>
    )
  }
}

export default Form.create()(CatalogEditForm)
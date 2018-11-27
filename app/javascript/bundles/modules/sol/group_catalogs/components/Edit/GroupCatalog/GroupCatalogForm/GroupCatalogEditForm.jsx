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

class GroupCatalogEditForm extends React.Component {
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
    const groupCatalog = editState.get('groupCatalog')

    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = this.formatFormData(values)
        actions.updateGroupCatalog(groupCatalog.get('id'), {record: params})
      }
    })
  }

  formatFormData(values) {
    let params = values
    var old_catalogs = params.old_catalogs ? params.old_catalogs : []
    var catalogs = params.catalogs ? params.catalogs : [] 
    params.catalogs = catalogs.concat(old_catalogs)

    return params
  }

  getProductCascaderOptions() {
    const {editState, sharedState} = this.props
    const catalogs = sharedState.get('catalogs').map(catalog => (
      Map({
        value: `${catalog.get('id')}`,
        label: `${catalog.get('code')} - ${catalog.get('name')}`
      })
    ))

    return [
      {
        value: 'Catalog',
        label: 'Catalog',
        children: catalogs.toJS(),
      },
    ]
  }

  remove = (k) => {
    const { actions, form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length > 0) {
      // can use data-binding to set
      form.setFieldsValue({
        keys: keys.filter(key => key !== k),
      });
    } else {
      actions.deleteCatalog(k)
    }
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
    const groupCatalog = editState.get('groupCatalog')
    const isUpdatingGroupCatalog = editState.get('isUpdatingGroupCatalog')
    const isFetchingGroupCatalog = editState.get('isFetchingGroupCatalog')
    const productCascaderOptions = this.getProductCascaderOptions()
    var oldItems = []
    if (groupCatalog) {
      oldItems = groupCatalog.get("group_catalogs").map((cc, index) => {
        return (
          <FormItem
            {...DEFAULT_FORM_ITEM_LAYOUT}
            label={'Catalog'}
            required={false}
            key={index}
          >
          <Row>
          {getFieldDecorator(`old_catalogs.${index}.${'id'}`,{
            initialValue: ['Catalog', `${cc.get('catalog').get('id')}`]
          })(
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
          label={'Catalog'}
          required={false}
          key={k}
        >
          <Row>
            {getFieldDecorator(`catalogs.${k}.${'id'}`)(
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

        {isFetchingGroupCatalog && (
          <div className="main-content-form-box-loading-box">
            <Spin />
          </div>
        )}

        <Row>
          <Col span={14}>
            {groupCatalog && !groupCatalog.isEmpty() && (
              <Form onSubmit={this.handleSubmit} layout="horizontal">
                <FormItem label="Name" {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Name is required!' }],
                    initialValue: [groupCatalog.get('name')],
                  })(<Input style={{ width: '60%' }}/>)}
                </FormItem>

                <FormItem label="Code" {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('code', {
                    rules: [{ required: true, message: 'Code is required!' }],
                    initialValue: [groupCatalog.get('code')],
                  })(<Input style={{ width: '60%' }}/>)}
                </FormItem>

                {oldItems}
                {formItems}

              <FormItem label="Add Catalog" {...DEFAULT_FORM_ITEM_LAYOUT}>
                  <Button type="dashed" onClick={this.add}>
                    <Icon type="plus" />
                  </Button>
              </FormItem>

              <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                <Button type="primary" htmlType="submit" loading={isUpdatingGroupCatalog}>
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

export default Form.create()(GroupCatalogEditForm)
import React from 'react'
import _ from 'lodash'
import { Map } from 'immutable'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT, DEFAULT_FORM_TAIL_LAYOUT } from 'app/constants/form'
import { CODE_DELIMITER } from 'app/constants/cascader'
import { Form, Input, Row, Col, Button, Select, Alert, Cascader, Spin, Tabs, Table } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'
import { SHORT_DATETIME_FORMAT } from 'app/constants/datatime'
import moment from 'moment'

const Option = Select.Option
const FormItem = Form.Item
const { TabPane } = Tabs

class PrizeEditForm extends React.Component {
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
    const prize = editState.get('prize')

    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = this.formatFormData(values)
        actions.updatePrize(prize.get('id'), {record: params})
      }
    })
  }

  formatFormData(values) {
    let params = values
    const product = params.product

    if(product && product.length == 2) {
      params.product_type = product[0]
      params.product_id = product[1].split(CODE_DELIMITER)[0]
    }

    return params
  }

  getProductCascaderOptions() {
    const {newState, sharedState} = this.props
    const courses = sharedState.get('courses').map(course => (
      Map({
        value: `${course.get('id')}`,
        label: `${course.get('code')} - ${course.get('name')}`
      })
    ))
    const combos = sharedState.get('combos').map(combo => (
      Map({
        value: `${combo.get('id')}`,
        label: `${combo.get('code')} - ${combo.get('name')}`
      })
    ))

    return [
      {
        value: 'Course',
        label: 'Course',
        children: courses.toJS(),
      },
      {
        value: 'Combo',
        label: 'Combo',
        children: combos.toJS(),
      }
    ]
  }

  render() {

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
    }, {
      title: 'Email',
      dataIndex: 'email',
    }, {
      title: 'Code',
      dataIndex: 'code',
    } , {
      title: 'Phone',
      dataIndex: 'phone',
    }, {
      title: 'Date',
      dataIndex: 'created_at',
      render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : ''
    }];

    
    
    const {editState, sharedState} = this.props
    const {getFieldDecorator} = this.props.form
    const alert = editState.get('alert')
    const prize = editState.get('prize')
    const isUpdatingPrize = editState.get('isUpdatingPrize')
    const isFetchingPrize = editState.get('isFetchingPrize')

    const data = editState.get('prize_codes').toJS()

    return (
      <div className="main-content-form-box">
        <Row>
          <Col span={24}>
            <Tabs defaultActiveKey="1" size="large">
              <TabPane tab="Summary" key="1">
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

                {isFetchingPrize && (
                  <div className="main-content-form-box-loading-box">
                    <Spin />
                  </div>
                )}

                <Row>
                  <Col span={10}>
                    {prize && !prize.isEmpty() && (
                    <Form onSubmit={this.handleSubmit} layout="horizontal">

                      <FormItem label="Name" {...DEFAULT_FORM_ITEM_LAYOUT}>
                        {getFieldDecorator('name', {
                          rules: [{ required: true, message: 'Name is required!' }],
                          initialValue: [prize.get('name')],
                        })(<Input />)}
                      </FormItem>

                      <FormItem label="Description" {...DEFAULT_FORM_ITEM_LAYOUT}>
                        {getFieldDecorator('desc', {
                          rules: [{ required: true, message: 'Description is required!' }],
                          initialValue: [prize.get('desc')],
                        })(<Input />)}
                      </FormItem>

                      <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                        <Button type="primary" htmlType="submit" loading={isUpdatingPrize}>
                          Update
                        </Button>
                        <Button type="default" className="button-margin--left--default" onClick={this.handleBack}>
                          Back
                        </Button>
                      </FormItem>
                    </Form>
                    )} 
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Code" key="2">
                 <Table 
                    columns={columns} dataSource={data} size="big" 
                    rowKey="id"
                  />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Form.create()(PrizeEditForm)
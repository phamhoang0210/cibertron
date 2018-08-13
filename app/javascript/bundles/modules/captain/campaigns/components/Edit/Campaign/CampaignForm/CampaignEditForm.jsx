import React from 'react'
import {Table, Form, Row, Col, Select, DatePicker, Button, Input, Icon, Checkbox, Radio} from 'antd'
import { formItemLayout, DEFAULT_TITLE_LAYOUT, DEFAULT_SUBTITLE_LAYOUT, FORM_SELECT_COURSES, LIST_SELECTED_COURSES } from 'app/constants/form'
import { formDate } from 'app/constants/form'
import { injectIntl } from 'react-intl'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Search = Input.Search
const { RangePicker } = DatePicker;

class CampaignEditForm extends React.Component {
  constructor(props) {
    super(props)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  onChange = (e) => {
    console.log('checked = ${e.target.checked}');
  }

  render(){
    const {intl,editState,sharedState} = this.props
    const left_data = editState['left_records']
    const right_data = editState['right_records']
    const { getFieldDecorator } = this.props.form
    const left_columns = [
      {
        title: 'Select',
        key: 'select',
        render: (text, record) => (
          <Checkbox onChange={this.onChange}></Checkbox>
        )
      },
      {
        title: 'Mã khóa',
        dataIndex: 'course_code',
        key: 'course_code',
      },
      {
        title: 'Tên khóa',
        dataIndex: 'course_name',
        key: 'course_name',
      },
      {
        title: 'Giá gốc',
        dataIndex: 'price',
        key: 'price',
      }
    ];
    const right_columns = [
      {
        title: 'Khóa',
        dataIndex: 'course_code',
        key: 'course_code',
      },
      {
        title: 'Giá gốc',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'Giá giảm',
        dataIndex: 'promotion_price',
        key: 'promotion_price',
        render: (text, record) => (
          <Input placeholder="" />
        )
      },
      {
        title: '% giảm',
        dataIndex: '10',
        key: '10',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <div>
            <Button style={{marginRight:10}} type="primary">Sửa</Button>
            <Button type="danger">Xóa</Button>
          </div>
        )
      }
    ];
    return(
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <FormItem {...DEFAULT_TITLE_LAYOUT} style={{marginLeft:15, fontWeight:'bold'}} label={intl.formatMessage({id: 'edit.campaign_info.label'})} ></FormItem>
        </Row>
        <Row>
          <FormItem {...formItemLayout} label={intl.formatMessage({id: 'attrs.campaign.label'})} >
            {getFieldDecorator('nameCampaign', {
              rules: [{ required: true,message: intl.formatMessage({id: 'attrs.campaign.required'},) }],
            })(
              <Input placeholder={intl.formatMessage({id: 'attrs.campaign.placeholder.select.none'})} />
            )}
          </FormItem>
        </Row>

        <Row>
          <Col span={8}>
            <FormItem {...formDate} label={intl.formatMessage({id: 'attrs.time_start.label'})} >
              {getFieldDecorator('startTime', {
                rules: [{ required: true,message: intl.formatMessage({id: 'attrs.time_start.required'},) }],
              })(
                <DatePicker style={{width: '100%'}} placeholder={intl.formatMessage({id: 'attrs.time_start.placeholder.select.none'})} showTime placeholder="Select Time" format="YYYY-MM-DD HH:mm:ss"/>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formDate} label={intl.formatMessage({id: 'attrs.time_end.label'})} >
              {getFieldDecorator('endTime', {
                rules: [{ required: true,message: intl.formatMessage({id: 'attrs.time_end.required'},) }],
              })(
                <DatePicker style={{width: '100%'}} placeholder={intl.formatMessage({id: 'attrs.time_end.placeholder.select.none'})} showTime placeholder="Select Time" format="YYYY-MM-DD HH:mm:ss"/>
              )}
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <FormItem {...formDate} label={intl.formatMessage({id: 'attrs.status.label'})} >
              {getFieldDecorator('status', {
                rules: [{ required: true,message: intl.formatMessage({id: 'attrs.status.required'},) }],
              })(
                <RadioGroup>
                  <Radio value={1}>On</Radio>
                  <br />
                  <Radio value={2}>Off</Radio>
                </RadioGroup>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formDate} label={intl.formatMessage({id: 'attrs.show.label'})} >
              {getFieldDecorator('show', {
                rules: [{ required: true,message: intl.formatMessage({id: 'attrs.show.required'},) }],
              })(
                <RadioGroup>
                  <Radio value={1}>On</Radio>
                  <br />
                  <Radio value={2}>Off</Radio>
                </RadioGroup>
              )}
            </FormItem>
          </Col>
        </Row>

        <Row>
          <FormItem {...formItemLayout} label={intl.formatMessage({id: 'attrs.link_tracking.label'})} >
            {getFieldDecorator('linkTracking', {
              rules: [{ required: true,message: intl.formatMessage({id: 'attrs.link_tracking.required'},) }],
            })(
              <Input placeholder={intl.formatMessage({id: 'attrs.link_tracking.placeholder.select.none'})} />
            )}
          </FormItem>
        </Row>

        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button style={{marginRight:10}}>Hủy bỏ</Button>
            <Button type="primary" htmlType="submit" style={{marginRight:10}}>Update</Button>
          </Col>
        </Row>

        <br />
        <hr />

        <Row>
          <FormItem {...DEFAULT_TITLE_LAYOUT} style={{marginLeft:15, fontWeight:'bold'}} label={intl.formatMessage({id: 'edit.manage_deal.label'})} ></FormItem>
        </Row>

        <Row>
          <Col span={12}>
            <FormItem {...DEFAULT_SUBTITLE_LAYOUT} style={{marginLeft:15}} label={intl.formatMessage({id: 'edit.select_courses.label'})} ></FormItem>
            <Col span={24}>
              <FormItem label={intl.formatMessage({id: 'edit.search_courses_by.label'})}
                {...FORM_SELECT_COURSES}>
                  <Select placeholder={intl.formatMessage({id: 'edit.search_courses_by.placeholder.select.none'})} >
                    <Option value="category">Category</Option>
                    <Option value="teacher">Thầy</Option>
                    <Option value="price">Giá bán</Option>
                    <Option value="course_code">Mã khóa</Option>
                  </Select>
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label={intl.formatMessage({id: 'edit.condition.label'})}
                {...FORM_SELECT_COURSES}>
                  <Search
                    enterButton
                  />
              </FormItem>
            </Col>
            <Col span={23}>
              <Table
                className="components-table-demo-nested"
                columns={left_columns}
                dataSource={left_data}
                bordered
              />
            </Col>
          </Col>

          <Col span={12}>
            <FormItem {...DEFAULT_SUBTITLE_LAYOUT} style={{marginLeft:15}} label={intl.formatMessage({id: 'edit.list_selected_courses.label'})} ></FormItem>
            <Col span={24}>
              <Table
                className="components-table-demo-nested"
                columns={right_columns}
                dataSource={right_data}
                bordered
              />
            </Col>
          </Col>
        </Row>

        <br />

        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button style={{marginRight:10}}>Hủy bỏ</Button>
            <Button type="primary" htmlType="submit" style={{marginRight:10}}>Lưu lại</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(injectIntl(CampaignEditForm))
import React from 'react'
import { browserHistory } from 'react-router'
import {Table, Form, Row, Col, Select, Button, Input, Checkbox, Radio} from 'antd'
import { DEFAULT_TITLE_LAYOUT, DEFAULT_SUBTITLE_LAYOUT, FORM_SELECT_COURSES, LIST_SELECTED_COURSES } from 'app/constants/form'
import { injectIntl } from 'react-intl'

const FormItem = Form.Item;
const Search = Input.Search

class DetailCampaignEditForm extends React.Component {
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

  handleBack(e) {
    browserHistory.goBack()
  }

  render(){
    const { intl, editState, sharedState } = this.props
    const left_data = editState.get('left_records')
    const right_data = editState.get('right_records')

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
                dataSource={left_data.toJS()}
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
                dataSource={right_data.toJS()}
                bordered
              />
            </Col>
          </Col>
        </Row>

        <br />

        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button onClick={this.handleBack} style={{marginRight:10}}>Hủy bỏ</Button>
            <Button type="primary" htmlType="submit" style={{marginRight:10}}>Lưu lại</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(injectIntl(DetailCampaignEditForm))
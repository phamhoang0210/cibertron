import React from 'react'
import { browserHistory } from 'react-router'
import {Table, Form, Row, Col, Select, Button, Input, Checkbox, Radio} from 'antd'
import { DEFAULT_TITLE_LAYOUT, DEFAULT_SUBTITLE_LAYOUT, FORM_SELECT_COURSES, LIST_SELECTED_COURSES } from 'app/constants/form'
import { injectIntl } from 'react-intl'

const FormItem = Form.Item;
const Search = Input.Search
const Option = Select.Option

class DetailCampaignEditForm extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleChange',
      'handleSubmit',
    ])
  }

  handleDelete(record) {
    const { editState, actions } = this.props
    actions.deleteCourseData(record)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleChange(e) {
    const { editState, actions } = this.props

    actions.updateViewDealCourse(e)
  }

  handleBack(e) {
    browserHistory.goBack()
  }

  render(){
    const { intl, editState, actions } = this.props
    const deal = editState.get('deal').toJS()
    const dealColumns = editState.get('dealColumns').toJS()
    const courseData = editState.get('courseData').toJS()
    const { getFieldDecorator } = this.props.form
    const findCoursesBy = editState.toJS().findCoursesBy
    const courseDataColumns = [{
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
          <Button onClick = {this.handleDelete.bind(this, record)} type="danger">Xóa</Button>
        </div>
      )
    }]
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        for (var i = 0; i < selectedRows.length; i++) {
          if (!courseData.keys.includes(selectedRows[i]['key'])) {
            actions.addCoursesData(selectedRows[i])
          }
          else {
            var removeItems = courseData.records.filter(function(item){ return !selectedRowKeys.includes(item.key) })
            for (var j = 0; j < removeItems.length; j++) {
              actions.deleteCourseData(removeItems[j]);
            }
          }
        }
      },
    };

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
                  <Select onChange={this.handleChange} placeholder={intl.formatMessage({id: 'edit.search_courses_by.placeholder.select.none'})} >
                    {findCoursesBy.map(item => (
                      <Option value={item.value} key={item.id} >{item.title}</Option>
                    ))}
                  </Select>
              </FormItem>
            </Col>
            {this.renderViewDealCourse()}
            <Col span={23}>
              <Table
                pagination={{ pageSize: 3 }}
                rowSelection={rowSelection}
                className="components-table-demo-nested"
                columns={dealColumns}
                dataSource={deal}
                bordered
              />
            </Col>
          </Col>
          <Col span={12}>
            <FormItem {...DEFAULT_SUBTITLE_LAYOUT} style={{marginLeft:15}} label={intl.formatMessage({id: 'edit.list_selected_courses.label'})} ></FormItem>
            <Col span={24}>
              <Table
                pagination={{ pageSize: 3 }}
                className="components-table-demo-nested"
                columns={courseDataColumns}
                dataSource={courseData.records}
                bordered
              />
            </Col>
          </Col>
        </Row>

        <br />

        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button onClick={this.handleBack} style={{marginRight:10}}>Hủy bỏ</Button>
            <Button type="primary" loading={editState.get('isUpdatingCampaign')} htmlType="submit" style={{marginRight:10}}>Lưu lại</Button>
          </Col>
        </Row>
      </Form>
    )
  }

  renderViewDealCourse() {
    const { editState, intl } = this.props
    
    if (editState.get('viewDealCourseComponent')) {
      if (['category', 'teacher'].includes(editState.get('viewDealCourseComponent'))) {
        return (
          <Col span={24}>
            <FormItem label={intl.formatMessage({id: 'edit.condition.label'})}
              {...FORM_SELECT_COURSES}>
                <Select >
                  <Option value='Ahihi'>KhangPT</Option>
                </Select>
            </FormItem>
          </Col>
        )
      } else {
        return (
          <Col span={24}>
            <FormItem label={intl.formatMessage({id: 'edit.condition.label'})}
              {...FORM_SELECT_COURSES}>
                <Search
                  enterButton
                />
            </FormItem>
          </Col>
        )
      }
    }
  }
}

export default Form.create()(injectIntl(DetailCampaignEditForm))
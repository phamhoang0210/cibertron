import React from 'react'
import { Form, Row, Col, Input, Button, Icon } from 'antd'
import { getFilterParams } from 'helpers/applicationHelper'

const FormItem = Form.Item

class CampaignFiltersBox extends React.Component {
  constructor(props) {
    super(props)

    this.formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 },
    }
  }

  render() {
    const {indexState, form} = this.props
    const { getFieldDecorator } = form
    return (
      <Form
        className="box box-with-boder"
        onSubmit={this.handleSearch}
      >
        <Row gutter={40}>
          <Col span={8}>
            <FormItem {...this.formItemLayout} label="Node">
              {getFieldDecorator('node')(
                <Input placeholder="Please select a node"/>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">Filter</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(CampaignFiltersBox)
import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { Form, Input, Row, Col, Button, Select, Alert, Upload, Icon} from 'antd'
const FormItem = Form.Item;
import AlertBox from 'partials/components/Alert/AlertBox'


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

class TargetNewForm extends React.Component {
  constructor(props) {
    super(props)

    this.formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    }

    this.buttonItemLayout = {
      wrapperCol: { span: 20, offset: 4 },
    }

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
    const {actions} = this.props
    var file = this.inputFile.files[0]

    this.props.form.validateFields((err, values) => {
      if (!err) {
        var data = new FormData()
        data.append('name', values.name)
        data.append('code', values.code)
        data.append('file', file)
        actions.createTarget(data)
      }
    })
  }

  render() {
    const {newState, sharedState} = this.props
    const { getFieldDecorator } = this.props.form
    const alert = newState.get('alert')
    const isCreatingTarget = newState.get('isCreatingTarget')
    
    return (
      <div style={{marginTop: '10px'}, {marginBottom: '80px'}}>

        {alert && !alert.isEmpty() && (
          <Row style={{marginBottom: '8px'}}>
            <Col >
              <AlertBox
                messages={alert.get('messages')}
                type={alert.get('type')}
              />
            </Col>
          </Row>
        )}

        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="Name"
            hasFeedback >
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: 'Please enter Target name!' },
              ],
            })
            (<Input placeholder="Target name" id="name" />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Code"
            hasFeedback >
            {getFieldDecorator('code', {
              rules: [
                { required: true, message: 'Please enter Target name!' },
              ],
            })
            (<Input placeholder="Target ncode" id="code" />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="File"
            hasFeedback >
            {getFieldDecorator('file', {
              rules: [
                { required: true, message: 'Please select file!' },
              ],
            })
            ( <div >
                <input accept=".csv" ref={ref => this.inputFile = ref} type="file" id="file" name= "file"/>
              </div>)}
          </FormItem>
          
          
          <FormItem style={{marginTop: '10px'}} wrapperCol={{ span: 12, offset: 5 }}>
            <Button type="primary" htmlType="submit">Submit</Button>
          </FormItem>

        </Form>
      </div>
    );
  }
}

export default Form.create()(TargetNewForm)
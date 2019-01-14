import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/styles'
import { Form, Row, Col, Input, Button, Select, DatePicker } from 'antd'
import { FILTER_FORM_ITEM_LAYOUT } from 'app/constants/form'
import { selectFilterOption } from 'helpers/antdHelper'
import { injectIntl } from 'react-intl'

const FormItem = Form.Item
const Option = Select.Option

class LogicHome extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      is_online_payment: false,
      account_id: null,
    }

    _.bindAll(this, [
      'renderLogicHomeComponent',
      'renderPixelsComponent',
      'handleChangeAdAccount',
      'handleChangeMethod',
      'handleGetCodeLogic',
      ])
  }

  componentDidMount() {
    const {actions, sharedState} = this.props
    actions.fetchAdAccounts()
  }

  renderLogicHomeComponent() {
    const {getCodeState, sharedState, isNew } = this.props
    const landingPageCodes = (sharedState.getIn(['landingPageCodes', 'landing_page_codes'])) ? sharedState.getIn(['landingPageCodes', 'landing_page_codes']) : getCodeState.get('landingPageCodes')
    const homeLogics = landingPageCodes.get(isNew ? 'new_home_logics' : 'home_logics')
    const logicItemKeys = sharedState.getIn(['landingPageItemKeys', 'home_logics'])
    return (
        <div>
          {homeLogics && !homeLogics.isEmpty() && logicItemKeys.map(key => (
            <div key={key.get('key')}>
              <h2 dangerouslySetInnerHTML={{__html: homeLogics.getIn([key.get('key'), 'title'])}}/>
              <div dangerouslySetInnerHTML={{__html: homeLogics.getIn([key.get('key'), 'description'])}}/>
              <SyntaxHighlighter language='html' style={tomorrowNightEighties}>
                {homeLogics.getIn([key.get('key'), 'code'])}
              </SyntaxHighlighter>
            </div>
          ))}
        </div>
      )
  }

  renderPixelsComponent() {
    const {sharedState, form} = this.props
    let adaccounts = sharedState.get('adaccounts')
    let isFetchingPixels = sharedState.get('isFetchingPixels')
    let isFetchingLogicHome = sharedState.get('isFetchingLogicHome')
    let pixels = sharedState.get('pixels')
    const { getFieldDecorator } = form
    return (
      <div className="box box-with-shadow box-with-border">
        <Form
          className="box-body"
          onSubmit={this.handleGetCodeLogic}
        >
          <Row gutter={40}>
          <Col span={6}>
              <FormItem 
                label="Method"
                {...FILTER_FORM_ITEM_LAYOUT}
              >
                <Select
                  showSearch
                  filterOption={selectFilterOption}
                  allowClear={true}
                  onChange={this.handleChangeMethod}
                >
                  <Option value={false} key={false}>No online payment</Option>
                  <Option value={true} key={true}>Online payment</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem 
                label="Ad account"
                {...FILTER_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('id', {
                    initialValue: null,
                  })(
                  <Select
                    showSearch
                    filterOption={selectFilterOption}
                    allowClear={true}
                    onChange={this.handleChangeAdAccount}
                    disabled={!this.state.is_online_payment}
                  >
                    <Option value={null} key={null}>No Account</Option>
                    {adaccounts.toJS().map(account => (
                      <Option value={`${account.id}`} key={account.id}>
                        {account.name}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem 
                label="Pixels"
                {...FILTER_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('pixel_ids', {
                  rules: [{
                    required: this.state.account_id,
                    type: 'array',
                  }],
                })(
                  <Select
                    showSearch
                    filterOption={selectFilterOption}
                    allowClear={true}
                    mode="multiple"
                    disabled={isFetchingPixels || !this.state.account_id}
                  >
                    {pixels.toJS().map(pixel => (
                      <Option value={`${pixel.id}`} key={pixel.id}>
                        {pixel.name}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={40}>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={isFetchingLogicHome || isFetchingPixels}
              >
                Get code
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      )
  }
  handleChangeMethod(is_online_payment) {
    const {actions} = this.props          
    this.setState({
      is_online_payment: is_online_payment,
      account_id: null,
    })
    this.props.form.setFields({
      id: {
        value: null,
      },
      pixel_ids: {
        value: [],
      },
    });
    if (is_online_payment) {
      actions.fetchAdAccounts()
    }
  }

  handleChangeAdAccount(account_id) {
    const {actions} = this.props          
    this.setState({
      account_id: account_id,
    })
    this.props.form.setFields({
      pixel_ids: {
        value: [],
      },
    });
    if (account_id) {
      actions.fetchPixels(account_id)
    }
  }

  handleGetCodeLogic(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {actions, params} = this.props
        let input = {}
        input['pixel_ids'] = values['pixel_ids']
        input['id'] = params['id']
        actions.fetchLogicHome(input)
      }
    })
  }

  render() {
    const { sharedState } = this.props
    let isFetchingLogicHome = sharedState.get('isFetchingLogicHome')
    return (
      <div>
        {this.renderPixelsComponent()}
        {this.renderLogicHomeComponent()}
      </div>
    )
  }
}

export default Form.create()(injectIntl(LogicHome))
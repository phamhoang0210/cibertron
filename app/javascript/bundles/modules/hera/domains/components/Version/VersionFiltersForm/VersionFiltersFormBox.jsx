import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT, FILTER_FORM_ITEM_LAYOUT } from 'app/constants/form'
import { Form, Input, Row, Col, Button, Select, Spin, version } from 'antd'
const { Option } = Select
import AlertBox from 'partials/components/Alert/AlertBox'
import { injectIntl } from 'react-intl'

const FormItem = Form.Item

class VersionFiltersFormBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleFilter',
    ])
  }
  
  handleFilter(e) {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      if(!err) {
        const {actions, versionState} = this.props
        let domainParams = getFilterParams(versionState.get('domainFilters'))
        //actions.fetchVersions(mergeDeep([domainParams, this.formatFormData(values)]))
      }
    })
  }

  render() {
    const {versionState, sharedState, intl} = this.props
    const {getFieldDecorator} = this.props.form
    const isFetchingDomain = versionState.get('isFetchingDomain')
    const domain = versionState.get('domain')
    const dnsServer = sharedState && sharedState.get('allPlatforms')

    return(
      <div className="main-content-form-box">
        {isFetchingDomain && (
          <div className="main-content-form-box-loading-box">
            <Spin />
          </div>
        )}

        <Row>
          <Col span={10}>
            {domain && !domain.isEmpty() && (
              <Form
                onSubmit={this.handleFilter}
                className="box-body"
              >
                <FormItem
                  label={intl.formatMessage({id: 'attrs.name.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('name', {
                    initialValue: domain.get('name'),
                  })(<Input />)}

                </FormItem>
                
                <FormItem
                  label={intl.formatMessage({id: 'attrs.platform.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('platform_id', {
                    rules: [{type: 'array'}],
                  })(
                    <Select
                      showSearch
                      filterOption={selectFilterOption}
                      placeholder="---ALL---"
                      allowClear={true}
                      mode="multiple"
                    >
                      {dnsServer && dnsServer.toJS().map(server =>(
                        <Option value={`${server.id}`} key={server.id}>
                          {server.title}
                        </Option>
                      ))}
                      <Option value={null}>No platform</Option>
                    </Select>
                  )}
                </FormItem>
              </Form>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(injectIntl(VersionFiltersFormBox))
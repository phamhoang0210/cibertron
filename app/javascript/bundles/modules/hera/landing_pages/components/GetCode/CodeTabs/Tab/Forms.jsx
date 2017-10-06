import React from 'react'
import _ from 'lodash'
import {Col, Row, Select} from 'antd'
import { getFilterParams } from 'helpers/applicationHelper'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/styles'
import 'styles/modules/hera/landing_pages'

const Option = Select.Option

class Forms extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      selectedItemKey: 'vertical__white_background',
    }

    _.bindAll(this, [
      'handleItemChange',
    ])
  }

  handleItemChange(value, label) {
    this.setState({selectedItemKey: value})
  }

  render() {
    const {getCodeState, sharedState} = this.props
    const {selectedItemKey} = this.state
    const landingPageCodes = getCodeState.get('landingPageCodes')
    const forms = landingPageCodes.get('forms')
    const itemKeys = sharedState.getIn(['landingPageItemKeys', 'forms'])
    return (
      <div>
        <Row gutter={16}>
          <Col span={12}>
            <Select
              value={selectedItemKey}
              style={{ width: '100%' }}
              onChange={this.handleItemChange}
            >
              {itemKeys.map(key => (
                <Option value={key.get('key')} key={key.get('key')}>
                  {key.get('title')}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row gutter={16} style={{marginTop: '16px'}}>
          <Col span={12}>
            {forms && !forms.isEmpty() && (
              <div>
                <h2 dangerouslySetInnerHTML={{__html: forms.getIn([selectedItemKey, 'title'])}}/>
                <div dangerouslySetInnerHTML={{__html: forms.getIn([selectedItemKey, 'description'])}}/>
                <SyntaxHighlighter language='html' style={tomorrowNightEighties}>
                  {forms.getIn([selectedItemKey, 'code'])}
                </SyntaxHighlighter>
              </div>
            )}
          </Col>
          <Col span={12}>
            {forms && !forms.isEmpty() && (
              <div className="landing_page-code-forms-preview-box">
                <h2>Preview</h2>
                <div
                  className={`landing_page-code-forms-preview-box-body ${selectedItemKey}`}
                  dangerouslySetInnerHTML={{__html: forms.getIn([selectedItemKey, 'code'])}}
                />
              </div>
            )}
          </Col>
        </Row>
      </div>
    )
  }
}

export default Forms
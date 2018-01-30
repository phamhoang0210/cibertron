import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import { Tabs, Spin, Row, Col, Collapse } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'
import { injectIntl } from 'react-intl'

const TabPane = Tabs.TabPane
const Panel = Collapse.Panel

class PagespeedInsightBox extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {getCodeState, intl} = this.props
    const landingPagePagespeedInsights = getCodeState.get('landingPagePagespeedInsights')
    const opmzScore = landingPagePagespeedInsights.getIn(['formatted_results', 'rule_groups', 'SPEED', 'score'])
    let ruleResults = []

    if(landingPagePagespeedInsights && !landingPagePagespeedInsights.isEmpty()) {
      const ruleResultsData = landingPagePagespeedInsights.getIn(['formatted_results', 'formatted_results', 'rule_results'])
      if(ruleResultsData && !ruleResultsData.isEmpty()) {
        ruleResultsData.forEach((v, k) => {
          const urlBlocks = []
          const urlBlocksData = v.get('url_blocks')
          if(urlBlocksData && !urlBlocksData.isEmpty()) {
            urlBlocksData.forEach((_v, _k) => {
              const urls = _v.get('urls')
              urlBlocks.push((
                <Panel header={(<span dangerouslySetInnerHTML={{__html: _v.get('header')}}/>)} key={_k}>
                  <ul>
                    {urls && urls.map(url => (
                      <li key={url.get('result')}>{url.get('result')}</li>
                    ))}
                  </ul>
                </Panel>
              ))
            })
          }

          ruleResults.push((
            <Panel header={(<span dangerouslySetInnerHTML={{__html: v.get('localized_rule_name')}}/>)} key={k}>
              <div dangerouslySetInnerHTML={{__html: v.get('summary')}}/>
              <Collapse bordered={false}>
                {urlBlocks}
              </Collapse>
            </Panel>
          ))
        })
      }
    }

    return (
      <div className="main-content-tabs-box">
        <Row>
          <Col span={4}>
            {opmzScore && (
              <div style={{textAlign: 'center'}}>
                <div>Điểm tối ưu</div>
                <div style={{padding: '24px', fontSize: '400%'}}>{opmzScore}</div>
              </div>
            )}
          </Col>
        </Row>
        <Collapse bordered={false}>
          {ruleResults}
        </Collapse>
      </div>
    )
  }
}

export default injectIntl(PagespeedInsightBox)
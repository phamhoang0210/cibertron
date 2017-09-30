import React from 'react'
import {Row, Col, Card, Spin} from 'antd'
import { browserHistory } from 'react-router'

class ServiceList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {dashboardState} = this.props
    const serviceInfos = dashboardState.get('serviceInfos')
    const isFetchingServiceInfos = dashboardState.get('isFetchingServiceInfos')

    return (
      <div style={{ background: '#ECECEC', padding: '16px' }}>
        <Row gutter={16}>
          {isFetchingServiceInfos && (
            <Col span={24}>
              <div style={{textAlign: 'center'}}>
                <Spin/>
              </div>
            </Col>
          )}
          {serviceInfos.map(service => {
            const handleClick = (e) => {
              window.location.href = service.get('link')
            }

            return (
              <Col span={6} style={{marginTop: '16px', cursor: 'pointer'}} key={service.get('id')}>
                <Card title={service.get('name')} bordered={false} onClick={handleClick}>
                  <p style={{height: '36px', lineHeight: '12px', overflowY: 'auto'}}>
                    {service.get('description')}
                  </p>
                </Card>
              </Col>
            )
          })}
        </Row>
      </div>
    )
  }
}

export default ServiceList
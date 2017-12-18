import React from 'react'
import TemplateNewForm from './Template/TemplateForm/TemplateNewForm'
import {injectIntl} from 'react-intl'

class NewScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions} = this.props
  }

  render() {
    const {intl} = this.props
    return (
      <div className="main-content nauh--campaigns--new box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'new.title'})}
          </h1>
        </div>
        <div className="box-body">
          <TemplateNewForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(NewScreen)
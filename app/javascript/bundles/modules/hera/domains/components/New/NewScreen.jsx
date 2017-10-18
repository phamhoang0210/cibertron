import React from 'react'
import DomainNewForm from './Domain/DomainForm/DomainNewForm'
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
      <div className="main-content hera-domains-new">
        <h1 className="main-content-title">
          {intl.formatMessage({id: 'new.title'})}
        </h1>
        <DomainNewForm {...this.props}/>
      </div>
    )
  }
}

export default injectIntl(NewScreen)
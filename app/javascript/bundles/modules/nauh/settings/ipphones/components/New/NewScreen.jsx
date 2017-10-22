import React from 'react'
import IpphoneNewForm from './Ipphone/IpphoneForm/IpphoneNewForm'
import {injectIntl} from 'react-intl'

class NewScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions} = this.props
    actions.fetchUsers({per_page: 'infinite'})
  }

  render() {
    const {intl} = this.props

    return (
      <div className="main-content nauh--settings--ipphones--new box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'new.title'})}
          </h1>
        </div>
        <div className="box-body">
          <IpphoneNewForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(NewScreen)
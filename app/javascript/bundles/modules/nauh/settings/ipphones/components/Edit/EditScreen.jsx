import React from 'react'
import IpphoneEditForm from './Ipphone/Form/IpphoneEditForm'
import {injectIntl} from 'react-intl'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchIpphone(params.id, {fields: 'provider{},category{}'})
    actions.fetchUsers({per_page: 'infinite'})  }

  render() {
    const {intl} = this.props

    return (
      <div className="main-content nauh--settings--ipphones--edit box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'edit.title'})}
          </h1>
        </div>
        <div className="box-body">
          <IpphoneEditForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(EditScreen)
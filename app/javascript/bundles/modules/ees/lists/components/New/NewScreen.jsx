import React from 'react'
import ListNewForm from './List/ListForm/ListNewForm'
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
      <div className="main-content meepo--lists--new box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'new.title'})}
          </h1>
        </div>
        <div className="box-body">
          <ListNewForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(NewScreen)
import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import CategoriesTableBox from './Category/CategoriesTable/CategoriesTableBox'
import { notification } from 'antd'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState} = this.props
    const categoryParams = getFilterParams(indexState.get('categoryFilters'))
    actions.fetchCategories(categoryParams)
  }

  componentWillReceiveProps(nextProps) {
    const alert = this.props.indexState.get('alert')
    const nextAlert = nextProps.indexState.get('alert')
    if(nextAlert && !nextAlert.equals(alert)) {
      nextAlert.get('messages').forEach(message => {
        notification[nextAlert.get('type')]({
          message: message,
        })
      })
    }
  }

  render() {
    const {indexState} = this.props
    return (
      <div className="main-content cronus--categories box">
        <div className="box-header">
          <h1 className="box-title">
            Categories
          </h1>
        </div>
        <div className="box-body">
          <CategoriesTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default IndexScreen
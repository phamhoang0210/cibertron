import React from 'react'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, browserHistory } from 'react-router'
import store from '../store/store'
import routes from '../routes/routes'

export default (props, railsContext) => {
  const appStore = store(props, railsContext)
  const history = syncHistoryWithStore(
    browserHistory,
    appStore
  )

  return (
    <Provider store={appStore}>
      <Router history={history} children={routes} />
    </Provider>
  )
}
import React from 'react'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, browserHistory } from 'react-router'
import authStore from '../store/authStore'
import routes from '../routes/routes'

export default (props, railsContext) => {
  const store = authStore(props, railsContext)
  const history = syncHistoryWithStore(
    browserHistory,
    store
  )

  return (
    <Provider store={store}>
      <Router history={history} children={routes} />
    </Provider>
  )
}

import React from 'react'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import middleware from 'redux-thunk'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, browserHistory } from 'react-router'
import dashboardStore from '../store/dashboardStore'
import routes from '../routes/routes'
import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'

export default (props, railsContext) => {
  const store = dashboardStore(props, railsContext)

  const history = syncHistoryWithStore(
    browserHistory,
    store
  )

  return (
      <LocaleProvider locale={enUS}>
        <Provider store={store}>
          <Router history={history} children={routes} />
        </Provider>
      </LocaleProvider>
    )
}

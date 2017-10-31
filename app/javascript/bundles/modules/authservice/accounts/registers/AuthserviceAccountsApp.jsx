import React from 'react'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, browserHistory } from 'react-router'
import store from '../store/store'
import routes from '../routes/routes'
import { LocaleProvider } from 'antd'
import { IntlProvider } from 'react-intl'
import { appLocale } from 'locales/modules/authservice/accounts.en'

export default (props, railsContext) => {
  const appStore = store(props, railsContext)
  const history = syncHistoryWithStore(
    browserHistory,
    appStore
  )

  return (
    <LocaleProvider locale={appLocale.antd}>
      <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
        <Provider store={appStore}>
          <Router history={history} children={routes} test={railsContext}/>
        </Provider>
      </IntlProvider>
    </LocaleProvider>
  )
}

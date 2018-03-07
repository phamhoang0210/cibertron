import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from 'app/layouts/ees/EesLayout'
import IndexContainer from '../containers/IndexContainer'
import {LOGS_URL} from '../constants/paths'
import {requireAuth} from 'helpers/auth/authHelper'

export default (
  <Route path={LOGS_URL} component={Layout} onEnter={requireAuth}>
    <IndexRoute component={IndexContainer}/>
  </Route>
)

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from 'app/layouts/nauh/NauhLayout'
import IndexContainer from '../containers/IndexContainer'
import {SOURCES_URL} from '../constants/paths'
import {requireAuth} from 'helpers/auth/authHelper'

export default (
  <Route path={SOURCES_URL} component={Layout} onEnter={requireAuth}>
    <IndexRoute component={IndexContainer}/>
  </Route>
)

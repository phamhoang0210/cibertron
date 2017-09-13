import React from 'react'
import { Route, IndexRoute, IndexRedirect } from 'react-router'
import Layout from 'app/layouts/cronus/CronusLayout'
import {CRONUS_URL} from '../constants/paths'
import {requireAuth} from 'helpers/auth/authHelper'

export default (
  <Route path={CRONUS_URL} component={Layout} onEnter={requireAuth}>
    <IndexRedirect to="channels"/>
  </Route>
)

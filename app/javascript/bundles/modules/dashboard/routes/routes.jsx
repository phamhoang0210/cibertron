import React from 'react'
import { Route, IndexRoute } from 'react-router'
import ApplicationLayout from 'app/layouts/dashboard/DashboardLayout'
import DashboardContainer from '../containers/DashboardContainer'
import {requireAuth} from 'helpers/auth/authHelper'

export default (
  <Route path="/dashboard" component={ApplicationLayout} onEnter={requireAuth}>
    <IndexRoute component={DashboardContainer}/>
  </Route>
);
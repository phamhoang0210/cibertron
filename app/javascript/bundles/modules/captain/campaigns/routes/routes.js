import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from 'app/layouts/captain/CaptainLayout'
import IndexContainer from '../containers/IndexContainer'
import NewContainer from '../containers/NewContainer'
import {CAMPAIGNS_URL} from '../constants/paths'

export default (
  <Route path={CAMPAIGNS_URL} component={Layout}>
    <IndexRoute component={IndexContainer}/>
    <Route path="new" component={NewContainer} />
  </Route>
)
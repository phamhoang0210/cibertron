import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from 'app/layouts/hera/HeraLayout'
import IndexContainer from '../containers/IndexContainer'
import EditContainer from '../containers/EditContainer'
import NewContainer from '../containers/NewContainer'
import {LANDINGPAGES_URL} from '../constants/paths'
import {requireAuth} from 'helpers/auth/authHelper'

export default (
  <Route path={LANDINGPAGES_URL} component={Layout} onEnter={requireAuth}>
    <IndexRoute component={IndexContainer}/>
    <Route path=":id/edit" component={EditContainer} />
    <Route path="new" component={NewContainer} />
  </Route>
)
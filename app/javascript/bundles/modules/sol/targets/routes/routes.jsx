import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from 'app/layouts/sol/SolLayout'
import IndexContainer from '../containers/IndexContainer'
import EditContainer from '../containers/EditContainer'
import NewContainer from '../containers/NewContainer'
import {TARGETS_URL} from '../constants/paths'
import {requireAuth} from 'helpers/auth/authHelper'

export default (
  <Route path={TARGETS_URL} component={Layout}>
    <IndexRoute component={IndexContainer}/>
    <Route path=":id/edit" component={EditContainer} />
    <Route path="new" component={NewContainer} />
  </Route>
)
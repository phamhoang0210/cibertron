import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from 'app/layouts/hera/HeraLayout'
import IndexContainer from '../containers/IndexContainer'
import EditContainer from '../containers/EditContainer'
import RestoreContainer from '../containers/RestoreContainer'
import HistoryContainer from '../containers/HistoryContainer'
import NewContainer from '../containers/NewContainer'
import {DOMAINS_URL} from '../constants/paths'
import {requireAuth} from 'helpers/auth/authHelper'

export default (
  <Route path={DOMAINS_URL} component={Layout} onEnter={requireAuth}>
    <IndexRoute component={IndexContainer}/>
    <Route path=":id/edit" component={EditContainer} />
    <Route path=":id/restore" component={RestoreContainer} />
    <Route path=":id/history" component={HistoryContainer} />
    <Route path="new" component={NewContainer} />
  </Route>
)

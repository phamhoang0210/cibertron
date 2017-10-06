import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from 'app/layouts/hera/HeraLayout'
import IndexContainer from '../containers/IndexContainer'
import GetCodeContainer from '../containers/GetCodeContainer'
import EditContainer from '../containers/EditContainer'
import NewContainer from '../containers/NewContainer'
import {LANDING_PAGES_URL} from '../constants/paths'
import {requireAuth} from 'helpers/auth/authHelper'

export default (
  <Route path={LANDING_PAGES_URL} component={Layout} onEnter={requireAuth}>
    <IndexRoute component={IndexContainer}/>
    <Route path=":id/edit" component={EditContainer} />
    <Route path=":id/get_code" component={GetCodeContainer} />
    <Route path="new" component={NewContainer} />
  </Route>
)

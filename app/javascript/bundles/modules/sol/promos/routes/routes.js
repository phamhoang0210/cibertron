import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from 'app/layouts/sol/SolLayout'
import IndexContainer from '../containers/IndexContainer'
import {PROMOS_URL} from '../constants/paths'

export default (
  <Route path={PROMOS_URL} component={Layout}>
    <IndexRoute component={IndexContainer}/>
  </Route>
)
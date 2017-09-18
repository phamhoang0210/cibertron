import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from 'app/layouts/sol/SolLayout'
import IndexContainer from '../containers/IndexContainer'
import {TARGETS_URL} from '../constants/paths'

export default (
  <Route path={TARGETS_URL} component={Layout}>
    <IndexRoute component={IndexContainer}/>
  </Route>
)
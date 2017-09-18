import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from 'app/layouts/sol/SolLayout'
import IndexContainer from '../containers/IndexContainer'
import {COMBOS_URL} from '../constants/paths'

export default (
  <Route path={COMBOS_URL} component={Layout}>
    <IndexRoute component={IndexContainer}/>
  </Route>
)
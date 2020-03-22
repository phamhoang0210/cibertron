import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from 'app/layouts/manage/ManageLayout'
import AccountIndex from '../containers/AccountIndexPage'
import { ADMINCP_ACCOUNTS_PATH } from '../constants/paths'
import {requireAuth} from 'helpers/auth/authHelper'

export default (
   <Route path={ADMINCP_ACCOUNTS_PATH} component={Layout} onEnter={requireAuth}>
    <IndexRoute component={AccountIndex}/>
  </Route>
);

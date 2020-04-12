import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from 'app/layouts/manage/ManageLayout'
import AccountIndex from '../containers/AccountIndexPage'
import AccountNew from '../containers/AccountNewPage'
import AccountEdit from '../containers/AccountEditPage'

import { ADMINCP_ACCOUNTS_PATH, ACCOUNT_NEW_PATH, ACCOUNT_EDIT_PATH} from '../constants/paths'
import {requireAuth} from 'helpers/auth/authHelper'

export default (
  <Route path={ADMINCP_ACCOUNTS_PATH} component={Layout} onEnter={requireAuth}>
    <IndexRoute component={(props)=> (<AccountIndex
    	{...props}
    	accountNewPath={ACCOUNT_NEW_PATH}
    	accountEditPath={ACCOUNT_EDIT_PATH}
    />)}
  />
    <Route path="new" component={AccountNew} />
    <Route path=":id/edit" component={AccountEdit} />
  </Route>
);

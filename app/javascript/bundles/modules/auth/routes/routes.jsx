import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AuthLayout from 'app/layouts/auth/AuthLayout'
import AuthContainer from '../containers/AuthContainer'
import AuthSignInContainer from '../containers/AuthSignInContainer'
import AuthSignUpContainer from '../containers/AuthSignUpContainer'
import AuthSignOutContainer from '../containers/AuthSignOutContainer'
import {AUTH_URL} from '../constants/paths'
import {requireAuth} from 'helpers/auth/authHelper'

export default (
  <Route path={AUTH_URL} component={AuthLayout}>
    <IndexRoute component={AuthContainer}/>
    <Route path="sign_in" component={AuthSignInContainer} />
    <Route path="sign_up" component={AuthSignUpContainer} />
    <Route path="sign_out" component={AuthSignOutContainer} onEnter={requireAuth}/>
  </Route>
)

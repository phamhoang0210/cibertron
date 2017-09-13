import request from 'libs/requests/request'
import * as actionTypes from '../constants/actionTypes'
import {AUTHSERVICE_BASE_URL} from '../constants/paths'
import * as authHelper from 'helpers/auth/authHelper'

function setIsSigning() {
  return {
    type: actionTypes.SET_IS_SIGNING,
  }
}

function signInSuccess(data) {
  return {
    type: actionTypes.SIGN_IN_SUCCESS,
  }
}

function setLocalCredentials(data) {
  authHelper.setCredentials({
    'access-token': data['access-token'],
    'client': data['client'],
    'uid': data['uid'],
  })
}

function redirectToHome() {

}

function signInFailure(error) {
  return {
    type: actionTypes.SIGN_IN_FAILURE,
    error,
  }
}

export function signIn(params = {}, onSuccess = null) {
  return dispatch => {
    dispatch(setIsSigning())
    return request
      .submitEntity(`${AUTHSERVICE_BASE_URL}/auth/sign_in`, params)
      .then(res => {
        setLocalCredentials(res.headers)
        dispatch(signInSuccess(res.data))
        if(onSuccess) { onSuccess(res.data) }
      })
      .catch(error => dispatch(signInFailure(error)))
  }
}
import request from 'libs/requests/request'
import * as actionTypes from '../constants/actionTypes'
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


function signInFailure(error) {
  return {
    type: actionTypes.SIGN_IN_FAILURE,
    error,
  }
}


function setLocalCredentials(data) {
  authHelper.setCredentials({
    'access-token': data['access-token'],
    'uid': data['uid'],
  })
}

export function signIn(params = {}, onSuccess = null) {
  return dispatch => {
    dispatch(setIsSigning())
    return request
      .submitEntity(`${CIBERTRON_BASE_URL}/api/v1/sessions`, params)
      .then(res => {
        setLocalCredentials(res.data)
        dispatch(signInSuccess(res.data))
        if(onSuccess) { onSuccess(res.data) }
      })
      .catch(error => dispatch(signInFailure(error)))
  }
}
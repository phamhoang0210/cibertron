import request from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import { deleteCredentials } from 'helpers/auth/authHelper'

function setIsSigout() {
  return {
    type: actionTypes.SET_IS_SIGN_OUT,
  }
}

function signOutSuccess(data) {
  return {
    type: actionTypes.SIGN_OUT_SUCCESS,
  }
}


function signOutFailure(error) {
  return {
    type: actionTypes.SIGN_OUT_FAILURE,
    error,
  }
}

export function signOut(onSuccess = null) {
  return dispatch => {
    dispatch(setIsSigout())

    return request
      .deleteEntity(`${CIBERTRON_BASE_URL}/api/v1/sessions/signout`)
      .then(res => {
        dispatch(signOutSuccess(res.data))
        deleteCredentials()
        if(onSuccess) { onSuccess() }
      })
      .catch(error => {
        dispatch(signOutFailure(error))
        deleteCredentials()
        if(onSuccess) { onSuccess() }
      })
  }
}
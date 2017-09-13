import request from 'libs/requests/request'
import * as actionTypes from '../constants/actionTypes'
import {AUTHSERVICE_BASE_URL} from '../constants/paths'
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
    deleteCredentials()
    
    return request
      .deleteEntity(`${AUTHSERVICE_BASE_URL}/auth/sign_out`)
      .then(res => {
        dispatch(signOutSuccess(res.data))
        if(onSuccess) { onSuccess() }
      })
      .catch(error => {
        dispatch(signOutFailure(error))
        if(onSuccess) { onSuccess() }
      })
  }
}
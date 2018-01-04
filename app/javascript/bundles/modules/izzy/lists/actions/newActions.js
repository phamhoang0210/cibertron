import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {AIRI_BASE_URL, LISTS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsCreatingList() {
  return {
    type: actionTypes.SET_IS_CREATING_LIST,
  }
}

function createListSucces(record) {
  return {
    type: actionTypes.CREATE_LIST_SUCCESS,
    record
  }
}

function createListFailure(error) {
  return {
    type: actionTypes.CREATE_LIST_FAILURE,
    error,
  }
}

export function createList(params = {}) {
  return dispatch => {
    dispatch(setIsCreatingList())

    return authRequest
      .uploadEntity(`${AIRI_BASE_URL}${LISTS_API_PATH}`, params)
      .then(res => dispatch(createListSucces(res.data)))
      .catch(error => dispatch(createListFailure(error)))
  }
}

export function resetAlert() {
  return dispatch => {
    dispatch({type: ''})
  }
}
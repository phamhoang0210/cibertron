import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  AIRI_BASE_URL, LISTS_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingList() {
  return {
    type: actionTypes.SET_IS_FETCHING_LIST,
  }
}

function fetchListSuccess(record) {
  return {
    type: actionTypes.FETCH_LIST_SUCCESS,
    record,
  }
}

function fetchListFailure(error) {
  return {
    type: actionTypes.FETCH_LIST_FAILURE,
    error,
  }
}

export function fetchList(listId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingList())
    authRequest
      .fetchEntities(`${AIRI_BASE_URL}${LISTS_API_PATH}/${listId}`, params)
      .then(res => dispatch(fetchListSuccess(res.data)))
      .catch(error => dispatch(fetchListFailure(error)))
  }
}

function setIsUpdatingList(listId) {
  return {
    type: actionTypes.SET_IS_UPDATING_LIST,
    listId,
  }
}

function updateListSuccess(record) {
  return {
    type: actionTypes.UPDATE_LIST_SUCCESS,
    record,
  }
}

function updateListFailure(error, listId) {
  return {
    type: actionTypes.UPDATE_LIST_FAILURE,
    error,
    listId,
  }
}

export function updateList(listId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingList(listId))
    authRequest
      .uploadPutEntity(`${AIRI_BASE_URL}${LISTS_API_PATH}/${listId}`, params)
      .then(res => {
        dispatch(updateListSuccess(res.data))
      })
      .catch(error => dispatch(updateListFailure(error, listId)))
  }
}


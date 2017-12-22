import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  AIRI_BASE_URL, LISTS_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingLists() {
  return {
    type: actionTypes.SET_IS_FETCHING_LISTS,
  }
}

function fetchListsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_LISTS_SUCCESS,
    records,
    filters,
  }
}

function fetchListsFailure(error) {
  return {
    type: actionTypes.FETCH_LISTS_FAILURE,
    error,
  }
}

export function fetchLists(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingLists())
    authRequest
      .fetchEntities(`${AIRI_BASE_URL}${LISTS_API_PATH}`, params)
      .then(res => dispatch(fetchListsSuccess(res.data)))
      .catch(error => dispatch(fetchListsFailure(error)))
  }
}

function setIsDeletingList(listId) {
  return {
    type: actionTypes.SET_IS_DELETING_LIST,
    listId,
  }
}

function deleteListSuccess(record) {
  return {
    type: actionTypes.DELETE_LIST_SUCCESS,
    record,
  }
}

function deleteListFailure(error, listId) {
  return {
    type: actionTypes.DELETE_LIST_FAILURE,
    error,
    listId,
  }
}

export function deleteList(listId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingList(listId))
    authRequest
      .deleteEntity(`${AIRI_BASE_URL}${LISTS_API_PATH}/${listId}`)
      .then(res => {
        dispatch(deleteListSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('listFilters'))
        dispatch(fetchLists(filterParams))
      })
      .catch(error => dispatch(deleteListFailure(error, listId)))
  }
}

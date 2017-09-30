import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {SOL_BASE_URL, TARGETS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingTargets() {
  return {
    type: actionTypes.SET_IS_FETCHING_TARGETS,
  }
}

function fetchTargetsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_TARGETS_SUCCESS,
    records,
    filters,
  }
}

function fetchTargetsFailure(error) {
  return {
    type: actionTypes.FETCH_TARGETS_FAILURE,
    error,
  }
}

export function fetchTargets(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingTargets())
    authRequest
      .fetchEntities(`${SOL_BASE_URL}${TARGETS_API_PATH}`, params)
      .then(res => dispatch(fetchTargetsSuccess(res.data)))
      .catch(error => dispatch(fetchTargetsFailure(error)))
  }
}

function setIsDeletingTarget(targetId) {
  return {
    type: actionTypes.SET_IS_DELETING_TARGET,
    targetId,
  }
}

function deleteTargetSuccess(record) {
  return {
    type: actionTypes.DELETE_TARGET_SUCCESS,
    record,
  }
}

function deleteTargetFailure(error, targetId) {
  return {
    type: actionTypes.DELETE_TARGET_FAILURE,
    error,
  }
}

export function deleteTarget(targetId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingTarget(targetId))
    authRequest
      .deleteEntity(`${SOL_BASE_URL}${TARGETS_API_PATH}/${targetId}`)
      .then(res => {
        dispatch(deleteTargetSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('targetFilters'))
        dispatch(fetchTargets(filterParams))
      })
      .catch(error => dispatch(deleteTargetFailure(error, targetId)))
  }
}
import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {SOL_BASE_URL, TARGETS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingTarget() {
  return {
    type: actionTypes.SET_IS_FETCHING_TARGETS,
  }
}

function fetchTargetSuccess(record) {
  return {
    type: actionTypes.FETCH_TARGETS_SUCCESS,
    record,
  }
}

function fetchTargetFailure(error) {
  return {
    type: actionTypes.FETCH_TARGETS_FAILURE,
    error,
  }
}

export function fetchTarget(targetId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingTarget())
    authRequest
      .fetchEntities(`${CRONUS_BASE_URL}${TARGETSS_API_PATH}/${targetId}`, params)
      .then(res => dispatch(fetchTargetSuccess(res.data)))
      .catch(error => dispatch(fetchTargetFailure(error)))
  }
}

function setIsUpdatingTarget(targetId) {
  return {
    type: actionTypes.SET_IS_UPDATING_TARGETS,
    targetId,
  }
}

function updateTargetSuccess(record) {
  return {
    type: actionTypes.UPDATE_TARGETS_SUCCESS,
    record,
  }
}

function updateTargetFailure(error, targetId) {
  return {
    type: actionTypes.UPDATE_TARGETS_FAILURE,
    error,
    targetId,
  }
}

export function updateTarget(targetId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingTarget(targetId))
    authRequest
      .putEntity(`${SOL_BASE_URL}${TARGETSS_API_PATH}/${targetId}`, params)
      .then(res => dispatch(updateTargetSuccess(res.data)))
      .catch(error => dispatch(updateTargetFailure(error, targetId)))
  }
}
import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {TARGETS_IMPORT_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsCreatingTarget() {
  return {
    type: actionTypes.SET_IS_CREATING_TARGET,
  }
}

function createTargetSucces(record) {
  return {
    type: actionTypes.CREATE_TARGET_SUCCESS,
    record
  }
}

function createTargetFailure(error) {
  return {
    type: actionTypes.CREATE_TARGET_FAILURE,
    error,
  }
}

export function createTarget(params = {}) {
  return dispatch => {
    dispatch(setIsCreatingTarget())

    return authRequest
      .submitEntity(`${SOL_BASE_URL}${TARGETS_IMPORT_API_PATH}`, params)
      .then(res => dispatch(createTargetSucces(res.data)))
      .catch(error => dispatch(createTargetFailure(error)))
  }
}
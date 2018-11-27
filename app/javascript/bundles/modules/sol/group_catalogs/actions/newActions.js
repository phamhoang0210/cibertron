import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {GROUP_CATALOGS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsCreatingGroup() {
  return {
    type: actionTypes.SET_IS_CREATING_GROUP_CATALOG,
  }
}

function createGroupSucces(record) {
  return {
    type: actionTypes.CREATE_GROUP_CATALOG_SUCCESS,
    record
  }
}

function createGroupFailure(error) {
  return {
    type: actionTypes.CREATE_GROUP_CATALOG_FAILURE,
    error,
  }
}

export function createGroup(params = {}) {
  return dispatch => {
    dispatch(setIsCreatingGroup())

    return authRequest
      .submitEntity(`${SOL_BASE_URL}${GROUP_CATALOGS_API_PATH}`, params)
      .then(res => dispatch(createGroupSucces(res.data)))
      .catch(error => dispatch(createGroupFailure(error)))
  }
}
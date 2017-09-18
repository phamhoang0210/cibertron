import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {CRONUS_BASE_URL, LEADS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsCreatingLead() {
  return {
    type: actionTypes.SET_IS_CREATING_LEAD,
  }
}

function createLeadSucces(record) {
  return {
    type: actionTypes.CREATE_LEAD_SUCCESS,
    record
  }
}

function createLeadFailure(error) {
  return {
    type: actionTypes.CREATE_LEAD_FAILURE,
    error,
  }
}

export function createLead(params = {}) {
  return dispatch => {
    dispatch(setIsCreatingLead())

    return authRequest
      .submitEntity(`${CRONUS_BASE_URL}${LEADS_API_PATH}`, params)
      .then(res => dispatch(createLeadSucces(res.data)))
      .catch(error => dispatch(createLeadFailure(error)))
  }
}
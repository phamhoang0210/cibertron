import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {CRONUS_BASE_URL, LEADS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingLead() {
  return {
    type: actionTypes.SET_IS_FETCHING_LEAD,
  }
}

function fetchLeadSuccess(record) {
  return {
    type: actionTypes.FETCH_LEAD_SUCCESS,
    record,
  }
}

function fetchLeadFailure(error) {
  return {
    type: actionTypes.FETCH_LEAD_FAILURE,
    error,
  }
}

export function fetchLead(leadId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingLead())
    authRequest
      .fetchEntities(`${CRONUS_BASE_URL}${LEADS_API_PATH}/${leadId}`, params)
      .then(res => dispatch(fetchLeadSuccess(res.data)))
      .catch(error => dispatch(fetchLeadFailure(error)))
  }
}

function setIsUpdatingLead(leadId) {
  return {
    type: actionTypes.SET_IS_UPDATING_LEAD,
    leadId,
  }
}

function updateLeadSuccess(record) {
  return {
    type: actionTypes.UPDATE_LEAD_SUCCESS,
    record,
  }
}

function updateLeadFailure(error, leadId) {
  return {
    type: actionTypes.UPDATE_LEAD_FAILURE,
    error,
    leadId,
  }
}

export function updateLead(leadId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingLead(leadId))
    authRequest
      .putEntity(`${CRONUS_BASE_URL}${LEADS_API_PATH}/${leadId}`, params)
      .then(res => dispatch(updateLeadSuccess(res.data)))
      .catch(error => dispatch(updateLeadFailure(error, leadId)))
  }
}
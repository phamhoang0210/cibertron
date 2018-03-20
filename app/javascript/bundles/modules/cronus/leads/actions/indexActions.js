import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {LEADS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingLeads() {
  return {
    type: actionTypes.SET_IS_FETCHING_LEADS,
  }
}

function fetchLeadsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_LEADS_SUCCESS,
    records,
    filters,
  }
}

function fetchLeadsFailure(error) {
  return {
    type: actionTypes.FETCH_LEADS_FAILURE,
    error,
  }
}

export function fetchLeads(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingLeads())
    authRequest
      .fetchEntities(`${CRONUS_BASE_URL}${LEADS_API_PATH}`, params)
      .then(res => dispatch(fetchLeadsSuccess(res.data)))
      .catch(error => dispatch(fetchLeadsFailure(error)))
  }
}

function setIsDeletingLead(leadId) {
  return {
    type: actionTypes.SET_IS_DELETING_LEAD,
    leadId,
  }
}

function deleteLeadSuccess(record) {
  return {
    type: actionTypes.DELETE_LEAD_SUCCESS,
    record,
  }
}

function deleteLeadFailure(error, leadId) {
  return {
    type: actionTypes.DELETE_LEAD_FAILURE,
    error,
    leadId,
  }
}

export function deleteLead(leadId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingLead(leadId))
    authRequest
      .deleteEntity(`${CRONUS_BASE_URL}${LEADS_API_PATH}/${leadId}`)
      .then(res => {
        dispatch(deleteLeadSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('leadFilters'))
        dispatch(fetchLeads(filterParams))
      })
      .catch(error => dispatch(deleteLeadFailure(error, leadId)))
  }
}
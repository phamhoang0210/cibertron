import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {LEAD_REPORT_API_PATH, LEAD_ASSIGN_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingLeadReport() {
  return {
    type: actionTypes.SET_IS_FETCHING_LEAD_REPORT,
  }
}

function fetchLeadReportSuccess(leadReport) {
  return {
    type: actionTypes.FETCH_LEAD_REPORT_SUCCESS,
    leadReport
  }
}

function fetchLeadReportFailure(error) {
  return {
    type: actionTypes.FETCH_LEAD_REPORT_FAILURE,
    error,
  }
}

export function fetchLeadReport(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingLeadReport())

    return authRequest
      .fetchEntities(`${NAUH_BASE_URL}${LEAD_REPORT_API_PATH}`, params)
      .then(res => dispatch(fetchLeadReportSuccess(res.data)))
      .catch(error => dispatch(fetchLeadReportFailure(error)))
  }
}

function setIsAssgningLeads() {
  return {
    type: actionTypes.SET_IS_ASSIGNING_LEADS,
  }
}

function assignLeadsSuccess(assignResults) {
  return {
    type: actionTypes.ASSIGN_LEAD_SUCCESS,
    assignResults,
  }
}

function assignLeadsFailure(error) {
  return {
    type: actionTypes.ASSIGN_LEAD_FAILURE,
    error,
  }
}

export function assignLeads(params) {
  return (dispatch, getStore) => {
    dispatch(setIsAssgningLeads())

    return authRequest
      .submitEntity(`${NAUH_BASE_URL}${LEAD_ASSIGN_API_PATH}`, params)
      .then(res => {
        dispatch(assignLeadsSuccess(res.data))
        dispatch(fetchLeadReport(params))
      })
      .catch(error => {
        dispatch(assignLeadsFailure(error))
        dispatch(fetchLeadReport(params))
      })
  }
}

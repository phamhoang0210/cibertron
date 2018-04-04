import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {REPORT_GET_PATH, LEAD_ASSIGN_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingLeadReport() {
  return {
    type: actionTypes.SET_IS_FETCHING_REPORT,
  }
}

function fetchLeadReportSuccess(leadReporting) {
  return {
    type: actionTypes.FETCH_REPORT_SUCCESS,
    leadReporting
  }
}

function fetchLeadReportFailure(error) {
  return {
    type: actionTypes.FETCH_REPORT_FAILURE,
    error,
  }
}

export function fetchLeadReport(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingLeadReport())

    return authRequest
      .fetchEntities(`${NAUH_BASE_URL}${REPORT_GET_PATH}`, params)
      .then(res => dispatch(fetchLeadReportSuccess(res.data)))
      .catch(error => dispatch(fetchLeadReportFailure(error)))
  }
}

function setIsAssgningLeads() {
  return {
    type: actionTypes.SET_IS_REPORT_LEADS,
  }
}

function reportLeadsSuccess(reportResults) {
  return {
    type: actionTypes.REPORT_LEAD_SUCCESS,
      reportResults,
  }
}

function reportLeadsFailure(error) {
  return {
    type: actionTypes.REPORT_LEAD_FAILURE,
    error,
  }
}

export function reportLeads(params) {
  return (dispatch, getStore) => {
    dispatch(setIsAssgningLeads())

    return authRequest
      .submitEntity(`${NAUH_BASE_URL}${LEAD_ASSIGN_API_PATH}`, params)
      .then(res => {
        dispatch(reportLeadsSuccess(res.data))
        dispatch(fetchLeadReport())
      })
      .catch(error => {
        dispatch(reportLeadsFailure(error))
        dispatch(fetchLeadReport())
      })
  }
}
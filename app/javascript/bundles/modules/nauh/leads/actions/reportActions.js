import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {REPORT_GET_PATH, LEAD_ASSIGN_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
import {fetchLeadReport} from "./assignActions";
export * from './sharedActions'

function setIsFetchingReport() {
  return {
    type: actionTypes.SET_IS_FETCHING_REPORT,
  }
}

function fetchReportSuccess(leadReporting) {
  return {
    type: actionTypes.FETCH_REPORT_SUCCESS,
    leadReporting
  }
}

function fetchReportFailure(error) {
  return {
    type: actionTypes.FETCH_REPORT_FAILURE,
    error,
  }
}

export function fetchReport(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingReport())

    return authRequest
      .fetchEntities(`${NAUH_BASE_URL}${REPORT_GET_PATH}`, params)
      .then(res => dispatch(fetchReportSuccess(res.data)))
      .catch(error => dispatch(fetchReportFailure(error)))
  }
}


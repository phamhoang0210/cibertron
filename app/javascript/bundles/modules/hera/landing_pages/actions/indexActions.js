import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {LANDING_PAGES_API_PATH, LANDING_PAGE_LOGS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
import * as sharedActions from './sharedActions'
import _ from 'lodash'
export * from './sharedActions'

function setIsFetchingLandingPages() {
  return {
    type: actionTypes.SET_IS_FETCHING_LANDING_PAGES,
  }
}

function fetchLandingPagesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_LANDING_PAGES_SUCCESS,
    records,
    filters,
  }
}

function fetchLandingPagesFailure(error) {
  return {
    type: actionTypes.FETCH_LANDING_PAGES_FAILURE,
    error,
  }
}

export function fetchLandingPages(params = {}, onSuccessCallback = fetchUsersAndDiscounts ) {
  return dispatch => {
    dispatch(setIsFetchingLandingPages())
    authRequest
      .fetchEntities(`${HERA_BASE_URL}${LANDING_PAGES_API_PATH}`, params)
      .then(res => {
        dispatch(fetchLandingPagesSuccess(res.data))
        dispatch(onSuccessCallback(res.data.records))
      })
      .catch(error => dispatch(fetchLandingPagesFailure(error)))
  }
}

function fetchUsersAndDiscounts(landingpages){
  return dispatch => {
    let lpUserGids = filterFieldsFromLandingpages(landingpages, "user_gid")
    let lpDiscountIds = filterFieldsFromLandingpages(landingpages, "discount_id")
    let discount_ids = landingpages
    const {fetchUsers, fetchDiscounts} = sharedActions

    dispatch(fetchUsers({compconds: {"gid.in": lpUserGids}}))
    dispatch(fetchDiscounts({
      fields: 'product_json',
      compconds: {"id.in": lpDiscountIds}
    }))
  }
}

function filterFieldsFromLandingpages(lps, field){
  let fieldValues = lps.map(lp => lp[field]).filter(f => ((f != null) && (f != undefined)))
  return _.uniq(fieldValues)
}

function setIsFetchingLandingPageLogs(landingPage) {
  return {
    type: actionTypes.SET_IS_FETCHING_LANDING_PAGE_LOGS,
    landingPage,
  }
}

function fetchLandingPageLogsSuccess(landingPage, {records, filters}) {
  return {
    type: actionTypes.FETCH_LANDING_PAGE_LOGS_SUCCESS,
    records,
    filters,
    landingPage,
  }
}

function fetchLandingPageLogsFailure(landingPage, error) {
  return {
    type: actionTypes.FETCH_LANDING_PAGE_LOGS_FAILURE,
    error,
    landingPage,
  }
}

export function fetchLandingPageLogs(landingPage, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingLandingPageLogs(landingPage))
    authRequest
      .fetchEntities(`${HERA_BASE_URL}${LANDING_PAGE_LOGS_API_PATH}`, params)
      .then(res => dispatch(fetchLandingPageLogsSuccess(landingPage, res.data)))
      .catch(error => dispatch(fetchLandingPageLogsFailure(landingPage, error)))
  }
}

function setIsDeletingLandingPage(landingPageId) {
  return {
    type: actionTypes.SET_IS_DELETING_LANDING_PAGE,
    landingPageId,
  }
}

function deleteLandingPageSuccess(record) {
  return {
    type: actionTypes.DELETE_LANDING_PAGE_SUCCESS,
    record,
  }
}

function deleteLandingPageFailure(error, landingPageId) {
  return {
    type: actionTypes.DELETE_LANDING_PAGE_FAILURE,
    error,
    landingPageId,
  }
}

export function deleteLandingPage(landingPageId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingLandingPage(landingPageId))
    authRequest
      .deleteEntity(`${HERA_BASE_URL}${LANDING_PAGES_API_PATH}/${landingPageId}`)
      .then(res => {
        dispatch(deleteLandingPageSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('landingPageFilters'))
        dispatch(fetchLandingPages(filterParams))
      })
      .catch(error => dispatch(deleteLandingPageFailure(error, landingPageId)))
  }
}

//Action for reload landingpage
function setIsReloadingLandingPage(landingPageId) {
  return {
    type: actionTypes.SET_IS_RELOADING_LANDING_PAGE,
    landingPageId,
  }
}

function reloadLandingPageSuccess(record) {
  return {
    type: actionTypes.RELOAD_LANDING_PAGE_SUCCESS,
    record,
  }
}

function reloadLandingPageFailure(error, landingPageId) {
  return {
    type: actionTypes.RELOAD_LANDING_PAGE_FAILURE,
    error,
    landingPageId,
  }
}

export function reloadLandingPage(landingPageId, landingPageParams, params = {}) {
  return dispatch => {
    dispatch(setIsReloadingLandingPage(landingPageId))
    authRequest
      .putEntity(`${HERA_BASE_URL}${LANDING_PAGES_API_PATH}/${landingPageId}/reload`, params)
      .then(res => {
        dispatch(reloadLandingPageSuccess(res.data))
        dispatch(fetchLandingPages(landingPageParams))
      })
      .catch(error => dispatch(reloadLandingPageFailure(error, landingPageId)))
  }
}
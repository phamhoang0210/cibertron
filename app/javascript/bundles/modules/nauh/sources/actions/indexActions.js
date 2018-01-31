import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  A3_STORAGE_BASE_URL, SOURCES_API_PATH, EROS_BASE_URL, L8_REPORT_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingSources() {
  return {
    type: actionTypes.SET_IS_FETCHING_SOURCES,
  }
}

function fetchSourcesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_SOURCES_SUCCESS,
    records,
    filters,
  }
}

function fetchSourcesFailure(error) {
  return {
    type: actionTypes.FETCH_SOURCES_FAILURE,
    error,
  }
}

export function fetchSources(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingSources())
    authRequest
      .fetchEntities(`${A3_STORAGE_BASE_URL}${SOURCES_API_PATH}`, params)
      .then(res => {
        dispatch(fetchSourcesSuccess(res.data))
      })
      .catch(error => dispatch(fetchSourcesFailure(error)))
  }
}

function setIsFetchingL8Report() {
  return {
    type: actionTypes.SET_IS_FETCHING_L8_REPORT,
  }
}

function fetchL8ReportSuccess(data) {
  return {
    type: actionTypes.FETCH_L8_REPORT_SUCESS,
    data,
  }
}

function fetchL8ReportFailure(error) {
  return {
    type: actionTypes.FETCH_L8_REPORT_FAILURE,
    error,
  }
}

export function fetchL8Report(sources) {
  return dispatch => {
    const mobile = sources.records.map(s => s.mobile)
    dispatch(setIsFetchingL8Report())
    authRequest
      .fetchEntities(`${EROS_BASE_URL}${L8_REPORT_API_PATH}`, {mobile})
      .then(res => dispatch(fetchL8ReportSuccess(res.data)))
      .catch(error => dispatch(fetchL8ReportFailure(error)))
  }
}

function setIsHandingOver() {
  return {
    type: actionTypes.SET_IS_HANDING_OVER,
  }
}

function handOverSuccess(response) {
  return {
    type: actionTypes.HAND_OVER_SUCCESS,
  }
}

function handOverFailure(error) {
  return {
    type: actionTypes.HAND_OVER_FAILURE,
  }
}

export function handOver(params = {}) {
  return (dispatch, getStore) => {
    dispatch(setIsHandingOver())
    authRequest
      .fetchEntities(`${A3_STORAGE_BASE_URL}${SOURCES_API_PATH}/hand_over`, params)
      .then(res => {
        dispatch(handOverSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('sourceFilters'))
        dispatch(fetchSources(filterParams))
      })
      .catch(error => dispatch(handOverFailure(error)))
  }
}

function setIsSedingEmail() {
  return {
    type: actionTypes.SET_IS_HANDING_OVER,
  }
}

function sendEmailSuccess(response) {
  return {
    type: actionTypes.HAND_OVER_SUCCESS,
  }
}

function sendEmailFailure(error) {
  return {
    type: actionTypes.HAND_OVER_FAILURE,
  }
}

export function sendEmail(params = {}) {
  return (dispatch, getStore) => {
    dispatch(setIsHandingOver())
    authRequest
      .fetchEntities(`${A3_STORAGE_BASE_URL}${SOURCES_API_PATH}/send_email`, params)
      .then(res => {
        dispatch(handOverSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('sourceFilters'))
        dispatch(fetchSources(filterParams))
      })
      .catch(error => dispatch(handOverFailure(error)))
  }
}

// Set contact to Test
function setIsSettingToTest() {
  return {
    type: actionTypes.SET_IS_SETTING_TO_TEST,
  }
}

function settingToTestSuccess(response) {
  return {
    type: actionTypes.SET_TO_TEST_SUCCESS,
  }
}

function settingToTestFailure(error) {
  return {
    type: actionTypes.SET_TO_TEST_FAILURE,
  }
}

export function setToTest(params = {}) {
  return (dispatch, getStore) => {
    dispatch(setIsSettingToTest())
    authRequest
      .fetchEntities(`${A3_STORAGE_BASE_URL}${SOURCES_API_PATH}/set_to_test`, params)
      .then(res => {
        dispatch(settingToTestSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('sourceFilters'))
        dispatch(fetchSources(filterParams))
      })
      .catch(error => dispatch(settingToTestFailure(error)))
  }
}

// Set contact to Trash
function setIsSettingToTrash() {
  return {
    type: actionTypes.SET_IS_SETTING_TO_TRASH,
  }
}

function settingToTrashSuccess(response) {
  return {
    type: actionTypes.SET_TO_TRASH_SUCCESS,
  }
}

function settingToTrashFailure(error) {
  return {
    type: actionTypes.SET_TO_TRASH_FAILURE,
  }
}

export function setToTrash(params = {}) {
  return (dispatch, getStore) => {
    dispatch(setIsSettingToTrash())
    authRequest
      .fetchEntities(`${A3_STORAGE_BASE_URL}${SOURCES_API_PATH}/set_to_trash`, params)
      .then(res => {
        dispatch(settingToTrashSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('sourceFilters'))
        dispatch(fetchSources(filterParams))
      })
      .catch(error => dispatch(settingToTrashFailure(error)))
  }
}

// Set contact to New
function setIsSettingToNew() {
  return {
    type: actionTypes.SET_IS_SETTING_TO_NEW,
  }
}

function settingToNewSuccess(response) {
  return {
    type: actionTypes.SET_TO_NEW_SUCCESS,
  }
}

function settingToNewFailure(error) {
  return {
    type: actionTypes.SET_TO_NEW_FAILURE,
  }
}

export function setToNew(params = {}) {
  return (dispatch, getStore) => {
    dispatch(setIsSettingToNew())
    authRequest
      .fetchEntities(`${A3_STORAGE_BASE_URL}${SOURCES_API_PATH}/set_to_new`, params)
      .then(res => {
        dispatch(settingToNewSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('sourceFilters'))
        dispatch(fetchSources(filterParams))
      })
      .catch(error => dispatch(settingToNewFailure(error)))
  }
}

export function updateSelectedSourceKeys(sourceKeys) {
  return {
    type: actionTypes.UPDATE_SELECTED_SOURCE_KEYS,
    sourceKeys,
  }
}
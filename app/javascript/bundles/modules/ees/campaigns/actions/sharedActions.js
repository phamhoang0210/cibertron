import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  LISTS_API_PATH, SENDERS_API_PATH, TEMPLATES_API_PATH, USERS_API_PATH,
  BUDGETS_API_PATH, BUDGET_API_PATH, USED_EMAILS_API_PATH,USERSERVICE_BASE_URL
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'

// Fetch lists
function setIsFetchingLists() {
  return {
    type: actionTypes.SET_IS_FETCHING_LISTS,
  }
}

function fetchListsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_LISTS_SUCCESS,
    records,
    filters,
  }
}

function fetchListsFailure(error) {
  return {
    type: actionTypes.FETCH_LISTS_FAILURE,
    error,
  }
}

export function fetchLists(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingLists())
    authRequest
      .fetchEntities(`${AIRI_BASE_URL}${LISTS_API_PATH}`, params)
      .then(res => dispatch(fetchListsSuccess(res.data)))
      .catch(error => dispatch(fetchListsFailure(error)))
  }
}

// Fetch senders
function setIsFetchingSenders() {
  return {
    type: actionTypes.SET_IS_FETCHING_SENDERS,
  }
}

function fetchSendersSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_SENDERS_SUCCESS,
    records,
    filters,
  }
}

function fetchSendersFailure(error) {
  return {
    type: actionTypes.FETCH_SENDERS_FAILURE,
    error,
  }
}

export function fetchSenders(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingSenders())
    authRequest
      .fetchEntities(`${MEEPO_BASE_URL}${SENDERS_API_PATH}`, params)
      .then(res => dispatch(fetchSendersSuccess(res.data)))
      .catch(error => dispatch(fetchSendersFailure(error)))
  }
}
// Fetch users
function setIsFetchingAllUsers() {
  return {
    type: actionTypes.SET_IS_FETCHING_ALL_USERS,
  }
}

function fetchAllUsersSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    records,
    filters,
  }
}

function fetchAllUsersFailure(error) {
  return {
    type: actionTypes.FETCH_ALL_USERS_FAILURE,
    error,
  }
}

export function fetchAllUsers(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingAllUsers())
    authRequest
      .fetchEntities(`${USERSERVICE_BASE_URL}${USERS_API_PATH}`, params)
      .then(res => dispatch(fetchAllUsersSuccess(res.data)))
      .catch(error => dispatch(fetchAllUsersFailure(error)))
  }
}
// Fetch templates
function setIsFetchingTemplates() {
  return {
    type: actionTypes.SET_IS_FETCHING_TEMPLATES,
  }
}

function fetchTemplatesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_TEMPLATES_SUCCESS,
    records,
    filters,
  }
}

function fetchTemplatesFailure(error) {
  return {
    type: actionTypes.FETCH_TEMPLATES_FAILURE,
    error,
  }
}

export function fetchTemplates(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingTemplates())
    authRequest
      .fetchEntities(`${MORPHLING_BASE_URL}${TEMPLATES_API_PATH}`, params)
      .then(res => dispatch(fetchTemplatesSuccess(res.data)))
      .catch(error => dispatch(fetchTemplatesFailure(error)))
  }
}

// Fetch user budget
function setIsFetchingBudget() {
  return {
    type: actionTypes.SET_IS_FETCHING_BUDGET,
  }
}

function fetchBudgetSuccess(record) {
  return {
    type: actionTypes.FETCH_BUDGET_SUCCESS,
    record
  }
}

function fetchBudgetFailure(error) {
  return {
    type: actionTypes.FETCH_BUDGET_FAILURE,
    error,
  }
}

export function fetchBudget(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingBudget())
    authRequest
      .fetchEntities(`${MEEPO_BASE_URL}${BUDGET_API_PATH}`, params)
      .then(res => {
        dispatch(fetchBudgetSuccess(res.data))
      })
      .catch(error => dispatch(fetchBudgetFailure(error)))
  }
}

// Fetch user budgets
function setIsFetchingBudgets() {
  return {
    type: actionTypes.SET_IS_FETCHING_BUDGETS,
  }
}

function fetchBudgetsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_BUDGETS_SUCCESS,
    records,
    filters,
  }
}

function fetchBudgetsFailure(error) {
  return {
    type: actionTypes.FETCH_BUDGETS_FAILURE,
    error,
  }
}

export function fetchBudgets(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingBudgets())
    authRequest
      .fetchEntities(`${MEEPO_BASE_URL}${BUDGETS_API_PATH}`, params)
      .then(res => dispatch(fetchBudgetsSuccess(res.data)))
      .catch(error => dispatch(fetchBudgetsFailure(error)))
  }
}

// Fetch user used_emails
function setIsFetchingUsedEmails() {
  return {
    type: actionTypes.SET_IS_FETCHING_USED_EMAILS,
  }
}

function fetchUsedEmailsSuccess(record) {
  return {
    type: actionTypes.FETCH_USED_EMAILS_SUCCESS,
    record
  }
}

function fetchUsedEmailsFailure(error) {
  return {
    type: actionTypes.FETCH_USED_EMAILS_FAILURE,
    error,
  }
}

export function fetchUsedEmails(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingUsedEmails())
    authRequest
      .fetchEntities(`${FURION_INTERNAL_BASE_URL}${USED_EMAILS_API_PATH}`, params)
      .then(res => dispatch(fetchUsedEmailsSuccess(res.data)))
      .catch(error => dispatch(fetchUsedEmailsFailure(error)))
  }
}
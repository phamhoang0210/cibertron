import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  MORPHLING_BASE_URL, MARKETING_TEMPLATES_API_PATH, TRANSACTIONAL_TEMPLATES_API_PATH, TEMPLATES_API_PATH,
  AUTHSERVICE_BASE_URL , AUTHS_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingMarketingTemplates() {
  return {
    type: actionTypes.SET_IS_FETCHING_MARKETING_TEMPLATES,
  }
}

function fetchMarketingTemplatesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_MARKETING_TEMPLATES_SUCCESS,
    records,
    filters,
  }
}

function fetchMarketingTemplatesFailure(error) {
  return {
    type: actionTypes.FETCH_MARKETING_TEMPLATES_FAILURE,
    error,
  }
}

export function fetchMarketingTemplates(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingMarketingTemplates())
    authRequest
      .fetchEntities(`${MORPHLING_BASE_URL}${MARKETING_TEMPLATES_API_PATH}`, params)
      .then(res => {
        dispatch(fetchMarketingTemplatesSuccess(res.data))
        dispatch(fetchUsers(res.data))
      })
      //.then(res => dispatch(fetchMarketingTemplatesSuccess(res.data)))
      .catch(error => dispatch(fetchMarketingTemplatesFailure(error)))
  }
}

function setIsFetchingTransactionalTemplates() {
  return {
    type: actionTypes.SET_IS_FETCHING_TRANSACTIONAL_TEMPLATES,
  }
}

function fetchTransactionalTemplatesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_TRANSACTIONAL_TEMPLATES_SUCCESS,
    records,
    filters,
  }
}

function fetchTransactionalTemplatesFailure(error) {
  return {
    type: actionTypes.FETCH_TRANSACTIONAL_TEMPLATES_FAILURE,
    error,
  }
}

export function fetchTransactionalTemplates(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingTransactionalTemplates())
    authRequest
      .fetchEntities(`${MORPHLING_BASE_URL}${TRANSACTIONAL_TEMPLATES_API_PATH}`, params)
      .then(res => {
        dispatch(fetchTransactionalTemplatesSuccess(res.data))
        dispatch(fetchUsers(res.data))
      })
      //.then(res => dispatch(fetchTransactionalTemplatesSuccess(res.data)))
      .catch(error => dispatch(fetchTransactionalTemplatesFailure(error)))
  }
}

function setIsDeletingTemplate(templateId) {
  return {
    type: actionTypes.SET_IS_DELETING_TEMPLATE,
    templateId,
  }
}

function deleteTemplateSuccess(record) {
  return {
    type: actionTypes.DELETE_TEMPLATE_SUCCESS,
    record,
  }
}

function deleteTemplateFailure(error, templateId) {
  return {
    type: actionTypes.DELETE_TEMPLATE_FAILURE,
    error,
    templateId,
  }
}

export function deleteTemplate(templateId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingTemplate(templateId))
    authRequest
      .deleteEntity(`${MORPHLING_BASE_URL}${TEMPLATES_API_PATH}/${templateId}`)
      .then(res => {
        dispatch(deleteTemplateSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('templateFilters'))
        dispatch(fetchMarketingTemplates(filterParams))
      })
      .catch(error => dispatch(deleteTemplateFailure(error, templateId)))
  }
}

// Fetch users
function setIsFetchingUsers() {
  return {
    type: actionTypes.SET_IS_FETCHING_USERS,
  }
}

function fetchUsersSuccess() {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
  }
}

function fetchUsersFailure(error) {
  return {
    type: actionTypes.FETCH_USERS_FAILURE,
    error,
  }
}

export function fetchUsers(data) {
  return dispatch => {
    dispatch(setIsFetchingUsers())
    var list_user_id = []
    
    if(data.records){
      data.records.map(record => {
        list_user_id.push(record.user_id)
      })
    }
    authRequest
      .fetchEntities(`${AUTHSERVICE_BASE_URL}${AUTHS_API_PATH}`, {'compconds': {'id.in':list_user_id}})
      .then(res => {
        dispatch(setIsFetchingUsers())
        var users = res.data.records
        const users_array = {}

        if(users) {
          users.map(user => {
            users_array[user.id] = user.nickname
          })
        }
        if(data.records && users_array){
          data.records.map(record => {
            record["username"] = users_array[record.user_id]
          })
        }
        // dispatch(fetchTemplatesSuccess(data))
        dispatch(fetchUsersSuccess())
      })
      .catch(error => dispatch(fetchUsersFailure(error)))
  }
}
import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  MORPHLING_BASE_URL, TEMPLATES_API_PATH,
  USERSERVICE_BASE_URL , USERS_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

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
      .then(res => dispatch(fetchUsers(res.data)))
      .catch(error => dispatch(fetchTemplatesFailure(error)))
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
        dispatch(fetchTemplates(filterParams))
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
      .fetchEntities(`${USERSERVICE_BASE_URL}${USERS_API_PATH}`, {'compconds': {'id.in':list_user_id}})
      .then(res => {
        dispatch(setIsFetchingUsers())
        var users = res.data.records
        const users_array = {}

        if(users) {
          users.map(user => {
            users_array[user.id] = user.username
          })
        }
        if(data.records && users_array){
          data.records.map(record => {
            record["username"] = users_array[record.user_id]
          })
        }
        dispatch(fetchTemplatesSuccess(data))
        dispatch(fetchUsersSuccess())
      })
      .catch(error => dispatch(fetchUsersFailure(error)))
  }
}
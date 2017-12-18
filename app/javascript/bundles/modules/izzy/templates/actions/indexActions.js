import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  MORPHLING_BASE_URL, TEMPLATES_API_PATH
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
      .then(res => dispatch(fetchTemplatesSuccess(res.data)))
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

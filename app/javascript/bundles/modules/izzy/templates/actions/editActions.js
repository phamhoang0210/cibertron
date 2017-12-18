import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  MORPHLING_BASE_URL, TEMPLATES_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingTemplate() {
  return {
    type: actionTypes.SET_IS_FETCHING_TEMPLATE,
  }
}

function fetchTemplateSuccess(record) {
  return {
    type: actionTypes.FETCH_TEMPLATE_SUCCESS,
    record,
  }
}

function fetchTemplateFailure(error) {
  return {
    type: actionTypes.FETCH_TEMPLATE_FAILURE,
    error,
  }
}

export function fetchTemplate(templateId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingTemplate())
    authRequest
      .fetchEntities(`${MORPHLING_BASE_URL}${TEMPLATES_API_PATH}/${templateId}`, params)
      .then(res => dispatch(fetchTemplateSuccess(res.data)))
      .catch(error => dispatch(fetchTemplateFailure(error)))
  }
}

function updateTemplateSuccess(record) {
  return {
    type: actionTypes.UPDATE_TEMPLATE_SUCCESS,
    record,
  }
}

function updateTemplateFailure(error, templateId) {
  return {
    type: actionTypes.UPDATE_TEMPLATE_FAILURE,
    error,
    templateId,
  }
}

export function updateTemplate(templateId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingTemplate(templateId))
    authRequest
      .putEntity(`${MORPHLING_BASE_URL}${TEMPLATES_API_PATH}/${templateId}`, params)
      .then(res => dispatch(updateTemplateSuccess(res.data)))
      .catch(error => dispatch(updateTemplateFailure(error, templateId)))
  }
}


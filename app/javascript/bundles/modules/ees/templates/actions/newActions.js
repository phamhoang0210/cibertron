import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {MORPHLING_BASE_URL, TEMPLATES_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsCreatingTemplate() {
  return {
    type: actionTypes.SET_IS_CREATING_TEMPLATE,
  }
}

function createTemplateSucces(record) {
  return {
    type: actionTypes.CREATE_TEMPLATE_SUCCESS,
    record
  }
}

function createTemplateFailure(error) {
  return {
    type: actionTypes.CREATE_TEMPLATE_FAILURE,
    error,
  }
}

export function createTemplate(params = {}) {
  return dispatch => {
    dispatch(setIsCreatingTemplate())

    return authRequest
      .submitEntity(`${MORPHLING_BASE_URL}${TEMPLATES_API_PATH}`, params)
      .then(res => dispatch(createTemplateSucces(res.data)))
      .catch(error => dispatch(createTemplateFailure(error)))
  }
}

export function resetAlert() {
  return dispatch => {
    dispatch({type: ''})
  }
}
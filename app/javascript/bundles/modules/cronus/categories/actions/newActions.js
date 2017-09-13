import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {CRONUS_BASE_URL, CATEGORIES_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsCreatingCategory() {
  return {
    type: actionTypes.SET_IS_CREATING_CATEGORY,
  }
}

function createCategorySuccess(record) {
  return {
    type: actionTypes.CREATE_CATEGORY_SUCCESS,
    record
  }
}

function createCategoryFailure(error) {
  return {
    type: actionTypes.CREATE_CATEGORY_FAILURE,
    error,
  }
}

export function createCategory(params = {}) {
  return dispatch => {
    dispatch(setIsCreatingCategory())

    return authRequest
      .submitEntity(`${CRONUS_BASE_URL}${CATEGORIES_API_PATH}`, params)
      .then(res => dispatch(createCategorySuccess(res.data)))
      .catch(error => dispatch(createCategoryFailure(error)))
  }
}
import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {CATEGORIES_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingCategory() {
  return {
    type: actionTypes.SET_IS_FETCHING_CATEGORY,
  }
}

function fetchCategorySuccess(record) {
  return {
    type: actionTypes.FETCH_CATEGORY_SUCCESS,
    record,
  }
}

function fetchCategoryFailure(error) {
  return {
    type: actionTypes.FETCH_CATEGORY_FAILURE,
    error,
  }
}

export function fetchCategory(categoryId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingCategory())
    authRequest
      .fetchEntities(`${CRONUS_BASE_URL}${CATEGORIES_API_PATH}/${categoryId}`, params)
      .then(res => dispatch(fetchCategorySuccess(res.data)))
      .catch(error => dispatch(fetchCategoryFailure(error)))
  }
}

function setIsUpdatingCategory(categoryId) {
  return {
    type: actionTypes.SET_IS_UPDATING_CATEGORY,
    categoryId,
  }
}

function updateCategorySuccess(record) {
  return {
    type: actionTypes.UPDATE_CATEGORY_SUCCESS,
    record,
  }
}

function updateCategoryFailure(error, categoryId) {
  return {
    type: actionTypes.UPDATE_CATEGORY_FAILURE,
    error,
    categoryId,
  }
}

export function updateCategory(categoryId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingCategory(categoryId))
    authRequest
      .putEntity(`${CRONUS_BASE_URL}${CATEGORIES_API_PATH}/${categoryId}`, params)
      .then(res => dispatch(updateCategorySuccess(res.data)))
      .catch(error => dispatch(updateCategoryFailure(error, categoryId)))
  }
}
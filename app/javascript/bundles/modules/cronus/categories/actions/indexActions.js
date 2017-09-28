import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {CRONUS_BASE_URL, CATEGORIES_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingCategories() {
  return {
    type: actionTypes.SET_IS_FETCHING_CATEGORIES,
  }
}

function fetchCategoriesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_CATEGORIES_SUCCESS,
    records,
    filters,
  }
}

function fetchCategoriesFailure(error) {
  return {
    type: actionTypes.FETCH_CATEGORIES_FAILURE,
    error,
  }
}

export function fetchCategories(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingCategories())
    authRequest
      .fetchEntities(`${CRONUS_BASE_URL}${CATEGORIES_API_PATH}`, params)
      .then(res => dispatch(fetchCategoriesSuccess(res.data)))
      .catch(error => dispatch(fetchCategoriesFailure(error)))
  }
}

function setIsDeletingCategory(categoryId) {
  return {
    type: actionTypes.SET_IS_DELETING_CATEGORY,
    categoryId,
  }
}

function deleteCategorySuccess(record) {
  return {
    type: actionTypes.DELETE_CATEGORY_SUCCESS,
    record,
  }
}

function deleteCategoryFailure(error, categoryId) {
  return {
    type: actionTypes.DELETE_CATEGORY_FAILURE,
    error,
    categoryId,
  }
}

export function deleteCategory(categoryId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingCategory(categoryId))
    authRequest
      .deleteEntity(`${CRONUS_BASE_URL}${CATEGORIES_API_PATH}/${categoryId}`)
      .then(res => {
        dispatch(deleteCategorySuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('categoryFilters'))
        dispatch(fetchCategories(filterParams))
      })
      .catch(error => dispatch(deleteCategoryFailure(error, categoryId)))
  }
}
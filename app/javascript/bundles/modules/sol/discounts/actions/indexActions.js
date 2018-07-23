import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  DISCOUNTS_API_PATH, AUTHS_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingDiscounts() {
  return {
    type: actionTypes.SET_IS_FETCHING_DISCOUNTS,
  }
}

function fetchDiscountsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_DISCOUNTS_SUCCESS,
    records,
    filters,
  }
}

function fetchDiscountsFailure(error) {
  return {
    type: actionTypes.FETCH_DISCOUNTS_FAILURE,
    error,
  }
}

export function fetchDiscounts(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingDiscounts())
    authRequest
      .fetchEntities(`${SOL_BASE_URL}${DISCOUNTS_API_PATH}`, params)
      .then(res => {
        dispatch(fetchDiscountsSuccess(res.data))
        dispatch(fetchUsers(res.data))
      })
      .catch(error => dispatch(fetchDiscountsFailure(error)))
  }
}

function setIsDeletingDiscount(discountId) {
  return {
    type: actionTypes.SET_IS_DELETING_DISCOUNT,
    discountId,
  }
}

function deleteDiscountSuccess(record) {
  return {
    type: actionTypes.DELETE_DISCOUNT_SUCCESS,
    record,
  }
}

function deleteDiscountFailure(error, discountId) {
  return {
    type: actionTypes.DELETE_DISCOUNT_FAILURE,
    error,
    discountId,
  }
}

export function deleteDiscount(discountId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingDiscount(discountId))
    authRequest
      .deleteEntity(`${SOL_BASE_URL}${DISCOUNTS_API_PATH}/${discountId}`)
      .then(res => {
        dispatch(deleteDiscountSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('discountFilters'))
        dispatch(fetchDiscounts(filterParams))
      })
      .catch(error => dispatch(deleteDiscountFailure(error, discountId)))
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
        var users = res.data.records
        const users_array = {}
        if(users) {
          users.map(user => {
            users_array[user.id] = user.nickname
          })
        }
        if(data.records && users_array){
          data.records.map(discount => {
            discount["username"] = users_array[discount.user_id]
          })
        }
        dispatch(fetchDiscountsSuccess(data))
        dispatch(fetchUsersSuccess())
      })
      .catch(error => dispatch(fetchUsersFailure(error)))
  }
}
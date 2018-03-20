import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {DISCOUNTS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsCreatingDiscount() {
  return {
    type: actionTypes.SET_IS_CREATING_DISCOUNT,
  }
}

function createDiscountSucces(record) {
  return {
    type: actionTypes.CREATE_DISCOUNT_SUCCESS,
    record
  }
}

function createDiscountFailure(error) {
  return {
    type: actionTypes.CREATE_DISCOUNT_FAILURE,
    error,
  }
}

export function createDiscount(params = {}) {
  return dispatch => {
    dispatch(setIsCreatingDiscount())

    return authRequest
      .submitEntity(`${SOL_BASE_URL}${DISCOUNTS_API_PATH}`, params)
      .then(res => dispatch(createDiscountSucces(res.data)))
      .catch(error => dispatch(createDiscountFailure(error)))
  }
}
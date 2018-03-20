import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {PRIZES_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsCreatingPrize() {
  return {
    type: actionTypes.SET_IS_CREATING_PRIZE,
  }
}

function createPrizeSucces(record) {
  return {
    type: actionTypes.CREATE_PRIZE_SUCCESS,
    record
  }
}

function createPrizeFailure(error) {
  return {
    type: actionTypes.CREATE_PRIZE_FAILURE,
    error,
  }
}

export function createPrize(params = {}) {
  return dispatch => {
    dispatch(setIsCreatingPrize())

    return authRequest
      .submitEntity(`${SOL_BASE_URL}${PRIZES_API_PATH}`, params)
      .then(res => dispatch(createPrizeSucces(res.data)))
      .catch(error => dispatch(createPrizeFailure(error)))
  }
}
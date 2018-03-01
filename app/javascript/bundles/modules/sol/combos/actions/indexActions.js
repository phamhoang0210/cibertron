import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {COMBOS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingCombos() {
  return {
    type: actionTypes.SET_IS_FETCHING_COMBOS,
  }
}

function fetchCombosSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_COMBOS_SUCCESS,
    records,
    filters,
  }
}

function fetchCombosFailure(error) {
  return {
    type: actionTypes.FETCH_COMBOS_FAILURE,
    error,
  }
}

export function fetchCombos(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingCombos())
    authRequest
      .fetchEntities(`${SOL_BASE_URL}${COMBOS_API_PATH}`, params)
      .then(res => dispatch(fetchCombosSuccess(res.data)))
      .catch(error => dispatch(fetchCombosFailure(error)))
  }
}

function setIsDeletingCombo(comboId) {
  return {
    type: actionTypes.SET_IS_DELETING_COMBO,
    comboId,
  }
}

function deleteComboSuccess(record) {
  return {
    type: actionTypes.DELETE_COMBO_SUCCESS,
    record,
  }
}

function deleteComboFailure(error, comboId) {
  return {
    type: actionTypes.DELETE_COMBO_FAILURE,
    error,
  }
}

export function deleteCombo(comboId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingCombo(comboId))
    authRequest
      .deleteEntity(`${SOL_BASE_URL}${COMBOS_API_PATH}/${comboId}`)
      .then(res => {
        dispatch(deleteComboSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('comboFilters'))
        dispatch(fetchCombos(filterParams))
      })
      .catch(error => dispatch(deleteComboFailure(error, comboId)))
  }
}
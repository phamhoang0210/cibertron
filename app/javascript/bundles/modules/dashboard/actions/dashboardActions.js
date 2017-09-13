import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {SERVICE_INFOS_API_URL} from '../constants/paths'

function setIsFetchingServiceInfos() {
  return {
    type: actionTypes.SET_IS_FETCHING_SERVICE_INFOS,
  }
}

function fetchServiceInfosSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_SERVICE_INFOS_SUCCESS,
    records,
    filters,
  }
}

function fetchServiceInfosFailure(error) {
  return {
    type: actionTypes.FETCH_SERVICE_INFOS_FAILURE,
    error,
  }
}

export function fetchServiceInfos(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingServiceInfos())
    authRequest
      .fetchEntities(SERVICE_INFOS_API_URL, params)
      .then(res => dispatch(fetchServiceInfosSuccess(res.data)))
      .catch(error => dispatch(fetchServiceInfosFailure(error)))
  }
}
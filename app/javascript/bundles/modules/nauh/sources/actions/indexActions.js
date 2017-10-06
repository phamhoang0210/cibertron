import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  AMUN_BASE_URL, SOURCES_API_PATH,
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingSources() {
  return {
    type: actionTypes.SET_IS_FETCHING_SOURCES,
  }
}

function fetchSourcesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_SOURCES_SUCCESS,
    records,
    filters,
  }
}

function fetchSourcesFailure(error) {
  return {
    type: actionTypes.FETCH_SOURCES_FAILURE,
    error,
  }
}

export function fetchSources(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingSources())
    authRequest
      .fetchEntities(`${AMUN_BASE_URL}${SOURCES_API_PATH}`, params)
      .then(res => dispatch(fetchSourcesSuccess(res.data)))
      .catch(error => dispatch(fetchSourcesFailure(error)))
  }
}

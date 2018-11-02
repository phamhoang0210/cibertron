import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  CATALOGS_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'


function setIsFetchingCatalogs() {
  return {
    type: actionTypes.SET_IS_FETCHING_CATALOGS,
  }
}

function fetchCatalogsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_CATALOGS_SUCCESS,
    records,
    filters,
  }
}

function fetchCatalogsFailure(error) {
  return {
    type: actionTypes.FETCH_CATALOGS_FAILURE,
    error,
  }
}

export function fetchCatalogs(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingCatalogs())
    authRequest
      .fetchEntities(`${SOL_BASE_URL}${CATALOGS_API_PATH}`, params)
      .then(res => dispatch(fetchCatalogsSuccess(res.data)))
      .catch(error => dispatch(fetchCatalogsFailure(error)))
  }
}

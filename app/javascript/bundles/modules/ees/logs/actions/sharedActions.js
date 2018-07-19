import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  AUTHS_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'

function setIsFetchingUsers() {
  return {
    type: actionTypes.SET_IS_FETCHING_USERS,
  }
}

function fetchUsersSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    records,
    filters,    
  }
}

function fetchUsersFailure(error) {
  return {
    type: actionTypes.FETCH_USERS_FAILURE,
    error,
  }
}

export function fetchUsers(params = {}) {
  let keyword=""
  if (params['keyword']) {
    keyword = params['keyword']
  }
  return dispatch => {
    dispatch(setIsFetchingUsers())
    authRequest
      .fetchEntities(`${AUTHSERVICE_BASE_URL}${AUTHS_API_PATH}`, {'full_search': keyword})
      .then(res => dispatch(fetchUsersSuccess(res.data)))
      .catch(error => dispatch(fetchUsersFailure(error)))
  }
}
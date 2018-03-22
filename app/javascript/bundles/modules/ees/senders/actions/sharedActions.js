import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  USERSERVICE_BASE_URL,
  USERS_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'

// Fetch users
function setIsFetchingAllUsers() {
  return {
    type: actionTypes.SET_IS_FETCHING_ALL_USERS,
  }
}

function fetchAllUsersSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    records,
    filters,
  }
}

function fetchAllUsersFailure(error) {
  return {
    type: actionTypes.FETCH_ALL_USERS_FAILURE,
    error,
  }
}

export function fetchAllUsers(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingAllUsers())
    authRequest
      .fetchEntities(`${USERSERVICE_BASE_URL}${USERS_API_PATH}`, params)
      .then(res => dispatch(fetchAllUsersSuccess(res.data)))
      .catch(error => dispatch(fetchAllUsersFailure(error)))
  }
}
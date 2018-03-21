import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  NODES_API_PATH, CATEGORIES_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'

function setIsFetchingNodes() {
  return {
    type: actionTypes.SET_IS_FETCHING_NODES,
  }
}

function fetchNodesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_NODES_SUCCESS,
    records,
    filters,
  }
}

function fetchNodesFailure(error) {
  return {
    type: actionTypes.FETCH_NODES_FAILURE,
    error,
  }
}

export function fetchNodes(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingNodes())
    authRequest
      .fetchEntities(`${CRONUS_BASE_URL}${NODES_API_PATH}`, params)
      .then(res => dispatch(fetchNodesSuccess(res.data)))
      .catch(error => dispatch(fetchNodesFailure(error)))
  }
}
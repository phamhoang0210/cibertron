import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {NODES_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsCreatingNode() {
  return {
    type: actionTypes.SET_IS_CREATING_NODE,
  }
}

function createNodeSucces(record) {
  return {
    type: actionTypes.CREATE_NODE_SUCCESS,
    record
  }
}

function createNodeFailure(error) {
  return {
    type: actionTypes.CREATE_NODE_FAILURE,
    error,
  }
}

export function createNode(params = {}) {
  return dispatch => {
    dispatch(setIsCreatingNode())

    return authRequest
      .submitEntity(`${CRONUS_BASE_URL}${NODES_API_PATH}`, params)
      .then(res => dispatch(createNodeSucces(res.data)))
      .catch(error => dispatch(createNodeFailure(error)))
  }
}
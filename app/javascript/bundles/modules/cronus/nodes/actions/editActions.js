import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {CRONUS_BASE_URL, NODES_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingNode() {
  return {
    type: actionTypes.SET_IS_FETCHING_NODE,
  }
}

function fetchNodeSuccess(record) {
  return {
    type: actionTypes.FETCH_NODE_SUCCESS,
    record,
  }
}

function fetchNodeFailure(error) {
  return {
    type: actionTypes.FETCH_NODE_FAILURE,
    error,
  }
}

export function fetchNode(nodeId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingNode())
    authRequest
      .fetchEntities(`${CRONUS_BASE_URL}${NODES_API_PATH}/${nodeId}`, params)
      .then(res => dispatch(fetchNodeSuccess(res.data)))
      .catch(error => dispatch(fetchNodeFailure(error)))
  }
}

function setIsUpdatingNode(nodeId) {
  return {
    type: actionTypes.SET_IS_UPDATING_NODE,
    nodeId,
  }
}

function updateNodeSuccess(record) {
  return {
    type: actionTypes.UPDATE_NODE_SUCCESS,
    record,
  }
}

function updateNodeFailure(error, nodeId) {
  return {
    type: actionTypes.UPDATE_NODE_FAILURE,
    error,
    nodeId,
  }
}

export function updateNode(nodeId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingNode(nodeId))
    authRequest
      .putEntity(`${CRONUS_BASE_URL}${NODES_API_PATH}/${nodeId}`, params)
      .then(res => dispatch(updateNodeSuccess(res.data)))
      .catch(error => dispatch(updateNodeFailure(error, nodeId)))
  }
}
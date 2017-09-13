import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {CRONUS_BASE_URL, NODES_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

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

function setIsDeletingNode(nodeId) {
  return {
    type: actionTypes.SET_IS_DELETING_NODE,
    nodeId,
  }
}

function deleteNodeSuccess(record) {
  return {
    type: actionTypes.DELETE_NODE_SUCCESS,
    record,
  }
}

function deleteNodeFailure(error, nodeId) {
  return {
    type: actionTypes.DELETE_NODE_FAILURE,
    error,
  }
}

export function deleteNode(nodeId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingNode(nodeId))
    authRequest
      .deleteEntity(`${CRONUS_BASE_URL}${NODES_API_PATH}/${nodeId}`)
      .then(res => {
        dispatch(deleteNodeSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('nodeFilters'))
        dispatch(fetchNodes(filterParams))
      })
      .catch(error => dispatch(deleteNodeFailure(error, nodeId)))
  }
}
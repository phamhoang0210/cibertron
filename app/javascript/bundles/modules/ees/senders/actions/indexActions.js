import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  MEEPO_BASE_URL, SENDERS_API_PATH,
  AUTHSERVICE_BASE_URL , AUTHS_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingSenders() {
  return {
    type: actionTypes.SET_IS_FETCHING_SENDERS,
  }
}

function fetchSendersSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_SENDERS_SUCCESS,
    records,
    filters,
  }
}

function fetchSendersFailure(error) {
  return {
    type: actionTypes.FETCH_SENDERS_FAILURE,
    error,
  }
}

export function fetchSenders(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingSenders())
    authRequest
      .fetchEntities(`${MEEPO_BASE_URL}${SENDERS_API_PATH}`, params)
      .then(res => {
        dispatch(fetchSendersSuccess(res.data))
        dispatch(fetchUsers(res.data))
      })
      //.then(res => dispatch(fetchSendersSuccess(res.data)))
      .catch(error => dispatch(fetchSendersFailure(error)))
  }
}

function setIsDeletingSender(senderId) {
  return {
    type: actionTypes.SET_IS_DELETING_SENDER,
    senderId,
  }
}

function deleteSenderSuccess(record) {
  return {
    type: actionTypes.DELETE_SENDER_SUCCESS,
    record,
  }
}

function deleteSenderFailure(error, senderId) {
  return {
    type: actionTypes.DELETE_SENDER_FAILURE,
    error,
    senderId,
  }
}

export function deleteSender(senderId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingSender(senderId))
    authRequest
      .deleteEntity(`${MEEPO_BASE_URL}${SENDERS_API_PATH}/${senderId}`)
      .then(res => {
        dispatch(deleteSenderSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('senderFilters'))
        dispatch(fetchSenders(filterParams))
      })
      .catch(error => dispatch(deleteSenderFailure(error, senderId)))
  }
}

// Fetch users
function setIsFetchingUsers() {
  return {
    type: actionTypes.SET_IS_FETCHING_USERS,
  }
}

function fetchUsersSuccess() {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
  }
}

function fetchUsersFailure(error) {
  return {
    type: actionTypes.FETCH_USERS_FAILURE,
    error,
  }
}

export function fetchUsers(data) {
  return dispatch => {
    dispatch(setIsFetchingUsers())
    var list_user_id = []
    
    if(data.records){
      data.records.map(record => {
        list_user_id.push(record.user_id)
      })
    }
    authRequest
      .fetchEntities(`${AUTHSERVICE_BASE_URL}${AUTHS_API_PATH}`, {'compconds': {'id.in':list_user_id}})
      .then(res => {
        dispatch(setIsFetchingUsers())
        var users = res.data.records
        const users_array = {}

        if(users) {
          users.map(user => {
            users_array[user.id] = user.nickname
          })
        }
        if(data.records && users_array){
          data.records.map(record => {
            record["username"] = users_array[record.user_id]
          })
        }
        dispatch(fetchSendersSuccess(data))
        dispatch(fetchUsersSuccess())
      })
      .catch(error => dispatch(fetchUsersFailure(error)))
  }
}
import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  AIRI_BASE_URL, LISTS_API_PATH,
  AUTHSERVICE_BASE_URL , AUTHS_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingLists() {
  return {
    type: actionTypes.SET_IS_FETCHING_LISTS,
  }
}

function fetchListsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_LISTS_SUCCESS,
    records,
    filters,
  }
}

function fetchListsFailure(error) {
  return {
    type: actionTypes.FETCH_LISTS_FAILURE,
    error,
  }
}

export function fetchLists(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingLists())
    authRequest
      .fetchEntities(`${AIRI_BASE_URL}${LISTS_API_PATH}`, params)
      .then(res => {
        dispatch(fetchListsSuccess(res.data))
        dispatch(fetchStatistics(res.data, params))
        dispatch(fetchUsers(res.data))
      })
      //.then(res => dispatch(fetchListsSuccess(res.data)))
      .catch(error => dispatch(fetchListsFailure(error)))
  }
}

function setIsDeletingList(listId) {
  return {
    type: actionTypes.SET_IS_DELETING_LIST,
    listId,
  }
}

function deleteListSuccess(record) {
  return {
    type: actionTypes.DELETE_LIST_SUCCESS,
    record,
  }
}

function deleteListFailure(error, listId) {
  return {
    type: actionTypes.DELETE_LIST_FAILURE,
    error,
    listId,
  }
}

export function deleteList(listId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingList(listId))
    authRequest
      .deleteEntity(`${AIRI_BASE_URL}${LISTS_API_PATH}/${listId}`)
      .then(res => {
        dispatch(deleteListSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('listFilters'))
        dispatch(fetchLists(filterParams))
      })
      .catch(error => dispatch(deleteListFailure(error, listId)))
  }
}

//Fetch statistics
function setIsFetchingStatistics() {
  return {
    type: actionTypes.SET_IS_FETCHING_STATISTICS,
  }
}

function fetchStatisticsSuccess() {
  return {
    type: actionTypes.FETCH_STATISTICS_SUCCESS,
  }
}

function fetchStatisticsFailure(error) {
  return {
    type: actionTypes.FETCH_STATISTICS_FAILURE,
    error,
  }
}

export function fetchStatistics(data, params) {
  return dispatch => {
    dispatch(setIsFetchingStatistics())
    var list_campaign_id = []
    if(data.records){
      data.records.map(record => {
        list_campaign_id.push(record.id)
      })
    }
    params["fields"] = "id,contact_count"
    authRequest
      .fetchEntities(`${AIRI_BASE_URL}${LISTS_API_PATH}`, params)
      .then(res => {
        var lists = res.data.records
        const lists_statistics = {}

        if(lists) {
          lists.map(list => {
            lists_statistics[list.id] = list
          })
        }
        if(data.records && lists_statistics){
          data.records.map(list => {
            list["contact_count"] = lists_statistics[list.id].contact_count
          })
        }
        dispatch(fetchListsSuccess(data))
      })
      .catch(error => dispatch(fetchStatisticsFailure(error)))
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
        dispatch(fetchListsSuccess(data))
        dispatch(fetchUsersSuccess())
      })
      .catch(error => dispatch(fetchUsersFailure(error)))
  }
}

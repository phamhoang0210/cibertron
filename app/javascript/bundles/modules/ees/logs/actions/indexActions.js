import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  FURION_BASE_URL, LOGS_API_PATH,
  AUTHSERVICE_BASE_URL , AUTHS_API_PATH, 
  GROUPS_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingLogs() {
  return {
    type: actionTypes.SET_IS_FETCHING_LOGS,
  }
}

function fetchLogsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_LOGS_SUCCESS,
    records,
    filters,
  }
}

function fetchLogsFailure(error) {
  return {
    type: actionTypes.FETCH_LOGS_FAILURE,
    error,
  }
}

export function fetchLogs(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingLogs())
    authRequest
      .fetchEntities(`${FURION_BASE_URL}${LOGS_API_PATH}`, params)
      .then(res => {
        dispatch(fetchLogsSuccess(res.data))
      })
      .catch(error => dispatch(fetchLogsFailure(error)))
  }
}

// // Fetch users
// function setIsFetchingUsers() {
//   return {
//     type: actionTypes.SET_IS_FETCHING_USERS,
//   }
// }

// function fetchUsersSuccess() {
//   return {
//     type: actionTypes.FETCH_USERS_SUCCESS,
//   }
// }

// function fetchUsersFailure(error) {
//   return {
//     type: actionTypes.FETCH_USERS_FAILURE,
//     error,
//   }
// }

// export function fetchUsers(data) {
//   return dispatch => {
//     dispatch(setIsFetchingUsers())
//     var list_user_id = []
    
//     if(data.records){
//       data.records.map(record => {
//         list_user_id.push(record.user_id)
//       })
//     }
//     authRequest
//       .fetchEntities(`${AUTHSERVICE_BASE_URL}${AUTHS_API_PATH}`, {'compconds': {'id.in':list_user_id}})
//       .then(res => {
//         dispatch(setIsFetchingUsers())
//         var users = res.data.records
//         const users_array = {}

//         if(users) {
//           users.map(user => {
//             users_array[user.id] = user.nickname
//           })
//         }
//         if(data.records && users_array){
//           data.records.map(record => {
//             record["username"] = users_array[record.user_id]
//           })
//         }
//         dispatch(fetchLogsSuccess(data))
//         dispatch(fetchUsersSuccess())
//       })
//       .catch(error => dispatch(fetchUsersFailure(error)))
//   }
// }

function setIsFetchingGroups() {
  return {
    type: actionTypes.SET_IS_FETCHING_GROUPS,
  }
}

function fetchGroupsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_GROUPS_SUCCESS,
    records,
    filters
  }
}

function fetchGroupsFailure(error) {
  return {
    type: actionTypes.FETCH_GROUPS_FAILURE,
    error,
  }
}

export function fetchGroups(params) {
  return dispatch => {
    dispatch(setIsFetchingGroups())
    authRequest
      .fetchEntities(`${FURION_BASE_URL}${GROUPS_API_PATH}`, params)
      .then(res => dispatch(fetchGroupsSuccess(res.data)))
      .catch(error => dispatch(fetchGroupsFailure(error)))
  }
}
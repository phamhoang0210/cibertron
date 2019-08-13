import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {DOMAINS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingDomainHistoryActions() {
  return {
    type: actionTypes.SET_IS_FETCHING_DOMAIN_HISTORY_ACTIONS,
  }
}

function fetchDomainHistoryActionsSuccess(records) {
  return {
    type: actionTypes.FETCH_DOMAIN_HISTORY_ACTIONS_SUCCESS,
    records,
  }
}

function fetchDomainHistoryActionsFailure(error) {
  return {
    type: actionTypes.FETCH_DOMAIN_HISTORY_ACTIONS_FAILURE,
    error,
  }
}

export function fetchDomainHistoryActions(domainId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingDomainHistoryActions())
    authRequest
      .fetchEntities(`${HERA_BASE_URL}${DOMAINS_API_PATH}/${domainId}/history`, params)
      .then(res => dispatch(fetchDomainHistoryActionsSuccess(res.data)))
      .catch(error => dispatch(fetchDomainHistoryActionsFailure(error)))
  }
}

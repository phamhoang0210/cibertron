import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  CAMPAIGNS_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'

function setIsFetchingListCampaign() {
  return {
    type: actionTypes.SET_IS_FETCHING_LIST_CAMPAIGN,
  }
}

function fetchListCampaignSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_LIST_CAMPAIGN_SUCCESS,
    records,
    filters,
  }
}

function fetchListCampaignFailure(error) {
  return {
    type: actionTypes.FETCH_LIST_CAMPAIGN_FAILURE,
    error,
  }
}

export function fetchListCampaign(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingListCampaign())
    authRequest
      .fetchEntities(`${CRONUS_BASE_URL}${CAMPAIGNS_API_PATH}`, params)
      .then(res => dispatch(fetchListCampaignSuccess(res.data)))
      .catch(error => dispatch(fetchListCampaignFailure(error)))
  }
}
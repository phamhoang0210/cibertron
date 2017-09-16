import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {CRONUS_BASE_URL, CAMPAIGN_BYDATESS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsCreatingCampaignBydate() {
  return {
    type: actionTypes.SET_IS_CREATING_CAMPAIGN_BYDATES,
  }
}

function createCampaignBydateSucces(record) {
  return {
    type: actionTypes.CREATE_CAMPAIGN_BYDATES_SUCCESS,
    record
  }
}

function createCampaignBydateFailure(error) {
  return {
    type: actionTypes.CREATE_CAMPAIGN_BYDATES_FAILURE,
    error,
  }
}

export function createCampaignBydate(params = {}) {
  return dispatch => {
    dispatch(setIsCreatingCampaignBydate())

    return authRequest
      .submitEntity(`${CRONUS_BASE_URL}${CAMPAIGN_BYDATESS_API_PATH}`, params)
      .then(res => dispatch(createCampaignBydateSucces(res.data)))
      .catch(error => dispatch(createCampaignBydateFailure(error)))
  }
}
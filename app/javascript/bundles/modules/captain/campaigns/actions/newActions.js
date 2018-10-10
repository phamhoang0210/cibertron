import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {CAMPAIGNS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsCreatingCampaign() {
  return {
    type: actionTypes.SET_IS_CAP_CREATING_CAMPAIGN,
  }
}

function createCampaignSucces(record) {
  return {
    type: actionTypes.CAP_CREATE_CAMPAIGN_SUCCESS,
    record
  }
}

function createCampaignFailure(error) {
  return {
    type: actionTypes.CAP_CREATE_CAMPAIGN_FAILURE,
    error,
  }
}

export function createCampaign(params = {}) {
  return dispatch => {
    dispatch(setIsCreatingCampaign())

    return authRequest
      .submitEntity(`${CAPTAIN_BASE_URL}${CAMPAIGNS_API_PATH}`, params)
      .then(res => dispatch(createCampaignSucces(res.data)))
      .catch(error => dispatch(createCampaignFailure(error)))
  }
}
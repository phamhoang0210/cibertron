import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {CAMPAIGNS_API_PATH} from '../constants/paths'
>>>>>>> 27e9a6e632b7d2db0a63e08a7946b4e111aa911a
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsCreatingCampaign() {
  return {
    type: actionTypes.SET_IS_CREATING_CAMPAIGN,
  }
}

function createCampaignSucces(record) {
  return {
    type: actionTypes.CREATE_CAMPAIGN_SUCCESS,
    record
  }
}

function createCampaignFailure(error) {
  return {
    type: actionTypes.CREATE_CAMPAIGN_FAILURE,
    error,
  }
}

export function createCampaign(params = {}) {
  return dispatch => {
    dispatch(setIsCreatingCampaign())

    return authRequest
      .submitEntity(`${FURION_INTERNAL_BASE_URL}${CAMPAIGNS_API_PATH}`, params)
      .then(res => dispatch(createCampaignSucces(res.data)))
      .catch(error => dispatch(createCampaignFailure(error)))
  }
}

export function resetAlert() {
  return dispatch => {
    dispatch({type: ''})
  }
}
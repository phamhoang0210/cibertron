import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  campaign: null,
  isFetchingCampaign: false,
  isUpdatingCampaign: false,
})

export default function editReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, campaignId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_CAMPAIGN: {
      return $$state.merge({
        isFetchingCampaign: true,
        alert: null,
        campaign: null,
      })
    }

    case actionTypes.FETCH_CAMPAIGN_SUCCESS: {
      return $$state.merge({
        isFetchingCampaign: false,
        campaign: record,
      })
    }

    case actionTypes.FETCH_CAMPAIGN_FAILURE: {
      return $$state.merge({
        isFetchingCampaign: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_CAMPAIGN: {
      return $$state.merge({
        isUpdatingCampaign: true,
      })
    }

    case actionTypes.UPDATE_CAMPAIGN_SUCCESS: {
      return $$state.merge({
        isUpdatingCampaign: false,
        alert: createSuccessAlert('Campaign was successfully updated'),
      }).update('campaign', campaignItem => (
        campaignItem.merge(record)
      ))
    }

    case actionTypes.UPDATE_CAMPAIGN_FAILURE: {
      return $$state.merge({
        isUpdatingCampaign: false,
        alert: parseError(error)
      })
    }
    default: {
      return $$state
    }
  }
}

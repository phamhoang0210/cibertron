import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  campaignBydate: null,
  isFetchingCampaignBydate: false,
  isUpdatingCampaignBydate: false,
})

export default function editReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, campaignBydateId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_CAMPAIGN_BYDATES: {
      return $$state.merge({
        isFetchingCampaignBydate: true,
        alert: null,
        campaignBydate: null,
      })
    }

    case actionTypes.FETCH_CAMPAIGN_BYDATES_SUCCESS: {
      return $$state.merge({
        isFetchingCampaignBydate: false,
        campaignBydate: record,
      })
    }

    case actionTypes.FETCH_CAMPAIGN_BYDATES_FAILURE: {
      return $$state.merge({
        isFetchingCampaignBydate: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_CAMPAIGN_BYDATES: {
      return $$state.merge({
        isUpdatingCampaignBydate: true,
      })
    }

    case actionTypes.UPDATE_CAMPAIGN_BYDATES_SUCCESS: {
      return $$state.merge({
        isUpdatingCampaignBydate: false,
        campaignBydate: record,
        alert: createSuccessAlert('CampaignBydate was successfully updated'),
      })
    }

    case actionTypes.UPDATE_CAMPAIGN_BYDATES_FAILURE: {
      return $$state.merge({
        isUpdatingCampaignBydate: false,
        alert: parseError(error)
      })
    }
    default: {
      return $$state
    }
  }
}

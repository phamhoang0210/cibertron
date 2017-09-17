import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  campaignBydate: null,
  isCreatingCampaignBydate: false,
})

export default function newReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_CREATING_CAMPAIGN_BYDATES: {
      return $$state.merge({
        isCreatingCampaignBydate: true,
      })
    }

    case actionTypes.CREATE_CAMPAIGN_BYDATES_SUCCESS: {
      return $$state.merge({
        isCreatingCampaignBydate: false,
        campaignBydate: record,
        alert: createSuccessAlert('CampaignBydate was successfully created'),
      })
    }

    case actionTypes.CREATE_CAMPAIGN_BYDATES_FAILURE: {
      return $$state.merge({
        isCreatingCampaignBydate: false,
        alert: parseError(error)
      })
    }

    default: {
      return $$state
    }
  }
}

import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  listCampaign: [],
  isFetchingListCampaigns: false,
})

export default function sharedReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_LIST_CAMPAIGN: {
      return $$state.merge({
        isFetchingListCampaigns: true,
      })
    }

    case actionTypes.FETCH_LIST_CAMPAIGN_SUCCESS: {
      return $$state.merge({
        isFetchingListCampaigns: false,
        listCampaign: records,
      })
    }

    case actionTypes.FETCH_LIST_CAMPAIGN_FAILURE: {
      return $$state.merge({
        isFetchingListCampaigns: false,
      })
    }
    default: {
      return $$state
    }
  }
}

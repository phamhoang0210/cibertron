import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { defaultFilters } from 'app/constants/initialState'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  notification: null,
  campaign: null,
  isFetchingCampaign: false,
  isUpdatingCampaign: false,
  isSendingTest: false,
  alert: null
})

export default function editReducer($$state = initialState, action = null) {
  const {
    type, record, records, filters, error, campaignId,
  } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_CAMPAIGN: {
      return $$state.merge({
        isFetchingCampaign: true,
        notification: null,
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
        notification: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_CAMPAIGN: {
      return $$state.merge({
        isUpdatingCampaign: true,
        notification: null,
      })
    }

    case actionTypes.UPDATE_CAMPAIGN_SUCCESS: {
      return $$state.merge({
        isUpdatingCampaign: false,
        alert: createSuccessAlert('Cập nhật thành công!'),
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

    case actionTypes.SET_IS_SENDING_CAMPAIGN: {
      return $$state.merge({
        isSendingCampaign: true,
        notification: null,
        alert: null,
      })
    }

    case actionTypes.SEND_CAMPAIGN_SUCCESS: {
      return $$state.merge({
        isSendingCampaign: false,
      })
    }

    case actionTypes.SEND_CAMPAIGN_FAILURE: {
      return $$state.merge({
        isSendingCampaign: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_SENDING_TEST: {
      return $$state.merge({
        isSendingTest: true,
      })
    }

    case actionTypes.SEND_TEST_SUCCESS: {
      return $$state.merge({
        isSendingTest: false,
        alert: createSuccessAlert(`Test thành công!`),
      })
    }

    case actionTypes.SEND_TEST_FAILURE: {
      return $$state.merge({
        isSendingTest: false,
        alert: parseError(error)
      })
    }

    default: {
      return $$state
    }
  }
}

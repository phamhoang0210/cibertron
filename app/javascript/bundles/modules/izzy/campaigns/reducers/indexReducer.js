import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { defaultFilters } from 'app/constants/initialState'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'

export const initialState = Immutable.fromJS({
  alert: null,
  campaigns: [],
  campaignFilters: {
    ...defaultFilters,
    fields: ''
  },
  isFetchingCampaigns: false,
  isUpdatingCampaigns: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const {
    type, record, records, filters, error, campaignId,
    campaign, importResult, campaignKeys,
  } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_CAMPAIGNS: {
      return $$state.merge({
        isFetchingCampaigns: true,
      })
    }

    case actionTypes.FETCH_CAMPAIGNS_SUCCESS: {
      return $$state.merge({
        isFetchingCampaigns: false,
        campaigns: records,
        campaignFilters: filters,
      })
    }

    case actionTypes.FETCH_CAMPAIGNS_FAILURE: {
      return $$state.merge({
        isFetchingCampaigns: false,
      })
    }

    case actionTypes.SET_IS_DELETING_CAMPAIGN: {
      return $$state.withMutations(state => (
        state.update('campaigns', campaigns => (
          campaigns.update(
            campaigns.findIndex(c => c.get('id') == campaignId),
            campaignItem => (
              campaignItem.merge({
                isDeleting: true,
              })
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.DELETE_CAMPAIGN_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('campaigns', campaigns => (
          campaigns.update(
            campaigns.findIndex(c => c.get('id') == campaignId),
            campaignItem => (
              campaignItem.merge({
                isDeleting: false,
              })
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.DELETE_CAMPAIGN_FAILURE: {
      return $$state.withMutations(state => (
        state.update('campaigns', campaigns => (
          campaigns.update(
            campaigns.findIndex(c => c.get('id') == campaignId),
            campaignItem => (
              campaignItem.merge({
                isDeleting: false,
              })
            )
          )
        )).merge({
          alert: parseError(error),
        })
      ))
    }

    default: {
      return $$state
    }
  }
}

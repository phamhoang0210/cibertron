import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError } from 'helpers/applicationHelper'
import { defaultFilters } from 'app/constants/initialState'

export const initialState = Immutable.fromJS({
  alert: null,
  campaignBydates: [],
  campaignBydateFilters: {
    ...defaultFilters,
    fields: 'campaign{},category{}'
  },
  isFetchingCampaignBydates: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, campaignBydateId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_CAMPAIGN_BYDATESS: {
      return $$state.merge({
        isFetchingCampaignBydates: true,
      })
    }

    case actionTypes.FETCH_CAMPAIGN_BYDATESS_SUCCESS: {
      return $$state.merge({
        isFetchingCampaignBydates: false,
        campaignBydates: records,
        campaignBydateFilters: filters,
      })
    }

    case actionTypes.FETCH_CAMPAIGN_BYDATESS_FAILURE: {
      return $$state.merge({
        isFetchingCampaignBydates: false,
      })
    }

    case actionTypes.SET_IS_DELETING_CAMPAIGN_BYDATES: {
      $$state.withMutations(state => (
        state.update('campaignBydates', campaignBydates => (
          campaignBydates.update(
            campaignBydates.findIndex(c => c.get('id') == campaignBydateId),
            campaignBydateItem => (
              campaignBydateItem.merge({
                isDeleting: true,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.DELETE_CAMPAIGN_BYDATES_SUCCESS: {
      $$state.withMutations(state => (
        state.update('campaignBydates', campaignBydates => (
          campaignBydates.update(
            campaignBydates.findIndex(c => c.get('id') == campaignBydateId),
            campaignBydateItem => (
              campaignBydateItem.merge({
                isDeleting: false,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.DELETE_CAMPAIGN_BYDATES_FAILURE: {
      $$state.withMutations(state => (
        state.update('campaignBydates', campaignBydates => (
          campaignBydates.update(
            campaignBydates.findIndex(c => c.get('id') == campaignBydateId),
            campaignBydateItem => (
              campaignBydateItem.merge({
                isDeleting: false,
              })
            )
          )
        ))
      ))
    }

    default: {
      return $$state
    }
  }
}

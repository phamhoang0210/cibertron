import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
import { defaultFilters } from 'app/constants/initialState'

export const initialState = Immutable.fromJS({
  alert: null,
  campaigns: [],
  campaignFilters: {
    ...defaultFilters,
    fields: 'node{}'
  },
  importCampaignBydatesResults: [],
  isFetchingCampaigns: false,
  isImportCampaignBydates: false,
  createCampaignBydateAlert: null,
})

export default function indexReducer($$state = initialState, action = null) {
  const {
    type, record, records, filters, error,
    campaignBydateId, campaign, importResult,
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

    case actionTypes.SET_IS_FETCHING_CAMPAIGN_BYDATES: {
      return $$state.withMutations(state => (
        state.update('campaigns', campaigns => (
          campaigns.update(
            campaigns.findIndex(campaignItem => campaignItem.get('id') == campaign.get('id')),
            campaignItem => (
              campaignItem.merge({
                isFetchingCampaignBydates: true,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.FETCH_CAMPAIGN_BYDATES_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('campaigns', campaigns => (
          campaigns.update(
            campaigns.findIndex(campaignItem => campaignItem.get('id') == campaign.get('id')),
            campaignItem => (
              campaignItem.merge({
                isFetchingCampaignBydates: false,
                campaignBydates: records,
                campaignBydateFilters: filters,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.FETCH_CAMPAIGN_BYDATES_FAILURE: {
      return $$state.withMutations(state => (
        state.update('campaigns', campaigns => (
          campaigns.update(
            campaigns.findIndex(campaignItem => campaignItem.get('id') == campaign.get('id')),
            campaignItem => (
              campaignItem.merge({
                isFetchingCampaignBydates: false,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.SET_IS_DELETING_CAMPAIGN_BYDATES: {
      return $$state.withMutations(state => (
        state.update('campaigns', campaigns => (
          campaigns.update(
            campaigns.findIndex(campaignItem => campaignItem.get('id') == campaign.get('id')),
            campaignItem => (
              campaignItem.update('campaignBydates', campaignBydates => (
                campaignBydates.update(
                  campaignBydates.findIndex(campaignBydateItem => campaignBydateItem.get('id') == campaignBydateId),
                  campaignBydateItem => (
                    campaignBydateItem.merge({
                      isDeleting: true
                    })
                  )
                )
              ))
            )
          )
        ))
      ))
    }

    case actionTypes.DELETE_CAMPAIGN_BYDATES_FAILURE: {
      return $$state.withMutations(state => (
        state.update('campaigns', campaigns => (
          campaigns.update(
            campaigns.findIndex(campaignItem => campaignItem.get('id') == campaign.get('id')),
            campaignItem => (
              campaignItem.update('campaignBydates', campaignBydates => (
                campaignBydates.update(
                  campaignBydates.findIndex(campaignBydateItem => campaignBydateItem.get('id') == campaignBydateId),
                  campaignBydateItem => (
                    campaignBydateItem.merge({
                      isDeleting: false,
                    })
                  )
                )
              ))
            )
          )
        ))
      ))
    }

    case actionTypes.SET_IS_UPDATING_CAMPAIGN_BYDATE: {
      return $$state.withMutations(state => (
        state.update('campaigns', campaigns => (
          campaigns.update(
            campaigns.findIndex(campaignItem => campaignItem.get('id') == campaign.get('id')),
            campaignItem => (
              campaignItem.update('campaignBydates', campaignBydates => (
                campaignBydates.update(
                  campaignBydates.findIndex(campaignBydateItem => campaignBydateItem.get('id') == campaignBydateId),
                  campaignBydateItem => (
                    campaignBydateItem.merge({
                      isUpdating: true
                    })
                  )
                )
              ))
            )
          )
        ))
      ))
    }

    case actionTypes.UPDATE_CAMPAIGN_BYDATE_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('campaigns', campaigns => (
          campaigns.update(
            campaigns.findIndex(campaignItem => campaignItem.get('id') == campaign.get('id')),
            campaignItem => (
              campaignItem.update('campaignBydates', campaignBydates => (
                campaignBydates.update(
                  campaignBydates.findIndex(campaignBydateItem => campaignBydateItem.get('id') == campaignBydateId),
                  campaignBydateItem => (
                    campaignBydateItem.merge({
                      ...record,
                      isUpdating: false,
                    })
                  )
                )
              ))
            )
          )
        ))
      ))
    }

    case actionTypes.UPDATE_CAMPAIGN_BYDATE_FAILURE: {
      return $$state.withMutations(state => (
        state.update('campaigns', campaigns => (
          campaigns.update(
            campaigns.findIndex(campaignItem => campaignItem.get('id') == campaign.get('id')),
            campaignItem => (
              campaignItem.update('campaignBydates', campaignBydates => (
                campaignBydates.update(
                  campaignBydates.findIndex(campaignBydateItem => campaignBydateItem.get('id') == campaignBydateId),
                  campaignBydateItem => (
                    campaignBydateItem.merge({
                      isUpdating: false
                    })
                  )
                )
              ))
            )
          )
        ))
      ))
    }

    case actionTypes.SET_IS_CREATING_CAMPAIGN_BYDATE: {
      return $$state.merge({
        isCreatingCampaignBydate: true,
        createCampaignBydateAlert: null,
      })
    }

    case actionTypes.CREATE_CAMPAIGN_BYDATE_SUCCESS: {
      return $$state.merge({
        isCreatingCampaignBydate: false,
        createCampaignBydateAlert: createSuccessAlert('CampaignBydate was successfully created'),
      })
    }

    case actionTypes.CREATE_CAMPAIGN_BYDATE_FAILURE: {
      return $$state.merge({
        isCreatingCampaignBydate: false,
        createCampaignBydateAlert: parseError(error)
      })
    }

    case actionTypes.SET_IS_IMPORTING_CAMPAIGN_BYDATES: {
      return $$state.merge({
        importCampaignBydatesResults: [],
        isImportCampaignBydates: true,
      })
    }

    case actionTypes.IMPORT_CAMPAIGN_BYDATES_SUCCESS: {
      return $$state.merge({
        importCampaignBydatesResults: importResult,
        isImportCampaignBydates: false,
      })
    }

    case actionTypes.IMPORT_CAMPAIGN_BYDATES_FAILURE: {
      return $$state.merge({
        importCampaignBydatesResults: [],
        isImportCampaignBydates: false,
      })
    }

    default: {
      return $$state
    }
  }
}

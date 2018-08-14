import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { defaultFilters } from 'app/constants/initialState'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'

export const initialState = Immutable.fromJS({
  alert: null,
  campaign: [],
  importCampaignsResults: [],
  selectedLeadKeys: [],
  campaignsFilters: {
    ...defaultFilters,
    fields: 'campaign_name{},campaign_status{}, utm{},last_lead_care_history,count_lead_care_history'
  },
  isFetchingCampaigns: false,
  // isImportingLeads: false,
  // isUpdatingLeads: false,
  // isRecoveringLeads: false,
})
export default function indexReducer($$state = initialState, action = null) {
  const {
    type, record, records, filters, error, campaignId,
    lead, importResult, leadKeys,
  } = action

  switch (type) {
    case actionTypes.SET_IS_FETCHING_CAMPAIGNS: {
      return $$state.merge({
        isFetchingLeads: true,
      })
    }

    case actionTypes.FETCH_CAMPAIGNS_SUCCESS: {
      return $$state.merge({
        isFetchingLeads: false,
        campaign: records,
        filters: filters,
      })
    }

    case actionTypes.FETCH_LEADS_FAILURE: {
      return $$state.merge({
        isFetchingLeads: false,
      })
    }

    case actionTypes.SET_IS_DELETING_CAMPAIGN: {
      return $$state.withMutations(state => (
        state.update('campaign', campaign => (
          campaign.update(
            campaign.findIndex(c => c.get('id') == campaignId),
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
        state.update('campaign', campaign => (
          campaign.update(
            campaign.findIndex(c => c.get('id') == campaignId),
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
        state.update('campaign', campaign => (
          campaign.update(
            campaign.findIndex(c => c.get('id') == campaignId),
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

    case actionTypes.SET_IS_FETCHING_CAMPAIGN_ORDERS: {
      return $$state.withMutations(state => (
        state.update('campaign', campaign => (
          campaign.update(
            campaign.findIndex(campaignItem => campaignItem.get('id') == campaign.get('id')),
            campaignItem => (
              campaignItem.merge({
                isFetchingOrders: true,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.FETCH_CAMPAIGN_ORDERS_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('campaign', campaign => (
          campaign.update(
            campaign.findIndex(campaignItem => campaignItem.get('id') == campaign.get('id')),
            campaignItem => (
              campaignItem.merge({
                isFetchingOrders: false,
                orders: records,
                orderFilters: filters,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.FETCH_LEAD_ORDERS_FAILURE: {
      return $$state.withMutations(state => (
        state.update('leads', leads => (
          leads.update(
            leads.findIndex(leadItem => leadItem.get('id') == lead.get('id')),
            leadItem => (
              leadItem.merge({
                isFetchingOrders: false,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.SET_IS_FETCHING_EMAIL_LEADS: {
      return $$state.withMutations(state => (
        state.update('leads', leads => (
          leads.update(
            leads.findIndex(leadItem => leadItem.get('id') == lead.get('id')),
            leadItem => (
              leadItem.merge({
                isFetchingEmailLeads: true,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.FETCH_EMAIL_LEADS_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('leads', leads => (
          leads.update(
            leads.findIndex(leadItem => leadItem.get('id') == lead.get('id')),
            leadItem => (
              leadItem.merge({
                isFetchingEmailLeads: false,
                emailLeads: records,
                emailLeadFilters: filters,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.FETCH_EMAIL_LEADS_FAILURE: {
      return $$state.withMutations(state => (
        state.update('leads', leads => (
          leads.update(
            leads.findIndex(leadItem => leadItem.get('id') == lead.get('id')),
            leadItem => (
              leadItem.merge({
                isFetchingEmailLeads: false,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.SET_IS_IMPORTING_LEADS: {
      return $$state.merge({
        importLeadsResults: [],
        isImportingLeads: true,
      })
    }

    case actionTypes.IMPORT_LEADS_SUCCESS: {
      return $$state.merge({
        importLeadsResults: importResult,
        isImportingLeads: false,
      })
    }

    case actionTypes.IMPORT_LEADS_FAILURE: {
      return $$state.merge({
        importLeadsResults: [],
        isImportingLeads: false,
      })
    }

    case actionTypes.SET_IS_UPDATING_LEAD_ATTRS: {
      return $$state.withMutations(state => (
        state.update('leads', leads => (
          leads.update(
            leads.findIndex(leadItem => leadItem.get('id') == leadId),
            leadItem => (
              leadItem.merge({isUpdating: true})
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.UPDATE_CAMPAIGN_ATTRS_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('leads', leads => (
          leads.update(
            leads.findIndex(leadItem => leadItem.get('id') == record.id),
            leadItem => (
              leadItem.merge({...record, isUpdating: false})
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.UPDATE_LEAD_ATTRS_FAILURE: {
      return $$state.withMutations(state => (
        state.update('leads', leads => (
          leads.update(
            leads.findIndex(leadItem => leadItem.get('id') == leadId),
            leadItem => (
              leadItem.merge({isUpdating: false})
            )
          )
        )).merge({
          alert: parseError(error),
        })
      ))
    }

    case actionTypes.UPDATE_SELECTED_LEAD_KEYS: {
      return $$state.merge({
        selectedLeadKeys: leadKeys,
      })
    }

    case actionTypes.SET_IS_UPDATING_LEADS: {
      return $$state.merge({
        isUpdatingLeads: true,
      })
    }

    case actionTypes.UPDATE_LEADS_SUCCESS: {
      return $$state.merge({
        isUpdatingLeads: false,
      })
    }

    case actionTypes.UPDATE_LEADS_FAILURE: {
      return $$state.merge({
        isUpdatingLeads: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_LEAD_LEAD_CARE_HISTORIES: {
      return $$state.withMutations(state => (
        state.update('leads', leads => (
          leads.update(
            leads.findIndex(leadItem => leadItem.get('id') == lead.get('id')),
            leadItem => (
              leadItem.merge({
                isFetchingLeadCareHistories: true,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.FETCH_LEAD_LEAD_CARE_HISTORIES_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('leads', leads => (
          leads.update(
            leads.findIndex(leadItem => leadItem.get('id') == lead.get('id')),
            leadItem => (
              leadItem.merge({
                isFetchingLeadCareHistories: false,
                leadCareHistories: records,
                leadCareHistoryFilters: filters,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.FETCH_LEAD_LEAD_CARE_HISTORIES_FAILURE: {
      return $$state.withMutations(state => (
        state.update('leads', leads => (
          leads.update(
            leads.findIndex(leadItem => leadItem.get('id') == lead.get('id')),
            leadItem => (
              leadItem.merge({
                isFetchingLeadCareHistories: false,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.SET_IS_RECOVERING_LEADS: {
      return $$state.merge({
        isRecoveringLeads: true,
      })
    }

    case actionTypes.RECOVERING_LEADS_SUCCESS: {
      return $$state.merge({
        isRecoveringLeads: false,
      })
    }

    case actionTypes.RECOVERING_LEADS_FAILURE: {
      return $$state.merge({
        isRecoveringLeads: false,
      })
    }

    default: {
      return $$state
    }
  }
}

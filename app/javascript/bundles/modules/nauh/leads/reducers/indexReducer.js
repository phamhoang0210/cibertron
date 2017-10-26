import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { defaultFilters } from 'app/constants/initialState'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'

export const initialState = Immutable.fromJS({
  alert: null,
  leads: [],
  importLeadsResults: [],
  selectedLeadKeys: [],
  leadFilters: {
    ...defaultFilters,
    fields: 'lead_level{},care_status{},last_call_log'
  },
  isFetchingLeads: false,
  isImportingLeads: false,
  isUpdatingLeads: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const {
    type, record, records, filters, error, leadId,
    lead, importResult, leadKeys,
  } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_LEADS: {
      return $$state.merge({
        isFetchingLeads: true,
      })
    }

    case actionTypes.FETCH_LEADS_SUCCESS: {
      return $$state.merge({
        isFetchingLeads: false,
        leads: records,
        leadFilters: filters,
      })
    }

    case actionTypes.FETCH_LEADS_FAILURE: {
      return $$state.merge({
        isFetchingLeads: false,
      })
    }

    case actionTypes.SET_IS_DELETING_LEAD: {
      return $$state.withMutations(state => (
        state.update('leads', leads => (
          leads.update(
            leads.findIndex(c => c.get('id') == leadId),
            leadItem => (
              leadItem.merge({
                isDeleting: true,
              })
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.DELETE_LEAD_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('leads', leads => (
          leads.update(
            leads.findIndex(c => c.get('id') == leadId),
            leadItem => (
              leadItem.merge({
                isDeleting: false,
              })
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.DELETE_LEAD_FAILURE: {
      return $$state.withMutations(state => (
        state.update('leads', leads => (
          leads.update(
            leads.findIndex(c => c.get('id') == leadId),
            leadItem => (
              leadItem.merge({
                isDeleting: false,
              })
            )
          )
        )).merge({
          alert: parseError(error),
        })
      ))
    }

    case actionTypes.SET_IS_FETCHING_LEAD_ORDERS: {
      return $$state.withMutations(state => (
        state.update('leads', leads => (
          leads.update(
            leads.findIndex(leadItem => leadItem.get('id') == lead.get('id')),
            leadItem => (
              leadItem.merge({
                isFetchingOrders: true,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.FETCH_LEAD_ORDERS_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('leads', leads => (
          leads.update(
            leads.findIndex(leadItem => leadItem.get('id') == lead.get('id')),
            leadItem => (
              leadItem.merge({
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

    case actionTypes.UPDATE_LEAD_ATTRS_SUCCESS: {
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

    case actionTypes.SET_IS_FETCHING_LEAD_CALL_LOGS: {
      return $$state.withMutations(state => (
        state.update('leads', leads => (
          leads.update(
            leads.findIndex(leadItem => leadItem.get('id') == lead.get('id')),
            leadItem => (
              leadItem.merge({
                isFetchingCallLogs: true,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.FETCH_LEAD_CALL_LOGS_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('leads', leads => (
          leads.update(
            leads.findIndex(leadItem => leadItem.get('id') == lead.get('id')),
            leadItem => (
              leadItem.merge({
                isFetchingCallLogs: false,
                callLogs: records,
                callLogFilters: filters,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.FETCH_LEAD_CALL_LOGS_FAILURE: {
      return $$state.withMutations(state => (
        state.update('leads', leads => (
          leads.update(
            leads.findIndex(leadItem => leadItem.get('id') == lead.get('id')),
            leadItem => (
              leadItem.merge({
                isFetchingCallLogs: false,
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

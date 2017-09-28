import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { defaultFilters } from 'app/constants/initialState'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'

export const initialState = Immutable.fromJS({
  alert: null,
  leads: [],
  leadFilters: {
    ...defaultFilters,
    fields: 'lead_level{}'
  },
  isFetchingLeads: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const {
    type, record, records, filters, error, leadId,
    lead,
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

    default: {
      return $$state
    }
  }
}

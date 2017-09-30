import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
import { defaultFilters } from 'app/constants/initialState'

export const initialState = Immutable.fromJS({
  alert: null,
  leads: [],
  leadFilters: {
    ...defaultFilters,
    fields: 'node{}'
  },
  isFetchingLeads: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, leadId } = action
  
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

    default: {
      return $$state
    }
  }
}

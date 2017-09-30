import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  leadReport: [],
  assignResults: {},
  isFetchingLeadReport: false,
  isAssigningLeads: false,
  alert: null,
})

export default function assignReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, leadReport, assignResults } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_LEAD_REPORT: {
      return $$state.merge({
        isFetchingLeadReport: true,
      })
    }

    case actionTypes.FETCH_LEAD_REPORT_SUCCESS: {
      return $$state.merge({
        isFetchingLeadReport: false,
        leadReport: leadReport,
      })
    }

    case actionTypes.FETCH_LEAD_REPORT_FAILURE: {
      return $$state.merge({
        isFetchingLeadReport: false,
      })
    }

    case actionTypes.SET_IS_ASSIGNING_LEADS: {
      return $$state.merge({
        isAssigningLeads: true,
        alert: null,
      })
    }

    case actionTypes.ASSIGN_LEAD_SUCCESS: {
      return $$state.merge({
        isAssigningLeads: false,
        assignResults,
        alert: null,
      })
    }

    case actionTypes.ASSIGN_LEAD_FAILURE: {
      return $$state.merge({
        isAssigningLeads: false,
        alert: parseError(error),
      })
    }
    default: {
      return $$state
    }
  }
}

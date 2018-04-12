import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  leadReporting: [],
  reportResults: {},
  isFetchingLeadReporting: false,
  isReportingLeads: false,
  alert: null,
})

export default function reportReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, leadReporting, reportResults } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_REPORT: {
      return $$state.merge({
        isFetchingLeadReporting: true,
      })
    }

    case actionTypes.FETCH_REPORT_SUCCESS: {
      return $$state.merge({
        isFetchingLeadReporting: false,
          leadReporting: leadReporting,
      })
    }

    case actionTypes.FETCH_REPORT_FAILURE: {
      return $$state.merge({
        isFetchingLeadReporting: false,
      })
    }

    case actionTypes.SET_IS_REPORT_LEADS: {
      return $$state.merge({
        isReportingLeads: true,
        alert: null,
      })
    }

    case actionTypes.REPORT_LEAD_SUCCESS: {
      return $$state.merge({
        isReportingLeads: false,
        reportResults,
        alert: null,
      })
    }

    case actionTypes.REPORT_LEAD_FAILURE: {
      return $$state.merge({
        isReportingLeads: false,
          alert: null,
        // alert: parseError(error),
      })
    }
    default: {
      return $$state
    }
  }
}

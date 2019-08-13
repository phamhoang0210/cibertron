import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
import { defaultFilters } from 'app/constants/initialState'

export const initialState = Immutable.fromJS({
  alert: null,
  domainHistoryActions: [],
  users: [],
  isFetchingDomainHistoryActions: false,
})

export default function historyReducer($$state = initialState, action = null) {
	const { type, record, records, error, domainId } = action

	switch (type) {
		case actionTypes.SET_IS_FETCHING_DOMAIN_HISTORY_ACTIONS: {
      return $$state.merge({
        isFetchingDomainHistoryactions: true,
      })
    }

    case actionTypes.FETCH_DOMAIN_HISTORY_ACTIONS_SUCCESS: {
      return $$state.merge({
        isFetchingDomainHistoryactions: false,
        domainHistoryActions: records,
      })
    }

    case actionTypes.FETCH_DOMAIN_HISTORY_ACTIONS_FAILURE: {
      return $$state.merge({
        isFetchingDomainHistoryactions: false,
      })
    }
		default: {
      return $$state
    }
	}
}
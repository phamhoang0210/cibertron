import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'

export const initialState = Immutable.fromJS({
  alert: null,
  domainHistoryActions: [],
  domainHistorySwitchs: [],
  users: [],
  isFetchingDomainHistoryActions: false,
  isFetchingDomainHistorySwitchs: false,

  versions: [],
  domain: null,
  isFetchVersions: false,
  isFetchingDomain: false,
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

    case actionTypes.SET_IS_FETCHING_DOMAIN: {
      return $$state.merge({
        isFetchingDomain: true,
        domain: null,
      })
    }

    case actionTypes.FETCH_DOMAIN_SUCCESS: {
      return $$state.merge({
        isFetchingDomain: false,
        domain: record,
      })
    }

    case actionTypes.FETCH_DOMAIN_FAILURE: {
      return $$state.merge({
        isFetchingDomain: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_VERSIONS: {
      return $$state.merge({
        isFetchVersions: true,
      })
    }

    case actionTypes.FETCH_VERSIONS_SUCCESS: {
      return $$state.merge({
        isFetchVersions:false,
        versions: records,
      })
    }

    case actionTypes.FETCH_VERSIONS_FAILURE: {
      return $$state.merge({
        isFetchVersions: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_DOMAIN_HISTORY_SWITCHS: {
      return $$state.merge({
        isFetchDomainHistorySwitchs: true,
      })
    }

    case actionTypes.FETCH_DOMAIN_HISTORY_SWITCHS_SUCCESS: {
      return $$state.merge({
        isFetchDomainHistorySwitchs:false,
        domainHistorySwitchs: records,
      })
    }

    case actionTypes.FETCH_DOMAIN_HISTORY_SWITCHS_FAILURE: {
      return $$state.merge({
        isFetchDomainHistorySwitchs: false,
      })
    }

		default: {
      return $$state
    }
	}
}
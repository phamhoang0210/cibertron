import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
import { defaultFilters } from 'app/constants/initialState'

export const initialState = Immutable.fromJS({
  versions: [],
  domain: null,
  isFetchVersions: false,
  isFetchingDomain: false,
})

export default function versionReducer($$state = initialState, action=null){
  const {type, record, records} = action

  switch (type) {

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
    default: {
      return $$state
    }
  }
}
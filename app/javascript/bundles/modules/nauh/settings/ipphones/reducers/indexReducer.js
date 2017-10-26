import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
import { defaultFilters } from 'app/constants/initialState'

export const initialState = Immutable.fromJS({
  alert: null,
  ipphones: [],
  ipphoneFilters: {
    ...defaultFilters,
    fields: 'provider{},category{}'
  },
  isFetchingIpphones: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, ipphoneId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_IPPHONES: {
      return $$state.merge({
        isFetchingIpphones: true,
      })
    }

    case actionTypes.FETCH_IPPHONES_SUCCESS: {
      return $$state.merge({
        isFetchingIpphones: false,
        ipphones: records,
        ipphoneFilters: filters,
      })
    }

    case actionTypes.FETCH_IPPHONES_FAILURE: {
      return $$state.merge({
        isFetchingIpphones: false,
      })
    }

    case actionTypes.SET_IS_DELETING_IPPHONE: {
      return $$state.withMutations(state => (
        state.update('ipphones', ipphones => (
          ipphones.update(
            ipphones.findIndex(c => c.get('id') == ipphoneId),
            ipphoneItem => (
              ipphoneItem.merge({
                isDeleting: true,
              })
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.DELETE_IPPHONE_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('ipphones', ipphones => (
          ipphones.update(
            ipphones.findIndex(c => c.get('id') == ipphoneId),
            ipphoneItem => (
              ipphoneItem.merge({
                isDeleting: false,
              })
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.DELETE_IPPHONE_FAILURE: {
      return $$state.withMutations(state => (
        state.update('ipphones', ipphones => (
          ipphones.update(
            ipphones.findIndex(c => c.get('id') == ipphoneId),
            ipphoneItem => (
              ipphoneItem.merge({
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

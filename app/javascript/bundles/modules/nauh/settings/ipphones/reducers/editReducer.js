import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  ipphone: null,
  isFetchingIpphone: false,
  isUpdatingIpphone: false,
})

export default function editReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, ipphoneId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_IPPHONE: {
      return $$state.merge({
        isFetchingIpphone: true,
        alert: null,
        ipphone: null,
      })
    }

    case actionTypes.FETCH_IPPHONE_SUCCESS: {
      return $$state.merge({
        isFetchingIpphone: false,
        ipphone: record,
      })
    }

    case actionTypes.FETCH_IPPHONE_FAILURE: {
      return $$state.merge({
        isFetchingIpphone: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_IPPHONE: {
      return $$state.merge({
        isUpdatingIpphone: true,
      })
    }

    case actionTypes.UPDATE_IPPHONE_SUCCESS: {
      return $$state.merge({
        isUpdatingIpphone: false,
        alert: createSuccessAlert('Ipphone was successfully updated'),
      }).update('ipphone', ipphoneItem => (
        ipphoneItem.merge(record)
      ))
    }

    case actionTypes.UPDATE_IPPHONE_FAILURE: {
      return $$state.merge({
        isUpdatingIpphone: false,
        alert: parseError(error)
      })
    }
    default: {
      return $$state
    }
  }
}

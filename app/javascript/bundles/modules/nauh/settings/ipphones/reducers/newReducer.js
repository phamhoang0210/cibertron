import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  ipphone: null,
  isCreatingIpphone: false,
})

export default function newReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_CREATING_IPPHONE: {
      return $$state.merge({
        isCreatingIpphone: true,
      })
    }

    case actionTypes.CREATE_IPPHONE_SUCCESS: {
      return $$state.merge({
        isCreatingIpphone: false,
        ipphone: record,
        alert: createSuccessAlert(`Ipphone was successfully created.`),
      })
    }

    case actionTypes.CREATE_IPPHONE_FAILURE: {
      return $$state.merge({
        isCreatingIpphone: false,
        alert: parseError(error)
      })
    }

    default: {
      return $$state
    }
  }
}

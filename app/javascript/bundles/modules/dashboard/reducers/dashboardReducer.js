import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'

export const initialState = Immutable.fromJS({
  serviceInfos: [],
  isFetchingServiceInfos: false,
})

export default function dashboardReducer($$state = initialState, action) {
  const { type, record, records, filters, error } = action
  switch (type) {
    case actionTypes.SET_IS_FETCHING_SERVICE_INFOS: {
      return $$state.merge({
        isFetchingServiceInfos: true,
      })
    }

    case actionTypes.FETCH_SERVICE_INFOS_SUCCESS: {
      return $$state.merge({
        isFetchingServiceInfos: false,
        serviceInfos: records,
      })
    }

    case actionTypes.FETCH_SERVICE_INFOS_FAILURE: {
      return $$state.merge({
        isFetchingServiceInfos: false,
      })
    }
    default:
      return $$state
  }
}

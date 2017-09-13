import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  channels: [],
  categories: [],
  isFetchingChannels: false,
  isFetchingCategories: false,
})

export default function sharedReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_CHANNELS: {
      return $$state.merge({
        isFetchingChannels: true,
      })
    }

    case actionTypes.FETCH_CHANNELS_SUCCESS: {
      return $$state.merge({
        isFetchingChannels: false,
        channels: records,
      })
    }

    case actionTypes.FETCH_CHANNELS_FAILURE: {
      return $$state.merge({
        isFetchingChannels: false,
      })
    }
    
    default: {
      return $$state
    }
  }
}

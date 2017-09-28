import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
import { defaultFilters } from 'app/constants/initialState'

export const initialState = Immutable.fromJS({
  alert: null,
  channels: [],
  channelFilters: {
    ...defaultFilters,
    fields: 'provider{},category{}'
  },
  isFetchingChannels: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, channelId } = action
  
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
        channelFilters: filters,
      })
    }

    case actionTypes.FETCH_CHANNELS_FAILURE: {
      return $$state.merge({
        isFetchingChannels: false,
      })
    }

    case actionTypes.SET_IS_DELETING_CHANNEL: {
      return $$state.withMutations(state => (
        state.update('channels', channels => (
          channels.update(
            channels.findIndex(c => c.get('id') == channelId),
            channelItem => (
              channelItem.merge({
                isDeleting: true,
              })
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.DELETE_CHANNEL_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('channels', channels => (
          channels.update(
            channels.findIndex(c => c.get('id') == channelId),
            channelItem => (
              channelItem.merge({
                isDeleting: false,
              })
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.DELETE_CHANNEL_FAILURE: {
      return $$state.withMutations(state => (
        state.update('channels', channels => (
          channels.update(
            channels.findIndex(c => c.get('id') == channelId),
            channelItem => (
              channelItem.merge({
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

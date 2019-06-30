import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  domainDnsServers: [
    { id: 'pageserver.instapage.com', title: 'Instapage' },
    { id: 'cname.landingi.com', title: 'Landingi' },
    { id: 'landingpages.pedia.vn', title: 'Custom' },
    { id: 'ssl.ladipage.vn', title: 'Ladipage' },
    { id: 'unbouncepages.com', title: 'Unbounce' },
    { id: 'tls.wishpond.com', title: 'Wishpond' },
  ],
  allusers: [],
  isFetchingAllUsers: false,
  userIdMappings: {},
})

export default function sharedReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action

  const recordIdMappings = {}
  if(records) {
    records.forEach(record => recordIdMappings[record.id] = record)
  }
  switch (type) {

    case actionTypes.SET_IS_FETCHING_ALL_USERS: {
      return $$state.merge({
        isFetchingAllUsers: true,
      })
    }

    case actionTypes.FETCH_ALL_USERS_SUCCESS: {
      return $$state.merge({
        isFetchingAllUsers: true,
        allusers: records,
        userIdMappings: recordIdMappings,
      })
    }

    case actionTypes.FETCH_ALL_USERS_FAILURE: {
      return $$state.merge({
        isFetchingAllUsers: false,
      })
    }

    default: {
      return $$state
    }
  }
}

import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  domainDnsServers: [
    { id: 'pageserver.instapage.com', title: 'Instapage' },
    { id: 'landing_pages.pedia.vn', title: 'Custom' },
  ],
})

export default function sharedReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    default: {
      return $$state
    }
  }
}

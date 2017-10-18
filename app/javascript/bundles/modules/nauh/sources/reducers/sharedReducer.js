import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'

export const initialState = Immutable.fromJS({
  contacta3Statuses: [
    {id: 'new', name: 'new'},
    {id: 'handed_over', name: 'handed_over'},
  ]
})

export default function sharedReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  switch (type) {
    default: {
      return $$state
    }
  }
}

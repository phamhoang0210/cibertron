import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'

export const initialState = Immutable.fromJS({})

export default function authReducer($$state = initialState, action = null) {
  const { type, records, filters, error } = action

  switch (type) {
    default: {
      return $$state
    }
  }
}

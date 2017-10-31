import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  companies: [],
  supDepartments: [],
  isFetchingCompanies: false,
  isFetchingSupDepartments: false,
})

export default function sharedReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_COMPANIES: {
      return $$state.merge({
        isFetchingCompanies: true,
      })
    }

    case actionTypes.FETCH_COMPANIES_SUCCESS: {
      return $$state.merge({
        isFetchingCompanies: false,
        companies: records,
      })
    }

    case actionTypes.FETCH_COMPANIES_FAILURE: {
      return $$state.merge({
        isFetchingCompanies: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_SUP_DEPARTMENTS: {
      return $$state.merge({
        isFetchingSupDepartments: true,
      })
    }

    case actionTypes.FETCH_SUP_DEPARTMENTS_SUCCESS: {
      return $$state.merge({
        isFetchingSupDepartments: false,
        supDepartments: records,
      })
    }

    case actionTypes.FETCH_SUP_DEPARTMENTS_FAILURE: {
      return $$state.merge({
        isFetchingSupDepartments: false,
      })
    }

    default: {
      return $$state
    }
  }
}

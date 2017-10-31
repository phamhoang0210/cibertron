import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  company: null,
  isFetchingCompany: false,
  isUpdatingCompany: false,
})

export default function editReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, companyId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_COMPANY: {
      return $$state.merge({
        isFetchingCompany: true,
        alert: null,
        company: null,
      })
    }

    case actionTypes.FETCH_COMPANY_SUCCESS: {
      return $$state.merge({
        isFetchingCompany: false,
        company: record,
      })
    }

    case actionTypes.FETCH_COMPANY_FAILURE: {
      return $$state.merge({
        isFetchingCompany: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_COMPANY: {
      return $$state.merge({
        isUpdatingCompany: true,
      })
    }

    case actionTypes.UPDATE_COMPANY_SUCCESS: {
      return $$state.merge({
        isUpdatingCompany: false,
        company: record,
        alert: createSuccessAlert('Company was successfully updated'),
      }).update('company', companyItem => (
        companyItem.merge(record)
      ))
    }

    case actionTypes.UPDATE_COMPANY_FAILURE: {
      return $$state.merge({
        isUpdatingCompany: false,
        alert: parseError(error)
      })
    }
    default: {
      return $$state
    }
  }
}

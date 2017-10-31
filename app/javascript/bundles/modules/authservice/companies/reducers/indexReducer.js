import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError } from 'helpers/applicationHelper'
import { defaultFilters } from 'app/constants/initialState'

export const initialState = Immutable.fromJS({
  alert: null,
  notification: null,
  companies: [],
  companyFilters: {
    ...defaultFilters,
    fields: 'sup_company{},company{}'
  },
  isFetchingCompanies: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, companyId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_COMPANIES: {
      return $$state.merge({
        isFetchingCompanies: true,
        notification: null,
      })
    }

    case actionTypes.FETCH_COMPANIES_SUCCESS: {
      return $$state.merge({
        isFetchingCompanies: false,
        companies: records,
        companyFilters: filters,
      })
    }

    case actionTypes.FETCH_COMPANIES_FAILURE: {
      return $$state.merge({
        isFetchingCompanies: false,
        notification: parseError(error),
      })
    }

    case actionTypes.SET_IS_DELETING_COMPANY: {
      return $$state.withMutations(state => (
        state.update('companies', companies => (
          companies.update(
            companies.findIndex(c => c.get('id') == companyId),
            companyItem => (
              companyItem.merge({
                isDeleting: true,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.DELETE_COMPANY_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('companies', companies => (
          companies.update(
            companies.findIndex(c => c.get('id') == companyId),
            companyItem => (
              companyItem.merge({
                isDeleting: false,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.DELETE_COMPANY_FAILURE: {
      return $$state.withMutations(state => (
        state.update('companies', companies => (
          companies.update(
            companies.findIndex(c => c.get('id') == companyId),
            companyItem => (
              companyItem.merge({
                isDeleting: false,
              })
            )
          )
        ))
      ))
    }

    default: {
      return $$state
    }
  }
}

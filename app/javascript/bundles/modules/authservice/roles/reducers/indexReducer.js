import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError } from 'helpers/applicationHelper'
import { defaultFilters } from 'app/constants/initialState'

export const initialState = Immutable.fromJS({
  alert: null,
  notification: null,
  roles: [],
  roleFilters: {
    ...defaultFilters,
    fields: 'sup_role{},company{}'
  },
  isFetchingRoles: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, roleId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_ROLES: {
      return $$state.merge({
        isFetchingRoles: true,
        notification: null,
      })
    }

    case actionTypes.FETCH_ROLES_SUCCESS: {
      return $$state.merge({
        isFetchingRoles: false,
        roles: records,
        roleFilters: filters,
      })
    }

    case actionTypes.FETCH_ROLES_FAILURE: {
      return $$state.merge({
        isFetchingRoles: false,
        notification: parseError(error),
      })
    }

    case actionTypes.SET_IS_DELETING_ROLE: {
      return $$state.withMutations(state => (
        state.update('roles', roles => (
          roles.update(
            roles.findIndex(c => c.get('id') == roleId),
            roleItem => (
              roleItem.merge({
                isDeleting: true,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.DELETE_ROLE_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('roles', roles => (
          roles.update(
            roles.findIndex(c => c.get('id') == roleId),
            roleItem => (
              roleItem.merge({
                isDeleting: false,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.DELETE_ROLE_FAILURE: {
      return $$state.withMutations(state => (
        state.update('roles', roles => (
          roles.update(
            roles.findIndex(c => c.get('id') == roleId),
            roleItem => (
              roleItem.merge({
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

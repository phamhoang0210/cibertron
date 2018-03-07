import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  users: [],
  allusers: [],
  senders: [],
  lists: [],
  templates: [],
  budget: null,
  budgets: [],
  used_emails: null,
  userIdMappings: {},
  isFetchingSenders: false,
  isFetchingLists: false,
  isFetchingUsers: false,
  isFetchingAllUsers: false,
  isFetchingTemplates: false,
  isFetchingUsedEmails: false,
})

export default function sharedReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action

  const recordIdMappings = {}
  if(records) {
    records.forEach(record => recordIdMappings[record.id] = record)
  }
  
  
  switch (type) {

    case actionTypes.SET_IS_FETCHING_SENDERS: {
      return $$state.merge({
        isFetchingSenders: true,
      })
    }

    case actionTypes.FETCH_SENDERS_SUCCESS: {
      return $$state.merge({
        isFetchingCampaigns: false,
        senders: records,
      })
    }

    case actionTypes.FETCH_SENDERS_FAILURE: {
      return $$state.merge({
        isFetchingSenders: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_LISTS: {
      return $$state.merge({
        isFetchingLists: true,
      })
    }

    case actionTypes.FETCH_LISTS_SUCCESS: {
      return $$state.merge({
        isFetchingLists: false,
        lists: records,
      })
    }

    case actionTypes.FETCH_LISTS_FAILURE: {
      return $$state.merge({
        isFetchingLists: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_TEMPLATES: {
      return $$state.merge({
        isFetchingTemplates: true,
      })
    }

    case actionTypes.FETCH_TEMPLATES_SUCCESS: {
      return $$state.merge({
        isFetchingTemplates: false,
        templates: records,
      })
    }

    case actionTypes.FETCH_TEMPLATES_FAILURE: {
      return $$state.merge({
        isFetchingTemplates: false,
      })
    }
    // Fetch users
    case actionTypes.SET_IS_FETCHING_USERS: {
      return $$state.merge({
        isFetchingUsers: true,
      })
    }

    case actionTypes.FETCH_USERS_SUCCESS: {
      return $$state.merge({
        isFetchingUsers: false,
        users: records,
      })
    }

    case actionTypes.FETCH_USERS_FAILURE: {
      return $$state.merge({
        isFetchingUsers: false,
      })
    }
    //Fetch all user
    case actionTypes.SET_IS_FETCHING_ALL_USERS: {
      return $$state.merge({
        isFetchingAllUsers: true,
      })
    }

    case actionTypes.FETCH_ALL_USERS_SUCCESS: {
      return $$state.merge({
        isFetchingAllUsers: false,
        allusers: records,
        userIdMappings: recordIdMappings,
      })
    }

    case actionTypes.FETCH_ALL_USERS_FAILURE: {
      return $$state.merge({
        isFetchingAllUsers: false,
      })
    }
    // Fetch budgets
    case actionTypes.SET_IS_FETCHING_BUDGETS: {
      return $$state.merge({
        isFetchingBudgets: true,
      })
    }

    case actionTypes.FETCH_BUDGETS_SUCCESS: {
      return $$state.merge({
        isFetchingBudgets: false,
        budgets: records,
      })
    }

    case actionTypes.FETCH_BUDGETS_FAILURE: {
      return $$state.merge({
        isFetchingBudgets: false,
      })
    }

    // Fetch budget
    case actionTypes.SET_IS_FETCHING_BUDGET: {
      return $$state.merge({
        isFetchingBudget: true,
      })
    }

    case actionTypes.FETCH_BUDGET_SUCCESS: {
      return $$state.merge({
        isFetchingBudget: false,
        budget: record,
      })
    }

    case actionTypes.FETCH_BUDGET_FAILURE: {
      return $$state.merge({
        isFetchingBudget: false,
      })
    }

    // Fetch email used
    case actionTypes.SET_IS_FETCHING_USED_EMAILS: {
      return $$state.merge({
        isFetchingUsedEmail: true,
      })
    }

    case actionTypes.FETCH_USED_EMAILS_SUCCESS: {
      return $$state.merge({
        isFetchingUsedEmails: false,
        used_emails: record,
      })
    }

    case actionTypes.FETCH_USED_EMAILS_FAILURE: {
      return $$state.merge({
        isFetchingUsedEmails: false,
      })
    }

    default: {
      return $$state
    }
  }
}

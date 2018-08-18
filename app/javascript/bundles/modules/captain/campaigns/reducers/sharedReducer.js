import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  isFetchingAllCampaigns: false,
  isFetchingAllUsers: false,
  alert: null,
  campaigns : [],
  users: [],
  type:[
    {
      title: "Active",
      id: 12,
      value: 1
    },
    {
      title: "Deactive",
      id: 14,
      value: 0
    }
  ],
  status:[
    {
      title: "On",
      id: 65,
      value: 1
    },
    {
      title: "Off",
      id: 30,
      value: 0
    }
  ],
})

export default function sharedReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action

  const recordIdMappings = {}
  if(records) {
    records.forEach(record => recordIdMappings[record.id] = record)
  }
  
  
  switch (type) {
    //Fetch all campaigns
    case actionTypes.SET_IS_FETCHING_ALL_CAMPAIGNS: {
      return $$state.merge({
        isFetchingAllCampaigns: true,
      })
    }

    case actionTypes.FETCH_ALL_CAMPAIGNS_SUCCESS: {
      return $$state.merge({
        isFetchingAllCampaigns: false,
        campaigns: records,
        //userIdMappings: recordIdMappings,
      })
    }

    case actionTypes.FETCH_ALL_CAMPAIGNS_FAILURE: {
      return $$state.merge({
        isFetchingAllCampaigns: false,
      })
    }

    //Fetch all Users
    case actionTypes.SET_IS_FETCHING_ALL_USERS: {
      return $$state.merge({
        isFetchingAllCampaigns: true,
      })
    }

    case actionTypes.FETCH_ALL_USERS_SUCCESS: {
      return $$state.merge({
        isFetchingAllUsers: false,
        users: records,
        //userIdMappings: recordIdMappings,
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

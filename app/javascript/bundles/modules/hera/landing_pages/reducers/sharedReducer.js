import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  discounts: [],
  users: [],
  adaccounts: [],
  pixels: [],
  domains: [],
  landingPageCodes: {},
  domainIdMappings: {},
  userIdMappings: {},
  facebookApps: [],
  facebookPixelCodes: [],
  discountIdMappings: {},
  isFetchingDomains: false,
  isFetchingDiscounts: false,
  isFetchingUsers: false,
  isFetchingAdAccount: false,
  isFetchingFacebookApps: false,
  isFetchingFacebookPixelCodes: false,
  isFetchingPixels: false,
  isFetchingLogicHome: false,
  strategies: [
    {id: 'industry', title: 'industry'},
    {id: 'pilot', title: 'pilot'},
    {id: 'trial', title: 'trial'},
    {id: 'crosssell', title: 'crosssell'},
  ],
  logics: [],
  landingPageTypes: [
    {id: 'instapage', title: 'Instapage'},
    {id: 'custom', title: 'Custom (edumall.vn)'},
  ],
  landingPageItemKeys: {
    home_logics: [
      {key: 'home', title: ''},
      {key: 'tag_manager', title: ''},
    ],
    thankyou_logics: [
      {key: 'home', title: ''},
      {key: 'tag_manager', title: ''},
    ],
    facebook_comment: [
      {key: 'logic', title: ''},
    ],
    forms: [
      {key: 'vertical__white_background', title: 'Form dọc nền trắng'},
      {key: 'vertical__white_border', title: 'Form dọc viền trắng'},
      {key: 'vertical__white_border_rounded', title: 'Form dọc viền trắng bo góc'},
      {key: 'vertical__address_only_white_background', title: 'Form dọc 1 địa chỉ nền trắng'},
      {key: 'vertical__address_only_white_border', title: 'Form dọc 1 địa chỉ viền trắng'},
      {key: 'horizontal__white_background', title: 'Form ngang nền trắng'},
      {key: 'horizontal__white_border', title: 'Form ngang viền trắng'},
      {key: 'horizontal__address_only_white_background', title: 'Form ngang 1 địa chỉ nền trắng'},
      {key: 'horizontal__address_only_white_border', title: 'Form ngang 1 địa chỉ viền trắng'},
    ],
    countdowns: [
      {key: 'classic', title: 'Classic'},
      {key: 'clock_only', title: 'Clock only'},
      {key: 'clock_only_dot', title: 'Clock only dot'},
      {key: 'clock_only_box', title: 'Clock only box'},
    ]
  }
})

export default function sharedReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  const recordIdMappings = {}
  if(records) {
    records.forEach(record => recordIdMappings[record.id] = record)
  }
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_DISCOUNT: {
      return $$state.merge({
        isFetchingDiscounts: true,
      })
    }

    case actionTypes.FETCH_DISCOUNT_SUCCESS: {
      return $$state.merge({
        isFetchingDiscounts: false,
        discounts: records,
        discountIdMappings: recordIdMappings,
      })
    }

    case actionTypes.FETCH_DISCOUNT_FAILURE: {
      return $$state.merge({
        isFetchingDiscounts: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_USERS: {
      return $$state.merge({
        isFetchingUsers: true,
      })
    }

    case actionTypes.FETCH_USERS_SUCCESS: {      
      return $$state.merge({
        isFetchingUsers: false,
        users: records,
        userIdMappings: recordIdMappings,
      })
    }

    case actionTypes.FETCH_USERS_FAILURE: {
      return $$state.merge({
        isFetchingUsers: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_DOMAINS: {
      return $$state.merge({
        isFetchingDomains: true,
      })
    }

    case actionTypes.FETCH_DOMAINS_SUCCESS: {
      return $$state.merge({
        isFetchingDomains: false,
        domains: records,
        domainIdMappings: recordIdMappings,
      })
    }

    case actionTypes.FETCH_DOMAINS_FAILURE: {
      return $$state.merge({
        isFetchingDomains: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_FACEBOOK_APPS: {
      return $$state.merge({
        isFetchingFacebookApps: true,
      })
    }

    case actionTypes.FETCH_FACEBOOK_APPS_SUCCESS: {
      return $$state.merge({
        isFetchingFacebookApps: false,
        facebookApps: records,
      })
    }

    case actionTypes.FETCH_FACEBOOK_APPS_FAILURE: {
      return $$state.merge({
        isFetchingFacebookApps: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_FACEBOOK_PIXEL_CODES: {
      return $$state.merge({
        isFetchingFacebookPixelCodes: true,
      })
    }

    case actionTypes.FETCH_FACEBOOK_PIXEL_CODES_SUCCESS: {
      return $$state.merge({
        isFetchingFacebookPixelCodes: false,
        facebookPixelCodes: records,
      })
    }

    case actionTypes.FETCH_FACEBOOK_PIXEL_CODES_FAILURE: {
      return $$state.merge({
        isFetchingFacebookPixelCodes: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_LOGICS: {
      return $$state.merge({
        isFetchingLogics: true,
      })
    }

    case actionTypes.FETCH_LOGICS_SUCCESS: {
      return $$state.merge({
        isFetchingLogics: false,
        logics: records,
        logicIdMappings: recordIdMappings,
      })
    }

    case actionTypes.FETCH_LOGICS_FAILURE: {
      return $$state.merge({
        isFetchingLogics: false,
      })
    }

    //Fetch AdAccounts
    case actionTypes.SET_IS_FETCHING_AD_ACCOUNTS: {
      return $$state.merge({
        isFetchingAdAccounts: true,
      })
    }

    case actionTypes.FETCH_AD_ACCOUNTS_SUCCESS: {      
      return $$state.merge({
        isFetchingAdAccounts: false,
        adaccounts: records,
      })
    }

    case actionTypes.FETCH_AD_ACCOUNTS_FAILURE: {
      return $$state.merge({
        isFetchingAdAccounts: false,
      })
    }

    //Fetch pixels
    case actionTypes.SET_IS_FETCHING_PIXELS: {
      return $$state.merge({
        isFetchingPixels: true,
      })
    }

    case actionTypes.FETCH_PIXELS_SUCCESS: {      
      return $$state.merge({
        isFetchingPixels: false,
        pixels: records,
      })
    }

    case actionTypes.FETCH_PIXELS_FAILURE: {
      return $$state.merge({
        isFetchingPixels: false,
      })
    }

    //Fetch code logic home
    case actionTypes.SET_IS_FETCHING_LOGIC_HOME: {
      return $$state.merge({
        isFetchingLogicHome: true,
      })
    }

    case actionTypes.FETCH_LOGIC_HOME_SUCCESS: {      
      return $$state.merge({
        landingPageCodes: record,
        isFetchingLogicHome: false,
      })
    }

    case actionTypes.FETCH_LOGIC_HOME_FAILURE: {
      return $$state.merge({
        isFetchingLogicHome: false,
      })
    }

    default: {
      return $$state
    }
  }
}

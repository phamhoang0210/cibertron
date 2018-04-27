import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
import { defaultFilters } from 'app/constants/initialState'
export const initialState = Immutable.fromJS({
  leadLevels: [],
  leadStatuses: [],
  users: [],
  paymentMethods: [],
  campaigns: [],
  combos: [],
  courses: [],
  provinces: [],
  leadCareStatuses: [],
  userIdMappings: {},
  leadCareStatusIdMappings: {},
  leadCareStatusFilter: {
    ...defaultFilters,
    fields: 'lead_status{}'
  },
  comboSourceIdMappings: {},
  courseSourceIdMappings: {},
  sexes: [],
  isFetchingLeadLevels: false,
  isFetchingUsers: false,
  isFetchingLeadStatuses: false,
  isFetchingCampaigns: false,
  isFetchingPaymentMethods: false,
  isFetchingCombos: false,
  isFetchingCourses: false,
  isFetchingProvinces: false,
  isFetchingLeadCareStatuses: false,
  isFetchingSexes: false,
  transferBanks: [
    { value: "Argribank", title: "Agribank - Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam" },
    { value: "Vpbank", title: "Vpbank - Ngân hàng Việt Nam Thịnh Vượng" },
    { value: "ACB", title: "ACB - Ngân hàng Á Châu" },
    { value: "BIDV", title: "BIDV - Ngân hàng TMCP Đầu Tư & Phát Triển Việt Nam" },
    { value: "Vietcombank", title: "Vietcombank - Ngân hàng thương mại cổ phần Ngoại thương" },
  ],
  officeAddress: [
    { value: 'add_1', title: '75 Phương Mai, Đống Đa, Hà Nội'},
    { value: 'add_2', title: '58/10 Thành Thái, Phường 12, Quận 10, HCM'},
  ],
  otherFilters: [
    { value: 'duplicated', title: 'Trùng'},
    { value: 'unduplicated', title: 'Không Trùng'},
    { value: 'recovery', title: 'Thu hồi'}
  ],
    calls: [
        {value: '1', title: '1 lần'},
        {value: '2', title: '2 lần'},
        {value: '3', title: '3 lần'},
        {value: '4', title: '4 lần'},
        {value: '5', title: '5 lần'},
        {value: '6', title: '6 lần'},
        {value: '7', title: 'Trên 7 lần'},
    ],
    report: [
        { value: 'lichhen', title: 'Lịch hẹn'},
        { value: 'dagoi', title: 'Đã gọi'},
        { value: 'chuagoi', title: 'Chưa gọi'}
    ],
})

export default function sharedReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action

  const recordIdMappings = {}
  if(records) {
    records.forEach(record => recordIdMappings[record.id] = record)
  }

  switch (type) {
    case actionTypes.SET_IS_FETCHING_LEAD_LEVELS: {
      return $$state.merge({
        isFetchingLeadLevels: true,
      })
    }

    case actionTypes.FETCH_LEAD_LEVELS_SUCCESS: {
      return $$state.merge({
        isFetchingLeadLevels: false,
        leadLevels: records,
      })
    }

    case actionTypes.FETCH_LEAD_LEVELS_FAILURE: {
      return $$state.merge({
        isFetchingLeadLevels: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_USERS: {
      return $$state.merge({
        isFetchingUsers: false,
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

    case actionTypes.SET_IS_FETCHING_LEAD_STATUSES: {
      return $$state.merge({
        isFetchingLeadStatuses: true,
      })
    }

    case actionTypes.FETCH_LEAD_STATUSES_SUCCESS: {
      return $$state.merge({
        isFetchingLeadStatuses: false,
        leadStatuses: records,
      })
    }

    case actionTypes.FETCH_LEAD_STATUSES_FAILURE: {
      return $$state.merge({
        isFetchingLeadStatuses: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_CAMPAIGNS: {
      return $$state.merge({
        isFetchingCampaigns: true,
      })
    }

    case actionTypes.FETCH_CAMPAIGNS_SUCCESS: {
      return $$state.merge({
        isFetchingCampaigns: false,
        campaigns: records,
      })
    }

    case actionTypes.FETCH_CAMPAIGNS_FAILURE: {
      return $$state.merge({
        isFetchingCampaigns: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_PAYMENT_METHODS: {
      return $$state.merge({
        isFetchingPaymentMethods: true,
      })
    }

    case actionTypes.FETCH_PAYMENT_METHODS_SUCCESS: {
      return $$state.merge({
        isFetchingPaymentMethods: false,
        paymentMethods: records,
      })
    }

    case actionTypes.FETCH_PAYMENT_METHODS_FAILURE: {
      return $$state.merge({
        isFetchingPaymentMethods: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_COURSES: {
      return $$state.merge({
        isFetchingCourses: true,
      })
    }

    case actionTypes.FETCH_COURSES_SUCCESS: {
      const courseSourceIdMappings = {}
      records.forEach(record => courseSourceIdMappings[record.source_id] = record)

      return $$state.merge({
        isFetchingCourses: false,
        courses: records,
        courseSourceIdMappings,
      })
    }

    case actionTypes.FETCH_COURSES_FAILURE: {
      return $$state.merge({
        isFetchingCourses: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_COMBOS: {
      return $$state.merge({
        isFetchingCombos: true,
      })
    }

    case actionTypes.FETCH_COMBOS_SUCCESS: {
      const comboSourceIdMappings = {}
      records.forEach(record => comboSourceIdMappings[record.code] = record)

      return $$state.merge({
        isFetchingCombos: false,
        combos: records,
        comboSourceIdMappings,
      })
    }

    case actionTypes.FETCH_COMBOS_FAILURE: {
      return $$state.merge({
        isFetchingCombos: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_PROVINCES: {
      return $$state.merge({
        isFetchingProvinces: true,
      })
    }

    case actionTypes.FETCH_PROVINCES_SUCCESS: {
      return $$state.merge({
        isFetchingProvinces: false,
        provinces: records,
      })
    }

    case actionTypes.FETCH_PROVINCES_FAILURE: {
      return $$state.merge({
        isFetchingProvinces: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_LEAD_CARE_STATUSES: {
      return $$state.merge({
        isFetchingLeadCareStatuses: true,
      })
    }

    case actionTypes.FETCH_LEAD_CARE_STATUSES_SUCCESS: {
      return $$state.merge({
        isFetchingLeadCareStatuses: false,
        leadCareStatuses: records,
        leadCareStatusIdMappings: recordIdMappings
      })
    }

    case actionTypes.FETCH_LEAD_CARE_STATUSES_FAILURE: {
      return $$state.merge({
        isFetchingLeadCareStatuses: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_SEXES: {
      return $$state.merge({
        isFetchingSexes: true,
      })
    }

    case actionTypes.FETCH_SEXES_SUCCESS: {
      return $$state.merge({
        isFetchingSexes: false,
        sexes: records,
      })
    }

    case actionTypes.FETCH_SEXES_FAILURE: {
      return $$state.merge({
        isFetchingSexes: false,
      })
    }

    default: {
      return $$state
    }
  }
}

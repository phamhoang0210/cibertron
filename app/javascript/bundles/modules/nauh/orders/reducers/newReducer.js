import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  order: null,
  isCreatingOrder: false,
  isFetchingLead: false,
  lead: null,
  paymentMethods: [
    { value: 'COD', title: 'COD' },
    { value: 'TRANSFER', title: 'TRANSFER' },
    { value: 'OFFICE', title: 'OFFICE' },
    { value: 'ONE_PAY', title: 'ONE_PAY' },
  ],
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
  ]
})

export default function newReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_CREATING_ORDER: {
      return $$state.merge({
        isCreatingOrder: true,
      })
    }

    case actionTypes.CREATE_ORDER_SUCCESS: {
      return $$state.merge({
        isCreatingOrder: false,
        order: record,
        alert: createSuccessAlert(`Order was successfully created.`),
      })
    }

    case actionTypes.CREATE_ORDER_FAILURE: {
      return $$state.merge({
        isCreatingOrder: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_FETCHING_LEAD: {
      return $$state.merge({
        isFetchingLead: true,
      })
    }

    case actionTypes.FETCH_LEAD_SUCCESS: {
      return $$state.merge({
        isFetchingLead: false,
        lead: record,
      })
    }

    case actionTypes.FETCH_LEAD_FAILURE: {
      return $$state.merge({
        isFetchingLead: false,
      })
    }

    default: {
      return $$state
    }
  }
}

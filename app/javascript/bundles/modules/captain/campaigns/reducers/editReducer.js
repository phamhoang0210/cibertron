import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  campaign: null,
  isFetchingCampaign: false,
  isUpdatingCampaign: false,
  viewDealCourseComponent: false,
  dealColumns: [{
    title: 'Mã khóa',
    dataIndex: 'course_code',
    key: 'course_code',
  },
  {
    title: 'Tên khóa',
    dataIndex: 'course_name',
    key: 'course_name',
  },
  {
    title: 'Giá gốc',
    dataIndex: 'price',
    key: 'price',
  }],
  deal: [{
    key: '5b4ff6ecce4b1455969a029f',
    course_name: 'Giải Tỏa Ách Tắc - Trầm Cảm - Sống Đời Hạnh Phúc',
    course_code: 'NhatHV.01',
    price: 799000
  },
  {
    key: '5b4c0f6fce4b14559899b4c2',
    course_name: 'Thiết kế bài giảng E.learning bằng phần mềm I.spring 9.0',
    course_code: 'HieuHB.01',
    price: 699000
  },
  {
    key: '5b3b85dcce4b14559698960e',
    course_name: 'ĐẬP TAN CHỨNG BIẾNG ĂN Ở TRẺ',
    course_code: 'CUONGDN.03',
    price: 699000
  },
  {
    key: '5b3994e7ce4b1455989869e8',
    course_name: 'GIÁO DỤC SỚM CHO TRẺ THEO PHƯƠNG PHÁP GLENN DOMAN: NHẬN BIẾT THẾ GIỚI XUNG QUANH',
    course_code: 'ThietNV.12',
    price: 699000
  },
  {
    key: '5b34b670ce4b145596982cb7',
    course_name: 'THIẾT KẾ ILLUSTRATOR TỪ SỐ 0 - THÀNH THẠO THIẾT KẾ CHO TỚI VẼ CONTENT',
    course_code: 'ThiDV.01',
    price: 599000,
    promotion_price: 399000,
    discount_percent: 20.5
  }],
  // courseDataColumns: [{
  //   title: 'Khóa',
  //   dataIndex: 'course_code',
  //   key: 'course_code',
  // },
  // {
  //   title: 'Giá gốc',
  //   dataIndex: 'price',
  //   key: 'price',
  // },
  // {
  //   title: 'Giá giảm',
  //   dataIndex: 'promotion_price',
  //   key: 'promotion_price',
  //   render: (text, record) => (
  //     <Input placeholder="" />
  //   )
  // },
  // {
  //   title: '% giảm',
  //   dataIndex: '10',
  //   key: '10',
  // },
  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (text, record) => (
  //     <div>
  //       <Button type="danger">Xóa</Button>
  //     </div>
  //   )
  // }],
  // courseData: {
  //   keys: [],
  //   records: []
  // },
  courseData: {
    keys: [],
    records: []
  },
  findCoursesBy:[{
    id: 1,
    title: 'Category',
    value: 'category',
    type: 'select'
  },
  {
    id: 2,
    title: 'Thầy',
    value: 'teacher',
    type: 'select'
  },
  {
    id: 3,
    title: 'Giá bán',
    value: 'price',
    type: 'search'
  },
  {
    id: 4,
    title: 'Mã khóa',
    value: 'course_code',
    type: 'search'
  }],
})

export default function editReducer($$state = initialState, action = null) {
  const { type, record, filters, error, campaignId, coursesDelete, course } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_CAMPAIGN: {
      return $$state.merge({
        isFetchingCampaign: true,
        alert: null,
        campaign: null,
      })
    }

    case actionTypes.FETCH_CAMPAIGN_SUCCESS: {
      return $$state.merge({
        isFetchingCampaign: false,
        campaign: record,
      })
    }

    case actionTypes.FETCH_CAMPAIGN_FAILURE: {
      return $$state.merge({
        isFetchingCampaign: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_CAMPAIGN: {
      return $$state.merge({
        isUpdatingCampaign: true,
      })
    }

    case actionTypes.UPDATE_CAMPAIGN_SUCCESS: {
      console.log('campaignItem:',$$state.toJS().campaign)
      return $$state.merge({
        isUpdatingCampaign: false,
        alert: 'Campaign was successfully updated',
      }).update('campaign', campaignItem => (
        campaignItem.merge(record)
      ))
    }

    case actionTypes.UPDATE_CAMPAIGN_FAILURE: {
      return $$state.merge({
        isUpdatingCampaign: false,
        alert: 'Something went wrong',
      })
    }

    case actionTypes.UPDATE_VIEW_DEAL_COURSE: {
      return $$state.merge({
        viewDealCourseComponent: action.viewType
      })
    }

    case actionTypes.ADD_COURSES_DATA: {
      // console.log('course Data',$$state.toJS().courseData)
      // console.log('course:',course)
      // console.log('records:',records)
      // for (var i = 0; i < coursesDelete.length; i++) {
      //   while (keys.indexOf(coursesDelete[i]) !== -1) {
      //     keys.splice(keys.indexOf(coursesDelete[i]), 1);
      //   }
      // }
      // const { keys, records } = $$state.toJS().courseData
      // keys.push(course['key'])
      // records.push(course)
      // for (var i = 0; i < courses.length; i++) {
      //   if (!records.includes(courses[i])) {
      //     records.push(courses[i])
      //   }
      // }
      // return $$state.merge({
      //   courseData: {
      //     keys: keys,
      //     records: records
      //   }
      // })
      return $$state.updateIn(['courseData', 'keys'], arr => arr.push(course.key)).updateIn(['courseData', 'records'], arr => arr.push(course))
    }

    case actionTypes.DELETE_COURSE_DATA: {
      // console.log('course:',course)
      // const { keys, records } = $$state.toJS().courseData
      // console.log('keys truoc:',keys)
      // console.log('records truoc:',records)
      // while (keys.indexOf(course['key']) !== -1) {
      //   keys.splice(keys.indexOf(course['key']), 1);
      // }
      // if (keys.length > 0) {
      //   console.log('Vao')
      //   for (var i = 0; i < keys.length; i++) {
      //     for (var j = 0; j < records.length; j++) {
      //       console.log('keys i:', keys[i])
      //       console.log('records j:', records[j])
      //       if (records[j]['key'] == keys[i]) {
      //         console.log('OK')
      //         records.splice(records[j])
      //       }
      //     }
      //   }
      // } else {
      //   console.log('keys rong', keys)
      //   console.log('records', records)
      //   records: []
      //   // for (var i = 0; i < records.length; i++) {
      //   //   records.splice(records[i]);
      //   // }
      // }
      // console.log('keys sau:',keys)
      // console.log('records sau:',records)

      // return $$state.set(['courseData', 'records'], $$state.get(['courseData', 'records']).filter(o => o.get('key') !== course.key))
      return $$state.updateIn(['courseData', 'keys'], arr => arr.filter(o => o !== course.key)).updateIn(['courseData', 'records'], arr => arr.filter(o => o.key !== course.key))
      
      // return $$state.merge({
      //   courseData: {
      //     keys: keys,
      //     records: records
      //   }
      // })
    }

    default: {
      return $$state
    }
  }
}

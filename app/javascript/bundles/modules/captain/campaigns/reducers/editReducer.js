import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'

export const initialState = Immutable.fromJS({
  alert: null,
  campaign: null,
  isFetchingCampaign: false,
  isUpdatingCampaign: false,
  isUpdatingCoursesInCampaign: false,
  viewDealCourseComponent: false,
  isLoadingCategories: false,
  isLoadingCoursesByCategory: false,
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
    width: 100
  }],
  deal: [{
    key: '5b4ff6ecce4b1455969a029f',
    course_name: 'Giải Tỏa Ách Tắc - Trầm Cảm - Sống Đời Hạnh Phúc',
    course_code: 'NhatHV.01',
    price: 799000,
    promotion_price: 799000,
    discount_percent: 0
  },
  {
    key: '5b4c0f6fce4b14559899b4c2',
    course_name: 'Thiết kế bài giảng E.learning bằng phần mềm I.spring 9.0',
    course_code: 'HieuHB.01',
    price: 699000,
    promotion_price: 699000,
    discount_percent: 0
  },
  {
    key: '5b3b85dcce4b14559698960e',
    course_name: 'ĐẬP TAN CHỨNG BIẾNG ĂN Ở TRẺ',
    course_code: 'CUONGDN.03',
    price: 699000,
    promotion_price: 699000,
    discount_percent: 0
  },
  {
    key: '5b3994e7ce4b1455989869e8',
    course_name: 'GIÁO DỤC SỚM CHO TRẺ THEO PHƯƠNG PHÁP GLENN DOMAN: NHẬN BIẾT THẾ GIỚI XUNG QUANH',
    course_code: 'ThietNV.12',
    price: 699000,
    promotion_price: 699000,
    discount_percent: 0
  },
  {
    key: '5b34b670ce4b145596982cb7',
    course_name: 'THIẾT KẾ ILLUSTRATOR TỪ SỐ 0 - THÀNH THẠO THIẾT KẾ CHO TỚI VẼ CONTENT',
    course_code: 'ThiDV.01',
    price: 599000,
    promotion_price: 599000,
    discount_percent: 0
  }],
  categories: [],
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
  const { type, record, filters, error, campaignId, coursesDelete, course, campaign, categories, teachers, data } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_CAMPAIGN: {
      return $$state.merge({
        isFetchingCampaign: true,
        alert: null,
        campaign: null,
      })
    }

    case actionTypes.FETCH_CAMPAIGN_SUCCESS: {
      console.log('record',record)
      var keys = []
      var original_courses = []
      var temp_courses = record.campaign.courses
      if (temp_courses.length > 0) {
        for (var i=0;i<temp_courses.length;i++) {
          var courseItem = {key: temp_courses[i]['course_id'], course_code: temp_courses[i]['course_code'], price: temp_courses[i]['old_price'], promotion_price: temp_courses[i]['new_price'], discount_percent: (1 - (temp_courses[i]['new_price']/temp_courses[i]['old_price']))*100}
          keys.push(temp_courses[i]['course_id'])
          original_courses.push(courseItem)
        }
      }
      return $$state.merge({
        isFetchingCampaign: false,
        campaign: record,
      }).updateIn(['courseData', 'keys'], arr => keys).updateIn(['courseData', 'records'], arr => Immutable.fromJS(original_courses))
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
      return $$state.merge({
        isUpdatingCampaign: false,
        alert: createSuccessAlert('Campaign was successfully updated')
      }).update('campaign', campaignItem => (
        campaignItem.merge(record)
      ))
    }

    case actionTypes.UPDATE_CAMPAIGN_FAILURE: {
      return $$state.merge({
        isUpdatingCampaign: false,
        alert: parseError(error),
      })
    }

    case actionTypes.UPDATE_VIEW_DEAL_COURSE: {
      return $$state.merge({
        viewDealCourseComponent: action.viewType
      })
    }

    case actionTypes.ADD_COURSES_DATA: {
      var keys = $$state.toJS().courseData.keys
      var records = $$state.toJS().courseData.records
      console.log('keys truoc:',keys)
      console.log('records truoc:',records)
      keys.push(course.key)
      records.push(course)
      console.log('keys sau:',keys)
      console.log('records sau:',records)

      return $$state.merge({
        courseData: {keys,records}
      })
    }

    case actionTypes.UPDATE_PROMOTION_PERCENT:{
      const percent = (1 - (data.value / data.record.price)) * 100;
      return $$state.withMutations(state => (
        state.updateIn(['courseData', 'records'], courseData => (
          courseData.update(
            courseData.findIndex(courseItem => courseItem.get('key') == action.data.record.key),
            courseItem => (
              courseItem.merge({
                discount_percent: percent,
                promotion_price: data.value
              })
            )
          )
        ))
      ))
    }

  
    case actionTypes.DELETE_COURSE_DATA: {
      return $$state.updateIn(['courseData', 'keys'], arr => arr.filter(o => o !== course.key)).updateIn(['courseData', 'records'], arr => arr.filter(o => o.key !== course.key))
    }

    case actionTypes.SET_IS_UPDATING_COURSES_IN_CAMPAIGN: {
      return $$state.merge({
        isUpdatingCoursesInCampaign: true,
      })
    }

    case actionTypes.UPDATE_COURSES_IN_CAMPAIGN_SUCCESS: {
      return $$state.merge({
        isUpdatingCoursesInCampaign: false,
        alert: createSuccessAlert('Courses in the campaign was successfully updated'),
      }).update('campaign', campaignItem => (
        campaignItem.merge(record)
      ))
    }

    case actionTypes.UPDATE_COURSES_IN_CAMPAIGN_FAILURE: {
      return $$state.merge({
        isUpdatingCoursesInCampaign: false,
        alert: parseError('Something went wrong'),
      })
    }

    case actionTypes.SET_IS_LOADING_CATEGORIES: {
      return $$state.merge({
        isLoadingCategories: true,
      })
    }

    case actionTypes.LOAD_CATEGORIES_SUCCESS: {
      console.log('Success',categories)
      console.log('categories.records',categories.records)
      return $$state.merge({
        isLoadingCategories: false,
        alert: createSuccessAlert('Loading successfully'),
        // categories: categories.records
      }).update('categories', categoryItem => (
        categoryItem.merge(categories.records)
      ))
    }

    case actionTypes.LOAD_CATEGORIES_FAILURE: {
      console.log('Failure')
      return $$state.merge({
        isLoadingCategories: false,
        alert: parseError('Something went wrong'),
      })
    }

    case actionTypes.SET_IS_LOADING_COURSES_BY_CATEGORY: {
      return $$state.merge({
        isLoadingCoursesByCategory: true,
      })
    }

    case actionTypes.LOAD_COURSES_BY_CATEGORY_SUCCESS: {
      // console.log('Success',categories)
      return $$state.merge({
        isLoadingCoursesByCategory: false,
        alert: createSuccessAlert('Loading successfully'),
      })
    }

    case actionTypes.LOAD_COURSES_BY_CATEGORY_FAILURE: {
      // console.log('Failure')
      return $$state.merge({
        isLoadingCoursesByCategory: false,
        alert: parseError('Something went wrong'),
      })
    }

    default: {
      return $$state
    }
  }
}

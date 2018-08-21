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
  isFetchingCourses: false,
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
  deal: [],
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

function formatCourseData(data) {
  var results = [];

  if (data.length > 0) {
    for (var i=0; i < data.length; i++) {
      let item = {
        key: data[i]._id,
        course_name: data[i].name,
        course_code: data[i].code,
        price: data[i].price,
        promotion_price: data[i].price,
        discount_percent: 0
      };        
      results.push(item)
    }
  }

  return results;
}

export default function editReducer($$state = initialState, action = null) {
  const { type, record, filters, error, campaignId, coursesDelete, course, campaign, categories, teachers } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_CAMPAIGN: {
      return $$state.merge({
        isFetchingCampaign: true,
        alert: null,
        campaign: null,
      })
    }

    case actionTypes.FETCH_CAMPAIGN_SUCCESS: {
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
      }).updateIn(['courseData', 'keys'], arr => keys).updateIn(['courseData', 'records'], arr => original_courses)
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
      keys.push(course.key)
      records.push(course)

      return $$state.merge({
        courseData: {keys,records}
      })
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
      return $$state.merge({
        isLoadingCategories: false,
        categories: categories.records
      })
    }

    case actionTypes.LOAD_CATEGORIES_FAILURE: {
      return $$state.merge({
        isLoadingCategories: false,
        alert: parseError('Something went wrong'),
      })
    }

    case actionTypes.IS_FETCHING_COURSE_BY_CONDITION: {
      return $$state.merge({
        isFetchingCourses: true,
      })
    }

    case actionTypes.FETCHING_COURSES_BY_CONDITION_SUCCESS: {
      return $$state.merge({
        isFetchingCourses: false,
        deal: formatCourseData(action.courses.records)
      })
    }

    case actionTypes.FETCHING_COURSES_BY_CONDITION_FAILURE: {
      return $$state.merge({
        isFetchingCourses: false,
        alert: parseError('Something went wrong'),
      })
    }

    case actionTypes.SET_IS_LOADING_COURSES_BY_CATEGORY: {
      return $$state.merge({
        isLoadingCoursesByCategory: true,
      })
    }

    case actionTypes.LOAD_COURSES_BY_CATEGORY_SUCCESS: {
      return $$state.merge({
        isLoadingCoursesByCategory: false,
        deal: formatCourseData(categories.records)
      })
    }

    case actionTypes.LOAD_COURSES_BY_CATEGORY_FAILURE: {
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

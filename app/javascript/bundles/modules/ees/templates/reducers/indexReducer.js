import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { defaultFilters } from 'app/constants/initialState'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'

export const initialState = Immutable.fromJS({
  alert: null,
  templates: [],
  templateFilters: {
    ...defaultFilters,
    fields: ''
  },
  isFetchingTemplates: false,
  isUpdatingTemplates: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const {
    type, record, records, filters, error, templateId,
    template
  } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_TEMPLATES: {
      return $$state.merge({
        isFetchingTemplates: true,
      })
    }

    case actionTypes.FETCH_TEMPLATES_SUCCESS: {
      return $$state.merge({
        isFetchingTemplates: false,
        templates: records,
        templateFilters: filters,
      })
    }

    case actionTypes.FETCH_TEMPLATES_FAILURE: {
      return $$state.merge({
        isFetchingTemplates: false,
      })
    }

    case actionTypes.SET_IS_DELETING_TEMPLATE: {
      return $$state.withMutations(state => (
        state.update('templates', templates => (
          templates.update(
            templates.findIndex(c => c.get('id') == templateId),
            templateItem => (
              templateItem.merge({
                isDeleting: true,
              })
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.DELETE_TEMPLATE_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('templates', templates => (
          templates.update(
            templates.findIndex(c => c.get('id') == templateId),
            templateItem => (
              templateItem.merge({
                isDeleting: false,
              })
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.DELETE_TEMPLATE_FAILURE: {
      return $$state.withMutations(state => (
        state.update('templates', templates => (
          templates.update(
            templates.findIndex(c => c.get('id') == templateId),
            templateItem => (
              templateItem.merge({
                isDeleting: false,
              })
            )
          )
        )).merge({
          alert: parseError(error),
        })
      ))
    }

    default: {
      return $$state
    }
  }
}

import indexReducer, { initialState as indexState } from './indexReducer'
import editReducer, { initialState as editState } from './editReducer'
import sharedReducer, { initialState as sharedState } from './sharedReducer'
import railsContextReducer, { initialState as railsContextState } from './railsContextReducer'

export default {
  indexState: indexReducer,
  editState: editReducer,
  sharedState: sharedReducer,
  railsContextState: railsContextReducer,
}

export const initialStates = {
  indexState,
  editState,
  sharedState,
  railsContextState,
}

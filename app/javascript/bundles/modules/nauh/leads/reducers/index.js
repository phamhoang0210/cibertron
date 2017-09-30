import indexReducer, { initialState as indexState } from './indexReducer'
import newReducer, { initialState as newState } from './newReducer'
import editReducer, { initialState as editState } from './editReducer'
import sharedReducer, { initialState as sharedState } from './sharedReducer'
import assignReducer, { initialState as assignState } from './assignReducer'
import railsContextReducer, { initialState as railsContextState } from './railsContextReducer'

export default {
  indexState: indexReducer,
  newState: newReducer,
  editState: editReducer,
  sharedState: sharedReducer,
  railsContextState: railsContextReducer,
  assignState: assignReducer,
}

export const initialStates = {
  indexState,
  newState,
  editState,
  sharedState,
  railsContextState,
  assignState,
}

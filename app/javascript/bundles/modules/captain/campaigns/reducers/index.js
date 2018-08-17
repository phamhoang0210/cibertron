import indexReducer, { initialState as indexState } from './indexReducer'
import editReducer, { initialState as editState } from './editReducer'
import sharedReducer, { initialState as sharedState } from './sharedReducer'
import railsContextReducer, { initialState as railsContextState } from './railsContextReducer'
import newReducer, { initialState as newState } from './newReducer'

export default {
  indexState: indexReducer,
  editState: editReducer,
  sharedState: sharedReducer,
  railsContextState: railsContextReducer,
  newState: newReducer,
}

export const initialStates = {
  indexState,
  editState,
  sharedState,
  railsContextState,
  newState,
}

import indexReducer, { initialState as indexState } from './indexReducer'
import newReducer, { initialState as newState } from './newReducer'
import editReducer, { initialState as editState } from './editReducer'
import getCodeReducer, { initialState as getCodeState } from './getCodeReducer'
import sharedReducer, { initialState as sharedState } from './sharedReducer'
import railsContextReducer, { initialState as railsContextState } from './railsContextReducer'

export default {
  indexState: indexReducer,
  newState: newReducer,
  editState: editReducer,
  getCodeState: getCodeReducer,
  sharedState: sharedReducer,
  railsContextState: railsContextReducer,
}

export const initialStates = {
  indexState,
  newState,
  editState,
  getCodeState,
  sharedState,
  railsContextState,
}

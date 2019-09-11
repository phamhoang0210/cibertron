import indexReducer, { initialState as indexState } from './indexReducer'
import newReducer, { initialState as newState } from './newReducer'
import editReducer, { initialState as editState } from './editReducer'
import restoreReducer, { initialState as restoreState } from './restoreReducer'
import historyReducer, { initialState as historyState } from './historyReducer'
import sharedReducer, { initialState as sharedState } from './sharedReducer'
import railsContextReducer, { initialState as railsContextState } from './railsContextReducer'

export default {
  indexState: indexReducer,
  newState: newReducer,
  editState: editReducer,
  restoreState: restoreReducer,
  historyState: historyReducer,
  sharedState: sharedReducer,
  railsContextState: railsContextReducer,
}

export const initialStates = {
  indexState,
  newState,
  editState,
  restoreState,
  historyState,
  sharedState,
  railsContextState,
}

import indexReducer, { initialState as indexState } from './indexReducer'
import sharedReducer, { initialState as sharedState } from './sharedReducer'
import railsContextReducer, { initialState as railsContextState } from './railsContextReducer'

export default {
  indexState: indexReducer,
  sharedState: sharedReducer,
  railsContextState: railsContextReducer,
}

export const initialStates = {
  indexState,
  sharedState,
  railsContextState,
}

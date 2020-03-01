import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'libs/middlewares/loggerMiddleware'
import reducers, { initialStates } from '../reducers'

export default (props, railsContext) => {
  const {authState, authSignUpState, authSignInState, authSignOutState} = initialStates

  const initialState = {
    authState,
    authSignUpState,
    authSignInState,
    authSignOutState,
  }

  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer,
  });

  const finalCreateStore = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  )(createStore);

  return finalCreateStore(reducer, initialState)
};
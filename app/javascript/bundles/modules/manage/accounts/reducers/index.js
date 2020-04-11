import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import reduceReducers from 'reduce-reducers';


import accountsReducer from './accountsReducer';
import accountNewReducer from './accountNewReducer';

const accounts = accountsReducer;
// const accounts = reduceReducers(fetchAccounts);
const accountNew = accountNewReducer;

const rootReducer = combineReducers({
	routing: routerReducer,
  accounts,
  accountNew,
});

export default rootReducer;
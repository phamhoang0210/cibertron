import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import reduceReducers from 'reduce-reducers';


import AccountReducer from './AccountReducer';

const accounts = AccountReducer;
// const accounts = reduceReducers(fetchAccounts);

const rootReducer = combineReducers({
	routing: routerReducer,
  accounts,
});

export default rootReducer;
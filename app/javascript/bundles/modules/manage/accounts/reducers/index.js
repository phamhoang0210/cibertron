import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import reduceReducers from 'reduce-reducers';


import accountsReducer from './accountsReducer';

const accounts = accountsReducer;
// const accounts = reduceReducers(fetchAccounts);

const rootReducer = combineReducers({
	routing: routerReducer,
  accounts,
});

export default rootReducer;
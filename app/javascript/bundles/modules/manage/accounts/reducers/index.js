import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import reduceReducers from 'reduce-reducers';


import accountsReducer from './accountsReducer';
import accountNewReducer from './accountNewReducer';
import accountEditReducer from './accountEditReducer';
import accountDeleteReducer from './accountDeleteReducer';


//show and delete
const fetchAccounts = accountsReducer;
const deleteAccounts = accountDeleteReducer;
const accounts = reduceReducers(fetchAccounts, deleteAccounts);

//new
const accountNew = accountNewReducer;

//edit 
const account = accountEditReducer;

const rootReducer = combineReducers({
	routing: routerReducer,
  accounts,
  accountNew,
  account,
});

export default rootReducer;
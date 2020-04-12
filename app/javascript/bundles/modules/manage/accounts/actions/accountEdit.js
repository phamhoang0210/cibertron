import {
	fetchRecord,
	updateRecord,
} from 'libs/actions/auth-action';
import {
  FETCH_ACCOUNT,
  UPDATE_ACCOUNT
} from './../constants/actionTypes';
import { ACCOUNTS_API_PATH } from '../constants/paths';

export const fetchAccount = (id, options) => {
  return dispatch => {
    fetchRecord(
      dispatch,
      FETCH_ACCOUNT,
      `${CIBERTRON_BASE_URL}${ACCOUNTS_API_PATH}/${id}`,
      id,
      options
    );
  };
};

export const updateAccount = (account, options) => {
  return dispatch => {
    updateRecord(
      dispatch,
      UPDATE_ACCOUNT,
      `${CIBERTRON_BASE_URL}${ACCOUNTS_API_PATH}/${account.id}`,
      { record: account },
      options
    );
  };
};

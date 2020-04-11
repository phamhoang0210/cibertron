import {
	submitRecord,
} from 'libs/actions/auth-action';
import {
  CREATE_ACCOUNT,
} from './../constants/actionTypes';
import { ACCOUNTS_API_PATH } from '../constants/paths';

export const submitAccount = (account, options) => {
  return dispatch => {
    submitRecord(
      dispatch,
      CREATE_ACCOUNT,
      `${CIBERTRON_BASE_URL.baseUri}${ACCOUNTS_API_PATH}`,
      { record: account },
      options
    );
  };
};

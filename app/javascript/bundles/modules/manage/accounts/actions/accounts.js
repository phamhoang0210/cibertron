import {
	fetchRecords,
  deleteRecord,
} from 'libs/actions/auth-action';

import {
	FETCH_ACCOUNTS,
} from '../constants/actionTypes';

import { ACCOUNTS_API_PATH } from '../constants/paths';

export const fetchAccounts = (params = {}, options) => {
	return dispatch => {
		fetchRecords(
			dispatch,
			FETCH_ACCOUNTS,
			`${CIBERTRON_BASE_URL}${ACCOUNTS_API_PATH}`,
			params,
			options,
		);
	};
};
